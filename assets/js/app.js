/* ==========================================================================
   Núcleo comum: idiomas (PT/EN/ES), tema, cabeçalho/rodapé, animações,
   utilitários de dados das disciplinas.
   ========================================================================== */
(function () {
  'use strict';

  const LANGS = ['pt', 'en', 'es'];
  const HTML_LANG = { pt: 'pt-BR', en: 'en', es: 'es' };
  const dict = { pt: {}, en: {}, es: {} };

  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* modo privado */ } }
  };

  function detectLang() {
    const q = new URLSearchParams(location.search).get('lang');
    if (LANGS.includes(q)) return q;
    const saved = store.get('ea-lang');
    if (LANGS.includes(saved)) return saved;
    const nav = (navigator.language || 'pt').slice(0, 2).toLowerCase();
    return LANGS.includes(nav) ? nav : 'pt';
  }

  let lang = detectLang();

  /** Registra textos: { chave: [pt, en, es] } */
  function add(obj) {
    for (const k in obj) {
      const v = obj[k];
      LANGS.forEach((l, i) => { dict[l][k] = v[i] !== undefined ? v[i] : v[0]; });
    }
  }

  function t(key, vars) {
    let s = dict[lang][key];
    if (s === undefined) s = dict.pt[key];
    if (s === undefined) return key;
    if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] !== undefined ? vars[k] : m));
    return s;
  }

  /** Escolhe o texto do idioma atual de um objeto {pt,en,es}. */
  function L(obj) { return obj ? (obj[lang] || obj.pt || '') : ''; }

  function apply(root) {
    root = root || document;
    root.querySelectorAll('[data-i18n]').forEach(el => { el.innerHTML = t(el.dataset.i18n); });
    root.querySelectorAll('[data-i18n-attr]').forEach(el => {
      el.dataset.i18nAttr.split(';').forEach(pair => {
        const [attr, key] = pair.split(':');
        if (attr && key) el.setAttribute(attr.trim(), t(key.trim()));
      });
    });
    document.documentElement.lang = HTML_LANG[lang];
    const tk = document.body && document.body.dataset.titleKey;
    if (tk) document.title = t(tk) + ' · ' + t('site.short');
    document.querySelectorAll('.lang-switch button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  }

  function setLang(l) {
    if (!LANGS.includes(l) || l === lang) return;
    lang = l;
    store.set('ea-lang', l);
    const url = new URL(location.href);
    url.searchParams.set('lang', l);
    history.replaceState(null, '', url);
    apply();
    document.dispatchEvent(new CustomEvent('langchange', { detail: l }));
  }

  /* ---------------- Tema ---------------- */
  function initTheme() {
    const saved = store.get('ea-theme');
    if (saved === 'light' || saved === 'dark') document.documentElement.dataset.theme = saved;
  }
  function toggleTheme() {
    const cur = document.documentElement.dataset.theme ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    store.set('ea-theme', next);
  }
  initTheme();

  /* ---------------- Ícones ---------------- */
  const P = (d, extra) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra || ''}>${d}</svg>`;
  const ICONS = {
    logo: `<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="23" fill="var(--brand)"/><path d="M9 33c6-3 24-3 30 0" stroke="var(--brand-ink)" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M24 33V17" stroke="var(--brand-ink)" stroke-width="2.5" stroke-linecap="round"/><path d="M24 22c-6 0-9-4-9-9 5 0 9 3 9 9Z" fill="var(--gold)"/><path d="M24 19c0-5 3-8 9-8 0 5-3 8-9 8Z" fill="var(--brand-ink)"/><circle cx="24" cy="38" r="2" fill="var(--gold)"/></svg>`,
    sun: P('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    moon: P('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>'),
    menu: P('<path d="M4 6h16M4 12h16M4 18h16"/>'),
    close: P('<path d="M6 6l12 12M18 6 6 18"/>'),
    arrow: P('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    book: P('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14Z"/><path d="M20 17v4H6.5A2.5 2.5 0 0 1 4 18.5"/>'),
    grid: P('<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>'),
    puzzle: P('<path d="M9 3h6v3a2 2 0 1 0 4 0h2v6h-3a2 2 0 1 0 0 4h3v5h-6v-3a2 2 0 1 0-4 0v3H3v-6h3a2 2 0 1 0 0-4H3V3h6Z"/>'),
    rocket: P('<path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2"/><path d="M14 4c3-1 6-1 6-1s0 3-1 6l-7 7-5-5 7-7Z"/><circle cx="15" cy="9" r="1.5"/><path d="M9 11 5 10l3-3h4M13 15l1 4 3-3v-4"/>'),
    compass: P('<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/>'),
    seed: P('<path d="M12 21v-9"/><path d="M12 12C12 7 8 4 3 4c0 5 4 8 9 8Z"/><path d="M12 10c0-4 3-7 9-7 0 5-3 7-9 7Z"/>'),
    flask: P('<path d="M9 3h6M10 3v6L4 19a1.5 1.5 0 0 0 1.3 2h13.4A1.5 1.5 0 0 0 20 19l-6-10V3"/><path d="M7 15h10"/>'),
    gear: P('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/>'),
    drop: P('<path d="M12 2.7S5 10 5 14.5a7 7 0 0 0 14 0C19 10 12 2.7 12 2.7Z"/>'),
    tractor: P('<circle cx="7" cy="16" r="4"/><circle cx="18" cy="17" r="3"/><path d="M7 12V6h6l2 6h4l2 3M11 6v6M3 12h12"/>'),
    house: P('<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>'),
    bolt: P('<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>'),
    silo: P('<path d="M6 21V8a6 6 0 0 1 12 0v13"/><path d="M4 21h16M6 12h12M6 16h12"/>'),
    leaf: P('<path d="M11 20A7 7 0 0 1 4 13C4 7 9 3 20 3c0 11-4 16-9 17Z"/><path d="M4 21c4-6 8-9 12-11"/>'),
    satellite: P('<path d="m13 7 4 4M5 15l4 4"/><rect x="9" y="5" width="6" height="8" rx="1" transform="rotate(45 12 9)"/><path d="M16 21a5 5 0 0 0 5-5M16 17a1 1 0 0 0 1-1"/>'),
    chart: P('<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 6-6"/>'),
    users: P('<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14a5 5 0 0 1 5.5 5"/>'),
    cap: P('<path d="M2 9l10-5 10 5-10 5L2 9Z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/><path d="M22 9v6"/>'),
    check: P('<path d="M20 6 9 17l-5-5"/>'),
    clock: P('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>'),
    star: P('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z"/>'),
    file: P('<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>'),
    briefcase: P('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/>'),
    shield: P('<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/>'),
    heart: P('<path d="M20.8 6.6a5 5 0 0 0-8.8-2.2 5 5 0 0 0-8.8 2.2C2.5 11 12 20 12 20s9.5-9 8.8-13.4Z"/>'),
    pause: P('<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>'),
    door: P('<path d="M4 21h16M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17"/><circle cx="14.5" cy="12" r="1"/>'),
    building: P('<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3"/>'),
    factory: P('<path d="M3 21V10l6 4V10l6 4V6l6 3v12H3Z"/><path d="M7 17h2M12 17h2M17 17h2"/>'),
    search: P('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
    globe: P('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'),
    plate: P('<circle cx="12" cy="13" r="7"/><circle cx="12" cy="13" r="3.5"/><path d="M3 4v5a2 2 0 0 0 2 2M5 4v16M21 4c-2 0-3 2-3 5s1 3 3 3v8"/>'),
    truck: P('<path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>'),
    sprout: P('<path d="M12 21v-8"/><path d="M12 13c-4 0-7-3-7-7 4 0 7 3 7 7Z"/><path d="M12 11c0-4 3-7 7-7 0 4-3 7-7 7Z"/><path d="M6 21h12"/>'),
    download: P('<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>'),
    upload: P('<path d="M12 21V9M7 14l5-5 5 5M4 3h16"/>'),
    print: P('<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/>'),
    trash: P('<path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15"/>'),
    wand: P('<path d="m15 4 1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2ZM4 20 14 10"/>'),
    plus: P('<path d="M12 5v14M5 12h14"/>'),
    chevron: P('<path d="m6 9 6 6 6-6"/>'),
    info: P('<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>'),
    lab: P('<path d="M9 3v7L4 20h16l-5-10V3"/><path d="M8 3h8"/>')
  };

  /* ---------------- Áreas temáticas ---------------- */
  const AREAS = {
    base:   { icon: 'flask',     name: { pt: 'Ciências básicas', en: 'Basic sciences', es: 'Ciencias básicas' } },
    water:  { icon: 'drop',      name: { pt: 'Água e solo', en: 'Water & soil', es: 'Agua y suelo' } },
    mach:   { icon: 'tractor',   name: { pt: 'Máquinas e mecanização', en: 'Machinery & mechanization', es: 'Máquinas y mecanización' } },
    build:  { icon: 'house',     name: { pt: 'Construções e estruturas', en: 'Buildings & structures', es: 'Construcciones y estructuras' } },
    energy: { icon: 'bolt',      name: { pt: 'Energia e eletrificação', en: 'Energy & electrification', es: 'Energía y electrificación' } },
    post:   { icon: 'silo',      name: { pt: 'Pós-colheita', en: 'Post-harvest', es: 'Poscosecha' } },
    plant:  { icon: 'leaf',      name: { pt: 'Produção vegetal e clima', en: 'Crops & climate', es: 'Producción vegetal y clima' } },
    geo:    { icon: 'satellite', name: { pt: 'Geotecnologias', en: 'Geotechnologies', es: 'Geotecnologías' } },
    env:    { icon: 'sprout',    name: { pt: 'Meio ambiente', en: 'Environment', es: 'Medio ambiente' } },
    mgmt:   { icon: 'chart',     name: { pt: 'Gestão e sociedade', en: 'Management & society', es: 'Gestión y sociedad' } },
    human:  { icon: 'users',     name: { pt: 'Linguagens e humanidades', en: 'Languages & humanities', es: 'Lenguajes y humanidades' } },
    synth:  { icon: 'star',      name: { pt: 'Projetos, TCC e estágio', en: 'Projects, thesis & internship', es: 'Proyectos, TFG y práctica' } }
  };

  /* ---------------- Dados das disciplinas ---------------- */
  const DATA = window.PPC || { courses: [], meta: {} };
  const BY = {};
  DATA.courses.forEach(c => { BY[c.code] = c; c.unlocks = []; });
  DATA.courses.forEach(c => {
    c.pre.req.concat(c.pre.rec).forEach(r => { if (BY[r]) BY[r].unlocks.push(c.code); });
  });

  /* ---------------- Textos comuns ---------------- */
  add({
    'site.name': ['Engenharia Agrícola', 'Agricultural Engineering', 'Ingeniería Agrícola'],
    'site.short': ['Eng. Agrícola Unipampa', 'Agri. Eng. Unipampa', 'Ing. Agrícola Unipampa'],
    'site.campus': ['Unipampa · Alegrete', 'Unipampa · Alegrete', 'Unipampa · Alegrete'],
    'nav.home': ['Início', 'Home', 'Inicio'],
    'nav.matrix': ['Matriz curricular', 'Curriculum', 'Plan de estudios'],
    'nav.planner': ['Monte sua grade', 'Build your plan', 'Arma tu plan'],
    'nav.career': ['Carreira', 'Career', 'Carrera'],
    'nav.guide': ['Guia do estudante', 'Student guide', 'Guía del estudiante'],
    'nav.history': ['Evolução do PPC', 'PPC history', 'Evolución del PPC'],
    'nav.menu': ['Abrir menu', 'Open menu', 'Abrir menú'],
    'nav.theme': ['Alternar tema claro/escuro', 'Toggle light/dark theme', 'Cambiar tema claro/oscuro'],
    'nav.lang': ['Idioma', 'Language', 'Idioma'],
    'common.hours': ['h', 'h', 'h'],
    'common.semester': ['Semestre', 'Semester', 'Semestre'],
    'common.sem.short': ['{n}º sem.', 'Sem. {n}', '{n}º sem.'],
    'common.theory': ['Teórica', 'Theory', 'Teórica'],
    'common.practice': ['Prática', 'Practice', 'Práctica'],
    'common.total': ['Total', 'Total', 'Total'],
    'common.code': ['Código', 'Code', 'Código'],
    'common.close': ['Fechar', 'Close', 'Cerrar'],
    'common.none': ['Nenhum', 'None', 'Ninguno'],
    'common.ob': ['Obrigatória', 'Required', 'Obligatoria'],
    'common.cccg': ['CCCG (complementar)', 'Elective (CCCG)', 'CCCG (complementaria)'],
    'common.ead': ['a distância', 'online', 'a distancia'],
    'footer.about': [
      'Site informativo e não oficial, feito para ajudar estudantes a entender o Projeto Pedagógico do Curso (PPC) de Engenharia Agrícola da Unipampa – Campus Alegrete.',
      'Unofficial, informational site built to help students understand the Pedagogical Project (PPC) of the Agricultural Engineering program at Unipampa – Alegrete Campus.',
      'Sitio informativo y no oficial, creado para ayudar a los estudiantes a entender el Proyecto Pedagógico (PPC) de Ingeniería Agrícola de la Unipampa – Campus Alegrete.'
    ],
    'footer.source': [
      'Fonte: <a href="ppc/ppc_engenharia_agricola_2024.pdf">PPC 2014, atualização de maio de 2024</a> (versão de junho/2024). Em caso de dúvida, vale sempre o documento oficial e a Coordenação do Curso. <a href="evolucao.html#documentos">Todas as versões do PPC</a>.',
      'Source: <a href="ppc/ppc_engenharia_agricola_2024.pdf">PPC 2014, May 2024 update</a> (June 2024 version). When in doubt, the official document and the Program Coordination prevail. <a href="evolucao.html#documentos">All PPC versions</a>.',
      'Fuente: <a href="ppc/ppc_engenharia_agricola_2024.pdf">PPC 2014, actualización de mayo de 2024</a> (versión de junio/2024). Ante cualquier duda, prevalecen el documento oficial y la Coordinación de la Carrera. <a href="evolucao.html#documentos">Todas las versiones del PPC</a>.'
    ],
    'footer.explore': ['Explore', 'Explore', 'Explorar'],
    'footer.contact': ['Contato', 'Contact', 'Contacto'],
    'footer.addr': ['Av. Tiarajú, 810 – Ibirapuitã<br>Alegrete – RS, 97546-550<br>(55) 3421-8400<br>alegrete@unipampa.edu.br', 'Av. Tiarajú, 810 – Ibirapuitã<br>Alegrete – RS, Brazil, 97546-550<br>+55 55 3421-8400<br>alegrete@unipampa.edu.br', 'Av. Tiarajú, 810 – Ibirapuitã<br>Alegrete – RS, Brasil, 97546-550<br>+55 55 3421-8400<br>alegrete@unipampa.edu.br']
  });

  /* ---------------- Cabeçalho e rodapé ---------------- */
  const PAGES = [
    ['index.html', 'nav.home'], ['matriz.html', 'nav.matrix'], ['grade.html', 'nav.planner'],
    ['carreira.html', 'nav.career'], ['guia.html', 'nav.guide'], ['evolucao.html', 'nav.history']
  ];

  function currentPage() {
    const p = location.pathname.split('/').pop();
    return p === '' ? 'index.html' : p;
  }

  function renderChrome() {
    const here = currentPage();
    const header = document.getElementById('site-header');
    if (header) {
      header.className = 'site-header';
      header.innerHTML = `
        <nav class="container nav" aria-label="principal">
          <a class="brand" href="index.html">${ICONS.logo}<span><span data-i18n="site.name"></span><small data-i18n="site.campus"></small></span></a>
          <ul class="nav-links" id="nav-links">
            ${PAGES.map(([href, key]) => `<li><a href="${href}" data-i18n="${key}"${href === here ? ' aria-current="page"' : ''}></a></li>`).join('')}
          </ul>
          <div class="nav-tools">
            <div class="lang-switch" role="group" data-i18n-attr="aria-label:nav.lang">
              ${LANGS.map(l => `<button type="button" data-lang="${l}" lang="${HTML_LANG[l]}">${l.toUpperCase()}</button>`).join('')}
            </div>
            <button class="icon-btn" id="theme-btn" type="button" data-i18n-attr="aria-label:nav.theme;title:nav.theme"><span class="ico-sun">${ICONS.sun}</span></button>
            <button class="icon-btn menu-btn" id="menu-btn" type="button" aria-expanded="false" aria-controls="nav-links" data-i18n-attr="aria-label:nav.menu">${ICONS.menu}</button>
          </div>
        </nav>`;
      header.querySelectorAll('.lang-switch button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
      header.querySelector('#theme-btn').addEventListener('click', toggleTheme);
      const mb = header.querySelector('#menu-btn'); const nl = header.querySelector('#nav-links');
      mb.addEventListener('click', () => { const o = nl.classList.toggle('open'); mb.setAttribute('aria-expanded', String(o)); });
      // preserva o idioma ao navegar
      header.querySelectorAll('a[href$=".html"]').forEach(a => a.addEventListener('click', () => store.set('ea-lang', lang)));
    }
    const footer = document.getElementById('site-footer');
    if (footer) {
      footer.className = 'site-footer';
      footer.innerHTML = `
        <div class="container footer-grid">
          <div>
            <a class="brand" href="index.html" style="margin-bottom:12px">${ICONS.logo}<span><span data-i18n="site.name"></span><small data-i18n="site.campus"></small></span></a>
            <p data-i18n="footer.about"></p>
            <p><small data-i18n="footer.source"></small></p>
          </div>
          <div><h4 data-i18n="footer.explore"></h4><ul>${PAGES.map(([h, k]) => `<li><a href="${h}" data-i18n="${k}"></a></li>`).join('')}</ul></div>
          <div><h4 data-i18n="footer.contact"></h4><p data-i18n="footer.addr"></p></div>
        </div>`;
    }
  }

  /* ---------------- Animações ---------------- */
  function initReveal(root) {
    const els = (root || document).querySelectorAll('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(e => io.observe(e));
  }

  function countUp(el) {
    const target = +el.dataset.count; const dur = 1400; const t0 = performance.now();
    const fmt = n => n.toLocaleString(HTML_LANG[lang]);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = fmt(target); return; }
    (function step(now) {
      const p = Math.min(1, (now - t0) / dur); const e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(target * e));
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }
  function initCounters() {
    const els = document.querySelectorAll('[data-count]');
    if (!('IntersectionObserver' in window)) { els.forEach(countUp); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { countUp(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.5 });
    els.forEach(e => io.observe(e));
  }

  let toastTimer;
  function toast(msg) {
    let el = document.querySelector('.toast');
    if (!el) { el = document.createElement('div'); el.className = 'toast'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
    el.textContent = msg; el.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
  }

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  window.EA = {
    add, t, L, apply, setLang, get lang() { return lang; }, ICONS, AREAS, DATA, BY, store, toast, esc,
    initReveal, areaName: a => L(AREAS[a] && AREAS[a].name), cname: c => L(c.name)
  };

  document.addEventListener('DOMContentLoaded', () => {
    renderChrome();
    document.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = ICONS[el.dataset.icon] || ''; });
    apply();
    initReveal();
    initCounters();
    document.dispatchEvent(new CustomEvent('ea:ready'));
  });
})();
