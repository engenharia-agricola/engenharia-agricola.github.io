import re, json, sys
t = open(sys.argv[1]).read()
t = t.replace('\f', '\n')
blocks = re.split(r'PRO\w*AMA DO\s+COMPONENTE\s+CURRICULAR|IDENTIFICAÇÃO\s+DO\s+COMPONENTE', t)[1:]
out = []
cccg_start = t.find('2.8.9 Ementário dos Componentes Curriculares Complementares', t.find('2.8.9')+10)
pos = 0
for b in blocks:
    pos = t.find(b, pos)
    lines = b.split('\n')
    hdr = None
    for i, l in enumerate(lines):
        m = re.search(r'^\s*(.*?)\s{2,}(\d+)\s*horas?\s+([A-Z]{2}\s?\d{3,4}|\S+)?\s*$', l)
        if m and m.group(1).strip() and 'NOME' not in l:
            hdr = (i, m); break
    name = code = None; ch = None
    if hdr:
        i, m = hdr
        name = m.group(1).strip(); ch = int(m.group(2)); code = (m.group(3) or '').strip()
        # continuation lines of name
        j = i+1
        tp = None
        while j < len(lines) and j < i+6:
            l = lines[j]
            mm = re.search(r'(\d+)\s*T\s*[–-]\s*(\d+)\s*P', l)
            if mm: tp = (int(mm.group(1)), int(mm.group(2)))
            pre = re.sub(r'\s*\d+\s*T\s*[–-]\s*\d+\s*P.*', '', l).strip()
            if pre and 'Pré' not in pre and not mm and len(pre) < 60:
                name += ' ' + pre
            elif pre and mm and 'Pré' not in pre:
                name += ' ' + pre
            j += 1
    else:
        tp = None
    body = '\n'.join(lines)
    pm = re.search(r'Pré-?\s?[Rr]equisitos?:\s*(.*?)\n\s*\n', body, re.S)
    prereq = re.sub(r'\s+', ' ', pm.group(1)).strip() if pm else ''
    em = re.search(r'EMENTA\s*\n(.*?)\n\s*(BIBLIOGRAFIA|REFER|OBJETIVO|PROGRAMA)', body, re.S)
    ementa = re.sub(r'\s+', ' ', re.sub(r'\n\s*\d{2,3}\s*\n', '\n', em.group(1))).strip() if em else ''
    om = re.search(r'OBJETIVOS?\s*\n(.*?)\n\s*(EMENTA|BIBLIOGRAFIA|REFER)', body, re.S)
    obj = re.sub(r'\s+', ' ', re.sub(r'\n\s*\d{2,3}\s*\n', '\n', om.group(1))).strip() if om else ''
    out.append(dict(name=name, ch=ch, code=code, t=tp[0] if tp else None, p=tp[1] if tp else None,
                    prereq=prereq, ementa=ementa, obj=obj, cccg=pos > cccg_start))
json.dump(out, open(sys.argv[2], 'w'), ensure_ascii=False, indent=1)
for o in out:
    print(o['cccg'] and 'C' or 'O', o['code'], o['ch'], o['t'], o['p'], '|', o['name'], '|', o['prereq'][:70], '|', len(o['ementa']))
