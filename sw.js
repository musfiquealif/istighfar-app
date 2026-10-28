const C="istighfar-v3";
self.addEventListener("install",e=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
// Network first, cache as fallback. Audio is streamed, not cached (it arrives in partial chunks that can't be stored).
self.addEventListener("fetch",e=>{const q=e.request;if(q.method!=="GET"||q.headers.has("range")||/\.mp3(\?|$)/.test(q.url))return;e.respondWith(fetch(q).then(r=>{if(r.status===200){const c=r.clone();caches.open(C).then(x=>x.put(q,c)).catch(()=>{})}return r}).catch(()=>caches.match(q)))});
