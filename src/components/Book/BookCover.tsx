import type { ComponentProps, ReactNode, RefObject } from "react"

import { PageTurn } from "../PageTurn"

import { cn } from "../../lib/cn"

import type { Turn } from "../PageTurn"

type TouchHandlers = Pick<
  ComponentProps<"div">,
  "onTouchStart" | "onTouchEnd" | "onTouchCancel"
>

export function BookCover({
  book,
  children,
  isDesign,
  label,
  turn,
  touchHandlers,
  onTurnFinish,
}: {
  book: RefObject<HTMLDivElement | null>
  children: ReactNode
  isDesign: boolean
  label: string
  turn: Turn | null
  touchHandlers?: TouchHandlers
  onTurnFinish: (serial: number) => void
}) {
  return (
    <div
      className={cn(
        "book-cover relative rounded-[11px_10px_14px_13px] border-[7px] [border-top-width:6px] border-solid border-[#626b56] bg-[#59614e] px-0.5 pt-0 pb-2.25 shadow-[inset_0_0_0_1px_#e3e3bb50,0_2px_2px_#31382a60,0_15px_18px_-9px_#37342e65,0_38px_65px_-24px_#35312860]",
        "max-[801px]:border-[5px] max-[801px]:pr-px max-[801px]:pb-2 max-[801px]:pl-px",
        "before:absolute before:top-1.75 before:right-px before:-bottom-px before:left-px before:transform-[translateY(3px)] before:rounded-[4px_4px_8px_8px] before:shadow-[0_2px_2px_#34322b50,2px_0_0_#dbd1b9,-2px_0_0_#d4cbb5] before:content-[''] before:[background:repeating-linear-gradient(0deg,#c0b69e_0_1px,#eee7d5_1px_3px,#ded4bc_3px_4px,#faf4e5_4px_6px)]",
        isDesign &&
          "border-[#493447] bg-[#352635] shadow-[inset_0_0_0_1px_#c18b9e26,0_2px_2px_#0e0b11b3,0_18px_24px_-10px_#0e0b11e6,0_38px_65px_-24px_#0e0b11e6] before:shadow-[0_2px_2px_#100c14a0,2px_0_0_#413546,-2px_0_0_#3a3040] before:[background:repeating-linear-gradient(0deg,#241d2a_0_1px,#403445_1px_3px,#302636_3px_4px,#483a4d_4px_6px)]",
        turn && (turn.direction > 0 ? "turning-forward" : "turning-backward")
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute top-3 bottom-5 left-[calc(50%-2px)] z-7 w-1 opacity-[0.7] [background:repeating-linear-gradient(0deg,transparent_0_65px,#e6dbc0_65px_73px,#796c4d_73px_75px,transparent_75px_142px)]",
          "max-[801px]:hidden",
          isDesign &&
            "[background:repeating-linear-gradient(0deg,transparent_0_65px,#a67c8b_65px_73px,#493145_73px_75px,transparent_75px_142px)]"
        )}
        aria-hidden="true"
      />

      <div
        ref={book}
        className={cn(
          "relative grid min-h-184.5 grid-cols-2 rounded-[4px_4px_5px_5px] bg-[#f4efdf] [outline:none] perspective-[2000px]",
          "min-[801px]:grid-cols-2",
          "min-[1450px]:min-h-191.5",
          "max-[1101px]:min-h-188.75",
          "max-[801px]:min-h-0 max-[801px]:scroll-mt-[calc(78px+env(safe-area-inset-top,0px))] max-[801px]:grid-cols-[1fr]",
          "after:pointer-events-none after:absolute after:top-0 after:bottom-0 after:left-[50%] after:z-6 after:w-17.5 after:transform-[translateX(-50%)] after:content-[''] after:[background:linear-gradient(90deg,transparent,#7d6d4820_30%,#51462d45_47%,#4038224d_49%,#fffbeccc_51%,#ac997135_56%,transparent)]",
          "max-[801px]:after:hidden",
          isDesign &&
            "bg-[#24212b] after:[background:linear-gradient(90deg,transparent,#100d1770_30%,#100d17c0_48%,#6a53635c_51%,#17121d60_57%,transparent)]"
        )}
        id="spread"
        tabIndex={-1}
        aria-label={label}
        {...touchHandlers}
      >
        {children}
      </div>

      {turn && (
        <PageTurn
          key={turn.serial}
          turn={turn}
          book={book}
          onFinish={() => onTurnFinish(turn.serial)}
        />
      )}
    </div>
  )
}
