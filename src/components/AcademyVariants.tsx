import type { Variant } from "../types"

import { cn } from "../lib/cn"

const options = [
  { mode: "web", label: "Веб-платформа" },
  { mode: "mini", label: "Telegram + Base" },
] as const

export function AcademyVariants({
  variant,
  onChange,
}: {
  variant: Variant
  onChange: (mode: Variant, keyboard: boolean) => void
}) {
  return (
    <div
      className={cn(
        "academy-variants relative mx-0 mt-0 mb-5 grid w-[min(100%,_310px)] grid-cols-2 rounded-[4px] border-[1px] border-solid border-[rgb(168,_180,_187)] bg-[#eeeadd] p-0.75 shadow-[0_2px_0_#d8d2c1]",
        "[&_.variant]:relative [&_.variant]:m-0 [&_.variant]:flex [&_.variant]:min-h-9 [&_.variant]:items-center [&_.variant]:justify-center [&_.variant]:rounded-[2px] [&_.variant]:border-0 [&_.variant]:border-none [&_.variant]:border-[currentcolor] [&_.variant]:bg-transparent [&_.variant]:px-2.5 [&_.variant]:py-2 [&_.variant]:font-commons [&_.variant]:text-[12px] [&_.variant]:leading-[normal] [&_.variant]:font-normal [&_.variant]:whitespace-nowrap [&_.variant]:text-[#7b827e] [&_.variant]:not-italic",
        "[&_.variant[aria-pressed='true']]:border-0 [&_.variant[aria-pressed='true']]:border-none [&_.variant[aria-pressed='true']]:border-[currentcolor] [&_.variant[aria-pressed='true']]:bg-transparent [&_.variant[aria-pressed='true']]:text-[#7b827e]",
        "[@media(hover:hover)_and_(pointer:fine)]:[&_.variant:hover]:text-[#425e72]"
      )}
      role="group"
      aria-label="Версия Academy"
    >
      {options.map(({ mode, label }) => (
        <button
          key={mode}
          className={cn(
            "variant rounded-[3px] border-[1px] border-solid border-[rgb(198,_199,_183)] bg-transparent px-2.5 py-1.25 font-commons text-[11px] leading-[normal] font-normal text-[#858772] not-italic",
            "[&[aria-pressed='true']]:border-[#9fa98d] [&[aria-pressed='true']]:bg-[#e0e5d7] [&[aria-pressed='true']]:text-[#566349]"
          )}
          aria-pressed={variant === mode}
          onClick={(event) => onChange(mode, event.detail === 0)}
        >
          {label}
        </button>
      ))}
      <div
        className={cn(
          "academy-variants-ink pointer-events-none absolute top-0.75 right-0.75 bottom-0.75 left-0.75 grid grid-cols-2 [transition:clip-path_250ms_var(--ease-in-out)]",
          "[&_span]:flex [&_span]:min-h-9 [&_span]:items-center [&_span]:justify-center [&_span]:rounded-[2px] [&_span]:border-[1px] [&_span]:border-solid [&_span]:border-[rgb(157,_174,_187)] [&_span]:bg-[#dce7ef] [&_span]:px-2.5 [&_span]:py-2 [&_span]:font-commons [&_span]:text-[12px] [&_span]:leading-[normal] [&_span]:font-medium [&_span]:whitespace-nowrap [&_span]:text-[#4b687d] [&_span]:not-italic [&_span]:shadow-[inset_0_0_0_2px_#e7eef2]",
          "motion-reduce:[transition:none]",
          "[&_span:before]:mr-1.75 [&_span:before]:text-[7px] [&_span:before]:text-[#6f8ca9] [&_span:before]:[content:'◆']"
        )}
        aria-hidden="true"
        style={{
          clipPath: variant === "web" ? "inset(0 50% 0 0)" : "inset(0 0 0 50%)",
        }}
      >
        {options.map(({ mode, label }) => (
          <span key={mode}>{label}</span>
        ))}
      </div>
    </div>
  )
}
