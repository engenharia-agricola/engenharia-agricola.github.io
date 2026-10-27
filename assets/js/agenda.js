/* Minha agenda (seção #agenda de horarios.html): o aluno marca as turmas nos próprios horários
   (horarios.js chama window.EA_AGENDA), vê a semana, os choques de horário e exporta para agendas
   (.ics para Apple, Outlook, Google e outros; links diretos para o Google Agenda). Os dados vêm de
   data/horarios.js (window.EA_HORARIOS) e a escolha fica salva só no navegador (localStorage),
   separada por semestre. */
(function () {
  'use strict';
  const { add, t, L, BY, esc, store, toast } = EA;

  add({
    'ag.eyebrow': ['Sua agenda · {t}', 'Your timetable · {t}', 'Tu agenda · {t}'],
    'ag.saved': [
      'Sua escolha fica salva neste navegador, separada por semestre, e a página funciona mesmo sem internet depois da primeira visita.',
      'Your choices are saved in this browser, one set per semester, and the page works offline after your first visit.',
      'Tu elección queda guardada en este navegador, separada por semestre, y la página funciona sin internet después de la primera visita.'
    ],
    'ag.addall.done': ['{n} turmas adicionadas. Nas aulas de laboratório divididas em A e B, ficou a A: troque se a sua for outra.', '{n} classes added. For labs split into A and B, A was picked: swap it if yours differs.', '{n} cursos agregados. En los laboratorios divididos en A y B quedó la A: cambiala si la tuya es otra.'],
    'ag.addall.none': ['Todas as turmas deste grupo já estão na sua semana.', 'All classes in this group are already in your week.', 'Todos los cursos de este grupo ya están en tu semana.'],
    'ag.mine.h': ['Minha semana', 'My week', 'Mi semana'],
    'ag.sum': ['{n} turmas · {h} por semana', '{n} classes · {h} per week', '{n} cursos · {h} por semana'],
    'ag.sum1': ['1 turma · {h} por semana', '1 class · {h} per week', '1 curso · {h} por semana'],
    'ag.empty.week': [
      'Sua agenda está vazia. Escolha o semestre acima e toque em “+ Agenda” nas disciplinas que vai cursar.',
      'Your timetable is empty. Pick the semester above and tap “+ Agenda” on the courses you will take.',
      'Tu agenda está vacía. Elegí el semestre arriba y tocá “+ Agenda” en las asignaturas que vas a cursar.'
    ],
    'ag.clash.h': ['Choque de horário', 'Time clash', 'Choque de horario'],
    'ag.clash': ['{d} {r}: {a} e {b}', '{d} {r}: {a} and {b}', '{d} {r}: {a} y {b}'],
    'ag.clash.tag': ['choque', 'clash', 'choque'],
    'ag.free': ['Sem aulas', 'No classes', 'Sin clases'],
    'ag.ex.eyebrow': ['Levar para a agenda', 'Send to your calendar', 'Llevar a la agenda'],
    'ag.ex.h': ['Exportar para Google, Apple, Outlook e outros', 'Export to Google, Apple, Outlook and others', 'Exportar a Google, Apple, Outlook y otros'],
    'ag.ex.p': [
      'O arquivo <b>.ics</b> é o formato padrão de agenda: funciona no Google Agenda, no Calendário da Apple (iPhone, iPad e Mac), no Outlook e no Microsoft 365, no Thunderbird, no Samsung Calendar e em quase todos os outros. Cada aula vira um evento semanal que se repete do início ao fim do semestre, com sala, turma e professor.',
      'The <b>.ics</b> file is the standard calendar format: it works with Google Calendar, Apple Calendar (iPhone, iPad and Mac), Outlook and Microsoft 365, Thunderbird, Samsung Calendar and almost every other app. Each class becomes a weekly event repeating from the first to the last day of the semester, with room, class and lecturer.',
      'El archivo <b>.ics</b> es el formato estándar de agenda: funciona en Google Calendar, el Calendario de Apple (iPhone, iPad y Mac), Outlook y Microsoft 365, Thunderbird, Samsung Calendar y casi todos los demás. Cada clase se vuelve un evento semanal que se repite del inicio al fin del semestre, con aula, comisión y profesor.'
    ],
    'ag.ex.start': ['Primeiro dia de aula', 'First day of classes', 'Primer día de clases'],
    'ag.ex.end': ['Último dia de aula', 'Last day of classes', 'Último día de clases'],
    'ag.ex.hol': ['Pular feriados nacionais e do RS', 'Skip national and Rio Grande do Sul holidays', 'Saltear feriados nacionales y de RS'],
    'ag.ex.datehint': [
      'Confira as datas no <a href="https://sites.unipampa.edu.br/prograd/" target="_blank" rel="noopener">calendário acadêmico da Unipampa</a> e ajuste se precisar. As aulas entram a partir do primeiro dia escolhido.',
      'Check the dates in the <a href="https://sites.unipampa.edu.br/prograd/" target="_blank" rel="noopener">Unipampa academic calendar</a> and adjust if needed. Classes are added from the first day chosen.',
      'Revisá las fechas en el <a href="https://sites.unipampa.edu.br/prograd/" target="_blank" rel="noopener">calendario académico de la Unipampa</a> y ajustalas si hace falta. Las clases se cargan desde el primer día elegido.'
    ],
    'ag.ex.ics': ['Baixar arquivo de agenda (.ics)', 'Download calendar file (.ics)', 'Descargar archivo de agenda (.ics)'],
    'ag.ex.share': ['Copiar link da minha semana', 'Copy link to my week', 'Copiar enlace de mi semana'],
    'ag.ex.print': ['Imprimir ou salvar em PDF', 'Print or save as PDF', 'Imprimir o guardar en PDF'],
    'ag.ex.backup': ['Backup (.json)', 'Backup (.json)', 'Copia (.json)'],
    'ag.ex.restore': ['Restaurar backup', 'Restore backup', 'Restaurar copia'],
    'ag.ex.backuphint': [
      'O backup guarda todos os semestres da sua agenda num arquivo. Use para levar para outro navegador ou aparelho, ou para não perder nada se limpar os dados do navegador.',
      'The backup stores every semester of your timetable in one file. Use it to move to another browser or device, or to keep everything safe if you clear browser data.',
      'La copia guarda todos los semestres de tu agenda en un archivo. Usala para pasar a otro navegador o dispositivo, o para no perder nada si borrás los datos del navegador.'
    ],
    'ag.ex.restored': ['Backup restaurado: {n} semestres.', 'Backup restored: {n} semesters.', 'Copia restaurada: {n} semestres.'],
    'ag.ex.badfile': ['Arquivo inválido. Escolha um backup gerado por esta página.', 'Invalid file. Pick a backup made by this page.', 'Archivo inválido. Elegí una copia generada por esta página.'],
    'ag.ex.clear': ['Limpar semestre', 'Clear semester', 'Vaciar semestre'],
    'ag.ex.empty': ['Escolha pelo menos uma turma antes de exportar.', 'Pick at least one class before exporting.', 'Elegí al menos un curso antes de exportar.'],
    'ag.ex.baddates': ['Confira as datas: o último dia precisa ser depois do primeiro.', 'Check the dates: the last day must come after the first.', 'Revisá las fechas: el último día tiene que ser posterior al primero.'],
    'ag.ex.done': ['Arquivo de agenda baixado: {n} eventos semanais.', 'Calendar file downloaded: {n} weekly events.', 'Archivo de agenda descargado: {n} eventos semanales.'],
    'ag.ex.copied': ['Link copiado. Quem abrir verá esta mesma semana.', 'Link copied. Anyone who opens it will see this same week.', 'Enlace copiado. Quien lo abra verá esta misma semana.'],
    'ag.ex.cleared': ['Semestre limpo.', 'Semester cleared.', 'Semestre vaciado.'],
    'ag.ex.confirmclear': ['Remover todas as turmas de {t}?', 'Remove all classes from {t}?', '¿Quitar todos los cursos de {t}?'],
    'ag.shared.confirm': ['Abrir a semana compartilhada no link? Ela substitui a sua escolha atual para {t}.', 'Open the week shared in the link? It replaces your current choice for {t}.', '¿Abrir la semana compartida en el enlace? Reemplaza tu elección actual para {t}.'],
    'ag.shared.done': ['Semana compartilhada carregada.', 'Shared week loaded.', 'Semana compartida cargada.'],
    'ag.cal.name': ['Engenharia Agrícola {t}', 'Agricultural Engineering {t}', 'Ingeniería Agrícola {t}'],
    'ag.ev.turma': ['Turma', 'Class', 'Comisión'],
    'ag.ev.prof': ['Professor(a)', 'Lecturer', 'Profesor/a'],
    'ag.ev.room': ['Sala', 'Room', 'Aula'],
    'ag.ev.src': ['Horário oficial: {u}', 'Official timetable: {u}', 'Horario oficial: {u}'],
    'ag.app.google': ['Google Agenda (Android e computador)', 'Google Calendar (Android and computer)', 'Google Calendar (Android y computadora)'],
    'ag.app.google.body': [
      '<ol><li>Baixe o arquivo <b>.ics</b> acima.</li><li>No computador, abra <a href="https://calendar.google.com/calendar/r/settings/export" target="_blank" rel="noopener">Google Agenda › Configurações › Importar e exportar</a>.</li><li>Escolha o arquivo e a agenda de destino e clique em <b>Importar</b>. Os eventos aparecem também no celular.</li></ol><p class="ag-tip">Dica: crie antes uma agenda só para o semestre (Configurações › Adicionar agenda › Criar nova agenda). Assim fica fácil esconder ou apagar tudo depois.</p><p>Prefere sem arquivo? Use os links abaixo, um por aula (estes não pulam feriados):</p>',
      '<ol><li>Download the <b>.ics</b> file above.</li><li>On a computer, open <a href="https://calendar.google.com/calendar/r/settings/export" target="_blank" rel="noopener">Google Calendar › Settings › Import & export</a>.</li><li>Choose the file and the target calendar and click <b>Import</b>. Events also show up on your phone.</li></ol><p class="ag-tip">Tip: first create a calendar just for the semester (Settings › Add calendar › Create new calendar), so you can hide or delete everything later.</p><p>Prefer no file? Use the links below, one per class (these do not skip holidays):</p>',
      '<ol><li>Descargá el archivo <b>.ics</b> de arriba.</li><li>En la computadora, abrí <a href="https://calendar.google.com/calendar/r/settings/export" target="_blank" rel="noopener">Google Calendar › Configuración › Importar y exportar</a>.</li><li>Elegí el archivo y la agenda de destino y hacé clic en <b>Importar</b>. Los eventos aparecen también en el celular.</li></ol><p class="ag-tip">Consejo: creá antes una agenda solo para el semestre (Configuración › Agregar calendario › Crear calendario nuevo), así podés ocultar o borrar todo después.</p><p>¿Preferís sin archivo? Usá los enlaces de abajo, uno por clase (estos no saltean feriados):</p>'
    ],
    'ag.app.apple': ['Apple: iPhone, iPad e Mac', 'Apple: iPhone, iPad and Mac', 'Apple: iPhone, iPad y Mac'],
    'ag.app.apple.body': [
      '<ol><li><b>iPhone ou iPad:</b> toque em “Baixar arquivo de agenda” no Safari, abra o arquivo baixado e toque em <b>Adicionar Todos</b>. Escolha a agenda de destino.</li><li><b>Mac:</b> dê dois cliques no arquivo .ics (ou arraste para o app Calendário) e confirme a agenda.</li></ol>',
      '<ol><li><b>iPhone or iPad:</b> tap “Download calendar file” in Safari, open the downloaded file and tap <b>Add All</b>. Pick the target calendar.</li><li><b>Mac:</b> double-click the .ics file (or drag it onto the Calendar app) and confirm the calendar.</li></ol>',
      '<ol><li><b>iPhone o iPad:</b> tocá “Descargar archivo de agenda” en Safari, abrí el archivo descargado y tocá <b>Agregar todos</b>. Elegí la agenda de destino.</li><li><b>Mac:</b> hacé doble clic en el archivo .ics (o arrastralo a la app Calendario) y confirmá la agenda.</li></ol>'
    ],
    'ag.app.ms': ['Microsoft: Outlook, Outlook.com e Microsoft 365', 'Microsoft: Outlook, Outlook.com and Microsoft 365', 'Microsoft: Outlook, Outlook.com y Microsoft 365'],
    'ag.app.ms.body': [
      '<ol><li><b>Outlook na web</b> (Outlook.com ou e-mail institucional Microsoft 365): abra o Calendário, clique em <b>Adicionar calendário › Carregar do arquivo</b>, escolha o .ics e a agenda de destino.</li><li><b>Outlook no Windows ou no Mac:</b> dê dois cliques no arquivo .ics ou use <b>Arquivo › Abrir e Exportar › Importar/Exportar</b>.</li><li><b>Celular:</b> depois de importar na web, os eventos aparecem no app do Outlook.</li></ol>',
      '<ol><li><b>Outlook on the web</b> (Outlook.com or a Microsoft 365 work/school account): open Calendar, click <b>Add calendar › Upload from file</b>, choose the .ics and the target calendar.</li><li><b>Outlook on Windows or Mac:</b> double-click the .ics file or use <b>File › Open & Export › Import/Export</b>.</li><li><b>Phone:</b> once imported on the web, events show up in the Outlook app.</li></ol>',
      '<ol><li><b>Outlook en la web</b> (Outlook.com o cuenta Microsoft 365 institucional): abrí el Calendario, hacé clic en <b>Agregar calendario › Cargar desde archivo</b>, elegí el .ics y la agenda de destino.</li><li><b>Outlook en Windows o Mac:</b> hacé doble clic en el archivo .ics o usá <b>Archivo › Abrir y exportar › Importar/Exportar</b>.</li><li><b>Celular:</b> después de importar en la web, los eventos aparecen en la app de Outlook.</li></ol>'
    ],
    'ag.app.other': ['Outros aplicativos', 'Other apps', 'Otras aplicaciones'],
    'ag.app.other.body': [
      '<p>Thunderbird, Samsung Calendar, Proton Calendar, Fastmail, Nextcloud e a maioria dos aplicativos de agenda importam arquivos .ics. Procure por “Importar” no menu do aplicativo ou abra o arquivo baixado.</p>',
      '<p>Thunderbird, Samsung Calendar, Proton Calendar, Fastmail, Nextcloud and most calendar apps import .ics files. Look for “Import” in the app menu or open the downloaded file.</p>',
      '<p>Thunderbird, Samsung Calendar, Proton Calendar, Fastmail, Nextcloud y la mayoría de las apps de agenda importan archivos .ics. Buscá “Importar” en el menú de la app o abrí el archivo descargado.</p>'
    ],
    'ag.notes.priv': [
      'Nada é enviado para servidor nenhum: a escolha fica no seu navegador e o arquivo .ics é gerado no próprio aparelho.',
      'Nothing is sent to any server: your choice stays in your browser and the .ics file is generated on your device.',
      'No se envía nada a ningún servidor: tu elección queda en tu navegador y el archivo .ics se genera en tu dispositivo.'
    ],
    'ag.notes.off': [
      'Planejamento pessoal, sem valor de matrícula. A matrícula é feita no GURI, e salas e horários podem mudar: confira o PDF mais recente antes do início das aulas.',
      'Personal planning only, not an enrolment. Enrolment is done in GURI, and rooms and times may change: check the latest PDF before classes start.',
      'Planificación personal, no es inscripción. La inscripción se hace en GURI, y aulas y horarios pueden cambiar: revisá el PDF más reciente antes del inicio de clases.'
    ],
    'ag.days': ['Segunda|Terça|Quarta|Quinta|Sexta|Sábado', 'Monday|Tuesday|Wednesday|Thursday|Friday|Saturday', 'Lunes|Martes|Miércoles|Jueves|Viernes|Sábado'],
    'ag.days3': ['Seg|Ter|Qua|Qui|Sex|Sáb', 'Mon|Tue|Wed|Thu|Fri|Sat', 'Lun|Mar|Mié|Jue|Vie|Sáb']
  });

  const H = window.EA_HORARIOS;
  const TZ = 'America/Sao_Paulo';
  const KEY = 'ea-agenda-v1';
  const days = () => t('ag.days').split('|');
  const days3 = () => t('ag.days3').split('|');
  const norm = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const mins = hm => { const [h, m] = hm.split(':'); return +h * 60 + +m; };
  const fmtH = m => { const h = Math.floor(m / 60), r = m % 60; return r ? `${h}h${String(r).padStart(2, '0')}` : `${h}h`; };
  const termName = id => id.replace('.', '/');
  const groupKey = g => (g === 'Extra1' ? 'Extra' : g);
  const groupOrder = g => (/^\d\d$/.test(g) ? +g : { CG: 20, Extra: 21, Rec: 22 }[g] || 30);
  /* ---------------- Turmas: disciplina + turma, com todos os horários ---------------- */
  // Linha: [disciplina, código, turma, professor, sala, dia (0 = segunda), início, fim, grupos]
  const TERMS = {};
  H.terms.forEach(term => {
    const map = new Map();
    term.rows.forEach(r => {
      const key = `${r[1] || r[0]}~${r[2]}`;
      let c = map.get(key);
      if (!c) { c = { key, term: term.id, name: r[0], code: r[1], turma: r[2], profs: [], slots: [], groups: new Set() }; map.set(key, c); }
      if (!c.profs.includes(r[3])) c.profs.push(r[3]);
      if (!c.slots.some(s => s.day === r[5] && s.start === r[6])) c.slots.push({ day: r[5], start: r[6], end: r[7], room: r[4], prof: r[3] });
      r[8].split(' ').forEach(g => c.groups.add(groupKey(g)));
    });
    const list = [...map.values()];
    list.forEach(c => {
      c.slots.sort((a, b) => a.day - b.day || a.start.localeCompare(b.start));
      c.g = [...c.groups].sort((a, b) => groupOrder(a) - groupOrder(b));
      c.mins = c.slots.reduce((s, x) => s + mins(x.end) - mins(x.start), 0);
      c.hay = norm([c.name, c.code, c.turma, c.profs.join(' '), c.slots.map(s => s.room).join(' ')].join(' '));
    });
    list.sort((a, b) => groupOrder(a.g[0]) - groupOrder(b.g[0]) || a.name.localeCompare(b.name, 'pt') || a.turma.localeCompare(b.turma));
    TERMS[term.id] = { info: term, list, by: map };
  });
  const cname = c => (c.code && BY[c.code] ? L(BY[c.code].name) : c.name);
  const area = c => (c.code && BY[c.code] ? BY[c.code].area : '');

  /* ---------------- Estado salvo ---------------- */
  let saved;
  try { saved = JSON.parse(store.get(KEY, '{}')) || {}; } catch (e) { saved = {}; }
  saved.terms = saved.terms || {};
  const save = () => { store.set(KEY, JSON.stringify(saved)); EA.persist(); };
  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const parseISO = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };

  function termState(id) {
    if (!saved.terms[id]) {
      // Sugestão de datas: hoje (o semestre atual já começou) até 17 semanas depois.
      // O aluno ajusta pelo calendário acadêmico.
      const start = new Date(); start.setHours(0, 0, 0, 0);
      const end = new Date(start); end.setDate(end.getDate() + 17 * 7 - 2);
      saved.terms[id] = { sel: [], start: iso(start), end: iso(end), hol: true };
    }
    return saved.terms[id];
  }

  // O semestre da agenda acompanha o semestre escolhido nos horários (horarios.js chama setTerm).
  const params = new URLSearchParams(location.search);
  const ui = { term: H.terms[0].id };
  if (params.get('t') && TERMS[params.get('t')]) ui.term = params.get('t');

  // Link compartilhado: horarios.html?t=2026.2&a=AL0296~T40,AL0011~T40;80#agenda
  if (params.has('a') && TERMS[ui.term]) {
    const keys = params.get('a').split(',').filter(k => TERMS[ui.term].by.has(k));
    const st = termState(ui.term);
    const same = keys.length === st.sel.length && keys.every(k => st.sel.includes(k));
    if (keys.length && !same && (!st.sel.length || confirm(t('ag.shared.confirm', { t: termName(ui.term) })))) {
      st.sel = keys; save();
      setTimeout(() => toast(t('ag.shared.done')), 400);
    }
    const url = new URL(location.href); url.searchParams.delete('a');
    history.replaceState(null, '', url);
  }

  const T = () => TERMS[ui.term];
  const S = () => termState(ui.term);
  const chosen = () => S().sel.map(k => T().by.get(k)).filter(Boolean);

  /* ---------------- Elementos ---------------- */
  const $ = id => document.getElementById(id);
  const $week = $('ag-week'), $days = $('ag-days'), $chosen = $('ag-chosen'), $sum = $('ag-sum'), $conf = $('ag-conflicts');
  const $start = $('ag-start'), $end = $('ag-end'), $hol = $('ag-hol');

  /* ---------------- Choques e cores ---------------- */
  function clashes(list) {
    const slots = list.flatMap(c => c.slots.map(s => ({ c, s })));
    const out = [];
    for (let i = 0; i < slots.length; i++) for (let j = i + 1; j < slots.length; j++) {
      const a = slots[i], b = slots[j];
      if (a.c === b.c || a.s.day !== b.s.day) continue;
      if (mins(a.s.start) < mins(b.s.end) && mins(b.s.start) < mins(a.s.end)) out.push([a, b]);
    }
    return out;
  }
  const PALETTE = ['base', 'water', 'mach', 'post', 'geo', 'mgmt', 'build', 'human', 'energy', 'env', 'synth', 'plant'];
  function colorOf(c, i) { return `var(--a-${area(c) || PALETTE[i % PALETTE.length]})`; }

  /* ---------------- Minha semana ---------------- */
  function renderMine() {
    const list = chosen();
    const total = list.reduce((s, c) => s + c.mins, 0);
    $sum.textContent = list.length ? t(list.length === 1 ? 'ag.sum1' : 'ag.sum', { n: list.length, h: fmtH(total) }) : '';
    const cl = clashes(list);
    const bad = new Set(cl.flatMap(([a, b]) => [a.c.key + a.s.day + a.s.start, b.c.key + b.s.day + b.s.start]));
    $conf.innerHTML = cl.length ? `<div class="ag-clash" role="alert"><b>${t('ag.clash.h')}</b><ul>${cl.map(([a, b]) =>
      `<li>${t('ag.clash', { d: days()[a.s.day], r: `${a.s.start}–${a.s.end}`, a: esc(cname(a.c)), b: esc(cname(b.c)) })}</li>`).join('')}</ul></div>` : '';

    if (!list.length) {
      $week.innerHTML = `<p class="ag-empty">${t('ag.empty.week')}</p>`;
      $days.innerHTML = ''; $chosen.innerHTML = '';
      return;
    }
    const color = new Map(list.map((c, i) => [c.key, colorOf(c, i)]));
    const all = list.flatMap(c => c.slots.map(s => ({ c, s })));
    const lo = Math.floor(Math.min(...all.map(x => mins(x.s.start))) / 60) * 60;
    const hi = Math.ceil(Math.max(...all.map(x => mins(x.s.end))) / 60) * 60;
    const nd = all.some(x => x.s.day === 5) ? 6 : 5;
    const span = hi - lo;
    const block = ({ c, s }) => {
      const k = c.key + s.day + s.start;
      return `<div class="ag-block${bad.has(k) ? ' clash' : ''}" style="--c:${color.get(c.key)};top:${(mins(s.start) - lo) / span * 100}%;height:${(mins(s.end) - mins(s.start)) / span * 100}%">
        <b>${esc(cname(c))}</b><span>${s.start}–${s.end}</span><span>${esc(s.room)}</span>${bad.has(k) ? `<em>${t('ag.clash.tag')}</em>` : ''}</div>`;
    };
    let hours = '';
    for (let m = lo; m < hi; m += 60) hours += `<span style="top:${(m - lo) / span * 100}%">${String(m / 60).padStart(2, '0')}:00</span>`;
    let cols = '';
    for (let d = 0; d < nd; d++) {
      // Aulas sobrepostas no mesmo dia dividem a largura da coluna.
      const items = all.filter(x => x.s.day === d).sort((a, b) => a.s.start.localeCompare(b.s.start));
      const lanes = [];
      items.forEach(x => {
        let i = lanes.findIndex(l => mins(l) <= mins(x.s.start));
        if (i < 0) { i = lanes.length; lanes.push(x.s.end); } else lanes[i] = x.s.end;
        x.lane = i;
      });
      const n = Math.max(1, lanes.length);
      cols += `<div class="ag-col"><h3>${days3()[d]}</h3><div class="ag-col-body">${items.map(x =>
        block(x).replace('style="', `style="left:${x.lane / n * 100}%;width:${100 / n}%;`)).join('')}</div></div>`;
    }
    $week.innerHTML = `<div class="ag-grid" style="--days:${nd};--hours:${span / 60}"><div class="ag-hours">${hours}</div>${cols}</div>`;

    // Lista por dia (telas estreitas)
    let dl = '';
    for (let d = 0; d < nd; d++) {
      const items = all.filter(x => x.s.day === d).sort((a, b) => a.s.start.localeCompare(b.s.start));
      dl += `<div class="ag-day"><h3>${days()[d]}</h3>${items.length ? items.map(x => {
        const k = x.c.key + x.s.day + x.s.start;
        return `<div class="ag-dayitem${bad.has(k) ? ' clash' : ''}" style="--c:${color.get(x.c.key)}"><span class="ag-nowrap">${x.s.start}–${x.s.end}</span><b>${esc(cname(x.c))}</b><span>${esc(x.s.room)}</span></div>`;
      }).join('') : `<p class="ag-free">${t('ag.free')}</p>`}</div>`;
    }
    $days.innerHTML = dl;

    $chosen.innerHTML = list.map(c => `<li style="--c:${color.get(c.key)}">
      <span class="dot"></span>
      <span><b>${esc(cname(c))}</b> <span class="ag-code">${esc(c.code)} · ${esc(c.turma)}</span><br><small>${c.profs.map(esc).join(', ')}</small></span>
      <button type="button" class="ag-x no-print" data-key="${esc(c.key)}" aria-label="${t('ag.remove')}: ${esc(cname(c))}" title="${t('ag.remove')}">${EA.ICONS.close}</button>
    </li>`).join('');
  }

  /* ---------------- Exportação ---------------- */
  function easter(y) {
    const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4;
    const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31), day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(y, month - 1, day);
  }
  // Feriados nacionais (Lei 662/1949, 6.802/1980, 14.759/2023) e do RS (20 de setembro).
  function holidays(y) {
    const fixed = ['01-01', '04-21', '05-01', '09-07', '09-20', '10-12', '11-02', '11-15', '11-20', '12-25'].map(md => `${y}-${md}`);
    const gf = easter(y); gf.setDate(gf.getDate() - 2);
    return new Set(fixed.concat(iso(gf)));
  }

  const pad = n => String(n).padStart(2, '0');
  const ymd = d => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
  const hms = hm => hm.replace(':', '') + '00';
  const icsEsc = s => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
  // Linhas de no máximo 75 octetos (RFC 5545), sem partir caracteres UTF-8.
  function fold(line) {
    const enc = new TextEncoder(); const out = []; let cur = '', n = 0;
    for (const ch of line) {
      const b = enc.encode(ch).length;
      if (n + b > (out.length ? 74 : 75)) { out.push(cur); cur = ''; n = 0; }
      cur += ch; n += b;
    }
    out.push(cur);
    return out.join('\r\n ');
  }
  // Fim do último dia (23:59:59 em Brasília, UTC-3) em UTC, como pede o UNTIL.
  const untilUTC = endISO => { const d = parseISO(endISO); d.setDate(d.getDate() + 1); return `${ymd(d)}T025959Z`; };
  function firstDate(startISO, day) {
    const d = parseISO(startISO); const js = (day + 1) % 7;
    d.setDate(d.getDate() + ((js - d.getDay() + 7) % 7));
    return d;
  }
  function occurrences(first, endISO) {
    const out = []; const end = parseISO(endISO);
    for (const d = new Date(first); d <= end; d.setDate(d.getDate() + 7)) out.push(new Date(d));
    return out;
  }

  function validDates() {
    const st = S();
    if (!st.start || !st.end || parseISO(st.end) < parseISO(st.start)) { toast(t('ag.ex.baddates')); return false; }
    return true;
  }

  function description(c, s) {
    return [`${t('ag.ev.turma')}: ${c.turma}${c.code ? ` (${c.code})` : ''}`, `${t('ag.ev.prof')}: ${s.prof}`, `${t('ag.ev.room')}: ${s.room}`,
      t('ag.ev.src', { u: T().info.pdf })].join('\n');
  }

  function buildICS() {
    const st = S(); const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
    const L2 = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Engenharia Agricola Unipampa//Horarios//PT', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
      `X-WR-CALNAME:${icsEsc(t('ag.cal.name', { t: termName(ui.term) }))}`, `X-WR-TIMEZONE:${TZ}`,
      // O Brasil não tem horário de verão desde 2019: um único bloco STANDARD em UTC-3.
      'BEGIN:VTIMEZONE', `TZID:${TZ}`, 'BEGIN:STANDARD', 'DTSTART:19700101T000000', 'TZOFFSETFROM:-0300', 'TZOFFSETTO:-0300', 'TZNAME:-03', 'END:STANDARD', 'END:VTIMEZONE'];
    let n = 0;
    chosen().forEach(c => c.slots.forEach(s => {
      const first = firstDate(st.start, s.day);
      const occ = occurrences(first, st.end);
      if (!occ.length) return;
      const hol = new Set(); if (st.hol) [first.getFullYear(), parseISO(st.end).getFullYear()].forEach(y => holidays(y).forEach(h => hol.add(h)));
      const ex = occ.filter(d => hol.has(iso(d)));
      if (ex.length === occ.length) return;
      n++;
      L2.push('BEGIN:VEVENT',
        `UID:${ui.term}-${(c.code || norm(c.name).replace(/\W+/g, '')).toLowerCase()}-${norm(c.turma).replace(/\W+/g, '')}-${s.day}-${s.start.replace(':', '')}@engenharia-agricola.github.io`,
        `DTSTAMP:${stamp}`,
        `DTSTART;TZID=${TZ}:${ymd(first)}T${hms(s.start)}`,
        `DTEND;TZID=${TZ}:${ymd(first)}T${hms(s.end)}`,
        `RRULE:FREQ=WEEKLY;UNTIL=${untilUTC(st.end)}`);
      if (ex.length) L2.push(`EXDATE;TZID=${TZ}:${ex.map(d => `${ymd(d)}T${hms(s.start)}`).join(',')}`);
      L2.push(`SUMMARY:${icsEsc(cname(c))}`, `LOCATION:${icsEsc(s.room)}`, `DESCRIPTION:${icsEsc(description(c, s))}`,
        'CATEGORIES:Unipampa', 'TRANSP:OPAQUE', 'END:VEVENT');
    }));
    L2.push('END:VCALENDAR');
    return { text: L2.map(fold).join('\r\n') + '\r\n', n };
  }

  function downloadICS() {
    if (!chosen().length) { toast(t('ag.ex.empty')); return; }
    if (!validDates()) return;
    const { text, n } = buildICS();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type: 'text/calendar;charset=utf-8' }));
    a.download = `horarios-engenharia-agricola-${ui.term.replace('.', '-')}.ics`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    toast(t('ag.ex.done', { n }));
  }

  function googleLinks() {
    const $g = $('ag-glinks'); const st = S(); const list = chosen();
    if (!list.length || !st.start || !st.end || parseISO(st.end) < parseISO(st.start)) { $g.innerHTML = ''; return; }
    $g.innerHTML = `<ul>${list.flatMap(c => c.slots.map(s => {
      const first = firstDate(st.start, s.day);
      if (first > parseISO(st.end)) return '';
      const u = new URL('https://calendar.google.com/calendar/render');
      u.searchParams.set('action', 'TEMPLATE');
      u.searchParams.set('text', cname(c));
      u.searchParams.set('dates', `${ymd(first)}T${hms(s.start)}/${ymd(first)}T${hms(s.end)}`);
      u.searchParams.set('ctz', TZ);
      u.searchParams.set('recur', `RRULE:FREQ=WEEKLY;UNTIL=${untilUTC(st.end)}`);
      u.searchParams.set('location', s.room);
      u.searchParams.set('details', description(c, s));
      return `<li><a href="${esc(u.href)}" target="_blank" rel="noopener">${esc(cname(c))} · ${days3()[s.day]} ${s.start}–${s.end}</a></li>`;
    })).join('')}</ul>`;
  }

  async function share() {
    if (!chosen().length) { toast(t('ag.ex.empty')); return; }
    const url = new URL(location.href);
    url.search = ''; url.hash = 'agenda';
    url.searchParams.set('t', ui.term);
    url.searchParams.set('a', S().sel.join(','));
    try { await navigator.clipboard.writeText(url.href); toast(t('ag.ex.copied')); }
    catch (e) { prompt(t('ag.ex.share'), url.href); }
  }

  /* ---------------- Backup ---------------- */
  function backup() {
    const data = { app: 'ea-unipampa-agenda', v: 1, current: ui.term, terms: saved.terms };
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
    a.download = `agenda-engenharia-agricola-${iso(new Date())}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  }
  function restore(file) {
    const r = new FileReader();
    r.onload = () => {
      try {
        const d = JSON.parse(r.result);
        if (d.app !== 'ea-unipampa-agenda' || !d.terms || typeof d.terms !== 'object') throw new Error('formato');
        const terms = {};
        Object.entries(d.terms).forEach(([id, st]) => {
          if (!TERMS[id] || !st || !Array.isArray(st.sel)) return;
          const date = v => (/^\d{4}-\d{2}-\d{2}$/.test(v) ? v : '');
          terms[id] = { sel: st.sel.filter(k => TERMS[id].by.has(k)), start: date(st.start), end: date(st.end), hol: st.hol !== false };
        });
        if (!Object.keys(terms).length) throw new Error('vazio');
        saved.terms = terms;
        save(); renderAll(); changed();
        toast(t('ag.ex.restored', { n: Object.keys(terms).length }));
      } catch (e) { toast(t('ag.ex.badfile')); }
    };
    r.readAsText(file);
  }

  /* ---------------- Renderização, eventos e API para horarios.js ---------------- */
  function renderTerm() {
    $('ag-eyebrow').textContent = t('ag.eyebrow', { t: termName(ui.term) });
    const st = S();
    $start.value = st.start; $end.value = st.end; $hol.checked = st.hol;
  }
  function renderAll() { renderTerm(); renderMine(); googleLinks(); }
  // Avisa horarios.js para atualizar os botões “+ Agenda”.
  const changed = () => document.dispatchEvent(new CustomEvent('agendachange'));
  function update() { save(); renderMine(); googleLinks(); changed(); }

  function toggle(key, on) {
    const st = S(); const i = st.sel.indexOf(key);
    if (on === undefined) on = i < 0;
    if (on && i < 0) st.sel.push(key);
    if (!on && i >= 0) st.sel.splice(i, 1);
    update();
  }

  window.EA_AGENDA = {
    key: (code, name, turma) => `${code || name}~${turma}`,
    term: () => ui.term,
    setTerm(id) { if (TERMS[id] && id !== ui.term) { ui.term = id; renderAll(); } },
    has: key => S().sel.includes(key),
    count: () => chosen().length,
    toggle,
    // Todas as turmas de um semestre do curso. Laboratórios divididos em subturmas
    // (T40;80A, T40;80B): entra só a primeira.
    addGroup(g) {
      const st = S();
      const pick = T().list.filter(c => c.g.includes(g) && !(/\d[B-Z]$/.test(c.turma) && T().by.has(`${c.code || c.name}~${c.turma.slice(0, -1)}A`)));
      const fresh = pick.filter(c => !st.sel.includes(c.key));
      fresh.forEach(c => st.sel.push(c.key));
      if (fresh.length) update();
      return fresh.length;
    }
  };

  $chosen.addEventListener('click', e => { const b = e.target.closest('button[data-key]'); if (b) toggle(b.dataset.key, false); });
  [[$start, 'start'], [$end, 'end']].forEach(([el, k]) => el.addEventListener('change', () => { S()[k] = el.value; save(); googleLinks(); }));
  $hol.addEventListener('change', () => { S().hol = $hol.checked; save(); });
  $('ag-ics').addEventListener('click', downloadICS);
  $('ag-share').addEventListener('click', share);
  $('ag-print').addEventListener('click', () => print());
  $('ag-backup').addEventListener('click', backup);
  $('ag-restore').addEventListener('click', () => $('ag-file').click());
  $('ag-file').addEventListener('change', e => { if (e.target.files[0]) restore(e.target.files[0]); e.target.value = ''; });
  $('ag-clear').addEventListener('click', () => {
    if (!S().sel.length || !confirm(t('ag.ex.confirmclear', { t: termName(ui.term) }))) return;
    S().sel = []; update(); toast(t('ag.ex.cleared'));
  });
  document.addEventListener('langchange', renderAll);

  renderAll();
})();
