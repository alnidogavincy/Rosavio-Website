import { atelierStages, type AtelierLanguage, type AtelierCard, type AtelierStage } from '@/config/atelier';
import { cardIcons } from './icons';
import { brand, officialCheckout } from '@/config/brand';

/** Scoped enhancement of the user's own HTML. Every global listener/timer is disposed. */
export function mountAtelier(root: HTMLElement) {
  const byId = <T extends HTMLElement = HTMLElement>(id: string) => root.querySelector<T>(`#${id}`)!;
  const abort = new AbortController();
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let stageIndex = 0;
  let expanded = false;
  let language: AtelierLanguage = 'en';
  let mode: 'noir' | 'studio' = 'noir';
  let tour: ReturnType<typeof setInterval> | undefined;
  let revealTimer: ReturnType<typeof setTimeout> | undefined;
  let toastTimer: ReturnType<typeof setTimeout> | undefined;
  let lastWheel = 0;
  let touchY = 0;
  let previousFocus: HTMLElement | null = null;
  let modalOpen = false;
  let frame = 0;
  let focusFrame = 0;
  let disposed = false;
  const backgroundIds = ['bg-stage-0','bg-stage-1','bg-stage-2','bg-stage-3-studio','bg-stage-3-noir'];
  const hero = byId('hero-bottle-stage4');
  const dialogBackdrop = byId('luxury-modal-backdrop');
  const panel = byId('luxury-modal-panel');
  const cards = byId('glass-cards-grid');
  const data = () => atelierStages[language][stageIndex];
  const say = (en: string, id: string) => language === 'en' ? en : id;
  const escape = (value: string) => value.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
  function visible(element: HTMLElement, show: boolean) {
    element.classList.toggle('opacity-100', show);
    element.classList.toggle('opacity-0', !show);
    element.classList.toggle('pointer-events-none', !show);
    element.classList.toggle('pointer-events-auto', show);
    element.inert = !show;
    element.setAttribute('aria-hidden', String(!show));
  }
  function toast(message: string) {
    clearTimeout(toastTimer);
    byId('atelier-toast-msg').textContent = message;
    visible(byId('atelier-toast'), true);
    toastTimer = setTimeout(() => visible(byId('atelier-toast'), false), 2800);
  }
  function stopTour() {
    clearInterval(tour); tour = undefined;
    byId('tour-btn-label').textContent = say('Auto-Play Video Tour', 'Putar Tur Animasi');
    byId('btn-cinematic-tour').setAttribute('aria-pressed', 'false');
    byId('tour-dot').classList.remove('bg-emerald-400');
  }
  function setMode(next: 'noir' | 'studio', spray = false) {
    clearTimeout(revealTimer);
    mode = next;
    backgroundIds.forEach((id, index) => {
      const show = stageIndex < 3 ? index === stageIndex : index === (mode === 'studio' ? 3 : 4);
      const element = byId(id);
      element.classList.toggle('opacity-100', show);
      element.classList.toggle('opacity-0', !show);
      element.classList.toggle('scale-100', show);
      element.classList.toggle('scale-110', !show);
      element.classList.remove('scale-105');
    });
    const show = stageIndex === 3 && mode === 'noir';
    visible(hero, show);
    hero.classList.toggle('scale-100', show); hero.classList.toggle('scale-90', !show);
    // Parent stays transparent to pointer events; only the bottle itself is interactive.
    hero.style.pointerEvents = 'none';
    for (const option of ['noir','studio'] as const) {
      byId(`btn-mode-${option}`).className = `px-2.5 py-1 rounded-full transition-all ${mode===option?'bg-white/25 text-white font-medium':'text-white/65 hover:text-white'}`;
      byId(`btn-mode-${option}`).setAttribute('aria-pressed', String(mode === option));
    }
    root.dataset.mode = mode;
    if (spray && show) sprayMist();
  }
  function setExpanded(value: boolean) {
    expanded = value; root.dataset.expanded = String(value);
    const description = byId('story-body-container');
    description.classList.toggle('opacity-100', !value); description.classList.toggle('opacity-0', value);
    description.classList.toggle('max-h-72', !value); description.classList.toggle('max-h-0', value);
    description.classList.toggle('mt-5', !value); description.classList.toggle('sm:mt-6', !value);
    description.classList.toggle('mt-0', value);
    description.setAttribute('aria-hidden',String(value));
    visible(byId('glass-cards-wrapper'),value);
    byId('glass-cards-wrapper').classList.toggle('translate-y-10',!value);
    byId('glass-cards-wrapper').classList.toggle('translate-y-0',value);
    byId('btn-secondary-story').classList.toggle('hidden',!value);
    byId('btn-secondary-story').textContent=say('Show Story Note','Lihat Catatan Cerita');
    byId('stage-cta-text').textContent=value ? (stageIndex===3?say('EXPLORE ROSAVIA 18ML STUDIO','LIHAT STUDIO ROSAVIA 18ML'):say('CONTINUE TO NEXT STAGE','LANJUT KE TAHAP BERIKUTNYA')) : data().ctaText;
    byId('btn-stage-cta').setAttribute('aria-expanded',String(value));
    byId('btn-stage-cta').setAttribute('aria-controls','glass-cards-wrapper');
    byId('btn-next-step').setAttribute('aria-label',value?say('Next chapter','Bab selanjutnya'):say('Show chapter cards','Tampilkan kartu bab'));
  }
  function renderStage(index: number, showCards = false, flash = false) {
    clearTimeout(revealTimer);
    stageIndex = (index + 4) % 4;
    const stage = data();
    root.dataset.stage=String(stageIndex);
    root.querySelectorAll<HTMLButtonElement>('[data-stage-nav]').forEach((button,i)=>{
      button.setAttribute('aria-label',atelierStages[language][i].navName);
      if(i===stageIndex)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');
      const indicator=button.querySelector<HTMLElement>('.nav-indicator')!;
      indicator.classList.toggle('w-6',i===stageIndex);indicator.classList.toggle('w-0',i!==stageIndex);
      indicator.classList.toggle('opacity-100',i===stageIndex);indicator.classList.toggle('opacity-0',i!==stageIndex);
      const label=button.querySelector<HTMLElement>('.nav-label')!;
      label.textContent=atelierStages[language][i].navName;
      label.classList.toggle('text-white',i===stageIndex);label.classList.toggle('text-white/45',i!==stageIndex);
      label.classList.toggle('font-medium',i===stageIndex);label.classList.toggle('font-normal',i!==stageIndex);
    });
    byId('counter-current').textContent=stage.counter;
    byId('material-heading-label').textContent=stage.materialHeader;
    byId('material-title').innerHTML=stage.materialName;
    byId('stage-eyebrow').textContent=stage.eyebrow;
    byId('stage-headline').innerHTML=stage.headline;
    byId('stage-description').innerHTML=stage.description;
    byId('watermark-text').textContent=stage.watermark;
    byId('stage4-mode-switcher').classList.toggle('hidden',stageIndex!==3);
    cards.className='grid grid-cols-1 gap-3.5 sm:gap-5 '+stage.cardsCols;
    cards.innerHTML=stage.cards.map((card,i)=>`<button type="button" data-card-idx="${i}" class="luxury-glass-card text-left rounded-2xl p-4 sm:p-5 flex flex-col justify-between min-h-[168px] sm:min-h-[188px] cursor-pointer pointer-events-auto" style="transition-delay:${i*80}ms"><span class="flex flex-wrap items-center gap-1.5 sm:gap-2"><span class="w-7 h-7 rounded-full bg-white/10 border border-white/25 flex items-center justify-center shrink-0">${cardIcons[card.icon]}</span>${card.pills.map(p=>`<span class="glass-pill px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] text-white/90 tracking-wide">${escape(p)}</span>`).join('')}</span><span class="mt-5 block"><span class="flex items-center justify-between"><span class="text-sm sm:text-[15.5px] font-semibold tracking-tight text-white">${escape(card.title)}</span><span class="text-[10px] text-pink-200/80 uppercase tracking-widest">Inspect +</span></span><span class="block text-[11.5px] sm:text-[12.5px] leading-[1.55] text-white/75 font-light mt-1.5">${card.body}</span></span></button>`).join('');
    setExpanded(showCards);
    setMode(stageIndex===3 && flash && !motion.matches?'studio':mode);
    if(stageIndex===3 && flash && !motion.matches) revealTimer=setTimeout(()=>setMode('noir',true),1350);
    window.history.replaceState(null,'',`#chapter-${stageIndex+1}`);
  }
  function forward(){if(!expanded)setExpanded(true);else renderStage(stageIndex+1,false,stageIndex===2);}
  function backward(){if(expanded)setExpanded(false);else renderStage(stageIndex-1,true);}
  function showDialog(title:string,eyebrow:string,body:string){
    stopTour();
    clearTimeout(revealTimer);
    if(!modalOpen)previousFocus=document.activeElement as HTMLElement;
    byId('modal-title').textContent=title;byId('modal-eyebrow').textContent=eyebrow;
    byId('modal-body-content').innerHTML=body;
    Array.from(root.children).forEach(child=>{if(child instanceof HTMLElement && child!==dialogBackdrop && child.id!=='atelier-toast')child.inert=true;});
    modalOpen=true;visible(dialogBackdrop,true);panel.classList.remove('scale-95');panel.classList.add('scale-100');
    panel.scrollTop=0;
    cancelAnimationFrame(focusFrame);
    focusFrame=requestAnimationFrame(()=>{if(modalOpen)byId('btn-close-modal').focus();});
  }
  function closeDialog(){
    if(!modalOpen)return;
    cancelAnimationFrame(focusFrame);
    modalOpen=false;visible(dialogBackdrop,false);panel.classList.add('scale-95');panel.classList.remove('scale-100');
    Array.from(root.children).forEach(child=>{if(child instanceof HTMLElement && child!==dialogBackdrop)child.inert=false;});
    setExpanded(expanded);hero.inert=stageIndex!==3||mode!=='noir';
    previousFocus?.focus({preventScroll:true});
  }
  const photo=()=>`<img src="${brand.images.original}" alt="${escape(brand.images.originalAlt)}" class="w-full h-64 sm:h-80 object-contain bg-black/30 rounded-xl" />`;
  function cardDialog(stage:AtelierStage,card:AtelierCard){
    showDialog(card.title,stage.eyebrow,`<div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">${photo()}<div><div class="flex flex-wrap gap-2 mb-5">${card.pills.map(p=>`<span class="glass-pill px-3 py-1 rounded-full text-xs">${escape(p)}</span>`).join('')}</div><p class="text-sm leading-relaxed text-white/80">${card.body}</p><button type="button" data-jump="3" class="mt-6 px-4 py-2 rounded-full bg-[#d44d72] text-xs">View Rosavia 18mL Flacon →</button></div></div>`);
  }
  function openSection(section:string){
    if(section==='atelier'){
      const checkout=officialCheckout();
      showDialog('Rosavia Extrait de Parfume','MAISON ROSAVIA ATELIER',`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><img id="atelier-main-preview" src="${brand.images.original}" alt="${escape(brand.images.originalAlt)}" class="w-full h-64 sm:h-80 object-contain bg-black/30 rounded-xl"/><div class="flex gap-3 mt-3"><button data-photo="studio" class="glass-pill rounded-full px-4 py-2 text-xs">Pink Studio</button><button data-photo="bottle" class="glass-pill rounded-full px-4 py-2 text-xs">Noir Flacon</button></div></div><div class="space-y-5"><p class="font-editorial text-4xl">Soft Feminine Scent</p><p class="text-sm text-white/75 leading-relaxed">${say('The original Rosavia bottle and box. Discover the soft pink label, silver-colored cap and the details of the complete studio photograph.','Botol dan kotak Rosavia asli. Lihat label pink, tutup berwarna silver, dan detail foto studio secara utuh.')}</p><dl class="space-y-3 text-sm"><div class="flex justify-between border-b border-white/15 pb-3"><dt>Concentration</dt><dd>${brand.concentration}</dd></div><div class="flex justify-between border-b border-white/15 pb-3"><dt>Volume</dt><dd>${brand.volume}</dd></div><div class="flex justify-between border-b border-white/15 pb-3"><dt>Character</dt><dd>${brand.tagline}</dd></div></dl><div class="flex flex-wrap gap-3"><button data-jump="3" class="px-4 py-2 rounded-full bg-[#d44d72] text-xs">View Bottle Stage →</button>${checkout?`<a href="${escape(checkout)}" target="_blank" rel="noopener noreferrer" class="glass-pill rounded-full px-4 py-2 text-xs">Beli Rosavia →</a>`:''}</div></div></div>`);
    }else if(section==='method'){
      showDialog(say('Four Chapters of Rosavia','Empat Bab Rosavia'),'THE VISUAL STORY',`<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">${atelierStages[language].map((s,i)=>`<button data-jump="${i}" class="text-left luxury-glass-card rounded-xl p-5"><span class="text-xs text-pink-200">${s.eyebrow}</span><span class="block font-editorial text-3xl mt-2">${s.navName}</span><span class="block text-xs text-white/75 mt-3">${s.description}</span></button>`).join('')}</div>`);
    }else if(section==='contact'){
      showDialog(say('Connect with Maison Rosavia','Terhubung dengan Maison Rosavia'),'ATELIER CONTACT',`<div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">${photo()}<div><p class="font-editorial text-3xl">Rosavia · 18 mL</p><p class="text-sm text-white/75 leading-relaxed mt-4">${say('Official contact and social links have not been provided yet. Explore the original bottle and its story here.','Kontak dan tautan sosial resmi belum tersedia. Jelajahi foto asli produk dan cerita Rosavia di sini.')}</p><button data-section="atelier" class="mt-5 glass-pill rounded-full px-4 py-2 text-xs">Explore Rosavia →</button></div></div>`);
    }else{
      const glossary=section==='glossary';
      showDialog(glossary?'Atelier Glossary':say('The Visual Palette','Palet Visual'),'ROSAVIA — AN ARTISTIC INTERPRETATION',`<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">${(glossary?[
        ['Extrait de Parfume',say('The designation printed on the Rosavia bottle. No numerical concentration has been provided.','Sebutan pada label Rosavia. Persentase konsentrasi belum diberikan.')],['Soft Feminine Scent',say('The character statement printed on the original product label.','Identitas karakter yang tercetak pada label produk asli.')],['18 mL',say('The volume shown on the original bottle.','Volume yang tercantum pada botol asli.')],['Flacon',say('The bottle, shown here in its original photograph.','Botol parfum, ditampilkan melalui foto aslinya.')]
      ]:[['Rose',say('A visual metaphor for softness, not an ingredient claim.','Metafora visual kelembutan, bukan klaim kandungan.')],['Glass & Petals',say('A composition of light, reflections and floating motion.','Komposisi cahaya, refleksi, dan gerak kelopak.')],['Copper',say('Warm tones and sculptural form, not a production claim.','Rona hangat dan bentuk artistik, bukan klaim proses produksi.')],['Rosavia',`${brand.concentration} · ${brand.volume} · ${brand.tagline}`]]).map(([title,body])=>`<div class="luxury-glass-card rounded-xl p-5"><h4 class="font-editorial text-3xl">${title}</h4><p class="text-sm text-white/75 mt-3 leading-relaxed">${body}</p></div>`).join('')}</div>`);
    }
  }

  // Canvas animation uses a single cancellable frame loop; it pauses in hidden tabs/reduced motion.
  const canvas=byId<HTMLCanvasElement>('atelier-canvas');
  const ctx=canvas.getContext('2d');
  let width=innerWidth,height=innerHeight;
  type Particle={x:number;y:number;r:number;vx:number;vy:number;angle:number;spin:number;alpha:number};
  const particles:Particle[]=Array.from({length:34},()=>({x:Math.random()*width,y:Math.random()*height,r:2+Math.random()*5.5,vx:(Math.random()-.5)*.45,vy:.35+Math.random()*.65,angle:Math.random()*Math.PI*2,spin:(Math.random()-.5)*.02,alpha:.2+Math.random()*.45}));
  const mist:Particle[]=[];
  function resize(){width=root.clientWidth;height=root.clientHeight;const dpr=Math.min(devicePixelRatio,2);canvas.width=width*dpr;canvas.height=height*dpr;ctx?.setTransform(dpr,0,0,dpr,0,0);}
  function sprayMist(){
    if(motion.matches)return;
    const bottle=byId('rosavia-cutout-img').getBoundingClientRect();
    const ox=stageIndex===3&&mode==='noir'?bottle.x+bottle.width/2:width/2;
    const oy=stageIndex===3&&mode==='noir'?bottle.top+20:height*.38;
    for(let i=0;i<65;i++){const a=-Math.PI/2+(Math.random()-.5)*1.4,s=1.5+Math.random()*6.5;mist.push({x:ox,y:oy,r:1.5+Math.random()*3.5,vx:Math.cos(a)*s,vy:Math.sin(a)*s-.8,angle:0,spin:0,alpha:.8});}
  }
  let lastFrame=0;
  function animate(time:number){
    if(disposed||motion.matches||document.hidden||!ctx){frame=0;return;}
    const dt=Math.min((time-lastFrame)/16.67,2)||1;lastFrame=time;ctx.clearRect(0,0,width,height);
    for(const p of particles){p.angle+=p.spin*dt;p.x+=(Math.sin(p.angle)*.4+p.vx)*dt;p.y+=p.vy*(stageIndex===0?-.35:stageIndex===2?-.7:.85)*dt;if(p.y < -20)p.y=height+15;if(p.y>height+20){p.y=-15;p.x=Math.random()*width;}
      ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.angle);ctx.globalAlpha=p.alpha;ctx.fillStyle=stageIndex===2?'#e6c699':'#f4a6b8';ctx.beginPath();if(stageIndex===1||stageIndex===3)ctx.ellipse(0,0,p.r*1.45,p.r*.85,0,0,Math.PI*2);else ctx.arc(0,0,p.r*.45,0,Math.PI*2);ctx.fill();ctx.restore();}
    for(let i=mist.length-1;i>=0;i--){const p=mist[i];p.x+=p.vx*dt;p.y+=p.vy*dt;p.vx*=.97;p.vy*=.97;p.alpha-=.018*dt;if(p.alpha<=0){mist.splice(i,1);continue;}ctx.fillStyle=`rgba(244,166,184,${p.alpha})`;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();}
    frame=requestAnimationFrame(animate);
  }
  function syncMotion(){cancelAnimationFrame(frame);frame=0;lastFrame=0;ctx?.clearRect(0,0,width,height);byId('bottle-tilt-wrapper').style.transform='';if(motion.matches)stopTour();else if(!document.hidden)frame=requestAnimationFrame(animate);}

  root.addEventListener('click',(event)=>{
    const target=event.target as HTMLElement;
    if(target===dialogBackdrop){closeDialog();return;}
    const button=target.closest<HTMLElement>('button,a,[role="button"]');if(!button)return;
    if(button.dataset.stageNav!==undefined){stopTour();renderStage(Number(button.dataset.stageNav),false,button.dataset.stageNav==='3');return;}
    if(button.dataset.cardIdx!==undefined){cardDialog(data(),data().cards[Number(button.dataset.cardIdx)]);return;}
    if(button.dataset.jump!==undefined){closeDialog();renderStage(Number(button.dataset.jump));return;}
    if(button.dataset.photo){const img=byId<HTMLImageElement>('atelier-main-preview');img.src=button.dataset.photo==='studio'?brand.images.original:'/assets/atelier/reference-06.png';return;}
    const section=button.dataset.modalTarget||button.dataset.section;
    if(section){openSection(section);return;}
    if(button.dataset.social){openSection('contact');return;}
    switch(button.id){
      case 'btn-close-modal':closeDialog();break;
      case 'btn-cinematic-tour':if(tour){stopTour();}else if(motion.matches){toast(say('Reduced motion is enabled. Use the chapter controls.','Reduced motion aktif. Gunakan navigasi bab.'));}else{byId('tour-btn-label').textContent=say('Pause Video Tour','Jeda Tur Video');byId('btn-cinematic-tour').setAttribute('aria-pressed','true');byId('tour-dot').classList.add('bg-emerald-400');tour=setInterval(forward,2400);}break;
      case 'btn-stage-cta':stopTour();if(expanded&&stageIndex===3)openSection('atelier');else forward();break;
      case 'btn-secondary-story':stopTour();setExpanded(false);break;
      case 'btn-step-counter':stopTour();renderStage(stageIndex+1,false,stageIndex===2);break;
      case 'btn-next-step':case 'btn-scroll-indicator':stopTour();forward();break;
      case 'brand-home-trigger':stopTour();renderStage(0);break;
      case 'btn-mode-noir':stopTour();setMode('noir',true);break;
      case 'btn-mode-studio':stopTour();setMode('studio');break;
      case 'btn-spray-mist':case 'bottle-tilt-wrapper':sprayMist();toast(say('Rosavia — a visual mist animation.','Rosavia — animasi kabut visual.'));break;
      case 'btn-open-product-showcase':case 'btn-expand-studio':openSection('atelier');break;
      case 'btn-lang-toggle':stopTour();language=language==='en'?'id':'en';document.documentElement.lang=language;byId('lang-label').textContent=language==='en'?'Language · EN':'Bahasa · ID';byId('follow-line-1').textContent=say('Follow the atelier to stay updated','Ikuti cerita Maison Rosavia');renderStage(stageIndex,expanded);break;
    }
  },{signal:abort.signal});
  window.addEventListener('keydown',(event)=>{
    if(modalOpen){
      if(event.key==='Escape'){event.preventDefault();closeDialog();}
      if(event.key==='Tab'){const list=Array.from(panel.querySelectorAll<HTMLElement>('button,a[href],input,select,textarea,[tabindex="0"]')).filter(el=>!el.hasAttribute('disabled'));const first=list[0],last=list.at(-1);if(!panel.contains(document.activeElement)){event.preventDefault();(event.shiftKey?last:first)?.focus();}else if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}}
      return;
    }
    const target=event.target as HTMLElement;if(target.closest('input,textarea,select,[contenteditable=true]')||event.ctrlKey||event.metaKey||event.altKey)return;
    if((event.key==='Enter'||event.key===' ')&&target.getAttribute('role')==='button'){event.preventDefault();target.click();return;}
    if(['ArrowDown','ArrowRight','PageDown'].includes(event.key)){event.preventDefault();stopTour();forward();}
    if(['ArrowUp','ArrowLeft','PageUp'].includes(event.key)){event.preventDefault();stopTour();backward();}
  },{signal:abort.signal});
  window.addEventListener('wheel',(event)=>{
    if(modalOpen||innerWidth<768||Math.abs(event.deltaY)<24||performance.now()-lastWheel<850)return;
    const scrollable=(event.target as HTMLElement).closest<HTMLElement>('#glass-cards-wrapper');
    if(scrollable && scrollable.scrollHeight>scrollable.clientHeight)return;
    lastWheel=performance.now();stopTour();if(event.deltaY>0)forward();else backward();
  },{passive:true,signal:abort.signal});
  root.addEventListener('touchstart',event=>{touchY=event.touches[0]?.clientY??0;},{passive:true,signal:abort.signal});
  root.addEventListener('touchend',event=>{if(modalOpen||(event.target as HTMLElement).closest('#glass-cards-wrapper'))return;const dy=touchY-(event.changedTouches[0]?.clientY??touchY);if(Math.abs(dy)>55){stopTour();if(dy>0)forward();else backward();}},{passive:true,signal:abort.signal});
  window.addEventListener('mousemove',event=>{if(stageIndex!==3||mode!=='noir'||motion.matches)return;const x=(event.clientX/width-.5)*2,y=(event.clientY/height-.5)*2;byId('bottle-tilt-wrapper').style.transform=`perspective(900px) rotateY(${x*8}deg) rotateX(${-y*6}deg) translate3d(${x*10}px,${y*6}px,0)`;},{signal:abort.signal});
  window.addEventListener('resize',resize,{signal:abort.signal});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stopTour();syncMotion();},{signal:abort.signal});
  motion.addEventListener('change',syncMotion,{signal:abort.signal});
  window.addEventListener('hashchange',()=>{const n=Number(location.hash.match(/^#chapter-([1-4])$/)?.[1]);if(n)renderStage(n-1);},{signal:abort.signal});
  byId('btn-expand-studio').setAttribute('aria-label','Open Rosavia studio');
  byId('btn-step-counter').setAttribute('aria-label','Next chapter');
  const initial=Number(location.hash.match(/^#chapter-([1-4])$/)?.[1])||1;
  document.documentElement.lang=language;renderStage(initial-1);resize();syncMotion();
  return ()=>{disposed=true;abort.abort();cancelAnimationFrame(frame);cancelAnimationFrame(focusFrame);clearInterval(tour);clearTimeout(revealTimer);clearTimeout(toastTimer);Array.from(root.children).forEach(child=>{if(child instanceof HTMLElement)child.inert=false;});};
}
