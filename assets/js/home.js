/* Página inicial: jornada, gráfico de horas, requisitos e glossário. */
(function () {
  'use strict';
  const { add, t, ICONS } = EA;

  add({
    'home.title': ['Início', 'Home', 'Inicio'],
    'home.v.eyebrow': ['Conheça o curso', 'Meet the program', 'Conocé la carrera'],
    'home.v.h2': ['Engenharia que alimenta o Brasil', 'Engineering that feeds Brazil', 'Ingeniería que alimenta a Brasil'],
    'home.v.lead': [
      'Um clipe de menos de dois minutos sobre o curso, o Pampa e o que faz um engenheiro agrícola.',
      'A clip of under two minutes about the program, the Pampa and what an agricultural engineer does (narration and subtitles in Portuguese).',
      'Un clip de menos de dos minutos sobre la carrera, la Pampa y lo que hace un ingeniero agrícola (narración y subtítulos en portugués).'
    ],
    'home.v.aria': ['Clipe do curso de Engenharia Agrícola da Unipampa', 'Unipampa Agricultural Engineering program clip', 'Clip de la carrera de Ingeniería Agrícola de la Unipampa'],
    'home.eyebrow': ['PPC interativo · versão 2024', 'Interactive curriculum · 2024 version', 'PPC interactivo · versión 2024'],
    'home.h1': ['Engenharia que faz o campo <em>funcionar</em>.', 'Engineering that makes farming <em>work</em>.', 'Ingeniería que hace <em>funcionar</em> el campo.'],
    'home.lead': [
      'Este é o Projeto Pedagógico do Curso de Engenharia Agrícola da Unipampa – Alegrete, explicado de um jeito simples: o que você vai estudar, em que ordem, o que precisa para se formar e onde pode trabalhar.',
      'This is the Pedagogical Project of Unipampa’s Agricultural Engineering program (Alegrete, Brazil), explained simply: what you will study, in which order, what you need to graduate and where you can work.',
      'Este es el Proyecto Pedagógico de Ingeniería Agrícola de la Unipampa – Alegrete, explicado de forma sencilla: qué vas a estudiar, en qué orden, qué necesitás para recibirte y dónde podés trabajar.'
    ],
    'home.cta.matrix': ['Ver a matriz curricular', 'See the curriculum', 'Ver el plan de estudios'],
    'home.cta.plan': ['Montar minha grade', 'Build my plan', 'Armar mi plan'],
    'home.cta.career': ['Onde vou trabalhar?', 'Where will I work?', '¿Dónde voy a trabajar?'],
    'home.stat.hours': ['horas no total', 'total hours', 'horas en total'],
    'home.stat.sem': ['semestres (5 anos)', 'semesters (5 years)', 'semestres (5 años)'],
    'home.stat.ob': ['componentes obrigatórios', 'required courses', 'asignaturas obligatorias'],
    'home.stat.cccg': ['opções de CCCG', 'elective options', 'opciones de CCCG'],
    'home.stat.seats': ['vagas por ano', 'seats per year', 'vacantes por año'],
    'home.stat.areas': ['grandes áreas', 'core areas', 'grandes áreas'],

    'home.j.eyebrow': ['Sua jornada', 'Your journey', 'Tu recorrido'],
    'home.j.h2': ['Do primeiro dia ao diploma', 'From day one to your diploma', 'Del primer día al título'],
    'home.j.lead': [
      'O curso é integral (manhã e tarde) e dura 10 semestres. Role a página e veja como o conhecimento vai se construindo, etapa por etapa.',
      'The program is full-time (morning and afternoon) and lasts 10 semesters. Scroll down and see how knowledge builds up, step by step.',
      'La carrera es de jornada completa (mañana y tarde) y dura 10 semestres. Bajá por la página y mirá cómo se construye el conocimiento, etapa por etapa.'
    ],
    'j1.when': ['1º e 2º semestres', 'Semesters 1–2', '1.º y 2.º semestre'],
    'j1.h': ['Fundamentos', 'Foundations', 'Fundamentos'],
    'j1.p': [
      'Matemática, física, química, desenho, programação e biologia das plantas. São as ferramentas que você vai usar em todo projeto de engenharia. Em <b>Introdução à Ciência e Tecnologia</b> você já conhece a profissão.',
      'Mathematics, physics, chemistry, drawing, programming and plant biology. These are the tools you will use in every engineering project. In <b>Introduction to Science and Technology</b> you already meet the profession.',
      'Matemática, física, química, dibujo, programación y biología vegetal. Son las herramientas que vas a usar en todo proyecto de ingeniería. En <b>Introducción a la Ciencia y la Tecnología</b> ya conocés la profesión.'
    ],
    'j2.when': ['3º e 4º semestres', 'Semesters 3–4', '3.º y 4.º semestre'],
    'j2.h': ['A base da engenharia', 'Engineering basics', 'La base de la ingeniería'],
    'j2.p': [
      'Resistência dos materiais, solos, fenômenos de transferência, eletrotécnica, estatística e os primeiros cultivos agrícolas. A teoria começa a encontrar o campo.',
      'Strength of materials, soils, transport phenomena, electrical engineering, statistics and the first crop courses. Theory starts to meet the field.',
      'Resistencia de materiales, suelos, fenómenos de transporte, electrotecnia, estadística y los primeros cultivos. La teoría empieza a encontrarse con el campo.'
    ],
    'j3.when': ['5º e 6º semestres', 'Semesters 5–6', '5.º y 6.º semestre'],
    'j3.h': ['Mão na massa profissional', 'Hands-on professional training', 'Manos a la obra'],
    'j3.p': [
      'Máquinas agrícolas, hidráulica, topografia, hidrologia, estruturas e gestão. É aqui que começam as <b>CCCGs</b>: disciplinas complementares que você escolhe conforme seu interesse.',
      'Farm machinery, hydraulics, surveying, hydrology, structures and management. This is when <b>electives (CCCGs)</b> start: courses you choose according to your interests.',
      'Máquinas agrícolas, hidráulica, topografía, hidrología, estructuras y gestión. Acá empiezan las <b>CCCG</b>: asignaturas complementarias que elegís según tus intereses.'
    ],
    'j4.when': ['7º e 8º semestres', 'Semesters 7–8', '7.º y 8.º semestre'],
    'j4.h': ['As grandes áreas', 'The core areas', 'Las grandes áreas'],
    'j4.p': [
      'Irrigação e drenagem, construções rurais, armazenamento e secagem de grãos, geoprocessamento, instalações elétricas e tratamento de resíduos. Você já pensa como engenheiro(a) agrícola.',
      'Irrigation and drainage, rural buildings, grain storage and drying, GIS, electrical installations and waste treatment. You already think like an agricultural engineer.',
      'Riego y drenaje, construcciones rurales, almacenamiento y secado de granos, geoprocesamiento, instalaciones eléctricas y tratamiento de residuos. Ya pensás como ingeniero/a agrícola.'
    ],
    'j5.when': ['9º semestre', 'Semester 9', '9.º semestre'],
    'j5.h': ['Projetos integrados e TCC I', 'Integrated projects & Thesis I', 'Proyectos integrados y TFG I'],
    'j5.p': [
      'Você une tudo em projetos reais (silos, armazéns, segurança do trabalho) e começa o seu Trabalho de Conclusão de Curso com um(a) professor(a) orientador(a).',
      'You bring it all together in real projects (silos, warehouses, occupational safety) and start your undergraduate thesis with a faculty advisor.',
      'Integrás todo en proyectos reales (silos, depósitos, seguridad laboral) y empezás tu Trabajo Final de Grado con un/a docente orientador/a.'
    ],
    'j6.when': ['10º semestre', 'Semester 10', '10.º semestre'],
    'j6.h': ['Estágio e TCC II', 'Internship & Thesis II', 'Práctica y TFG II'],
    'j6.p': [
      'No mínimo 220 horas de estágio supervisionado em uma empresa, cooperativa, órgão público ou na própria Unipampa, e a defesa do TCC II.',
      'At least 220 hours of supervised internship at a company, cooperative, public agency or at Unipampa itself, plus the defense of Thesis II.',
      'Al menos 220 horas de práctica supervisada en una empresa, cooperativa, organismo público o en la propia Unipampa, y la defensa del TFG II.'
    ],
    'j7.when': ['Ao longo do curso', 'Throughout the program', 'A lo largo de la carrera'],
    'j7.h': ['Engenheiro(a) Agrícola!', 'Agricultural Engineer!', '¡Ingeniero/a Agrícola!'],
    'j7.p': [
      'Somando 150 h de atividades complementares (eventos, pesquisa, extensão, monitoria…), você recebe o grau de <b>Bacharel(a) em Engenharia Agrícola</b>.',
      'Adding 150 h of complementary activities (events, research, outreach, tutoring…), you earn the degree of <b>Bachelor in Agricultural Engineering</b>.',
      'Sumando 150 h de actividades complementarias (eventos, investigación, extensión, ayudantías…), obtenés el título de <b>Bachiller en Ingeniería Agrícola</b>.'
    ],
    'j.hours': ['{h} h no semestre', '{h} h in the semester', '{h} h en el semestre'],

    'home.d.eyebrow': ['Em números', 'By the numbers', 'En números'],
    'home.d.h2': ['Como as 3.985 horas se dividem', 'How the 3,985 hours are split', 'Cómo se dividen las 3.985 horas'],
    'home.d.lead': [
      'As Diretrizes Curriculares Nacionais organizam o curso em três núcleos. Somam-se a eles as disciplinas complementares (CCCGs) e as atividades complementares (ACGs). Passe o mouse ou toque nas fatias.',
      'Brazil’s National Curriculum Guidelines organize the program into three cores. Added to them are elective courses (CCCGs) and complementary activities (ACGs). Hover or tap the slices.',
      'Las Directrices Curriculares Nacionales de Brasil organizan la carrera en tres núcleos. A ellos se suman las asignaturas complementarias (CCCG) y las actividades complementarias (ACG). Pasá el mouse o tocá las porciones.'
    ],
    'home.d.aria': ['Gráfico de rosca com a divisão da carga horária', 'Donut chart of the workload split', 'Gráfico de anillo con la división de la carga horaria'],
    'home.d.total': ['horas', 'hours', 'horas'],
    'd.basic': ['Núcleo de conteúdos básicos', 'Basic content core', 'Núcleo de contenidos básicos'],
    'd.basic.s': ['Matemática, física, química, desenho, computação…', 'Math, physics, chemistry, drawing, computing…', 'Matemática, física, química, dibujo, computación…'],
    'd.prof': ['Núcleo profissionalizante', 'Professional core', 'Núcleo profesionalizante'],
    'd.prof.s': ['Máquinas, hidráulica, estruturas, solos… (inclui o estágio)', 'Machinery, hydraulics, structures, soils… (includes internship)', 'Máquinas, hidráulica, estructuras, suelos… (incluye la práctica)'],
    'd.spec': ['Núcleo de conteúdos específicos', 'Specific content core', 'Núcleo de contenidos específicos'],
    'd.spec.s': ['Projetos, gestão, ambiente, ética (inclui o TCC)', 'Projects, management, environment, ethics (includes thesis)', 'Proyectos, gestión, ambiente, ética (incluye el TFG)'],
    'd.cccg': ['CCCGs — complementares de graduação', 'CCCGs — elective courses', 'CCCG — complementarias de grado'],
    'd.cccg.s': ['Você escolhe entre 48 opções', 'You choose from 48 options', 'Elegís entre 48 opciones'],
    'd.acg': ['ACGs — atividades complementares', 'ACGs — complementary activities', 'ACG — actividades complementarias'],
    'd.acg.s': ['Eventos, pesquisa, extensão, cultura…', 'Events, research, outreach, culture…', 'Eventos, investigación, extensión, cultura…'],

    'home.r.eyebrow': ['Para se formar', 'To graduate', 'Para recibirte'],
    'home.r.h2': ['O que conta para o diploma', 'What counts toward your degree', 'Qué cuenta para el título'],
    'home.r.lead': [
      'A integralização curricular é cumprir todas estas partes. Guarde esta lista: ela é o seu “mapa do tesouro”.',
      'Completing the curriculum (“integralização”) means fulfilling all of these parts. Keep this list: it is your treasure map.',
      'Completar el plan (“integralização”) significa cumplir todas estas partes. Guardá esta lista: es tu mapa del tesoro.'
    ],
    'r1.h': ['Componentes obrigatórios', 'Required courses', 'Asignaturas obligatorias'],
    'r1.p': ['Disciplinas que todo mundo faz, do 1º ao 9º semestre.', 'Courses everyone takes, from semester 1 to 9.', 'Asignaturas que todos cursan, del 1.º al 9.º semestre.'],
    'r2.h': ['CCCGs', 'Electives (CCCGs)', 'CCCG'],
    'r2.p': ['Disciplinas complementares à sua escolha, a partir do 5º semestre.', 'Elective courses of your choice, from semester 5 on.', 'Asignaturas complementarias a elección, desde el 5.º semestre.'],
    'r3.h': ['ACGs', 'Complementary activities', 'ACG'],
    'r3.p': ['Eventos, projetos, monitorias, cursos e cultura — com mínimo de 15 h em ensino, pesquisa e cultura/gestão.', 'Events, projects, tutoring, short courses and culture — at least 15 h in teaching, research and culture/management.', 'Eventos, proyectos, ayudantías, cursos y cultura — mínimo 15 h en enseñanza, investigación y cultura/gestión.'],
    'r4.h': ['TCC I e II', 'Thesis I and II', 'TFG I y II'],
    'r4.p': ['Projeto (TCC I) e trabalho final defendido em banca (TCC II).', 'Proposal (Thesis I) and final work defended before a committee (Thesis II).', 'Proyecto (TFG I) y trabajo final defendido ante un tribunal (TFG II).'],
    'r5.h': ['Estágio supervisionado', 'Supervised internship', 'Práctica supervisada'],
    'r5.p': ['Liberado após 3.000 h cursadas; termina com relatório e defesa.', 'Unlocked after 3,000 h completed; ends with a report and defense.', 'Se habilita tras 3.000 h cursadas; termina con informe y defensa.'],
    'r6.h': ['Prazo', 'Time limit', 'Plazo'],
    'r6.p': ['Mínimo de 10 e máximo de 20 semestres para concluir.', 'Minimum of 10 and maximum of 20 semesters to finish.', 'Mínimo 10 y máximo 20 semestres para terminar.'],
    'r6.v': ['10–20 sem.', '10–20 sem.', '10–20 sem.'],

    'home.g.eyebrow': ['Dicionário do calouro', 'Freshman dictionary', 'Diccionario del ingresante'],
    'home.g.h2': ['Siglas que você vai ouvir muito', 'Acronyms you will hear a lot', 'Siglas que vas a escuchar mucho'],
    'home.g.lead': ['Toque em um cartão para virar e ver o significado.', 'Tap a card to flip it and see the meaning.', 'Tocá una tarjeta para darla vuelta y ver el significado.'],
    'home.g.search': ['Buscar termo…', 'Search term…', 'Buscar término…'],
    'home.g.tap': ['toque para virar ↻', 'tap to flip ↻', 'tocá para girar ↻'],

    'home.t1.h': ['Explore a matriz', 'Explore the curriculum', 'Explorá el plan'],
    'home.t1.p': ['Veja todas as disciplinas por semestre, com ementas e um mapa de pré-requisitos que se acende.', 'See every course by semester, with syllabi and a prerequisite map that lights up.', 'Mirá todas las asignaturas por semestre, con contenidos mínimos y un mapa de correlativas que se ilumina.'],
    'home.t2.h': ['Monte sua grade', 'Build your plan', 'Armá tu plan'],
    'home.t2.p': ['Planeje semestre a semestre, escolha suas CCCGs e acompanhe suas ACGs. Tudo salvo no seu navegador.', 'Plan semester by semester, pick your electives and track your activities. All saved in your browser.', 'Planificá semestre a semestre, elegí tus CCCG y seguí tus ACG. Todo se guarda en tu navegador.'],
    'home.t3.h': ['Guia do estudante', 'Student guide', 'Guía del estudiante'],
    'home.t3.p': ['Aprovação, trancamento, TCC, estágio, ACGs, láurea… as regras explicadas sem juridiquês.', 'Passing grades, withdrawals, thesis, internship, activities, honors… the rules without legalese.', 'Aprobación, bajas, TFG, práctica, ACG, mención honorífica… las reglas sin jerga legal.'],
    'home.t.go': ['Acessar →', 'Open →', 'Ir →']
  });

  const GLOSS = [
    ['PPC', ['Projeto Pedagógico do Curso', 'Pedagogical Project of the Program', 'Proyecto Pedagógico de la Carrera'],
      ['O “manual oficial” do curso: objetivos, perfil do egresso, disciplinas, regras e infraestrutura.', 'The program’s “official manual”: goals, graduate profile, courses, rules and facilities.', 'El “manual oficial” de la carrera: objetivos, perfil del egresado, asignaturas, reglas e infraestructura.']],
    ['CCCG', ['Componente Curricular Complementar de Graduação', 'Complementary (elective) course', 'Componente Curricular Complementario de Grado'],
      ['Disciplina optativa que você escolhe. É preciso somar pelo menos 270 h. Disciplinas de outros cursos podem ser aproveitadas, se a Comissão de Curso aprovar.', 'An elective course you choose. You need at least 270 h. Courses from other programs may count if the Program Committee approves.', 'Asignatura optativa que elegís. Hay que sumar al menos 270 h. Pueden valer asignaturas de otras carreras si la Comisión de Carrera lo aprueba.']],
    ['ACG', ['Atividade Complementar de Graduação', 'Complementary activity', 'Actividad Complementaria de Grado'],
      ['Horas por participar de eventos, pesquisa, extensão, monitoria, cursos, cultura e representação estudantil. Mínimo de 150 h.', 'Hours earned in events, research, outreach, tutoring, short courses, culture and student representation. Minimum 150 h.', 'Horas por participar en eventos, investigación, extensión, ayudantías, cursos, cultura y representación estudiantil. Mínimo 150 h.']],
    ['CCOG', ['Componente Curricular Obrigatório', 'Required course', 'Componente Curricular Obligatorio'],
      ['As disciplinas obrigatórias da matriz. Todos precisam cursar.', 'The required courses in the curriculum. Everyone must take them.', 'Las asignaturas obligatorias del plan. Todos deben cursarlas.']],
    ['Pré-req.', ['Pré-requisito', 'Prerequisite', 'Correlativa (prerrequisito)'],
      ['Disciplina que você precisa ter aprovado antes de cursar outra. Ex.: Cálculo I → Cálculo II.', 'A course you must pass before taking another. E.g. Calculus I → Calculus II.', 'Asignatura que tenés que aprobar antes de cursar otra. Ej.: Cálculo I → Cálculo II.']],
    ['CH', ['Carga horária', 'Workload (hours)', 'Carga horaria'],
      ['Total de horas de uma disciplina, dividido em teóricas (T) e práticas (P). Ex.: 60 h = 45T + 15P.', 'Total hours of a course, split into theory (T) and practice (P). E.g. 60 h = 45T + 15P.', 'Total de horas de una asignatura, dividido en teóricas (T) y prácticas (P). Ej.: 60 h = 45T + 15P.']],
    ['Ementa', ['Ementa', 'Syllabus summary', 'Contenidos mínimos'],
      ['Resumo oficial dos conteúdos de uma disciplina. Você encontra todas na página da matriz.', 'The official summary of a course’s content. You can find all of them on the curriculum page.', 'Resumen oficial de los contenidos de una asignatura. Están todos en la página del plan.']],
    ['TCC', ['Trabalho de Conclusão de Curso', 'Undergraduate thesis', 'Trabajo Final de Grado'],
      ['Trabalho técnico-científico em duas etapas (TCC I e II), orientado por um(a) professor(a) e defendido em banca.', 'A technical-scientific work in two stages (I and II), supervised by a professor and defended before a committee.', 'Trabajo técnico-científico en dos etapas (I y II), dirigido por un/a docente y defendido ante un tribunal.']],
    ['Trancar', ['Trancamento', 'Course withdrawal / leave', 'Baja / licencia'],
      ['Cancelar a matrícula numa disciplina (parcial, 1 vez por disciplina) ou no semestre todo (total, até 4 vezes).', 'Dropping one course (partial, once per course) or the whole semester (total, up to 4 times).', 'Darse de baja de una asignatura (parcial, 1 vez por asignatura) o del semestre completo (total, hasta 4 veces).']],
    ['Integralizar', ['Integralização curricular', 'Completing the curriculum', 'Completar el plan'],
      ['Cumprir todas as exigências do curso para colar grau: disciplinas, CCCGs, ACGs, TCC e estágio.', 'Fulfilling every program requirement to graduate: courses, electives, activities, thesis and internship.', 'Cumplir todas las exigencias para recibirse: asignaturas, CCCG, ACG, TFG y práctica.']],
    ['NDE', ['Núcleo Docente Estruturante', 'Core Faculty Board', 'Núcleo Docente Estructurante'],
      ['Grupo de professores que cuida do PPC e propõe melhorias no currículo.', 'Group of professors who maintain the PPC and propose curriculum improvements.', 'Grupo de docentes que cuida del PPC y propone mejoras al plan.']],
    ['Comissão', ['Comissão de Curso', 'Program Committee', 'Comisión de Carrera'],
      ['Professores, técnicos e representantes estudantis que decidem sobre o curso (aproveitamentos, ACGs, CCCGs…).', 'Faculty, staff and student representatives who decide on program matters (credit transfers, activities, electives…).', 'Docentes, técnicos y representantes estudiantiles que deciden sobre la carrera (equivalencias, ACG, CCCG…).']],
    ['Moodle', ['Ambiente Virtual de Aprendizagem', 'Virtual Learning Environment', 'Entorno Virtual de Aprendizaje'],
      ['Plataforma online onde professores publicam materiais, atividades e avaliações.', 'Online platform where professors post materials, assignments and tests.', 'Plataforma en línea donde los docentes publican materiales, actividades y evaluaciones.']],
    ['SiSU', ['Sistema de Seleção Unificada', 'Unified Selection System', 'Sistema de Selección Unificada'],
      ['Principal forma de ingresso, usando a nota do ENEM. Também há ingresso por notas do ensino médio e processo seletivo complementar.', 'Main way in, using the ENEM exam score. There are also admissions by high-school grades and a complementary selection.', 'Principal forma de ingreso, con la nota del ENEM. También se ingresa por notas de la secundaria y por proceso selectivo complementario.']],
    ['Dispensa', ['Aproveitamento / dispensa', 'Credit transfer / exemption', 'Equivalencia / exención'],
      ['Validar uma disciplina já cursada em outro lugar, ou pedir dispensa por extraordinário saber (até 3 disciplinas).', 'Validating a course taken elsewhere, or requesting exemption by proven knowledge (up to 3 courses).', 'Validar una asignatura cursada en otro lugar, o pedir exención por saber extraordinario (hasta 3 asignaturas).']],
    ['NInA', ['Núcleo de Inclusão e Acessibilidade', 'Inclusion & Accessibility Office', 'Núcleo de Inclusión y Accesibilidad'],
      ['Apoio a estudantes com deficiência ou necessidades específicas, incluindo intérprete de Libras.', 'Support for students with disabilities or specific needs, including a sign-language interpreter.', 'Apoyo a estudiantes con discapacidad o necesidades específicas, incluido intérprete de Libras.']]
  ];

  const STEPS = [
    { k: 'j1', icon: 'flask', sems: [1, 2] }, { k: 'j2', icon: 'gear', sems: [3, 4] },
    { k: 'j3', icon: 'tractor', sems: [5, 6] }, { k: 'j4', icon: 'drop', sems: [7, 8] },
    { k: 'j5', icon: 'silo', sems: [9] }, { k: 'j6', icon: 'briefcase', sems: [10] }, { k: 'j7', icon: 'cap', sems: [] }
  ];
  const SEM_HOURS = { 1: 375, 2: 420, 3: 405, 4: 375, 5: 480, 6: 450, 7: 435, 8: 360, 9: 285, 10: 250 };

  function renderJourney() {
    const box = document.getElementById('journey');
    box.querySelectorAll('.step').forEach(s => s.remove());
    STEPS.forEach(s => {
      const el = document.createElement('div');
      el.className = 'step';
      const chips = s.sems.map(n => `<span class="chip">${t('common.sem.short', { n })} · ${t('j.hours', { h: SEM_HOURS[n] })}</span>`).join('');
      el.innerHTML = `<div class="step-node">${ICONS[s.icon]}</div>
        <div class="step-body reveal"><div class="step-when">${t(s.k + '.when')}</div><h3>${t(s.k + '.h')}</h3><p style="margin:0">${t(s.k + '.p')}</p>${chips ? `<div class="step-meta">${chips}</div>` : ''}</div>`;
      box.appendChild(el);
    });
    EA.initReveal(box);
    onScroll();
  }

  function onScroll() {
    const box = document.getElementById('journey'); const fill = document.getElementById('journey-fill');
    if (!box) return;
    const r = box.getBoundingClientRect(); const mid = innerHeight * 0.6;
    const h = Math.max(0, Math.min(r.height, mid - r.top));
    fill.style.height = h + 'px';
    box.querySelectorAll('.step').forEach(s => {
      const node = s.querySelector('.step-node').getBoundingClientRect();
      s.classList.toggle('lit', node.top + node.height / 2 < mid);
    });
  }

  const SEGS = [
    { k: 'd.basic', v: 945, c: 'var(--a-base)' }, { k: 'd.prof', v: 1990, c: 'var(--a-plant)' },
    { k: 'd.spec', v: 630, c: 'var(--a-mach)' }, { k: 'd.cccg', v: 270, c: 'var(--a-energy)' }, { k: 'd.acg', v: 150, c: 'var(--a-mgmt)' }
  ];
  let donutShown = false;
  function renderDonut() {
    const svg = document.getElementById('donut'); const leg = document.getElementById('donut-legend');
    const total = SEGS.reduce((a, s) => a + s.v, 0); const R = 80; const C = 2 * Math.PI * R;
    let off = 0;
    svg.innerHTML = `<circle cx="110" cy="110" r="${R}" fill="none" stroke="var(--line)" stroke-width="30"/>` +
      SEGS.map((s, i) => {
        const len = s.v / total * C; const html = `<circle class="donut-seg" data-i="${i}" cx="110" cy="110" r="${R}" fill="none" stroke="${s.c}" stroke-width="30"
          stroke-dasharray="${donutShown ? len : 0} ${C}" stroke-dashoffset="${-off}" transform="rotate(-90 110 110)" data-len="${len}"><title>${t(s.k)}: ${s.v} h</title></circle>`;
        off += len; return html;
      }).join('') +
      `<g class="donut-center"><text x="110" y="108" text-anchor="middle"><tspan style="font-family:var(--display);font-size:34px;fill:var(--ink);font-weight:600" id="donut-num">${total.toLocaleString(document.documentElement.lang)}</tspan></text><text x="110" y="130" text-anchor="middle" id="donut-lbl">${t('home.d.total')}</text></g>`;
    leg.innerHTML = SEGS.map((s, i) => `<li data-i="${i}" style="--c:${s.c}"><span class="sw"></span><span>${t(s.k)}<small>${t(s.k + '.s')}</small></span><b>${s.v} h</b></li>`).join('');
    const focus = i => {
      svg.querySelectorAll('.donut-seg').forEach(c => { c.style.opacity = i === null || +c.dataset.i === i ? 1 : .3; c.style.strokeWidth = +c.dataset.i === i ? 36 : 30; });
      leg.querySelectorAll('li').forEach(l => l.classList.toggle('active', +l.dataset.i === i));
      document.getElementById('donut-num').textContent = (i === null ? total : SEGS[i].v).toLocaleString(document.documentElement.lang);
      document.getElementById('donut-lbl').textContent = i === null ? t('home.d.total') : Math.round(SEGS[i].v / total * 100) + '%';
    };
    svg.querySelectorAll('.donut-seg').forEach(c => { c.addEventListener('mouseenter', () => focus(+c.dataset.i)); c.addEventListener('click', () => focus(+c.dataset.i)); c.addEventListener('mouseleave', () => focus(null)); });
    leg.querySelectorAll('li').forEach(l => { l.addEventListener('mouseenter', () => focus(+l.dataset.i)); l.addEventListener('mouseleave', () => focus(null)); });
    if (!donutShown) {
      const io = new IntersectionObserver(es => {
        if (es.some(e => e.isIntersecting)) {
          donutShown = true; io.disconnect();
          svg.querySelectorAll('.donut-seg').forEach(c => { c.style.strokeDasharray = `${c.dataset.len} ${C}`; });
        }
      }, { threshold: .4 });
      io.observe(svg);
    }
  }

  function renderReqs() {
    const items = [['r1', '3.285 h', 'book'], ['r2', '270 h', 'puzzle'], ['r3', '150 h', 'star'], ['r4', '60 h', 'file'], ['r5', '220 h', 'briefcase'], ['r6', t('r6.v'), 'clock']];
    document.getElementById('reqs').innerHTML = items.map(([k, v, ic], i) =>
      `<div class="card req-card reveal" data-delay="${i % 3}"><div class="big">${v}</div><h3 style="margin-top:10px">${t(k + '.h')}</h3><p class="muted" style="margin:0">${t(k + '.p')}</p><span class="ico">${ICONS[ic]}</span></div>`).join('');
    EA.initReveal(document.getElementById('reqs'));
  }

  function renderGlossary() {
    const i = ['pt', 'en', 'es'].indexOf(EA.lang);
    const q = (document.getElementById('gloss-search').value || '').toLowerCase();
    const box = document.getElementById('glossary');
    box.innerHTML = GLOSS.filter(g => !q || (g[0] + g[1][i] + g[2][i]).toLowerCase().includes(q)).map(g =>
      `<div class="flip" tabindex="0" role="button" aria-label="${EA.esc(g[0] + ' — ' + g[1][i])}">
        <div class="flip-inner">
          <div class="flip-face flip-front"><b>${g[0]}</b><span>${g[1][i]}</span><small>${t('home.g.tap')}</small></div>
          <div class="flip-face flip-back">${g[2][i]}</div>
        </div></div>`).join('');
    box.querySelectorAll('.flip').forEach(f => {
      const flip = () => f.classList.toggle('flipped');
      f.addEventListener('click', flip);
      f.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } });
    });
  }

  function renderAll() { renderJourney(); renderDonut(); renderReqs(); renderGlossary(); }

  document.addEventListener('ea:ready', () => {
    renderAll();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    document.getElementById('gloss-search').addEventListener('input', renderGlossary);
  });
  document.addEventListener('langchange', renderAll);
})();
