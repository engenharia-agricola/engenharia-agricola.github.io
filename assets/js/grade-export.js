/* Exportação da grade: PDF, PNG, XLSX, CSV e JSON. */
(function () {
  'use strict';
  const { add, t, L, BY, DATA, AREAS, toast } = EA;

  add({
    'ex.pdf': ['Documento para imprimir ou enviar', 'Document to print or share', 'Documento para imprimir o enviar'],
    'ex.png': ['Imagem da grade', 'Image of your plan', 'Imagen del plan'],
    'ex.xlsx': ['Planilha (Excel, LibreOffice, Google Planilhas)', 'Spreadsheet (Excel, LibreOffice, Google Sheets)', 'Planilla (Excel, LibreOffice, Hojas de cálculo de Google)'],
    'ex.csv': ['Tabela simples', 'Plain table', 'Tabla simple'],
    'ex.json': ['Backup para importar depois', 'Backup to import later', 'Copia de seguridad para importar después'],
    'ex.busy': ['Gerando {f}…', 'Generating {f}…', 'Generando {f}…'],
    'ex.done': ['{f} pronto!', '{f} ready!', '¡{f} listo!'],
    'ex.fail': ['Não foi possível gerar o arquivo. Verifique sua conexão e tente de novo.', 'Could not generate the file. Check your connection and try again.', 'No se pudo generar el archivo. Revisá tu conexión e intentá de nuevo.'],
    'ex.empty': ['Sua grade está vazia. Adicione disciplinas primeiro.', 'Your plan is empty. Add courses first.', 'Tu plan está vacío. Agregá asignaturas primero.'],
    'ex.file': ['minha-grade-engenharia-agricola', 'my-agricultural-engineering-plan', 'mi-plan-ingenieria-agricola'],
    'ex.title': ['Minha grade · Engenharia Agrícola', 'My plan · Agricultural Engineering', 'Mi plan · Ingeniería Agrícola'],
    'ex.sub': ['Unipampa – Campus Alegrete · PPC 2014 (atualização 2024) · gerado em {d}', 'Unipampa – Alegrete Campus · PPC 2014 (2024 update) · generated on {d}', 'Unipampa – Campus Alegrete · PPC 2014 (actualización 2024) · generado el {d}'],
    'ex.sum': ['Obrigatórias {ob} / 3.565 h · CCCGs {cc} / 270 h · ACGs {acg} / 150 h · {n} semestres', 'Required {ob} / 3,565 h · Electives {cc} / 270 h · Activities {acg} / 150 h · {n} semesters', 'Obligatorias {ob} / 3.565 h · CCCG {cc} / 270 h · ACG {acg} / 150 h · {n} semestres'],
    'ex.page': ['página {i} de {n}', 'page {i} of {n}', 'página {i} de {n}'],
    'ex.disclaimer': ['Planejamento pessoal, sem valor oficial. Confira a oferta e as regras com a Coordenação do Curso.', 'Personal plan with no official value. Check the offer and rules with the Program Coordination.', 'Planificación personal, sin valor oficial. Confirmá la oferta y las reglas con la Coordinación de la Carrera.'],
    'ex.done.mark': ['✓ concluída', '✓ passed', '✓ aprobada'],
    'ex.acgpage': ['Atividades complementares (ACG)', 'Complementary activities (ACG)', 'Actividades complementarias (ACG)'],
    'ex.c.sem': ['Semestre', 'Semester', 'Semestre'],
    'ex.c.code': ['Código', 'Code', 'Código'],
    'ex.c.name': ['Disciplina', 'Course', 'Asignatura'],
    'ex.c.type': ['Tipo', 'Type', 'Tipo'],
    'ex.c.area': ['Área', 'Area', 'Área'],
    'ex.c.ch': ['Carga horária (h)', 'Hours', 'Carga horaria (h)'],
    'ex.c.t': ['Teórica (h)', 'Theory (h)', 'Teórica (h)'],
    'ex.c.p': ['Prática (h)', 'Practice (h)', 'Práctica (h)'],
    'ex.c.done': ['Concluída', 'Passed', 'Aprobada'],
    'ex.c.warn': ['Pré-requisito pendente', 'Missing prerequisite', 'Correlativa pendiente'],
    'ex.c.act': ['Atividade', 'Activity', 'Actividad'],
    'ex.c.desc': ['Descrição', 'Description', 'Descripción'],
    'ex.c.qty': ['Quantidade', 'Quantity', 'Cantidad'],
    'ex.c.unit': ['Unidade', 'Unit', 'Unidad'],
    'ex.c.group': ['Grupo', 'Group', 'Grupo'],
    'ex.c.hours': ['Horas computadas', 'Hours counted', 'Horas computadas'],
    'ex.c.item': ['Item', 'Item', 'Ítem'],
    'ex.c.value': ['Valor (h)', 'Value (h)', 'Valor (h)'],
    'ex.c.req': ['Mínimo (h)', 'Minimum (h)', 'Mínimo (h)'],
    'ex.yes': ['Sim', 'Yes', 'Sí'],
    'ex.no': ['Não', 'No', 'No'],
    'ex.sheet.plan': ['Grade', 'Plan', 'Plan'],
    'ex.sheet.acg': ['ACGs', 'Activities', 'ACG'],
    'ex.sheet.sum': ['Resumo', 'Summary', 'Resumen']
  });

  const lang = () => document.documentElement.lang;
  const P = () => EA.plan;
  const num = n => n.toLocaleString(lang());

  /* ---------------- dados tabulares ---------------- */
  function lastSem() { let last = -1; P().state.sems.forEach((l, i) => { if (l.length) last = i; }); return last; }

  function planRows() {
    const S = P().state; const rows = [];
    S.sems.forEach((list, i) => list.forEach(k => {
      const c = BY[k]; const miss = P().missing(k, i);
      rows.push({ sem: i + 1, code: c.code, name: L(c.name), type: c.type === 'ob' ? t('common.ob') : 'CCCG', area: EA.areaName(c.area),
        ch: c.ch, t: c.t ?? '', p: c.p ?? '', done: S.done[k] ? t('ex.yes') : t('ex.no'), warn: miss.join(', ') });
    }));
    return rows;
  }
  const PLAN_COLS = [['sem', 'ex.c.sem'], ['code', 'ex.c.code'], ['name', 'ex.c.name'], ['type', 'ex.c.type'], ['area', 'ex.c.area'],
    ['ch', 'ex.c.ch'], ['t', 'ex.c.t'], ['p', 'ex.c.p'], ['done', 'ex.c.done'], ['warn', 'ex.c.warn']];

  function acgRows() {
    return P().acgTotals().rows.map(({ a, it, h }) => ({ act: P().acgItemName(it), desc: a.desc, qty: a.qty, unit: P().acgUnit(it[3]), group: t('acg.g' + a.group), hours: h }));
  }
  const ACG_COLS = [['act', 'ex.c.act'], ['desc', 'ex.c.desc'], ['qty', 'ex.c.qty'], ['unit', 'ex.c.unit'], ['group', 'ex.c.group'], ['hours', 'ex.c.hours']];

  function summaryRows() {
    const T = P().totals(); const A = P().acgTotals(); const M = DATA.meta.totals;
    return [
      [t('pl.p.ob'), T.ob, M.ob + M.tcc + M.estagio], [t('pl.p.cccg'), T.cc, M.cccg], [t('pl.p.acg'), A.total, M.acg],
      ...[1, 2, 3, 4].map(g => [t('acg.g' + g), A.g[g], P().ACG_MIN[g] || '']),
      [t('pl.p.total'), Math.min(T.ob, M.ob + M.tcc + M.estagio) + Math.min(T.cc, M.cccg) + Math.min(A.total, M.acg), M.total]
    ];
  }

  /* ---------------- utilitários ---------------- */
  function save(blob, ext) {
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `${t('ex.file')}.${ext}`;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }
  const loaded = {};
  function loadScript(src, globalName) {
    if (window[globalName]) return Promise.resolve(window[globalName]);
    if (!loaded[src]) loaded[src] = new Promise((res, rej) => {
      const s = document.createElement('script'); s.src = src; s.async = true;
      s.onload = () => window[globalName] ? res(window[globalName]) : rej(new Error(globalName));
      s.onerror = () => { delete loaded[src]; s.remove(); rej(new Error(src)); };
      document.head.appendChild(s);
    });
    return loaded[src];
  }

  /* ---------------- JSON / CSV / XLSX ---------------- */
  function toJSON() {
    save(new Blob([JSON.stringify({ app: 'ea-unipampa-grade', v: 1, ...P().state }, null, 2)], { type: 'application/json' }), 'json');
  }

  function toCSV() {
    // Excel em PT/ES espera ";" como separador; em EN, ","
    const sep = EA.lang === 'en' ? ',' : ';';
    const cell = v => { const s = String(v ?? ''); return /[",;\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
    const lines = [PLAN_COLS.map(c => cell(t(c[1]))).join(sep)].concat(planRows().map(r => PLAN_COLS.map(c => cell(r[c[0]])).join(sep)));
    save(new Blob(['﻿' + lines.join('\r\n') + '\r\n'], { type: 'text/csv;charset=utf-8' }), 'csv');
  }

  async function toXLSX() {
    const X = await loadScript('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js', 'XLSX');
    const sheet = (cols, rows, widths) => {
      const ws = X.utils.aoa_to_sheet([cols.map(c => t(c[1]))].concat(rows.map(r => cols.map(c => r[c[0]]))));
      ws['!cols'] = widths.map(w => ({ wch: w }));
      ws['!autofilter'] = { ref: X.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: rows.length, c: cols.length - 1 } }) };
      return ws;
    };
    const wb = X.utils.book_new();
    X.utils.book_append_sheet(wb, sheet(PLAN_COLS, planRows(), [10, 10, 48, 14, 26, 16, 12, 12, 11, 40]), t('ex.sheet.plan'));
    X.utils.book_append_sheet(wb, sheet(ACG_COLS, acgRows(), [44, 36, 11, 16, 34, 16]), t('ex.sheet.acg'));
    const sum = X.utils.aoa_to_sheet([[t('ex.c.item'), t('ex.c.value'), t('ex.c.req')]].concat(summaryRows()));
    sum['!cols'] = [{ wch: 40 }, { wch: 12 }, { wch: 12 }];
    X.utils.book_append_sheet(wb, sum, t('ex.sheet.sum'));
    wb.Props = { Title: t('ex.title'), Author: 'Engenharia Agrícola · Unipampa' };
    const out = X.write(wb, { bookType: 'xlsx', type: 'array' });
    save(new Blob([out], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), 'xlsx');
  }

  /* ---------------- desenho em canvas (PNG e PDF) ---------------- */
  const C = { bg: '#ffffff', ink: '#17251c', muted: '#5d6b62', line: '#ddd8c6', head: '#17251c', soft: '#faf8f1', done: '#e3f0df', ok: '#2e7d32', warn: '#c0392b', gold: '#d99a0b' };
  const FONT = '"Plus Jakarta Sans", system-ui, -apple-system, "Segoe UI", sans-serif';
  const DISPLAY = '"Fraunces", Georgia, serif';
  const W = 1600, PAD = 40, GAP = 16, COLS = 5, SCALE = 2;
  const COLW = (W - 2 * PAD - (COLS - 1) * GAP) / COLS;

  const areaColor = a => getComputedStyle(document.documentElement).getPropertyValue('--a-' + a).trim() || C.muted;

  function wrap(ctx, text, maxW, maxLines) {
    const words = String(text).split(/\s+/); const lines = []; let cur = '';
    for (const w of words) {
      const test = cur ? cur + ' ' + w : w;
      if (ctx.measureText(test).width <= maxW || !cur) cur = test; else { lines.push(cur); cur = w; }
    }
    if (cur) lines.push(cur);
    if (lines.length > maxLines) {
      const keep = lines.slice(0, maxLines); let last = keep[maxLines - 1];
      while (ctx.measureText(last + '…').width > maxW && last.length) last = last.slice(0, -1);
      keep[maxLines - 1] = last + '…'; return keep;
    }
    return lines;
  }

  function roundRect(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }

  const NAME_LH = 19, TEXT_W = COLW - 34;
  function cardLayout(ctx, k, i) {
    ctx.font = `700 15px ${FONT}`;
    const lines = wrap(ctx, L(BY[k].name), TEXT_W, 3);
    const miss = P().missing(k, i);
    ctx.font = `700 11px ${FONT}`;
    const warn = miss.length ? wrap(ctx, '⚠ ' + t('pl.missing', { x: miss.join(', ') }), TEXT_W, 2) : [];
    return { k, lines, warn, h: 14 + lines.length * NAME_LH + 20 + warn.length * 15 + 10 };
  }

  function drawHeader(ctx, y, pageInfo) {
    const T = P().totals(); const A = P().acgTotals();
    ctx.fillStyle = C.ok; ctx.fillRect(0, 0, W, 8);
    ctx.fillStyle = C.ink; ctx.font = `600 34px ${DISPLAY}`; ctx.textBaseline = 'alphabetic';
    ctx.fillText(t('ex.title'), PAD, y + 34);
    ctx.font = `500 14px ${FONT}`; ctx.fillStyle = C.muted;
    ctx.fillText(t('ex.sub', { d: new Date().toLocaleDateString(lang()) }), PAD, y + 60);
    ctx.font = `700 15px ${FONT}`; ctx.fillStyle = C.ink;
    ctx.fillText(t('ex.sum', { ob: num(T.ob), cc: num(T.cc), acg: num(A.total), n: lastSem() + 1 }), PAD, y + 86);
    if (pageInfo) { ctx.font = `600 13px ${FONT}`; ctx.fillStyle = C.muted; ctx.textAlign = 'right'; ctx.fillText(pageInfo, W - PAD, y + 34); ctx.textAlign = 'left'; }
    return y + 110;
  }

  function drawLegend(ctx, y, codes) {
    const areas = [...new Set(codes.map(k => BY[k].area))].filter(a => AREAS[a]);
    ctx.font = `600 13px ${FONT}`; let x = PAD;
    areas.forEach(a => {
      const label = EA.areaName(a); const w = 22 + ctx.measureText(label).width + 22;
      if (x + w > W - PAD) { x = PAD; y += 24; }
      ctx.fillStyle = areaColor(a); ctx.beginPath(); ctx.arc(x + 6, y - 4, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = C.ink; ctx.fillText(label, x + 18, y); x += w;
    });
    y += 28;
    ctx.font = `500 12px ${FONT}`; ctx.fillStyle = C.muted; ctx.fillText(t('ex.disclaimer'), PAD, y);
    return y + 24;
  }

  /** Desenha os semestres indicados (em linhas de 5) e devolve um canvas. */
  function renderPlan(semIdxs, pageInfo) {
    const S = P().state;
    const meas = document.createElement('canvas').getContext('2d');
    const rows = [];
    for (let r = 0; r < semIdxs.length; r += COLS) {
      const cols = semIdxs.slice(r, r + COLS).map(i => {
        const cards = S.sems[i].map(k => cardLayout(meas, k, i));
        return { i, cards, h: 44 + (cards.length ? cards.reduce((a, c) => a + c.h + 8, 0) : 56) + 8 };
      });
      rows.push({ cols, h: Math.max(...cols.map(c => c.h)) });
    }
    const codes = semIdxs.flatMap(i => S.sems[i]);
    meas.font = `600 13px ${FONT}`;
    const H = 110 + 16 + rows.reduce((a, r) => a + r.h + GAP, 0) + 90;

    const cv = document.createElement('canvas'); cv.width = W * SCALE; cv.height = H * SCALE;
    const ctx = cv.getContext('2d'); ctx.scale(SCALE, SCALE);
    ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);
    let y = drawHeader(ctx, 20, pageInfo) + 8;
    const [lo, hi] = DATA.meta.semLimits;

    rows.forEach(row => {
      row.cols.forEach((col, ci) => {
        const x = PAD + ci * (COLW + GAP);
        ctx.fillStyle = C.soft; roundRect(ctx, x, y, COLW, row.h, 14); ctx.fill();
        ctx.strokeStyle = C.line; ctx.lineWidth = 1; ctx.stroke();
        ctx.fillStyle = C.head; roundRect(ctx, x, y, COLW, 38, 12); ctx.fill();
        const h = P().semHours(col.i);
        ctx.fillStyle = '#fff'; ctx.font = `800 16px ${FONT}`; ctx.fillText(P().semName(col.i), x + 14, y + 25);
        ctx.textAlign = 'right'; ctx.font = `700 13px ${FONT}`;
        ctx.fillStyle = !S.sems[col.i].length ? '#c9d4cc' : h > hi || h < lo ? '#ffb4a8' : '#b9e3b5';
        ctx.fillText(`${h} h`, x + COLW - 14, y + 25); ctx.textAlign = 'left';
        let cy = y + 46;
        if (!col.cards.length) {
          ctx.setLineDash([5, 5]); ctx.strokeStyle = C.line; roundRect(ctx, x + 8, cy, COLW - 16, 48, 10); ctx.stroke(); ctx.setLineDash([]);
          ctx.fillStyle = C.muted; ctx.font = `500 14px ${FONT}`; ctx.textAlign = 'center'; ctx.fillText('—', x + COLW / 2, cy + 29); ctx.textAlign = 'left';
        }
        col.cards.forEach(card => {
          const c = BY[card.k]; const done = !!S.done[card.k]; const cx = x + 8, cw = COLW - 16;
          ctx.fillStyle = done ? C.done : '#fff'; roundRect(ctx, cx, cy, cw, card.h, 10); ctx.fill();
          ctx.strokeStyle = card.warn.length ? C.warn : C.line; ctx.lineWidth = card.warn.length ? 1.6 : 1; ctx.stroke();
          ctx.fillStyle = areaColor(c.area); roundRect(ctx, cx, cy + 6, 5, card.h - 12, 2); ctx.fill();
          let ty = cy + 14 + 14;
          ctx.fillStyle = C.ink; ctx.font = `700 15px ${FONT}`;
          card.lines.forEach(l => { ctx.fillText(l, cx + 16, ty); ty += NAME_LH; });
          ctx.fillStyle = C.muted; ctx.font = `600 12px ${FONT}`;
          ctx.fillText(`${c.ch} h · ${c.type === 'cccg' ? 'CCCG · ' : ''}${c.code}`, cx + 16, ty + 2);
          if (done) { ctx.fillStyle = C.ok; ctx.textAlign = 'right'; ctx.font = `800 12px ${FONT}`; ctx.fillText(t('ex.done.mark'), cx + cw - 10, ty + 2); ctx.textAlign = 'left'; }
          ty += 18;
          ctx.fillStyle = C.warn; ctx.font = `700 11px ${FONT}`;
          card.warn.forEach(l => { ctx.fillText(l, cx + 16, ty); ty += 15; });
          cy += card.h + 8;
        });
      });
      y += row.h + GAP;
    });
    drawLegend(ctx, y + 18, codes);
    return cv;
  }

  /** Página com o resumo de horas e a tabela de ACGs. */
  function renderAcgPage(pageInfo) {
    const rows = acgRows(); const sum = summaryRows();
    const H = 110 + 60 + sum.length * 30 + 70 + Math.max(1, rows.length) * 30 + 80;
    const cv = document.createElement('canvas'); cv.width = W * SCALE; cv.height = H * SCALE;
    const ctx = cv.getContext('2d'); ctx.scale(SCALE, SCALE);
    ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);
    let y = drawHeader(ctx, 20, pageInfo) + 20;
    ctx.fillStyle = C.ink; ctx.font = `600 24px ${DISPLAY}`; ctx.fillText(t('ex.sheet.sum'), PAD, y); y += 22;
    sum.forEach(([label, v, max]) => {
      y += 30; ctx.font = `600 14px ${FONT}`; ctx.fillStyle = C.ink; ctx.fillText(label, PAD, y);
      const bx = PAD + 420, bw = 700;
      ctx.fillStyle = '#eeeadb'; roundRect(ctx, bx, y - 11, bw, 12, 6); ctx.fill();
      if (max) { ctx.fillStyle = v >= max ? C.ok : C.gold; roundRect(ctx, bx, y - 11, Math.max(6, Math.min(1, v / max) * bw), 12, 6); ctx.fill(); }
      ctx.fillStyle = C.ink; ctx.font = `700 14px ${FONT}`; ctx.fillText(max ? `${num(v)} / ${num(max)} h` : `${num(v)} h`, bx + bw + 20, y);
    });
    y += 60;
    ctx.font = `600 24px ${DISPLAY}`; ctx.fillText(t('ex.acgpage'), PAD, y); y += 34;
    const xs = [PAD, PAD + 560, PAD + 1060, PAD + 1420];
    ctx.font = `700 12px ${FONT}`; ctx.fillStyle = C.muted;
    [t('ex.c.act'), t('ex.c.desc'), t('ex.c.group'), t('ex.c.hours')].forEach((h, i) => ctx.fillText(h.toUpperCase(), xs[i], y));
    y += 10; ctx.fillStyle = C.line; ctx.fillRect(PAD, y, W - 2 * PAD, 1);
    if (!rows.length) { y += 26; ctx.font = `500 14px ${FONT}`; ctx.fillStyle = C.muted; ctx.fillText(t('acg.empty'), PAD, y); }
    rows.forEach(r => {
      y += 26; ctx.font = `600 14px ${FONT}`; ctx.fillStyle = C.ink;
      ctx.fillText(wrap(ctx, `${r.act} (${r.qty} ${r.unit})`, 540, 1)[0], xs[0], y);
      ctx.fillStyle = C.muted; ctx.fillText(wrap(ctx, r.desc || '—', 480, 1)[0], xs[1], y);
      ctx.fillText(wrap(ctx, r.group, 340, 1)[0], xs[2], y);
      ctx.fillStyle = C.ink; ctx.font = `800 14px ${FONT}`; ctx.fillText(`${r.hours} h`, xs[3], y);
      y += 4;
    });
    ctx.font = `500 12px ${FONT}`; ctx.fillStyle = C.muted; ctx.fillText(t('ex.disclaimer'), PAD, H - 30);
    return cv;
  }

  async function fontsReady() {
    if (!document.fonts) return;
    await Promise.all([`700 15px ${FONT}`, `800 16px ${FONT}`, `600 13px ${FONT}`, `500 14px ${FONT}`, `600 34px ${DISPLAY}`].map(f => document.fonts.load(f).catch(() => null)));
  }

  function plannedSems() {
    const n = lastSem() + 1;
    return Array.from({ length: Math.max(n, 1) }, (_, i) => i);
  }

  async function toPNG() {
    await fontsReady();
    const cv = renderPlan(plannedSems());
    await new Promise((res, rej) => cv.toBlob(b => b ? (save(b, 'png'), res()) : rej(new Error('png')), 'image/png'));
  }

  async function toPDF() {
    const lib = await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js', 'jspdf');
    await fontsReady();
    const sems = plannedSems(); const chunks = [];
    for (let i = 0; i < sems.length; i += COLS) chunks.push(sems.slice(i, i + COLS));
    const total = chunks.length + 1;
    const pages = chunks.map((ch, i) => renderPlan(ch, t('ex.page', { i: i + 1, n: total })));
    pages.push(renderAcgPage(t('ex.page', { i: total, n: total })));
    const doc = new lib.jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4', compress: true });
    const pw = 297, ph = 210, m = 8;
    pages.forEach((cv, i) => {
      if (i) doc.addPage('a4', 'landscape');
      const r = Math.min((pw - 2 * m) / cv.width, (ph - 2 * m) / cv.height);
      const w = cv.width * r, h = cv.height * r;
      doc.addImage(cv.toDataURL('image/jpeg', 0.92), 'JPEG', (pw - w) / 2, m, w, h, undefined, 'FAST');
    });
    doc.setProperties({ title: t('ex.title'), subject: 'PPC Engenharia Agrícola · Unipampa', creator: 'engenharia-agricola.github.io' });
    save(doc.output('blob'), 'pdf');
  }

  const FORMATS = { pdf: toPDF, png: toPNG, xlsx: toXLSX, csv: toCSV, json: toJSON };

  async function run(fmt) {
    const empty = !P().state.sems.some(l => l.length);
    if (empty && fmt !== 'json') { toast(t('ex.empty')); return; }
    const label = fmt.toUpperCase();
    toast(t('ex.busy', { f: label }));
    try { await FORMATS[fmt](); toast(t('ex.done', { f: label })); }
    catch (e) { console.error(e); toast(t('ex.fail')); }
  }

  /* ---------------- menu ---------------- */
  document.addEventListener('ea:ready', () => {
    const btn = document.getElementById('btn-export'); const menu = document.getElementById('export-menu');
    const items = () => [...menu.querySelectorAll('[role="menuitem"]')];
    const setOpen = open => {
      menu.hidden = !open; btn.setAttribute('aria-expanded', String(open));
      if (open) items()[0].focus();
    };
    btn.addEventListener('click', () => setOpen(menu.hidden));
    items().forEach(b => b.addEventListener('click', () => { setOpen(false); btn.focus(); run(b.dataset.fmt); }));
    menu.addEventListener('keydown', e => {
      const list = items(); const i = list.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); list[(i + 1) % list.length].focus(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); list[(i - 1 + list.length) % list.length].focus(); }
      else if (e.key === 'Escape') { setOpen(false); btn.focus(); }
    });
    document.addEventListener('click', e => { if (!menu.hidden && !e.target.closest('#export-dd')) setOpen(false); });
  });

  EA.exportPlan = run;
})();
