/* Monte sua grade: planejamento por semestre, CCCGs, ACGs e resumo. */
(function () {
  'use strict';
  const { add, t, L, BY, DATA, AREAS, ICONS, esc, store, toast } = EA;

  add({
    'pl.title': ['Monte sua grade', 'Build your plan', 'Armá tu plan'],
    'pl.eyebrow': ['Planejador de semestres', 'Semester planner', 'Planificador de semestres'],
    'pl.h1': ['Monte a sua grade', 'Build your own plan', 'Armá tu propio plan'],
    'pl.lead': [
      'Organize as disciplinas por semestre, escolha suas CCCGs e registre suas ACGs. O planejador avisa quando falta algum pré-requisito ou quando a carga do semestre passa do limite. Tudo fica salvo só no seu navegador, e a página funciona mesmo sem internet depois da primeira visita.',
      'Arrange courses by semester, pick your electives and log your complementary activities. The planner warns you when a prerequisite is missing or a semester goes over the limit. Everything is saved only in your browser, and the page works offline after your first visit.',
      'Organizá las asignaturas por semestre, elegí tus CCCG y registrá tus ACG. El planificador te avisa cuando falta una correlativa o cuando el semestre supera el límite. Todo se guarda solo en tu navegador, y la página funciona sin internet después de la primera visita.'
    ],
    'pl.tab.plan': ['Minha grade', 'My plan', 'Mi plan'],
    'pl.tab.acg': ['Minhas ACGs', 'My activities (ACG)', 'Mis ACG'],
    'pl.tab.sum': ['Resumo e checklist', 'Summary & checklist', 'Resumen y checklist'],
    'pl.suggest': ['Usar a grade sugerida do PPC', 'Use the PPC suggested plan', 'Usar el plan sugerido del PPC'],
    'pl.addsem': ['Adicionar semestre', 'Add semester', 'Agregar semestre'],
    'pl.export': ['Exportar', 'Export', 'Exportar'],
    'pl.import': ['Importar', 'Import', 'Importar'],
    'pl.print': ['Imprimir', 'Print', 'Imprimir'],
    'pl.clear': ['Limpar tudo', 'Clear all', 'Borrar todo'],
    'pl.howto': [
      '<b>Como usar:</b> 1) comece pela <b>grade sugerida</b> ou adicione disciplinas pela lista à esquerda (botão <b>+</b> ou arrastando); 2) marque ✔ o que você já concluiu; 3) mova disciplinas entre semestres se reprovar ou adiantar algo; 4) escolha suas CCCGs na aba “CCCGs” da lista.',
      '<b>How to use:</b> 1) start with the <b>suggested plan</b> or add courses from the list on the left (<b>+</b> button or drag and drop); 2) tick ✔ what you have already passed; 3) move courses between semesters if you fail or get ahead; 4) pick your electives in the list’s “Electives” tab.',
      '<b>Cómo usarlo:</b> 1) empezá con el <b>plan sugerido</b> o agregá asignaturas desde la lista de la izquierda (botón <b>+</b> o arrastrando); 2) marcá ✔ lo que ya aprobaste; 3) mové asignaturas entre semestres si desaprobás o adelantás algo; 4) elegí tus CCCG en la pestaña “CCCG” de la lista.'
    ],
    'pl.pool.ob': ['Obrigatórias', 'Required', 'Obligatorias'],
    'pl.pool.cccg': ['CCCGs', 'Electives', 'CCCG'],
    'pl.pool.search': ['Buscar…', 'Search…', 'Buscar…'],
    'pl.pool.target': ['Adicionar no:', 'Add to:', 'Agregar en:'],
    'pl.pool.avail': ['Só as liberadas para esse semestre', 'Only those unlocked for that semester', 'Solo las habilitadas para ese semestre'],
    'pl.pool.empty': ['Nada por aqui. Todas já estão na sua grade! 🎉', 'Nothing here. They are all in your plan! 🎉', 'Nada por acá. ¡Ya están todas en tu plan! 🎉'],
    'pl.pool.allareas': ['Todas as áreas', 'All areas', 'Todas las áreas'],
    'pl.pool.sug': ['sugerida: {s}', 'suggested: {s}', 'sugerida: {s}'],
    'pl.missing': ['falta: {x}', 'missing: {x}', 'falta: {x}'],
    'pl.missing.h': ['{h} h obrigatórias antes', '{h} required h before', '{h} h obligatorias antes'],
    'pl.add.aria': ['Adicionar {x}', 'Add {x}', 'Agregar {x}'],
    'pl.rm.aria': ['Remover {x}', 'Remove {x}', 'Quitar {x}'],
    'pl.done.aria': ['Marcar {x} como concluída', 'Mark {x} as passed', 'Marcar {x} como aprobada'],
    'pl.sem.empty': ['Arraste disciplinas para cá ou use o botão +', 'Drag courses here or use the + button', 'Arrastrá asignaturas acá o usá el botón +'],
    'pl.sem.target': ['Clique para tornar este o semestre de destino', 'Click to make this the target semester', 'Hacé clic para que este sea el semestre de destino'],
    'pl.sem.rm': ['Remover semestre vazio', 'Remove empty semester', 'Quitar semestre vacío'],
    'pl.h.low': ['abaixo de 120 h', 'below 120 h', 'menos de 120 h'],
    'pl.h.high': ['acima de 540 h', 'above 540 h', 'más de 540 h'],
    'pl.added': ['{x} adicionada ao {s}', '{x} added to {s}', '{x} agregada al {s}'],
    'pl.dup': ['Essa disciplina já está na sua grade.', 'This course is already in your plan.', 'Esa asignatura ya está en tu plan.'],
    'pl.confirm.suggest': ['Reorganizar todas as obrigatórias conforme a grade sugerida do PPC? Suas CCCGs e marcações de concluída serão mantidas.', 'Rearrange all required courses according to the PPC suggested plan? Your electives and “passed” marks will be kept.', '¿Reorganizar todas las obligatorias según el plan sugerido del PPC? Se mantendrán tus CCCG y las marcas de aprobada.'],
    'pl.confirm.clear': ['Apagar toda a grade e as ACGs registradas?', 'Erase the whole plan and all logged activities?', '¿Borrar todo el plan y las ACG registradas?'],
    'pl.max': ['O prazo máximo de integralização é de 20 semestres.', 'The maximum time to complete the program is 20 semesters.', 'El plazo máximo para completar la carrera es de 20 semestres.'],
    'pl.imported': ['Grade importada!', 'Plan imported!', '¡Plan importado!'],
    'pl.badfile': ['Arquivo inválido.', 'Invalid file.', 'Archivo inválido.'],
    'pl.p.ob': ['Obrigatórias (com TCC e estágio)', 'Required (incl. thesis & internship)', 'Obligatorias (con TFG y práctica)'],
    'pl.p.cccg': ['CCCGs', 'Electives (CCCG)', 'CCCG'],
    'pl.p.acg': ['ACGs', 'Activities (ACG)', 'ACG'],
    'pl.p.total': ['Total do curso', 'Program total', 'Total de la carrera'],
    'pl.p.legend': ['<b style="color:var(--brand)">■</b> concluído <b style="color:var(--brand);opacity:.35">■</b> planejado', '<b style="color:var(--brand)">■</b> passed <b style="color:var(--brand);opacity:.35">■</b> planned', '<b style="color:var(--brand)">■</b> aprobado <b style="color:var(--brand);opacity:.35">■</b> planificado'],

    'acg.lead': [
      'Registre aqui suas atividades complementares. Os valores seguem a tabela do PPC (horas por atividade e limite máximo por item). Lembre: no mínimo 150 h, sendo pelo menos 15 h nos grupos I (ensino), II (pesquisa) e IV (cultura, sociedade e gestão).',
      'Log your complementary activities here. Values follow the PPC table (hours per activity and maximum per item). Remember: at least 150 h, with at least 15 h in groups I (teaching), II (research) and IV (culture, society & management).',
      'Registrá acá tus actividades complementarias. Los valores siguen la tabla del PPC (horas por actividad y tope por ítem). Recordá: mínimo 150 h, con al menos 15 h en los grupos I (enseñanza), II (investigación) y IV (cultura, sociedad y gestión).'
    ],
    'acg.f.type': ['Atividade (tabela do PPC)', 'Activity (PPC table)', 'Actividad (tabla del PPC)'],
    'acg.opt': ['{per} h/{u} (máx. {max} h)', '{per} h/{u} (max. {max} h)', '{per} h/{u} (máx. {max} h)'],
    'acg.f.qty': ['Quantidade', 'Quantity', 'Cantidad'],
    'acg.f.group': ['Grupo', 'Group', 'Grupo'],
    'acg.f.add': ['Adicionar', 'Add', 'Agregar'],
    'acg.f.desc': ['Descrição (opcional)', 'Description (optional)', 'Descripción (opcional)'],
    'acg.f.desc.ph': ['Ex.: Semana Acadêmica 2025, Congresso de Engenharia Agrícola…', 'E.g. Academic Week 2025, Agricultural Engineering Congress…', 'Ej.: Semana Académica 2025, Congreso de Ingeniería Agrícola…'],
    'acg.preview': ['Vale {h} h ({per} h × {q}). Limite deste item: {max} h — você já tem {used} h nele.', 'Worth {h} h ({per} h × {q}). Limit for this item: {max} h — you already have {used} h in it.', 'Vale {h} h ({per} h × {q}). Tope de este ítem: {max} h — ya tenés {used} h en él.'],
    'acg.preview.free': ['Informe as horas no campo quantidade. A Comissão de Curso avalia a validade.', 'Enter the hours in the quantity field. The Program Committee evaluates validity.', 'Indicá las horas en el campo cantidad. La Comisión de Carrera evalúa su validez.'],
    'acg.th.act': ['Atividade', 'Activity', 'Actividad'],
    'acg.th.group': ['Grupo', 'Group', 'Grupo'],
    'acg.th.h': ['Horas', 'Hours', 'Horas'],
    'acg.empty': ['Nenhuma ACG registrada ainda.', 'No activities logged yet.', 'Todavía no registraste ACG.'],
    'acg.capped': ['limitado pelo teto do item', 'capped by item limit', 'limitado por el tope del ítem'],
    'acg.min': ['mín. {h} h', 'min. {h} h', 'mín. {h} h'],
    'acg.nomin': ['sem mínimo', 'no minimum', 'sin mínimo'],
    'acg.note': [
      'Para validar, entregue os comprovantes (certificados, declarações) na Secretaria Acadêmica no período indicado no Calendário Acadêmico. Só valem atividades realizadas enquanto você estiver matriculado(a). Casos não previstos são analisados pela Comissão de Curso.',
      'To validate, hand in proof (certificates, statements) at the Academic Office within the period set in the Academic Calendar. Only activities done while you are enrolled count. Cases not covered are analyzed by the Program Committee.',
      'Para validarlas, entregá los comprobantes (certificados, constancias) en la Secretaría Académica en el período del Calendario Académico. Solo valen actividades realizadas mientras estés matriculado/a. Los casos no previstos los analiza la Comisión de Carrera.'
    ],
    'acg.g1': ['I · Ensino', 'I · Teaching', 'I · Enseñanza'],
    'acg.g2': ['II · Pesquisa', 'II · Research', 'II · Investigación'],
    'acg.g3': ['III · Extensão', 'III · Outreach', 'III · Extensión'],
    'acg.g4': ['IV · Cultura, sociedade e gestão', 'IV · Culture, society & management', 'IV · Cultura, sociedad y gestión'],
    'acg.unit.event': ['eventos', 'events', 'eventos'],
    'acg.unit.work': ['trabalhos', 'papers', 'trabajos'],
    'acg.unit.sem': ['semestres', 'semesters', 'semestres'],
    'acg.unit.course': ['cursos', 'courses', 'cursos'],
    'acg.unit.block': ['blocos de 40 h', 'blocks of 40 h', 'bloques de 40 h'],
    'acg.unit.hours': ['horas', 'hours', 'horas'],
    'acg.unit.visit': ['visitas', 'visits', 'visitas'],

    'sum.check': ['Checklist para se formar', 'Graduation checklist', 'Checklist para recibirte'],
    'sum.ob': ['Todas as obrigatórias na grade ({n} faltando)', 'All required courses in the plan ({n} missing)', 'Todas las obligatorias en el plan (faltan {n})'],
    'sum.ob.ok': ['Todas as obrigatórias na grade', 'All required courses in the plan', 'Todas las obligatorias en el plan'],
    'sum.cccg': ['CCCGs: {h} de 270 h', 'Electives: {h} of 270 h', 'CCCG: {h} de 270 h'],
    'sum.acg': ['ACGs: {h} de 150 h', 'Activities: {h} of 150 h', 'ACG: {h} de 150 h'],
    'sum.acgg': ['Mínimo de 15 h nos grupos I, II e IV', 'At least 15 h in groups I, II and IV', 'Mínimo de 15 h en los grupos I, II y IV'],
    'sum.pre': ['Pré-requisitos respeitados ({n} alertas)', 'Prerequisites respected ({n} warnings)', 'Correlativas respetadas ({n} alertas)'],
    'sum.pre.ok': ['Pré-requisitos respeitados', 'Prerequisites respected', 'Correlativas respetadas'],
    'sum.lim': ['Semestres entre 120 h e 540 h ({n} fora)', 'Semesters between 120 h and 540 h ({n} outside)', 'Semestres entre 120 h y 540 h ({n} fuera)'],
    'sum.lim.ok': ['Semestres entre 120 h e 540 h', 'Semesters between 120 h and 540 h', 'Semestres entre 120 h y 540 h'],
    'sum.max': ['Dentro do prazo máximo de 20 semestres', 'Within the 20-semester maximum', 'Dentro del plazo máximo de 20 semestres'],
    'sum.grad': ['Previsão de formatura', 'Expected graduation', 'Previsión de egreso'],
    'sum.grad.p': ['Com esta grade você conclui o curso em <b>{n} semestres</b> (≈ {y} anos).', 'With this plan you finish the program in <b>{n} semesters</b> (≈ {y} years).', 'Con este plan terminás la carrera en <b>{n} semestres</b> (≈ {y} años).'],
    'sum.grad.none': ['Adicione disciplinas para ver a previsão.', 'Add courses to see the estimate.', 'Agregá asignaturas para ver la previsión.'],
    'sum.laurea': ['Rumo à Láurea Acadêmica?', 'Aiming for Academic Honors?', '¿Rumbo a la Mención Académica?'],
    'sum.laurea.p': ['Além de média ≥ 8,5, nota do TCC II ≥ 9,0 e no máximo 1 reprovação ou trancamento parcial, a láurea exige:', 'Besides a GPA ≥ 8.5, Thesis II grade ≥ 9.0 and at most 1 failure or partial withdrawal, honors require:', 'Además de promedio ≥ 8,5, nota del TFG II ≥ 9,0 y como máximo 1 desaprobación o baja parcial, la mención exige:'],
    'sum.l.sem': ['Concluir em até 10 semestres', 'Finish within 10 semesters', 'Terminar en hasta 10 semestres'],
    'sum.l.acg': ['Pelo menos 180 h de ACG', 'At least 180 h of activities', 'Al menos 180 h de ACG'],
    'sum.l.cccg': ['Pelo menos 300 h de CCCG', 'At least 300 h of electives', 'Al menos 300 h de CCCG'],
    'sum.areas': ['Seu perfil por área', 'Your profile by area', 'Tu perfil por área'],
    'sum.areas.p': ['Horas planejadas em cada área do conhecimento (obrigatórias + CCCGs).', 'Planned hours in each knowledge area (required + electives).', 'Horas planificadas en cada área del conocimiento (obligatorias + CCCG).']
  });

  /* ---------- tabela de ACG do PPC (Apêndice C) ---------- */
  const ACG_ITEMS = [
    ['1.1', 3, 15, 'event', 1, ['Evento da área — local', 'Field event — local', 'Evento del área — local']],
    ['1.2', 5, 15, 'event', 1, ['Evento da área — estadual', 'Field event — state', 'Evento del área — estadual']],
    ['1.3', 7, 21, 'event', 1, ['Evento da área — nacional', 'Field event — national', 'Evento del área — nacional']],
    ['1.4', 8, 10, 'event', 1, ['Evento da área — internacional', 'Field event — international', 'Evento del área — internacional']],
    ['1.5', 5, 40, 'event', 1, ['Semana Acadêmica promovida pelo curso', 'Academic Week organized by the program', 'Semana Académica organizada por la carrera']],
    ['1.6', 1, 20, 'visit', 1, ['Visita técnica supervisionada', 'Supervised technical visit', 'Visita técnica supervisada']],
    ['1.7', 5, 10, 'event', 3, ['Palestrante em evento da área', 'Speaker at a field event', 'Disertante en evento del área']],
    ['2', 5, 50, 'block', 1, ['Estágio extracurricular na área (mín. 40 h)', 'Extracurricular internship in the field (min. 40 h)', 'Práctica extracurricular en el área (mín. 40 h)']],
    ['3', 5, 30, 'sem', 2, ['Projeto de pesquisa ou extensão registrado', 'Registered research or outreach project', 'Proyecto de investigación o extensión registrado']],
    ['4.1', 3, 15, 'work', 2, ['Publicação — evento local', 'Publication — local event', 'Publicación — evento local']],
    ['4.2', 5, 15, 'work', 2, ['Publicação — evento estadual', 'Publication — state event', 'Publicación — evento estadual']],
    ['4.3', 7, 21, 'work', 2, ['Publicação — evento nacional', 'Publication — national event', 'Publicación — evento nacional']],
    ['4.4', 15, 45, 'work', 2, ['Publicação — evento internacional', 'Publication — international event', 'Publicación — evento internacional']],
    ['4.5', 10, 30, 'work', 2, ['Artigo completo em periódico indexado', 'Full paper in an indexed journal', 'Artículo completo en revista indexada']],
    ['5.1', 3, 18, 'sem', 1, ['Monitoria/tutoria com bolsa', 'Paid tutoring / teaching assistant', 'Ayudantía/tutoría con beca']],
    ['5.2', 3, 18, 'sem', 1, ['Monitoria/tutoria voluntária', 'Volunteer tutoring / teaching assistant', 'Ayudantía/tutoría voluntaria']],
    ['6.1', 3, 20, 'course', 1, ['Curso em área afim (até 20 h)', 'Short course in a related field (up to 20 h)', 'Curso en área afín (hasta 20 h)']],
    ['6.2', 5, 40, 'course', 1, ['Curso em área afim (20 h ou mais)', 'Course in a related field (20 h or more)', 'Curso en área afín (20 h o más)']],
    ['7.1', 5, 10, 'sem', 4, ['Colegiados, comissões ou Diretório Acadêmico', 'Boards, committees or Student Union', 'Consejos, comisiones o Centro de Estudiantes']],
    ['7.2', 3, 9, 'event', 4, ['Comissão organizadora de evento', 'Event organizing committee', 'Comisión organizadora de evento']],
    ['7.3', 3, 9, 'sem', 4, ['Representante de turma', 'Class representative', 'Delegado/a de curso']],
    ['8', 2, 20, 'event', 4, ['Evento cultural', 'Cultural event', 'Evento cultural']],
    ['x', 1, 9999, 'hours', 3, ['Outra atividade (horas informadas; avaliada pela Comissão)', 'Other activity (hours entered; evaluated by the Committee)', 'Otra actividad (horas indicadas; la evalúa la Comisión)']]
  ];
  const ACG_MIN = { 1: 15, 2: 15, 3: 0, 4: 15 };
  const li = () => ['pt', 'en', 'es'].indexOf(EA.lang);

  /* ---------- estado ---------- */
  const KEY = 'ea-plan-v1';
  let S = load();
  const ui = { type: 'ob', q: '', area: '', avail: false };

  function blank() { return { sems: Array.from({ length: 10 }, () => []), done: {}, acg: [], target: 0 }; }
  function load() {
    try { const s = JSON.parse(store.get(KEY, '')); if (s && Array.isArray(s.sems)) return sanitize(s); } catch (e) { /* novo */ }
    return blank();
  }
  function sanitize(s) {
    const seen = new Set();
    const sems = s.sems.slice(0, 20).map(list => (Array.isArray(list) ? list : []).filter(k => BY[k] && !seen.has(k) && seen.add(k)));
    while (sems.length < 10) sems.push([]);
    const acg = (Array.isArray(s.acg) ? s.acg : []).filter(a => a && ACG_ITEMS.some(i => i[0] === a.item) && a.qty > 0)
      .map(a => ({ id: a.id || Math.random().toString(36).slice(2), item: a.item, qty: Math.min(9999, +a.qty || 1), group: [1, 2, 3, 4].includes(+a.group) ? +a.group : 1, desc: String(a.desc || '').slice(0, 120) }));
    return { sems, done: s.done && typeof s.done === 'object' ? s.done : {}, acg, target: Math.min(Math.max(0, +s.target || 0), sems.length - 1) };
  }
  function save() { store.set(KEY, JSON.stringify(S)); EA.persist(); }

  /* ---------- regras ---------- */
  const where = code => S.sems.findIndex(l => l.includes(code));
  const equivOf = code => { const g = (DATA.meta.equiv || []).find(g => g.includes(code)); return g ? g.filter(k => k !== code) : []; };
  const placed = code => where(code) >= 0 || equivOf(code).some(k => where(k) >= 0);

  function before(idx) {
    const set = new Set(); let obH = 0;
    for (let i = 0; i < idx; i++) S.sems[i].forEach(k => { set.add(k); equivOf(k).forEach(e => set.add(e)); if (BY[k].type === 'ob') obH += BY[k].ch; });
    return { set, obH };
  }
  function missing(code, idx) {
    const c = BY[code]; const b = before(idx); const miss = [];
    c.pre.req.forEach(r => { if (!b.set.has(r)) miss.push(L(BY[r].name)); });
    if (c.pre.hours && b.obH < c.pre.hours) miss.push(t('pl.missing.h', { h: c.pre.hours.toLocaleString(document.documentElement.lang) }));
    return miss;
  }
  const semHours = i => S.sems[i].reduce((a, k) => a + BY[k].ch, 0);
  const semName = i => t('common.sem.short', { n: i + 1 });

  function totals() {
    let ob = 0, obDone = 0, cc = 0, ccDone = 0;
    S.sems.forEach(l => l.forEach(k => {
      const c = BY[k]; const d = !!S.done[k];
      if (c.type === 'ob') { ob += c.ch; if (d) obDone += c.ch; } else { cc += c.ch; if (d) ccDone += c.ch; }
    }));
    const acg = acgTotals();
    return { ob, obDone, cc, ccDone, acg: acg.total, acgG: acg.g };
  }

  function acgTotals() {
    const used = {}; const g = { 1: 0, 2: 0, 3: 0, 4: 0 }; const rows = [];
    S.acg.forEach(a => {
      const it = ACG_ITEMS.find(i => i[0] === a.item);
      const raw = it[1] * a.qty; const prev = used[a.item] || 0; const h = Math.max(0, Math.min(raw, it[2] - prev));
      used[a.item] = prev + h; g[a.group] += h; rows.push({ a, it, h, capped: h < raw });
    });
    return { total: g[1] + g[2] + g[3] + g[4], g, rows, used };
  }

  /* ---------- render: progresso ---------- */
  function bar(label, done, plan, max, cls) {
    const pd = Math.min(100, done / max * 100); const pp = Math.min(100 - pd, Math.max(0, (plan - done) / max * 100));
    return `<div class="pbar"><header><span>${label}</span><span>${plan.toLocaleString(document.documentElement.lang)} / ${max.toLocaleString(document.documentElement.lang)} h</span></header>
      <div class="track stack"><i class="${cls || ''}" style="width:${pd}%"></i><i class="${cls || ''}" style="width:${pp}%;opacity:.35"></i></div></div>`;
  }
  function renderProgress() {
    const T = totals(); const M = DATA.meta.totals; const obMax = M.ob + M.tcc + M.estagio;
    const totPlan = Math.min(T.ob, obMax) + Math.min(T.cc, M.cccg) + Math.min(T.acg, M.acg);
    const totDone = Math.min(T.obDone, obMax) + Math.min(T.ccDone, M.cccg) + Math.min(T.acg, M.acg);
    document.getElementById('progress').innerHTML =
      bar(t('pl.p.ob'), T.obDone, T.ob, obMax) + bar(t('pl.p.cccg'), T.ccDone, T.cc, M.cccg, 'gold') +
      bar(t('pl.p.acg'), T.acg, T.acg, M.acg, 'mgmt') + bar(t('pl.p.total'), totDone, totPlan, M.total, 'water') +
      `<p class="muted" style="grid-column:1/-1;margin:0;font-size:.8rem">${t('pl.p.legend')}</p>`;
  }

  /* ---------- render: lista de disciplinas ---------- */
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  function renderPoolControls() {
    const area = document.getElementById('pool-area');
    area.innerHTML = `<option value="">${t('pl.pool.allareas')}</option>` + Object.keys(AREAS).map(a => `<option value="${a}"${ui.area === a ? ' selected' : ''}>${EA.areaName(a)}</option>`).join('');
    const tg = document.getElementById('pool-target');
    tg.innerHTML = S.sems.map((_, i) => `<option value="${i}"${S.target === i ? ' selected' : ''}>${semName(i)} · ${semHours(i)} h</option>`).join('');
    document.querySelectorAll('.pool-head .seg button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.type === ui.type)));
  }
  function renderPool() {
    const q = norm(ui.q);
    const list = DATA.courses.filter(c => c.type === ui.type && !placed(c.code) && (!ui.area || c.area === ui.area) && (!q || norm(L(c.name) + ' ' + c.code + ' ' + c.name.pt).includes(q)));
    const items = list.map(c => ({ c, miss: missing(c.code, S.target) })).filter(x => !ui.avail || !x.miss.length);
    const box = document.getElementById('pool-list');
    if (!items.length) { box.innerHTML = `<p class="muted" style="font-size:.88rem;text-align:center;padding:16px">${t('pl.pool.empty')}</p>`; return; }
    box.innerHTML = items.map(({ c, miss }) => `
      <div class="pitem${miss.length ? ' locked' : ''}" draggable="true" data-code="${c.code}" data-area="${c.area}">
        <div><div class="pn">${esc(L(c.name))}</div>
        <div class="pm">${c.ch} h · ${c.code}${c.sem ? ' · ' + t('pl.pool.sug', { s: semName(c.sem - 1) }) : ''}</div>
        ${miss.length ? `<div class="lock">🔒 ${esc(t('pl.missing', { x: miss.join(', ') }))}</div>` : ''}</div>
        <button type="button" class="add" aria-label="${esc(t('pl.add.aria', { x: L(c.name) }))}">+</button></div>`).join('');
    box.querySelectorAll('.pitem').forEach(el => {
      el.querySelector('.add').addEventListener('click', e => { e.stopPropagation(); addTo(el.dataset.code, S.target); });
      el.querySelector('.pn').addEventListener('click', () => EA.course.open(el.dataset.code));
      el.addEventListener('dragstart', e => { e.dataTransfer.setData('text/plain', el.dataset.code); e.dataTransfer.effectAllowed = 'move'; });
    });
  }

  /* ---------- render: quadro de semestres ---------- */
  function renderBoard() {
    const box = document.getElementById('board');
    box.innerHTML = S.sems.map((list, i) => {
      const h = semHours(i); const [lo, hi] = DATA.meta.semLimits;
      const cls = !list.length ? '' : h > hi ? 'bad' : h < lo ? 'low' : 'ok';
      const tip = cls === 'bad' ? t('pl.h.high') : cls === 'low' ? t('pl.h.low') : '';
      const canRm = !list.length && i === S.sems.length - 1 && S.sems.length > 10;
      return `<section class="semester${S.target === i ? ' target' : ''}" data-i="${i}">
        <header><button type="button" class="sem-name" title="${esc(t('pl.sem.target'))}">${semName(i)}</button>
          <span style="display:flex;gap:6px;align-items:center"><span class="hours-badge ${cls}" ${tip ? `title="${tip}"` : ''}>${h} h${tip ? ' ⚠' : ''}</span>
          ${canRm ? `<button type="button" class="icon-btn rm-sem" style="width:28px;height:28px" aria-label="${esc(t('pl.sem.rm'))}">${ICONS.close}</button>` : ''}</span></header>
        ${list.length ? list.map(k => chipHtml(k, i)).join('') : `<div class="sem-empty">${t('pl.sem.empty')}</div>`}
      </section>`;
    }).join('');
    box.querySelectorAll('.semester').forEach(sec => {
      const i = +sec.dataset.i;
      sec.querySelector('.sem-name').addEventListener('click', () => { S.target = i; save(); renderAll(); });
      const rm = sec.querySelector('.rm-sem'); if (rm) rm.addEventListener('click', () => { S.sems.pop(); S.target = Math.min(S.target, S.sems.length - 1); save(); renderAll(); });
      sec.addEventListener('dragover', e => { e.preventDefault(); sec.classList.add('dragover'); });
      sec.addEventListener('dragleave', () => sec.classList.remove('dragover'));
      sec.addEventListener('drop', e => { e.preventDefault(); sec.classList.remove('dragover'); const k = e.dataTransfer.getData('text/plain'); if (BY[k]) move(k, i); });
    });
    box.querySelectorAll('.pchip').forEach(ch => {
      const k = ch.dataset.code;
      ch.addEventListener('dragstart', e => { e.dataTransfer.setData('text/plain', k); e.dataTransfer.effectAllowed = 'move'; });
      ch.querySelector('input').addEventListener('change', e => { if (e.target.checked) S.done[k] = true; else delete S.done[k]; save(); renderAll(); });
      ch.querySelector('.x').addEventListener('click', () => { const i = where(k); S.sems[i] = S.sems[i].filter(x => x !== k); delete S.done[k]; save(); renderAll(); });
      ch.querySelector('.pn').addEventListener('click', () => EA.course.open(k));
    });
  }
  function chipHtml(k, i) {
    const c = BY[k]; const miss = missing(k, i); const d = !!S.done[k];
    return `<div class="pchip${d ? ' done' : ''}${miss.length ? ' warn' : ''}" draggable="true" data-code="${k}" data-area="${c.area}">
      <input type="checkbox" ${d ? 'checked' : ''} aria-label="${esc(t('pl.done.aria', { x: L(c.name) }))}">
      <div><div class="pn" style="cursor:pointer">${esc(L(c.name))}</div><div class="pm">${c.ch} h · ${c.type === 'cccg' ? 'CCCG' : c.code}</div></div>
      <button type="button" class="x" aria-label="${esc(t('pl.rm.aria', { x: L(c.name) }))}">×</button>
      ${miss.length ? `<div class="warn-msg">⚠ ${esc(t('pl.missing', { x: miss.join(', ') }))}</div>` : ''}</div>`;
  }

  function addTo(code, i) {
    if (placed(code) && where(code) < 0) { toast(t('pl.dup')); return; }
    move(code, i);
    toast(t('pl.added', { x: L(BY[code].name), s: semName(i) }));
  }
  function move(code, i) {
    if (equivOf(code).some(k => where(k) >= 0)) { toast(t('pl.dup')); return; }
    const from = where(code);
    if (from >= 0) S.sems[from] = S.sems[from].filter(k => k !== code);
    S.sems[i].push(code); save(); renderAll();
  }

  /* ---------- ACG ---------- */
  const unitLabel = u => t('acg.unit.' + u);
  function renderAcgForm() {
    const sel = document.getElementById('acg-item'); const cur = sel.value || '1.5';
    sel.innerHTML = ACG_ITEMS.map(i => `<option value="${i[0]}">${i[0] === 'x' ? '' : i[0] + ' · '}${i[5][li()]}${i[0] === 'x' ? '' : ` — ${t('acg.opt', { per: i[1], u: unitLabel(i[3]).replace(/s$/, ''), max: i[2] })}`}</option>`).join('');
    sel.value = cur;
    const g = document.getElementById('acg-group'); const gv = g.value;
    g.innerHTML = [1, 2, 3, 4].map(n => `<option value="${n}">${t('acg.g' + n)}</option>`).join('');
    g.value = gv || String(ACG_ITEMS.find(i => i[0] === sel.value)[4]);
    acgPreview();
  }
  function acgPreview() {
    const it = ACG_ITEMS.find(i => i[0] === document.getElementById('acg-item').value);
    const q = Math.max(1, +document.getElementById('acg-qty').value || 1);
    document.getElementById('acg-qty-lbl').textContent = `${t('acg.f.qty')} (${unitLabel(it[3])})`;
    const used = acgTotals().used[it[0]] || 0;
    document.getElementById('acg-preview').textContent = it[0] === 'x' ? t('acg.preview.free')
      : t('acg.preview', { h: Math.max(0, Math.min(it[1] * q, it[2] - used)), per: it[1], q, max: it[2], used });
  }
  function renderAcg() {
    const A = acgTotals();
    document.getElementById('acg-groups').innerHTML = [1, 2, 3, 4].map(n => {
      const min = ACG_MIN[n]; const h = A.g[n]; const ok = !min || h >= min;
      return `<div class="pbar"><header><span>${t('acg.g' + n)}</span><span>${h} h ${min && ok ? '✓' : ''}</span></header>
        <div class="track"><i class="mgmt" style="width:${min ? Math.min(100, h / min * 100) : Math.min(100, h / 150 * 100)}%"></i></div>
        <small class="muted">${min ? t('acg.min', { h: min }) : t('acg.nomin')}</small></div>`;
    }).join('');
    const tb = document.getElementById('acg-table');
    tb.innerHTML = `<thead><tr><th>${t('acg.th.act')}</th><th>${t('acg.th.group')}</th><th class="num">${t('acg.th.h')}</th><th></th></tr></thead><tbody>` +
      (A.rows.length ? A.rows.map(({ a, it, h, capped }) => `<tr><td><b>${esc(it[5][li()])}</b>${a.desc ? `<br><span class="muted">${esc(a.desc)}</span>` : ''}<br><small class="muted">${a.qty} ${unitLabel(it[3])}${capped ? ' · ' + t('acg.capped') : ''}</small></td>
        <td>${t('acg.g' + a.group)}</td><td class="num"><b>${h}</b></td><td><button type="button" class="x icon-btn" style="width:30px;height:30px" data-id="${a.id}" aria-label="${esc(t('pl.rm.aria', { x: it[5][li()] }))}">${ICONS.close}</button></td></tr>`).join('')
        : `<tr><td colspan="4" class="muted">${t('acg.empty')}</td></tr>`) +
      `</tbody><tfoot><tr><th colspan="2">${t('common.total')}</th><th class="num">${A.total} / 150 h</th><th></th></tr></tfoot>`;
    tb.querySelectorAll('button[data-id]').forEach(b => b.addEventListener('click', () => { S.acg = S.acg.filter(a => a.id !== b.dataset.id); save(); renderAll(); }));
    acgPreview();
  }

  /* ---------- resumo ---------- */
  function renderSummary() {
    const T = totals(); const A = acgTotals();
    const obMissing = DATA.courses.filter(c => c.type === 'ob' && where(c.code) < 0).length;
    let warns = 0; S.sems.forEach((l, i) => l.forEach(k => { if (missing(k, i).length) warns++; }));
    const [lo, hi] = DATA.meta.semLimits;
    const outLim = S.sems.filter((l, i) => l.length && (semHours(i) < lo || semHours(i) > hi)).length;
    let last = -1; S.sems.forEach((l, i) => { if (l.length) last = i; });
    const nSem = last + 1;
    const groupsOk = [1, 2, 4].every(n => A.g[n] >= ACG_MIN[n]);
    const row = (ok, txt) => `<li style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-bottom:1px solid var(--line)"><span style="flex:none;width:22px;height:22px;border-radius:50%;display:grid;place-items:center;font-size:.8rem;font-weight:800;background:${ok ? 'var(--brand)' : 'var(--danger-soft)'};color:${ok ? 'var(--brand-ink)' : 'var(--danger)'}">${ok ? '✓' : '!'}</span><span>${txt}</span></li>`;
    const byArea = {}; S.sems.forEach(l => l.forEach(k => { byArea[BY[k].area] = (byArea[BY[k].area] || 0) + BY[k].ch; }));
    const maxA = Math.max(1, ...Object.values(byArea));
    document.getElementById('summary').innerHTML = `
      <div class="card"><h3>${t('sum.check')}</h3><ul style="list-style:none;padding:0;margin:0">
        ${row(!obMissing, obMissing ? t('sum.ob', { n: obMissing }) : t('sum.ob.ok'))}
        ${row(T.cc >= 270, t('sum.cccg', { h: T.cc }))}
        ${row(A.total >= 150, t('sum.acg', { h: A.total }))}
        ${row(groupsOk, t('sum.acgg'))}
        ${row(!warns, warns ? t('sum.pre', { n: warns }) : t('sum.pre.ok'))}
        ${row(!outLim, outLim ? t('sum.lim', { n: outLim }) : t('sum.lim.ok'))}
        ${row(nSem <= 20, t('sum.max'))}
      </ul></div>
      <div class="grid" style="gap:20px">
        <div class="card"><h3>${t('sum.grad')}</h3><p style="margin:0">${nSem ? t('sum.grad.p', { n: nSem, y: (nSem / 2).toLocaleString(document.documentElement.lang) }) : t('sum.grad.none')}</p></div>
        <div class="card"><h3>🏅 ${t('sum.laurea')}</h3><p class="muted">${t('sum.laurea.p')}</p><ul style="list-style:none;padding:0;margin:0">
          ${row(nSem && nSem <= 10, t('sum.l.sem'))}${row(A.total >= 180, t('sum.l.acg') + ` (${A.total} h)`)}${row(T.cc >= 300, t('sum.l.cccg') + ` (${T.cc} h)`)}</ul></div>
      </div>
      <div class="card" style="grid-column:1/-1"><h3>${t('sum.areas')}</h3><p class="muted">${t('sum.areas.p')}</p>
        <div class="bars" style="max-width:none">${Object.keys(AREAS).filter(a => byArea[a]).sort((a, b) => byArea[b] - byArea[a]).map(a =>
          `<div data-area="${a}" style="grid-template-columns:minmax(120px,220px) 1fr 56px"><span>${EA.areaName(a)}</span><span class="track"><i style="width:${byArea[a] / maxA * 100}%"></i></span><b>${byArea[a]} h</b></div>`).join('') || `<p class="muted">${t('sum.grad.none')}</p>`}</div></div>`;
  }

  function renderAll() {
    renderProgress(); renderPoolControls(); renderPool(); renderBoard(); renderAcg(); renderSummary();
  }

  /* ---------- ações ---------- */
  function suggest() {
    const hasOb = S.sems.some(l => l.some(k => BY[k].type === 'ob'));
    if (hasOb && !confirm(t('pl.confirm.suggest'))) return;
    S.sems = S.sems.map(l => l.filter(k => BY[k].type !== 'ob'));
    while (S.sems.length < 10) S.sems.push([]);
    DATA.courses.filter(c => c.type === 'ob').forEach(c => S.sems[c.sem - 1].push(c.code));
    save(); renderAll();
  }
  /* leitura do estado para os exportadores (grade-export.js) */
  EA.plan = {
    get state() { return S; }, missing, totals, acgTotals, semHours, semName, ACG_ITEMS, ACG_MIN,
    acgItemName: it => it[5][li()], acgUnit: unitLabel
  };
  function importPlan(file) {
    const r = new FileReader();
    r.onload = () => { try { S = sanitize(JSON.parse(r.result)); save(); renderAll(); toast(t('pl.imported')); } catch (e) { toast(t('pl.badfile')); } };
    r.readAsText(file);
  }
  function setTab(id) {
    ['plan', 'acg', 'sum'].forEach(k => {
      document.getElementById('tab-' + k).setAttribute('aria-selected', String(k === id));
      document.getElementById('panel-' + k).hidden = k !== id;
    });
  }

  document.addEventListener('ea:ready', () => {
    renderAcgForm(); renderAll();
    document.querySelectorAll('.pool-head .seg button').forEach(b => b.addEventListener('click', () => { ui.type = b.dataset.type; renderPoolControls(); renderPool(); }));
    document.getElementById('pool-search').addEventListener('input', e => { ui.q = e.target.value; renderPool(); });
    document.getElementById('pool-area').addEventListener('change', e => { ui.area = e.target.value; renderPool(); });
    document.getElementById('pool-target').addEventListener('change', e => { S.target = +e.target.value; save(); renderAll(); });
    document.getElementById('pool-avail').addEventListener('change', e => { ui.avail = e.target.checked; renderPool(); });
    document.getElementById('btn-suggest').addEventListener('click', suggest);
    document.getElementById('btn-addsem').addEventListener('click', () => {
      if (S.sems.length >= DATA.meta.maxSem) { toast(t('pl.max')); return; }
      S.sems.push([]); S.target = S.sems.length - 1; save(); renderAll();
    });
    document.getElementById('btn-clear').addEventListener('click', () => { if (confirm(t('pl.confirm.clear'))) { S = blank(); save(); renderAll(); } });
    document.getElementById('file-import').addEventListener('change', e => { if (e.target.files[0]) importPlan(e.target.files[0]); e.target.value = ''; });
    document.getElementById('btn-print').addEventListener('click', () => print());
    ['plan', 'acg', 'sum'].forEach(k => document.getElementById('tab-' + k).addEventListener('click', () => setTab(k)));
    document.getElementById('acg-item').addEventListener('change', e => { document.getElementById('acg-group').value = String(ACG_ITEMS.find(i => i[0] === e.target.value)[4]); acgPreview(); });
    document.getElementById('acg-qty').addEventListener('input', acgPreview);
    document.getElementById('acg-form').addEventListener('submit', e => {
      e.preventDefault();
      const qty = Math.max(1, Math.min(9999, Math.round(+document.getElementById('acg-qty').value || 1)));
      S.acg.push({ id: Math.random().toString(36).slice(2), item: document.getElementById('acg-item').value, qty, group: +document.getElementById('acg-group').value, desc: document.getElementById('acg-desc').value.trim().slice(0, 120) });
      document.getElementById('acg-desc').value = ''; document.getElementById('acg-qty').value = 1;
      save(); renderAll();
    });
    if (location.hash === '#acg') setTab('acg');
  });
  document.addEventListener('langchange', () => { renderAcgForm(); renderAll(); if (EA.course.isOpen()) EA.course.open(EA.course.current()); });
})();
