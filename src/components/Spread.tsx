import { useEffect, useLayoutEffect, useRef } from "react"

import { AcademyVariants } from "./AcademyVariants"
import { Art, Icon } from "./Art"
import PaperPage from "./PaperPage"

import type { Project, Variant } from "../types"

import { cn } from "../lib/cn"

function Folio({ name, number }: { name: string; number: number }) {
  return (
    <div
      className={cn(
        "page-number absolute right-9.5 bottom-4.5 left-9.5 flex justify-between [border-top-width:1px] [border-top-style:solid] [border-top-color:rgba(157,_149,_114,_0.11)] pt-2.75 text-[10px] tracking-[0.5px] text-[#a09b88]",
        "[&_.folio]:font-book [&_.folio]:text-[12px]",
        "after:absolute after:-top-2.5 after:left-[50%] after:[transform:translateX(-50%)] after:bg-[#f6f1e3] after:px-1.75 after:py-0 after:font-[family-name:Georgia] after:text-[15px] after:leading-[normal] after:font-normal after:text-[#aaa083] after:not-italic after:[content:'❧']"
      )}
    >
      <span>{name}</span>
      <span className="folio">{String(number).padStart(2, "0")}</span>
    </div>
  )
}
function Heading({
  icon,
  children,
}: {
  icon: Project["symbol"]
  children: string
}) {
  return (
    <div
      className={cn(
        "section-heading mb-2.25 flex items-center gap-2.5",
        "[&_h2]:m-0 [&_h2]:font-book [&_h2]:text-[25px] [&_h2]:leading-[normal] [&_h2]:font-medium [&_h2]:tracking-[-0.6px] [&_h2]:normal-case [&_h2]:not-italic",
        "max-[1101px]:[&_h2]:text-[24px]",
        "[&_.icon]:size-5.5 [&_.icon]:text-[#7d8969]"
      )}
    >
      <Icon name={icon} />
      <h2>{children}</h2>
    </div>
  )
}
export function Spread({
  project: p,
  index,
  variant,
  source,
  onVariant,
  onNotes,
  reducedMotion,
}: {
  project: Project
  index: number
  variant: Variant
  source: { code: string; deploy: string }
  onVariant: (variant: Variant) => void
  onNotes: (kind: "notes" | "nda") => void
  reducedMotion: boolean
}) {
  const chapter = String(index + 1).padStart(2, "0")
  const leftPage = useRef<HTMLElement>(null)
  const rightPage = useRef<HTMLElement>(null)
  const previous = useRef({ id: p.id, variant })
  const animations = useRef<Animation[]>([])
  const keyboardSwitch = useRef(false)
  useLayoutEffect(() => {
    const old = previous.current
    previous.current = { id: p.id, variant }
    const changedVariant = old.id === p.id && old.variant !== variant
    const elements = [
      ...(leftPage.current?.querySelectorAll<HTMLElement>(
        "[data-variant-content]"
      ) ?? []),
      ...(rightPage.current?.querySelectorAll<HTMLElement>(
        "[data-variant-content]"
      ) ?? []),
    ]
    // Sample before cancelling so a rapid reversal continues from the current reveal.
    const interrupted = animations.current.some(
      (animation) => animation.playState === "running"
    )
    const snapshots = elements.map((element) => ({
      opacity: getComputedStyle(element).opacity,
      clipPath: getComputedStyle(element).clipPath,
    }))
    animations.current.forEach((animation) => animation.cancel())
    animations.current = []
    if (!changedVariant || reducedMotion || keyboardSwitch.current) {
      keyboardSwitch.current = false
      return
    }
    keyboardSwitch.current = false
    const hidden =
      variant === "mini" ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)"
    animations.current = elements.map((element, i) =>
      element.animate(
        [
          interrupted ? snapshots[i] : { opacity: 0.25, clipPath: hidden },
          { opacity: 1, clipPath: "inset(0 0 0 0)" },
        ],
        {
          duration: 240,
          delay: i < 3 ? 0 : 35,
          easing: "cubic-bezier(0.23, 1, 0.32, 1)",
          fill: "both",
        }
      )
    )
  }, [p.id, variant, reducedMotion])
  useEffect(
    () => () => animations.current.forEach((animation) => animation.cancel()),
    []
  )
  return (
    <>
      <PaperPage
        side="left"
        ref={leftPage}
        className="bg-[#f5f0e1] px-9.75 pt-8 pb-19 max-[1101px]:pr-6.75 max-[1101px]:pl-6.75 max-[801px]:pt-6.5 max-[801px]:pr-7 max-[801px]:pl-7 max-[391px]:pt-6.5 max-[391px]:pr-5 max-[391px]:pl-5 min-[1450px]:pt-9"
        aria-labelledby="project-title"
      >
        <div
          className={cn(
            "chapter-meta mb-2.75 flex flex-wrap items-center justify-between gap-[8px_12px]",
            "[&_.chapter-label]:mb-0",
            "[&_.status]:shrink-0 [&_.status]:whitespace-nowrap"
          )}
        >
          <div
            className={cn(
              "chapter-label mb-2.75 flex items-center gap-2.25 text-[11px] font-medium tracking-[1.7px] text-[#8a8879]",
              "max-[391px]:flex-wrap max-[391px]:gap-y-1 max-[391px]:text-[9px] max-[391px]:tracking-[1px]",
              "max-[801px]:flex-wrap max-[801px]:gap-y-1",
              "before:h-px before:w-6 before:bg-[#aca693] before:content-['']"
            )}
          >
            ГЛАВА {chapter}
            <span> / </span>
            {p.category}
          </div>
          <span
            className={cn(
              "status inline-flex items-center gap-1.5 rounded-[20px] bg-[#e9eddd] px-2.25 py-1 text-[11px]! tracking-[0]! text-[#638051]",
              "before:size-1.25 before:rounded-full before:bg-[#819862] before:content-['']",
              "[&.archived]:bg-[#efebe1] [&.archived]:text-[#8a8070]",
              "[&.archived:before]:bg-[#b5a891]",
              p.active ? "" : "archived"
            )}
          >
            {p.active ? "Активный проект" : "Архивный проект"}
          </span>
        </div>
        {p.mini && (
          <AcademyVariants
            variant={variant}
            onChange={(mode, keyboard) => {
              keyboardSwitch.current = keyboard
              onVariant(mode)
            }}
          />
        )}
        <div
          data-variant-content
          className={cn(
            "project-heading mb-2.25 flex items-center gap-3",
            "[&_h1]:mb-0 [&_h1]:min-w-0 [&_h1]:[overflow-wrap:anywhere]",
            "max-[391px]:[&_h1]:text-[clamp(32px,_10vw,_39px)] max-[391px]:[&_h1]:tracking-[-1.5px]",
            "max-[391px]:gap-2.25"
          )}
        >
          <h1
            className="m-0 mb-2.25 font-[family-name:Georgia,'Times_New_Roman',serif] text-[clamp(39px,4.2vw,64px)] leading-[1.1] font-medium tracking-[-2.4px] text-[#393e34] max-[801px]:text-[52px] max-[391px]:text-[46px]"
            id="project-title"
          >
            {p.name}
          </h1>
        </div>
        <p
          data-variant-content
          className="tagline m-0 max-w-90 text-[18px] leading-[1.3] text-[#77786b] max-[1101px]:text-[17px] max-[801px]:text-[18px]"
        >
          {p.tagline}
        </p>
        <Art project={p} variant={variant} />
        <section
          className={cn(
            "note about-note tape relative mx-0 mt-5.25 mb-5.75 [transform:rotate(var(--about-angle))] border-[1px] border-solid border-[rgba(117,_98,_68,_0.075)] bg-[#eee9d7] px-5 pt-4.75 pb-4.25 shadow-[0_1px_1px_#66533112,_2px_5px_7px_-3px_#66533128]",
            "max-[801px]:mb-6 max-[801px]:[transform:rotate(calc(var(--about-angle)_*_0.45))]",
            "before:absolute before:-top-2.5 before:left-[calc(50%_-_37px)] before:h-5.5 before:w-18.75 before:[transform:rotate(var(--tape-angle))] before:[border-inline-width:1px] before:[border-inline-style:dashed] before:[border-inline-color:rgba(161,_140,_88,_0.19)] before:bg-[#d2c7a670] before:shadow-[inset_0_0_8px_#e6dbb365] before:[backdrop-filter:blur(0.2px)] before:content-[''] before:[clip-path:polygon(0_4%,_97%_0,_100%_93%,_3%_100%,_0_76%,_3%_54%)]",
            "[&>h2]:mx-0 [&>h2]:mt-0 [&>h2]:mb-2.5 [&>h2]:text-[12px] [&>h2]:font-medium [&>h2]:tracking-[1.7px] [&>h2]:uppercase",
            "[&_p]:m-0 [&_p]:text-[15px] [&_p]:leading-[1.38] [&_p]:text-[#65675b]",
            "max-[801px]:[&_p]:text-[16px]"
          )}
        >
          <h2>О проекте</h2>
          <p data-variant-content>{p.description}</p>
        </section>
        <section className="stack">
          <h2
            className={cn(
              "stack-heading mx-0 mt-0 mb-2.75 flex items-center gap-2 text-[10px] font-medium tracking-[1.7px] text-[#797b6b] uppercase",
              "[&_.icon]:size-3.75"
            )}
          >
            <Icon name="code" />
            Технологии
          </h2>
          <div
            data-variant-content
            className={cn(
              "stack-tags flex flex-wrap gap-1.5",
              "[&_span]:inline-block [&_span]:rounded-[3px] [&_span]:border-[1px] [&_span]:border-solid [&_span]:border-[rgb(220,_218,_204)] [&_span]:bg-[#eeecdf] [&_span]:px-2 [&_span]:pt-1 [&_span]:pb-0.75 [&_span]:text-[11px] [&_span]:text-[#777869]"
            )}
          >
            {p.stack.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </section>
        <Folio
          name={"ПОРТФОЛИО / " + p.name.toUpperCase()}
          number={index * 2 + 1}
        />
      </PaperPage>
      <PaperPage
        side="right"
        ref={rightPage}
        className="bg-[#faf5e7] pt-8 pr-9.25 pb-19 pl-10 before:border-[rgba(170,_148,_108,_0.098)] max-[1101px]:pr-6.75 max-[1101px]:pl-6.75 max-[801px]:[border-top-width:1px] max-[801px]:[border-top-style:dashed] max-[801px]:[border-top-color:rgba(191,_184,_163,_0.376)] max-[801px]:pt-6 max-[801px]:pr-7 max-[801px]:pl-7 max-[391px]:[border-top-width:1px] max-[391px]:[border-top-style:dashed] max-[391px]:[border-top-color:rgba(191,_184,_163,_0.376)] max-[391px]:pt-6 max-[391px]:pr-5 max-[391px]:pl-5 min-[1450px]:pt-9"
        aria-label="Вклад и особенности проекта"
      >
        <div
          className={cn(
            "paperclip pointer-events-none absolute top-0.75 right-5.5 z-[3] h-10.75 w-3.25 [transform:rotate(9deg)] rounded-[9px] border-[2px] border-solid border-[rgb(171,_163,_139)] shadow-[1px_1px_1px_#fff9e8,_inset_1px_0_1px_#4c41252b]",
            "max-[801px]:right-4.5",
            "after:absolute after:top-1.25 after:right-0.5 after:-bottom-0.5 after:left-0.5 after:rounded-[0_0_7px_7px] after:border-[1px] after:[border-top-width:0px] after:border-solid after:[border-top-style:none] after:border-[rgb(140,_132,_113)] after:[border-top-color:currentcolor] after:content-['']"
          )}
          aria-hidden="true"
        />
        <div
          className={cn(
            "margin-spark pointer-events-none absolute top-[47%] right-3.5 font-[family-name:Georgia] text-[18px] leading-[normal] font-normal text-[#b09b6266] not-italic",
            "max-[801px]:right-2 max-[801px]:text-[14px]",
            "[&_span]:mt-1.25 [&_span]:mr-0 [&_span]:mb-0 [&_span]:-ml-1 [&_span]:block [&_span]:text-[12px]"
          )}
          aria-hidden="true"
        >
          ✦<span>✧</span>
        </div>
        <nav
          className={cn(
            "page-running-head project-links mx-0 mt-0 mb-6.25 flex flex-wrap items-center justify-start gap-2.5 text-[10px] tracking-[normal] text-[#848377] normal-case max-[801px]:mb-6.25",
            "[&_span:last-child]:text-[11px] [&_span:last-child]:tracking-[0.8px]"
          )}
          aria-label="Ссылки проекта"
        >
          <a
            className={cn(
              "project-link primary inline-flex h-11 min-h-11 items-center justify-center gap-2.5 rounded-[4px] border-[1px] border-solid border-[#606c51] bg-[#687458] px-4.25 pt-2.75 pb-2.5 text-[14px] leading-[20px] whitespace-nowrap text-[#fffdf3] shadow-[inset_0_-3px_0_#4c5741] [transition:transform_0.18s,_box-shadow_0.18s]",
              "max-[1101px]:pt-2.5 max-[1101px]:pr-3 max-[1101px]:pl-3 max-[1101px]:text-[13px]",
              "max-[801px]:px-4 max-[801px]:py-2.75 max-[801px]:text-[14px]",
              "max-[391px]:px-3 max-[391px]:py-2.5 max-[391px]:text-[13px]",
              "[&.secondary]:bg-[#f8f5ec] [&.secondary]:shadow-[inset_0_-3px_0_#d9d7cb]",
              "hover:[transform:translateY(-2px)] hover:shadow-[inset_0_-5px_0_#4c5741]",
              "[&.nda]:cursor-help [&.nda]:border-[1px] [&.nda]:border-dashed [&.nda]:border-[rgb(189,_179,_161)] [&.nda]:bg-[#eee9df] [&.nda]:text-[#83796b] [&.nda]:shadow-none",
              "[&.secondary:hover]:shadow-[inset_0_-5px_0_#d9d7cb]"
            )}
            href={source.deploy}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="arrow" />
            {variant === "mini" ? "Сайт Academy" : "Открыть проект"}
          </a>
          {source.code === "NDA" ? (
            <button
              className={cn(
                "project-link nda inline-flex h-11 min-h-11 cursor-help items-center justify-center gap-2.5 rounded-[4px] border-[1px] border-dashed border-[rgb(189,_179,_161)] bg-[#eee9df] px-4.25 pt-2.75 pb-2.5 text-[14px] leading-[20px] whitespace-nowrap text-[#83796b] shadow-none [transition:transform_0.18s,_box-shadow_0.18s]",
                "max-[1101px]:pt-2.5 max-[1101px]:pr-3 max-[1101px]:pl-3 max-[1101px]:text-[13px]",
                "max-[801px]:px-4 max-[801px]:py-2.75 max-[801px]:text-[14px]",
                "max-[391px]:px-3 max-[391px]:py-2.5 max-[391px]:text-[13px]",
                "[&.primary]:border-[#606c51] [&.primary]:bg-[#687458] [&.primary]:text-[#fffdf3] [&.primary]:shadow-[inset_0_-3px_0_#4c5741]",
                "[&.secondary]:bg-[#f8f5ec] [&.secondary]:shadow-[inset_0_-3px_0_#d9d7cb]",
                "hover:[transform:translateY(-2px)] hover:shadow-[0_5px_0_#4c574133]",
                "[&.primary:hover]:shadow-[inset_0_-5px_0_#4c5741]",
                "[&.secondary:hover]:shadow-[inset_0_-5px_0_#d9d7cb]"
              )}
              onClick={() => onNotes("nda")}
              aria-label="Исходный код закрыт по NDA"
            >
              <Icon name="lock" />
              Код под NDA
            </button>
          ) : (
            <a
              className={cn(
                "project-link secondary inline-flex h-11 min-h-11 items-center justify-center gap-2.5 rounded-[4px] border-[1px] border-solid border-[rgba(138,_145,_121,_0.286)] bg-[#f8f5ec] px-4.25 pt-2.75 pb-2.5 text-[14px] leading-[20px] whitespace-nowrap shadow-[inset_0_-3px_0_#d9d7cb] [transition:transform_0.18s,_box-shadow_0.18s]",
                "max-[1101px]:pt-2.5 max-[1101px]:pr-3 max-[1101px]:pl-3 max-[1101px]:text-[13px]",
                "max-[801px]:px-4 max-[801px]:py-2.75 max-[801px]:text-[14px]",
                "max-[391px]:px-3 max-[391px]:py-2.5 max-[391px]:text-[13px]",
                "[&.primary]:border-[#606c51] [&.primary]:bg-[#687458] [&.primary]:text-[#fffdf3] [&.primary]:shadow-[inset_0_-3px_0_#4c5741]",
                "hover:[transform:translateY(-2px)] hover:shadow-[inset_0_-5px_0_#d9d7cb]",
                "[&.nda]:cursor-help [&.nda]:border-[1px] [&.nda]:border-dashed [&.nda]:border-[rgb(189,_179,_161)] [&.nda]:bg-[#eee9df] [&.nda]:text-[#83796b] [&.nda]:shadow-none",
                "[&.primary:hover]:shadow-[inset_0_-5px_0_#4c5741]"
              )}
              href={source.code}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="code" />
              Исходный код
            </a>
          )}
        </nav>
        <section
          className={cn(
            "note contribution-note tape relative mx-0.5 mt-8.25 mb-6 [transform:rotate(var(--contribution-angle))] border-[1px] border-solid border-[rgba(117,_98,_68,_0.075)] bg-[#fffdf5] px-6 pt-6.25 pb-4.75 shadow-[0_1px_1px_#66533112,_2px_5px_7px_-3px_#66533128]",
            "min-[1450px]:mt-10",
            "max-[1101px]:px-4.5 max-[1101px]:pt-5.5 max-[1101px]:pb-4.5",
            "max-[801px]:mt-4.5 max-[801px]:mb-7 max-[801px]:[transform:rotate(calc(var(--contribution-angle)_*_0.45))] max-[801px]:p-6.25",
            "max-[391px]:mt-4.5 max-[391px]:mb-7 max-[391px]:[transform:rotate(calc(var(--contribution-angle)_*_0.45))] max-[391px]:px-4.25 max-[391px]:py-5.25",
            "before:absolute before:-top-2.5 before:left-[calc(35px_+_var(--art-x))] before:h-5.5 before:w-18.75 before:[transform:rotate(var(--contribution-tape))] before:[border-inline-width:1px] before:[border-inline-style:dashed] before:[border-inline-color:rgba(161,_140,_88,_0.19)] before:bg-[#d2c7a670] before:shadow-[inset_0_0_8px_#e6dbb365] before:[backdrop-filter:blur(0.2px)] before:content-[''] before:[clip-path:polygon(0_4%,_97%_0,_100%_93%,_3%_100%,_0_76%,_3%_54%)]",
            "[&>h2]:mx-0 [&>h2]:mt-0 [&>h2]:mb-2.5 [&>h2]:text-[12px] [&>h2]:font-medium [&>h2]:tracking-[1.7px] [&>h2]:uppercase"
          )}
        >
          <Heading icon="sword">Мой вклад</Heading>
          <p
            data-variant-content
            className="role mx-0 mt-0 mb-4.25 text-[12px] text-[#949082]"
          >
            {p.role}
          </p>
          <ul
            data-variant-content
            className={cn(
              "contribution-list m-0 grid gap-2.75 p-0 [list-style:none]",
              "min-[1450px]:gap-3.5",
              "max-[801px]:gap-3.5",
              "[&_li]:flex [&_li]:items-start [&_li]:gap-2.5 [&_li]:text-[14px] [&_li]:leading-[1.33] [&_li]:text-[#606457]",
              "max-[801px]:[&_li]:text-[16px] max-[801px]:[&_li]:leading-[1.35]",
              "[&_.icon]:mt-px [&_.icon]:size-3.5 [&_.icon]:flex-none [&_.icon]:text-[#8a9275]"
            )}
          >
            {p.contribution.map((c) => (
              <li key={c}>
                <Icon name="check" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </section>
        <section
          className={cn(
            "note cases-note relative mx-0.75 mt-0 mb-5 [transform:rotate(var(--cases-angle))] border-[1px] border-solid border-[rgba(117,_98,_68,_0.075)] bg-[color:var(--pale)] px-5.75 pt-5.75 pb-4.25 shadow-[0_1px_1px_#66533112,_2px_5px_7px_-3px_#66533128]",
            "min-[1450px]:pt-6.25 min-[1450px]:pb-5.5",
            "max-[1101px]:px-4.5 max-[1101px]:pt-5.5 max-[1101px]:pb-4.5",
            "max-[801px]:[transform:rotate(calc(var(--cases-angle)_*_0.45))] max-[801px]:p-6",
            "max-[391px]:[transform:rotate(calc(var(--cases-angle)_*_0.45))] max-[391px]:px-4.25 max-[391px]:py-5.5",
            "[&>h2]:mx-0 [&>h2]:mt-0 [&>h2]:mb-2.5 [&>h2]:text-[12px] [&>h2]:font-medium [&>h2]:tracking-[1.7px] [&>h2]:uppercase",
            "after:absolute after:right-0 after:bottom-0 after:size-5.5 after:[filter:drop-shadow(-1px_-1px_0_#00000008)] after:content-[''] after:[background:linear-gradient(135deg,_#0000000a_49%,_#fbf8ee_50%)]",
            "[&_.section-heading_.icon]:text-[var(--accent)]",
            "[&_.section-heading_h2]:text-[22px]"
          )}
        >
          <Heading icon="spark">Уникальные задачи и решения к ним</Heading>
          <ol
            data-variant-content
            className={cn(
              "case-list mx-0 mt-3.75 mb-0 grid gap-2.75 p-0 [list-style:none]",
              "min-[1450px]:gap-3.5",
              "max-[801px]:gap-3.25",
              "[&_li]:grid [&_li]:grid-cols-[17px_1fr] [&_li]:gap-x-2",
              "[&_strong]:text-[14px] [&_strong]:font-medium [&_strong]:text-[#55535a]",
              "max-[801px]:[&_strong]:text-[16px]",
              "[&_p]:mx-0 [&_p]:mt-0.5 [&_p]:mb-0 [&_p]:text-[14px] [&_p]:leading-[1.5] [&_p]:text-[#625c68]"
            )}
          >
            {p.cases.map(([title, text], i) => (
              <li key={title}>
                <span className="case-number font-code text-[10px] leading-[18px] text-[var(--accent)]">
                  0{i + 1}
                </span>
                <div>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <div
          className={cn(
            "notes-footer flex items-start justify-between gap-3 pb-5.5",
            "max-[801px]:flex-col max-[801px]:gap-2",
            "[&_.handwritten]:static [&_.handwritten]:shrink-0 [&_.handwritten]:[transform:rotate(var(--annotation-angle))]",
            "max-[801px]:[&_.handwritten]:m-0 max-[801px]:[&_.handwritten]:[align-self:flex-end]",
            "[&_.all-notes]:[flex-shrink:1] [&_.all-notes]:flex-wrap [&_.all-notes]:text-left",
            "max-[801px]:[&_.all-notes]:mb-0"
          )}
        >
          <button
            className={cn(
              "all-notes mt-0 mr-0 mb-1 ml-2.25 inline-flex items-center gap-3 border-0 [border-bottom-width:1px] border-none [border-bottom-style:dashed] border-[currentcolor] [border-bottom-color:rgb(143,_142,_123)] bg-none px-0 py-0.75 text-[13px] text-[#787968]",
              "max-[801px]:mb-6.5",
              "max-[391px]:mb-0",
              "hover:text-[var(--accent)]",
              "[&_.icon]:size-3.5"
            )}
            onClick={() => onNotes("notes")}
          >
            Подробнее о разработке <Icon name="arrow" />
          </button>
        </div>
        <Folio name={p.name} number={index * 2 + 2} />
      </PaperPage>
    </>
  )
}
