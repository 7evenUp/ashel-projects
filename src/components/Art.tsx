import { NutcrackerArt } from './NutcrackerArt';
import { XmsArt } from './XmsArt';
import { NutsFarmArt } from './NutsFarmArt';
import type { IllustrationName, Project, SymbolName } from '../types';
const paths = {key: <><circle cx="8" cy="8" r="4"/><path d="m11 11 9 9m-3-3 3-3m-6 0 3-3"/></>,
spark: <><path d="m12 2 2.8 7.2L22 12l-7.2 2.8L12 22l-2.8-7.2L2 12l7.2-2.8Z"/></>,
crown: <><path d="m3 6 4 4 5-6 5 6 4-4-2 13H5ZM5 16h14"/></>,
gift: <><path d="M3 10h18v4H3zm2 4v7h14v-7M12 10v11"/><path d="M12 10C3 10 4 2 8 4c2 1 4 6 4 6Zm0 0s2-5 4-6c4-2 5 6-4 6Z"/></>,
sword: <><path d="m5 19 3-3m-4-3 7 7m-3-6L18 3h3v3L10 16M3 19l2 2"/></>,
leaf: <><path d="M20 3C9 1 2 6 5 14s16 4 15-11ZM4 21 15 9M8 16v-6m0 6h6"/></>,
book: <><path d="M12 5v16M12 5C8 2 4 3 2 4v15c4-1 7 0 10 2 3-2 6-3 10-2V4c-2-1-6-2-10 1Z"/></>,
code: <><path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18"/></>,
arrow: <><path d="M5 19 19 5M5 5h14v14"/></>,
lock: <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3"/></>,
check: <><path d="m5 12 4 4L19 6"/></>};
export function Icon({name, className = ''}: {name: SymbolName; className?: string}) {return <svg className={'icon '+className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;}
const pixelKey = <><g stroke="#67527e" strokeWidth="3"><path fill="#aa90c6" d="M30 3h27v8h9v27h-9v8H42v17h-9v13H20V63h-9V51h19V38h-9V11h9Z"/><path fill="#eae0f0" d="M37 14h16v20H37Z"/><path d="M34 48v12h-8" fill="none"/></g></>;
const pixelStar = <><path d="M24 0h8v16h16v8h16v8H48v16H32v16h-8V48H8V32H0v-8h16V8h8Z" fill="#d6b65e" stroke="#9e834a" strokeWidth="2"/></>;
function Pixel({type}: {type: IllustrationName}) {switch(type){case 'passport': return (<svg className="pixel-key" viewBox="0 0 82 90" aria-hidden="true">{pixelKey}</svg>);
case 'crown': return (<svg viewBox="0 0 180 125" aria-hidden="true"><path d="M18 99V31h18v18h18V31h18V13h18v18h18v18h18V31h18v68Z" fill="#e9c867" stroke="#806441" strokeWidth="5"/><path d="M18 89h126v20H18Z" fill="#bb9550" stroke="#806441" strokeWidth="5"/><path d="M69 57h24v25H69Z" fill="#a477a1"/><path d="M29 57h11v12H29Zm93 0h11v12h-11" fill="#fff1bb"/></svg>);
case 'gift': return (<svg viewBox="0 0 180 150" aria-hidden="true"><path d="M39 66h102v69H39Z" fill="#82a79d" stroke="#3f6a65" strokeWidth="4"/><path d="M29 52h122v26H29Z" fill="#abd0bd" stroke="#3f6a65" strokeWidth="4"/><path d="M78 52h23v83H78Z" fill="#dc9a91" stroke="#8c605d" strokeWidth="4"/><path d="M80 52H51V37H39V24h27v13h14Zm21 0h28V37h12V24h-26v13h-14Z" fill="#db9b93" stroke="#8c605d" strokeWidth="4"/></svg>);
case 'academy': return (<svg viewBox="0 0 180 140" aria-hidden="true"><path d="M20 33h51l19 13 19-13h51v84h-51l-19 11-19-11H20Z" fill="#e8ddc4" stroke="#5d7088" strokeWidth="4"/><path d="M90 47v79M31 51h31m-31 14h41m-41 14h33m-33 15h40m39-43h34m-34 14h34m-34 14h34" stroke="#8b9fae" strokeWidth="4"/><path d="M118 32V8h16v34l-8-7-8 7Z" fill="#ab859b"/></svg>);
default: return (<svg viewBox="0 0 180 150" aria-hidden="true"><path d="M41 57h29l59-32v90L70 84H41Z" fill="#cd9377" stroke="#865e50" strokeWidth="4"/><path d="M68 86h22l15 47H83Z" fill="#b57f63" stroke="#865e50" strokeWidth="4"/><path d="m140 42 17-10m-14 36h23m-26 27 17 10" stroke="#ba8d62" strokeWidth="5"/><path d="M45 62h21v17H45Z" fill="#eed9c4"/></svg>);}}
export function Art({project}: {project: Project}) { if(project.illustration === 'nft-assembly') return <NutcrackerArt/>; if(project.illustration === 'winter-quest') return <XmsArt/>; if(project.illustration === 'farming') return <NutsFarmArt/>; return <div className={'illustration illustration-'+project.illustration} aria-hidden="true">
<span className="sketch-star star-one">✦</span><span className="sketch-star star-two">✧</span><div className="art-orbit"/>
{project.illustration === 'passport' ? <><div className="passport-card"><div className="passport-top"><span>CRYPTON</span><Icon name="spark"/></div><div className="passport-body"><div className="avatar-pixel"><i/><i/></div><div><strong>EXPLORER ID</strong><span>your key to the ecosystem</span><div className="card-lines"/></div></div><div className="passport-bottom"><span>◆ VERIFIED ADVENTURER</span><span>•••• 0001</span></div></div><div className="key-sticker"><Pixel type="passport"/></div></> : <><div className="artifact-ticket"><span className="artifact-label">CRYPTON COLLECTION</span><div className="artifact-pixel"><Pixel type={project.illustration}/></div><span className="artifact-name">{project.seal}</span></div><div className="mini-star"><svg viewBox="0 0 66 66">{pixelStar}</svg></div></>}
<span className="art-annotation">{project.note}</span><svg className="sketch-arrow" viewBox="0 0 90 40"><path d="M4 10c24 30 44 29 73 3m-16 1 18-4-4 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></div>;}
