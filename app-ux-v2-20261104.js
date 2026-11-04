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
  const cover = id => `assets/covers/${id === '3d' ? '3d' : ['web','gamedev','apps','youtube','design','animation','marketing','ai'].includes(id) ? id : 'web'}.svg`;
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
  // Titulares: animación una sola vez por navegador, al entrar en pantalla.
  // No oculta contenidos si JS está desactivado ni si el usuario prefiere menos movimiento.
  const titleRevealKey = 'enric-portfolio-titulos-primera-visita-v1';
  const prefersLessMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  let animateFirstVisit = false;
  const previewIntro = new URLSearchParams(window.location.search).has('preview-intro');
  if (!prefersLessMotion) {
    try {
      animateFirstVisit = previewIntro || window.localStorage.getItem(titleRevealKey) !== '1';
      if (animateFirstVisit && !previewIntro) window.localStorage.setItem(titleRevealKey, '1');
    } catch (_) {
      // En navegación privada o archivos locales el almacenamiento puede estar bloqueado.
      // No bloquear nunca títulos por este motivo.
      animateFirstVisit = false;
    }
  }
  const titleSelector = [
    '#hero-title', '.section-heading h2', '.featured-copy h3',
    '.web-subheading h3', '.web-showcase-content h4', '.ai-feature h3',
    '.ai-capabilities h3', '.project-details h3', '.channel-showcase-info h3',
    '.gallery-meta strong', '.thumb-card-copy h3', '.contact-inner h2'
  ].join(', ');
  const titleObserver = animateFirstVisit && 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('title-entered');
            titleObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' })
    : null;
  const queueTitleAnimations = (root = document) => {
    if (!animateFirstVisit) return;
    root.querySelectorAll(titleSelector).forEach((heading, i) => {
      if (heading.hasAttribute('data-enter-title')) return;
      heading.setAttribute('data-enter-title', '');
      heading.style.setProperty('--title-enter-delay', `${Math.min(i % 3, 2) * 75}ms`);
      if (titleObserver) titleObserver.observe(heading);
      else heading.classList.add('title-entered');
    });
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
    // Las miniaturas grandes no existen en todos los vídeos: usa mqdefault (16:9) en ese caso.
    const match = String(src || '').match(/^https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]{11})\/maxresdefault\.jpg$/);
    const fallbackThumb = match ? `https://i.ytimg.com/vi/${match[1]}/mqdefault.jpg` : '';
    const fail = () => {
      if (fallbackThumb && !image.dataset.thumbFallback) {
        image.dataset.thumbFallback = '1';
        image.src = fallbackThumb;
      } else { image.onerror = null; image.src = cover(categoryId); }
    };
    image.onerror = fail;
    if (fallbackThumb) image.addEventListener('load', () => {
      if (image.naturalWidth && image.naturalWidth <= 120 && !image.dataset.thumbFallback) fail();
    });
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
  if (cv) { const btn = byId('contact-cv'); btn.href = cv; btn.hidden = false; btn.download = 'CV_Enric_Sabate.pdf'; }
  (site.socials || []).forEach(s => {
    const url = safeUrl(s.url);
    if (!url) return;
    const a = el('a', '', s.label + ' ↗'); a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer'; byId('contact-socials').append(a);
  });
  document.title = (site.name || 'Portfolio') + ' — Creative Developer';

  // Servicios.
  const colors = { web:'#77e4fa', gamedev:'#b6a0ff', apps:'#c8fa75', youtube:'#ffb391', design:'#e8a5d5', animation:'#ffa3ce', '3d':'#9fe9c1', marketing:'#ffdb92', ai:'#aaa6ff' };
  (DATA.categories || []).forEach(c => {
    const destination = { web:'#webs', ai:'#ia', design:'#miniaturas', youtube:'#canales' }[c.id] || '#proyectos';
    const card = el('a','service-card'); card.href=destination; card.style.setProperty('--card-glow',colors[c.id] || '#c8fa75');
    const top = el('div','service-top'); append(top,el('span','service-number',c.number),el('span','service-symbol',c.symbol));
    append(card,top,el('h3','',c.name),el('p','',c.description),chips(c.tools,'service-tags'),el('span','service-link','Ver trabajos ↓'));
    if (destination === '#proyectos') card.addEventListener('click',() => { setProjectFilter(c.id); });
    byId('services-grid').append(card);
  });

  // Estudios de caso web: proyectos propios separados de colaboraciones profesionales.
  function renderWebCards(){
    const webProjects=(DATA.projects||[]).filter(p=>p.category==='web' && (p.clientType==='own'||p.clientType==='paddock'));
    webProjects.forEach(project=>{
      const own=project.clientType==='own';
      const card=el('article',`web-showcase-card ${own?'web-card-own':'web-card-client'}`);
      const figure=el('button','web-showcase-cover');figure.type='button';figure.setAttribute('aria-label','Ver detalles de '+project.title);
      append(figure,imageFor(project.media,'web'),el('span','web-cover-action','+'));
      figure.addEventListener('click',()=>openDetails(project));
      const content=el('div','web-showcase-content');
      append(content,el('p','web-project-type',project.type),el('h4','',project.title),el('p','web-project-subtitle',project.subtitle),el('p','web-project-description',project.description),chips(project.tags,'web-project-tags'));
      const link=safeUrl(project.link);
      if(link){const a=el('a','web-project-link','Visitar web ↗');a.href=link;a.target='_blank';a.rel='noopener noreferrer';content.append(a);}
      append(card,figure,content);
      byId(own?'web-own-grid':'web-collab-grid').append(card);
    });
  }
  renderWebCards();

  // Los destacados conservan HTML legible para buscadores y se sincronizan
  // con contenido.js para que el editor pueda modificar textos, enlaces y fotos.
  document.querySelectorAll('[data-featured-id]').forEach(card => {
    const project=(DATA.projects || []).find(item => item.id===card.dataset.featuredId);
    if (!project) { card.hidden=true; return; }
    const title=card.querySelector('.featured-copy h3');
    const subtitle=card.querySelector('.featured-copy>span');
    const preview=card.querySelector('.featured-thumb img');
    if (title) title.textContent=project.featuredTitle || project.title;
    if (subtitle) subtitle.textContent=project.subtitle || project.description;
    if (preview) {
      const src=project.media?.kind==='image' ? project.media?.src : project.media?.poster;
      if (safeUrl(src,true)) preview.src=src;
      if (project.media?.alt) preview.alt=project.media.alt;
      preview.onerror=()=>{preview.onerror=null;preview.src=cover(project.category);};
    }
    const href=safeUrl(project.link || (project.media?.kind==='youtube'?project.media.src:''));
    if (href) card.querySelectorAll('a').forEach(a=>{a.href=href;});
  });
  const visualForAI=(DATA.projects||[]).find(item=>item.id==='ai-visualfor-caso');
  if (visualForAI) {
    const aiCase=byId('ia');
    const heading=aiCase.querySelector('.ai-feature h3');
    const link=aiCase.querySelector('.ai-feature .button');
    if(heading)heading.textContent=visualForAI.title.replace(/\s*[·—].*$/, '');
    if(link && safeUrl(visualForAI.link)) link.href=visualForAI.link;
  }

  // Proyectos con filtros.
  let currentFilter = 'all';
  const filters = [{ id:'all', name:'Todo' },...(DATA.categories || []).map(({id,name}) => ({id,name}))];
  filters.forEach(filter => {
    const btn = el('button','filter-btn',filter.name);
    btn.type = 'button'; btn.dataset.filter = filter.id; btn.setAttribute('aria-pressed',filter.id === 'all' ? 'true':'false');
    btn.addEventListener('click',() => { setProjectFilter(filter.id); });
    byId('project-filters').append(btn);
  });
  function setProjectFilter(id) {
    currentFilter = id;
    document.querySelectorAll('.filter-btn').forEach(b => b.setAttribute('aria-pressed',String(b.dataset.filter === currentFilter)));
    renderProjects();
  }
  function renderProjects() {
    const grid = byId('projects-grid'); grid.replaceChildren();
    const items = (DATA.projects || []).filter(p => currentFilter === 'all' ? p.category !== 'web' : p.category === currentFilter).sort((a,b) => { const score = p => (p.demoUnavailable ? -8 : 0) + (p.featured ? 3 : 0) + (mediaIsPlayable(p.media) ? 2 : 0); return score(b)-score(a); });
    grid.classList.toggle('projects-grid-single', items.length === 1);
    grid.classList.toggle('projects-grid-pair', items.length === 2);
    grid.classList.toggle('projects-grid-four', items.length === 4);
    items.forEach(project => {
      const card = el('article','project-card');
      const trigger = el('button','project-media'); trigger.type = 'button'; trigger.setAttribute('aria-label','Ver ' + project.title);
      append(trigger, imageFor(project.media, project.category), el('span','card-media-badge',category(project.category).name), el('span',mediaIsPlayable(project.media) ? 'card-action card-action-play' : 'card-action card-action-open', mediaIsPlayable(project.media) ? '▶' : '+'));
      if (project.featured) trigger.append(el('span','card-featured','✳ DESTACADO'));
      else if (project.demoUnavailable) trigger.append(el('span','card-demo-unavailable','SIN DEMO'));
      trigger.addEventListener('click',()=>openDetails(project));
      const details = el('div','project-details');
      const eyebrow = el('p','project-eyebrow',project.type || 'Proyecto');
      if (project.placeholder) eyebrow.append(el('span','placeholder-banner','POR COMPLETAR'));
      append(details,eyebrow,el('h3','',project.title),el('p','project-subtitle',project.subtitle),el('p','project-desc',project.description),chips(project.tags));
      append(card,trigger,details); grid.append(card);
    });
    if (!items.length) grid.append(el('div','empty-state','En esta especialidad todavía no he publicado una demostración independiente. Puedes explorar mi experiencia y las demás categorías.'));
    text('project-count',`${items.length} ${items.length === 1 ? 'trabajo mostrado' : 'trabajos mostrados'} · Puedes cambiar de categoría sin salir de esta sección`);
    queueTitleAnimations(grid);
  }
  renderProjects();

  // Galería de imágenes, vídeos y 3D.
  (DATA.gallery || []).forEach(entry => {
    const article = el('article','gallery-card'); const trigger = el('button','gallery-picture'); trigger.type='button'; trigger.setAttribute('aria-label','Abrir ' + entry.title);
    trigger.append(imageFor(entry.media,entry.category));
    if (mediaIsPlayable(entry.media) && entry.media.src) append(trigger,append(el('span','gallery-play'),el('span','','▶')));
    if(entry.media?.kind==='youtube') trigger.append(el('span','media-kind-tag','YOUTUBE'));
    if(entry.media?.kind==='video') trigger.append(el('span','media-kind-tag','VÍDEO MP4'));
    if (entry.placeholder) trigger.append(el('span','gallery-placeholder','MUESTRA EDITABLE'));
    trigger.addEventListener('click',()=>openDetails(entry));
    const meta = el('div','gallery-meta'); append(meta,el('span','gallery-category',category(entry.category).name),el('strong','',entry.title),el('p','',entry.caption));
    append(article,trigger,meta); byId('gallery-grid').append(article);
  });

  // Canales de YouTube: una ficha independiente por cada canal, editable desde editar.html.
  (DATA.thumbnailChannels || []).forEach((channel, index) => {
    const card=el('article','channel-showcase-card');
    const visual=el('div','channel-showcase-visual');
    const img=imageFor({kind:'image',src:channel.image,alt:channel.imageAlt||('Imagen de '+channel.name)},'youtube');
    append(visual,img,el('span','channel-showcase-n','CANAL '+String(index+1).padStart(2,'0')),el('span','channel-showcase-platform','▶ YOUTUBE'));
    const info=el('div','channel-showcase-info');
    append(info,el('span','channel-showcase-role',channel.role||'Gestión de canal'),el('h3','',channel.name),el('p','channel-showcase-subtitle',channel.subtitle||''),el('p','channel-showcase-description',channel.description||''));
    const url=safeUrl(channel.url);
    if(url){const a=el('a','channel-showcase-link','Visitar canal ↗');a.href=url;a.target='_blank';a.rel='noopener noreferrer';info.append(a);}
    else info.append(el('span','channel-showcase-unlinked','Enlace pendiente de confirmar'));
    append(card,visual,info);byId('channel-grid').append(card);
  });

  // Showcase de miniaturas: portadas como piezas de diseño gráfico, no vídeos repetidos.
  (DATA.thumbnailChannels || []).forEach(channel => {
    const url = safeUrl(channel.url);
    if (!url) return;
    const a = el('a','thumb-channel'); a.href = url; a.target='_blank'; a.rel='noopener noreferrer';
    append(a,el('span','thumb-channel-mark','▶'),el('span','thumb-channel-label',channel.name),el('span','thumb-channel-subtitle',channel.subtitle || ''),el('span','thumb-channel-arrow','↗'));
    byId('thumb-channels').append(a);
  });
  (DATA.thumbnails || []).forEach((item,index) => {
    const card=el('article','thumb-card');
    const trigger=el('button','thumb-preview');trigger.type='button';trigger.setAttribute('aria-label','Ampliar miniatura: '+item.title);
    const img=imageFor({kind:'image',src:item.image,alt:'Miniatura: '+item.title},'design');
    append(trigger,img,el('span','thumb-index',String(index+1).padStart(2,'0')),el('span','thumb-preview-overlay','AMPLIAR +'));
    trigger.addEventListener('click',() => openDetails({
      title:item.title,subtitle:item.channel,category:'design',description:item.caption,link:item.url,
      media:{kind:'image',src:item.image,alt:'Miniatura: '+item.title}
    }));
    const bottom=el('div','thumb-card-copy');
    append(bottom,el('span','thumb-card-channel',item.channel || 'YouTube'),el('h3','',item.title));
    if(safeUrl(item.url)) {const link=el('a','thumb-card-link','Ver vídeo ↗');link.href=item.url;link.target='_blank';link.rel='noopener noreferrer';bottom.append(link);}
    append(card,trigger,bottom);byId('thumb-grid').append(card);
  });

  // Credenciales: se muestra solo información pública. Nunca se sirven copias de documentos.
  const credentialGrid = byId('credential-grid');
  if (credentialGrid && Array.isArray(DATA.credentials)) {
    credentialGrid.replaceChildren();
    DATA.credentials.forEach((item,index) => {
      const card=el('article','credential-card');
      const header=el('div','credential-card-top');
      append(header,el('span','credential-number',String(index+1).padStart(2,'0')+' / '+String(DATA.credentials.length).padStart(2,'0')),el('span','credential-kind',item.type||'Acreditación'));
      append(card,header,el('h3','',item.title||'Acreditación'),el('p','credential-issuer',[item.issuer,item.year].filter(Boolean).join(' · ')),el('p','credential-detail',item.detail||''));
      credentialGrid.append(card);
    });
  }
  const credentialRequest=byId('credential-request');
  if(credentialRequest){
    const recipient=String(DATA.site.email||'').replace(/[^a-zA-Z0-9@._+\-]/g,'');
    const subject=encodeURIComponent('Solicitud de acreditaciones profesionales — '+String(DATA.site.name||'Portfolio'));
    const body=encodeURIComponent('Hola,\n\nSolicito comprobar la formación y titulaciones para un proceso de selección.\n\nNombre y apellidos:\nEmpresa o agencia de selección:\nCorreo profesional de contacto:\nCredencial(es) a comprobar:\nEnlace de la oferta o perfil de la empresa (opcional):\n\nGracias.');
    credentialRequest.href='mailto:'+recipient+'?subject='+subject+'&body='+body;
  }

  // Trayectoria, formación y habilidades.
  (DATA.highlights || []).forEach(h => { const stat=el('div','stat'); append(stat,el('strong','',h.value),el('span','',h.label)); byId('stats-grid').append(stat); });
  (DATA.stack || []).forEach(group => {const row=el('div','stack-row');append(row,el('h3','',group.title),chips(group.items,'stack-chips'));byId('stack-list').append(row);});
  (DATA.experience || []).forEach(item => {const row=el('div','timeline-item');const details=el('div');append(details,el('h3','',item.title),el('p','',item.text));append(row,el('span','timeline-years',item.years),details);byId('timeline').append(row);});
  (DATA.education || []).forEach(item => {const row=el('div','education-item');append(row,el('h3','',item.name),el('p','',item.detail));byId('education').append(row);});

  // Modal multimedia: iframe solamente en hosts explícitamente permitidos.
  const dialog = byId('media-dialog'); const dialogContent = byId('dialog-content');
  const close = () => {dialog.close();dialogContent.replaceChildren();dialog.classList.remove('short-dialog');document.body.classList.remove('dialog-open');};
  byId('dialog-close').addEventListener('click',close);
  dialog.addEventListener('click',event => {if(event.target === dialog)close();});
  dialog.addEventListener('close',()=>{dialogContent.replaceChildren();document.body.classList.remove('dialog-open');});
  function iframeEmbed(url,title) {const frame=el('iframe');frame.src=url;frame.title=title;frame.loading='lazy';frame.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen';frame.referrerPolicy='strict-origin-when-cross-origin';frame.allowFullscreen=true;return frame;}
  function mediaElement(media,categoryId,title) {
    const wrapper=el('div','dialog-media'); const kind=media?.kind || 'image'; const raw=media?.src || '';
    if (kind === 'youtube') {const url=normalizedYoutube(raw);if(url){if(/(?:youtube\.com|youtu\.be)\/shorts\//.test(raw))wrapper.classList.add('is-short');return append(wrapper,iframeEmbed(url,title));}}
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
    const link = safeUrl(item.link || (item.media?.kind==='youtube' ? item.media.src : ''));
    if (link) {const a=el('a','dialog-link',item.media?.kind === 'youtube' ? 'Abrir en YouTube ↗' : 'Abrir enlace externo ↗');a.href=link;a.target='_blank';a.rel='noopener noreferrer';copy.append(a);}
    dialogContent.append(copy);dialog.classList.toggle('short-dialog',Boolean(dialogContent.querySelector('.dialog-media.is-short')));dialog.showModal();document.body.classList.add('dialog-open');
  }
  // Los trabajos destacados pueden abrir el visor sin duplicar su ficha de datos.
  document.querySelectorAll('.featured-open').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const project = (DATA.projects || []).find(item => item.id === trigger.dataset.project);
      if (project) openDetails(project);
    });
  });
  // El contenido se pinta antes de activar las animaciones, así los buscadores leen los textos normalmente.
  if (animateFirstVisit) {
    queueTitleAnimations();
    document.documentElement.classList.add('first-visit-titles');
  }

  // Navegación de móvil.
  const toggle=$('.nav-toggle');const menu=$('.nav-links');
  toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');});
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menú');}));
  document.addEventListener('keydown', e => { if(e.key === 'Escape' && menu.classList.contains('open')) { menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menú');toggle.focus(); } });
})();
