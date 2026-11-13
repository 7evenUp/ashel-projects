import { useLayoutEffect, useRef } from "react"

import { ProjectFavicon } from "../ProjectFavicon"

import { projectViewId } from "../../routing"
import { mobileBookQuery } from "./useBookNavigation"
import { cn } from "../../lib/cn"

import type { ProjectBookmark, ThemeStyle, Variant } from "../../types"

export function Bookmarks({
  projects,
  activeIndex,
  isPersonal,
  variant,
  onSelect,
}: {
  projects: readonly ProjectBookmark[]
  activeIndex: number
  isPersonal: boolean
  variant: Variant
  onSelect: (index: number) => void
}) {
  const nav = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!window.matchMedia(mobileBookQuery).matches) return

    const bookmarks = nav.current
    const active = bookmarks?.querySelector<HTMLButtonElement>(
      '[aria-current="page"]'
    )
    if (bookmarks && active) {
      bookmarks.scrollTo({
        left:
          active.offsetLeft - (bookmarks.clientWidth - active.offsetWidth) / 2,
        behavior: "instant",
      })
    }
  }, [activeIndex, isPersonal])

  return (
    <nav
      ref={nav}
      className={cn(
        "absolute right-8 bottom-[calc(100%-3px)] left-8 z-[-1] flex items-end justify-between gap-2",
        "max-[1101px]:right-5.5 max-[1101px]:left-5.5",
        "max-[801px]:sticky max-[801px]:top-0 max-[801px]:right-auto max-[801px]:bottom-auto max-[801px]:left-auto max-[801px]:z-20 max-[801px]:scroll-px-1 max-[801px]:scrollbar-none max-[801px]:items-stretch max-[801px]:justify-start max-[801px]:gap-1.25 max-[801px]:overflow-x-auto max-[801px]:bg-[#e8e6df] max-[801px]:px-1 max-[801px]:pt-[calc(10px+env(safe-area-inset-top,0px))] max-[801px]:pb-0",
        "max-[801px]:[&::-webkit-scrollbar]:hidden",
        "max-[801px]:[&_.bookmark]:h-14.5 max-[801px]:[&_.bookmark]:flex-[0_0_82px] max-[801px]:[&_.bookmark]:touch-manipulation max-[801px]:[&_.bookmark]:px-1.25 max-[801px]:[&_.bookmark]:pt-2.5 max-[801px]:[&_.bookmark]:pb-2 max-[801px]:[&_.bookmark]:text-[12px] max-[801px]:[&_.bookmark]:select-none max-[801px]:[&_.bookmark]:[-webkit-user-select:none] max-[801px]:[&_.bookmark]:[transition:none]",
        "max-[801px]:[&_.bookmark:hover]:h-14.5 max-[801px]:[&_.bookmark:hover]:filter-none",
        "max-[801px]:[&_.bookmark[aria-current='page']]:h-14.5 max-[801px]:[&_.bookmark[aria-current='page']]:shadow-[inset_0_-3px_0_currentColor] max-[801px]:[&_.bookmark[aria-current='page']]:filter-none",
        "max-[801px]:[&_.bookmark:active]:filter-[brightness(0.94)]",
        "max-[801px]:[&_.bookmark:focus-visible]:[outline-offset:-3px]",
        isPersonal &&
          "min-[801px]:justify-start min-[801px]:[&_.bookmark]:flex-[0_1_180px]"
      )}
      aria-label={isPersonal ? "Личные проекты" : "Проекты"}
    >
      {projects.map((item, index) => {
        const isActive = index === activeIndex
        const iconId = projectViewId(item.id, isActive ? variant : "web")

        return (
          <button
            key={item.id}
            className={cn(
              "bookmark relative flex h-13.25 min-w-0 flex-1 items-center justify-center gap-2 rounded-[7px_7px_0_0] border [border-bottom-width:0px] border-solid [border-bottom-style:none] border-[rgba(0,0,0,0.086)] border-b-current bg-(--tab) [background-image:var(--paper-grain)] px-2.25 pt-4 pb-4.5 text-[15px] whitespace-nowrap text-[#514e48] shadow-[inset_0_2px_#ffffff38] [transition:height_0.22s,filter_0.2s,transform_0.2s]",
              "max-[1101px]:gap-1.25 max-[1101px]:text-[12px]",
              "max-[801px]:h-11.25 max-[801px]:flex-col max-[801px]:gap-0.75 max-[801px]:px-0.75 max-[801px]:py-2.75 max-[801px]:text-[10px]",
              "max-[391px]:h-11.25 max-[391px]:flex-col max-[391px]:gap-0.75 max-[391px]:px-0.75 max-[391px]:py-2.75 max-[391px]:text-[9px]",
              "[&_.icon]:size-4.5",
              "max-[801px]:[&_.icon]:size-3.75",
              "max-[391px]:[&_.icon]:size-3.5",
              "hover:h-15.25 hover:filter-[brightness(1.03)]",
              "max-[801px]:hover:h-13",
              "aria-[aria-current='page']:h-17.25 aria-[aria-current='page']:bg-(--tab-strong) aria-[aria-current='page']:font-medium aria-[aria-current='page']:text-[#fffef8]",
              "max-[801px]:aria-[aria-current='page']:h-15",
              "[&[aria-current='page']:after]:absolute [&[aria-current='page']:after]:top-1.75 [&[aria-current='page']:after]:right-2.5 [&[aria-current='page']:after]:left-2.5 [&[aria-current='page']:after]:[border-top-width:1px] [&[aria-current='page']:after]:[border-top-style:dashed] [&[aria-current='page']:after]:border-t-[rgba(255,255,255,0.376)] [&[aria-current='page']:after]:content-['']",
              "max-[801px]:[&[aria-current='page']:after]:right-1.25 max-[801px]:[&[aria-current='page']:after]:left-1.25",
              "[&[data-project-id='crypton-id'][aria-current='page']]:bg-[#fbede5] [&[data-project-id='crypton-id'][aria-current='page']]:bg-none",
              "[&[data-project-id='in-prime'][aria-current='page']]:bg-[#fff1cf] [&[data-project-id='in-prime'][aria-current='page']]:bg-none",
              "[&[data-project-id='academy'][aria-current='page']]:bg-[#f0e8ff] [&[data-project-id='academy'][aria-current='page']]:bg-none",
              "[&:is([data-project-id='crypton-id'],[data-project-id='in-prime'],[data-project-id='academy'])[aria-current='page']]:text-[#463d50]",
              "[&:is([data-project-id='crypton-id'],[data-project-id='in-prime'],[data-project-id='academy'])[aria-current='page']:after]:border-t-[#463d5059]"
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
  )
}
