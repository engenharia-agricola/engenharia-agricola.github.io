import json, re, sys, unicodedata
c = json.load(open(sys.argv[1]))
c = [x for x in c if x['name']]
c.append(dict(name='Manutenção Mecânica', ch=60, code='AL2190', t=60, p=0, prereq='Máquinas Agrícolas II.', ementa='Engenharia de manutenção: aspectos históricos, abordagem atual. Planejamento e gestão estratégica da manutenção. Técnicas para diagnóstico de falhas: termografia, vibrometria, lubrificação e análise de lubrificantes, ensaios não-destrutivos. Informatização da manutenção. Estudos de caso.', obj='', cccg=True))
def norm(s): return re.sub(r'\s+', ' ', s).strip()
fix = {'AL0237': 'Máquinas Agrícolas I', 'AL0283': 'Trabalho de Conclusão de Curso I',
       'AL2240': 'Libras I (EaD)', 'AL2241': 'Libras II (EaD)', 'AL2082': 'Programação Matemática em Software Livre',
       'AL2128': 'Gerenciamento e Tratamento de Resíduos Sólidos', 'AL2113': 'Libras', 'AL2148': 'Libras II'}
for x in c:
    x['name'] = fix.get(x['code'], norm(x['name']))
# EaD Libras T/P
for k in ('AL2240', 'AL2241'):
    for x in c:
        if x['code'] == k: x['t'], x['p'] = 15, 45
for x in c:
    if x['code'] == 'AL2128': x['t'], x['p'], x['ch'] = 30, 30, 60
sem = {1: ['Química Geral e Experimental','Cálculo I','Desenho Técnico I','Física I','Introdução à Ciência e Tecnologia','Algoritmos e Programação','Botânica'],
 2: ['Geometria Analítica e Álgebra Linear','Metodologia Científica','Cálculo II','Física II','Mecânica Geral','Desenho Técnico II','Fisiologia Vegetal'],
 3: ['Materiais de Construção','Microbiologia e Patologia de Grãos','Geologia de Engenharia','Solos Agrícolas','Fenômenos de Transferência','Resistência dos Materiais','Eletrotécnica'],
 4: ['Estatística Aplicada','Cultivos Agrícolas I','Tópicos de Máquinas Elétricas','Gestão Ambiental','Mecânica dos Solos','Elementos de Máquinas Agrícolas','Estabilidade das Estruturas I'],
 5: ['Projeto de Obras de Terra','Hidráulica Agrícola','Estruturas de Aço e Madeira','Máquinas Agrícolas I','Climatologia Agrícola','Topografia e Cartografia','Experimentação Agrícola'],
 6: ['Máquinas Agrícolas II','Estruturas de Concreto','Administração e Gestão Agrícola','Legislação, Ética e Exercício Profissional de Engenharia','Manejo Integrado de Bacias Hidrográficas','Hidrologia','Cultivos Agrícolas II'],
 7: ['Relação Água-Solo-Planta','Manejo e Conservação do Solo e da Água','Construções Rurais e Ambiência','Armazenamento e Beneficiamento de Produtos Agrícolas','Sociologia e Extensão Rural','Máquinas Agrícolas III','Instalações Elétricas Prediais'],
 8: ['Projetos de Construções','Irrigação e Drenagem I','Tratamento de Resíduos','Geoprocessamento Aplicado a Recursos Naturais','Sistemas de Secagem e Aeração de Produtos Agrícolas','Sistemas de Energia Elétrica'],
 9: ['Projetos Integrados de Engenharia','Projetos de Silos e Armazéns','Segurança do Trabalho e Gestão Ambiental','Irrigação e Drenagem II','Trabalho de Conclusão de Curso I'],
 10: ['Estágio Supervisionado','Trabalho de Conclusão de Curso II']}
