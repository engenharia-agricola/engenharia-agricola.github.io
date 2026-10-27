/* Guia do estudante: regras do PPC em linguagem simples. */
(function () {
  'use strict';
  const { add, t, ICONS } = EA;
  const li = () => ['pt', 'en', 'es'].indexOf(EA.lang);
  const pick = a => a[li()] !== undefined ? a[li()] : a[0];

  add({
    'gd.title': ['Guia do estudante', 'Student guide', 'Guía del estudiante'],
    'gd.eyebrow': ['Regras sem juridiquês', 'Rules without legalese', 'Reglas sin jerga legal'],
    'gd.h1': ['Guia do estudante', 'Student guide', 'Guía del estudiante'],
    'gd.lead': [
      'As principais regras do PPC e das Normas de Graduação da Unipampa, resumidas para quem está começando. Toque em um tema para abrir.',
      'The main rules of the PPC and Unipampa’s Undergraduate Regulations, summarized for newcomers. Tap a topic to open it.',
      'Las principales reglas del PPC y de las Normas de Grado de la Unipampa, resumidas para quienes empiezan. Tocá un tema para abrirlo.'
    ],
    'gd.open': ['Abrir todos', 'Open all', 'Abrir todos']
  });

  const S = [
    { id: 'aprovacao', icon: 'check',
      h: ['Como sou aprovado(a)?', 'How do I pass a course?', '¿Cómo apruebo?'],
      s: ['Nota e frequência', 'Grade and attendance', 'Nota y asistencia'],
      b: [
        `<div class="pill-steps"><span>Nota ≥ <b>6,0</b></span><em>+</em><span>Frequência ≥ <b>75%</b></span><em>=</em><span style="background:var(--brand);color:var(--brand-ink)">Aprovado(a) ✓</span></div>
         <p>A avaliação é <b>processual, contínua e cumulativa</b>: provas, trabalhos, relatórios, seminários e projetos ao longo do semestre. O resultado final é “Aprovado” ou “Reprovado”.</p>
         <p>Os professores oferecem <b>recuperação paralela</b>: se você for mal em um conteúdo, terá indicação de estudo e uma nova avaliação. Ela acontece fora do horário de aula — então procure o professor!</p>
         <div class="callout">Faltou muito? Reprovação por frequência pesa: ela impede, por exemplo, pedir dispensa por extraordinário saber no semestre seguinte. Fique de olho na lista de presença.</div>`,
        `<div class="pill-steps"><span>Grade ≥ <b>6.0</b></span><em>+</em><span>Attendance ≥ <b>75%</b></span><em>=</em><span style="background:var(--brand);color:var(--brand-ink)">Passed ✓</span></div>
         <p>Assessment is <b>ongoing, continuous and cumulative</b>: tests, assignments, reports, seminars and projects throughout the semester. The final result is “Passed” or “Failed”.</p>
         <p>Professors offer <b>parallel recovery</b>: if you do poorly on a topic, you get study guidance and a new assessment. It happens outside class hours — so talk to your professor!</p>
         <div class="callout">Missed too many classes? Failing for attendance has consequences: for example, it prevents you from requesting an exemption by proven knowledge the following semester.</div>`,
        `<div class="pill-steps"><span>Nota ≥ <b>6,0</b></span><em>+</em><span>Asistencia ≥ <b>75%</b></span><em>=</em><span style="background:var(--brand);color:var(--brand-ink)">Aprobado/a ✓</span></div>
         <p>La evaluación es <b>procesual, continua y acumulativa</b>: exámenes, trabajos, informes, seminarios y proyectos a lo largo del semestre. El resultado final es “Aprobado” o “Desaprobado”.</p>
         <p>Los docentes ofrecen <b>recuperación paralela</b>: si te va mal en un tema, recibís orientación de estudio y una nueva evaluación. Es fuera del horario de clase — ¡buscá al docente!</p>
         <div class="callout">¿Faltaste mucho? Desaprobar por asistencia tiene consecuencias: por ejemplo, impide pedir exención por saber extraordinario el semestre siguiente.</div>`
      ] },
    { id: 'carga', icon: 'clock',
      h: ['Quantas disciplinas posso fazer por semestre?', 'How many courses can I take per semester?', '¿Cuántas asignaturas puedo cursar por semestre?'],
      s: ['Limites de carga horária e prazos', 'Workload limits and deadlines', 'Límites de carga horaria y plazos'],
      b: [
        `<ul><li>Mínimo de <b>120 h</b> e máximo de <b>540 h</b> por semestre (casos especiais podem ser autorizados pela Comissão de Curso e pelo NDE).</li>
         <li>O curso é <b>integral</b> (manhã e tarde) e dura no mínimo <b>10</b> e no máximo <b>20 semestres</b>.</li>
         <li>Os pré-requisitos podem ser desconsiderados em casos específicos, mediante análise da Comissão de Curso, com critérios pedagógicos.</li></ul>
         <div class="callout green">Use o <a href="grade.html">planejador de grade</a>: ele soma as horas e avisa quando o semestre passa dos limites.</div>`,
        `<ul><li>Minimum <b>120 h</b> and maximum <b>540 h</b> per semester (special cases may be authorized by the Program Committee and the NDE).</li>
         <li>The program is <b>full-time</b> (morning and afternoon) and takes at least <b>10</b> and at most <b>20 semesters</b>.</li>
         <li>Prerequisites may be waived in specific cases after analysis by the Program Committee, based on pedagogical criteria.</li></ul>
         <div class="callout green">Use the <a href="grade.html">plan builder</a>: it adds up the hours and warns you when a semester goes over the limits.</div>`,
        `<ul><li>Mínimo de <b>120 h</b> y máximo de <b>540 h</b> por semestre (la Comisión de Carrera y el NDE pueden autorizar casos especiales).</li>
         <li>La carrera es de <b>jornada completa</b> (mañana y tarde) y dura como mínimo <b>10</b> y como máximo <b>20 semestres</b>.</li>
         <li>Las correlativas pueden dejarse de lado en casos específicos, tras análisis de la Comisión de Carrera con criterios pedagógicos.</li></ul>
         <div class="callout green">Usá el <a href="grade.html">planificador</a>: suma las horas y te avisa cuando un semestre supera los límites.</div>`
      ] },
    { id: 'trancamento', icon: 'pause',
      h: ['Posso trancar?', 'Can I withdraw?', '¿Puedo darme de baja?'],
      s: ['Trancamento parcial e total', 'Partial and total withdrawal', 'Baja parcial y total'],
      b: [
        `<div class="grid grid-2"><div class="card"><b style="font-size:2rem;font-family:var(--display);color:var(--brand)">1×</b><h3>Trancamento parcial</h3><p class="muted" style="margin:0">Por componente curricular: você pode trancar cada disciplina uma vez.</p></div>
         <div class="card"><b style="font-size:2rem;font-family:var(--display);color:var(--brand)">4×</b><h3>Trancamento total</h3><p class="muted" style="margin:0">Do semestre inteiro: até 4 vezes ao longo do curso.</p></div></div>
         <p style="margin-top:14px">Trancar é melhor que reprovar por falta — mas atrasa a sua formatura e conta para a láurea acadêmica. Converse com a coordenação antes.</p>`,
        `<div class="grid grid-2"><div class="card"><b style="font-size:2rem;font-family:var(--display);color:var(--brand)">1×</b><h3>Partial withdrawal</h3><p class="muted" style="margin:0">Per course: you can drop each course once.</p></div>
         <div class="card"><b style="font-size:2rem;font-family:var(--display);color:var(--brand)">4×</b><h3>Total withdrawal</h3><p class="muted" style="margin:0">The whole semester: up to 4 times during the program.</p></div></div>
         <p style="margin-top:14px">Withdrawing is better than failing for absence — but it delays graduation and counts against academic honors. Talk to the coordination first.</p>`,
        `<div class="grid grid-2"><div class="card"><b style="font-size:2rem;font-family:var(--display);color:var(--brand)">1×</b><h3>Baja parcial</h3><p class="muted" style="margin:0">Por asignatura: podés darte de baja de cada una una vez.</p></div>
         <div class="card"><b style="font-size:2rem;font-family:var(--display);color:var(--brand)">4×</b><h3>Baja total</h3><p class="muted" style="margin:0">Del semestre completo: hasta 4 veces durante la carrera.</p></div></div>
         <p style="margin-top:14px">Darse de baja es mejor que desaprobar por faltas — pero atrasa tu egreso y cuenta para la mención académica. Hablá antes con la coordinación.</p>`
      ] },
    { id: 'cccg', icon: 'puzzle',
      h: ['CCCGs: as disciplinas que eu escolho', 'CCCGs: the courses I choose', 'CCCG: las asignaturas que elijo'],
      s: ['270 h de complementares', '270 h of electives', '270 h de complementarias'],
      b: [
        `<p>As <b>CCCGs</b> complementam e aprofundam a sua formação de acordo com seus interesses. Você precisa de <b>no mínimo 270 h</b>, de preferência a partir do <b>5º semestre</b> (a matriz reserva espaços CCCG I a V, do 5º ao 9º semestre).</p>
         <ul><li>O PPC lista <b>48 opções</b> — de Agricultura de Precisão e Sensoriamento Remoto a Libras e Relações Étnico-raciais. A oferta muda a cada semestre.</li>
         <li>Fez uma disciplina de <b>outro curso</b>? Peça o aproveitamento como CCCG na Secretaria Acadêmica, no prazo do calendário. A Comissão de Curso decide se ela contribui para o perfil do egresso.</li></ul>
         <div class="btn-row"><a class="btn btn-ghost btn-sm" href="matriz.html#cccgs">Ver catálogo de CCCGs →</a></div>`,
        `<p><b>CCCGs</b> complement and deepen your education according to your interests. You need <b>at least 270 h</b>, preferably from <b>semester 5</b> on (the curriculum reserves slots CCCG I to V in semesters 5 to 9).</p>
         <ul><li>The PPC lists <b>48 options</b> — from Precision Agriculture and Remote Sensing to Brazilian Sign Language and Ethnic-Racial Relations. The offer changes every semester.</li>
         <li>Took a course in <b>another program</b>? Request it as an elective at the Academic Office within the calendar deadline. The Program Committee decides whether it fits the graduate profile.</li></ul>
         <div class="btn-row"><a class="btn btn-ghost btn-sm" href="matriz.html#cccgs">See the elective catalog →</a></div>`,
        `<p>Las <b>CCCG</b> complementan y profundizan tu formación según tus intereses. Necesitás <b>al menos 270 h</b>, preferentemente desde el <b>5.º semestre</b> (el plan reserva espacios CCCG I a V, del 5.º al 9.º semestre).</p>
         <ul><li>El PPC enumera <b>48 opciones</b> — de Agricultura de Precisión y Teledetección a Libras y Relaciones Étnico-raciales. La oferta cambia cada semestre.</li>
         <li>¿Cursaste una asignatura de <b>otra carrera</b>? Pedí la equivalencia como CCCG en la Secretaría Académica, dentro del plazo. La Comisión de Carrera decide si aporta al perfil del egresado.</li></ul>
         <div class="btn-row"><a class="btn btn-ghost btn-sm" href="matriz.html#cccgs">Ver el catálogo de CCCG →</a></div>`
      ] },
    { id: 'acg', icon: 'star',
      h: ['ACGs: atividades complementares', 'ACGs: complementary activities', 'ACG: actividades complementarias'],
      s: ['150 h em 4 grupos', '150 h in 4 groups', '150 h en 4 grupos'],
      b: [
        `<p>São horas que você ganha participando da vida acadêmica. Mínimo de <b>150 h</b>, com pelo menos <b>15 h</b> em cada um dos grupos I, II e IV:</p>
         <div class="grid grid-4" style="margin:12px 0"><div class="card"><b>I · Ensino</b><p class="muted" style="margin:0;font-size:.9rem">monitorias, cursos, eventos como ouvinte, projetos de ensino</p></div>
         <div class="card"><b>II · Pesquisa</b><p class="muted" style="margin:0;font-size:.9rem">iniciação científica, publicações, apresentações</p></div>
         <div class="card"><b>III · Extensão</b><p class="muted" style="margin:0;font-size:.9rem">projetos com a comunidade, eventos de extensão</p></div>
         <div class="card"><b>IV · Cultura, sociedade e gestão</b><p class="muted" style="margin:0;font-size:.9rem">eventos culturais, representação estudantil, organização de eventos</p></div></div>
         <ul><li>Entregue os comprovantes na Secretaria Acadêmica no período do calendário.</li><li>Só valem atividades feitas enquanto você está matriculado(a) (inclusive nas férias).</li><li>ACG <b>não</b> serve para dispensar disciplina.</li></ul>
         <div class="btn-row"><a class="btn btn-primary btn-sm" href="grade.html#acg">Calcular minhas ACGs →</a></div>`,
        `<p>Hours you earn by taking part in academic life. Minimum <b>150 h</b>, with at least <b>15 h</b> in each of groups I, II and IV:</p>
         <div class="grid grid-4" style="margin:12px 0"><div class="card"><b>I · Teaching</b><p class="muted" style="margin:0;font-size:.9rem">tutoring, courses, attending events, teaching projects</p></div>
         <div class="card"><b>II · Research</b><p class="muted" style="margin:0;font-size:.9rem">undergraduate research, publications, presentations</p></div>
         <div class="card"><b>III · Outreach</b><p class="muted" style="margin:0;font-size:.9rem">community projects, outreach events</p></div>
         <div class="card"><b>IV · Culture, society & management</b><p class="muted" style="margin:0;font-size:.9rem">cultural events, student representation, event organization</p></div></div>
         <ul><li>Hand in proof at the Academic Office during the calendar period.</li><li>Only activities done while enrolled count (including during breaks).</li><li>ACGs can <b>not</b> be used to waive a course.</li></ul>
         <div class="btn-row"><a class="btn btn-primary btn-sm" href="grade.html#acg">Calculate my activities →</a></div>`,
        `<p>Son horas que ganás participando de la vida académica. Mínimo <b>150 h</b>, con al menos <b>15 h</b> en cada uno de los grupos I, II y IV:</p>
         <div class="grid grid-4" style="margin:12px 0"><div class="card"><b>I · Enseñanza</b><p class="muted" style="margin:0;font-size:.9rem">ayudantías, cursos, asistencia a eventos, proyectos de enseñanza</p></div>
         <div class="card"><b>II · Investigación</b><p class="muted" style="margin:0;font-size:.9rem">iniciación científica, publicaciones, presentaciones</p></div>
         <div class="card"><b>III · Extensión</b><p class="muted" style="margin:0;font-size:.9rem">proyectos con la comunidad, eventos de extensión</p></div>
         <div class="card"><b>IV · Cultura, sociedad y gestión</b><p class="muted" style="margin:0;font-size:.9rem">eventos culturales, representación estudiantil, organización de eventos</p></div></div>
         <ul><li>Entregá los comprobantes en la Secretaría Académica en el período del calendario.</li><li>Solo valen actividades hechas mientras estés matriculado/a (incluso en vacaciones).</li><li>Las ACG <b>no</b> sirven para eximir asignaturas.</li></ul>
         <div class="btn-row"><a class="btn btn-primary btn-sm" href="grade.html#acg">Calcular mis ACG →</a></div>`
      ] },
    { id: 'tcc', icon: 'file',
      h: ['TCC: Trabalho de Conclusão de Curso', 'Undergraduate thesis (TCC)', 'TFG: Trabajo Final de Grado'],
      s: ['TCC I (9º sem.) e TCC II (10º sem.)', 'Thesis I (sem. 9) and II (sem. 10)', 'TFG I (9.º sem.) y TFG II (10.º sem.)'],
      b: [
        `<div class="pill-steps"><span>2.900 h cursadas + Metodologia Científica</span><em>→</em><span>TCC I · projeto</span><em>→</em><span>TCC II · trabalho final</span><em>→</em><span style="background:var(--brand);color:var(--brand-ink)">Defesa pública</span></div>
         <ul><li>Você escolhe o(a) orientador(a) em comum acordo com o coordenador de TCC. Cada professor orienta até 3 alunos por etapa.</li>
         <li><b>TCC I:</b> banca com o orientador e o coordenador de TCC avalia o projeto.</li>
         <li><b>TCC II:</b> banca com o orientador + 2 avaliadores (um pode ser externo). Entregue o trabalho <b>7 dias antes</b> da defesa.</li>
         <li>Apresentação de <b>20 a 30 min</b>, seguida de arguição de 10 a 15 min por membro.</li>
         <li>Nota = <b>70% trabalho escrito + 30% apresentação</b>. Precisa de média ≥ 6,0; se não atingir, pode haver nova defesa em até 15 dias.</li>
         <li>Depois da defesa: 7 dias para as correções e versão final em PDF (vai para a biblioteca).</li></ul>`,
        `<div class="pill-steps"><span>2,900 h completed + Scientific Methodology</span><em>→</em><span>Thesis I · proposal</span><em>→</em><span>Thesis II · final work</span><em>→</em><span style="background:var(--brand);color:var(--brand-ink)">Public defense</span></div>
         <ul><li>You choose your advisor together with the thesis coordinator. Each professor advises up to 3 students per stage.</li>
         <li><b>Thesis I:</b> a committee of the advisor and the thesis coordinator evaluates the proposal.</li>
         <li><b>Thesis II:</b> committee of the advisor + 2 examiners (one may be external). Submit the work <b>7 days before</b> the defense.</li>
         <li>Presentation of <b>20 to 30 min</b>, followed by 10 to 15 min of questions per member.</li>
         <li>Grade = <b>70% written work + 30% presentation</b>. You need ≥ 6.0; if not, a new defense may take place within 15 days.</li>
         <li>After the defense: 7 days for corrections and the final PDF version (sent to the library).</li></ul>`,
        `<div class="pill-steps"><span>2.900 h cursadas + Metodología Científica</span><em>→</em><span>TFG I · proyecto</span><em>→</em><span>TFG II · trabajo final</span><em>→</em><span style="background:var(--brand);color:var(--brand-ink)">Defensa pública</span></div>
         <ul><li>Elegís a tu director/a de común acuerdo con el coordinador de TFG. Cada docente dirige hasta 3 estudiantes por etapa.</li>
         <li><b>TFG I:</b> un tribunal con el director y el coordinador de TFG evalúa el proyecto.</li>
         <li><b>TFG II:</b> tribunal con el director + 2 evaluadores (uno puede ser externo). Entregá el trabajo <b>7 días antes</b> de la defensa.</li>
         <li>Presentación de <b>20 a 30 min</b>, seguida de 10 a 15 min de preguntas por miembro.</li>
         <li>Nota = <b>70% trabajo escrito + 30% presentación</b>. Necesitás ≥ 6,0; si no, puede haber una nueva defensa en hasta 15 días.</li>
         <li>Tras la defensa: 7 días para correcciones y la versión final en PDF (va a la biblioteca).</li></ul>`
      ] },
    { id: 'estagio', icon: 'briefcase',
      h: ['Estágio supervisionado', 'Supervised internship', 'Práctica profesional supervisada'],
      s: ['220 h no 10º semestre', '220 h in semester 10', '220 h en el 10.º semestre'],
      b: [
        `<div class="pill-steps"><span>3.000 h cursadas</span><em>→</em><span>Proposta + Termo de Compromisso (TCE)</span><em>→</em><span>≥ 220 h de estágio</span><em>→</em><span>Relatórios</span><em>→</em><span style="background:var(--brand);color:var(--brand-ink)">Defesa do relatório final</span></div>
         <ul><li>Pode ser em empresas, cooperativas, órgãos públicos ou na própria Unipampa. Você pode sugerir o local.</li>
         <li>Você tem um <b>orientador</b> (professor) e um <b>supervisor</b> (profissional do local).</li>
         <li>Jornada de até <b>6 h/dia e 30 h/semana</b> (até 8 h/dia e 40 h/semana nos períodos sem aulas presenciais).</li>
         <li>Há também o <b>estágio não obrigatório</b>, que pode virar ACG (até 50 h).</li></ul>`,
        `<div class="pill-steps"><span>3,000 h completed</span><em>→</em><span>Proposal + Internship Agreement (TCE)</span><em>→</em><span>≥ 220 h of internship</span><em>→</em><span>Reports</span><em>→</em><span style="background:var(--brand);color:var(--brand-ink)">Final report defense</span></div>
         <ul><li>It can be at companies, cooperatives, public agencies or Unipampa itself. You may suggest the place.</li>
         <li>You have an <b>advisor</b> (professor) and a <b>supervisor</b> (professional on site).</li>
         <li>Up to <b>6 h/day and 30 h/week</b> (up to 8 h/day and 40 h/week in periods without classes).</li>
         <li>There is also the <b>optional internship</b>, which may count as an activity (ACG, up to 50 h).</li></ul>`,
        `<div class="pill-steps"><span>3.000 h cursadas</span><em>→</em><span>Propuesta + Convenio de práctica (TCE)</span><em>→</em><span>≥ 220 h de práctica</span><em>→</em><span>Informes</span><em>→</em><span style="background:var(--brand);color:var(--brand-ink)">Defensa del informe final</span></div>
         <ul><li>Puede ser en empresas, cooperativas, organismos públicos o en la propia Unipampa. Podés sugerir el lugar.</li>
         <li>Tenés un <b>orientador</b> (docente) y un <b>supervisor</b> (profesional del lugar).</li>
         <li>Hasta <b>6 h/día y 30 h/semana</b> (hasta 8 h/día y 40 h/semana en períodos sin clases).</li>
         <li>También existe la <b>práctica no obligatoria</b>, que puede valer como ACG (hasta 50 h).</li></ul>`
      ] },
    { id: 'dispensa', icon: 'wand',
      h: ['Já sei o conteúdo. Posso ser dispensado(a)?', 'I already know the content. Can I be exempted?', 'Ya sé el contenido. ¿Puedo eximirme?'],
      s: ['Aproveitamento e extraordinário saber', 'Credit transfer and proven knowledge', 'Equivalencias y saber extraordinario'],
      b: [
        `<p><b>Aproveitamento:</b> disciplinas cursadas em outra instituição/curso podem ser aproveitadas, no prazo do calendário acadêmico.</p>
         <p><b>Dispensa por extraordinário saber:</b> para quem comprova domínio do conteúdo. Regras:</p>
         <ul><li>No máximo <b>3 disciplinas</b> em todo o curso, e uma única tentativa por disciplina.</li>
         <li>Não pode ter reprovação anterior na disciplina, nem reprovação por frequência no semestre anterior; os pré-requisitos devem estar cumpridos.</li>
         <li>Não vale para: TCC I e II, Estágio, CCCGs, Projeto de Obras de Terra, Estruturas de Concreto, Instalações Elétricas Prediais, Máquinas Agrícolas III, Projetos de Construções, Projetos Integrados de Engenharia e Projetos de Silos e Armazéns.</li></ul>`,
        `<p><b>Credit transfer:</b> courses taken at another institution/program may be credited, within the academic calendar deadline.</p>
         <p><b>Exemption by proven knowledge:</b> for those who demonstrate mastery of the content. Rules:</p>
         <ul><li>At most <b>3 courses</b> in the whole program, one attempt per course.</li>
         <li>No previous failure in that course, nor failure for attendance in the previous semester; prerequisites must be met.</li>
         <li>Not allowed for: Thesis I and II, Internship, electives, Earthworks Design, Concrete Structures, Building Electrical Installations, Farm Machinery III, Building Design Projects, Integrated Engineering Projects and Silo & Warehouse Design.</li></ul>`,
        `<p><b>Equivalencias:</b> asignaturas cursadas en otra institución/carrera pueden reconocerse, dentro del plazo del calendario académico.</p>
         <p><b>Exención por saber extraordinario:</b> para quien demuestra dominio del contenido. Reglas:</p>
         <ul><li>Como máximo <b>3 asignaturas</b> en toda la carrera, un único intento por asignatura.</li>
         <li>No haber desaprobado antes la asignatura ni haber desaprobado por asistencia el semestre anterior; las correlativas deben estar cumplidas.</li>
         <li>No vale para: TFG I y II, Práctica, CCCG, Proyecto de Obras de Tierra, Estructuras de Hormigón, Instalaciones Eléctricas en Edificios, Máquinas Agrícolas III, Proyectos de Construcciones, Proyectos Integrados de Ingeniería y Proyectos de Silos y Depósitos.</li></ul>`
      ] },
    { id: 'laurea', icon: 'cap',
      h: ['Láurea acadêmica', 'Academic honors', 'Mención académica'],
      s: ['Para quem se destaca', 'For outstanding students', 'Para quien se destaca'],
      b: [
        `<p>Menção concedida a quem conclui o curso com desempenho excepcional. Requisitos:</p>
         <ul><li>Média das notas ≥ <b>8,5</b> e nota do TCC II ≥ <b>9,0</b>;</li><li>No máximo <b>1</b> reprovação ou trancamento parcial;</li>
         <li>Pelo menos <b>180 h de ACG</b> e <b>300 h de CCCG</b>;</li><li>Concluir em até <b>10 semestres</b>;</li><li>Assiduidade, responsabilidade, ética e respeito às normas.</li></ul>
         <p class="muted">O NDE seleciona os candidatos e a Comissão de Curso concede a láurea.</p>`,
        `<p>An honor granted to those who complete the program with outstanding performance. Requirements:</p>
         <ul><li>Grade average ≥ <b>8.5</b> and Thesis II grade ≥ <b>9.0</b>;</li><li>At most <b>1</b> failure or partial withdrawal;</li>
         <li>At least <b>180 h of activities (ACG)</b> and <b>300 h of electives (CCCG)</b>;</li><li>Finish within <b>10 semesters</b>;</li><li>Attendance, responsibility, ethics and respect for the rules.</li></ul>
         <p class="muted">The NDE selects candidates and the Program Committee grants the honor.</p>`,
        `<p>Distinción otorgada a quien termina la carrera con un desempeño excepcional. Requisitos:</p>
         <ul><li>Promedio ≥ <b>8,5</b> y nota del TFG II ≥ <b>9,0</b>;</li><li>Como máximo <b>1</b> desaprobación o baja parcial;</li>
         <li>Al menos <b>180 h de ACG</b> y <b>300 h de CCCG</b>;</li><li>Terminar en hasta <b>10 semestres</b>;</li><li>Asiduidad, responsabilidad, ética y respeto a las normas.</li></ul>
         <p class="muted">El NDE selecciona a los candidatos y la Comisión de Carrera otorga la mención.</p>`
      ] },
    { id: 'ingresso', icon: 'door',
      h: ['Como entrar no curso', 'How to get in', 'Cómo ingresar'],
      s: ['25 vagas por ano', '25 seats per year', '25 vacantes por año'],
      b: [
        `<ul><li><b>SiSU</b>, com a nota do ENEM;</li><li><b>Notas do ensino médio</b>;</li><li><b>Processo Seletivo Complementar (PSC)</b> — para vagas remanescentes, reingresso, transferência e portadores de diploma.</li></ul>
         <p>Uma turma por ano, turno integral, no Campus Alegrete (Av. Tiarajú, 810).</p>`,
        `<ul><li><b>SiSU</b>, with the ENEM score;</li><li><b>High-school grades</b>;</li><li><b>Complementary Selection Process (PSC)</b> — for remaining seats, re-entry, transfers and degree holders.</li></ul>
         <p>One class per year, full-time, at the Alegrete Campus (Av. Tiarajú, 810).</p>`,
        `<ul><li><b>SiSU</b>, con la nota del ENEM;</li><li><b>Notas de la secundaria</b>;</li><li><b>Proceso Selectivo Complementario (PSC)</b> — para vacantes remanentes, reingreso, transferencia y graduados.</li></ul>
         <p>Una cohorte por año, jornada completa, en el Campus Alegrete (Av. Tiarajú, 810).</p>`
      ] },
    { id: 'apoio', icon: 'heart',
      h: ['Onde encontro apoio?', 'Where can I find support?', '¿Dónde encuentro apoyo?'],
      s: ['Você não está sozinho(a)', 'You are not alone', 'No estás solo/a'],
      b: [
        `<ul><li><b>Coordenação do Curso</b> — dúvidas sobre matrícula, grade, aproveitamentos e regras.</li>
         <li><b>NuDE</b> (Núcleo de Desenvolvimento Educacional) — apoio pedagógico e acompanhamento.</li>
         <li><b>NInA</b> (Núcleo de Inclusão e Acessibilidade) — intérprete de Libras, assistentes sociais, fonoaudióloga e recursos de tecnologia assistiva. A Unipampa prevê percursos formativos flexíveis para estudantes com deficiência.</li>
         <li><b>PRAEC</b> — programas de assistência estudantil (auxílios e permanência).</li>
         <li><b>Monitorias</b> e <b>Moodle</b> — reforço nas disciplinas e materiais online.</li></ul>
         <div class="callout green">Dica de quem já passou por aqui: o começo tem muita matemática e física. Isso é normal! Forme grupos de estudo, use as monitorias e procure os professores cedo.</div>`,
        `<ul><li><b>Program Coordination</b> — questions about enrollment, plan, credit transfers and rules.</li>
         <li><b>NuDE</b> (Educational Development Office) — pedagogical support and follow-up.</li>
         <li><b>NInA</b> (Inclusion & Accessibility Office) — sign-language interpreter, social workers, speech therapist and assistive technology. Unipampa provides flexible learning paths for students with disabilities.</li>
         <li><b>PRAEC</b> — student assistance programs (grants and retention).</li>
         <li><b>Tutoring</b> and <b>Moodle</b> — extra help in courses and online materials.</li></ul>
         <div class="callout green">Tip from those who have been there: the beginning has a lot of math and physics. That is normal! Form study groups, use tutoring and reach out to professors early.</div>`,
        `<ul><li><b>Coordinación de la Carrera</b> — dudas sobre inscripción, plan, equivalencias y reglas.</li>
         <li><b>NuDE</b> (Núcleo de Desarrollo Educativo) — apoyo pedagógico y seguimiento.</li>
         <li><b>NInA</b> (Núcleo de Inclusión y Accesibilidad) — intérprete de Libras, trabajadores sociales, fonoaudióloga y tecnología asistiva. La Unipampa prevé trayectos formativos flexibles para estudiantes con discapacidad.</li>
         <li><b>PRAEC</b> — programas de asistencia estudiantil (ayudas y permanencia).</li>
         <li><b>Ayudantías</b> y <b>Moodle</b> — refuerzo en las asignaturas y materiales en línea.</li></ul>
         <div class="callout green">Consejo de quien ya pasó por acá: el comienzo tiene mucha matemática y física. ¡Es normal! Armá grupos de estudio, usá las ayudantías y buscá a los docentes temprano.</div>`
      ] },
    { id: 'quem', icon: 'users',
      h: ['Quem é quem no curso', 'Who is who', 'Quién es quién'],
      s: ['Conforme o PPC (2024)', 'According to the PPC (2024)', 'Según el PPC (2024)'],
      b: [
        `<ul><li><b>Coordenadora:</b> Profa. Dra. Eracilda Fontanela</li><li><b>Coordenadora substituta:</b> Profa. Dra. Chaiane Guerra da Conceição</li>
         <li><b>NDE:</b> Eracilda Fontanela, Chaiane Guerra da Conceição, Fátima Cibele Soares, Vilnei de Oliveira Dias e Wilber Feliciano Chambi Tapahuasco</li></ul>
         <p class="muted">A composição pode mudar; confira no site oficial da Unipampa.</p>`,
        `<ul><li><b>Coordinator:</b> Prof. Dr. Eracilda Fontanela</li><li><b>Deputy coordinator:</b> Prof. Dr. Chaiane Guerra da Conceição</li>
         <li><b>NDE:</b> Eracilda Fontanela, Chaiane Guerra da Conceição, Fátima Cibele Soares, Vilnei de Oliveira Dias and Wilber Feliciano Chambi Tapahuasco</li></ul>
         <p class="muted">Membership may change; check Unipampa’s official website.</p>`,
        `<ul><li><b>Coordinadora:</b> Prof. Dra. Eracilda Fontanela</li><li><b>Coordinadora suplente:</b> Prof. Dra. Chaiane Guerra da Conceição</li>
         <li><b>NDE:</b> Eracilda Fontanela, Chaiane Guerra da Conceição, Fátima Cibele Soares, Vilnei de Oliveira Dias y Wilber Feliciano Chambi Tapahuasco</li></ul>
         <p class="muted">La composición puede cambiar; consultá el sitio oficial de la Unipampa.</p>`
      ] }
  ];

  function render() {
    const openIds = new Set([...document.querySelectorAll('#guide details[open]')].map(d => d.id));
    document.getElementById('toc').innerHTML = S.map(s => `<a class="chip toggle" href="#${s.id}">${pick(s.h)}</a>`).join('');
    document.getElementById('guide').innerHTML = S.map((s, i) => `
      <details class="acc reveal" id="${s.id}"${openIds.has(s.id) || (!openIds.size && i === 0) ? ' open' : ''}>
        <summary><span class="a-ico">${ICONS[s.icon]}</span><span>${pick(s.h)}<small>${pick(s.s)}</small></span><span class="chev">${ICONS.chevron}</span></summary>
        <div class="acc-body">${pick(s.b)}</div></details>`).join('');
    document.querySelectorAll('#toc a').forEach(a => a.addEventListener('click', () => {
      const d = document.querySelector(a.getAttribute('href')); if (d) d.open = true;
    }));
    EA.initReveal(document.getElementById('guide'));
    const h = location.hash.slice(1); const d = h && document.getElementById(h);
    if (d && d.tagName === 'DETAILS') d.open = true;
  }

  document.addEventListener('ea:ready', render);
  document.addEventListener('langchange', render);
})();
