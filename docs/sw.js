try{self["workbox:core:6.5.3"]&&_()}catch{}const v=(a,...e)=>{let t=a;return e.length>0&&(t+=` :: ${JSON.stringify(e)}`),t},M=v;class l extends Error{constructor(e,t){const s=M(e,t);super(s),this.name=e,this.details=t}}const f={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:typeof registration<"u"?registration.scope:""},b=a=>[f.prefix,a,f.suffix].filter(e=>e&&e.length>0).join("-"),O=a=>{for(const e of Object.keys(f))a(e)},L={updateDetails:a=>{O(e=>{typeof a[e]=="string"&&(f[e]=a[e])})},getGoogleAnalyticsName:a=>a||b(f.googleAnalytics),getPrecacheName:a=>a||b(f.precache),getPrefix:()=>f.prefix,getRuntimeName:a=>a||b(f.runtime),getSuffix:()=>f.suffix};function P(a,e){const t=e();return a.waitUntil(t),t}try{self["workbox:precaching:6.5.3"]&&_()}catch{}const I="__WB_REVISION__";function A(a){if(!a)throw new l("add-to-cache-list-unexpected-type",{entry:a});if(typeof a=="string"){const r=new URL(a,location.href);return{cacheKey:r.href,url:r.href}}const{revision:e,url:t}=a;if(!t)throw new l("add-to-cache-list-unexpected-type",{entry:a});if(!e){const r=new URL(t,location.href);return{cacheKey:r.href,url:r.href}}const s=new URL(t,location.href),n=new URL(t,location.href);return s.searchParams.set(I,e),{cacheKey:s.href,url:n.href}}class W{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if(e.type==="install"&&t&&t.originalRequest&&t.originalRequest instanceof Request){const n=t.originalRequest.url;s?this.notUpdatedURLs.push(n):this.updatedURLs.push(n)}return s}}}class q{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:t,params:s})=>{const n=(s==null?void 0:s.cacheKey)||this._precacheController.getCacheKeyForURL(t.url);return n?new Request(n,{headers:t.headers}):t},this._precacheController=e}}let y;function S(){if(y===void 0){const a=new Response("");if("body"in a)try{new Response(a.body),y=!0}catch{y=!1}y=!1}return y}async function D(a,e){let t=null;if(a.url&&(t=new URL(a.url).origin),t!==self.location.origin)throw new l("cross-origin-copy-response",{origin:t});const s=a.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},r=e?e(n):n,i=S()?s.body:await s.blob();return new Response(i,r)}const H=a=>new URL(String(a),location.href).href.replace(new RegExp(`^${location.origin}`),"");function K(a,e){const t=new URL(a);for(const s of e)t.searchParams.delete(s);return t.href}async function j(a,e,t,s){const n=K(e.url,t);if(e.url===n)return a.match(e,s);const r=Object.assign(Object.assign({},s),{ignoreSearch:!0}),i=await a.keys(e,r);for(const c of i){const o=K(c.url,t);if(n===o)return a.match(c,s)}}class F{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}const B=new Set;async function $(){for(const a of B)await a()}function V(a){return new Promise(e=>setTimeout(e,a))}try{self["workbox:strategies:6.5.3"]&&_()}catch{}function R(a){return typeof a=="string"?new Request(a):a}class G{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new F,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const s of this._plugins)this._pluginStateMap.set(s,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:t}=this;let s=R(e);if(s.mode==="navigate"&&t instanceof FetchEvent&&t.preloadResponse){const i=await t.preloadResponse;if(i)return i}const n=this.hasCallback("fetchDidFail")?s.clone():null;try{for(const i of this.iterateCallbacks("requestWillFetch"))s=await i({request:s.clone(),event:t})}catch(i){if(i instanceof Error)throw new l("plugin-error-request-will-fetch",{thrownErrorMessage:i.message})}const r=s.clone();try{let i;i=await fetch(s,s.mode==="navigate"?void 0:this._strategy.fetchOptions);for(const c of this.iterateCallbacks("fetchDidSucceed"))i=await c({event:t,request:r,response:i});return i}catch(i){throw n&&await this.runCallbacks("fetchDidFail",{error:i,event:t,originalRequest:n.clone(),request:r.clone()}),i}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=R(e);let s;const{cacheName:n,matchOptions:r}=this._strategy,i=await this.getCacheKey(t,"read"),c=Object.assign(Object.assign({},r),{cacheName:n});s=await caches.match(i,c);for(const o of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await o({cacheName:n,matchOptions:r,cachedResponse:s,request:i,event:this.event})||void 0;return s}async cachePut(e,t){const s=R(e);await V(0);const n=await this.getCacheKey(s,"write");if(!t)throw new l("cache-put-with-no-response",{url:H(n.url)});const r=await this._ensureResponseSafeToCache(t);if(!r)return!1;const{cacheName:i,matchOptions:c}=this._strategy,o=await self.caches.open(i),h=this.hasCallback("cacheDidUpdate"),p=h?await j(o,n.clone(),["__WB_REVISION__"],c):null;try{await o.put(n,h?r.clone():r)}catch(u){if(u instanceof Error)throw u.name==="QuotaExceededError"&&await $(),u}for(const u of this.iterateCallbacks("cacheDidUpdate"))await u({cacheName:i,oldResponse:p,newResponse:r.clone(),request:n,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let n=e;for(const r of this.iterateCallbacks("cacheKeyWillBeUsed"))n=R(await r({mode:t,request:n,event:this.event,params:this.params}));this._cacheKeys[s]=n}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if(typeof t[e]=="function"){const s=this._pluginStateMap.get(t);yield r=>{const i=Object.assign(Object.assign({},r),{state:s});return t[e](i)}}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const n of this.iterateCallbacks("cacheWillUpdate"))if(t=await n({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&t.status!==200&&(t=void 0),t}}class Q{constructor(e={}){this.cacheName=L.getRuntimeName(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s=typeof e.request=="string"?new Request(e.request):e.request,n="params"in e?e.params:void 0,r=new G(this,{event:t,request:s,params:n}),i=this._getResponse(r,s,t),c=this._awaitComplete(i,r,s,t);return[i,c]}async _getResponse(e,t,s){await e.runCallbacks("handlerWillStart",{event:s,request:t});let n;try{if(n=await this._handle(t,e),!n||n.type==="error")throw new l("no-response",{url:t.url})}catch(r){if(r instanceof Error){for(const i of e.iterateCallbacks("handlerDidError"))if(n=await i({error:r,event:s,request:t}),n)break}if(!n)throw r}for(const r of e.iterateCallbacks("handlerWillRespond"))n=await r({event:s,request:t,response:n});return n}async _awaitComplete(e,t,s,n){let r,i;try{r=await e}catch{}try{await t.runCallbacks("handlerDidRespond",{event:n,request:s,response:r}),await t.doneWaiting()}catch(c){c instanceof Error&&(i=c)}if(await t.runCallbacks("handlerDidComplete",{event:n,request:s,response:r,error:i}),t.destroy(),i)throw i}}class d extends Q{constructor(e={}){e.cacheName=L.getPrecacheName(e.cacheName),super(e),this._fallbackToNetwork=e.fallbackToNetwork!==!1,this.plugins.push(d.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&t.event.type==="install"?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,t){let s;const n=t.params||{};if(this._fallbackToNetwork){const r=n.integrity,i=e.integrity,c=!i||i===r;s=await t.fetch(new Request(e,{integrity:e.mode!=="no-cors"?i||r:void 0})),r&&c&&e.mode!=="no-cors"&&(this._useDefaultCacheabilityPluginIfNeeded(),await t.cachePut(e,s.clone()))}else throw new l("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return s}async _handleInstall(e,t){this._useDefaultCacheabilityPluginIfNeeded();const s=await t.fetch(e);if(!await t.cachePut(e,s.clone()))throw new l("bad-precaching-response",{url:e.url,status:s.status});return s}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,n]of this.plugins.entries())n!==d.copyRedirectedCacheableResponsesPlugin&&(n===d.defaultPrecacheCacheabilityPlugin&&(e=s),n.cacheWillUpdate&&t++);t===0?this.plugins.push(d.defaultPrecacheCacheabilityPlugin):t>1&&e!==null&&this.plugins.splice(e,1)}}d.defaultPrecacheCacheabilityPlugin={async cacheWillUpdate({response:a}){return!a||a.status>=400?null:a}};d.copyRedirectedCacheableResponsesPlugin={async cacheWillUpdate({response:a}){return a.redirected?await D(a):a}};class z{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new d({cacheName:L.getPrecacheName(e),plugins:[...t,new q({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const t=[];for(const s of e){typeof s=="string"?t.push(s):s&&s.revision===void 0&&t.push(s.url);const{cacheKey:n,url:r}=A(s),i=typeof s!="string"&&s.revision?"reload":"default";if(this._urlsToCacheKeys.has(r)&&this._urlsToCacheKeys.get(r)!==n)throw new l("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(r),secondEntry:n});if(typeof s!="string"&&s.integrity){if(this._cacheKeysToIntegrities.has(n)&&this._cacheKeysToIntegrities.get(n)!==s.integrity)throw new l("add-to-cache-list-conflicting-integrities",{url:r});this._cacheKeysToIntegrities.set(n,s.integrity)}if(this._urlsToCacheKeys.set(r,n),this._urlsToCacheModes.set(r,i),t.length>0){const c=`Workbox is precaching URLs without revision info: ${t.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(c)}}}install(e){return P(e,async()=>{const t=new W;this.strategy.plugins.push(t);for(const[r,i]of this._urlsToCacheKeys){const c=this._cacheKeysToIntegrities.get(i),o=this._urlsToCacheModes.get(r),h=new Request(r,{integrity:c,cache:o,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:i},request:h,event:e}))}const{updatedURLs:s,notUpdatedURLs:n}=t;return{updatedURLs:s,notUpdatedURLs:n}})}activate(e){return P(e,async()=>{const t=await self.caches.open(this.strategy.cacheName),s=await t.keys(),n=new Set(this._urlsToCacheKeys.values()),r=[];for(const i of s)n.has(i.url)||(await t.delete(i),r.push(i.url));return{deletedURLs:r}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s)return(await self.caches.open(this.strategy.cacheName)).match(s)}createHandlerBoundToURL(e){const t=this.getCacheKeyForURL(e);if(!t)throw new l("non-precached-url",{url:e});return s=>(s.request=new Request(e),s.params=Object.assign({cacheKey:t},s.params),this.strategy.handle(s))}}let U;const x=()=>(U||(U=new z),U);try{self["workbox:routing:6.5.3"]&&_()}catch{}const N="GET",C=a=>a&&typeof a=="object"?a:{handle:a};class m{constructor(e,t,s=N){this.handler=C(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=C(e)}}class J extends m{constructor(e,t,s){const n=({url:r})=>{const i=e.exec(r.href);if(i&&!(r.origin!==location.origin&&i.index!==0))return i.slice(1)};super(n,t,s)}}class Y{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&e.data.type==="CACHE_URLS"){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(n=>{typeof n=="string"&&(n=[n]);const r=new Request(...n);return this.handleRequest({request:r,event:e})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:r,route:i}=this.findMatchingRoute({event:t,request:e,sameOrigin:n,url:s});let c=i&&i.handler;const o=e.method;if(!c&&this._defaultHandlerMap.has(o)&&(c=this._defaultHandlerMap.get(o)),!c)return;let h;try{h=c.handle({url:s,request:e,event:t,params:r})}catch(u){h=Promise.reject(u)}const p=i&&i.catchHandler;return h instanceof Promise&&(this._catchHandler||p)&&(h=h.catch(async u=>{if(p)try{return await p.handle({url:s,request:e,event:t,params:r})}catch(k){k instanceof Error&&(u=k)}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw u})),h}findMatchingRoute({url:e,sameOrigin:t,request:s,event:n}){const r=this._routes.get(s.method)||[];for(const i of r){let c;const o=i.match({url:e,sameOrigin:t,request:s,event:n});if(o)return c=o,(Array.isArray(c)&&c.length===0||o.constructor===Object&&Object.keys(o).length===0||typeof o=="boolean")&&(c=void 0),{route:i,params:c}}return{}}setDefaultHandler(e,t=N){this._defaultHandlerMap.set(t,C(e))}setCatchHandler(e){this._catchHandler=C(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new l("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(t>-1)this._routes.get(e.method).splice(t,1);else throw new l("unregister-route-route-not-registered")}}let w;const X=()=>(w||(w=new Y,w.addFetchListener(),w.addCacheListener()),w);function E(a,e,t){let s;if(typeof a=="string"){const r=new URL(a,location.href),i=({url:c})=>c.href===r.href;s=new m(i,e,t)}else if(a instanceof RegExp)s=new J(a,e,t);else if(typeof a=="function")s=new m(a,e,t);else if(a instanceof m)s=a;else throw new l("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});return X().registerRoute(s),s}function Z(a,e=[]){for(const t of[...a.searchParams.keys()])e.some(s=>s.test(t))&&a.searchParams.delete(t);return a}function*ee(a,{ignoreURLParametersMatching:e=[/^utm_/,/^fbclid$/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={}){const r=new URL(a,location.href);r.hash="",yield r.href;const i=Z(r,e);if(yield i.href,t&&i.pathname.endsWith("/")){const c=new URL(i.href);c.pathname+=t,yield c.href}if(s){const c=new URL(i.href);c.pathname+=".html",yield c.href}if(n){const c=n({url:r});for(const o of c)yield o.href}}class te extends m{constructor(e,t){const s=({request:n})=>{const r=e.getURLsToCacheKeys();for(const i of ee(n.url,t)){const c=r.get(i);if(c){const o=e.getIntegrityForCacheKey(c);return{cacheKey:c,integrity:o}}}};super(s,e.strategy)}}function se(a){const e=x(),t=new te(e,a);E(t)}function ae(a){x().precache(a)}function ne(a,e){ae(a),se(e)}function re(){self.addEventListener("activate",()=>self.clients.claim())}const T="/screen-recorder/streaming-downloads/",g=new Map;E(({url:a})=>a.pathname.startsWith(T),async({url:a})=>{const e=a.pathname.slice(T.length);if(e==="ping")return new Response("pong",{status:200});if(!g.has(e))return new Response(`No stream exists!
You cannot download a file again in streaming downloads
Are you sharing the download url 😒`,{status:404,headers:new Headers({"Content-Type":"text/plain;charset=UTF-8"})});const t=g.get(e);return g.delete(e),t});self.addEventListener("message",a=>{if(!a.isTrusted)return console.log("Message from an untrustworthy page");a.data.type==="streaming-downloads-response"?ie(a.data):a.data.type==="streaming-downloads-revoke"&&g.has(a.data.filename)&&g.delete(a.data.filename)});function ie(a){const e=a.filename;g.has(e)&&g.delete(e);const s=new Headers;a.headers.forEach(r=>s.set(r[0],r[1]));const n=a.stream instanceof MessagePort?ce(a.stream):a.stream;g.set(e,new Response(n,{headers:s,status:a.status})),console.log("registering",e)}function ce(a){return new ReadableStream({start(e){a.addEventListener("message",t=>{if(!(t.data instanceof Uint8Array))return t.data==="close"&&e.close(),t.data==="error"&&e.error(),console.log("Unknown message recived");e.enqueue(t.data)}),a.postMessage("start")},pull(e){a.postMessage("pull")},cancel(e){a.postMessage("cancel")}})}ne([{"revision":null,"url":"assets/index-309e84a1.js"},{"revision":null,"url":"assets/index-7df25441.css"},{"revision":null,"url":"assets/workbox-window.prod.es5-295a6886.js"},{"revision":"2be0a9ff17889dd4e4c8e3fa315ea12a","url":"index.html"},{"revision":"741cd6102312c9027ce0194ca7c35a74","url":"manifest.webmanifest"}]);re();
//# sourceMappingURL=sw.js.map
