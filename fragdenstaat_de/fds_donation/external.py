from datetime import timedelta
from decimal import Decimal

from django.db.models import Q

import pandas as pd
import pytz

from froide_payment.models import Payment, PaymentStatus
from froide_payment.provider.banktransfer import TRANSFER_RE

from .services import create_donation_from_payment
from .models import Donor, Donation


def find_donation(transfer_ident, row):
    try:
        return Donation.objects.get(
            identifier=transfer_ident
        )
    except Donation.DoesNotExist:
        pass

    match = TRANSFER_RE.search(row['reference'])
    if match is None:
        return None

    payments = Payment.objects.filter(
        transaction_id=match.group(0).upper()
    )
    if not payments:
        return None
    try:
        donation = Donation.objects.get(
            payment=payments[0],
            identifier=''
        )
    except Donation.DoesNotExist:
        return None

    donor = donation.donor
    if donor and not donor.identifier:
        donor.identifier = row['iban']
        donor.save()
    return donation


def get_or_create_bank_transfer_donor(row):
    donors = Donor.objects.filter(
        identifier=row['iban']
    )
    if len(donors) > 0:
        return donors[0]

    name = row['name']
    names = name.strip().rsplit(' ', 1)
    first_name = ' '.join(names[:-1])
    last_name = ' '.join(names[-1:])
    return Donor.objects.create(
        active=True,
        salutation='',
        first_name=first_name,
        last_name=last_name,
        company_name='',
        address='',
        postcode='',
        city='',
        country=row['iban'][:2],
        email='',
        identifier=row['iban'],
        contact_allowed=False,
        become_user=False,
        receipt=False,
    )


def import_banktransfer(transfer_ident, row):
    is_new = False
    donation = find_donation(transfer_ident, row)
    if donation is None:
        donor = get_or_create_bank_transfer_donor(row)
        donation = Donation(
            donor=donor,
            completed=True,
            received=True,
        )
        is_new = True

    donation.identifier = transfer_ident
    donation.amount = Decimal(str(row['amount']))
    donation.amount_received = Decimal(str(row['amount']))
    donation.received_timestamp = row['date_received']
    if is_new:
        donation.timestamp = row['date']
    donation.method = 'banktransfer'
    donation.received = True
    donation.completed = True
    donation.save()

    if donation.payment:
        payment = donation.payment
        if payment.status != PaymentStatus.CONFIRMED:
            payment.captured_amount = donation.amount
            payment.received_amount = donation.amount
            payment.change_status(PaymentStatus.CONFIRMED)
    return is_new


def import_banktransfers(xls_file):
    df = pd.read_excel(xls_file)
    df = df.rename(columns={
        'Betrag': 'amount',
        'Datum': 'date',
        'Wertstellung': 'date_received',
        'Name': 'name',
        'Verwendungszweck': 'reference',
        'Konto': 'iban',
        'Bank': 'bic'
    })

    count = 0
    new_count = 0
    for i, row in df.iterrows():
        transfer_ident = '{date}-{ref}-{iban}-{i}'.format(
            date=row['date'],
            ref=row['reference'],
            iban=row['iban'],
            i=i
        )
        is_new = import_banktransfer(transfer_ident, row)
        count += 1
        if is_new:
            new_count += 1
    return count, new_count


def import_paypal(csv_file):
    df = pd.read_csv(csv_file)
    local_tz = pytz.timezone('Europe/Berlin')
    df['date'] = df['date'] = pd.to_datetime(
        df['Datum'] + ' ' + df['Uhrzeit'], format='%d.%m.%Y %H:%M:%S'
    ).apply(local_tz.localize)
    df['amount'] = pd.to_numeric(df['Brutto'].str.replace('.', '').str.replace(',', '.'))
    df['amount_received'] = pd.to_numeric(df['Netto'].str.replace('.', '').str.replace(',', '.'))

    df = df.rename(columns={
        'Transaktionscode': 'sale_id',
        'Zugehöriger Transaktionscode': 'subscription_id',
        'Name': 'name',
        'Ländervorwahl': 'country',
        'Adresszeile 1': 'address',
        'Ort': 'city',
        'PLZ': 'postcode',
        'Hinweis': 'note',
        'Auswirkung auf Guthaben': 'Guthaben',
        'Absender E-Mail-Adresse': 'paypal_email',
    })
    make_empty = (
        'country',
        'address',
        'city',
        'note',
        'postcode',
        'subscription_id',
    )

    df = df.query('Guthaben == "Haben"')
    for c in make_empty:
        df[c] = df[c].fillna('')

    count = 0
    new_count = 0
    for i, row in df.iterrows():
        is_new = import_paypal_row(row)
        count += 1
        if is_new:
            new_count += 1
    return count, new_count


def get_or_create_paypal_donor(row):
    try:
        return Donor.objects.get(
            active=True,
            email=row['paypal_email']
        )
    except Donor.DoesNotExist:
        pass
    name = row['name']
    names = name.strip().rsplit(' ', 1)
    first_name = ' '.join(names[:-1])
    last_name = ' '.join(names[-1:])
    return Donor.objects.create(
        active=True,
        salutation='',
        first_name=first_name,
        last_name=last_name,
        company_name='',
        address=row['address'],
        postcode=str(row['postcode']),
        city=row['city'],
        country=row['country'],
        email=row['paypal_email'],
        identifier=row['subscription_id'],
        contact_allowed=False,
        become_user=False,
        receipt=False,
    )


def import_paypal_row(row):
    '''
    - Find payment
    - If found return False
    - If not:
    - Create donation / donor
    '''

    payment = find_paypal_payment(row)
    if payment:
        if not payment.received_amount:
            payment.received_amount = Decimal(str(row['amount_received']))
            payment.save()
        # Make sure has donation
        create_donation_from_payment(payment)
        return False

    try:
        return Donation.objects.get(
            method='paypal',
            identifier=row['sale_id']
        )
    except Donation.DoesNotExist:
        pass

    donor = get_or_create_paypal_donor(row)

    return Donation.objects.create(
        donor=donor,
        identifier=row['sale_id'],
        completed=True,
        received=True,
        received_timestamp=row['date'],
        timestamp=row['date'],
        method='paypal',
        amount=Decimal(str(row['amount'])),
        amount_received=Decimal(str(row['amount_received'])),
        note=row['note'],
        recurring=bool(row['subscription_id'])
    )


def find_paypal_payment(row):
    buffer = timedelta(minutes=5)

    cond = Q(extra_data__contains=row['sale_id'])
    if row['subscription_id']:
        cond |= Q(extra_data__contains=row['subscription_id'])

    payments = Payment.objects.filter(
        variant='paypal',
        status=PaymentStatus.CONFIRMED,
    ).filter(
        created__gte=row['date'] - buffer,
        created__lte=row['date'] + buffer
    ).filter(cond)

    if len(payments) == 0:
        return None
    elif len(payments) == 1:
        return payments[0]
    raise ValueError('Multiple matching payments found')
