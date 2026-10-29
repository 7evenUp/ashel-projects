import type { ComponentProps } from "react"

import { cn } from "../lib/cn"

type PaperPageProps = ComponentProps<"section"> & { side: "left" | "right" }

const PaperPage = ({ side, className, ...props }: PaperPageProps) => (
  <section
    className={cn(
      "paper-page relative min-w-0 before:pointer-events-none before:absolute before:top-2.75 before:right-2.5 before:bottom-2.75 before:left-2.5 before:rounded-[1px] before:border-[1px] before:border-solid before:content-['']",
      side === "left"
        ? "page-left rounded-[3px_0_0_5px] shadow-[inset_-18px_0_28px_-20px_#62533270,_inset_3px_0_4px_#c0af8130] before:border-[rgba(170,_148,_108,_0.098)] max-[801px]:rounded-[2px_2px_0_0] max-[391px]:rounded-[2px_2px_0_0]"
        : "page-right rounded-[0_3px_5px_0] shadow-[inset_19px_0_28px_-24px_#62533270,_inset_-2px_0_4px_#c0af8130]",
      className
    )}
    {...props}
  />
)

export default PaperPage
