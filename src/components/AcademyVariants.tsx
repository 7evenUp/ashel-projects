import type { Variant } from '../types';

const options = [
  {mode:'web',label:'Веб-платформа'},
  {mode:'mini',label:'Telegram + Base'},
] as const;

export function AcademyVariants({variant,onChange}: {variant: Variant; onChange:(mode:Variant,keyboard:boolean)=>void}) {
  return <div className="academy-variants" role="group" aria-label="Версия Academy">
    {options.map(({mode,label})=><button key={mode} className="variant" aria-pressed={variant===mode} onClick={event=>onChange(mode,event.detail===0)}>{label}</button>)}
    <div className="academy-variants-ink" aria-hidden="true" style={{clipPath:variant==='web'?'inset(0 50% 0 0)':'inset(0 0 0 50%)'}}>
      {options.map(({mode,label})=><span key={mode}>{label}</span>)}
    </div>
  </div>;
}
