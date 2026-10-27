"""Lê as tabelas das turmas EA nos PDFs de horários do Campus Alegrete (dl/<semestre>.pdf) e grava raw.json.
Requer pdfplumber. Uso: baixar os PDFs para dl/ com o nome do semestre (ex.: dl/2026.2.pdf) e rodar a partir da pasta que contém dl/."""
import pdfplumber, re, json, glob, os, collections
DAYS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
ENTRY = re.compile(r'(?P<name>.+?)\s*,?\s*(?:\(?(?P<code>(?:A[lL]|Iff|IFF)\s?\d{3,4}[A-Z]?)\)?\s*,?)?\s*(?P<turma>T?\d{2}[\w/;.\-]*)\s*,\s*(?P<prof>[^,]+?)\s*,\s*(?P<room>Sala Virtual|Sem [Ss]ala|[^,(]*?(?:\([^)]*\))|[A-Za-z0-9][\w.\-]*(?:\s[A-Z]?\d+)?)(?=\s|$)')
def clean(cell):
    lines = [l.strip() for l in cell.split('\n') if l.strip()]
    s = ''
    for l in lines:
        if s.endswith('-') and (l[:1].isdigit() or l[:1].islower() or l[:1] == '-'): s += l
        else: s += (' ' if s else '') + l
    return re.sub(r'\s+', ' ', s)
data = {}
bad = []
for f in sorted(glob.glob('dl/*.pdf')):
    sem = os.path.basename(f)[:-4]
    acc = collections.OrderedDict()
    for p in pdfplumber.open(f).pages:
        for t in p.extract_tables():
            hit = next(((i, j) for i, r in enumerate(t[:5]) for j, v in enumerate(r) if v and re.search(r'\bEA(\d\d|CG|Extra|Rec)', v) and any((x or '').startswith('Seg') for x in r[j + 1:])), None)
            if hit is None: continue
            hi, j0 = hit
            groups = sorted(set(re.findall(r'EA(?:\d\d|CG|Extra\d?|Rec)', t[hi][j0])))
            hdr = t[hi]
            starts = [k for k in range(j0 + 1, len(hdr)) if (hdr[k] or '').strip()[:3] in ('Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Sab')][:6]
            bounds = list(zip(starts, starts[1:] + [len(hdr)]))
            def merge(r, lo, hi_):
                vals = r[lo:hi_]
                if all(v is None for v in vals): return None
                return '\n'.join(v for v in vals if v)
            rows = [[r[j0]] + [merge(r, lo, hi_) for lo, hi_ in bounds] for r in t[hi + 1:]]
            ncol = len(bounds)
            for c in range(ncol):
                r = 0
                while r < len(rows):
                    row = rows[r]
                    hour = (row[0] or '').strip()
                    cell = row[c + 1]
                    if not cell or not re.match(r'\d\d:\d\d', hour):
                        r += 1; continue
                    span = 1
                    while r + span < len(rows) and rows[r + span][c + 1] is None and re.match(r'\d\d:\d\d', (rows[r + span][0] or '')): span += 1
                    txt = clean(cell)
                    ms = list(ENTRY.finditer(txt))
                    if not ms or sum(len(m.group(0)) for m in ms) < len(txt) * 0.8:
                        bad.append((sem, txt))
                    for m in ms:
                        h0 = int(hour[:2]); 
                        e = dict(name=m['name'].strip(' ,'), code=(m['code'] or '').replace(' ', '').upper().replace('AL', 'AL'), turma=m['turma'],
                                 prof=m['prof'].strip(), room=m['room'].strip(), day=c, start=hour, end='%02d:30' % (h0 + span))
                        k = (e['code'] or e['name'], e['turma'], e['day'], e['start'], e['room'])
                        if k in acc: acc[k]['groups'] = sorted(set(acc[k]['groups']) | set(groups))
                        else: e['groups'] = groups; acc[k] = e
                    r += span
    data[sem] = list(acc.values())
    print(sem, len(acc))
json.dump(data, open('raw.json', 'w'), ensure_ascii=False, indent=0)
print('BAD', len(bad))
for b in bad[:40]: print(b)
