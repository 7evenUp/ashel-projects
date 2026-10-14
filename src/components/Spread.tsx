import { useEffect, useLayoutEffect, useRef } from 'react';
import { AcademyVariants } from './AcademyVariants';
import { Art, Icon } from './Art';
import type { Project, Variant } from '../types';

function Folio({name, number}: {name: string; number: number}) {
  return <div className="page-number"><span>{name}</span><span className="folio">{String(number).padStart(2,'0')}</span></div>;
}
function Heading({icon, children}: {icon: Project['symbol']; children: string}) {
  return <div className="section-heading flex items-center gap-2.5"><Icon name={icon}/><h2>{children}</h2></div>;
}
export function Spread({project:p, index, variant, source, onVariant, onNotes, reducedMotion}: {project: Project; index: number; variant: Variant; source: {code: string; deploy: string}; onVariant: (variant: Variant)=>void; onNotes: (kind: 'notes' | 'nda')=>void; reducedMotion: boolean}) {
  const chapter = String(index+1).padStart(2,'0');
  const leftPage = useRef<HTMLElement>(null);
  const rightPage = useRef<HTMLElement>(null);
  const previous = useRef({id:p.id,variant});
  const animations = useRef<Animation[]>([]);
  const keyboardSwitch = useRef(false);
  useLayoutEffect(() => {
    const old = previous.current;
    previous.current = {id:p.id,variant};
    const changedVariant = old.id === p.id && old.variant !== variant;
    const elements = [...(leftPage.current?.querySelectorAll<HTMLElement>('[data-variant-content]') ?? []), ...(rightPage.current?.querySelectorAll<HTMLElement>('[data-variant-content]') ?? [])];
    // Sample before cancelling so a rapid reversal continues from the current reveal.
    const interrupted = animations.current.some(animation => animation.playState === 'running');
    const snapshots = elements.map(element => ({opacity:getComputedStyle(element).opacity, clipPath:getComputedStyle(element).clipPath}));
    animations.current.forEach(animation => animation.cancel());
    animations.current = [];
    if (!changedVariant || reducedMotion || keyboardSwitch.current) { keyboardSwitch.current=false; return; }
    keyboardSwitch.current=false;
    const hidden = variant === 'mini' ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)';
    animations.current = elements.map((element,i) => element.animate([
      interrupted ? snapshots[i] : {opacity:.25,clipPath:hidden},
      {opacity:1,clipPath:'inset(0 0 0 0)'},
    ], {duration:240,delay:i < 3 ? 0 : 35,easing:'cubic-bezier(0.23, 1, 0.32, 1)',fill:'both'}));
  }, [p.id,variant,reducedMotion]);
  useEffect(() => () => animations.current.forEach(animation => animation.cancel()), []);
  return <>
    <section ref={leftPage} className="paper-page page-left" aria-labelledby="project-title">
      <div className="page-running-head"><span>CRYPTON / ДНЕВНИК РАЗРАБОТЧИКА</span><Icon name="spark"/></div>
      {p.mini && <AcademyVariants variant={variant} onChange={(mode,keyboard)=>{keyboardSwitch.current=keyboard;onVariant(mode);}}/>}
      <div className="chapter-label">ГЛАВА {chapter}<span> / </span>{p.category}</div>
      <div data-variant-content className="project-heading flex items-center gap-3"><h1 id="project-title">{p.name}</h1></div><p data-variant-content className="tagline">{p.tagline}</p>
      <div className="project-links flex flex-wrap gap-2.5"><a className="project-link primary" href={source.deploy} target="_blank" rel="noopener noreferrer"><Icon name="arrow"/>{variant === 'mini' ? 'Сайт Academy' : 'Открыть проект'}</a>{source.code === 'NDA' ? <button className="project-link nda" onClick={()=>onNotes('nda')} aria-label="Исходный код закрыт по NDA"><Icon name="lock"/>Код под NDA</button> : <a className="project-link secondary" href={source.code} target="_blank" rel="noopener noreferrer"><Icon name="code"/>Исходный код</a>}</div>
      <Art project={p}/>
      <section className="note about-note tape"><h2>Об этом приключении</h2><p data-variant-content>{p.description}</p></section>
      <section className="stack"><h2 className="stack-heading"><Icon name="code"/>В моём рюкзаке</h2><div data-variant-content className="stack-tags flex flex-wrap gap-1.5">{p.stack.map(s=><span key={s}>{s}</span>)}</div></section>
      <Folio name={'ПОРТФОЛИО / '+p.name.toUpperCase()} number={index*2+1}/>
    </section>
    <section ref={rightPage} className="paper-page page-right" aria-label="Вклад и особенности проекта">
      <div className="page-running-head"><span>ЗАПИСИ С ПОЛЕЙ</span><span className={'status '+(p.active ? '' : 'archived')}>{p.active ? 'Активный проект' : 'Проект в прошлом'}</span></div>
      <section className="note contribution-note tape"><Heading icon="sword">Мой вклад</Heading><p data-variant-content className="role">{p.role}</p><ul data-variant-content className="contribution-list">{p.contribution.map(c=><li key={c}><Icon name="check"/><span>{c}</span></li>)}</ul></section>
      <section className="note cases-note"><Heading icon="spark">Редкие находки</Heading><ol data-variant-content className="case-list">{p.cases.map(([title,text],i)=><li key={title}><span className="case-number">0{i+1}</span><div><strong>{title}</strong><p>{text}</p></div></li>)}</ol></section>
      <div className="notes-footer flex items-start justify-between gap-3"><button className="all-notes" onClick={()=>onNotes('notes')}>Все заметки о проекте <Icon name="arrow"/></button><span className="handwritten" aria-hidden="true">За каждым интерфейсом<br/>есть своя история.</span></div>
      <Folio name="СОЗДАНО С ВНИМАНИЕМ К ДЕТАЛЯМ" number={index*2+2}/>
    </section>
  </>;
}
