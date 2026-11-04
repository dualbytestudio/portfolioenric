/* Editor local de contenido.js · sin cuentas, servidores ni librerías */
(() => {
  'use strict';
  let state = JSON.parse(JSON.stringify(window.PORTFOLIO || {}));
  const $ = id => document.getElementById(id);
  const el = (tag, cls, label) => { const node=document.createElement(tag); if(cls)node.className=cls; if(label!==undefined)node.textContent=label; return node; };
  const holder=$('editor-content');
  const descriptions={
    perfil:['Perfil & contacto','Nombre, mensajes principales, fotografía, redes y datos generales.'],
    proyectos:['Proyectos','Añade, modifica y reordena fichas. Incluyen imágenes, vídeos y enlaces externos.'],
    galeria:['Galería & vídeos','Publica arte, capturas, renders, modelos interactivos y showreels.'],
    miniaturas:['Miniaturas de YouTube','Añade, elimina o reordena las portadas que mejor representan tu trabajo gráfico.'],
    especialidades:['Especialidades','Cambia los servicios y disciplinas que aparecen en las ocho tarjetas iniciales.'],
    trayectoria:['Trayectoria & acreditaciones','Formación acreditada, experiencia, estadísticas y competencias.'],
    avanzado:['JSON avanzado','Edita toda la estructura de una vez. Recomendado solo si ya manejas JSON.']
  };
  let tab='perfil';
  let edited=false;
  const dirty=()=>{edited=true;$('editor-status').textContent='Cambios pendientes: descarga contenido.js para guardarlos.';$('editor-status').className='warning';};
  const wrap=(parent,...children)=>{children.forEach(c=>parent.append(c));return parent;};
  const panel=(title,description)=>{const box=el('section','edit-panel');box.append(el('h2','',title));if(description)box.append(el('p','',description));holder.append(box);return box;};
  const field=(obj,key,label,opts={})=>{
    const wrapper=el('div',`field${opts.full?' full':''}${opts.type==='checkbox'?' checkbox':''}`);
    const id='e-'+Math.random().toString(36).slice(2);
    const lab=el('label','',label);lab.htmlFor=id;
    let input;
    if(opts.options){input=el('select');opts.options.forEach(({value,name})=>{const option=el('option','',name);option.value=value;input.append(option);});}
    else if(opts.type==='textarea'){input=el('textarea');input.rows=opts.rows||4;}
    else {input=el('input');input.type=opts.type==='checkbox'?'checkbox':'text';}
    input.id=id;input.name=key;
    const value=obj[key];
    if(opts.type==='checkbox') input.checked=Boolean(value);
    else if(opts.csv) input.value=Array.isArray(value)?value.join(', '):'';
    else input.value=value==null?'':String(value);
    input.addEventListener(opts.type==='checkbox'||opts.options?'change':'input',()=>{
      obj[key]=opts.type==='checkbox'?input.checked:opts.csv?input.value.split(',').map(s=>s.trim()).filter(Boolean):input.value;
      dirty();
    });
    wrapper.append(lab,input);
    if(opts.help)wrapper.append(el('small','',opts.help));
    return wrapper;
  };
  const grid=(...fields)=>wrap(el('div','field-grid'),...fields);
  const help=(text)=>wrap(holder,el('div','hint-box',text));
  const mediaFields=(media)=>{
    const types=[['image','Imagen'],['youtube','YouTube'],['vimeo','Vimeo'],['video','Vídeo MP4 / WEBM'],['sketchfab','Sketchfab interactivo'],['model','Modelo 3D GLB']].map(([value,name])=>({value,name}));
    return grid(
      field(media,'kind','Tipo de contenido',{options:types}),
      field(media,'src','Ruta del archivo o enlace',{full:true,help:'Ej.: assets/media/mi-arte.webp · https://youtu.be/XXXXXXXXXXX · https://sketchfab.com/3d-models/...'}),
      field(media,'poster','Miniatura para vídeos (opcional)',{full:true,help:'Ej.: assets/media/portada.webp'}),
      field(media,'alt','Descripción accesible (alt)',{full:true,help:'Describe brevemente qué se ve en la imagen.'})
    );
  };
  function buttonsForItem(arr,index,rerender){
    const actions=el('div','item-actions');
    const btn=(label,method,cls='')=>{const b=el('button',cls,label);b.type='button';b.addEventListener('click',method);return b;};
    actions.append(btn('↑',()=>move(arr,index,-1,rerender)),btn('↓',()=>move(arr,index,1,rerender)),btn('Duplicar',()=>{arr.splice(index+1,0,JSON.parse(JSON.stringify(arr[index])));if(arr[index+1].id)arr[index+1].id=String(arr[index+1].id)+'-copia';dirty();rerender();}),btn('Borrar',()=>{if(confirm('¿Eliminar este elemento?')){arr.splice(index,1);dirty();rerender();}},'delete'));
    return actions;
  }
  function move(arr,index,delta,render){const next=index+delta;if(next<0||next>=arr.length)return;[arr[index],arr[next]]=[arr[next],arr[index]];dirty();render();}
  function collection(arr,parent,create,renderItem,rerender){
    const list=el('div','editor-collection');
    arr.forEach((item,index)=>{
      const card=el('div','item-card');
      const header=el('div','item-head');wrap(header,el('strong','',item.title||item.name||item.label||item.years||`Elemento ${index+1}`),buttonsForItem(arr,index,rerender));card.append(header);
      card.append(renderItem(item,index));list.append(card);
    });
    parent.append(list);
    const footer=el('div','collection-actions');const add=el('button','primary-btn','+ Añadir elemento');add.type='button';add.addEventListener('click',()=>{arr.push(create());dirty();rerender();});footer.append(add);parent.append(footer);
  }
  function renderPerfil(){
    const s=state.site;
    const p=panel('Presentación','Modifica las frases de portada y la introducción.');
    p.append(grid(field(s,'name','Nombre público'),field(s,'initials','Iniciales'),field(s,'eyebrow','Etiqueta superior',{full:true}),field(s,'headline1','Título principal · línea 1',{full:true}),field(s,'headline2','Título principal · línea 2',{full:true}),field(s,'intro','Texto bajo el título',{type:'textarea',full:true}),field(s,'about','Descripción «Sobre mí»',{type:'textarea',full:true})));
    const c=panel('Contacto e identidad','El teléfono no se publica por defecto, para evitar spam.');
    c.append(grid(field(s,'email','Email'),field(s,'location','Ubicación'),field(s,'availability','Estado / disponibilidad',{full:true}),field(s,'portrait','Ruta de la fotografía',{full:true,help:'Ej.: assets/media/retrato-enric.png'}),field(s,'cv','Ruta al PDF del CV (opcional)',{full:true,help:'Ej.: assets/media/cv.pdf. El botón solo se muestra si rellenas este campo.'}),field(s,'footerNote','Frase del pie de página',{full:true})));
    state.futureBusiness ||= {name:'Academia digital (próximamente)',eyebrow:'EN DESARROLLO · FUTURO PROYECTO',title:'Aprender a tu ritmo.',description:'Plataforma de clases online pregrabadas.',url:'',status:'Próximamente'};
    const academy=panel('Futura academia online','Mientras no tengas dominio propio, el botón enlaza a academia.html, una vista previa dentro del portfolio. Cuando publiques tu negocio, escribe la dirección completa en URL externa.');
    academy.append(grid(field(state.futureBusiness,'name','Nombre del proyecto',{full:true}),field(state.futureBusiness,'eyebrow','Etiqueta superior',{full:true}),field(state.futureBusiness,'title','Título de presentación',{full:true}),field(state.futureBusiness,'description','Descripción',{type:'textarea',full:true}),field(state.futureBusiness,'status','Estado visible'),field(state.futureBusiness,'url','URL pública de la futura academia',{full:true,help:'Déjala vacía hasta que tengas la web real. Ej.: https://tudominio.com'})));
    const networks=panel('Redes sociales','Solo se mostrarán las redes con una URL completa.');
    collection(s.socials,networks,()=>({label:'Nueva red',url:''}),i=>grid(field(i,'label','Nombre'),field(i,'url','URL completa')) ,render);
    help('Las fotografías, PDF, vídeos y demás archivos deben existir en la carpeta indicada. El editor cambia rutas, pero no copia los archivos automáticamente.');
  }
  function renderProyectos(){
    const p=panel('Fichas del portfolio','Los elementos marcados como «Por completar» se identifican visualmente para no presentarlos como proyectos terminados.');
    collection(state.projects,p,()=>({id:'nuevo-proyecto-'+Date.now(),title:'Mi nuevo proyecto',subtitle:'',category:'web',type:'Proyecto personal',description:'Describe qué construiste y qué aportaste.',tags:[],media:{kind:'image',src:'assets/covers/web.svg',poster:'',alt:''},link:'',clientType:'',featured:false,placeholder:false}),item=>{
      item.media ||= {kind:'image',src:'',alt:''};
      const all=el('div');all.append(grid(field(item,'title','Título'),field(item,'subtitle','Subtítulo'),field(item,'category','Categoría',{options:state.categories.map(c=>({value:c.id,name:c.name}))}),field(item,'clientType','Aparecer en escaparate de webs (solo categoría Web)',{options:[{value:'',name:'No / proyecto normal'},{value:'own',name:'Sí · proyecto propio'},{value:'paddock',name:'Sí · colaboración Paddock'}]}),field(item,'type','Tipo / etiqueta'),field(item,'description','Descripción del proyecto',{type:'textarea',full:true}),field(item,'tags','Tecnologías (separadas por comas)',{csv:true,full:true}),field(item,'link','Enlace externo (opcional)',{full:true}),field(item,'placeholder','Marcar «Por completar»',{type:'checkbox'}),field(item,'demoUnavailable','Mostrar aviso «Sin demo»',{type:'checkbox'}),field(item,'featured','Mostrar primero como proyecto destacado',{type:'checkbox'})));
      all.append(el('h3','', 'Imagen, vídeo o modelo 3D'));all.append(mediaFields(item.media));return all;
    },render);
    help('Si creas una web y quieres verla en el escaparate principal, elige categoría «Web» y en «Aparecer en escaparate» marca Proyecto propio o Colaboración Paddock. Ejemplo de YouTube: selecciona «YouTube» y pega https://www.youtube.com/watch?v=VIDEO_ID. Ejemplo de Sketchfab: selecciona «Sketchfab interactivo» y pega la URL pública del modelo.');
  }
  function renderGaleria(){
    const p=panel('Galería multimedia','Puedes usar imágenes, renders, vídeos de YouTube / Vimeo, MP4, Sketchfab y modelos .glb.');
    collection(state.gallery,p,()=>({id:'nueva-galeria-'+Date.now(),title:'Nueva pieza',category:'design',caption:'Texto opcional de la pieza',media:{kind:'image',src:'assets/covers/design.svg',poster:'',alt:''},placeholder:false}),item=>{
      item.media ||= {kind:'image',src:'',alt:''};
      const node=el('div');node.append(grid(field(item,'title','Título'),field(item,'category','Categoría',{options:state.categories.map(c=>({value:c.id,name:c.name}))}),field(item,'caption','Descripción',{type:'textarea',full:true}),field(item,'placeholder','Mostrar «Muestra editable»',{type:'checkbox'})));node.append(el('h3','', 'Archivo o embed'));node.append(mediaFields(item.media));return node;
    },render);
    const btn=el('button','secondary-btn','¿Cómo añado mis imágenes y vídeos?');btn.type='button';btn.addEventListener('click',()=> $('help-dialog').showModal());holder.append(btn);
  }
  function renderMiniaturas(){
    state.thumbnails ||= [];
    state.thumbnailChannels ||= [];
    let p=panel('Selección de miniaturas','Las imágenes públicas pueden usar https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg. También puedes subir imágenes propias a assets/media/miniaturas/ y poner la ruta.');
    collection(state.thumbnails,p,()=>({id:'miniatura-'+Date.now(),title:'Nueva miniatura',channel:'Betalf99',caption:'',image:'',url:'',featured:false}),i=>grid(
      field(i,'title','Título'),field(i,'channel','Canal o procedencia'),field(i,'caption','Descripción',{type:'textarea',full:true}),field(i,'image','URL de la miniatura o ruta local',{full:true}),field(i,'url','Enlace al vídeo o proyecto',{full:true})
    ),render);
    p=panel('Gestión de canales de YouTube','Aparecen como tres tarjetas en la sección «Canales» y como enlaces encima de la galería de miniaturas. Puedes editar nombre, imagen, descripción, orden y URL.');
    collection(state.thumbnailChannels,p,()=>({name:'Nuevo canal',subtitle:'',description:'',role:'Gestión de canal',image:'assets/covers/youtube.svg',imageAlt:'',url:''}),i=>grid(field(i,'name','Nombre'),field(i,'subtitle','Texto breve'),field(i,'role','Tu función'),field(i,'description','Descripción del canal',{type:'textarea',full:true}),field(i,'image','Ruta de imagen o miniatura',{full:true,help:'Ejemplo: https://i.ytimg.com/vi/ID/hqdefault.jpg o assets/covers/channel-dualbyte.svg'}),field(i,'imageAlt','Descripción accesible de la imagen',{full:true}),field(i,'url','Enlace directo al canal',{full:true})),render);
    help('Las miniaturas públicas de YouTube requieren conexión a internet. Si quieres tenerlas almacenadas en tu web y controlar su calidad, añade las imágenes descargadas por ti a assets/media/miniaturas/ y usa rutas locales.');
  }
  function renderEspecialidades(){
    const p=panel('Áreas de especialidad','Estas áreas aparecen en las tarjetas de servicios y en los botones de filtro. No cambies el ID si ya hay proyectos usando esa categoría.');
    collection(state.categories,p,()=>({id:'nueva-categoria-'+Date.now(),name:'Nueva especialidad',number:'09',symbol:'✦',description:'',tools:[]}),item=>grid(field(item,'id','ID (sin espacios)'),field(item,'name','Nombre'),field(item,'number','Número'),field(item,'symbol','Símbolo'),field(item,'description','Descripción',{type:'textarea',full:true}),field(item,'tools','Tecnologías (separadas por comas)',{csv:true,full:true})),render);
    help('Los colores e ilustraciones están preparados para las categorías incluidas. Una nueva categoría funcionará, aunque inicialmente reutilizará una portada por defecto.');
  }
  function renderTrayectoria(){
    let p=panel('Estadísticas de portada','Ejemplos: «≈3K», «2014», «10+». Solo usa datos verificables.');
    collection(state.highlights,p,()=>({value:'—',label:'Nueva estadística'}),i=>grid(field(i,'value','Valor'),field(i,'label','Descripción')),render);
    p=panel('Experiencia profesional y proyectos personales');
    collection(state.experience,p,()=>({years:'2026',title:'Nueva experiencia',text:''}),i=>grid(field(i,'years','Fechas'),field(i,'title','Título'),field(i,'text','Descripción',{type:'textarea',full:true})),render);
    state.credentials ||= [];
    p=panel('Títulos y documentos acreditativos','Solo se publican nombres, entidades y descripciones. No introduzcas números de DNI, certificados ni enlaces a PDFs privados.');
    collection(state.credentials,p,()=>({title:'Nueva acreditación',type:'Certificado',issuer:'',year:'',detail:''}),i=>grid(field(i,'title','Nombre de acreditación',{full:true}),field(i,'type','Tipo de documento'),field(i,'issuer','Entidad emisora',{full:true}),field(i,'year','Año (opcional)'),field(i,'detail','Detalles públicos (sin datos personales)',{type:'textarea',full:true})),render);
    p=panel('Formación');
    collection(state.education,p,()=>({name:'Nueva formación',detail:''}),i=>grid(field(i,'name','Nombre de formación',{full:true}),field(i,'detail','Detalles',{type:'textarea',full:true})),render);
    p=panel('Habilidades y herramientas');
    collection(state.stack,p,()=>({title:'Nuevo grupo',items:[]}),i=>grid(field(i,'title','Grupo'),field(i,'items','Elementos separados por comas',{csv:true,full:true})),render);
  }
  function renderAvanzado(){
    const p=panel('Edición de JSON','Si cambias algo aquí, pulsa «Aplicar JSON» antes de descargar. JSON admite comillas dobles, no comentarios ni comas finales.');
    const area=el('textarea','advanced-textarea');area.id='advanced-input';area.value=JSON.stringify(state,null,2);area.spellcheck=false;p.append(area);
    const message=el('p','validation');p.append(message);
    const apply=el('button','primary-btn','Validar y aplicar JSON');apply.type='button';apply.addEventListener('click',()=>{
      try {const next=JSON.parse(area.value);if(!next.site||!Array.isArray(next.projects)||!Array.isArray(next.categories)||!Array.isArray(next.gallery))throw new Error('Faltan los apartados site, categories, projects o gallery.');state=next;dirty();message.textContent='✓ JSON válido. Ya puedes descargar contenido.js.';message.className='validation good';}
      catch(e){message.textContent='Error de JSON: '+e.message;message.className='validation warning';}
    });p.append(apply);
  }
  function render(){holder.replaceChildren();const [title,description]=descriptions[tab];$('tab-title').textContent=title;$('tab-desc').textContent=description;
    ({perfil:renderPerfil,proyectos:renderProyectos,galeria:renderGaleria,miniaturas:renderMiniaturas,especialidades:renderEspecialidades,trayectoria:renderTrayectoria,avanzado:renderAvanzado})[tab]();
  }
  document.querySelectorAll('#editor-nav button').forEach(button=>button.addEventListener('click',()=>{tab=button.dataset.tab;document.querySelectorAll('#editor-nav button').forEach(b=>b.classList.toggle('active',b===button));render();window.scrollTo({top:0,behavior:'smooth'});}));
  function download(){
    const content='/** Portfolio de Enric: edita con editar.html o a mano. */\nwindow.PORTFOLIO = '+JSON.stringify(state,null,2)+';\n';
    const blob=new Blob([content],{type:'text/javascript;charset=utf-8'});
    const link=document.createElement('a');const url=URL.createObjectURL(blob);link.href=url;link.download='contenido.js';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),5000);
    edited=false;$('editor-status').textContent='Archivo descargado. Sustituye el contenido.js antiguo por este.';$('editor-status').className='good';
  }
  $('download').addEventListener('click',download);$('download-bottom').addEventListener('click',download);
  $('help-close').addEventListener('click',()=> $('help-dialog').close());
  window.addEventListener('beforeunload',event=>{if(edited){event.preventDefault();event.returnValue='';}});
  render();
})();
