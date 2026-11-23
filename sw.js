const CACHE='expiryguard-v10';
const FILES=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./icon.png','./privacy.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>{if(k!==CACHE) return caches.delete(k);}))).then(()=>caches.open(CACHE)).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>{if(k!==CACHE) return caches.delete(k);}))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(cache=>cache.put(e.request,c));return r;}).catch(()=>caches.match(e.request)));});
