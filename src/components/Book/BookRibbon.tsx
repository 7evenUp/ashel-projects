import { Icon } from "../Icon"

import { cn } from "../../lib/cn"

export function BookRibbon({
  isChapter,
  isDesign,
  onHome,
}: {
  isChapter: boolean
  isDesign: boolean
  onHome: () => void
}) {
  return isChapter ? (
    <div
      className={cn(
        "home-ribbon-rail pointer-events-none absolute top-27.5 bottom-0 -left-22 z-[-1] w-26",
        "max-[801px]:top-25 max-[801px]:-left-9.5 max-[801px]:w-12"
      )}
    >
      <button
        className={cn(
          "home-ribbon pointer-events-auto relative flex h-11 w-26 touch-manipulation items-center justify-center gap-2 border-0 border-none border-[currentcolor] bg-[#8d789c] py-2 pr-3 pl-5 text-[#fff5e7] shadow-[inset_-3px_0_5px_#44334f40] select-none [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%,_12%_50%)]",
          "max-[801px]:sticky max-[801px]:top-[calc(84px_+_env(safe-area-inset-top,_0px))] max-[801px]:h-10 max-[801px]:w-12 max-[801px]:pr-2 max-[801px]:pl-3.5",
          "before:pointer-events-none before:absolute before:top-1.25 before:right-0 before:bottom-1.25 before:left-3 before:[border-block-width:1px] before:[border-block-style:solid] before:[border-block-color:rgba(210,_194,_221,_0.44)] before:content-['']",
          "[&_.icon]:size-4.25 [&_.icon]:shrink-0",
          "[&_span]:text-[12px] [&_span]:tracking-[0.4px]",
          "max-[801px]:[&_span]:hidden",
          "focus-visible:bg-[#6b537f] focus-visible:[outline:none]",
          "[&:focus-visible:before]:[outline:2px_solid_#fff5e7] [&:focus-visible:before]:[outline-offset:-3px]",
          "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#756086]"
        )}
        aria-label="Начало книги"
        aria-controls="spread"
        title="Вернуться к началу книги"
        onClick={onHome}
      >
        <Icon name="book" />
        <span>Начало</span>
      </button>
    </div>
  ) : (
    <div
      className={cn(
        "ribbon absolute -bottom-9.25 left-[calc(50%_+_60px)] z-[-1] h-16.5 w-6.75 [transform:rotate(-3deg)] bg-[#a18eaf] shadow-[3px_2px_6px_#6c52643b] [clip-path:polygon(0_0,_100%_0,_100%_100%,_50%_83%,_0_100%)]",
        "max-[801px]:right-10.5 max-[801px]:left-auto",
        "after:absolute after:top-0 after:right-1 after:bottom-0 after:left-1 after:[border-right-width:1px] after:[border-left-width:1px] after:[border-right-style:solid] after:[border-left-style:solid] after:[border-right-color:rgb(196,_182,_206)] after:[border-left-color:rgb(196,_182,_206)] after:content-['']",
        isDesign &&
          "bg-[#8e586f] shadow-[3px_2px_6px_#100c1450] after:[border-right-color:#ba8799] after:[border-left-color:#ba8799]"
      )}
      aria-hidden="true"
    />
  )
}
