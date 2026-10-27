/* PPC do futuro: o conteúdo está em português no HTML; aqui ficam o título, o aviso de idioma e o filtro da matriz. */
(function () {
  'use strict';
  EA.add({
    'fu.title': ['PPC do futuro', 'Future PPC', 'PPC del futuro'],
    'fu.langnote': [
      '',
      'This page is available in Portuguese only. It is an exploratory proposal for discussion, not an official course document.',
      'Esta página está disponible solo en portugués. Es una propuesta exploratoria para discusión, no un documento oficial de la carrera.'
    ]
  });

  const matrix = document.getElementById('fu-matrix');
  const buttons = document.querySelectorAll('.fu-filter button');
  buttons.forEach(b => b.addEventListener('click', () => {
    matrix.dataset.f = b.dataset.f;
    buttons.forEach(o => o.setAttribute('aria-pressed', String(o === b)));
  }));
})();
