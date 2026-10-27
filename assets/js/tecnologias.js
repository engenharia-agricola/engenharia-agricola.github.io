/* IA no campo: o conteúdo está em português no HTML; aqui ficam o título, o aviso de idioma,
   os filtros do catálogo e o mapa maturidade × impacto, montado a partir dos próprios cartões. */
(function () {
  'use strict';
  EA.add({
    'te.title': ['IA no campo', 'AI in the field', 'IA en el campo'],
    'te.langnote': [
      '',
      'This page is available in Portuguese only. It maps AI technologies in agriculture and how they change the work of agricultural engineers.',
      'Esta página está disponible solo en portugués. Presenta las tecnologías de IA en el agro y cómo cambian el trabajo del ingeniero agrícola.'
    ]
  });

  const cards = [...document.querySelectorAll('#te-grid .tech')];
  const shown = document.getElementById('te-shown');
  const empty = document.getElementById('te-empty');
  const usoCount = document.getElementById('te-count-uso');
  const sel = { area: 'all', stage: 'all' };

  if (usoCount) usoCount.textContent = cards.filter(c => c.dataset.stage === 'uso').length;

  function applyFilter() {
    let n = 0;
    cards.forEach(c => {
      const ok = (sel.area === 'all' || c.dataset.area === sel.area) && (sel.stage === 'all' || c.dataset.stage === sel.stage);
      c.hidden = !ok;
      if (ok) n++;
    });
    shown.textContent = n;
    empty.hidden = n > 0;
  }

  document.querySelectorAll('.te-filter').forEach(group => {
    const buttons = group.querySelectorAll('button');
    buttons.forEach(b => b.addEventListener('click', () => {
      sel[group.dataset.key] = b.dataset.v;
      buttons.forEach(o => o.setAttribute('aria-pressed', String(o === b)));
      applyFilter();
    }));
  });

  // Mapa: cada cartão vira um link na célula do seu estágio e impacto.
  cards.forEach(c => {
    const cell = document.querySelector(`#te-map .cell[data-stage="${c.dataset.stage}"][data-impact="${c.dataset.impact}"]`);
    if (!cell) return;
    const a = document.createElement('a');
    a.href = '#' + c.id;
    a.dataset.area = c.dataset.area;
    a.title = c.querySelector('h3').textContent;
    a.innerHTML = `<span>${c.id.slice(1)}</span>${EA.esc(c.dataset.short || a.title)}`;
    a.addEventListener('click', () => {
      // o cartão pode estar escondido por um filtro: limpa os filtros antes de rolar
      if (c.hidden) document.querySelectorAll('.te-filter button[data-v="all"]').forEach(b => b.click());
      c.classList.remove('flash'); void c.offsetWidth; c.classList.add('flash');
      setTimeout(() => c.classList.remove('flash'), 1600);
    });
    cell.appendChild(a);
  });
})();
