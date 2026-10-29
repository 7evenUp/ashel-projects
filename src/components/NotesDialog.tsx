import { Fragment, useEffect, useRef } from "react"

import { cn } from "../lib/cn"

function inline(text: string) {
  return text
    .split(/(\*\*.*?\*\*)/g)
    .map((part, i) =>
      part.startsWith("**") ? (
        <strong key={i}>{part.slice(2, -2)}</strong>
      ) : (
        part
      )
    )
}
export function Markdown({ text }: { text: string }) {
  const blocks: React.ReactNode[] = []
  let items: string[] = []
  const flush = () => {
    if (items.length) {
      blocks.push(
        <ul key={blocks.length}>
          {items.map((item, i) => (
            <li key={i}>{inline(item)}</li>
          ))}
        </ul>
      )
      items = []
    }
  }
  for (const raw of text.split("\n")) {
    const line = raw.trim()
    if (!line) continue
    if (line.startsWith("- ")) {
      items.push(line.slice(2))
      continue
    }
    flush()
    blocks.push(
      line === "---" ? (
        <hr key={blocks.length} />
      ) : /^\*\*[^*]+\*\*$/.test(line) ? (
        <h3 key={blocks.length}>{inline(line)}</h3>
      ) : (
        <p key={blocks.length}>{inline(line)}</p>
      )
    )
  }
  flush()
  return (
    <>
      {blocks.map((block, i) => (
        <Fragment key={i}>{block}</Fragment>
      ))}
    </>
  )
}
export function NotesDialog({
  kind,
  name,
  body,
  onClose,
}: {
  kind: "notes" | "nda" | null
  name: string
  body: string
  onClose: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current!
    if (!kind) return
    const previous = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    dialog.showModal()
    dialog.scrollTop = 0
    document.body.style.overflow = "hidden"
    return () => {
      dialog.close()
      document.body.style.overflow = overflow
      previous?.focus({ preventScroll: true })
    }
  }, [kind])
  return (
    <dialog
      ref={ref}
      className={cn(
        "journal-dialog m-auto max-h-[86dvh] w-[min(740px,_calc(100%_-_32px))] rounded-[8px] border-[1px] border-solid border-[rgb(216,_208,_186)] bg-[#faf7eb] px-9.75 pt-6.75 pb-10 text-[#565a4e] shadow-[0_30px_100px_#22281f55]",
        "max-[801px]:px-5.75 max-[801px]:pt-5 max-[801px]:pb-7",
        "backdrop:bg-[#34382d70] backdrop:[backdrop-filter:blur(5px)]",
        "[&_h2]:mx-0 [&_h2]:mt-3 [&_h2]:mb-5 [&_h2]:font-book [&_h2]:text-[36px] [&_h2]:leading-[normal] [&_h2]:font-normal [&_h2]:not-italic",
        "[&_h3]:mx-0 [&_h3]:mt-7 [&_h3]:mb-3.75 [&_h3]:font-book [&_h3]:text-[23px] [&_h3]:leading-[1.3] [&_h3]:font-normal [&_h3]:not-italic",
        "[&_h4]:mx-0 [&_h4]:mt-6 [&_h4]:mb-2.5 [&_h4]:text-[17px]",
        "[&_p]:text-[17px] [&_p]:leading-[1.55]",
        "[&_li]:mb-2.5 [&_li]:text-[17px] [&_li]:leading-[1.55]",
        "[&_a]:[border-bottom-width:1px] [&_a]:[border-bottom-style:solid] [&_a]:[border-bottom-color:rgba(113,_96,_135,_0.376)] [&_a]:text-[#716087]",
        "[&_strong]:font-medium [&_strong]:text-[#41473b]",
        "[&_hr]:mx-0 [&_hr]:my-6.5 [&_hr]:border-0 [&_hr]:[border-top-width:1px] [&_hr]:border-none [&_hr]:[border-top-style:solid] [&_hr]:border-[currentcolor] [&_hr]:[border-top-color:rgb(211,_203,_181)]",
        "[&_.source-note]:text-[12px] [&_.source-note]:text-[#99917e]",
        "[&_ul]:pl-6 [&_ul]:[list-style:disc]",
        "[&:not([open])]:hidden"
      )}
      aria-labelledby="dialog-title"
      onCancel={onClose}
      onClose={onClose}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return
        const rect = event.currentTarget.getBoundingClientRect()
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          onClose()
      }}
    >
      <div className="dialog-top flex items-center justify-between">
        <span className="eyebrow text-[10px] tracking-[2px] text-[#a19a83]">
          ЗАПИСИ РАЗРАБОТЧИКА
        </span>
        <button
          className="close-dialog size-8.5 rounded-full border-[1px] border-solid border-[rgb(217,_210,_189)] bg-[#eee9da] text-[#7b7b6a]"
          aria-label="Закрыть заметки"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
      <h2 id="dialog-title">
        {kind === "nda" ? "Исходный код под NDA" : name}
      </h2>
      {kind === "nda" ? (
        <>
          <p>
            Исходный код Academy закрыт соглашением о неразглашении. В портфолио
            доступны описание проекта, мой вклад, интересные задачи и стек
            технологий.
          </p>
          <p>Веб-платформу можно посмотреть по кнопке «Открыть проект».</p>
        </>
      ) : (
        <Markdown text={body} />
      )}
    </dialog>
  )
}