alias = {'Projetos de Silos e Armazéns': 'Projetos de Silos e Armazéns'}
byname = {x['name'].lower(): x for x in c}
basic = set(sem[1] + sem[2] + ['Geologia de Engenharia','Eletrotécnica','Estatística Aplicada'])
spec = {'Gestão Ambiental','Projeto de Obras de Terra','Administração e Gestão Agrícola','Legislação, Ética e Exercício Profissional de Engenharia','Manejo Integrado de Bacias Hidrográficas','Sociologia e Extensão Rural','Projetos de Construções','Tratamento de Resíduos','Geoprocessamento Aplicado a Recursos Naturais','Projetos Integrados de Engenharia','Segurança do Trabalho e Gestão Ambiental','Projetos de Silos e Armazéns','Trabalho de Conclusão de Curso I','Trabalho de Conclusão de Curso II'}
# area tags: base, water, mach, build, energy, post, env, mgmt, synth
area = {
 'AL0004':'mgmt','AL0302':'base','AL0005':'base','AL0278':'plant','AL0353':'base','AL0003':'base','AL0001':'base',
 'AL0015':'base','AL0290':'base','AL0354':'base','AL0355':'plant','AL0356':'synth','AL0011':'base','AL0010':'base',
 'AL0292':'build','AL0028':'water','AL0038':'base','AL0006':'energy','AL0232':'build','AL0358':'water','AL0357':'post',
 'AL0044':'build','AL0294':'water','AL0295':'mach','AL0221':'energy','AL0227':'plant','AL0225':'env','AL0226':'base',
 'AL0236':'build','AL0296':'water','AL0237':'mach','AL0235':'water','AL0359':'plant','AL0240':'geo','AL0239':'plant',
 'AL0252':'build','AL0109':'water','AL0251':'mach','AL0360':'plant','AL0361':'mgmt','AL0142':'mgmt','AL0260':'water',
 'AL0081':'energy','AL0257':'mgmt','AL0258':'mach','AL0255':'build','AL0253':'water','AL0254':'water','AL0256':'post',
 'AL0274':'energy','AL0275':'build','AL0273':'water','AL0277':'env','AL0262':'geo','AL0276':'post','AL0280':'synth',
 'AL0282':'post','AL0259':'water','AL0283':'synth','AL0160':'env','AL0285':'synth','AL0284':'synth',
 # cccg
 'AL0104':'mgmt','AL2107':'mach','AL2156':'geo','AL0057':'energy','AL2091':'plant','AL0037':'base','AL0175':'build',
 'AL2102':'post','AL0047':'base','AL0192':'mach','AL2076':'energy','AL2089':'mach','AL0125':'mgmt','AL2205':'water',
 'AL2180':'geo','AL2066':'water','UR7002':'geo','AL2128':'env','AL2207':'plant','AL2092':'env','AL2113':'human',
 'AL2148':'human','AL2129':'build','AL2085':'plant','AL2208':'plant','AL2190':'mach','AL0197':'energy','AL2084':'mgmt',
 'AL2074':'build','AL2086':'water','AL2090':'human','AL0187':'base','AL2126':'build','AL2181':'plant','AL2206':'plant',
 'AL2082':'base','AL2112':'mach','AL2123':'water','AL2144':'human','AL2132':'water','AL2101':'geo','AL0026':'mgmt',
 'AL0099':'mach','AL0056':'energy','AL2051':'human','AL2240':'human','AL2241':'human','IT7665':'water'}
syn = {'álgebra linear':'geometria analítica e álgebra linear','estatística':'estatística aplicada',
       'microbiologia e patologia dos grãos':'microbiologia e patologia de grãos','libras':'libras',
       'mecânica dos solos':'mecânica dos solos','máquinas agrícolas i, ii e iii':None,'projeto de obras de terra':'projeto de obras de terra',
       'materiais de construção':'materiais de construção'}
def parse_pre(s, code):
    s = s.strip().rstrip('.')
    res = {'req': [], 'rec': [], 'hours': 0}
    if re.match(r'(?i)não há', s): return res
    m = re.search(r'([\d\.]+)\s*h', s)
    if m:
        res['hours'] = int(m.group(1).replace('.', ''))
        s = re.sub(r'\s*e?\s*[\d\.]+\s*h.*', '', s)
    if 'I, II e III' in s:
        res['req'] = ['AL0237', 'AL0251', 'AL0258']; return res
    low = s.lower()
    for a, b in [('álgebra linear', 'geometria analítica e álgebra linear'), ('estatística,', 'estatística aplicada,'),
                 ('patologia dos grãos', 'patologia de grãos'), ('física ii.', 'física ii')]:
        if b not in low: low = low.replace(a, b)
    names = sorted(byname, key=len, reverse=True)
    for n in names:
        if byname[n]['cccg'] and n not in ('libras',): continue
        i = low.find(n)
        if i < 0: continue
        after = low[i+len(n):i+len(n)+3]
        if re.match(r'\s?i', after) and not after.startswith(' e'): continue
        rec = 'desejável' in low[i:i+len(n)+15]
        (res['rec'] if rec else res['req']).append(byname[n]['code'])
        low = low[:i] + '#' * len(n) + low[i+len(n):]
    if re.search(r'[a-zà-ú]{4,}', low.replace('desejável', '').replace(' e ', ' ')):
        print('LEFT', code, low, file=sys.stderr)
    return res
out = []
for x in c:
    s = next((k for k, v in sem.items() if x['name'] in v), None)
    if not x['cccg'] and s is None: print('NOSEM', x['name'], file=sys.stderr)
    nucleo = None
    if not x['cccg']:
        nucleo = 'basic' if x['name'] in basic else 'spec' if x['name'] in spec else 'prof'
    pre = parse_pre(x['prereq'], x['code'])
    if x['code'] == 'AL2156': pre = {'req': [], 'rec': pre['req'] + pre['rec'], 'hours': 0}
    ead = x['code'] in ('AL2240', 'AL2241')
    out.append(dict(code=x['code'], name={'pt': x['name']}, ch=x['ch'], t=x['t'], p=x['p'], sem=s,
        type='cccg' if x['cccg'] else 'ob', nucleo=nucleo, area=area[x['code']], pre=pre, prereqText=x['prereq'].rstrip('.'),
        ementa={'pt': re.sub(r'\s+\d{2,3}(?=\s|$)', '', re.split(r'B\w*GRAFIA', x['ementa'])[0]).strip()}, ead=ead))
out.sort(key=lambda o: (o['type'] != 'ob', o['sem'] or 0, o['name']['pt']))
print(len(out), sum(o['ch'] for o in out if o['type'] == 'ob'), file=sys.stderr)
for s in range(1, 11): print(s, sum(o['ch'] for o in out if o['sem'] == s), file=sys.stderr)
json.dump(out, open(sys.argv[2], 'w'), ensure_ascii=False, indent=1)
