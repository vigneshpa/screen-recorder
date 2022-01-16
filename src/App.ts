import type App from './App.svelte';
import loadingHtml from './loading.html';

declare const __webpack_public_path__: string;
const pPath = new URL(__webpack_public_path__);

let inited: boolean = false;
const initApp = async () => {
  if (inited) return;
  inited = true;
  window.document.body.innerHTML = '';
  const App = ( // Lazy loading App to link css automatically
    await import(
      /* webpackChunkName: "appComponent" */
      /* webpackMode: "lazy" */
      /* webpackPrefetch: true */
      '@/App.svelte'
    )
  ).default;
  window.document.body.innerHTML = '';
  window.app = new App({
    target: window.document.body,
  });
};

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  if (navigator.serviceWorker.controller) initApp();

  window.addEventListener('offline', e => console.log('service worker offline'));
  window.addEventListener('online', e => register());
  if (navigator.onLine) {
    register();
  } else {
    console.log('service worker offline');
  }
} else initApp();
function register() {
  if (!inited)
    // Setting inner html to loading service worker
    window.document.body.innerHTML = loadingHtml;
  window.navigator.serviceWorker
    .register(new URL(pPath + 'service-worker.js'), { scope: pPath.href })
    .then(registration => {
      registration.addEventListener('updatefound', e => {
        const installingWorker = registration.installing!;
        installingWorker.addEventListener('statechange', e => {
          console.log(`Installing worker state ${installingWorker.state}`);
          if (installingWorker.state === 'activated') {
            initApp();
          }
        });
      });
    })
    .catch(err => {
      console.error(err);
    });
}
declare global {
  interface Window {
    /**
     * App instance
     */
    app: App;
  }
}
