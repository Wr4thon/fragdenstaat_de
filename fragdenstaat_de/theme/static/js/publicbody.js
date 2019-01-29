!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.publicbody=t():(e.Froide=e.Froide||{},e.Froide.components=e.Froide.components||{},e.Froide.components.publicbody=t())}(window,function(){return function(e){function t(t){for(var s,o,c=t[0],u=t[1],a=t[2],d=0,p=[];d<c.length;d++)o=c[d],r[o]&&p.push(r[o][0]),r[o]=0;for(s in u)Object.prototype.hasOwnProperty.call(u,s)&&(e[s]=u[s]);for(l&&l(t);p.length;)p.shift()();return i.push.apply(i,a||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],s=!0,c=1;c<n.length;c++){var u=n[c];0!==r[u]&&(s=!1)}s&&(i.splice(t--,1),e=o(o.s=n[0]))}return e}var s={},r={5:0},i=[];function o(t){if(s[t])return s[t].exports;var n=s[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.e=function(){return Promise.resolve()},o.m=e,o.c=s,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)o.d(n,s,function(t){return e[t]}.bind(null,s));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var c=window.webpackJsonp=window.webpackJsonp||[],u=c.push.bind(c);c.push=t,c=c.slice();for(var a=0;a<c.length;a++)t(c[a]);var l=u;return i.push(["../froide/frontend/javascript/publicbody.js",0]),n()}({"../froide/frontend/javascript/components/publicbody/lib/pb-chooser-mixin.js":function(e,t,n){"use strict";var s=n("./node_modules/lodash.debounce/index.js"),r=n.n(s),i=n("./node_modules/vuex/dist/vuex.esm.js"),o=n("../froide/frontend/javascript/store/mutation_types.js");function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},s=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(s=s.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),s.forEach(function(t){u(e,t,n[t])})}return e}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var a={created:function(){if(this.hasForm&&this.field.value){var e=this.field.objects;e&&(this.cachePublicBodies(e),this.setPublicBodies({publicBodies:e,scope:this.scope}))}},computed:c({help_url:function(){return this.config.url.helpAbout},headers:function(){return[{key:"name",label:this.i18n.name,sortKey:function(e){return e.name}},{key:"jurisdiction",label:this.i18n.jurisdictionPlural[0],sortKey:function(e){return e.jurisdiction.name}},{key:"classification",label:this.i18n.classificationPlural[0],sortKey:function(e){return e.classification&&e.classification.name}},{key:"categories",label:this.i18n.topicPlural[1],sortKey:function(e){return e.categories[0]&&e.categories[0].name}}]},hasForm:function(){return void 0!==this.form&&null!==this.form&&""!==this.form},formFields:function(){return this.form.fields},field:function(){return this.formFields[this.name]},errors:function(){return this.form.errors},hasPublicBodies:function(){return this.publicBodies.length>0},debouncedAutocomplete:function(){return r()(this.runAutocomplete,300)},hasFilters:function(){return!!this.filters&&Object.keys(this.filters).length>0},searchFilters:function(){var e={};if(!this.hasFilters)return e;for(var t in this.filters)null!==this.filters[t]&&0!==this.filters[t].length&&(e[t]=this.filters[t].id);return e},hasSearchResults:function(){return this.searchResults.length>0},searchResults:function(){return this.getScopedSearchResults(this.scope)},searchMeta:function(){return this.getScopedSearchMeta(this.scope)}},Object(i.c)(["getPublicBodyByScope","getScopedSearchResults","getScopedSearchMeta"])),methods:c({buildQuery:function(){var e=this.search;return this.hasFilters&&(e+=JSON.stringify(this.filters)),e},selectAllRows:function(e){var t=this;this.searchResults.forEach(function(n){e?t.addPublicBodyId({publicBodyId:n.id,scope:t.scope}):t.removePublicBodyId({publicBodyId:n.id,scope:t.scope})})},clearSelection:function(){window.confirm(this.i18n.reallyClearSelection)&&(this.clearPublicBodies({scope:this.scope}),this.setStepSelectPublicBody())},triggerAutocomplete:function(){(""!==this.search||this.hasFilters||(this.searching=!1),!this.allowEmptySearch&&void 0!==this.search&&this.search.length<3&&!this.hasFilters)?this.searching=!1:this.buildQuery()!==this.lastQuery||0===this.searchResults.length?(this.searching=!0,this.debouncedAutocomplete()):this.searching=!1},runAutocomplete:function(){var e=this;return this.searching=!0,this.lastQuery=this.buildQuery(),this.getSearchResults({scope:this.scope,search:this.search,filters:this.searchFilters}).then(function(){e.searching=!1})},clearResults:function(){this.clearSearchResults({scope:this.scope})}},Object(i.d)({setPublicBody:o.i,setPublicBodies:o.h,setSearchResults:o.k,cachePublicBodies:o.c,clearPublicBodies:o.d,clearSearchResults:o.e,addPublicBodyId:o.a,setStepSelectPublicBody:o.o,removePublicBodyId:o.f}),Object(i.b)(["getSearchResults"]))};t.a=a},"../froide/frontend/javascript/components/publicbody/lib/pb-list-mixin.js":function(e,t,n){"use strict";var s=n("./node_modules/vuex/dist/vuex.esm.js"),r=n("../froide/frontend/javascript/store/mutation_types.js");function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},s=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(s=s.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),s.forEach(function(t){o(e,t,n[t])})}return e}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var c={computed:i({publicBody:function(){return this.getPublicBodyByScope(this.scope)},publicBodies:function(){return this.getPublicBodiesByScope(this.scope)},hasPublicBodies:function(){return this.publicBodies.length>0},searchResults:function(){return this.getScopedSearchResults(this.scope)},hasSearchResults:function(){return this.searchResults.length>0},hasNextSearchResults:function(){var e=this.getScopedSearchMeta(this.scope);return!!e&&e.next},hasPreviousSearchResults:function(){var e=this.getScopedSearchMeta(this.scope);return!!e&&e.previous},currentResultPage:function(){var e=this.getScopedSearchMeta(this.scope);return e?e.offset/e.limit+1:0},maxResultPage:function(){var e=this.getScopedSearchMeta(this.scope);return e?Math.ceil(e.total_count/e.limit):0},currentResultsLength:function(){var e=this.searchResults;return e?e.length:null},searchResultsLength:function(){var e=this.getScopedSearchMeta(this.scope);return e?e.total_count:0},emptyResults:function(){var e=this.searchResultsLength;return null!==e&&0===e}},Object(s.c)(["getPublicBody","getPublicBodyByScope","getPublicBodiesByScope","getScopedSearchResults","getScopedSearchMeta"])),methods:i({getNext:function(e){this.getNextSearchResults(this.scope)},getPrevious:function(e){this.getPreviousSearchResults(this.scope)}},Object(s.d)({setPublicBody:r.i,clearSearchResults:r.e}),Object(s.b)(["getNextSearchResults","getPreviousSearchResults"]))};t.a=c},"../froide/frontend/javascript/components/publicbody/pb-action-list.vue?vue&type=style&index=0&id=49f418e4&lang=scss&scoped=true&":function(e,t,n){"use strict";var s=n("./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib/index.js?!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!../froide/frontend/javascript/components/publicbody/pb-action-list.vue?vue&type=style&index=0&id=49f418e4&lang=scss&scoped=true&");n.n(s).a},"../froide/frontend/javascript/components/publicbody/pb-multi-list.vue?vue&type=style&index=0&id=8a7e4a3e&lang=scss&scoped=true&":function(e,t,n){"use strict";var s=n("./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib/index.js?!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!../froide/frontend/javascript/components/publicbody/pb-multi-list.vue?vue&type=style&index=0&id=8a7e4a3e&lang=scss&scoped=true&");n.n(s).a},"../froide/frontend/javascript/components/publicbody/pb-result-list.vue?vue&type=style&index=0&id=51bf523e&lang=scss&scoped=true&":function(e,t,n){"use strict";var s=n("./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib/index.js?!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!../froide/frontend/javascript/components/publicbody/pb-result-list.vue?vue&type=style&index=0&id=51bf523e&lang=scss&scoped=true&");n.n(s).a},"../froide/frontend/javascript/components/publicbody/publicbody-chooser.vue":function(e,t,n){"use strict";var s=n("./node_modules/vuex/dist/vuex.esm.js"),r=n("../froide/frontend/javascript/components/publicbody/lib/pb-list-mixin.js"),i=n("../froide/frontend/javascript/lib/i18n-mixin.js"),o={name:"pb-result-list",props:["name","scope","config"],mixins:[r.a,i.a],computed:{value:{get:function(){if(this.publicBody)return this.publicBody.id},set:function(e){this.setPublicBody({publicBody:this.getPublicBody(e),scope:this.scope}),this.clearSearchResults({scope:this.scope})}}},methods:{selectSearchResult:function(e){this.value=e.target.value}}},c=(n("../froide/frontend/javascript/components/publicbody/pb-result-list.vue?vue&type=style&index=0&id=51bf523e&lang=scss&scoped=true&"),n("./node_modules/vue-loader/lib/runtime/componentNormalizer.js")),u=Object(c.a)(o,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.publicBody&&!e.hasSearchResults?n("div",{staticClass:"search-result"},[n("label",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"value"}],attrs:{type:"radio","data-label":e.publicBody.name,name:e.name},domProps:{value:e.publicBody.id,checked:e._q(e.value,e.publicBody.id)},on:{change:function(t){e.value=e.publicBody.id}}}),e._v("\n      "+e._s(e.publicBody.name)+"\n      "),n("small",[e._v("\n        "+e._s(e.publicBody.jurisdiction.name)+"\n      ")])])]):e._e(),e._v(" "),e.searchResults.length>0||e.emptyResults?n("ul",{staticClass:"search-results list-unstyled"},e._l(e.searchResults,function(t){return n("li",{key:t.id,staticClass:"search-result"},[n("label",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"value"}],attrs:{type:"radio","data-label":t.name,name:e.name},domProps:{value:t.id,checked:e._q(e.value,t.id)},on:{change:[function(n){e.value=t.id},e.selectSearchResult],click:e.selectSearchResult}}),e._v("\n        "+e._s(t.name)+"\n        "),n("small",[e._v("\n          "+e._s(t.jurisdiction.name)+"\n        ")])])])}),0):e._e()])},[],!1,null,"51bf523e",null);u.options.__file="pb-result-list.vue";var a=u.exports,l=n("../froide/frontend/javascript/store/mutation_types.js");function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var p={name:"pb-action-list",mixins:[r.a,i.a],props:["name","scope","config"],methods:function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},s=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(s=s.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),s.forEach(function(t){d(e,t,n[t])})}return e}({selectSearchResult:function(e){this.setPublicBodyId({publicBodyId:e,scope:this.scope}),this.setStepRequest()},getMakeRequestURLForResult:function(e){return this.config.url.makeRequestTo.replace(/0/,e.id)}},Object(s.d)({setStepRequest:l.m,setPublicBodyId:l.j}))},f=(n("../froide/frontend/javascript/components/publicbody/pb-action-list.vue?vue&type=style&index=0&id=49f418e4&lang=scss&scoped=true&"),Object(c.a)(p,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"search-result-container"},[e.searchResultsLength>0||e.emptyResults?n("ul",{staticClass:"search-results list-unstyled"},e._l(e.searchResults,function(t){return n("li",{key:t.id,staticClass:"search-result",on:{click:function(n){n.preventDefault(),e.selectSearchResult(t.id)}}},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-sm-8"},[n("h4",{staticClass:"pb-heading"},[e._v("\n            "+e._s(t.name)+"\n          ")]),e._v(" "),n("small",[e._v("\n            "+e._s(t.jurisdiction.name)+",\n            "+e._s(e.i18n._("requestCount",{count:t.number_of_requests}))+"\n          ")])]),e._v(" "),n("div",{staticClass:"col-sm-4"},[n("a",{staticClass:"btn btn-primary",attrs:{href:e.getMakeRequestURLForResult(t)},on:{click:function(n){n.preventDefault(),e.selectSearchResult(t.id)}}},[e._v("\n            "+e._s(e.i18n.makeRequest)+"\n          ")])])])])}),0):e._e(),e._v(" "),e.hasSearchResults&&e.maxResultPage>1?n("ul",{staticClass:"pagination"},[e.hasPreviousSearchResults?n("li",{staticClass:"page-item"},[n("a",{staticClass:"page-link prev",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.getPrevious(t)}}},[n("span",{attrs:{"aria-hidden":"true"}},[e._v("«")]),e._v(" "),n("span",{staticClass:"sr-only"},[e._v(e._s(e.i18n.previous))])])]):n("li",{staticClass:"page-item disabled"},[n("a",{staticClass:"page-link",attrs:{href:"#",tabindex:"-1"}},[n("span",{attrs:{"aria-hidden":"true"}},[e._v("«")]),e._v(" "),n("span",{staticClass:"sr-only"},[e._v(e._s(e.i18n.previous))])])]),e._v(" "),n("li",{staticClass:"page-item disabled"},[n("span",{staticClass:"page-link"},[e._v("\n        "+e._s(e.currentResultPage)+" / "+e._s(e.maxResultPage)+"\n      ")])]),e._v(" "),e.hasNextSearchResults?n("li",{staticClass:"page-item"},[n("a",{staticClass:"page-link next",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.getNext(t)}}},[n("span",{attrs:{"aria-hidden":"true"}},[e._v("»")]),e._v(" "),n("span",{staticClass:"sr-only"},[e._v(e._s(e.i18n.next))])])]):n("li",{staticClass:"page-item disabled"},[n("a",{staticClass:"page-link",attrs:{href:"#",tabindex:"-1"}},[n("span",{staticClass:"sr-only"},[e._v(e._s(e.i18n.next))]),e._v(" "),n("span",{attrs:{"aria-hidden":"true"}},[e._v("»")])])])]):e._e()])},[],!1,null,"49f418e4",null));f.options.__file="pb-action-list.vue";var h=f.exports;function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},s=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(s=s.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),s.forEach(function(t){v(e,t,n[t])})}return e}function v(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var m={name:"pb-multi-item",props:["name","result","scope"],computed:b({value:{get:function(){return this.isPublicBodySelectedByScope(this.scope,this.result.id)},set:function(e){e?this.addPublicBodyId({publicBodyId:this.result.id,scope:this.scope}):this.removePublicBodyId({publicBodyId:this.result.id,scope:this.scope})}}},Object(s.c)(["isPublicBodySelectedByScope"])),methods:b({selectSearchResult:function(e){this.value=e.target.value}},Object(s.d)({addPublicBodyId:l.a,removePublicBodyId:l.f}))},y=Object(c.a)(m,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("label",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"value"}],attrs:{type:"checkbox","data-label":e.result.name,name:e.name},domProps:{value:e.result.id,checked:Array.isArray(e.value)?e._i(e.value,e.result.id)>-1:e.value},on:{change:function(t){var n=e.value,s=t.target,r=!!s.checked;if(Array.isArray(n)){var i=e.result.id,o=e._i(n,i);s.checked?o<0&&(e.value=n.concat([i])):o>-1&&(e.value=n.slice(0,o).concat(n.slice(o+1)))}else e.value=r}}}),e._v("\n  "+e._s(e.result.name)+"\n  "),n("small",[e._v("\n    "+e._s(e.result.jurisdiction.name)+"\n  ")])])},[],!1,null,null,null);y.options.__file="pb-multi-item.vue";var g=y.exports;function _(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var j={name:"pb-multi-list",props:["name","scope","config"],mixins:[r.a,i.a],methods:function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},s=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(s=s.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),s.forEach(function(t){_(e,t,n[t])})}return e}({selectAll:function(){var e=this;this.searchResults.forEach(function(t){e.addPublicBodyId({publicBodyId:t.id,scope:e.scope})})}},Object(s.d)({setStepRequest:l.m,addPublicBodyId:l.a})),components:{PbMultiItem:g}},S=(n("../froide/frontend/javascript/components/publicbody/pb-multi-list.vue?vue&type=style&index=0&id=8a7e4a3e&lang=scss&scoped=true&"),Object(c.a)(j,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.searchResults.length>0||e.emptyResults?n("div",[n("div",[n("a",{directives:[{name:"show",rawName:"v-show",value:e.hasPublicBodies,expression:"hasPublicBodies"}],staticClass:"btn btn-primary",attrs:{href:"#step-request"},on:{click:e.setStepRequest}},[e._v("\n        Continue\n      ")]),e._v(" "),e.hasSearchResults?n("a",{staticClass:"btn btn-light pull-right",attrs:{href:"#"},on:{click:e.selectAll}},[e._v("\n        Select all\n      ")]):e._e()]),e._v(" "),n("ul",{staticClass:"search-results list-unstyled"},e._l(e.searchResults,function(t){return n("li",{key:t.id,staticClass:"search-result"},[n("pb-multi-item",{attrs:{name:e.name,result:t,scope:e.scope}})],1)}),0),e._v(" "),e.hasPublicBodies?n("p",[n("a",{staticClass:"btn btn-primary",attrs:{href:"#step-request"},on:{click:e.setStepRequest}},[e._v("\n        Continue\n      ")])]):e._e()]):e._e()])},[],!1,null,"8a7e4a3e",null));S.options.__file="pb-multi-list.vue";var P=S.exports;function B(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var R={name:"publicbody-chooser",mixins:[n("../froide/frontend/javascript/components/publicbody/lib/pb-chooser-mixin.js").a,i.a],props:["name","scope","defaultsearch","form","config","listView"],data:function(){return{search:this.defaultsearch,lastQuery:null,emptyResults:!1,searching:!1}},created:function(){this.setConfig(this.config)},mounted:function(){this.defaultsearch&&null===this.searchMeta&&this.triggerAutocomplete()},components:{resultList:a,actionList:h,multi:P},computed:{getListView:function(){return this.listView?this.listView:"resultList"},label:function(){if(this.publicBody)return this.publicBody.name},publicBody:function(){return this.getPublicBodyByScope(this.scope)}},methods:function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},s=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(s=s.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),s.forEach(function(t){B(e,t,n[t])})}return e}({},Object(s.d)({setConfig:l.g}))},O=Object(c.a)(R,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"publicbody-chooser mb-3"},[n("div",{staticClass:"form-search"},[n("div",{staticClass:"input-group"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.search,expression:"search"}],staticClass:"search-public_bodies form-control",attrs:{type:"search",placeholder:e.i18n.publicBodySearchPlaceholder},domProps:{value:e.search},on:{keyup:e.triggerAutocomplete,keydown:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?(t.preventDefault(),e.triggerAutocomplete(t)):null},input:function(t){t.target.composing||(e.search=t.target.value)}}}),e._v(" "),n("div",{staticClass:"input-group-append"},[n("button",{staticClass:"btn btn-primary search-public_bodies-submit",attrs:{type:"button"},on:{click:e.triggerAutocomplete}},[n("i",{staticClass:"fa fa-search"}),e._v("\n          "+e._s(e.i18n.search)+"\n        ")])])])]),e._v(" "),e.searching?n("div",{staticClass:"search-spinner"},[n("img",{attrs:{src:e.config.resources.spinner,alt:"Loading..."}})]):e._e(),e._v(" "),n(e.getListView,{tag:"component",attrs:{name:e.name,scope:e.scope,config:e.config}})],1)},[],!1,null,null,null);O.options.__file="publicbody-chooser.vue";t.a=O.exports},"../froide/frontend/javascript/lib/api.js":function(e,t,n){"use strict";function s(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}n.d(t,"a",function(){return r});var r=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.config=t}return function(e,t,n){t&&s(e.prototype,t),n&&s(e,n)}(e,[{key:"getJson",value:function(e){return new Promise(function(t,n){var s=new XMLHttpRequest;s.open("GET",e,!0),s.onload=function(){if(s.status>=400)try{return n(JSON.parse(s.responseText))}catch(e){return n(s.responseText)}t(JSON.parse(s.responseText))},s.onerror=function(){n(s.statusText)},s.send()})}},{key:"getObjects",value:function(e){return new Promise(function(t,n){e.then(function(e){return t(e.objects)}).catch(function(e){return n(e)})})}},{key:"getJsonObjects",value:function(e){var t=this;return new Promise(function(n,s){t.getJson(e).then(function(e){return n(e.objects)}).catch(function(e){return s(e)})})}},{key:"getPublicBody",value:function(e){var t=this.config.url.getPublicBody.replace(/\/0\//,"/".concat(e,"/"));return this.getJson(t)}},{key:"autocompletePublicBody",value:function(e){var t=encodeURIComponent(e),n=this.config.url.autocompletePublicBody+"?query="+t;return this.getJsonObjects(n)}},{key:"getUser",value:function(){return this.getJson(this.config.url.user)}},{key:"getJsonForUrl",value:function(e,t,n){var s=!1;return void 0!==t&&t&&(s=!0,e=e+"?q="+encodeURIComponent(t)),void 0!==n&&function(){var t=[],r=function(e){var s=n[e];null!==s&&(Array.isArray(s)||(s=[s]),s.forEach(function(n){t.push(e+"="+encodeURIComponent(n))}))};for(var i in n)r(i);e+=s?"&":"?",e+=t.join("&")}(),this.getJson(e)}},{key:"searchPublicBodies",value:function(e,t){return this.getJsonForUrl(this.config.url.searchPublicBody,e,t)}},{key:"listPublicBodies",value:function(e,t){return this.getJsonForUrl(this.config.url.listPublicBodies,e,t)}},{key:"getLawsForPublicBodies",value:function(e,t){t=t||{};var n={},s=[];return e.forEach(function(e){e.laws.forEach(function(e){if("string"==typeof e){if(void 0!==t[e])return;var r=e.split("/"),i=r[r.length-2];void 0===n[i]&&(n[i]=!0,s.push(i))}})}),0===s.length?Promise.resolve([]):this.getJsonForUrl(this.config.url.listLaws,null,{id:s.join(",")}).then(function(e){return e.objects})}},{key:"listJurisdictions",value:function(e,t){return this.getJsonForUrl(this.config.url.listJurisdictions,e,t)}},{key:"listCategories",value:function(e,t){return this.getJsonForUrl(this.config.url.listCategories,e,t)}},{key:"listClassifications",value:function(e,t){return this.getJsonForUrl(this.config.url.listClassifications,e,t)}},{key:"searchFoiRequests",value:function(e){var t=encodeURIComponent(e),n=this.config.url.searchRequests+"?q="+t;return this.getJsonObjects(n)}}]),e}()},"../froide/frontend/javascript/lib/i18n-mixin.js":function(e,t,n){"use strict";function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var r=new RegExp(/\$\{(\w+)\}/g),i=document.querySelector("html").lang,o={computed:{i18n:function(){return function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){s(e,t,n[t])})}return e}({_replacer:function(e){return function(t,n,s,r){return"count"===n&&e.count>=1e3?e.count.toLocaleString(i):e[n]}},_:function(e,t){var n=this[e];return Array.isArray(n)?void 0!==t.count&&(t.count>1||0===t.count)?n[1].replace(r,this._replacer(t)):n[0].replace(r,this._replacer(t)):n.replace(r,this._replacer(t))}},this.config.i18n)}}};t.a=o},"../froide/frontend/javascript/lib/law-select.js":function(e,t,n){"use strict";function s(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}n.d(t,"a",function(){return i});var r=function(e,t){return e.meta&&t.meta?0:e.meta?-1:t.meta?1:0},i=function(e,t){if(0===e.length)return null;var n=e.filter(function(e){return!t||e.law_type===t});return 0===n.length&&(n=s(e)),(n=n.sort(r))[0]}},"../froide/frontend/javascript/lib/vue-helper.js":function(e,t,n){"use strict";function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e){return e.replace(/(-\w)/g,function(e){return e[1].toUpperCase()})}function i(e,t){return function(){return t(e.tag,{domProps:{innerHTML:e.innerHTML}})}}function o(e,t){"string"==typeof e&&(e=document.querySelector(e));var n=function(e){for(var t=e.attributes,n={},s=0;s<t.length;s+=1){var i=t[s];if(("v"!==i.name[0]||"-"!==i.name[1])&&"id"!==i.name&&"class"!==i.name){var o=i.value,c=i.name;":"===i.name[0]&&(c=i.name.substring(1),"{"!==i.value[0]&&"["!==i.value[0]||(o=JSON.parse(i.value)),"true"===i.value&&(o=!0)),n[r(c)]=o}}return n}(e),o=function(e){for(var t=e.querySelectorAll("[slot]"),n={},s=0;s<t.length;s+=1){var r=t[s];n[r.attributes.slot.value]={tag:r.tagName.toLowerCase(),innerHTML:r.innerHTML}}return n}(e),c=function(e){var t={};if(e.id&&(t.attrs={id:e.id}),e.className){var n=e.className.split(" ");t.class={},n.forEach(function(e){t.class[e.trim()]=!0})}return t}(e);return function(e){var r=function(e,t){var n={};for(var s in e)n[s]=i(e[s],t);return n}(o,e);return e(t,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){s(e,t,n[t])})}return e}({props:n,scopedSlots:r},c))}}n.d(t,"a",function(){return o})},"../froide/frontend/javascript/publicbody.js":function(e,t,n){"use strict";n.r(t);var s=n("./node_modules/vue/dist/vue.runtime.esm.js"),r=n("../froide/frontend/javascript/store/index.js"),i=n("../froide/frontend/javascript/store/mutation_types.js"),o=n("../froide/frontend/javascript/lib/vue-helper.js"),c=n("../froide/frontend/javascript/components/publicbody/publicbody-chooser.vue");function u(e){r.a.commit(i.g),new s.a({store:r.a,components:{PublicbodyChooser:c.a},render:Object(o.a)(e,c.a)}).$mount(e)}s.a.config.productionTip=!1;for(var a=document.querySelectorAll(".publicbody-chooser"),l=0;l<a.length;l+=1)u(a[l])},"../froide/frontend/javascript/store/index.js":function(e,t,n){"use strict";var s,r=n("./node_modules/vue/dist/vue.runtime.esm.js"),i=n("./node_modules/vuex/dist/vuex.esm.js"),o=n("../froide/frontend/javascript/store/mutation_types.js"),c=n("../froide/frontend/javascript/lib/api.js"),u=n("../froide/frontend/javascript/lib/law-select.js");function a(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}r.a.use(i.a);t.a=new i.a.Store({state:{config:null,scopedSearchResults:{},scopedSearchFacets:{},scopedSearchMeta:{},scopedPublicBodies:{},scopedPublicBodiesMap:{},lawCache:{},publicBodies:{},lawType:null,user:{},step:o.q.SELECT_PUBLICBODY,subject:"",body:"",fullText:!1},getters:{getPublicBodyByScope:function(e,t){return function(e){var n=t.getPublicBodiesByScope(e);return 0===n.length?null:n[0]}},getPublicBodiesByScope:function(e,t){return function(t){var n=e.scopedPublicBodies[t];return void 0===n?[]:n}},isPublicBodySelectedByScope:function(e){return function(t,n){var s=e.scopedPublicBodiesMap[t];return void 0!==s&&void 0!==s[n]}},getPublicBody:function(e){return function(t){return e.publicBodies[t]}},getScopedSearchResults:function(e,t){return function(t){var n=e.scopedSearchResults[t];return void 0===n?[]:n}},getScopedSearchFacets:function(e){return function(t){var n=e.scopedSearchFacets[t];return void 0===n?null:n}},getScopedSearchMeta:function(e){return function(t){var n=e.scopedSearchMeta[t];return void 0===n?null:n}},getLawsForPublicBody:function(e){return function(t){return t.laws.map(function(t){return e.lawCache[t]}).filter(function(e){return void 0!==e})}},defaultLaw:function(e,t){var n=null;for(n in e.scopedPublicBodies);for(var s=e.scopedPublicBodies[n],r=null,i=!0,o=0;o<s.length;o+=1){var c=s[o],a=t.getLawsForPublicBody(c),l=Object(u.a)(a,e.lawType);if(null!==l)if(0!==o){if(r.id!==l.id){i=!1;break}r=l}else r=l}return i?r:null},user:function(e){return e.user},subject:function(e){return e.subject},getSubject:function(e){return function(){return e.subject}},body:function(e){return e.body},fullText:function(e){return e.fullText},stepSelectPublicBody:function(e){return e.step===o.q.SELECT_PUBLICBODY},stepSelectPublicBodyDone:function(e){return e.step>o.q.SELECT_PUBLICBODY},stepReviewPublicBodies:function(e){return e.step===o.q.REVIEW_PUBLICBODY},stepReviewPublicBodiesDone:function(e){return e.step>o.q.REVIEW_PUBLICBODY},stepWriteRequest:function(e){return e.step===o.q.WRITE_REQUEST},stepWriteRequestDone:function(e){return e.step>o.q.WRITE_REQUEST},step:function(e){return e.step},lawType:function(e){return e.lawType}},mutations:(s={},l(s,o.g,function(e,t){null!==e.config&&void 0!==e.config||(e.config=t)}),l(s,o.l,function(e,t){e.step=t}),l(s,o.o,function(e){e.step=o.q.SELECT_PUBLICBODY}),l(s,o.n,function(e){e.step=o.q.REVIEW_PUBLICBODY}),l(s,o.m,function(e){e.step=o.q.WRITE_REQUEST}),l(s,o.i,function(e,t){var n=t.publicBody,s=t.scope;r.a.set(e.scopedPublicBodies,s,[n]),r.a.set(e.scopedPublicBodiesMap,s,l({},n.id,!0)),e.scopedSearchResults[s].forEach(function(e){e.id===n.id?e.isSelected=!0:e.isSelected=!1})}),l(s,o.h,function(e,t){var n=t.publicBodies,s=t.scope;r.a.set(e.scopedPublicBodies,s,n);var i={};n.forEach(function(e){i[e.id]=!0}),r.a.set(e.scopedPublicBodiesMap,s,i),e.scopedSearchResults[s]&&e.scopedSearchResults[s].forEach(function(e){void 0!==i[e.id]?e.isSelected=!0:e.isSelected=!1})}),l(s,o.j,function(e,t){var n=t.publicBodyId,s=t.scope,i=e.publicBodies[n];r.a.set(e.scopedPublicBodies,s,[i]),r.a.set(e.scopedPublicBodiesMap,s,{publicBodyId:!0}),e.scopedSearchResults[s]&&e.scopedSearchResults[s].forEach(function(e){e.id===n?e.isSelected=!0:e.isSelected=!1})}),l(s,o.a,function(e,t){var n=t.publicBodyId,s=t.scope,i=e.publicBodies[n];if(void 0!==i){var o=e.scopedPublicBodies[s];if(void 0===o)r.a.set(e.scopedPublicBodies,s,[i]);else o.some(function(e){return e.id===i.id})||r.a.set(e.scopedPublicBodies,s,a(o).concat([i]));r.a.set(e.scopedPublicBodiesMap[s],n,!0),e.scopedSearchResults[s]&&e.scopedSearchResults[s].forEach(function(e){e.id===n&&(e.isSelected=!0)})}}),l(s,o.f,function(e,t){var n=t.publicBodyId,s=t.scope,i=e.scopedPublicBodies[s];void 0!==i&&(i=i.filter(function(e){return e.id!==n}),r.a.set(e.scopedPublicBodies,s,i),r.a.set(e.scopedPublicBodiesMap[s],n,void 0),e.scopedSearchResults[s]&&e.scopedSearchResults[s].forEach(function(e){e.id===n&&(e.isSelected=!1)}))}),l(s,o.d,function(e,t){var n=t.scope;r.a.set(e.scopedPublicBodies,n,[]),r.a.set(e.scopedPublicBodiesMap,n,{}),e.scopedSearchResults[n]&&e.scopedSearchResults[n].forEach(function(e){e.isSelected=!1})}),l(s,o.c,function(e,t){var n={};t&&(t.forEach(function(e){n[e.id]=e}),e.publicBodies=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},s=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(s=s.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),s.forEach(function(t){l(e,t,n[t])})}return e}({},e.publicBodies,n))}),l(s,o.k,function(e,t){var n=t.searchResults,s=t.searchFacets,i=t.searchMeta,o=t.scope;n=n.map(function(t){return t.isSelected=void 0!==e.scopedPublicBodiesMap[o][t.id],t}),r.a.set(e.scopedSearchResults,o,n),r.a.set(e.scopedSearchFacets,o,s),r.a.set(e.scopedSearchMeta,o,i)}),l(s,o.e,function(e,t){var n=t.scope;r.a.set(e.scopedSearchResults,n,[]),r.a.set(e.scopedSearchFacets,n,{}),r.a.set(e.scopedSearchMeta,n,null)}),l(s,o.v,function(e,t){e.fullText=t}),l(s,o.p,function(e,t){e.user=t}),l(s,o.z,function(e,t){e.subject=t}),l(s,o.s,function(e,t){e.body=t}),l(s,o.u,function(e,t){r.a.set(e.user,"first_name",t)}),l(s,o.w,function(e,t){r.a.set(e.user,"last_name",t)}),l(s,o.r,function(e,t){r.a.set(e.user,"address",t)}),l(s,o.t,function(e,t){r.a.set(e.user,"email",t)}),l(s,o.y,function(e,t){r.a.set(e.user,"private",t)}),l(s,o.A,function(e,t){r.a.set(e.user,"id",t)}),l(s,o.x,function(e,t){e.lawType=t}),l(s,o.b,function(e,t){t.laws.forEach(function(t){r.a.set(e.lawCache,t.resource_uri,t)})}),s),actions:{setSearchResults:function(e,t){var n=e.commit,s=(e.state,e.dispatch),r=t.scope,i=t.results;n(o.k,{searchResults:i.objects.results,searchFacets:i.objects.facets.fields,searchMeta:i.meta,scope:r}),n(o.c,i.objects.results),s("getLawsForPublicBodies",i.objects.results)},cacheLaws:function(e,t){var n=e.commit,s=t.laws;n(o.b,{laws:s})},getLawsForPublicBodies:function(e,t){var n=e.state,s=e.dispatch;new c.a(n.config).getLawsForPublicBodies(t,n.lawCache).then(function(e){s("cacheLaws",{laws:e})})},getSearchResults:function(e,t){var n=e.commit,s=e.state,r=e.dispatch,i=t.scope,u=t.search,a=t.filters;return n(o.e,{scope:i}),new c.a(s.config).searchPublicBodies(u,a).then(function(e){r("setSearchResults",{results:e,scope:i})})},setPublicBodyById:function(e,t){var n=e.state,s=e.dispatch,r=t.scope,i=t.id;return new c.a(n.config).getPublicBody(i).then(function(e){s("setPublicBodyByIdDone",{result:e,scope:r,id:i})})},setPublicBodyByIdDone:function(e,t){var n=e.commit,s=e.dispatch,r=t.scope,i=t.result,c=t.id;n(o.c,[i]),n(o.j,{publicBodyId:c,scope:r}),n(o.m),s("getLawsForPublicBodies",[i])},getSearchResultsUrl:function(e,t){var n=e.commit,s=e.state,r=(e.getters,e.dispatch),i=t.scope,u=t.url;return n(o.e,{scope:i}),new c.a(s.config).getJson(u).then(function(e){r("setSearchResults",{results:e,scope:i})})},getNextSearchResults:function(e,t){e.state;var n=e.getters;return(0,e.dispatch)("getSearchResultsUrl",{url:n.getScopedSearchMeta(t).next,scope:t})},getPreviousSearchResults:function(e,t){e.state;var n=e.getters;return(0,e.dispatch)("getSearchResultsUrl",{url:n.getScopedSearchMeta(t).previous,scope:t})}},strict:!1})},"../froide/frontend/javascript/store/mutation_types.js":function(e,t,n){"use strict";n.d(t,"g",function(){return s}),n.d(t,"l",function(){return r}),n.d(t,"o",function(){return i}),n.d(t,"n",function(){return o}),n.d(t,"m",function(){return c}),n.d(t,"i",function(){return u}),n.d(t,"j",function(){return a}),n.d(t,"a",function(){return l}),n.d(t,"f",function(){return d}),n.d(t,"d",function(){return p}),n.d(t,"h",function(){return f}),n.d(t,"c",function(){return h}),n.d(t,"b",function(){return b}),n.d(t,"x",function(){return v}),n.d(t,"k",function(){return m}),n.d(t,"e",function(){return y}),n.d(t,"z",function(){return g}),n.d(t,"s",function(){return _}),n.d(t,"v",function(){return j}),n.d(t,"p",function(){return S}),n.d(t,"u",function(){return P}),n.d(t,"w",function(){return B}),n.d(t,"t",function(){return R}),n.d(t,"r",function(){return O}),n.d(t,"y",function(){return w}),n.d(t,"A",function(){return E}),n.d(t,"q",function(){return x});var s="SET_CONFIG",r="SET_STEP",i="SET_STEP_SELECT_PUBLICBODY",o="SET_STEP_REVIEW_PUBLICBODY",c="SET_STEP_REQUEST",u="SET_PUBLICBODY",a="SET_PUBLICBODY_ID",l="ADD_PUBLICBODY_ID",d="REMOVE_PUBLICBODY_ID",p="CLEAR_PUBLICBODIES",f="SET_PUBLICBODIES",h="CACHE_PUBLICBODIES",b="CACHE_LAWS",v="UPDATE_LAW_TYPE",m="SET_SEARCHRESULTS",y="CLEAR_SEARCHRESULTS",g="UPDATE_SUBJECT",_="UPDATE_BODY",j="UPDATE_FULL_TEXT",S="SET_USER",P="UPDATE_FIRST_NAME",B="UPDATE_LAST_NAME",R="UPDATE_EMAIL",O="UPDATE_ADDRESS",w="UPDATE_PRIVATE",E="UPDATE_USER_ID",x={SELECT_PUBLICBODY:1,REVIEW_PUBLICBODY:2,WRITE_REQUEST:3}},"./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib/index.js?!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!../froide/frontend/javascript/components/publicbody/pb-action-list.vue?vue&type=style&index=0&id=49f418e4&lang=scss&scoped=true&":function(e,t,n){},"./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib/index.js?!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!../froide/frontend/javascript/components/publicbody/pb-multi-list.vue?vue&type=style&index=0&id=8a7e4a3e&lang=scss&scoped=true&":function(e,t,n){},"./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib/index.js?!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!../froide/frontend/javascript/components/publicbody/pb-result-list.vue?vue&type=style&index=0&id=51bf523e&lang=scss&scoped=true&":function(e,t,n){}})});
//# sourceMappingURL=publicbody.js.map