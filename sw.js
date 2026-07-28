const CACHE='forge-v1';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./apple-touch-icon-180.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS);}).then(function(){return self.skipWaiting();}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(keys){return Promise.all(keys.map(function(k){if(k!==CACHE)return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  var req=e.request;
  var isNav=req.mode==='navigate'||(req.headers.get('accept')||'').indexOf('text/html')>=0;
  if(isNav){
    e.respondWith(fetch(req).then(function(resp){var copy=resp.clone();caches.open(CACHE).then(function(c){c.put('./index.html',copy);});return resp;}).catch(function(){return caches.match('./index.html').then(function(r){return r||caches.match('./');});}));
    return;
  }
  e.respondWith(caches.match(req).then(function(cached){return cached||fetch(req).then(function(resp){var copy=resp.clone();caches.open(CACHE).then(function(c){c.put(req,copy);});return resp;}).catch(function(){});}));
});
