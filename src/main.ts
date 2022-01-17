import App from './App.svelte';
import { registerSW } from 'virtual:pwa-register';
import ponyfill from './ponyfill';

registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
});
const mount = () => (window.app = new App({ target: window.document.body }));

ponyfill().then(mount);

declare global {
  interface Window {
    /**
     * App instance
     */
    app: App;
  }
}
