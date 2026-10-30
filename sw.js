const C='reg-v2',SHELL=['./','index.html','app.html','contact.html','privacy.html','manifest.json','icon-192.png','icon-512.png'],LIB=/^https:\/\/(www\.gstatic\.com\/firebasejs|cdnjs\.cloudflare\.com)\//;
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>Promise.all(SHELL.map(u=>c.add(u).catch(()=>{})))))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!='GET')return;const u=new URL(r.url);
if(LIB.test(r.url)){e.respondWith(caches.match(r).then(m=>m||fetch(r).then(x=>{const c=x.clone();caches.open(C).then(h=>h.put(r,c));return x})));return}
if(u.origin!=location.origin)return;
e.respondWith((async()=>{const c=await caches.open(C),m=await c.match(r,{ignoreSearch:true}),net=fetch(r).then(x=>{if(x.ok)c.put(r,x.clone());return x});net.catch(()=>{});
if(!m)return net;
if(r.mode=='navigate'||/\.html$/.test(u.pathname))return Promise.race([net,new Promise(res=>setTimeout(()=>res(m),3500))]).catch(()=>m);
return m})())});
