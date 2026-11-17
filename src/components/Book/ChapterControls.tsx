import { cn } from "../../lib/cn"

import type { ProjectBookmark } from "../../types"

const pageButtonClass = cn(
  "flex min-h-11 items-center gap-3 rounded-[5px] border border-solid border-[rgb(185,_187,_172)] bg-[#ecece2bd] px-4.25 py-2.5 text-[13px] text-[#656d5a] shadow-[0_2px_0_#cccdc0] [transition:background_0.2s,_transform_0.2s]",
  "max-[801px]:justify-center max-[801px]:gap-2 max-[801px]:px-3 max-[801px]:py-2.25 max-[801px]:text-[12px]",
  "enabled:hover:[transform:translateY(-1px)] enabled:hover:bg-[#dce1ce]",
  "disabled:opacity-[0.36] disabled:shadow-none",
  "[&_>_span:not(.nav-label)]:font-book [&_>_span:not(.nav-label)]:text-[22px] [&_>_span:not(.nav-label)]:leading-[1] [&_>_span:not(.nav-label)]:font-normal [&_>_span:not(.nav-label)]:not-italic"
)

export function ChapterControls({
  activeIndex,
  bookProjects,
  onPrevious,
  onNext,
}: {
  activeIndex: number
  bookProjects: readonly ProjectBookmark[]
  onPrevious: () => void
  onNext: () => void
}) {
  const chapterCount = bookProjects.length

  return (
    <footer
      className={cn(
        "book-controls mx-auto mt-7.5 mb-0 flex max-w-145 items-center justify-between gap-6.25",
        "max-[801px]:mt-8 max-[801px]:grid max-[801px]:grid-cols-2 max-[801px]:gap-3",
        "max-[391px]:mt-8 max-[391px]:gap-2"
      )}
    >
      <button
        className={pageButtonClass}
        aria-label={
          activeIndex === 0 ? "Вернуться к выбору" : "Предыдущий проект"
        }
        onClick={onPrevious}
      >
        <span aria-hidden="true">←</span>
        <span className="nav-label">
          {activeIndex === 0 ? "К началу" : "Назад"}
        </span>
      </button>

      <div className="min-w-42.5 text-center max-[801px]:order-first max-[801px]:col-span-2 max-[801px]:min-w-0">
        <span className="text-[13px] text-[#555e4a]">
          Глава {activeIndex + 1} из {chapterCount}
        </span>
        <span className="mt-2 flex flex-wrap items-center justify-center gap-1.25 text-[12px] text-[#606650] max-[801px]:hidden">
          Переключать проекты{" "}
          <kbd className="rounded-[2px] border border-[#c1c2b7] px-0.75 py-0 font-commons text-[11px] leading-[normal] font-normal">
            ←
          </kbd>{" "}
          <kbd className="rounded-[2px] border border-[#c1c2b7] px-0.75 py-0 font-commons text-[11px] leading-[normal] font-normal">
            →
          </kbd>
        </span>
      </div>

      <button
        className={pageButtonClass}
        disabled={activeIndex === chapterCount - 1}
        aria-label="Следующий проект"
        onClick={onNext}
      >
        <span className="nav-label">Дальше</span>
        <span aria-hidden="true">→</span>
      </button>
    </footer>
  )
}
