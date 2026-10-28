/* Service worker: guarda o site no aparelho para que ele abra sem internet.
   - Páginas, CSS, JS e dados do próprio site: rede primeiro (para receber atualizações) e,
     sem conexão, a cópia guardada.
   - Fontes do Google e bibliotecas do cdnjs (endereços com versão fixa): cópia guardada primeiro.
   - Vídeos, músicas e PDFs ficam de fora (são grandes e usam requisições parciais).
   A grade e a agenda do aluno não passam por aqui: ficam no localStorage do navegador. */
const CACHE = 'ea-offline-v4';
const CORE = [
  './', 'index.html', 'matriz.html', 'grade.html', 'agenda.html', 'carreira.html', 'guia.html',
  'evolucao.html', 'futuro.html', 'tecnologias.html', 'horarios.html', 'manifest.webmanifest',
  'assets/css/style.css', 'assets/css/agenda.css', 'assets/css/evolucao.css', 'assets/css/futuro.css',
  'assets/css/horarios.css', 'assets/css/tecnologias.css',
  'assets/js/app.js', 'assets/js/course-ui.js', 'assets/js/home.js', 'assets/js/matriz.js', 'assets/js/grade.js',
  'assets/js/grade-export.js', 'assets/js/agenda.js', 'assets/js/carreira.js', 'assets/js/guia.js',
  'assets/js/evolucao.js', 'assets/js/futuro.js', 'assets/js/tecnologias.js', 'assets/js/horarios.js',
  'data/courses.js', 'data/horarios.js', 'assets/img/favicon.svg', 'assets/img/icon-192.png', 'assets/img/icon-512.png'
];
const SKIP = /\.(mp4|webm|mp3|vtt|pdf)$/i;
const IMMUTABLE = /^https:\/\/(fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs\.cloudflare\.com)\//;

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (IMMUTABLE.test(req.url)) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    })));
    return;
  }
  if (url.origin !== location.origin || SKIP.test(url.pathname)) return;

  // ?lang=en e outros parâmetros não mudam o arquivo: guarda e procura pelo endereço sem eles.
  const key = url.origin + url.pathname;
  // no-cache: confirma com o servidor antes de usar o cache HTTP do navegador (o GitHub Pages manda max-age=600).
  e.respondWith(fetch(req, { cache: 'no-cache' }).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(key, copy)); }
    return res;
  }).catch(() => caches.match(key).then(hit => hit ||
    (req.mode === 'navigate' ? caches.match(new URL('index.html', self.registration.scope).href) : Response.error()))));
});
