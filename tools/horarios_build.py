"""Normaliza raw.json (nomes de professores e disciplinas), cruza a lista de docentes do curso
(dl/ea-docentes.html, do site do curso) com a lista do campus (dl/lista.html) e grava data/horarios.js."""
import json, re, html, unicodedata, collections
def key(s): return re.sub(r'[^a-z ]', '', unicodedata.normalize('NFD', s).encode('ascii', 'ignore').decode().lower()).strip()
def accents(s): return sum(1 for ch in s if ord(ch) > 127)
raw = json.load(open('raw.json'))
SRC = {
 '2026.2': ('horarios_v07_0.pdf', '16/09/2026'), '2026.1': ('horarios_v07.pdf', '23/03/2026'),
 '2025.1': ('horarios_semestre_2025.1_06_03.pdf', '06/03/2025'), '2024.2': ('horarios_semestres_v12.pdf', '11/09/2024'),
 '2024.1': ('horarios_semestre_4.pdf', '27/03/2024'), '2023.2': ('horarios_2023.2_graduacao_v6.pdf', '23/08/2023'),
 '2023.1': ('horarios_2023.1_-_graduacao_1_0.pdf', '19/04/2023'), '2022.2': ('horarios_-_graduacao_-_2022.2_1.pdf', '22/09/2022'),
 '2022.1': ('horarios_2022.1_graduacao_2.pdf', '24/06/2022'), '2021.2': ('horarios_2021.2_-_graduacao.pdf', '08/10/2021'),
 '2021.1': ('horarios_-_2021.1_-_graduacao_3.pdf', '17/06/2021'), '2020.2': ('horarios_-_2020.2_-_semestres_1.pdf', '29/01/2021'),
 '2020.1': ('horarios_semestre_1_0.pdf', '24/09/2020'), '2019.2': ('2019_2g_sem_horarios.pdf', '02/08/2019'),
 '2019.1': ('horarios_2019-1_pdf_15_04_2019_0.pdf', '15/04/2019'), '2018.2': ('horarios_2018_2e_sem_0.pdf', '30/08/2018'),
}
ALIAS = {
 'A. G. Salbego': 'Adriana Gindri Salbego', 'C. A. D. Goncalves': 'Carlos Aurélio Dilli Gonçalves', 'E. Fontanela': 'Eracilda Fontanela',
 'F. C. Soares': 'Fátima Cibele Soares', 'J. W. M. Kaehler': 'José Wagner Maciel Kaehler', 'P. R. A. Madruga': 'Pedro Roberto de Azambuja Madruga',
 'V. d. O. Dias': 'Vilnei de Oliveira Dias', 'W. F. C. Tapahuasco': 'Wilber Feliciano Chambi Tapahuasco',
 'Chaiane Gerra da Conceição': 'Chaiane Guerra da Conceição', 'S. E. -. J. Davila': 'Juliane Davila (substituta)',
 'Sub Ea - Juliane Davila': 'Juliane Davila (substituta)', 'S. E. -. Itala': 'Ítala (substituta)', 'Sub Ea - Ítala': 'Ítala (substituta)',
 'Leonardo Carpes': 'Leonardo Carpes dos Santos',
}
def prof_norm(p):
    p = ALIAS.get(p, p)
    m = re.match(r'^(?:I\. -\.|Iff|Iffar) -?\s*(.+)$', p)
    if m:
        n = m.group(1).strip()
        n = {'A. Carla': 'Ana Carla', 'A. R. Parizi': 'Ana Rita Parizi', 'Ana Rita': 'Ana Rita Parizi', 'Emila': 'Emila', 'Patricia': 'Patrícia'}.get(n, n)
        return n + ' (IFFar)'
    return p
