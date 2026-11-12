import { cn } from "../lib/cn"

import "./ModeSwitch.css"

export function ModeSwitch({
  isDesign,
  onChange,
}: {
  isDesign: boolean
  onChange: () => void
}) {
  return (
    <header className="relative z-[2] flex justify-center pt-[max(12px,env(safe-area-inset-top))]">
      <button
        type="button"
        role="switch"
        aria-checked={isDesign}
        aria-label="Режим Design"
        aria-controls="spread"
        onClick={onChange}
        className={cn(
          "relative grid min-h-11 w-44 touch-manipulation grid-cols-2 items-center rounded-full border p-1 text-sm font-medium select-none active:brightness-95",
          isDesign
            ? "border-[#665163] bg-[#25212c] text-[#d9c7ce] focus-visible:outline-[#e6a996]"
            : "border-[#7c84694d] bg-[#dcded0] text-[#47523c]"
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-y-1 left-1 w-[calc(50%_-_4px)] rounded-full",
            "motion-safe:transition-transform motion-safe:duration-200",
            isDesign
              ? "bg-[#e6a996] shadow-[0_1px_3px_#17121b40]"
              : "translate-x-full bg-[#fffdf5] shadow-[0_1px_3px_#3e322526]"
          )}
        />
        <span
          aria-hidden="true"
          className={cn("relative", isDesign && "text-[#30202a]")}
        >
          Design
        </span>
        <span aria-hidden="true" className="relative">
          Code
        </span>
      </button>
    </header>
  )
}
