import { precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';
import './lib/streaming-response-sw';
declare let self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST);

self.skipWaiting();
clientsClaim();
