# FragDenStaat.de

This repository contains the theming for
[FragDenStaat.de](https://fragdenstaat.de) - the German instance of [Froide](https://github.com/okfde/froide).


## Development environment

FragDenStaat.de is a Django app with a PostgreSQL+PostGIS database and elasticsearch search service.
[There is a production deployment ansible configuration for details.](https://github.com/okfde/fragdenstaat.de-ansible). If you want an easy start, please use the below instructions with Docker (note that this is for convenience and that the actual deployment does not use Docker at the moment).

If you do not want to use Docker, you can install this like any Django project with dependencies and services.

### Setup dev environment

FragDenStaat.de is a Django project that uses the core `froide` project and other `froide` Django apps as plugins. These froide and related apps are installed from repositories and it makes sense to set them up on your dev machine.

You need to have installed:
- Python 3.6+
- yarn
- GDAL for Django's GeoDjango
- freetype and imagemagick
- libmagic

All of these dependencies should be installable paket managers (e.g. `brew` on macOS).

To make the setup easier the following script (`devsetup.sh`) creates a virtual environment, sets up and installs all repos of the Python backend and installs and links all repos of the JavaScript frontend build.

```
cd project-dir
curl https://raw.githubusercontent.com/okfde/fragdenstaat_de/master/devsetup.sh | bash
```

### Start services

You can run your own Postgres+PostGIS database and Elasticsearch service or run them with Docker.

You need [docker](https://www.docker.com/community-edition) and [docker-compose](https://docs.docker.com/compose/). Make sure Docker is running and use the following command:

```
docker-compose -f docker-compose.dev.yml up
```

This will start Postgres and Elasticsearch and listen on port 5432 and 9200 respectively. You can adjust the port mapping in the `docker-compose.dev.yml`.

### Setup database

If you need to adjust settings, you can copy the `fragdenstaat_de/theme/local_settings.py.example` to `fragdenstaat_de/theme/local_settings.py` and edit it.

To initialise the database:

```
# Activate virtualenv
source fds-env/bin/activate
cd fragdenstaat_de
# Create database structure
python manage.py migrate
```

To get started with some data:

```
# Load initial data (e.g. CMS)
python manage.py loaddata <fixture file>
# Create a superuser
python manage.py createsuperuser
# Create and populate search index
python search_index --create
python search_index --populate
```

### Quick start after setup

```
source fds-env/bin/activate
cd fragdenstaat_de
# Start service in background with -d
docker-compose -f docker-compose.dev.yml up -d
python manage.py runserver
```

### Frontend development

```
cd fragdenstaat_de
yarn run serve
```

## License

Froide and fragdenstaat_de are licensed under the AGPL License.

Some folders contain an attributions.txt with more information about the copyright holders for files in this specific folder.
