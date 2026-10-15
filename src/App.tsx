import { useCallback, useEffect, useRef, useState } from 'react';
import { projects } from './data/projects';
import sourceNotes from './data/source-notes.json';
import { compositionStyle } from './data/compositions';
import { parseRoute, routeHash } from './routing';
import { ProjectFavicon } from './components/ProjectFavicon';
import { Spread } from './components/Spread';
import { NotesDialog } from './components/NotesDialog';
import type { Route, ThemeStyle, Variant } from './types';

function useReducedMotion() {
  const [reduced, setReduced] = useState(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(()=>{const media=window.matchMedia('(prefers-reduced-motion: reduce)'); const update=()=>setReduced(media.matches); media.addEventListener('change',update);return()=>media.removeEventListener('change',update);},[]);
  return reduced;
}
export function App() {
  const [route, setRoute] = useState(()=>parseRoute(location.hash));
  const routeRef = useRef(route);
  const [turn, setTurn] = useState<{direction:number;serial:number}|null>(null);
  const serial = useRef(0);
  const [dialog, setDialog] = useState<'notes'|'nda'|null>(null);
  const book = useRef<HTMLDivElement>(null);
  const tabs = useRef<HTMLElement>(null);
  const touch = useRef<{x:number;y:number}|null>(null);
  const reduced = useReducedMotion();
  const applyRoute = useCallback((next:Route)=>{
    const old = routeRef.current;
    if(next.index === old.index && next.mode === old.mode) return;
    routeRef.current=next; setRoute(next);
    setTurn(reduced || next.index === old.index ? null : {direction:next.index-old.index, serial:++serial.current});
  },[reduced]);
  const navigate = useCallback((index:number, mode:Variant='web', scroll=false)=>{
    if(index<0 || index>=projects.length) return;
    const next={index,mode};const old=routeRef.current;
    if(old.index===index && old.mode===mode)return;
    history.pushState(null,'',routeHash(next)); applyRoute(next);
    if(scroll && window.matchMedia('(max-width: 800px)').matches) window.scrollTo({top:0,behavior:reduced ? 'instant' : 'smooth'});
  },[applyRoute,reduced]);
  useEffect(()=>{const restore=()=>applyRoute(parseRoute(location.hash));window.addEventListener('popstate',restore);window.addEventListener('hashchange',restore);return()=>{window.removeEventListener('popstate',restore);window.removeEventListener('hashchange',restore);};},[applyRoute]);
  useEffect(()=>{if(reduced)setTurn(null);},[reduced]);
  useEffect(()=>{
    if(!window.matchMedia('(max-width: 800px)').matches) return;
    const nav=tabs.current;
    const active=nav?.querySelector<HTMLButtonElement>(`[data-project="${route.index}"]`);
    if(nav && active) nav.scrollTo({left:active.offsetLeft-(nav.clientWidth-active.offsetWidth)/2,behavior:'instant'});
  },[route.index]);
  useEffect(()=>{
    const keydown=(event:KeyboardEvent)=>{
      const target=event.target instanceof HTMLElement ? event.target : null;
      if(dialog || event.altKey || event.ctrlKey || event.metaKey || target?.closest('input,textarea,select,[contenteditable="true"]'))return;
      if(event.key!=='ArrowLeft' && event.key!=='ArrowRight')return;
      event.preventDefault();navigate(routeRef.current.index+(event.key==='ArrowRight'?1:-1));
      if(target?.closest('.bookmark'))tabs.current?.querySelector<HTMLButtonElement>(`[data-project="${routeRef.current.index}"]`)?.focus();
    };
    document.addEventListener('keydown',keydown);return()=>document.removeEventListener('keydown',keydown);
  },[dialog,navigate]);
  const base=projects[route.index]; const p=route.mode==='mini' && base.mini ? {...base,...base.mini} : base;
  useEffect(()=>{document.title=`${p.name} — дневник разработчика Crypton`;},[p.name]);
  const closeDialog=useCallback(()=>setDialog(null),[]);
  return <div style={compositionStyle(base.id+(route.mode==='mini'?'-mini':''),base.color,base.pale)}>
    <a className="skip-link" href="#spread" onClick={e=>{e.preventDefault();book.current?.focus();book.current?.scrollIntoView({block:'start',behavior:'instant'});}}>К проекту</a>
    <div className="desk-decoration compass" aria-hidden="true"><span>N</span>✧</div><div className="desk-decoration little-stars" aria-hidden="true">✦<span>✧</span></div>
    <main className="desk relative mx-auto">
      <div className="book-shell relative isolate">
        <nav ref={tabs} className="bookmarks" aria-label="Проекты">{projects.map((project,i)=><button key={project.id} className="bookmark" data-project={i} data-project-id={project.id} style={{'--tab':project.pale,'--tab-strong':project.color} as ThemeStyle} aria-label={project.name} aria-controls="spread" aria-current={i===route.index?'page':undefined} onClick={()=>navigate(i,'web',true)}><ProjectFavicon key={project.id+(project.id === 'academy' && route.mode === 'mini' ? '-mini' : '')} id={project.id+(project.id === 'academy' && route.mode === 'mini' ? '-mini' : '')} symbol={project.symbol}/><span>{project.label}</span></button>)}</nav>
        <div className={'book-cover '+(turn ? turn.direction>=0 ? 'turning-forward' : 'turning-backward' : '')}>
          <div ref={book} className="book grid grid-cols-1 min-[801px]:grid-cols-2" id="spread" tabIndex={-1} aria-label="Разворот проекта"
            onTouchStart={e=>{const target=e.target as HTMLElement;touch.current=e.touches.length===1 && !target.closest('a,button') ? {x:e.touches[0].clientX,y:e.touches[0].clientY}:null;}}
            onTouchEnd={e=>{const start=touch.current;touch.current=null;if(!start || !e.changedTouches.length)return;const dx=e.changedTouches[0].clientX-start.x,dy=e.changedTouches[0].clientY-start.y;if(Math.abs(dx)>70 && Math.abs(dx)>Math.abs(dy)*1.8)navigate(routeRef.current.index+(dx<0?1:-1),'web',true);}}
            onTouchCancel={()=>{touch.current=null;}}>
            <Spread project={p} index={route.index} variant={route.mode} source={sourceNotes[route.index]} onVariant={mode=>navigate(route.index,mode)} onNotes={setDialog} reducedMotion={reduced}/>
          </div>
          {turn && <div key={turn.serial} className="page-turn" aria-hidden="true" onAnimationEnd={()=>setTurn(current=>current?.serial===turn.serial ? null : current)}/>}
        </div><div className="ribbon" aria-hidden="true"/>
      </div>
      <footer className="book-controls"><button className="page-button" disabled={route.index===0} aria-label="Предыдущий проект" onClick={()=>navigate(route.index-1,'web',true)}><span aria-hidden="true">←</span><span className="nav-label">Назад</span></button><div className="reading-progress"><span className="chapter-counter">ГЛАВА {String(route.index+1).padStart(2,'0')} ИЗ 07</span><div className="progress-dots" aria-hidden="true">{projects.map((project,i)=><i key={project.id} className={i===route.index?'current':''}/>)}</div><span className="keyboard-hint">Листайте историю <kbd>←</kbd> <kbd>→</kbd></span></div><button className="page-button" disabled={route.index===projects.length-1} aria-label="Следующий проект" onClick={()=>navigate(route.index+1,'web',true)}><span className="nav-label">Дальше</span><span aria-hidden="true">→</span></button></footer>
    </main>
    <p className="sr-only" role="status" aria-live="polite">Глава {route.index+1} из {projects.length}: {p.name}</p>
    <NotesDialog kind={dialog} name={p.name} body={sourceNotes[route.index].body} onClose={closeDialog}/>
  </div>;
}
