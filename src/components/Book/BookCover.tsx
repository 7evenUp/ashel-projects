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
        "book-cover relative rounded-[11px_10px_14px_13px] border-[7px] [border-top-width:6px] border-solid border-[#626b56] bg-[#59614e] px-0.5 pt-0 pb-2.25 shadow-[inset_0_0_0_1px_#e3e3bb50,_0_2px_2px_#31382a60,_0_15px_18px_-9px_#37342e65,_0_38px_65px_-24px_#35312860]",
        "max-[801px]:border-[5px] max-[801px]:pr-px max-[801px]:pb-2 max-[801px]:pl-px",
        "before:absolute before:top-1.75 before:right-px before:-bottom-px before:left-px before:[transform:translateY(3px)] before:rounded-[4px_4px_8px_8px] before:shadow-[0_2px_2px_#34322b50,_2px_0_0_#dbd1b9,_-2px_0_0_#d4cbb5] before:content-[''] before:[background:repeating-linear-gradient(_0deg,_#c0b69e_0_1px,_#eee7d5_1px_3px,_#ded4bc_3px_4px,_#faf4e5_4px_6px_)]",
        isDesign &&
          "border-[#493447] bg-[#352635] shadow-[inset_0_0_0_1px_#c18b9e26,_0_2px_2px_#0e0b11b3,_0_18px_24px_-10px_#0e0b11e6,_0_38px_65px_-24px_#0e0b11e6] before:shadow-[0_2px_2px_#100c14a0,_2px_0_0_#413546,_-2px_0_0_#3a3040] before:[background:repeating-linear-gradient(_0deg,_#241d2a_0_1px,_#403445_1px_3px,_#302636_3px_4px,_#483a4d_4px_6px_)]",
        turn && (turn.direction > 0 ? "turning-forward" : "turning-backward")
      )}
    >
      <div
        className={cn(
          "binding-stitches pointer-events-none absolute top-3 bottom-5 left-[calc(50%_-_2px)] z-[7] w-1 opacity-[0.7] [background:repeating-linear-gradient(_0deg,_transparent_0_65px,_#e6dbc0_65px_73px,_#796c4d_73px_75px,_transparent_75px_142px_)]",
          "max-[801px]:hidden",
          isDesign &&
            "[background:repeating-linear-gradient(_0deg,_transparent_0_65px,_#a67c8b_65px_73px,_#493145_73px_75px,_transparent_75px_142px_)]"
        )}
        aria-hidden="true"
      />
      <div
        className={cn(
          "cover-corner corner-tl pointer-events-none absolute -top-1 -left-1.25 z-[8] size-6 rounded-[5px_0_0] border-[1px] border-solid border-[rgba(193,_172,_107,_0.5)] shadow-[1px_2px_3px_#453c3025] [background:linear-gradient(_135deg,_#d3bd7b,_#9c874e_40%,_#e1d298_50%,_#8e7949_)] [clip-path:polygon(0_0,_100%_0,_0_100%)]"
        )}
        aria-hidden="true"
      />
      <div
        className={cn(
          "cover-corner corner-br pointer-events-none absolute -right-1.25 -bottom-1.25 z-[8] size-6 rounded-[0_0_6px] border-[1px] border-solid border-[rgba(193,_172,_107,_0.5)] shadow-[1px_2px_3px_#453c3025] [background:linear-gradient(_135deg,_#d3bd7b,_#9c874e_40%,_#e1d298_50%,_#8e7949_)] [clip-path:polygon(100%_0,_100%_100%,_0_100%)]"
        )}
        aria-hidden="true"
      />

      <div
        ref={book}
        className={cn(
          "book relative grid min-h-184.5 grid-cols-2 rounded-[4px_4px_5px_5px] bg-[#f4efdf] [outline:none] [perspective:2000px]",
          "min-[801px]:grid-cols-2",
          "min-[1450px]:min-h-191.5",
          "max-[1101px]:min-h-188.75",
          "max-[801px]:min-h-0 max-[801px]:[scroll-margin-top:calc(78px_+_env(safe-area-inset-top,_0px))] max-[801px]:grid-cols-[1fr]",
          "after:pointer-events-none after:absolute after:top-0 after:bottom-0 after:left-[50%] after:z-[6] after:w-17.5 after:[transform:translateX(-50%)] after:content-[''] after:[background:linear-gradient(_90deg,_transparent,_#7d6d4820_30%,_#51462d45_47%,_#4038224d_49%,_#fffbeccc_51%,_#ac997135_56%,_transparent_)]",
          "max-[801px]:after:hidden",
          isDesign &&
            "bg-[#24212b] after:[background:linear-gradient(_90deg,_transparent,_#100d1770_30%,_#100d17c0_48%,_#6a53635c_51%,_#17121d60_57%,_transparent_)]"
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
