import { Fragment, useEffect, useRef } from 'react';

function inline(text: string) {
  return text.split(/(\*\*.*?\*\*)/g).map((part, i) => part.startsWith('**') ? <strong key={i}>{part.slice(2,-2)}</strong> : part);
}
export function Markdown({text}: {text: string}) {
  const blocks: React.ReactNode[] = [];
  let items: string[] = [];
  const flush = () => { if (items.length) { blocks.push(<ul key={blocks.length}>{items.map((item,i)=><li key={i}>{inline(item)}</li>)}</ul>); items = []; } };
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith('- ')) { items.push(line.slice(2)); continue; }
    flush();
    blocks.push(line === '---' ? <hr key={blocks.length}/> : /^\*\*[^*]+\*\*$/.test(line) ? <h3 key={blocks.length}>{inline(line)}</h3> : <p key={blocks.length}>{inline(line)}</p>);
  }
  flush();
  return <>{blocks.map((block,i)=><Fragment key={i}>{block}</Fragment>)}</>;
}
export function NotesDialog({kind, name, body, onClose}: {kind: 'notes' | 'nda' | null; name: string; body: string; onClose: ()=>void}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current!;
    if (!kind) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog.showModal(); dialog.scrollTop = 0; document.body.style.overflow = 'hidden';
    return () => { dialog.close(); document.body.style.overflow = overflow; previous?.focus({preventScroll:true}); };
  }, [kind]);
  return <dialog ref={ref} className="journal-dialog" aria-labelledby="dialog-title" onCancel={onClose} onClose={onClose} onClick={event => {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
  }}>
    <div className="dialog-top"><span className="eyebrow">ЗАПИСИ РАЗРАБОТЧИКА</span><button className="close-dialog" aria-label="Закрыть заметки" onClick={onClose}>✕</button></div>
    <h2 id="dialog-title">{kind === 'nda' ? 'Исходный код под NDA' : name}</h2>
    {kind === 'nda' ? <><p>Исходный код Academy закрыт соглашением о неразглашении. В портфолио доступны описание проекта, мой вклад, интересные задачи и стек технологий.</p><p>Веб-платформу можно посмотреть по кнопке «Открыть проект».</p></> : <Markdown text={body}/>}
  </dialog>;
}
