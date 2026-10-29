const photos={
  hero:{file:'kitchen-69.jpg',title:'Кухня с фасадами под дерево',alt:'Кухня Эстет-М с фасадами под дерево и чёрной вытяжкой'},
  light:{file:'kitchen-75.jpg',title:'Светлая кухня с витриной',alt:'Светлая кухня Эстет-М со стеклянной витриной и встроенной техникой'},
  graphite:{file:'kitchen-68.jpg',title:'Дерево и тёмные фасады',alt:'Кухня Эстет-М с тёмными фасадами и подсветкой рабочей зоны'},
  blue:{file:'kitchen-72.jpg',title:'Синяя кухня с витринами',alt:'Синяя кухня Эстет-М с рамочными фасадами и стеклянными витринами'},
  wood:{file:'kitchen-63.jpg',title:'Белый и текстура дерева',alt:'Кухня Эстет-М с белыми фасадами и фасадами под дерево'},
  green:{file:'kitchen-66.jpg',title:'Белый и глубокий зелёный',alt:'Бело-зелёная угловая кухня Эстет-М'},
  classic:{file:'kitchen-73.jpg',title:'Светлая классика',alt:'Светлая классическая кухня Эстет-М с угловой композицией'}
};
const photoDialog=document.querySelector('#photo-dialog');
const contactDialog=document.querySelector('#contact-dialog');
let selectedPhoto=null;
let returnFocus=null;
function syncScrollLock(){document.body.classList.toggle('modal-open',!!document.querySelector('dialog[open]'));}
function openPhoto(key,trigger){
  const photo=photos[key];if(!photo)return;
  selectedPhoto=photo;returnFocus=trigger;
  const img=document.querySelector('#dialog-photo');img.src='assets/'+photo.file;img.alt=photo.alt;
  document.querySelector('#photo-title').textContent=photo.title;
  photoDialog.showModal();syncScrollLock();
}
function openContact(photo=null,trigger=null){
  if(photoDialog.open)photoDialog.close();
  if(trigger)returnFocus=trigger;
  selectedPhoto=photo;
  const selection=document.querySelector('#selected-work');selection.hidden=!photo;
  if(photo){document.querySelector('#selected-image').src='assets/'+photo.file;document.querySelector('#selected-title').textContent=photo.title;}
  const topic=photo?'Обсуждение кухни: '+photo.title:'Кухня на заказ';
  const message=photo?'Добрый день! Понравилась кухня «'+photo.title+'». Хочу обсудить похожую кухню под своё помещение.\n\nРазмеры и пожелания: ':'Добрый день! Хочу обсудить кухню на заказ.\n\nРазмеры и пожелания: ';
  document.querySelector('#email-link').href='mailto:kupestil@list.ru?subject='+encodeURIComponent(topic)+'&body='+encodeURIComponent(message);
  contactDialog.showModal();syncScrollLock();
}
document.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>openPhoto(button.dataset.photo,button)));
document.querySelectorAll('[data-contact]').forEach(button=>button.addEventListener('click',()=>openContact(null,button)));
document.querySelector('#discuss-photo').addEventListener('click',()=>openContact(selectedPhoto));
document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>document.getElementById(button.dataset.close).close()));
document.querySelectorAll('dialog').forEach(dialog=>{
  dialog.addEventListener('close',()=>{syncScrollLock();if(!document.querySelector('dialog[open]')&&returnFocus?.isConnected)returnFocus.focus();});
  dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();});
});
const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('#navigation');
function closeMenu(){toggle.setAttribute('aria-expanded','false');nav.classList.remove('is-open');}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
window.matchMedia('(min-width:1061px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
const track=document.querySelector('#works-track');const previous=document.querySelector('[data-gallery="previous"]');const next=document.querySelector('[data-gallery="next"]');
function updateGallery(){previous.disabled=track.scrollLeft<4;next.disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-4;}
function moveGallery(direction){const card=track.querySelector('.work');const gap=parseFloat(getComputedStyle(track).columnGap)||0;const step=card.getBoundingClientRect().width+gap;const visible=Math.max(1,Math.floor((track.clientWidth+gap)/step));track.scrollBy({left:direction*step*visible,behavior:window.matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});}
previous.addEventListener('click',()=>moveGallery(-1));next.addEventListener('click',()=>moveGallery(1));track.addEventListener('scroll',updateGallery,{passive:true});window.addEventListener('resize',updateGallery);updateGallery();
