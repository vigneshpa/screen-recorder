(()=>{"use strict";var e,r,t,n,o,i={833:(e,r,t)=>{e.exports=t.p+"assets/loading.html"}},a={};function s(e){var r=a[e];if(void 0!==r)return r.exports;var t=a[e]={exports:{}};return i[e].call(t.exports,t,t.exports,s),t.exports}s.m=i,e=[],s.O=(r,t,n,o)=>{if(!t){var i=1/0;for(d=0;d<e.length;d++){for(var[t,n,o]=e[d],a=!0,l=0;l<t.length;l++)(!1&o||i>=o)&&Object.keys(s.O).every((e=>s.O[e](t[l])))?t.splice(l--,1):(a=!1,o<i&&(i=o));if(a){e.splice(d--,1);var c=n();void 0!==c&&(r=c)}}return r}o=o||0;for(var d=e.length;d>0&&e[d-1][2]>o;d--)e[d]=e[d-1];e[d]=[t,n,o]},s.F={},s.E=e=>{Object.keys(s.F).map((r=>{s.F[r](e)}))},s.d=(e,r)=>{for(var t in r)s.o(r,t)&&!s.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},s.f={},s.e=e=>Promise.all(Object.keys(s.f).reduce(((r,t)=>(s.f[t](e,r),r)),[])),s.u=e=>"js/"+(327===e?"appComponent":e)+".js",s.miniCssF=e=>"css/appComponent.css",s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),s.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),r={},t="screen-recorder:",s.l=(e,n,o,i)=>{if(r[e])r[e].push(n);else{var a,l;if(void 0!==o)for(var c=document.getElementsByTagName("script"),d=0;d<c.length;d++){var u=c[d];if(u.getAttribute("src")==e||u.getAttribute("data-webpack")==t+o){a=u;break}}a||(l=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,s.nc&&a.setAttribute("nonce",s.nc),a.setAttribute("data-webpack",t+o),a.src=e),r[e]=[n];var p=(t,n)=>{a.onerror=a.onload=null,clearTimeout(f);var o=r[e];if(delete r[e],a.parentNode&&a.parentNode.removeChild(a),o&&o.forEach((e=>e(n))),t)return t(n)},f=setTimeout(p.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=p.bind(null,a.onerror),a.onload=p.bind(null,a.onload),l&&document.head.appendChild(a)}},s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;s.g.importScripts&&(e=s.g.location+"");var r=s.g.document;if(!e&&r&&(r.currentScript&&(e=r.currentScript.src),!e)){var t=r.getElementsByTagName("script");t.length&&(e=t[t.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),s.p=e+"../"})(),n=e=>new Promise(((r,t)=>{var n=s.miniCssF(e),o=s.p+n;if(((e,r)=>{for(var t=document.getElementsByTagName("link"),n=0;n<t.length;n++){var o=(a=t[n]).getAttribute("data-href")||a.getAttribute("href");if("stylesheet"===a.rel&&(o===e||o===r))return a}var i=document.getElementsByTagName("style");for(n=0;n<i.length;n++){var a;if((o=(a=i[n]).getAttribute("data-href"))===e||o===r)return a}})(n,o))return r();((e,r,t,n)=>{var o=document.createElement("link");o.rel="stylesheet",o.type="text/css",o.onerror=o.onload=i=>{if(o.onerror=o.onload=null,"load"===i.type)t();else{var a=i&&("load"===i.type?"missing":i.type),s=i&&i.target&&i.target.href||r,l=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=a,l.request=s,o.parentNode.removeChild(o),n(l)}},o.href=r,document.head.appendChild(o)})(e,o,r,t)})),o={143:0},s.f.miniCss=(e,r)=>{o[e]?r.push(o[e]):0!==o[e]&&{327:1}[e]&&r.push(o[e]=n(e).then((()=>{o[e]=0}),(r=>{throw delete o[e],r})))},(()=>{var e={143:0};s.f.j=(r,t)=>{var n=s.o(e,r)?e[r]:void 0;if(0!==n)if(n)t.push(n[2]);else{var o=new Promise(((t,o)=>n=e[r]=[t,o]));t.push(n[2]=o);var i=s.p+s.u(r),a=new Error;s.l(i,(t=>{if(s.o(e,r)&&(0!==(n=e[r])&&(e[r]=void 0),n)){var o=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src;a.message="Loading chunk "+r+" failed.\n("+o+": "+i+")",a.name="ChunkLoadError",a.type=o,a.request=i,n[1](a)}}),"chunk-"+r,r)}},s.F.j=r=>{if(!s.o(e,r)||void 0===e[r]){e[r]=null;var t=document.createElement("link");s.nc&&t.setAttribute("nonce",s.nc),t.rel="prefetch",t.as="script",t.href=s.p+s.u(r),document.head.appendChild(t)}},s.O.j=r=>0===e[r];var r=(r,t)=>{var n,o,[i,a,l]=t,c=0;if(i.some((r=>0!==e[r]))){for(n in a)s.o(a,n)&&(s.m[n]=a[n]);if(l)var d=l(s)}for(r&&r(t);c<i.length;c++)o=i[c],s.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return s.O(d)},t=self.webpackChunkscreen_recorder=self.webpackChunkscreen_recorder||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))})(),s.O(0,[143],(()=>{s.E(966),s.E(327)}),5);var l={};(()=>{var e=s(833);const r=new URL(s.p);let t=!1;const n=async()=>{if(t)return;t=!0,window.document.body.innerHTML="";const e=(await Promise.all([s.e(966),s.e(327)]).then(s.bind(s,548))).default;window.document.body.innerHTML="",window.app=new e({target:window.document.body})};function o(){t||fetch(e).then((e=>e.text().then((e=>window.document.body.innerHTML=e)))),window.navigator.serviceWorker.register(new URL(r+"service-worker.js"),{scope:r.href}).then((e=>{e.addEventListener("updatefound",(r=>{const t=e.installing;t.addEventListener("statechange",(e=>{console.log(`Installing worker state ${t.state}`),"activated"===t.state&&n()}))}))})).catch((e=>{console.error(e)}))}"serviceWorker"in navigator?(navigator.serviceWorker.controller&&n(),window.addEventListener("offline",(e=>console.log("service worker offline"))),window.addEventListener("online",(e=>o())),navigator.onLine?o():console.log("service worker offline")):n()})(),l=s.O(l)})();
//# sourceMappingURL=app.js.map