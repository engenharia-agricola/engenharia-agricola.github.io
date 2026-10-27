"""Junta courses.json (build.py) com as traduções tr_en.json / tr_es.json e gera data/courses.js.

Uso: python3 tools/merge.py courses.json tr_en.json tr_es.json data/courses.js
"""
import json, re, sys

src, en_p, es_p, out = sys.argv[1:5]
c = json.load(open(src))
en = json.load(open(en_p)); es = json.load(open(es_p))
for x in c:
    x['ementa']['pt'] = re.sub(r'^\d{2,3}\s+', '', x['ementa']['pt']).replace('ANBT/ISO NBR 50.001', 'ABNT NBR ISO 50001')
    x['name']['en'] = en[x['code']]['name']; x['name']['es'] = es[x['code']]['name']
    x['ementa']['en'] = en[x['code']]['ementa']; x['ementa']['es'] = es[x['code']]['ementa']
    if x['code'] == 'AL2076': x['name']['pt'] = 'Eficiência Energética: da Avaliação Gerencial à Auditagem Energética'
    if x['code'] == 'AL2241': x['pre']['req'] = ['AL2113']; x['pre']['alt'] = {'AL2113': ['AL2240']}
    x.pop('prereqText', None)
meta = {
    'source': 'PPC Engenharia Agrícola — Unipampa Campus Alegrete (2014, atualização maio/2024, versão jun/2024)',
    'totals': {'ob': 3285, 'tcc': 60, 'estagio': 220, 'cccg': 270, 'acg': 150, 'total': 3985},
    'nucleos': {'basic': 945, 'prof': 1990, 'spec': 630},
    'cccgSlots': {5: 45, 6: 60, 7: 60, 8: 45, 9: 60},
    'semLimits': [120, 540], 'minSem': 10, 'maxSem': 20,
    'equiv': [['AL2113', 'AL2240'], ['AL2148', 'AL2241']]
}
js = ('/* Gerado a partir do PPC (ver README). Não editar à mão sem conferir o PPC. */\nwindow.PPC = '
      + json.dumps({'meta': meta, 'courses': c}, ensure_ascii=False, separators=(',', ':')) + ';\n')
open(out, 'w').write(js)
