/* PPC do futuro: o conteúdo está em português no HTML; aqui ficam o título, o aviso de idioma, a legenda
   das disciplinas com IA (com a contagem calculada da própria matriz) e o filtro da matriz. */
(function () {
  'use strict';
  EA.add({
    'fu.title': ['PPC do futuro', 'Future PPC', 'PPC del futuro'],
    'fu.langnote': [
      '',
      'This page is available in Portuguese only. It is an exploratory proposal for discussion, not an official course document.',
      'Esta página está disponible solo en portugués. Es una propuesta exploratoria para discusión, no un documento oficial de la carrera.'
    ],
    'fu.ia.tag': ['IA', 'AI', 'IA'],
    'fu.ia.axis': ['IA é o conteúdo', 'AI is the subject', 'La IA es el contenido'],
    'fu.ia.axis.d': [
      'Roxo cheio: disciplinas do eixo de dados e IA.',
      'Solid purple: courses of the data and AI axis.',
      'Violeta lleno: asignaturas del eje de datos e IA.'
    ],
    'fu.ia.use': ['IA como ferramenta', 'AI as a tool', 'IA como herramienta'],
    'fu.ia.use.d': [
      'Roxo claro: disciplinas de engenharia com uso de IA previsto na ementa.',
      'Light purple: engineering courses whose syllabus includes using AI.',
      'Violeta claro: asignaturas de ingeniería con uso de IA previsto en el programa.'
    ],
    'fu.ia.none': ['Sem IA prevista', 'No AI planned', 'Sin IA prevista'],
    'fu.ia.none.d': [
      'Outras cores: núcleo, ateliês, trilhas, estágio e TCC.',
      'Other colors: core, studios, tracks, internship and thesis.',
      'Otros colores: núcleo, talleres, trayectos, práctica y TFG.'
    ],
    'fu.ia.count': [
      '<b>{n} de {all} disciplinas</b> têm IA ({axis} do eixo e {use} de engenharia), somando <b>{h} h de {total} h</b> da matriz ({pct}%).',
      '<b>{n} of {all} courses</b> involve AI ({axis} in the axis and {use} engineering courses), totaling <b>{h} h of {total} h</b> in the curriculum ({pct}%).',
      '<b>{n} de {all} asignaturas</b> tienen IA ({axis} del eje y {use} de ingeniería), con <b>{h} h de {total} h</b> de la matriz ({pct}%).'
    ]
  });

  const matrix = document.getElementById('fu-matrix');
  const buttons = document.querySelectorAll('.fu-filter button');
  buttons.forEach(b => b.addEventListener('click', () => {
    matrix.dataset.f = b.dataset.f;
    buttons.forEach(o => o.setAttribute('aria-pressed', String(o === b)));
  }));

  // Contagem tirada dos blocos da matriz (a carga de cada um está em --h). Trilhas, ateliês, estágio e TCC
  // entram no total de horas, mas não no total de disciplinas.
  const cells = [...matrix.querySelectorAll('.c')];
  const hours = els => els.reduce((s, el) => s + Number(el.style.getPropertyValue('--h')), 0);
  const axis = cells.filter(el => el.classList.contains('ai'));
  const use = cells.filter(el => el.classList.contains('ia'));
  const courses = cells.filter(el => el.classList.contains('core') || el.classList.contains('ai'));
  const total = hours(cells);

  function render() {
    // O selo dos blocos vem de CSS (::after); o texto acompanha o idioma.
    matrix.style.setProperty('--ia-label', JSON.stringify(EA.t('fu.ia.tag')));
    const h = hours(axis) + hours(use);
    document.getElementById('fu-ia-count').innerHTML = EA.t('fu.ia.count', {
      n: axis.length + use.length, all: courses.length, axis: axis.length, use: use.length,
      h: h.toLocaleString(document.documentElement.lang), total: total.toLocaleString(document.documentElement.lang),
      pct: Math.round(h / total * 100)
    });
  }
  document.addEventListener('ea:ready', render);
  document.addEventListener('langchange', render);
})();
