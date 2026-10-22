const CACHE='forge-v18';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./apple-touch-icon-180.png','./favicon.svg','./favicon-64.png'];
const NETWORK_WAIT=3000;
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS);}).then(function(){return self.skipWaiting();}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(keys){return Promise.all(keys.map(function(k){if(k!==CACHE)return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
// Pages: give the network a moment so updates arrive, but never let a dead
// connection in the gym hold the launch. Only good responses replace the cached app.
function page(req){
  var network=fetch(req).then(function(resp){
    if(resp && resp.ok){var copy=resp.clone();caches.open(CACHE).then(function(c){c.put('./index.html',copy);});}
    return resp;
  });
  var wait=new Promise(function(res){setTimeout(res,NETWORK_WAIT);});
  return Promise.race([network.catch(function(){return null;}),wait.then(function(){return null;})]).then(function(resp){
    if(resp && resp.ok) return resp;
    return caches.match('./index.html').then(function(r){return r||caches.match('./');}).then(function(cached){
      return cached||resp||network;
    });
  });
}
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  var req=e.request;
  var isNav=req.mode==='navigate'||(req.headers.get('accept')||'').indexOf('text/html')>=0;
  if(isNav){ e.respondWith(page(req)); return; }
  e.respondWith(caches.match(req).then(function(cached){return cached||fetch(req).then(function(resp){if(resp && resp.ok){var copy=resp.clone();caches.open(CACHE).then(function(c){c.put(req,copy);});}return resp;}).catch(function(){});}));
});
