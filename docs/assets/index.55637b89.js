var ft=Object.defineProperty;var ht=(s,t,e)=>t in s?ft(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var K=(s,t,e)=>(ht(s,typeof t!="symbol"?t+"":t,e),e);import{S as ve,i as _e,s as me,c as ze,e as v,a as E,b as f,d as C,f as u,g as Be,l as N,u as Fe,h as Je,j as He,t as Ke,k as P,m as j,n as M,r as Ge,o as O,p as pt,q as Ce,v as I,w as Qe,x as Me,y as Ae,z as $,A as ie,B as ge,C as Xe,D as re,E as x,F as le,G as ae,H as vt,I as ce,J as Ye,K as _t,L as Le,M as mt}from"./vendor.5fc1bdd9.js";const gt=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function e(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerpolicy&&(o.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?o.credentials="include":r.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=e(r);fetch(r.href,o)}};gt();function wt(s){let t,e,n,r,o,i,a,c,h,p,m;const w=s[4].default,d=ze(w,s,s[3],null);return{c(){t=v("div"),e=v("label"),d&&d.c(),n=E(),r=v("button"),r.textContent="-",o=E(),i=v("input"),a=E(),c=v("button"),c.textContent="+",f(e,"for",s[2]),f(e,"class","svelte-sfum2z"),f(r,"class","dec svelte-sfum2z"),f(i,"type","number"),f(i,"id",s[2]),f(i,"min",s[1]),f(i,"class","svelte-sfum2z"),f(c,"class","inc svelte-sfum2z"),f(t,"class","container svelte-sfum2z")},m(_,y){C(_,t,y),u(t,e),d&&d.m(e,null),u(t,n),u(t,r),u(t,o),u(t,i),Be(i,s[0]),u(t,a),u(t,c),h=!0,p||(m=[N(r,"click",s[5]),N(i,"input",s[6]),N(c,"click",s[7])],p=!0)},p(_,[y]){d&&d.p&&(!h||y&8)&&Fe(d,w,_,_[3],h?He(w,_[3],y,null):Je(_[3]),null),(!h||y&2)&&f(i,"min",_[1]),y&1&&Ke(i.value)!==_[0]&&Be(i,_[0])},i(_){h||(P(d,_),h=!0)},o(_){j(d,_),h=!1},d(_){_&&M(t),d&&d.d(_),p=!1,Ge(m)}}}function bt(s,t,e){let{$$slots:n={},$$scope:r}=t,{value:o=0}=t,{min:i=0}=t,a=Math.floor(Math.random()*1e3)+"-number";const c=()=>e(0,o--,o);function h(){o=Ke(this.value),e(0,o),e(1,i)}const p=()=>e(0,o++,o);return s.$$set=m=>{"value"in m&&e(0,o=m.value),"min"in m&&e(1,i=m.min),"$$scope"in m&&e(3,r=m.$$scope)},s.$$.update=()=>{s.$$.dirty&3&&(e(0,o=Math.trunc(o)),o<i&&e(0,o=i))},[o,i,a,r,n,c,h,p]}class yt extends ve{constructor(t){super();_e(this,t,bt,wt,me,{value:0,min:1})}}async function Re(s=1e3){return new Promise(t=>setTimeout(()=>t(),s))}async function*kt(s,t=1e3){for(let e=0;e<=s&&(yield s-e,s!==e);e++)await Re(t)}function St(s,t){const e=document.createElement("a");e.hidden=!0;const n=URL.createObjectURL(t);e.href=n,e.download=s,document.body.append(e),e.click(),e.remove(),setTimeout(()=>URL.revokeObjectURL(n))}function Et(s){let t="hiddenDownloader",e=document.getElementById(t);e===null&&(e=document.createElement("iframe"),e.id=t,e.style.display="none",document.body.appendChild(e)),e.src=s}function Ct(s,t,e){if(e=e||"application/octet-stream",!window.navigator.serviceWorker.controller)throw new Error("No service worker registered");const n=Mt(t),r=[];r.push(["Content-Disposition",`attachment; filename="${s}"`]),r.push(["Content-Type",e]),r.push(["Connection","close"]),r.push(["Cache-Control","no-cache"]);try{window.navigator.serviceWorker.controller.postMessage({type:"streaming-downloads-response",filename:s,stream:n,headers:r,status:200},[n])}catch(o){console.warn(o);const i=Math.floor(Math.random()*10**5);window.navigator.serviceWorker.controller.postMessage({type:"streaming-downloads-response-chunked",filename:s,headers:r,id:i,status:200});const a=n.getReader();(function c(){a.read().then(({done:h,value:p})=>{h?window.navigator.serviceWorker.controller.postMessage({type:"streaming-downloads-response-stop",id:i}):(window.navigator.serviceWorker.controller.postMessage({type:"streaming-downloads-response-chunk",id:i,data:p}),c())})})()}setTimeout(()=>Et("/screen-recorder/streaming-downloads/"+s),1e3)}function Mt(s){let t;return new ReadableStream({start(){t=s.getReader()},async pull(e){const{value:n,done:r}=await t.read();r?e.close():e.enqueue(new Uint8Array(await n.arrayBuffer()))}})}class At extends window.EventTarget{constructor(t){super();K(this,"config");K(this,"recorder");K(this,"rStream");K(this,"aDest");K(this,"aCtx");K(this,"writer");K(this,"state");this.config=t,this.rStream=new MediaStream,this.recorder=new MediaRecorder(this.rStream,{mimeType:this.config.mime}),this.aCtx=new AudioContext,this.aDest=this.aCtx.createMediaStreamDestination(),this.state="idle"}async requestScreen(){const t=await navigator.mediaDevices.getDisplayMedia({video:!0,audio:this.config.systemAudio});t.getVideoTracks().length<1&&this.throwError("Unable to get video"),t.getVideoTracks().forEach(e=>this.rStream.addTrack(e)),this.config.systemAudio&&(this.config.systemAudio=t.getAudioTracks().length>0),this.config.systemAudio&&this.aCtx.createMediaStreamSource(t).connect(this.aDest),this.recorder.addEventListener("stop",e=>setTimeout(n=>t.getTracks().forEach(r=>r.stop()),300)),t.getVideoTracks()[0].addEventListener("ended",()=>this.stop())}async requestMicrophone(){if(!this.config.microphone)return;const t=await navigator.mediaDevices.getUserMedia({audio:!0});this.config.microphone=t.getAudioTracks().length>0,!!this.config.microphone&&(this.recorder.addEventListener("stop",e=>setTimeout(n=>t.getTracks().forEach(r=>r.stop()),300)),this.aCtx.createMediaStreamSource(t).connect(this.aDest))}async requestStreams(){return this.state!=="idle"&&this.throwError("Recorder is not idle"),await this.requestScreen(),await this.requestMicrophone(),(this.config.microphone||this.config.systemAudio)&&this.aDest.stream.getAudioTracks().forEach(t=>this.rStream.addTrack(t)),this.state="gotPermissions",this.dispatchEvent(new Event("gotPermissions")),this.rStream}saveStream(t="screencapture-"+new Date().toLocaleDateString().replaceAll("/","-")){if(this.state!=="gotPermissions"&&this.throwError("The recorder's state is invalid"),this.config.timeslice&&window.navigator.serviceWorker.controller){const e=this;let n,r;const o=new ReadableStream({start(i){n=a=>{i.enqueue(a),Re(e.config.timeslice).then(()=>{r&&(r(),r=null)})},e.recorder.addEventListener("dataavailable",async a=>{n(a.data)}),e.recorder.addEventListener("stop",a=>{Re(e.config.timeslice*2).then(()=>i.close()),e.state="stopped",e.dispatchEvent(new Event("stopped"))})},pull(){return new Promise(i=>{r=i,e.recorder.state==="recording"&&e.recorder.requestData()})},cancel(){e.stop()}});Ct(t+"."+this.config.ext,o,this.config.mime),this.recorder.start()}else this.recorder.addEventListener("dataavailable",e=>St(t+"."+this.config.ext,e.data)),this.recorder.addEventListener("stop",e=>{this.state="stopped",this.dispatchEvent(new Event("stopped"))}),this.recorder.start();this.state="recording"}stop(){this.state==="recording"?this.recorder.stop():this.throwError("Cannot stop recording"),this.state="stopping",this.aCtx.close(),this.dispatchEvent(new Event("stopping"))}throwError(t){const e=new Error(t);this.state="error";const n=new Event("error");throw n.error=e,this.dispatchEvent(n),e}}function Lt(s){let t,e,n,r,o,i,a,c,h,p;const m=s[3].default,w=ze(m,s,s[2],null);return{c(){t=v("div"),e=v("label"),n=v("input"),r=E(),o=v("div"),i=E(),a=v("label"),w&&w.c(),f(n,"type","checkbox"),f(n,"id",s[1]),f(n,"class","svelte-vrio6k"),f(o,"class","but svelte-vrio6k"),f(e,"class","switch svelte-vrio6k"),f(a,"for",s[1]),f(a,"class","txt svelte-vrio6k"),f(t,"class","container svelte-vrio6k")},m(d,_){C(d,t,_),u(t,e),u(e,n),n.checked=s[0],u(e,r),u(e,o),u(t,i),u(t,a),w&&w.m(a,null),c=!0,h||(p=N(n,"change",s[4]),h=!0)},p(d,[_]){_&1&&(n.checked=d[0]),w&&w.p&&(!c||_&4)&&Fe(w,m,d,d[2],c?He(m,d[2],_,null):Je(d[2]),null)},i(d){c||(P(w,d),c=!0)},o(d){j(w,d),c=!1},d(d){d&&M(t),w&&w.d(d),h=!1,p()}}}function Rt(s,t,e){let{$$slots:n={},$$scope:r}=t,{value:o=!1}=t,i=Math.trunc(Math.random()*1e3)+"-switch";function a(){o=this.checked,e(0,o)}return s.$$set=c=>{"value"in c&&e(0,o=c.value),"$$scope"in c&&e(2,r=c.$$scope)},[o,i,r,n,a]}class Te extends ve{constructor(t){super();_e(this,t,Rt,Lt,me,{value:0})}}function Tt(s){let t,e,n,r,o;return{c(){t=v("div"),e=v("div"),n=v("div"),f(n,"class","innerdiv svelte-r167gc"),O(n,"recording",s[0]),f(e,"class","ring svelte-r167gc"),O(e,"recording",s[0]),f(t,"class","container svelte-r167gc")},m(i,a){C(i,t,a),u(t,e),u(e,n),r||(o=N(e,"click",function(){pt(s[1])&&s[1].apply(this,arguments)}),r=!0)},p(i,[a]){s=i,a&1&&O(n,"recording",s[0]),a&1&&O(e,"recording",s[0])},i:Ce,o:Ce,d(i){i&&M(t),r=!1,o()}}}function Dt(s,t,e){let{recording:n=!1}=t,{toogle:r=()=>{e(0,n=!n)}}=t;return s.$$set=o=>{"recording"in o&&e(0,n=o.recording),"toogle"in o&&e(1,r=o.toogle)},[n,r]}class qt extends ve{constructor(t){super();_e(this,t,Dt,Tt,me,{recording:0,toogle:1})}}function Ot(){const s=["webm","x-matroska","mp4","ogg"],t=[["av1","av01","vp10"],["vp9","vp09","vp9.0"],["h265","h.265","hevc"],["vp8","vp08","vp8.0"],["avc1","h264","h.264"],["theora"],["h263","h.263"],["mp4v"]],e=[["opus"],["aac"],["vorbis"],["mp4a"]],n=new Map;for(let r of s){if(!MediaRecorder.isTypeSupported("video/"+r))continue;const o=new Map;for(let i of t){const a=i.find(h=>MediaRecorder.isTypeSupported("video/"+r+';codecs="'+h+'"'));if(!a)continue;const c=[];for(let h of e){const p=h.find(m=>MediaRecorder.isTypeSupported("video/"+r+';codecs="'+a+","+m+'"'));!p||c.push(p)}o.set(a,c)}n.set(r,o)}return n}const Nt=new Map([["webm","webm"],["x-matroska","mkv"],["mp4","mp4"],["ogg","ogg"]]);function Ze(s,t,e){const n=s.slice();return n[31]=t[e],n}function $e(s,t,e){const n=s.slice();return n[31]=t[e],n}function xe(s,t,e){const n=s.slice();return n[31]=t[e],n}function et(s){let t,e=s[31]+"",n,r;return{c(){t=v("option"),n=I(e),t.__value=r=s[31],t.value=t.__value,f(t,"class","svelte-1tiyxd5")},m(o,i){C(o,t,i),u(t,n)},p:Ce,d(o){o&&M(t)}}}function tt(s){var r;let t,e=Array.from(((r=s[12].get(s[4]))==null?void 0:r.keys())||[]),n=[];for(let o=0;o<e.length;o+=1)n[o]=st($e(s,e,o));return{c(){for(let o=0;o<n.length;o+=1)n[o].c();t=Qe()},m(o,i){for(let a=0;a<n.length;a+=1)n[a].m(o,i);C(o,t,i)},p(o,i){var a;if(i[0]&4112){e=Array.from(((a=o[12].get(o[4]))==null?void 0:a.keys())||[]);let c;for(c=0;c<e.length;c+=1){const h=$e(o,e,c);n[c]?n[c].p(h,i):(n[c]=st(h),n[c].c(),n[c].m(t.parentNode,t))}for(;c<n.length;c+=1)n[c].d(1);n.length=e.length}},d(o){Ae(n,o),o&&M(t)}}}function st(s){let t,e=s[31]+"",n,r;return{c(){t=v("option"),n=I(e),t.__value=r=s[31],t.value=t.__value,f(t,"class","svelte-1tiyxd5")},m(o,i){C(o,t,i),u(t,n)},p(o,i){i[0]&16&&e!==(e=o[31]+"")&&Me(n,e),i[0]&4112&&r!==(r=o[31])&&(t.__value=r,t.value=t.__value)},d(o){o&&M(t)}}}function nt(s){var r,o;let t,e=((o=(r=s[12])==null?void 0:r.get(s[4]))==null?void 0:o.get(s[5]))||[],n=[];for(let i=0;i<e.length;i+=1)n[i]=ot(Ze(s,e,i));return{c(){for(let i=0;i<n.length;i+=1)n[i].c();t=Qe()},m(i,a){for(let c=0;c<n.length;c+=1)n[c].m(i,a);C(i,t,a)},p(i,a){var c,h;if(a[0]&4144){e=((h=(c=i[12])==null?void 0:c.get(i[4]))==null?void 0:h.get(i[5]))||[];let p;for(p=0;p<e.length;p+=1){const m=Ze(i,e,p);n[p]?n[p].p(m,a):(n[p]=ot(m),n[p].c(),n[p].m(t.parentNode,t))}for(;p<n.length;p+=1)n[p].d(1);n.length=e.length}},d(i){Ae(n,i),i&&M(t)}}}function ot(s){let t,e=s[31]+"",n,r;return{c(){t=v("option"),n=I(e),t.__value=r=s[31],t.value=t.__value,f(t,"class","svelte-1tiyxd5")},m(o,i){C(o,t,i),u(t,n)},p(o,i){i[0]&48&&e!==(e=o[31]+"")&&Me(n,e),i[0]&4144&&r!==(r=o[31])&&(t.__value=r,t.value=t.__value)},d(o){o&&M(t)}}}function It(s){let t;return{c(){t=I("Record system audio")},m(e,n){C(e,t,n)},d(e){e&&M(t)}}}function Ut(s){let t;return{c(){t=I("Record from microphone")},m(e,n){C(e,t,n)},d(e){e&&M(t)}}}function Vt(s){let t;return{c(){t=I("Save video while recording (recomended)")},m(e,n){C(e,t,n)},d(e){e&&M(t)}}}function Wt(s){let t;return{c(){t=I("Countdown")},m(e,n){C(e,t,n)},d(e){e&&M(t)}}}function it(s){let t,e,n,r;return{c(){t=v("div"),e=I(s[9]),f(t,"class","counter svelte-1tiyxd5")},m(o,i){C(o,t,i),u(t,e),r=!0},p(o,i){(!r||i[0]&512)&&Me(e,o[9])},i(o){r||(ge(()=>{n||(n=Xe(t,Ye,{},!0)),n.run(1)}),r=!0)},o(o){n||(n=Xe(t,Ye,{},!1)),n.run(0),r=!1},d(o){o&&M(t),o&&n&&n.end()}}}function Pt(s){let t,e,n,r,o,i,a,c,h,p,m,w,d,_,y,ee,T,D,z,te,S,U,se,ue,V,ne,de,W,oe,fe,G,he,Q,b,B,F,J,we,De,Y,H,be,qe,pe,ye,Oe,Z=Array.from(s[12].keys()),A=[];for(let l=0;l<Z.length;l+=1)A[l]=et(xe(s,Z,l));let L=s[4]&&tt(s),R=s[5]&&nt(s);function lt(l){s[20](l)}let Ne={$$slots:{default:[It]},$$scope:{ctx:s}};s[0]!==void 0&&(Ne.value=s[0]),U=new Te({props:Ne}),$.push(()=>ie(U,"value",lt));function at(l){s[21](l)}let Ie={$$slots:{default:[Ut]},$$scope:{ctx:s}};s[1]!==void 0&&(Ie.value=s[1]),V=new Te({props:Ie}),$.push(()=>ie(V,"value",at));function ct(l){s[22](l)}let Ue={$$slots:{default:[Vt]},$$scope:{ctx:s}};s[2]!==void 0&&(Ue.value=s[2]),W=new Te({props:Ue}),$.push(()=>ie(W,"value",ct));function ut(l){s[25](l)}let Ve={$$slots:{default:[Wt]},$$scope:{ctx:s}};s[3]!==void 0&&(Ve.value=s[3]),J=new yt({props:Ve}),$.push(()=>ie(J,"value",ut));function dt(l){s[26](l)}let We={toogle:s[14]};s[8]!==void 0&&(We.recording=s[8]),H=new qt({props:We}),$.push(()=>ie(H,"recording",dt));let k=s[10]&&it(s);return{c(){t=v("div"),e=v("video"),n=E(),r=v("div"),o=v("div"),i=v("div"),a=v("label"),c=I(`Container:
        `),h=v("select");for(let l=0;l<A.length;l+=1)A[l].c();p=E(),m=v("label"),w=I(`Video Codec:
        `),d=v("select"),L&&L.c(),_=E(),y=v("label"),ee=I(`Audio Codec:
        `),T=v("select"),R&&R.c(),D=E(),z=v("button"),z.textContent="Done",te=E(),S=v("div"),re(U.$$.fragment),ue=E(),re(V.$$.fragment),de=E(),re(W.$$.fragment),fe=E(),G=v("button"),G.textContent="Select Screen",he=E(),Q=v("a"),Q.textContent="change video settings",b=v("br"),B=E(),F=v("div"),re(J.$$.fragment),De=E(),Y=v("div"),re(H.$$.fragment),qe=E(),k&&k.c(),e.muted=!0,f(e,"class","svelte-1tiyxd5"),f(t,"class","vid svelte-1tiyxd5"),f(h,"class","svelte-1tiyxd5"),s[4]===void 0&&ge(()=>s[16].call(h)),f(a,"class","svelte-1tiyxd5"),f(d,"class","svelte-1tiyxd5"),s[5]===void 0&&ge(()=>s[17].call(d)),f(m,"class","svelte-1tiyxd5"),f(T,"class","svelte-1tiyxd5"),s[6]===void 0&&ge(()=>s[18].call(T)),f(y,"class","svelte-1tiyxd5"),f(z,"class","svelte-1tiyxd5"),f(i,"class","video-options svelte-1tiyxd5"),O(i,"hidden",s[11]!=-1),f(G,"class","svelte-1tiyxd5"),f(Q,"class","svelte-1tiyxd5"),f(S,"class","options svelte-1tiyxd5"),O(S,"hidden",s[11]!==0),f(F,"class","countdown svelte-1tiyxd5"),O(F,"hidden",s[11]!==1),f(Y,"class","record svelte-1tiyxd5"),O(Y,"hidden",s[11]!==2&&s[11]!==1),f(o,"class","pannel svelte-1tiyxd5"),f(r,"class","overlay svelte-1tiyxd5")},m(l,g){C(l,t,g),u(t,e),s[15](e),C(l,n,g),C(l,r,g),u(r,o),u(o,i),u(i,a),u(a,c),u(a,h);for(let X=0;X<A.length;X+=1)A[X].m(h,null);x(h,s[4]),u(i,p),u(i,m),u(m,w),u(m,d),L&&L.m(d,null),x(d,s[5]),u(i,_),u(i,y),u(y,ee),u(y,T),R&&R.m(T,null),x(T,s[6]),u(i,D),u(i,z),u(o,te),u(o,S),le(U,S,null),u(S,ue),le(V,S,null),u(S,de),le(W,S,null),u(S,fe),u(S,G),u(S,he),u(S,Q),u(S,b),u(o,B),u(o,F),le(J,F,null),u(o,De),u(o,Y),le(H,Y,null),u(r,qe),k&&k.m(r,null),pe=!0,ye||(Oe=[N(h,"change",s[16]),N(d,"change",s[17]),N(T,"change",s[18]),N(z,"click",s[19]),N(G,"click",s[23]),N(Q,"click",s[24])],ye=!0)},p(l,g){if(g[0]&4096){Z=Array.from(l[12].keys());let q;for(q=0;q<Z.length;q+=1){const je=xe(l,Z,q);A[q]?A[q].p(je,g):(A[q]=et(je),A[q].c(),A[q].m(h,null))}for(;q<A.length;q+=1)A[q].d(1);A.length=Z.length}g[0]&4112&&x(h,l[4]),l[4]?L?L.p(l,g):(L=tt(l),L.c(),L.m(d,null)):L&&(L.d(1),L=null),g[0]&4144&&x(d,l[5]),l[5]?R?R.p(l,g):(R=nt(l),R.c(),R.m(T,null)):R&&(R.d(1),R=null),g[0]&4208&&x(T,l[6]),g[0]&2048&&O(i,"hidden",l[11]!=-1);const X={};g[1]&128&&(X.$$scope={dirty:g,ctx:l}),!se&&g[0]&1&&(se=!0,X.value=l[0],ae(()=>se=!1)),U.$set(X);const ke={};g[1]&128&&(ke.$$scope={dirty:g,ctx:l}),!ne&&g[0]&2&&(ne=!0,ke.value=l[1],ae(()=>ne=!1)),V.$set(ke);const Se={};g[1]&128&&(Se.$$scope={dirty:g,ctx:l}),!oe&&g[0]&4&&(oe=!0,Se.value=l[2],ae(()=>oe=!1)),W.$set(Se),g[0]&2048&&O(S,"hidden",l[11]!==0);const Ee={};g[1]&128&&(Ee.$$scope={dirty:g,ctx:l}),!we&&g[0]&8&&(we=!0,Ee.value=l[3],ae(()=>we=!1)),J.$set(Ee),g[0]&2048&&O(F,"hidden",l[11]!==1);const Pe={};!be&&g[0]&256&&(be=!0,Pe.recording=l[8],ae(()=>be=!1)),H.$set(Pe),g[0]&2048&&O(Y,"hidden",l[11]!==2&&l[11]!==1),l[10]?k?(k.p(l,g),g[0]&1024&&P(k,1)):(k=it(l),k.c(),P(k,1),k.m(r,null)):k&&(_t(),j(k,1,1,()=>{k=null}),vt())},i(l){pe||(P(U.$$.fragment,l),P(V.$$.fragment,l),P(W.$$.fragment,l),P(J.$$.fragment,l),P(H.$$.fragment,l),P(k),pe=!0)},o(l){j(U.$$.fragment,l),j(V.$$.fragment,l),j(W.$$.fragment,l),j(J.$$.fragment,l),j(H.$$.fragment,l),j(k),pe=!1},d(l){l&&M(t),s[15](null),l&&M(n),l&&M(r),Ae(A,l),L&&L.d(),R&&R.d(),ce(U),ce(V),ce(W),ce(J),ce(H),k&&k.d(),ye=!1,Ge(Oe)}}}const rt=2;function jt(s,t,e){window.addEventListener("beforeunload",function(B){((a==null?void 0:a.state)==="recording"||(a==null?void 0:a.state)==="stopping")&&(B.returnValue="Do not close this window while recording",B.preventDefault())});const n=Ot();let r=JSON.parse(localStorage.getItem("screen-recorder-app-state")||"{}");const o=r.storeVersion!==rt?(()=>{const b=n.keys().next().value,B=n.get(b).keys().next().value,F=n.get(b).get(B)[0];return{systemAudio:!0,micAudio:!1,saveImediately:!0,timeOut:5,container:b,videoCodec:B,audioCodec:F}})():r;let i,a,c=o.systemAudio,h=o.micAudio,p=o.saveImediately,m=o.timeOut,w=o.container,d=o.videoCodec,_=o.audioCodec,y=!1,ee=0,T=!1,D=0;async function z(){e(8,y=!1),e(11,D=0)}async function te(){a=new At({microphone:h,systemAudio:c,timeslice:p?500:void 0,mime:`video/${w};codecs="${d},${_}"`,ext:Nt.get(w)}),a.addEventListener("stopping",z),a.addEventListener("error",z),window.r=a,e(7,i.srcObject=a.rStream,i),i.play(),await a.requestStreams(),e(11,D++,D)}async function S(){if(y)a.stop();else{e(10,T=!0);for await(let b of kt(m))e(9,ee=b);e(10,T=!1),a.saveStream(),e(8,y=!0),e(11,D++,D)}}function U(b){$[b?"unshift":"push"](()=>{i=b,e(7,i)})}function se(){w=Le(this),e(4,w),e(12,n)}function ue(){d=Le(this),e(5,d),e(12,n),e(4,w)}function V(){_=Le(this),e(6,_),e(12,n),e(4,w),e(5,d)}const ne=()=>e(11,D++,D);function de(b){c=b,e(0,c)}function W(b){h=b,e(1,h)}function oe(b){p=b,e(2,p)}const fe=()=>te(),G=()=>e(11,D--,D);function he(b){m=b,e(3,m)}function Q(b){y=b,e(8,y)}return s.$$.update=()=>{s.$$.dirty[0]&127&&localStorage.setItem("screen-recorder-app-state-v1",JSON.stringify({systemAudio:c,micAudio:h,saveImediately:p,timeOut:m,container:w,videoCodec:d,audioCodec:_,storeVersion:rt}))},[c,h,p,m,w,d,_,i,y,ee,T,D,n,te,S,U,se,ue,V,ne,de,W,oe,fe,G,he,Q]}class zt extends ve{constructor(t){super();_e(this,t,jt,Pt,me,{},null,[-1,-1])}}function Bt(s={}){const{immediate:t=!1,onNeedRefresh:e,onOfflineReady:n,onRegistered:r,onRegisterError:o}=s;let i;const a=async(c=!0)=>{};return"serviceWorker"in navigator&&(i=new mt("/screen-recorder/sw.js",{scope:"/screen-recorder/",type:"classic"}),i.addEventListener("activated",c=>{c.isUpdate?window.location.reload():n==null||n()}),i.register({immediate:t}).then(c=>{r==null||r(c)}).catch(c=>{o==null||o(c)})),a}async function Ft(){}Bt();const Jt=()=>window.app=new zt({target:window.document.body});Ft().then(Jt);
//# sourceMappingURL=index.55637b89.js.map