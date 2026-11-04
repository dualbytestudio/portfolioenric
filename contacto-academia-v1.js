/* Progressive enhancement: floating contact and optional academy URL. */
(()=>{
 'use strict';
 const $=id=>document.getElementById(id);
 const data=window.PORTFOLIO||{};
 const school=data.futureBusiness||{};
 const setText=(id,str)=>{const node=$(id);if(node&&str)node.textContent=String(str)};
 setText('academy-eyebrow',school.eyebrow);
 setText('academy-description',school.description);
 setText('academy-state',school.status);
 const title=$('academy-title');
 if(title&&school.title){const bits=String(school.title).match(/^(.*?)\s+(a tu ritmo\.)$/i);if(bits){title.replaceChildren(document.createTextNode(bits[1]+' '));const em=document.createElement('em');em.textContent=bits[2];title.append(em);}else title.textContent=school.title;}
 const academy=$('academy-link');
 if(academy){let raw=String(school.url||'').trim();
   try {const url=new URL(raw,location.href);
     if(/^https?:\/\//i.test(raw)&&['https:','http:'].includes(url.protocol)){academy.href=url.href;academy.target='_blank';academy.rel='noopener noreferrer';academy.firstChild.textContent='Visitar academia ';}
   }catch(_){ /* Keep accessible local preview link. */ }
 }
 const dialog=$('contact-dialog'),fab=$('contact-fab'),close=$('contact-dialog-close'),form=$('contact-compose-form');
 if(!dialog||!fab||!close||!form||typeof dialog.showModal!=='function')return;
 let lastFocus=null;
 const open=e=>{if(e){e.preventDefault();}if(dialog.open)return;lastFocus=document.activeElement;dialog.showModal();close.focus({preventScroll:true});};
 fab.addEventListener('click',open);
 document.querySelectorAll('[data-open-contact]').forEach(a=>a.addEventListener('click',open));
 const dismiss=()=>{if(dialog.open)dialog.close();};
 close.addEventListener('click',dismiss);
 dialog.addEventListener('click',e=>{if(e.target===dialog)dismiss();});
 dialog.addEventListener('close',()=>{if(lastFocus&&typeof lastFocus.focus==='function')lastFocus.focus({preventScroll:true});});
 const email=()=>String(data.site?.email||'').replace(/[^a-zA-Z0-9@._+\-]/g,'');
 form.addEventListener('submit',e=>{
   e.preventDefault();
   const recipient=email();if(!recipient)return;
   const subject=String($('contact-type')?.value||'Contacto desde el portfolio');
   const message=String($('contact-msg')?.value||'').trim();
   const body=['Hola Enric,','',message||'Me gustaría contactar contigo.','','Enviado desde tu portfolio.'].join('\n');
   const a=document.createElement('a');a.href='mailto:'+recipient+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
   a.style.display='none';document.body.append(a);a.click();a.remove();
 });
 $('contact-copy-email')?.addEventListener('click',async()=>{
   const recipient=email();if(!recipient)return;
   const status=$('contact-copy-feedback');
   try{if(!navigator.clipboard?.writeText)throw Error('clipboard unavailable');await navigator.clipboard.writeText(recipient);status.textContent='Dirección copiada';}
   catch(_){status.textContent='Copia el correo desde la sección de contacto';}
 });
})();
