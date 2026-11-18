import { useLayoutEffect, useRef } from "react"

import { ProjectFavicon } from "../ProjectFavicon"
import { Icon } from "../Icon"

import { projectViewId } from "../../routing"
import { compactBookQuery } from "./useBookNavigation"
import { cn } from "../../lib/cn"

import type { ProjectBookmark, ThemeStyle, Variant } from "../../types"

export function Bookmarks({
  projects,
  activeIndex,
  isPersonal,
  variant,
  onSelect,
  onHome,
}: {
  projects: readonly ProjectBookmark[]
  activeIndex: number
  isPersonal: boolean
  variant: Variant
  onSelect: (index: number) => void
  onHome: () => void
}) {
  const nav = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const bookmarks = nav.current
    if (!bookmarks) return

    const centerActiveBookmark = () => {
      if (!window.matchMedia(compactBookQuery).matches) return

      const active = bookmarks.querySelector<HTMLButtonElement>(
        '[aria-current="page"]'
      )
      if (!active) return

      bookmarks.scrollTo({
        left:
          active.offsetLeft - (bookmarks.clientWidth - active.offsetWidth) / 2,
        behavior: "instant",
      })
    }

    centerActiveBookmark()
    const resizeObserver = new ResizeObserver(centerActiveBookmark)
    resizeObserver.observe(bookmarks)
    return () => resizeObserver.disconnect()
  }, [activeIndex, isPersonal])

  return (
    <div className="contents max-[1101px]:sticky max-[1101px]:top-0 max-[1101px]:z-20 max-[1101px]:block max-[1101px]:bg-[#e8e6df] max-[1101px]:pt-[env(safe-area-inset-top,0px)]">
      <button
        type="button"
        onClick={onHome}
        aria-controls="spread"
        className="ml-2 hidden h-12 min-h-11 touch-manipulation items-center gap-2 rounded-lg px-2 text-[13px] text-[#505a46] transition-colors select-none hover:bg-[#d8ddcd] focus-visible:outline-offset-[-3px] active:bg-[#cdd3c2] max-[1101px]:flex"
      >
        <Icon name="book" className="size-4" />
        Все проекты
      </button>
      <nav
        ref={nav}
        className={cn(
          "absolute right-8 bottom-[calc(100%-3px)] left-8 z-[-1] flex items-end justify-between gap-2",
          "max-[1101px]:relative max-[1101px]:inset-auto max-[1101px]:z-auto max-[1101px]:scroll-px-1 max-[1101px]:scrollbar-none max-[1101px]:justify-start max-[1101px]:gap-1.5 max-[1101px]:overflow-x-auto max-[1101px]:px-1 max-[1101px]:pt-1.5 max-[1101px]:[&::-webkit-scrollbar]:hidden",
          isPersonal &&
            "min-[1101px]:justify-start min-[1101px]:[&_.bookmark]:flex-[0_1_180px]"
        )}
        aria-label={isPersonal ? "Личные проекты" : "Проекты"}
      >
        {projects.map((item, index) => {
          const isActive = index === activeIndex
          const iconId = projectViewId(item.id, isActive ? variant : "web")

          return (
            <button
              key={item.id}
              type="button"
              className={cn(
                "bookmark relative flex h-14 min-w-0 flex-1 touch-manipulation items-center justify-center gap-2 rounded-t-lg border border-b-0 border-solid border-[#00000016] bg-(--tab) [background-image:var(--paper-grain)] px-3 py-3 text-[14px] whitespace-nowrap text-[#514e48] shadow-[inset_0_2px_#ffffff50] select-none [-webkit-user-select:none] [transition:height_220ms,filter_180ms,background-color_180ms]",
                "max-[1101px]:h-14 max-[1101px]:min-w-22 max-[1101px]:flex-none max-[1101px]:flex-col max-[1101px]:gap-1.5 max-[1101px]:px-3 max-[1101px]:py-2 max-[1101px]:text-[12px] max-[1101px]:[&_.bookmark-favicon]:size-4.5",
                "[&_.icon]:size-4.5",
                "min-[1101px]:hover:h-15.5 [@media(hover:hover)_and_(pointer:fine)]:hover:brightness-105",
                "aria-[current='page']:bg-(--tab-strong) aria-[current='page']:font-medium aria-[current='page']:text-[#fffef8] min-[1101px]:aria-[current='page']:h-17",
                "aria-[current='page']:after:absolute aria-[current='page']:after:inset-x-2.5 aria-[current='page']:after:top-1.5 aria-[current='page']:after:border-t aria-[current='page']:after:border-dashed aria-[current='page']:after:border-current aria-[current='page']:after:opacity-35 aria-[current='page']:after:content-['']",
                "max-[1101px]:aria-[current='page']:shadow-[inset_0_-3px_0_currentColor] max-[1101px]:aria-[current='page']:after:content-none",
                "active:brightness-95 max-[1101px]:focus-visible:outline-offset-[-3px]",
                "[&[data-project-id='crypton-id'][aria-current='page']]:bg-[#fbede5] [&[data-project-id='crypton-id'][aria-current='page']]:bg-none",
                "[&[data-project-id='in-prime'][aria-current='page']]:bg-[#fff1cf] [&[data-project-id='in-prime'][aria-current='page']]:bg-none",
                "[&[data-project-id='academy'][aria-current='page']]:bg-[#f0e8ff] [&[data-project-id='academy'][aria-current='page']]:bg-none",
                "[&:is([data-project-id='crypton-id'],[data-project-id='in-prime'],[data-project-id='academy'])[aria-current='page']]:text-[#463d50]"
              )}
              data-project={index}
              data-project-id={item.id}
              style={
                {
                  "--tab": item.pale,
                  "--tab-strong": item.color,
                } as ThemeStyle
              }
              aria-label={item.name}
              aria-controls="spread"
              aria-current={isActive ? "page" : undefined}
              onClick={() => onSelect(index)}
            >
              <ProjectFavicon id={iconId} symbol={item.symbol} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
