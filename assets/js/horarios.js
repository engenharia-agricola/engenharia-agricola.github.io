/* Horários e agenda: o conteúdo está em português; aqui ficam o título, o aviso de idioma,
   os filtros (semestre, grupo, busca), as vistas Semana e Lista, os botões “+ Agenda” que montam
   a agenda do aluno (seção #agenda, em agenda.js) e os cartões de docentes.
   Os dados vêm de data/horarios.js (window.EA_HORARIOS). */
(function () {
  'use strict';
  EA.add({
    'ho.title': ['Horários e agenda', 'Schedules and timetable', 'Horarios y agenda'],
    'ho.langnote': [
      '',
      'This page is available in Portuguese only. It lists the courses, times, rooms and lecturers of the Agricultural Engineering classes from 2018 to 2026, and the program faculty.',
      'Esta página está disponible solo en portugués. Presenta las asignaturas, horarios, aulas y profesores de Ingeniería Agrícola de 2018 a 2026, y los docentes de la carrera.'
    ]
  });

  const H = window.EA_HORARIOS;
  const AG = window.EA_AGENDA;
  const esc = EA.esc;
  const DAYS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const DAY3 = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const ALL = 'todos';
  const norm = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const range = (a, b) => `${a}–${b}`;

  // Linha: [disciplina, código, turma, professor, sala, dia, início, fim, grupos]
  const rows = [];
  H.terms.forEach(t => t.rows.forEach(r => rows.push({
    term: t.id, name: r[0], code: r[1], turma: r[2], prof: r[3], room: r[4], key: AG.key(r[1], r[0], r[2]),
    day: r[5], start: r[6], end: r[7], groups: r[8].split(' '),
    hay: norm([r[0], r[1], r[3], r[4]].join(' '))
  })));

  function groupLabel(g) {
    if (/^\d\d$/.test(g)) return `${+g}º semestre`;
    return { CG: 'CCCG', Extra: 'Extras', Extra1: 'Extras', Rec: 'Recuperação' }[g] || g;
  }
  const groupKey = g => (g === 'Extra1' ? 'Extra' : g);
  const groupOrder = g => (/^\d\d$/.test(g) ? +g : { CG: 20, Extra: 21, Rec: 22 }[g] || 30);

  /* ---------------- Estado e controles ---------------- */
  const params = new URLSearchParams(location.search);
  const state = { term: H.terms[0].id, group: ALL, q: '', view: 'week' };
  if (params.get('s') && (params.get('s') === ALL || H.terms.some(t => t.id === params.get('s')))) state.term = params.get('s');
  // Link compartilhado da agenda (?t=2026.2&a=...): abre no semestre dela.
  if (params.get('t') && H.terms.some(t => t.id === params.get('t'))) state.term = params.get('t');
  if (params.get('q')) { state.q = params.get('q'); state.term = ALL; state.view = 'list'; }

  const $term = document.getElementById('ho-term');
  const $q = document.getElementById('ho-q');
  const $groups = document.getElementById('ho-groups');
  const $shown = document.getElementById('ho-shown');
  const $week = document.getElementById('ho-week');
  const $list = document.getElementById('ho-list');
  const $addall = document.getElementById('ho-addall');
  const $mine = document.getElementById('ho-mine');
  const tabs = { week: document.getElementById('tab-week'), list: document.getElementById('tab-list') };

  const termName = id => { const [y, s] = id.split('.'); return `${y}/${s}`; };
  $term.innerHTML = H.terms.map(t => `<option value="${t.id}">${termName(t.id)}${t === H.terms[0] ? ' (atual)' : ''}</option>`).join('') +
    `<option value="${ALL}">Todos os semestres</option>`;
  $term.value = state.term;
  $q.value = state.q;

  function filtered() {
    const q = norm(state.q.trim());
    return rows.filter(r => (state.term === ALL || r.term === state.term) &&
      (state.group === ALL || r.groups.some(g => groupKey(g) === state.group)) &&
      (!q || q.split(/\s+/).every(w => r.hay.includes(w))));
  }

  function renderGroups() {
    const pool = rows.filter(r => state.term === ALL || r.term === state.term);
    const gs = [...new Set(pool.flatMap(r => r.groups.map(groupKey)))].sort((a, b) => groupOrder(a) - groupOrder(b));
    if (state.group !== ALL && !gs.includes(state.group)) state.group = ALL;
    $groups.innerHTML = [ALL].concat(gs).map(g =>
      `<button type="button" data-g="${g}" aria-pressed="${g === state.group}">${g === ALL ? 'Todos' : groupLabel(g)}</button>`).join('');
  }

  /* ---------------- Botão “+ Agenda” ---------------- */
  // Só com um semestre escolhido: a agenda é sempre de um semestre.
  function addBtn(r) {
    if (state.term === ALL) return '';
    const on = AG.has(r.key);
    return `<button type="button" class="ho-add" data-ak="${esc(r.key)}" aria-pressed="${on}" title="${on ? 'Tirar da agenda' : 'Pôr na agenda'}: ${esc(r.name)} (${esc(r.turma)})">${on ? '✓ Na agenda' : '+ Agenda'}</button>`;
  }
  const inAgenda = r => state.term !== ALL && AG.has(r.key);

  /* ---------------- Vista Semana ---------------- */
  function cardHTML(r, withTerm) {
    const link = r.code && EA.BY[r.code] ? `<a href="matriz.html?c=${r.code}">${esc(r.name)}</a>` : esc(r.name);
    return `<article class="ho-card${inAgenda(r) ? ' in' : ''}" data-kind="${/^\d\d$/.test(groupKey(r.groups[0])) ? 'sem' : groupKey(r.groups[0])}">
      <p class="ho-time">${range(r.start, r.end)}${withTerm ? ` · ${termName(r.term)}` : ''}</p>
      <h4>${link}</h4>
      <p class="ho-meta">${r.code ? `<span class="ho-code">${esc(r.code)}</span> ` : ''}<span>${esc(r.turma)}</span> · <span>${r.groups.map(g => groupLabel(groupKey(g))).join(', ')}</span></p>
      <p class="ho-prof">${esc(r.prof)}</p>
      <p class="ho-room">${esc(r.room)}</p>
      ${addBtn(r)}
    </article>`;
  }

  function renderWeek(list) {
    if (state.term === ALL) {
      $week.innerHTML = '<p class="ho-empty">Escolha um semestre para ver a semana. Para comparar semestres, use a vista Lista.</p>';
      return;
    }
    if (!list.length) { $week.innerHTML = '<p class="ho-empty">Nenhuma aula encontrada com esses filtros.</p>'; return; }
    const days = list.some(r => r.day === 5) ? 6 : 5;
    let html = `<div class="ho-week" style="--days:${days}">`;
    for (let d = 0; d < days; d++) {
      const items = list.filter(r => r.day === d).sort((a, b) => a.start.localeCompare(b.start) || a.name.localeCompare(b.name));
      html += `<div class="ho-day"><h3>${DAYS[d]}</h3>${items.length ? items.map(r => cardHTML(r)).join('') : '<p class="ho-free">Sem aulas</p>'}</div>`;
    }
    $week.innerHTML = html + '</div>';
  }

  /* ---------------- Vista Lista ---------------- */
  function aggregate(list) {
    const map = new Map();
    list.forEach(r => {
      const k = [r.term, r.code || r.name, r.turma, r.prof].join('|');
      let a = map.get(k);
      if (!a) { a = { term: r.term, name: r.name, code: r.code, turma: r.turma, prof: r.prof, key: r.key, slots: [], rooms: new Set(), groups: new Set() }; map.set(k, a); }
      a.slots.push(r); a.rooms.add(r.room); r.groups.forEach(g => a.groups.add(groupKey(g)));
    });
    const out = [...map.values()];
    out.forEach(a => { a.slots.sort((x, y) => x.day - y.day || x.start.localeCompare(y.start)); a.g = [...a.groups].sort((x, y) => groupOrder(x) - groupOrder(y)); });
    return out.sort((x, y) => y.term.localeCompare(x.term) || groupOrder(x.g[0]) - groupOrder(y.g[0]) || x.name.localeCompare(y.name, 'pt'));
  }

  function renderList(list) {
    if (!list.length) { $list.innerHTML = '<p class="ho-empty">Nenhuma turma encontrada com esses filtros.</p>'; return 0; }
    const agg = aggregate(list);
    const multi = state.term === ALL;
    $list.innerHTML = `<div class="ho-table-wrap"><table class="ho-table">
      <thead><tr>${multi ? '<th>Semestre</th>' : '<th><span class="sr-only">Agenda</span></th>'}<th>Disciplina</th><th>Turma</th><th>Professor</th><th>Dias e horários</th><th>Sala</th><th>Grupo</th></tr></thead>
      <tbody>${agg.map(a => {
        const link = a.code && EA.BY[a.code] ? `<a href="matriz.html?c=${a.code}">${esc(a.name)}</a>` : esc(a.name);
        return `<tr${inAgenda(a) ? ' class="in"' : ''}>${multi ? `<td class="ho-nowrap">${termName(a.term)}</td>` : `<td class="ho-addcell">${addBtn(a)}</td>`}
          <td>${link}${a.code ? ` <span class="ho-code">${esc(a.code)}</span>` : ''}</td>
          <td class="ho-nowrap">${esc(a.turma)}</td>
          <td>${esc(a.prof)}</td>
          <td>${a.slots.map(s => `<span class="ho-nowrap">${DAY3[s.day]} ${range(s.start, s.end)}</span>`).join('<br>')}</td>
          <td>${[...a.rooms].map(esc).join('<br>')}</td>
          <td>${a.g.map(groupLabel).join(', ')}</td></tr>`;
      }).join('')}</tbody></table></div>`;
    return agg.length;
  }

  function render() {
    const list = filtered();
    renderWeek(list);
    const n = renderList(list);
    const where = state.term === ALL ? 'em todos os semestres' : `em ${termName(state.term)}`;
    $shown.textContent = state.view === 'week'
      ? (state.term === ALL ? '' : `${list.length} aulas na semana ${where}`)
      : `${n} turmas ${where}`;
    Object.entries(tabs).forEach(([v, b]) => b.setAttribute('aria-selected', String(v === state.view)));
    $week.hidden = state.view !== 'week';
    $list.hidden = state.view !== 'list';
    renderAgendaBar();
  }

  function renderAgendaBar() {
    const single = state.term !== ALL;
    $addall.innerHTML = single && /^\d\d$/.test(state.group) && !state.q.trim()
      ? `<button type="button" class="ho-addall" id="ho-addall-btn">+ Pôr todas do ${groupLabel(state.group)} na agenda</button>` : '';
    const n = AG.count();
    $mine.hidden = !single;
    $mine.textContent = n ? `Sua agenda de ${termName(AG.term())}: ${n} ${n === 1 ? 'disciplina' : 'disciplinas'} ↓` : 'Sua agenda está vazia ↓';
  }

  function onTerm() { if (state.term !== ALL) AG.setTerm(state.term); }
  [$week, $list].forEach(el => el.addEventListener('click', e => {
    const b = e.target.closest('button[data-ak]'); if (b) AG.toggle(b.dataset.ak);
  }));
  $addall.addEventListener('click', e => {
    if (!e.target.closest('#ho-addall-btn')) return;
    const n = AG.addGroup(state.group);
    EA.toast(n ? EA.t('ag.addall.done', { n }) : EA.t('ag.addall.none'));
  });
  document.addEventListener('agendachange', render);

  $term.addEventListener('change', () => { state.term = $term.value; onTerm(); renderGroups(); render(); });
  $q.addEventListener('input', () => { state.q = $q.value; render(); });
  $groups.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    state.group = b.dataset.g;
    $groups.querySelectorAll('button').forEach(o => o.setAttribute('aria-pressed', String(o === b)));
    render();
  });
  Object.entries(tabs).forEach(([v, b]) => b.addEventListener('click', () => { state.view = v; render(); }));

  /* ---------------- Números de destaque ---------------- */
  const profs = new Set(rows.map(r => norm(r.prof)));
  const discs = new Set(rows.map(r => r.code || norm(r.name)));
  document.getElementById('ho-facts').innerHTML = [
    [H.terms.length, 'semestres'], [discs.size, 'disciplinas diferentes'], [profs.size, 'professores nos horários'], [H.docentes.length, 'docentes no curso hoje']
  ].map(([n, l]) => `<div><b>${n}</b><span>${l}</span></div>`).join('');

  /* ---------------- Docentes ---------------- */
  // Grafia com acentos vinda dos horários, quando o docente aparece neles.
  const byKey = new Map();
  rows.forEach(r => {
    const k = norm(r.prof);
    let d = byKey.get(k);
    if (!d) { d = { name: r.prof, terms: new Set(), discs: new Map() }; byKey.set(k, d); }
    d.terms.add(r.term);
    if (!d.discs.has(r.name) || d.discs.get(r.name) < r.term) d.discs.set(r.name, r.term);
  });
  const SMALL = new Set(['da', 'de', 'do', 'das', 'dos', 'e']);
  const titleCase = s => s.toLowerCase().split(' ').map((w, i) => (i && SMALL.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1))).join(' ');

  document.getElementById('ho-docentes').innerHTML = H.docentes.map(d => {
    const h = byKey.get(norm(d.nome));
    const name = h ? h.name : titleCase(d.nome);
    const recent = h ? [...h.discs.entries()].sort((a, b) => b[1].localeCompare(a[1]) || a[0].localeCompare(b[0], 'pt')).slice(0, 3).map(e => e[0]) : [];
    const nameHTML = d.url ? `<a href="${esc(d.url)}" target="_blank" rel="noopener">${esc(name)}</a>` : esc(name);
    return `<article class="ho-doc">
      <h3>${nameHTML}</h3>
      <p class="ho-doc-title">${esc(d.titulacao || '')}${d.classe ? ` · ${esc(d.classe)}` : ''}</p>
      ${recent.length ? `<p class="ho-doc-discs">${recent.map(esc).join(' · ')}</p>` : ''}
      <p class="ho-doc-links">
        ${d.url ? `<a href="${esc(d.url)}" target="_blank" rel="noopener">Página na Unipampa</a>` : ''}
        ${d.lattes ? `<a href="${esc(d.lattes)}" target="_blank" rel="noopener">Lattes</a>` : ''}
        ${h ? `<button type="button" data-prof="${esc(name)}">Horários (${h.terms.size} ${h.terms.size === 1 ? 'semestre' : 'semestres'})</button>` : ''}
      </p>
    </article>`;
  }).join('');

  document.getElementById('ho-docentes').addEventListener('click', e => {
    const b = e.target.closest('button[data-prof]'); if (!b) return;
    state.q = b.dataset.prof; state.term = ALL; state.group = ALL; state.view = 'list';
    $q.value = state.q; $term.value = ALL;
    renderGroups(); render();
    document.getElementById('ofertas').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  /* ---------------- PDFs de origem ---------------- */
  document.getElementById('ho-pdfs').innerHTML = H.terms.map(t =>
    `<li><a href="${esc(t.pdf)}" target="_blank" rel="noopener">${termName(t.id)}</a> <span>atualizado em ${t.upd}</span></li>`).join('');

  onTerm();
  renderGroups();
  render();
  // O conteúdo é montado depois do carregamento; refaz o salto para a âncora (#docentes, #fontes).
  const target = location.hash && document.getElementById(location.hash.slice(1));
  const jump = () => target.scrollIntoView({ behavior: 'instant' });
  if (target) { jump(); addEventListener('load', jump); }
})();
