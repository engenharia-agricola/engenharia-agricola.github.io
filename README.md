# Engenharia Agrícola · Unipampa — PPC interativo

Site estático e trilíngue (PT · EN · ES) que explica o **Projeto Pedagógico do Curso (PPC) de Engenharia Agrícola** da Unipampa – Campus Alegrete (PPC 2014, atualização de maio/2024, versão de junho/2024) para estudantes que estão começando a graduação.

| Página | O que tem |
| --- | --- |
| `index.html` | Visão geral: clipe do curso em duas versões (com legendas), números do curso, jornada animada do 1º ao 10º semestre, divisão das 3.985 h, requisitos para se formar e “dicionário do calouro”. |
| `matriz.html` | Matriz curricular por semestre com mapa de pré-requisitos (linhas animadas), ementas, filtros por área e catálogo das 48 CCCGs. Link direto para uma disciplina: `matriz.html?c=AL0010`. |
| `grade.html` | “Monte sua grade”: planejamento por semestre (arrastar/soltar ou botão +), validação de pré-requisitos e limites de 120–540 h, escolha de CCCGs, calculadora de ACGs com a tabela do PPC, checklist de formatura e láurea. Salvo no `localStorage`; exporta em PDF, PNG, XLSX, CSV e JSON (o JSON pode ser importado de volta). XLSX e PDF usam SheetJS e jsPDF, carregados do cdnjs só quando o usuário exporta. |
| `carreira.html` | Campos de atuação do Engenheiro Agrícola: cena animada, cadeia “do campo à mesa”, seis áreas com disciplinas relacionadas, teste vocacional, mercado de trabalho e competências das DCNs. |
| `evolucao.html` | Evolução do PPC de 2013 a 2024: linha do tempo das cinco versões, composição da carga horária, ficha técnica, mudanças nas disciplinas, sugestões sobre IA e links para os PDFs de todas as versões (`evolucao.html#documentos`). Conteúdo só em português. |
| `futuro.html` | Proposta exploratória de PPC para 2027 em diante, pensado para um mundo com IA: princípios, perfil do egresso, carga de 3.900 h, matriz em quatro ciclos com filtro por tipo de componente, eixo de dados e IA, ateliês de projeto, trilhas, níveis de uso de IA na avaliação, implantação e riscos. Conteúdo só em português; não é documento oficial. |
| `tecnologias.html` | IA no campo: catálogo de 24 tecnologias baseadas em IA por área do EA e estágio no Brasil (com filtros), mapa maturidade × impacto, tarefas que encolhem, mudam ou surgem, três horizontes de futuro, barreiras, contexto do Pampa e como se preparar. Fica no rodapé, não no menu do topo. Conteúdo só em português. |
| `horarios.html` | Horários, salas e professores das turmas de EA de 2018/2 a 2026/2 (16 semestres, extraídos dos PDFs do campus), com vista semanal por semestre do curso, lista filtrável (inclusive todos os semestres juntos) e relação dos docentes do curso com link para a página de cada um na Unipampa e para o Lattes. Fica no rodapé. Link direto para uma busca: `horarios.html?q=Vilnei`. Conteúdo só em português. |
| `guia.html` | Regras do curso em linguagem simples: aprovação, carga por semestre, trancamento, CCCG, ACG, TCC, estágio, dispensa, láurea, ingresso e apoio ao estudante. |

O idioma pode ser escolhido no topo da página ou pela URL (`?lang=pt|en|es`).

## Estrutura

```
assets/css/style.css     estilos (tema claro/escuro, animações)
assets/js/app.js         núcleo: idiomas, tema, cabeçalho/rodapé, ícones, áreas
assets/js/course-ui.js   painel com detalhes da disciplina
assets/js/*.js           um script por página (textos traduzidos ficam junto)
assets/video/            clipe do curso em duas versões (MP4 720p), pôsteres e legendas WebVTT (compartilhadas)
ppc/                     PDFs de todas as versões do PPC (ppc_engenharia_agricola_<ano>.pdf; 2023 tem _03 e _12)
data/courses.js          disciplinas extraídas do PPC (nome, CH, T/P, pré-requisitos, ementa em PT/EN/ES)
data/horarios.js         turmas de EA por semestre (disciplina, turma, professor, sala, horário) e docentes do curso
tools/                   scripts usados para extrair os dados do PDF do PPC e dos PDFs de horários (horarios_*.py)
```

Não há etapa de build: basta publicar a pasta no GitHub Pages (o arquivo `.nojekyll` já está incluído). Para testar localmente: `python3 -m http.server` e abrir `http://localhost:8000`.

## Atualizando os dados quando o PPC mudar

1. `pdftotext -layout PPC.pdf ppc.txt`
2. `python3 tools/parse.py ppc.txt comps.json` — lê os blocos “Identificação do componente curricular”.
3. `python3 tools/build.py comps.json courses.json` — aplica semestres (Quadro 7), núcleos, áreas e resolve os pré-requisitos (confira as mensagens `UNRESOLVED`).
4. Traduza nomes e ementas para `tr_en.json` / `tr_es.json` (mesmas chaves) e rode `python3 tools/merge.py courses.json tr_en.json tr_es.json data/courses.js`.

As traduções de ementas para inglês e espanhol são livres; o texto oficial é o do PPC em português.

> Site informativo e não oficial. Em caso de divergência, valem o PPC e as decisões da Coordenação/Comissão do Curso.
