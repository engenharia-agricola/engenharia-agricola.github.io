/* Painel lateral com os detalhes de uma disciplina (usado na matriz e na grade). */
(function () {
  'use strict';
  const { add, t, L, BY, ICONS, esc } = EA;

  add({
    'cu.nucleo': ['Núcleo', 'Core', 'Núcleo'],
    'cu.n.basic': ['Básico', 'Basic', 'Básico'],
    'cu.n.prof': ['Profissionalizante', 'Professional', 'Profesionalizante'],
    'cu.n.spec': ['Específico', 'Specific', 'Específico'],
    'cu.n.cccg': ['Complementar (CCCG)', 'Elective (CCCG)', 'Complementario (CCCG)'],
    'cu.area': ['Área', 'Area', 'Área'],
    'cu.pre': ['Pré-requisitos', 'Prerequisites', 'Correlativas previas'],
    'cu.rec': ['Recomendado (desejável)', 'Recommended (desirable)', 'Recomendado (deseable)'],
    'cu.hours': ['Ter cursado {h} h de componentes obrigatórios', 'Having completed {h} h of required courses', 'Haber cursado {h} h de asignaturas obligatorias'],
    'cu.nopre': ['Nenhum — pode cursar desde o início!', 'None — you can take it right away!', 'Ninguna — ¡podés cursarla desde el inicio!'],
    'cu.unlocks': ['Esta disciplina libera', 'This course unlocks', 'Esta asignatura habilita'],
    'cu.nounlock': ['Não é pré-requisito de outra disciplina.', 'It is not a prerequisite for any other course.', 'No es correlativa de otra asignatura.'],
    'cu.ementa': ['Ementa', 'Syllabus', 'Contenidos mínimos'],
    'cu.sem': ['Semestre sugerido', 'Suggested semester', 'Semestre sugerido'],
    'cu.from5': ['a partir do 5º', 'from the 5th on', 'desde el 5.º'],
    'cu.trnote': ['Tradução livre da ementa oficial em português.', 'Free translation of the official Portuguese syllabus.', 'Traducción libre de los contenidos oficiales en portugués.'],
    'cu.altnote': ['Pode ser substituída pela versão equivalente ({x}).', 'May be replaced by the equivalent version ({x}).', 'Puede reemplazarse por la versión equivalente ({x}).']
  });

  let drawer, backdrop, lastFocus, onNavigate = null;

  function ensure() {
    if (drawer) return;
    backdrop = document.createElement('div'); backdrop.className = 'drawer-backdrop';
    drawer = document.createElement('aside'); drawer.className = 'drawer'; drawer.setAttribute('role', 'dialog'); drawer.setAttribute('aria-modal', 'true');
    drawer.innerHTML = `<div class="drawer-head"><button class="icon-btn drawer-close" type="button">${ICONS.close}</button><div class="dh"></div></div><div class="drawer-body"></div>`;
    document.body.append(backdrop, drawer);
    backdrop.addEventListener('click', close);
    drawer.querySelector('.drawer-close').addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && drawer.classList.contains('open')) close(); });
  }

  function chip(code) {
    const c = BY[code]; if (!c) return '';
    return `<button type="button" data-go="${code}" data-area="${c.area}"><span class="dot"></span>${esc(L(c.name))}</button>`;
  }

  function open(code, opts) {
    ensure();
    const c = BY[code]; if (!c) return;
    onNavigate = (opts && opts.onNavigate) || onNavigate;
    lastFocus = document.activeElement;
    drawer.dataset.area = c.area;
    drawer.querySelector('.drawer-close').setAttribute('aria-label', t('common.close'));
    const nucleo = c.type === 'cccg' ? t('cu.n.cccg') : t('cu.n.' + c.nucleo);
    drawer.querySelector('.dh').innerHTML = `
      <div style="display:flex;gap:6px;flex-wrap:wrap"><span class="badge">${c.code}</span><span class="badge">${c.type === 'ob' ? t('common.ob') : t('common.cccg')}</span>${c.ead ? `<span class="badge">${t('common.ead')}</span>` : ''}</div>
      <h3 id="drawer-title">${esc(L(c.name))}</h3>
      <span class="chip" data-area="${c.area}"><span class="dot"></span>${EA.areaName(c.area)}</span>`;
    drawer.setAttribute('aria-labelledby', 'drawer-title');
    const pre = c.pre;
    let preHtml = '';
    if (!pre.req.length && !pre.rec.length && !pre.hours) preHtml = `<p class="muted">${t('cu.nopre')}</p>`;
    else {
      if (pre.req.length) preHtml += `<div class="link-list">${pre.req.map(chip).join('')}</div>`;
      if (pre.hours) preHtml += `<p style="margin:8px 0 0">${ICONS.clock.replace('<svg', '<svg style="width:16px;height:16px;display:inline;vertical-align:-3px;margin-right:6px"')}${t('cu.hours', { h: pre.hours.toLocaleString(document.documentElement.lang) })}</p>`;
      if (pre.rec.length) preHtml += `<h4>${t('cu.rec')}</h4><div class="link-list">${pre.rec.map(chip).join('')}</div>`;
      if (pre.alt) preHtml += `<p class="muted" style="font-size:.85rem;margin-top:8px">${t('cu.altnote', { x: Object.values(pre.alt).flat().map(k => L(BY[k].name)).join(', ') })}</p>`;
    }
    const em = L(c.ementa);
    drawer.querySelector('.drawer-body').innerHTML = `
      <div class="kv">
        <div><small>${t('common.total')}</small><b>${c.ch} h</b></div>
        <div><small>${t('common.theory')}</small><b>${c.t ?? '–'} h</b></div>
        <div><small>${t('common.practice')}</small><b>${c.p ?? '–'} h</b></div>
      </div>
      <div class="kv" style="grid-template-columns:1fr 1fr">
        <div><small>${t('cu.sem')}</small><b>${c.sem ? t('common.sem.short', { n: c.sem }) : t('cu.from5')}</b></div>
        <div><small>${t('cu.nucleo')}</small><b style="font-size:.92rem">${nucleo}</b></div>
      </div>
      <h4>${t('cu.pre')}</h4>${preHtml}
      <h4>${t('cu.unlocks')}</h4>${c.unlocks.length ? `<div class="link-list">${c.unlocks.map(chip).join('')}</div>` : `<p class="muted">${t('cu.nounlock')}</p>`}
      ${em ? `<h4>${t('cu.ementa')}</h4><p>${esc(em)}</p>${EA.lang !== 'pt' ? `<p class="muted" style="font-size:.8rem">${t('cu.trnote')}</p>` : ''}` : ''}`;
    drawer.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => {
      const k = b.dataset.go; open(k); if (onNavigate) onNavigate(k);
    }));
    drawer.classList.add('open'); backdrop.classList.add('open');
    drawer.querySelector('.drawer-body').scrollTop = 0;
    drawer.querySelector('.drawer-close').focus();
  }

  function close() {
    if (!drawer) return;
    drawer.classList.remove('open'); backdrop.classList.remove('open');
    document.dispatchEvent(new CustomEvent('drawer:close'));
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function isOpen() { return drawer && drawer.classList.contains('open'); }
  function current() { return drawer && drawer.classList.contains('open') ? drawer.querySelector('.badge').textContent : null; }

  EA.course = { open, close, isOpen, current };
})();
