/*
 * Motor del portfolio. Normalmente NO NECESITAS EDITAR ESTE ARCHIVO.
 * Edita contenido.js o usa editar.html para cambiar fotos, vídeos y textos.
 */
(() => {
  'use strict';
  const DATA = window.PORTFOLIO;
  if (!DATA) { document.body.textContent = 'No se ha podido leer contenido.js'; return; }
  const $ = (selector, root = document) => root.querySelector(selector);
  const byId = id => document.getElementById(id);
  const el = (tag, className = '', text = '') => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null && text !== '') node.textContent = String(text);
    return node;
  };
  const append = (parent, ...children) => { children.forEach(c => parent.append(c)); return parent; };
  const cover = id => `assets/covers/${id === '3d' ? '3d' : ['web','gamedev','apps','youtube','design','marketing','ai'].includes(id) ? id : 'web'}.svg`;
  const category = id => DATA.categories.find(c => c.id === id) || {id, name: id || 'Creativo'};
  const safeUrl = (url, local = false) => {
    if (typeof url !== 'string' || !url.trim()) return '';
    try {
      const parsed = new URL(url.trim(), window.location.href);
      if (['https:', 'http:'].includes(parsed.protocol) && (local || parsed.protocol === 'https:')) return parsed.href;
      if (local && parsed.protocol === 'file:') return parsed.href;
    } catch (_) {}
    return '';
  };
  const text = (id, value) => { if (byId(id)) byId(id).textContent = value ?? ''; };
  const setImg = (id, value) => { if (safeUrl(value, true) && byId(id)) byId(id).src = value; };
  const toast = message => {
    const node = byId('toast'); node.textContent = message; node.classList.add('show');
    clearTimeout(toast.timer); toast.timer = setTimeout(() => node.classList.remove('show'), 3600);
  };
  const chips = (values, className = 'project-tags') => {
    const node = el('div', className);
    (values || []).forEach(value => node.append(el('span', '', value)));
    return node;
  };
  const normalizedYoutube = raw => {
    if (!raw) return '';
    if (/^[a-zA-Z0-9_-]{11}$/.test(raw)) return `https://www.youtube-nocookie.com/embed/${raw}`;
    try {
      const u = new URL(raw);
      const host = u.hostname.toLowerCase().replace(/^www\./, '');
      let id = '';
      if (host === 'youtu.be') id = u.pathname.split('/')[1];
      if (['youtube.com','m.youtube.com','youtube-nocookie.com'].includes(host)) id = u.searchParams.get('v') || u.pathname.match(/\/(?:embed|shorts|live)\/([^/?]+)/)?.[1];
      if (/^[a-zA-Z0-9_-]{11}$/.test(id || '')) return `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
    } catch (_) {}
    return '';
  };
  const normalizedVimeo = raw => {
    try { const u = new URL(raw); if (['vimeo.com','www.vimeo.com','player.vimeo.com'].includes(u.hostname)) { const id = u.pathname.match(/\/(?:video\/)?(\d+)/)?.[1]; if (id) return `https://player.vimeo.com/video/${id}`; } } catch (_) {} return '';
  };
  const normalizedSketchfab = raw => {
    try {
      const u = new URL(raw);
      if (['sketchfab.com','www.sketchfab.com'].includes(u.hostname)) {
        const id = u.pathname.match(/(?:models|3d-models)\/(?:[^/]*-)?([0-9a-f]{32})/i)?.[1];
        if (id) return `https://sketchfab.com/models/${id}/embed?autostart=0`;
      }
    } catch (_) {} return '';
  };
  const mediaIsPlayable = media => media && ['youtube','vimeo','video','sketchfab','model'].includes(media.kind);
  const imageFor = (media, categoryId) => {
    const image = el('img');
    const src = media?.kind === 'image' ? media.src : media?.poster;
    image.src = safeUrl(src, true) ? src : cover(categoryId);
    image.alt = media?.alt || `Imagen relacionada con ${category(categoryId).name}`;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.onerror = () => { image.onerror = null; image.src = cover(categoryId); };
    return image;
  };

  // Presentación / contacto.
  const site = DATA.site;
  text('hero-eyebrow', site.eyebrow);
  text('headline-one', site.headline1);
  text('headline-two', site.headline2);
  text('hero-intro', site.intro);
  text('hero-availability', site.availability);
  text('hero-location', site.location);
  text('about-text', site.about);
  text('mini-name', (site.name || 'ENRIC').split(' ')[0].toUpperCase() + '.');
  text('footer-note', site.footerNote);
  text('year', new Date().getFullYear());
  setImg('hero-portrait', site.portrait);
  setImg('about-portrait', site.portrait);
  byId('contact-email').href = 'mailto:' + String(site.email || '').replace(/[^a-zA-Z0-9@._+\-]/g, '');
  const cv = safeUrl(site.cv, true);
  if (cv) { const btn = byId('contact-cv'); btn.href = cv; btn.hidden = false; btn.target = '_blank'; btn.rel = 'noopener noreferrer'; }
  (site.socials || []).forEach(s => {
    const url = safeUrl(s.url);
    if (!url) return;
    const a = el('a', '', s.label + ' ↗'); a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer'; byId('contact-socials').append(a);
  });
  document.title = (site.name || 'Portfolio') + ' — Creative Developer';

  // Servicios.
  const colors = { web:'#77e4fa', gamedev:'#b6a0ff', apps:'#c8fa75', youtube:'#ffb391', design:'#e8a5d5', '3d':'#9fe9c1', marketing:'#ffdb92', ai:'#aaa6ff' };
  (DATA.categories || []).forEach(c => {
    const card = el('article','service-card'); card.style.setProperty('--card-glow',colors[c.id] || '#c8fa75');
    const top = el('div','service-top'); append(top,el('span','service-number',c.number),el('span','service-symbol',c.symbol));
    append(card,top,el('h3','',c.name),el('p','',c.description),chips(c.tools,'service-tags'));
    byId('services-grid').append(card);
  });

  // Proyectos con filtros.
  let currentFilter = 'all';
  const filters = [{ id:'all', name:'Todo' },...(DATA.categories || []).map(({id,name}) => ({id,name}))];
  filters.forEach(filter => {
    const btn = el('button','filter-btn',filter.name);
    btn.type = 'button'; btn.dataset.filter = filter.id; btn.setAttribute('aria-pressed',filter.id === 'all' ? 'true':'false');
    btn.addEventListener('click',() => {
      currentFilter = filter.id;
      document.querySelectorAll('.filter-btn').forEach(b => b.setAttribute('aria-pressed',String(b.dataset.filter === currentFilter)));
      renderProjects();
    });
    byId('project-filters').append(btn);
  });
  function renderProjects() {
    const grid = byId('projects-grid'); grid.replaceChildren();
    const items = (DATA.projects || []).filter(p => currentFilter === 'all' || p.category === currentFilter).sort((a,b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
    items.forEach(project => {
      const card = el('article','project-card');
      const trigger = el('button','project-media'); trigger.type = 'button'; trigger.setAttribute('aria-label','Ver ' + project.title);
      append(trigger,imageFor(project.media,project.category),el('span','card-media-badge',category(project.category).name),el('span','card-action','↗'));
      if (project.featured) trigger.append(el('span','card-featured','✳ DESTACADO'));
      trigger.addEventListener('click',()=>openDetails(project));
      const details = el('div','project-details');
      const eyebrow = el('p','project-eyebrow',project.type || 'Proyecto');
      if (project.placeholder) eyebrow.append(el('span','placeholder-banner','POR COMPLETAR'));
      append(details,eyebrow,el('h3','',project.title),el('p','project-subtitle',project.subtitle),el('p','project-desc',project.description),chips(project.tags));
      append(card,trigger,details); grid.append(card);
    });
    if (!items.length) grid.append(el('div','empty-state','Todavía no hay proyectos en esta categoría. Puedes añadirlos con editar.html.'));
    text('project-count',`${items.length} ${items.length === 1 ? 'elemento' : 'elementos'} / ${DATA.projects.length} en el portfolio`);
  }
  renderProjects();

  // Galería de imágenes, vídeos y 3D.
  (DATA.gallery || []).forEach(entry => {
    const article = el('article','gallery-card'); const trigger = el('button','gallery-picture'); trigger.type='button'; trigger.setAttribute('aria-label','Abrir ' + entry.title);
    trigger.append(imageFor(entry.media,entry.category));
    if (mediaIsPlayable(entry.media) && entry.media.src) append(trigger,append(el('span','gallery-play'),el('span','','▶')));
    if (entry.placeholder) trigger.append(el('span','gallery-placeholder','MUESTRA EDITABLE'));
    trigger.addEventListener('click',()=>openDetails(entry));
    const meta = el('div','gallery-meta'); append(meta,el('strong','',entry.title),el('p','',entry.caption));
    append(article,trigger,meta); byId('gallery-grid').append(article);
  });

  // Trayectoria, formación y habilidades.
  (DATA.highlights || []).forEach(h => { const stat=el('div','stat'); append(stat,el('strong','',h.value),el('span','',h.label)); byId('stats-grid').append(stat); });
  (DATA.stack || []).forEach(group => {const row=el('div','stack-row');append(row,el('h3','',group.title),chips(group.items,'stack-chips'));byId('stack-list').append(row);});
  (DATA.experience || []).forEach(item => {const row=el('div','timeline-item');const details=el('div');append(details,el('h3','',item.title),el('p','',item.text));append(row,el('span','timeline-years',item.years),details);byId('timeline').append(row);});
  (DATA.education || []).forEach(item => {const row=el('div','education-item');append(row,el('h3','',item.name),el('p','',item.detail));byId('education').append(row);});

  // Modal multimedia: iframe solamente en hosts explícitamente permitidos.
  const dialog = byId('media-dialog'); const dialogContent = byId('dialog-content');
  const close = () => {dialog.close();dialogContent.replaceChildren();document.body.classList.remove('dialog-open');};
  byId('dialog-close').addEventListener('click',close);
  dialog.addEventListener('click',event => {if(event.target === dialog)close();});
  dialog.addEventListener('close',()=>{dialogContent.replaceChildren();document.body.classList.remove('dialog-open');});
  function iframeEmbed(url,title) {const frame=el('iframe');frame.src=url;frame.title=title;frame.loading='lazy';frame.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen';frame.referrerPolicy='strict-origin-when-cross-origin';frame.allowFullscreen=true;return frame;}
  function mediaElement(media,categoryId,title) {
    const wrapper=el('div','dialog-media'); const kind=media?.kind || 'image'; const raw=media?.src || '';
    if (kind === 'youtube') {const url=normalizedYoutube(raw);if(url)return append(wrapper,iframeEmbed(url,title));}
    if (kind === 'vimeo') {const url=normalizedVimeo(raw);if(url)return append(wrapper,iframeEmbed(url,title));}
    if (kind === 'sketchfab') {const url=normalizedSketchfab(raw);if(url)return append(wrapper,iframeEmbed(url,title));}
    if (kind === 'video' && safeUrl(raw,true)) {const video=el('video');video.src=raw;video.controls=true;video.preload='metadata';video.playsInline=true;if(media.poster&&safeUrl(media.poster,true))video.poster=media.poster;return append(wrapper,video);}
    if (kind === 'model' && safeUrl(raw,true)) {
      if (!document.querySelector('[data-model-viewer]')) {const script=document.createElement('script');script.type='module';script.src='https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js';script.dataset.modelViewer='true';document.head.append(script);}
      const viewer=el('model-viewer');viewer.setAttribute('src',raw);viewer.setAttribute('camera-controls','');viewer.setAttribute('auto-rotate','');viewer.setAttribute('shadow-intensity','1');viewer.setAttribute('alt',title);return append(wrapper,viewer);
    }
    if (kind === 'image' && safeUrl(raw,true)) return append(wrapper,imageFor(media,categoryId));
    const empty=el('div','dialog-empty');append(empty,el('strong','','Tu próximo proyecto va aquí.'),el('p','','Añade una imagen, un vídeo o un modelo desde editar.html y reemplaza esta muestra.'));
    return append(wrapper,empty);
  }
  function openDetails(item) {
    dialogContent.replaceChildren();
    dialogContent.append(mediaElement(item.media,item.category,item.title));
    const copy=el('div','dialog-copy');
    append(copy,el('p','dialog-category',category(item.category).name),el('h3','',item.title));
    if (item.subtitle) copy.append(el('p','',item.subtitle));
    if (item.description || item.caption) copy.append(el('p','',item.description || item.caption));
    if (Array.isArray(item.tags)) copy.append(chips(item.tags));
    const link = safeUrl(item.link);
    if (link) {const a=el('a','dialog-link','Visitar proyecto ↗');a.href=link;a.target='_blank';a.rel='noopener noreferrer';copy.append(a);}
    dialogContent.append(copy);dialog.showModal();document.body.classList.add('dialog-open');
  }
  // Navegación de móvil.
  const toggle=$('.nav-toggle');const menu=$('.nav-links');
  toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');});
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));
})();
