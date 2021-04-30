if (workbox) {
    // apply precaching. In the built version, the precacheManifest will
    // be imported using importScripts (as is workbox itself) and we can
    // precache this. This is all we need for precaching
    workbox.precaching.precacheAndRoute(self.__precacheManifest);
}