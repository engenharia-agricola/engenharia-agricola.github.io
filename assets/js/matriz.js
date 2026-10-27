/* Matriz curricular interativa com mapa de pré-requisitos. */
(function () {
  'use strict';
  const { add, t, L, BY, DATA, AREAS, esc } = EA;

  add({
    'mx.title': ['Matriz curricular', 'Curriculum', 'Plan de estudios'],
    'mx.eyebrow': ['Matriz curricular 2014 · atualização 2024', '2014 curriculum · 2024 update', 'Plan 2014 · actualización 2024'],
    'mx.h1': ['Todas as disciplinas, semestre a semestre', 'Every course, semester by semester', 'Todas las asignaturas, semestre a semestre'],
    'mx.lead': [
      'Clique em qualquer disciplina para ver a ementa e acender o caminho: de onde ela vem (pré-requisitos) e para onde ela leva (o que ela libera).',
      'Click any course to see its syllabus and light up the path: where it comes from (prerequisites) and where it leads (what it unlocks).',
      'Hacé clic en cualquier asignatura para ver sus contenidos e iluminar el camino: de dónde viene (correlativas) y a dónde lleva (qué habilita).'
    ],
    'mx.search': ['Buscar disciplina ou código…', 'Search course or code…', 'Buscar asignatura o código…'],
    'mx.view.map': ['Mapa', 'Map', 'Mapa'],
    'mx.view.list': ['Lista', 'List', 'Lista'],
    'mx.all': ['Mostrar todas as conexões', 'Show all connections', 'Mostrar todas las conexiones'],
    'mx.hint': ['Toque em uma disciplina.', 'Tap a course.', 'Tocá una asignatura.'],
    'mx.leg.pre': ['vem antes (pré-requisito)', 'comes before (prerequisite)', 'va antes (correlativa)'],
    'mx.leg.post': ['vem depois (é liberada)', 'comes after (unlocked)', 'va después (se habilita)'],
    'mx.allareas': ['Todas as áreas', 'All areas', 'Todas las áreas'],
    'mx.slot': ['Escolha uma CCCG', 'Choose an elective', 'Elegí una CCCG'],
    'mx.semh': ['{h} h', '{h} h', '{h} h'],
    'mx.c.eyebrow': ['Sua escolha', 'Your choice', 'Tu elección'],
    'mx.c.h2': ['Catálogo de CCCGs (complementares)', 'Elective catalog (CCCGs)', 'Catálogo de CCCG (complementarias)'],
    'mx.c.lead': [
      'Você precisa somar pelo menos 270 h de CCCGs, preferencialmente a partir do 5º semestre. A oferta varia a cada semestre — confira com a coordenação quais estão abertas.',
      'You need at least 270 h of electives, preferably from semester 5 on. The offer varies each semester — check with the coordination which ones are open.',
      'Necesitás sumar al menos 270 h de CCCG, preferentemente desde el 5.º semestre. La oferta varía cada semestre — consultá en la coordinación cuáles están abiertas.'
    ],
    'mx.c.search': ['Buscar CCCG…', 'Search electives…', 'Buscar CCCG…'],
    'mx.c.sort.name': ['Ordenar: nome', 'Sort: name', 'Ordenar: nombre'],
    'mx.c.sort.hours': ['Ordenar: carga horária', 'Sort: hours', 'Ordenar: carga horaria'],
    'mx.c.sort.area': ['Ordenar: área', 'Sort: area', 'Ordenar: área'],
    'mx.c.count': ['{n} CCCGs · {h} h disponíveis no catálogo', '{n} electives · {h} h available in the catalog', '{n} CCCG · {h} h disponibles en el catálogo'],
    'mx.c.note': [
      '<b>Dica:</b> disciplinas de outros cursos (fora desta lista) também podem virar CCCG. Peça o aproveitamento na Secretaria Acadêmica no prazo do calendário; a Comissão de Curso avalia se o conteúdo contribui para o perfil do egresso.',
      '<b>Tip:</b> courses from other programs (not on this list) can also count as electives. Request the credit at the Academic Office within the calendar deadline; the Program Committee decides whether it fits the graduate profile.',
      '<b>Consejo:</b> asignaturas de otras carreras (fuera de esta lista) también pueden valer como CCCG. Pedí la equivalencia en la Secretaría Académica dentro del plazo del calendario; la Comisión de Carrera evalúa si aporta al perfil del egresado.'
    ],
    'mx.pre.short': ['pré: {x}', 'pre: {x}', 'corr.: {x}'],
    'mx.free': ['sem pré-requisito', 'no prerequisite', 'sin correlativas']
  });

  const SLOT_HOURS = DATA.meta.cccgSlots || {};
  const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V'];
  const state = { areas: new Set(), q: '', sel: null, all: false, view: 'map' };
  const cc = { areas: new Set(), q: '', sort: 'name' };

  const matrix = () => document.getElementById('matrix');

  function cardHtml(c) {
    return `<button type="button" class="ccard" data-code="${c.code}" data-area="${c.area}">
      <span class="cname">${esc(L(c.name))}</span>
      <span class="cmeta"><span class="dot"></span>${c.ch} h · ${c.code}</span></button>`;
  }

  function renderMatrix() {
    const m = matrix(); const svg = document.getElementById('mx-lines');
    m.querySelectorAll('.sem-col').forEach(e => e.remove());
    const ob = DATA.courses.filter(c => c.type === 'ob');
    let slotN = 0;
    for (let s = 1; s <= 10; s++) {
      const list = ob.filter(c => c.sem === s);
      const slot = SLOT_HOURS[s];
      const hours = list.reduce((a, c) => a + c.ch, 0) + (slot || 0);
      const col = document.createElement('div'); col.className = 'sem-col';
      col.innerHTML = `<div class="sem-title"><b>${t('common.sem.short', { n: s })}</b><small>${t('mx.semh', { h: hours })}</small></div>` +
        list.map(cardHtml).join('') +
        (slot ? `<a class="ccard slot" href="#cccgs"><span class="cname">CCCG ${ROMAN[++slotN]}</span><span class="cmeta"><span class="dot"></span>${slot} h · ${t('mx.slot')}</span></a>` : '');
      m.insertBefore(col, svg);
    }
    m.querySelectorAll('.ccard[data-code]').forEach(b => b.addEventListener('click', () => select(b.dataset.code, true)));
    applyFilters();
    if (state.sel) highlight(state.sel); else drawLines();
  }

  function renderFilters(boxId, set, onChange) {
    const box = document.getElementById(boxId);
    const keys = boxId === 'cc-filters'
      ? Object.keys(AREAS).filter(a => DATA.courses.some(c => c.type === 'cccg' && c.area === a))
      : Object.keys(AREAS).filter(a => DATA.courses.some(c => c.type === 'ob' && c.area === a));
    box.innerHTML = `<button type="button" class="chip toggle" data-a="" aria-pressed="${set.size === 0}">${t('mx.allareas')}</button>` +
      keys.map(a => `<button type="button" class="chip toggle" data-a="${a}" data-area="${a}" aria-pressed="${set.has(a)}"><span class="dot"></span>${EA.areaName(a)}</button>`).join('');
    box.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
      const a = b.dataset.a;
      if (!a) set.clear(); else if (set.has(a)) set.delete(a); else set.add(a);
      renderFilters(boxId, set, onChange); onChange();
    }));
  }

  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

  function applyFilters() {
    const q = norm(state.q);
    matrix().querySelectorAll('.ccard[data-code]').forEach(el => {
      const c = BY[el.dataset.code];
      const okA = !state.areas.size || state.areas.has(c.area);
      const okQ = !q || norm(L(c.name) + ' ' + c.code + ' ' + c.name.pt).includes(q);
      el.classList.toggle('dim', !(okA && okQ) && !state.sel);
      el.dataset.match = okA && okQ ? '1' : '0';
    });
    if (!state.sel) drawLines();
  }

  function chain(code, dir, acc) {
    acc = acc || new Set();
    const c = BY[code]; if (!c) return acc;
    const next = dir === 'up' ? c.pre.req.concat(c.pre.rec) : c.unlocks;
    next.forEach(k => { if (!acc.has(k)) { acc.add(k); chain(k, dir, acc); } });
    return acc;
  }

  function select(code, openDrawer) {
    state.sel = code;
    highlight(code);
    if (openDrawer) EA.course.open(code, { onNavigate: k => { state.sel = k; highlight(k); scrollToCard(k); } });
  }

  function scrollToCard(code) {
    const el = matrix().querySelector(`.ccard[data-code="${code}"]`);
    if (el && state.view === 'map') {
      const sc = document.getElementById('mx-scroll');
      sc.scrollTo({ left: Math.max(0, el.offsetLeft - sc.clientWidth / 2 + el.offsetWidth / 2), behavior: 'smooth' });
    }
  }

  function highlight(code) {
    const up = chain(code, 'up'); const down = chain(code, 'down');
    matrix().querySelectorAll('.ccard').forEach(el => {
      const k = el.dataset.code;
      el.classList.remove('sel', 'is-pre', 'is-post', 'dim');
      if (k === code) el.classList.add('sel');
      else if (up.has(k)) el.classList.add('is-pre');
      else if (down.has(k)) el.classList.add('is-post');
      else el.classList.add('dim');
    });
    drawLines(code, up, down);
  }

  function clearSel() {
    state.sel = null;
    matrix().querySelectorAll('.ccard').forEach(el => el.classList.remove('sel', 'is-pre', 'is-post', 'dim'));
    applyFilters();
  }

  function drawLines(code, up, down) {
    const svg = document.getElementById('mx-lines'); const m = matrix();
    svg.innerHTML = '';
    if (state.view !== 'map') return;
    const box = m.getBoundingClientRect();
    svg.setAttribute('width', m.scrollWidth); svg.setAttribute('height', m.scrollHeight);
    svg.setAttribute('viewBox', `0 0 ${m.scrollWidth} ${m.scrollHeight}`);
    const pos = k => { const el = m.querySelector(`.ccard[data-code="${k}"]`); if (!el) return null; const r = el.getBoundingClientRect(); return { l: r.left - box.left, r: r.right - box.left, y: r.top - box.top + r.height / 2 }; };
    const edges = [];
    const ob = DATA.courses.filter(c => c.type === 'ob');
    if (code) {
      const inUp = k => k === code || up.has(k); const inDown = k => k === code || down.has(k);
      ob.forEach(c => c.pre.req.concat(c.pre.rec).forEach(p => {
        if (inUp(c.code) && inUp(p)) edges.push([p, c.code, 'pre']);
        else if (inDown(c.code) && inDown(p)) edges.push([p, c.code, 'post']);
      }));
    } else if (state.all) {
      ob.forEach(c => c.pre.req.concat(c.pre.rec).forEach(p => {
        const a = m.querySelector(`.ccard[data-code="${p}"]`); const b = m.querySelector(`.ccard[data-code="${c.code}"]`);
        if (a && b && a.dataset.match === '1' && b.dataset.match === '1') edges.push([p, c.code, 'pre faint']);
      }));
    }
    const frag = edges.map(([a, b, cls], i) => {
      const A = pos(a), B = pos(b); if (!A || !B) return '';
      const x1 = A.r, y1 = A.y, x2 = B.l, y2 = B.y; const dx = Math.max(30, (x2 - x1) / 2);
      const d = x2 > x1 ? `M${x1},${y1} C${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}` : `M${A.l},${y1} C${A.l - 40},${y1} ${B.l - 40},${y2} ${B.l},${y2}`;
      const faint = cls.includes('faint');
      return `<path class="${cls.replace(' faint', '')}${faint ? '' : ' draw'}" d="${d}" style="${faint ? 'opacity:.35' : `animation-delay:${Math.min(i * 30, 500)}ms`}"/>` +
        `<circle cx="${x2}" cy="${y2}" r="3.5" fill="${cls.startsWith('post') ? 'var(--gold)' : 'var(--water)'}" ${faint ? 'opacity=".35"' : ''}/>`;
    }).join('');
    svg.innerHTML = frag;
  }

  function setView(v) {
    state.view = v;
    matrix().classList.toggle('list', v === 'list');
    document.getElementById('view-map').setAttribute('aria-pressed', String(v === 'map'));
    document.getElementById('view-list').setAttribute('aria-pressed', String(v === 'list'));
    if (state.sel) highlight(state.sel); else drawLines();
  }

  /* ----- Catálogo de CCCGs ----- */
  function renderCatalog() {
    const q = norm(cc.q);
    let list = DATA.courses.filter(c => c.type === 'cccg')
      .filter(c => (!cc.areas.size || cc.areas.has(c.area)) && (!q || norm(L(c.name) + ' ' + c.code + ' ' + L(c.ementa)).includes(q)));
    const coll = new Intl.Collator(document.documentElement.lang);
    list.sort((a, b) => cc.sort === 'hours' ? b.ch - a.ch || coll.compare(L(a.name), L(b.name))
      : cc.sort === 'area' ? coll.compare(EA.areaName(a.area), EA.areaName(b.area)) || coll.compare(L(a.name), L(b.name))
      : coll.compare(L(a.name), L(b.name)));
    document.getElementById('cc-count').textContent = t('mx.c.count', { n: list.length, h: list.reduce((s, c) => s + c.ch, 0) });
    const box = document.getElementById('catalog');
    box.innerHTML = list.map(c => {
      const pre = c.pre.req.map(k => L(BY[k].name)).join(', ');
      return `<button type="button" class="ccard" data-code="${c.code}" data-area="${c.area}" style="padding:14px 14px 14px 18px">
        <span class="cname" style="font-size:.95rem">${esc(L(c.name))}</span>
        <span class="cmeta" style="margin-bottom:6px"><span class="dot"></span>${EA.areaName(c.area)}</span>
        <span class="cmeta"><span class="badge">${c.ch} h</span><span class="badge">${c.code}</span>${c.ead ? `<span class="badge">${t('common.ead')}</span>` : ''}</span>
        <span class="cmeta" style="margin-top:6px;font-weight:500">${pre ? esc(t('mx.pre.short', { x: pre })) : t('mx.free')}</span></button>`;
    }).join('');
    box.querySelectorAll('.ccard').forEach(b => b.addEventListener('click', () => EA.course.open(b.dataset.code)));
  }

  function renderAll() {
    renderFilters('mx-filters', state.areas, () => { if (state.sel) clearSel(); applyFilters(); });
    renderFilters('cc-filters', cc.areas, renderCatalog);
    renderMatrix(); renderCatalog();
  }

  document.addEventListener('ea:ready', () => {
    if (innerWidth < 760) setView('list');
    renderAll();
    document.getElementById('mx-search').addEventListener('input', e => { state.q = e.target.value; if (state.sel) clearSel(); applyFilters(); });
    document.getElementById('mx-all').addEventListener('change', e => { state.all = e.target.checked; if (!state.sel) drawLines(); });
    document.getElementById('view-map').addEventListener('click', () => setView('map'));
    document.getElementById('view-list').addEventListener('click', () => setView('list'));
    document.getElementById('cc-search').addEventListener('input', e => { cc.q = e.target.value; renderCatalog(); });
    document.getElementById('cc-sort').addEventListener('change', e => { cc.sort = e.target.value; renderCatalog(); });
    document.addEventListener('drawer:close', clearSel);
    let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => state.sel ? highlight(state.sel) : drawLines(), 150); });
    const deep = new URLSearchParams(location.search).get('c');
    if (deep && BY[deep]) setTimeout(() => { select(deep, true); scrollToCard(deep); }, 300);
    // fontes carregadas mudam alturas dos cartões
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => state.sel ? highlight(state.sel) : drawLines());
  });
  document.addEventListener('langchange', () => {
    renderAll();
    if (EA.course.isOpen()) EA.course.open(EA.course.current());
  });
})();
