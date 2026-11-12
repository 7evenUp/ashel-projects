import { cn } from "../../lib/cn"

import type { ProjectBookmark } from "../../types"

const pageButtonClass = cn(
  "page-button flex min-h-10.5 items-center gap-3 rounded-[5px] border-[1px] border-solid border-[rgb(185,_187,_172)] bg-[#ecece2bd] px-4.25 py-2.5 text-[13px] text-[#656d5a] shadow-[0_2px_0_#cccdc0] [transition:background_0.2s,_transform_0.2s]",
  "max-[801px]:gap-2 max-[801px]:px-3 max-[801px]:py-2.25 max-[801px]:text-[12px]",
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
        "max-[801px]:mt-8 max-[801px]:hidden max-[801px]:gap-3",
        "max-[391px]:mt-8 max-[391px]:hidden max-[391px]:max-w-67.5 max-[391px]:gap-3"
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
        <span className="nav-label max-[391px]:hidden">
          {activeIndex === 0 ? "К началу" : "Назад"}
        </span>
      </button>

      <div className="reading-progress min-w-42.5 text-center max-[801px]:min-w-33">
        <span className="chapter-counter text-[10px] tracking-[1.8px] text-[#747568] max-[801px]:text-[9px]">
          ГЛАВА {String(activeIndex + 1).padStart(2, "0")} ИЗ{" "}
          {String(chapterCount).padStart(2, "0")}
        </span>
        <div
          className={cn(
            "progress-dots mx-0 my-2.25 flex justify-center gap-1.75",
            "[&_i]:size-1 [&_i]:rounded-full [&_i]:bg-[#c6c5b7]",
            "[&_i.current]:w-3.75 [&_i.current]:rounded-[2px] [&_i.current]:bg-[#747f62]"
          )}
          aria-hidden="true"
        >
          {bookProjects.map((item, index) => (
            <i
              key={item.id}
              className={index === activeIndex ? "current" : ""}
            />
          ))}
        </div>
        <span className="keyboard-hint flex items-center justify-center gap-1.25 text-[10px] text-[#96988b] max-[801px]:text-[9px]">
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
        <span className="nav-label max-[391px]:hidden">Дальше</span>
        <span aria-hidden="true">→</span>
      </button>
    </footer>
  )
}
