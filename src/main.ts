import App from './App.svelte';
import { registerSW } from 'virtual:pwa-register';

registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
});

window.app = new App({ target: window.document.body });

declare global {
  interface Window {
    /**
     * App instance
     */
    app: App;
  }
}