# melhor grafia por chave sem acento
variants = collections.defaultdict(collections.Counter)
names = collections.defaultdict(collections.Counter)
for sem, es in raw.items():
    for e in es:
        e['prof'] = prof_norm(e['prof'])
        variants[key(e['prof'])][e['prof']] += 1
        e['name'] = re.sub(r'\s+À\s+', ' à ', e['name']).replace('Agricola', 'Agrícola').replace('Topicos', 'Tópicos').replace('Resistencia', 'Resistência').replace('Cientifica', 'Científica')
        names[e['code'] or key(e['name'])][e['name']] += 1
best = lambda c: max(c, key=lambda v: (accents(v), c[v]))
PROF = {k: best(c) for k, c in variants.items()}
NAME = {k: max(c, key=lambda v: (c[v], accents(v))) for k, c in names.items()}
# docentes do curso (site do curso) + ids do campus
lista = open('dl/lista.html', encoding='utf-8').read()
ids = {key(html.unescape(n)): i for i, n in re.findall(r"docente/(\d+)/dados-gerais'>([^<]+)</a>", lista)}
doc = open('dl/ea-docentes.html', encoding='utf-8').read()
doc = re.sub(r'<(script|style)[^>]*>.*?</\1>', '', doc, flags=re.S)
txt = html.unescape(re.sub(r'<[^>]+>', '\n', doc))
lines = [l.strip() for l in txt.split('\n') if l.strip()]
i0 = lines.index('Docentes', lines.index('Docentes') + 1) if lines.count('Docentes') > 1 else lines.index('Docentes')
docentes = []
i = i0 + 1
while i < len(lines) and not lines[i].startswith('Origem'):
    if lines[i].isupper() and len(lines[i].split()) >= 2:
        d = {'nome': lines[i], 'id': ids.get(key(lines[i]))}
        j = i + 1
        while j < len(lines) and not (lines[j].isupper() and len(lines[j].split()) >= 2) and not lines[j].startswith('Origem'):
            v = lines[j]
            if 'lattes' in v: d['lattes'] = v
            elif '@' in v: d['email'] = v
            elif v.startswith('Classe'): d['classe'] = v
            elif v in ('Doutorado', 'Mestrado', 'Especialização', 'Graduação'): d['titulacao'] = v
            j += 1
        docentes.append(d); i = j
    else: i += 1
EXTRA = {'WILLIAN DA MOTTA BRUM': 'https://unipampa.edu.br/saoborja/docente/17799/dados-gerais'}
for d in docentes:
    d['url'] = EXTRA.get(d['nome']) or ('https://unipampa.edu.br/alegrete/docente/%s/dados-gerais' % d['id'] if d['id'] else None)
    del d['id']
print(len(docentes), [d['nome'] for d in docentes if not d['url']])
terms = []
for sem in sorted(raw, reverse=True):
    rows = []
    for e in raw[sem]:
        rows.append([NAME[e['code'] or key(e['name'])], e['code'], e['turma'], PROF[key(e['prof'])], e['room'].replace('Pós- Colheita', 'Pós-Colheita'),
                     e['day'], e['start'], e['end'], ' '.join(g[2:] for g in e['groups'])])
    terms.append({'id': sem, 'pdf': 'https://unipampa.edu.br/alegrete/sites/alegrete/files/documentos/' + SRC[sem][0], 'upd': SRC[sem][1], 'rows': rows})
out = {'generated': '2026-10-27', 'terms': terms, 'docentes': docentes}
js = '/* Horários das turmas de Engenharia Agrícola (Campus Alegrete), extraídos dos PDFs publicados em\n   https://unipampa.edu.br/alegrete/horarios-de-aulas, e relação de docentes do curso\n   (https://cursos.unipampa.edu.br/cursos/engenhariaagricola/docentes/). Gerado em 27/10/2026.\n   Linha: [disciplina, código, turma, professor, sala, dia (0 = segunda), início, fim, grupos]. */\nwindow.EA_HORARIOS = ' + json.dumps(out, ensure_ascii=False, separators=(',', ':')) + ';\n'
open('data/horarios.js', 'w', encoding='utf-8').write(js)
print(len(js), sum(len(t['rows']) for t in terms))
