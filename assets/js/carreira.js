/* Página de campos de atuação do Engenheiro Agrícola. */
(function () {
  'use strict';
  const { add, t, L, DATA, ICONS, esc } = EA;
  const li = () => ['pt', 'en', 'es'].indexOf(EA.lang);
  const pick = arr => arr[li()] !== undefined ? arr[li()] : arr[0];

  add({
    'cr.title': ['Carreira', 'Career', 'Carrera'],
    'cr.eyebrow': ['Campos de atuação', 'Career paths', 'Campos de actuación'],
    'cr.h1a': ['Quem projeta o campo do futuro trabalha com', 'Those who design tomorrow’s farms work with', 'Quien diseña el campo del futuro trabaja con'],
    'cr.lead': [
      'O(a) engenheiro(a) agrícola une engenharia e agricultura: projeta máquinas, sistemas de irrigação, armazéns, instalações rurais e fontes de energia para produzir mais alimento, com menos água, menos perdas e mais sustentabilidade.',
      'Agricultural engineers bring engineering and agriculture together: they design machines, irrigation systems, storage facilities, rural buildings and energy sources to produce more food with less water, fewer losses and more sustainability.',
      'El/la ingeniero/a agrícola une ingeniería y agricultura: diseña máquinas, sistemas de riego, depósitos, instalaciones rurales y fuentes de energía para producir más alimentos, con menos agua, menos pérdidas y más sustentabilidad.'
    ],
    'cr.cta.quiz': ['Descubra sua área', 'Find your area', 'Descubrí tu área'],
    'cr.cta.areas': ['Ver as áreas', 'See the areas', 'Ver las áreas'],

    'cr.w.eyebrow': ['Por que importa', 'Why it matters', 'Por qué importa'],
    'cr.w.h2': ['Uma profissão no centro dos grandes desafios', 'A profession at the heart of big challenges', 'Una profesión en el centro de los grandes desafíos'],
    'cr.w.lead': [
      'Alimentar pessoas, cuidar da água, gerar energia limpa e proteger o solo: todos esses desafios passam por soluções de engenharia no meio rural.',
      'Feeding people, caring for water, generating clean energy and protecting soil: all of these challenges depend on engineering solutions in rural areas.',
      'Alimentar a las personas, cuidar el agua, generar energía limpia y proteger el suelo: todos estos desafíos pasan por soluciones de ingeniería en el medio rural.'
    ],

    'cr.c.eyebrow': ['Do campo à mesa', 'From farm to table', 'Del campo a la mesa'],
    'cr.c.h2': ['Em cada etapa, um(a) engenheiro(a) agrícola', 'At every stage, an agricultural engineer', 'En cada etapa, un/a ingeniero/a agrícola'],
    'cr.c.lead': ['Acompanhe o caminho do alimento e veja onde a profissão entra em ação.', 'Follow the path of food and see where the profession comes into play.', 'Seguí el camino del alimento y mirá dónde entra en acción la profesión.'],

    'cr.a.eyebrow': ['Áreas de atuação', 'Fields of work', 'Áreas de actuación'],
    'cr.a.h2': ['Seis caminhos, muitas possibilidades', 'Six paths, many possibilities', 'Seis caminos, muchas posibilidades'],
    'cr.a.lead': [
      'O curso forma um(a) profissional generalista nas grandes áreas da Engenharia Agrícola. Você pode atuar em uma delas ou combinar várias.',
      'The program trains well-rounded professionals in the core areas of Agricultural Engineering. You can work in one of them or combine several.',
      'La carrera forma profesionales generalistas en las grandes áreas de la Ingeniería Agrícola. Podés trabajar en una de ellas o combinar varias.'
    ],
    'cr.a.do': ['O que você faz', 'What you do', 'Qué hacés'],
    'cr.a.courses': ['Disciplinas relacionadas', 'Related courses', 'Asignaturas relacionadas'],

    'cr.q.eyebrow': ['Teste rápido', 'Quick quiz', 'Test rápido'],
    'cr.q.h2': ['Qual área combina com você?', 'Which area suits you?', '¿Qué área va con vos?'],
    'cr.q.lead': ['5 perguntas, sem resposta certa. Só para inspirar!', '5 questions, no right answers. Just for inspiration!', '5 preguntas, sin respuestas correctas. ¡Solo para inspirarte!'],
    'cr.q.of': ['Pergunta {i} de {n}', 'Question {i} of {n}', 'Pregunta {i} de {n}'],
    'cr.q.result': ['Sua área com mais afinidade é…', 'Your best-matching area is…', 'Tu área con más afinidad es…'],
    'cr.q.cccg': ['CCCGs que podem te interessar:', 'Electives you might like:', 'CCCG que te pueden interesar:'],
    'cr.q.again': ['Refazer o teste', 'Retake the quiz', 'Repetir el test'],
    'cr.q.plan': ['Montar minha grade', 'Build my plan', 'Armar mi plan'],
    'cr.q.back': ['← Voltar', '← Back', '← Volver'],

    'cr.e.eyebrow': ['Mercado de trabalho', 'Job market', 'Mercado laboral'],
    'cr.e.h2': ['Onde o(a) engenheiro(a) agrícola trabalha', 'Where agricultural engineers work', 'Dónde trabaja el/la ingeniero/a agrícola'],
    'cr.e.lead': [
      'Segundo o PPC, o egresso está preparado para atuar em empresas públicas e privadas, em empreendimento próprio ou como autônomo — no mercado regional e nacional.',
      'According to the PPC, graduates are prepared to work in public and private companies, in their own business or as freelancers — in regional and national markets.',
      'Según el PPC, el egresado está preparado para trabajar en empresas públicas y privadas, en emprendimientos propios o de forma independiente — en el mercado regional y nacional.'
    ],
    'cr.s.eyebrow': ['Competências', 'Competences', 'Competencias'],
    'cr.s.h2': ['O que você vai saber fazer', 'What you will be able to do', 'Lo que vas a saber hacer'],
    'cr.s.lead': ['Competências previstas nas Diretrizes Curriculares Nacionais de Engenharia Agrícola (Resolução CNE/CES nº 2/2006).', 'Competences set by Brazil’s National Curriculum Guidelines for Agricultural Engineering (CNE/CES Resolution 2/2006).', 'Competencias previstas en las Directrices Curriculares Nacionales de Ingeniería Agrícola de Brasil (Resolución CNE/CES n.º 2/2006).'],
    'cr.j.h2': ['Quer ser engenheiro(a) agrícola?', 'Want to become an agricultural engineer?', '¿Querés ser ingeniero/a agrícola?'],
    'cr.j.p': [
      'São 25 vagas por ano no Campus Alegrete (RS), em turno integral. O ingresso é pelo SiSU (nota do ENEM), por notas do ensino médio ou pelo Processo Seletivo Complementar. Alegrete fica no coração do Pampa, perto do Uruguai e da Argentina, em uma região movida a arroz, soja, milho, trigo e pecuária.',
      'There are 25 seats per year at the Alegrete Campus (RS, Brazil), full-time. Admission is through SiSU (ENEM score), high-school grades or the Complementary Selection Process. Alegrete lies in the heart of the Pampa, close to Uruguay and Argentina, in a region driven by rice, soybeans, corn, wheat and livestock.',
      'Hay 25 vacantes por año en el Campus Alegrete (RS, Brasil), en jornada completa. El ingreso es por SiSU (nota del ENEM), por notas de la secundaria o por el Proceso Selectivo Complementario. Alegrete está en el corazón del Pampa, cerca de Uruguay y Argentina, en una región impulsada por arroz, soja, maíz, trigo y ganadería.'
    ],
    'cr.j.sisu': ['Conheça o SiSU ↗', 'About SiSU ↗', 'Conocé el SiSU ↗'],
    'cr.j.matrix': ['Ver o que vou estudar', 'See what I will study', 'Ver qué voy a estudiar']
  });

  const WORDS = [
    ['drones', 'drones', 'drones'], ['pivôs de irrigação', 'irrigation pivots', 'pivotes de riego'], ['silos inteligentes', 'smart silos', 'silos inteligentes'],
    ['energia solar', 'solar power', 'energía solar'], ['tratores autônomos', 'autonomous tractors', 'tractores autónomos'],
    ['agricultura de precisão', 'precision agriculture', 'agricultura de precisión'], ['barragens', 'dams', 'represas'], ['biodigestores', 'biodigesters', 'biodigestores'],
    ['sensores e satélites', 'sensors & satellites', 'sensores y satélites']
  ];

  const WHY = [
    ['plate', ['Alimento', 'Food', 'Alimentos'], ['O Brasil é um dos maiores produtores de alimentos do mundo — e cada safra depende de máquinas, água e armazenagem bem projetadas.', 'Brazil is one of the world’s largest food producers — and every harvest depends on well-designed machinery, water and storage.', 'Brasil es uno de los mayores productores de alimentos del mundo — y cada cosecha depende de máquinas, agua y almacenamiento bien diseñados.']],
    ['drop', ['Água', 'Water', 'Agua'], ['A agricultura irrigada é a maior usuária de água doce do planeta. Projetar irrigação eficiente é cuidar de um recurso vital.', 'Irrigated agriculture is the largest user of fresh water on the planet. Designing efficient irrigation means caring for a vital resource.', 'La agricultura bajo riego es la mayor usuaria de agua dulce del planeta. Diseñar riego eficiente es cuidar un recurso vital.']],
    ['bolt', ['Energia', 'Energy', 'Energía'], ['Eletrificação rural, energia solar, eólica e biomassa: o campo também gera energia — e precisa usá-la bem.', 'Rural electrification, solar, wind and biomass: farms also generate energy — and need to use it well.', 'Electrificación rural, energía solar, eólica y biomasa: el campo también genera energía — y necesita usarla bien.']],
    ['leaf', ['Sustentabilidade', 'Sustainability', 'Sustentabilidad'], ['Conservação do solo, manejo de bacias, tratamento de resíduos e reuso de água: produzir protegendo o ambiente.', 'Soil conservation, watershed management, waste treatment and water reuse: producing while protecting the environment.', 'Conservación del suelo, manejo de cuencas, tratamiento de residuos y reúso del agua: producir protegiendo el ambiente.']]
  ];

  const CHAIN = [
    ['drop', ['Solo e água', 'Soil & water', 'Suelo y agua'], ['topografia, conservação, barragens', 'surveying, conservation, dams', 'topografía, conservación, represas']],
    ['tractor', ['Plantio', 'Planting', 'Siembra'], ['máquinas e agricultura de precisão', 'machinery & precision ag', 'máquinas y agricultura de precisión']],
    ['sprout', ['Cultivo', 'Growing', 'Cultivo'], ['irrigação, drenagem, clima', 'irrigation, drainage, climate', 'riego, drenaje, clima']],
    ['gear', ['Colheita', 'Harvest', 'Cosecha'], ['colhedoras e logística', 'harvesters & logistics', 'cosechadoras y logística']],
    ['silo', ['Pós-colheita', 'Post-harvest', 'Poscosecha'], ['secagem, aeração, silos', 'drying, aeration, silos', 'secado, aireación, silos']],
    ['factory', ['Agroindústria', 'Agro-industry', 'Agroindustria'], ['processamento, energia, resíduos', 'processing, energy, waste', 'procesamiento, energía, residuos']],
    ['plate', ['Mesa', 'Table', 'Mesa'], ['alimento seguro e de qualidade', 'safe, quality food', 'alimento seguro y de calidad']]
  ];

  const AREAS6 = [
    { key: 'mach', short: ['Máquinas', 'Machinery', 'Máquinas'], match: ['mach'], icon: 'tractor',
      name: ['Mecanização e máquinas agrícolas', 'Mechanization & farm machinery', 'Mecanización y máquinas agrícolas'],
      desc: ['Projeto, fabricação, manutenção e operação de tratores, implementos e colhedoras — incluindo automação e agricultura de precisão.', 'Design, manufacturing, maintenance and operation of tractors, implements and harvesters — including automation and precision agriculture.', 'Diseño, fabricación, mantenimiento y operación de tractores, implementos y cosechadoras — incluyendo automatización y agricultura de precisión.'],
      dos: [['Dimensionar a frota de máquinas de uma fazenda', 'Size the machinery fleet of a farm', 'Dimensionar la flota de máquinas de un establecimiento'], ['Desenvolver implementos na indústria', 'Develop implements in industry', 'Desarrollar implementos en la industria'], ['Ajustar pulverizadores e semeadoras', 'Calibrate sprayers and seeders', 'Calibrar pulverizadoras y sembradoras']] },
    { key: 'water', short: ['Água e solo', 'Water & soil', 'Agua y suelo'], match: ['water'], icon: 'drop',
      name: ['Engenharia de água e solo', 'Water & soil engineering', 'Ingeniería de agua y suelo'],
      desc: ['Irrigação, drenagem, hidrologia, manejo de bacias hidrográficas, conservação do solo e obras de terra como barragens e açudes.', 'Irrigation, drainage, hydrology, watershed management, soil conservation and earthworks such as dams and reservoirs.', 'Riego, drenaje, hidrología, manejo de cuencas, conservación del suelo y obras de tierra como represas y tajamares.'],
      dos: [['Projetar um pivô central ou irrigação por gotejamento', 'Design a center pivot or drip irrigation system', 'Diseñar un pivote central o riego por goteo'], ['Planejar a lavoura de arroz irrigado', 'Plan irrigated rice fields', 'Planificar arrozales bajo riego'], ['Projetar pequenas barragens', 'Design small dams', 'Diseñar pequeñas represas']] },
    { key: 'build', short: ['Construções', 'Buildings', 'Construcciones'], match: ['build'], icon: 'house',
      name: ['Construções rurais e ambiência', 'Rural buildings & environmental control', 'Construcciones rurales y ambiente'],
      desc: ['Galpões, aviários, estábulos, estufas e armazéns: estruturas em concreto, aço e madeira com conforto térmico para animais e plantas.', 'Sheds, poultry houses, barns, greenhouses and warehouses: concrete, steel and timber structures with thermal comfort for animals and plants.', 'Galpones, galpones avícolas, establos, invernaderos y depósitos: estructuras de hormigón, acero y madera con confort térmico para animales y plantas.'],
      dos: [['Projetar um aviário climatizado', 'Design a climate-controlled poultry house', 'Diseñar un galpón avícola climatizado'], ['Calcular estruturas de galpões', 'Calculate shed structures', 'Calcular estructuras de galpones'], ['Fiscalizar obras rurais', 'Inspect rural construction', 'Fiscalizar obras rurales']] },
    { key: 'energy', short: ['Energia', 'Energy', 'Energía'], match: ['energy'], icon: 'bolt',
      name: ['Energização rural', 'Rural energy', 'Energización rural'],
      desc: ['Instalações elétricas, motores, fontes renováveis (solar, eólica, biomassa) e eficiência energética em propriedades e agroindústrias.', 'Electrical installations, motors, renewable sources (solar, wind, biomass) and energy efficiency on farms and in agro-industries.', 'Instalaciones eléctricas, motores, fuentes renovables (solar, eólica, biomasa) y eficiencia energética en establecimientos y agroindustrias.'],
      dos: [['Projetar uma usina solar para a fazenda', 'Design a solar plant for a farm', 'Diseñar una planta solar para el campo'], ['Fazer diagnóstico energético', 'Carry out energy audits', 'Realizar diagnósticos energéticos'], ['Projetar instalações elétricas rurais', 'Design rural electrical installations', 'Diseñar instalaciones eléctricas rurales']] },
    { key: 'post', short: ['Pós-colheita', 'Post-harvest', 'Poscosecha'], match: ['post'], icon: 'silo',
      name: ['Pós-colheita e processamento', 'Post-harvest & processing', 'Poscosecha y procesamiento'],
      desc: ['Secagem, aeração, armazenamento, beneficiamento e classificação de grãos e sementes, garantindo qualidade e reduzindo perdas.', 'Drying, aeration, storage, processing and grading of grains and seeds, ensuring quality and reducing losses.', 'Secado, aireación, almacenamiento, acondicionamiento y clasificación de granos y semillas, garantizando calidad y reduciendo pérdidas.'],
      dos: [['Projetar silos e unidades armazenadoras', 'Design silos and storage units', 'Diseñar silos y plantas de acopio'], ['Gerenciar secadores em cooperativas', 'Manage dryers in cooperatives', 'Gestionar secadoras en cooperativas'], ['Controlar a qualidade de grãos', 'Control grain quality', 'Controlar la calidad de granos']] },
    { key: 'geo', short: ['Geo e ambiente', 'Geo & environment', 'Geo y ambiente'], match: ['geo', 'env'], icon: 'satellite',
      name: ['Geotecnologias e meio ambiente', 'Geotechnologies & environment', 'Geotecnologías y medio ambiente'],
      desc: ['Topografia, GPS, sensoriamento remoto e geoprocessamento para mapear lavouras, além de gestão ambiental, licenciamento e tratamento de resíduos.', 'Surveying, GPS, remote sensing and GIS to map fields, plus environmental management, licensing and waste treatment.', 'Topografía, GPS, teledetección y geoprocesamiento para mapear lotes, además de gestión ambiental, licenciamiento y tratamiento de residuos.'],
      dos: [['Gerar mapas de produtividade com drones', 'Create yield maps with drones', 'Generar mapas de rendimiento con drones'], ['Fazer laudos e perícias', 'Prepare technical reports and expert opinions', 'Elaborar informes y peritajes'], ['Licenciar e tratar resíduos agroindustriais', 'License and treat agro-industrial waste', 'Licenciar y tratar residuos agroindustriales']] }
  ];

  const EMPLOYERS = [
    ['factory', ['Empresas agroindustriais', 'Agro-industrial companies', 'Empresas agroindustriales'], ['frigoríficos, engenhos, processadoras', 'meatpackers, mills, processors', 'frigoríficos, molinos, procesadoras']],
    ['users', ['Cooperativas agrícolas', 'Agricultural cooperatives', 'Cooperativas agrícolas'], ['assistência técnica, armazenagem, insumos', 'technical assistance, storage, inputs', 'asistencia técnica, acopio, insumos']],
    ['building', ['Órgãos governamentais', 'Government agencies', 'Organismos gubernamentales'], ['pesquisa, extensão rural, fiscalização', 'research, rural extension, inspection', 'investigación, extensión rural, fiscalización']],
    ['tractor', ['Indústria de máquinas', 'Machinery industry', 'Industria de maquinaria'], ['projeto, fabricação, pós-venda', 'design, manufacturing, after-sales', 'diseño, fabricación, posventa']],
    ['house', ['Instalações rurais', 'Rural facilities', 'Instalaciones rurales'], ['projeto, execução e fiscalização', 'design, construction and inspection', 'diseño, ejecución y fiscalización']],
    ['drop', ['Irrigação e drenagem', 'Irrigation & drainage', 'Riego y drenaje'], ['projetos de infraestrutura hídrica', 'water infrastructure projects', 'proyectos de infraestructura hídrica']],
    ['bolt', ['Energia no meio rural', 'Rural energy', 'Energía rural'], ['eletrificação e renováveis', 'electrification & renewables', 'electrificación y renovables']],
    ['flask', ['Pesquisa e desenvolvimento', 'Research & development', 'Investigación y desarrollo'], ['projetos de extensão, pesquisa e inovação', 'outreach, research and innovation projects', 'proyectos de extensión, investigación e innovación']],
    ['file', ['Consultorias e perícias', 'Consulting & expert reports', 'Consultorías y peritajes'], ['laudos, avaliações, assessoria', 'reports, appraisals, advisory', 'informes, tasaciones, asesoría']],
    ['rocket', ['Empreendimento próprio', 'Your own business', 'Emprendimiento propio'], ['startups de agtech, serviços técnicos', 'agtech startups, technical services', 'startups agtech, servicios técnicos']],
    ['cap', ['Ensino superior', 'Higher education', 'Educación superior'], ['docência e formação técnica', 'teaching and technical training', 'docencia y formación técnica']],
    ['book', ['Pós-graduação', 'Graduate studies', 'Posgrado'], ['mestrado e doutorado', 'master’s and PhD', 'maestría y doctorado']]
  ];

  const SKILLS = [
    ['planejar e projetar', 'plan and design', 'planificar y diseñar'], ['estudar viabilidade técnica e econômica', 'assess technical & economic feasibility', 'estudiar viabilidad técnica y económica'],
    ['assessoria e consultoria', 'advisory & consulting', 'asesoría y consultoría'], ['vistoria, perícia e laudos', 'inspections, expert reports', 'inspecciones, peritajes e informes'],
    ['dirigir empresas', 'run companies', 'dirigir empresas'], ['controle de qualidade', 'quality control', 'control de calidad'],
    ['ensino, pesquisa e extensão', 'teaching, research & outreach', 'enseñanza, investigación y extensión'], ['desenvolver novas tecnologias', 'develop new technologies', 'desarrollar nuevas tecnologías'],
    ['gerenciar e operar sistemas', 'manage & operate systems', 'gestionar y operar sistemas'], ['comunicar-se bem', 'communicate effectively', 'comunicarse bien'],
    ['trabalhar em equipes multidisciplinares', 'work in multidisciplinary teams', 'trabajar en equipos multidisciplinarios'], ['avaliar impactos socioambientais', 'assess social & environmental impacts', 'evaluar impactos socioambientales'],
    ['atuar no agronegócio', 'work in agribusiness', 'actuar en el agronegocio'], ['espírito empreendedor', 'entrepreneurial spirit', 'espíritu emprendedor'],
    ['influenciar políticas públicas', 'influence public policy', 'influir en políticas públicas'], ['identificar problemas e propor soluções', 'identify problems & propose solutions', 'identificar problemas y proponer soluciones']
  ];

  const QUIZ = [
    { q: ['Num sábado livre, você prefere…', 'On a free Saturday, you would rather…', 'Un sábado libre, preferís…'], o: [
      ['🔧', ['desmontar e consertar um motor', 'take apart and fix an engine', 'desarmar y arreglar un motor'], { mach: 2 }],
      ['💧', ['montar uma horta com gotejamento', 'set up a garden with drip irrigation', 'armar una huerta con goteo'], { water: 2 }],
      ['📐', ['desenhar a planta de uma casa', 'draw the floor plan of a house', 'dibujar el plano de una casa'], { build: 2 }],
      ['☀️', ['instalar um painel solar', 'install a solar panel', 'instalar un panel solar'], { energy: 2 }],
      ['🌾', ['visitar uma cooperativa cheia de silos', 'visit a cooperative full of silos', 'visitar una cooperativa llena de silos'], { post: 2 }],
      ['🛰️', ['pilotar um drone e fazer mapas', 'fly a drone and make maps', 'volar un dron y hacer mapas'], { geo: 2 }]] },
    { q: ['Que problema você gostaria de resolver?', 'Which problem would you like to solve?', '¿Qué problema te gustaría resolver?'], o: [
      ['🏜️', ['Falta de água na estiagem', 'Water shortage during droughts', 'Falta de agua en la sequía'], { water: 2 }],
      ['🐛', ['Grãos estragando no armazém', 'Grain spoiling in storage', 'Granos que se pierden en el depósito'], { post: 2 }],
      ['🐔', ['Animais sofrendo com calor', 'Animals suffering from heat', 'Animales sufriendo por el calor'], { build: 2 }],
      ['💸', ['Conta de luz alta no campo', 'High electricity bills on farms', 'Factura de luz alta en el campo'], { energy: 2 }],
      ['🎯', ['Adubo e semente desperdiçados', 'Wasted fertilizer and seed', 'Fertilizante y semilla desperdiciados'], { geo: 1, mach: 1 }],
      ['⛽', ['Máquinas gastando combustível demais', 'Machines burning too much fuel', 'Máquinas que gastan demasiado combustible'], { mach: 2 }]] },
    { q: ['Sua matéria favorita na escola era…', 'Your favorite school subject was…', 'Tu materia favorita en la escuela era…'], o: [
      ['⚙️', ['Física', 'Physics', 'Física'], { mach: 1, energy: 1 }],
      ['➗', ['Matemática', 'Mathematics', 'Matemática'], { build: 1, geo: 1 }],
      ['🧪', ['Química', 'Chemistry', 'Química'], { post: 2 }],
      ['🌱', ['Biologia', 'Biology', 'Biología'], { water: 1, post: 1 }],
      ['🗺️', ['Geografia', 'Geography', 'Geografía'], { geo: 2 }],
      ['🎨', ['Artes e desenho', 'Art and drawing', 'Arte y dibujo'], { build: 2 }]] },
    { q: ['Onde você se imagina trabalhando?', 'Where do you picture yourself working?', '¿Dónde te imaginás trabajando?'], o: [
      ['🚜', ['No campo, junto das máquinas', 'In the field, with the machines', 'En el campo, junto a las máquinas'], { mach: 2 }],
      ['🖥️', ['Num escritório de projetos', 'In a design office', 'En una oficina de proyectos'], { build: 1, energy: 1 }],
      ['🔬', ['Num laboratório de qualidade', 'In a quality lab', 'En un laboratorio de calidad'], { post: 2 }],
      ['📡', ['Medindo e mapeando terrenos', 'Measuring and mapping land', 'Midiendo y mapeando terrenos'], { geo: 2 }],
      ['🌊', ['Cuidando de rios e bacias', 'Caring for rivers and watersheds', 'Cuidando ríos y cuencas'], { water: 2 }],
      ['⚡', ['Numa usina ou subestação', 'At a power plant or substation', 'En una central o subestación'], { energy: 2 }]] },
    { q: ['Que tecnologia mais te empolga?', 'Which technology excites you most?', '¿Qué tecnología te entusiasma más?'], o: [
      ['🤖', ['Tratores autônomos', 'Autonomous tractors', 'Tractores autónomos'], { mach: 2 }],
      ['📟', ['Sensores de umidade do solo', 'Soil moisture sensors', 'Sensores de humedad del suelo'], { water: 2 }],
      ['🌡️', ['Silos com termometria inteligente', 'Silos with smart temperature monitoring', 'Silos con termometría inteligente'], { post: 2 }],
      ['♻️', ['Biodigestores e energia solar', 'Biodigesters and solar power', 'Biodigestores y energía solar'], { energy: 2 }],
      ['🛰️', ['Satélites e imagens de drone', 'Satellites and drone imagery', 'Satélites e imágenes de dron'], { geo: 2 }],
      ['🏗️', ['Galpões climatizados automáticos', 'Automated climate-controlled sheds', 'Galpones climatizados automáticos'], { build: 2 }]] }
  ];

  /* ---------- render ---------- */
  let rotI = 0, rotTimer;
  function rotate() {
    const el = document.getElementById('rotator'); if (!el) return;
    el.innerHTML = `<span>${pick(WORDS[rotI % WORDS.length])}</span>`; rotI++;
  }

  function renderWhy() {
    document.getElementById('why').innerHTML = WHY.map(([ic, h, p], i) =>
      `<div class="card reveal" data-delay="${i}"><div class="tile-ico" style="width:52px;height:52px;border-radius:14px;display:grid;place-items:center;background:var(--brand-soft);color:var(--brand);margin-bottom:12px">${ICONS[ic].replace('<svg', '<svg style="width:26px;height:26px"')}</div><h3>${pick(h)}</h3><p class="muted" style="margin:0">${pick(p)}</p></div>`).join('');
  }

  let chainTimer;
  function renderChain() {
    const box = document.getElementById('chain');
    box.innerHTML = CHAIN.map(([ic, h, s]) => `<div class="link"><div class="orb">${ICONS[ic]}</div><div><b>${pick(h)}</b><small>${pick(s)}</small></div></div>`).join('');
    clearInterval(chainTimer);
    const links = [...box.children]; let i = 0;
    const tick = () => { links.forEach((l, k) => l.classList.toggle('on', k <= i)); i = (i + 1) % (links.length + 2); };
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) links.forEach(l => l.classList.add('on'));
    else {
      const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { tick(); chainTimer = setInterval(tick, 900); io.disconnect(); } }, { threshold: .3 });
      io.observe(box);
    }
  }

  function coursesFor(a) {
    return DATA.courses.filter(c => a.match.includes(c.area));
  }

  function renderAreas() {
    document.getElementById('area-cards').innerHTML = AREAS6.map((a, i) => {
      const cs = coursesFor(a);
      return `<article class="card area-card reveal" data-delay="${i % 3}" data-area="${a.key}" id="area-${a.key}">
        <div class="area-ico">${ICONS[a.icon]}</div>
        <h3>${pick(a.name)}</h3><p class="muted">${pick(a.desc)}</p>
        <b style="font-size:.85rem;text-transform:uppercase;letter-spacing:.06em;color:var(--muted)">${t('cr.a.do')}</b>
        <ul>${a.dos.map(d => `<li>${pick(d)}</li>`).join('')}</ul>
        <details><summary>${t('cr.a.courses')} (${cs.length})</summary>
          <div class="courses">${cs.map(c => `<a href="matriz.html?c=${c.code}" title="${c.type === 'cccg' ? 'CCCG' : t('common.ob')} · ${c.ch} h">${esc(L(c.name))}${c.type === 'cccg' ? ' ★' : ''}</a>`).join('')}</div>
        </details></article>`;
    }).join('');
  }

  function renderEmployers() {
    document.getElementById('employers').innerHTML = EMPLOYERS.map(([ic, h, s], i) =>
      `<div class="card employer reveal" data-delay="${i % 4}"><span class="e-ico">${ICONS[ic]}</span><div><b>${pick(h)}</b><small>${pick(s)}</small></div></div>`).join('');
  }

  function renderSkills() {
    document.getElementById('skills').innerHTML = SKILLS.map(s => `<span>${pick(s)}</span>`).join('');
  }

  /* ---------- quiz ---------- */
  const quiz = { i: 0, score: {}, hist: [] };
  function renderQuiz() {
    const box = document.getElementById('quiz-box');
    if (quiz.i >= QUIZ.length) return renderResult();
    const q = QUIZ[quiz.i];
    box.innerHTML = `<div class="quiz-steps">${QUIZ.map((_, k) => `<i class="${k <= quiz.i ? 'on' : ''}"></i>`).join('')}</div>
      <p class="muted" style="margin:0 0 6px;font-weight:700;font-size:.85rem">${t('cr.q.of', { i: quiz.i + 1, n: QUIZ.length })}</p>
      <div class="quiz-q">${pick(q.q)}</div>
      <div class="quiz-opts">${q.o.map((o, k) => `<button type="button" data-k="${k}"><span class="emo" aria-hidden="true">${o[0]}</span>${pick(o[1])}</button>`).join('')}</div>
      ${quiz.i ? `<button type="button" class="btn btn-ghost btn-sm" id="q-back" style="margin-top:16px">${t('cr.q.back')}</button>` : ''}`;
    box.querySelectorAll('.quiz-opts button').forEach(b => b.addEventListener('click', () => {
      const w = q.o[+b.dataset.k][2]; quiz.hist.push(w);
      for (const k in w) quiz.score[k] = (quiz.score[k] || 0) + w[k];
      quiz.i++; renderQuiz();
    }));
    const back = box.querySelector('#q-back');
    if (back) back.addEventListener('click', () => {
      const w = quiz.hist.pop(); for (const k in w) quiz.score[k] -= w[k]; quiz.i--; renderQuiz();
    });
  }
  function renderResult() {
    const box = document.getElementById('quiz-box');
    const ranked = AREAS6.map(a => ({ a, s: quiz.score[a.key] || 0 })).sort((x, y) => y.s - x.s);
    const top = ranked[0].a; const max = Math.max(1, ranked[0].s);
    const cc = DATA.courses.filter(c => c.type === 'cccg' && top.match.includes(c.area)).slice(0, 6);
    box.innerHTML = `<div class="quiz-result" data-area="${top.key}">
      <p class="muted" style="font-weight:700">${t('cr.q.result')}</p>
      <div class="area-card" style="border:0"><div class="area-ico" style="width:84px;height:84px;margin:0 auto 14px">${ICONS[top.icon]}</div></div>
      <h3 style="font-family:var(--display);font-size:2rem;color:var(--c)">${pick(top.name)}</h3>
      <p class="muted" style="max-width:56ch;margin:0 auto">${pick(top.desc)}</p>
      <div class="bars">${ranked.map(r => `<div data-area="${r.a.key}"><span>${pick(r.a.short)}</span><span class="track"><i style="width:0" data-w="${r.s / max * 100}"></i></span><b>${Math.round(r.s / max * 100)}%</b></div>`).join('')}</div>
      ${cc.length ? `<p style="font-weight:700;margin-bottom:8px">${t('cr.q.cccg')}</p><div class="courses" style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-bottom:20px">${cc.map(c => `<a class="chip" href="matriz.html?c=${c.code}" data-area="${c.area}"><span class="dot"></span>${esc(L(c.name))}</a>`).join('')}</div>` : ''}
      <div class="btn-row" style="justify-content:center"><button type="button" class="btn btn-ghost" id="q-again">${t('cr.q.again')}</button><a class="btn btn-primary" href="grade.html">${t('cr.q.plan')}</a></div></div>`;
    requestAnimationFrame(() => box.querySelectorAll('.bars i').forEach(i => { i.style.width = i.dataset.w + '%'; }));
    box.querySelector('#q-again').addEventListener('click', () => { quiz.i = 0; quiz.score = {}; quiz.hist = []; renderQuiz(); });
  }

  function renderCrops() {
    const g = document.getElementById('crops'); if (!g) return;
    let s = '';
    for (let x = 330; x < 1000; x += 26) s += `<g class="sway" style="animation-delay:${(x % 7) * -.4}s"><path d="M${x} 300 q5 -22 10 0 Z"/></g>`;
    g.innerHTML = s;
  }

  function renderAll() {
    rotate(); renderWhy(); renderChain(); renderAreas(); renderEmployers(); renderSkills(); renderQuiz();
    EA.initReveal(document);
  }

  document.addEventListener('ea:ready', () => {
    renderCrops(); renderAll();
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) rotTimer = setInterval(rotate, 2200);
  });
  document.addEventListener('langchange', renderAll);
})();
