import { cn } from "../../lib/cn"

export function Folio({ name, number }: { name: string; number: number }) {
  return (
    <div
      className={cn(
        "page-number absolute right-9.5 bottom-4.5 left-9.5 flex justify-between [border-top-width:1px] [border-top-style:solid] [border-top-color:rgba(157,_149,_114,_0.11)] pt-2.75 text-[10px] tracking-[0.5px] text-[#a09b88]",
        "[&_.folio]:font-book [&_.folio]:text-[12px]",
        "after:absolute after:-top-2.5 after:left-[50%] after:[transform:translateX(-50%)] after:bg-[#f6f1e3] after:px-1.75 after:py-0 after:font-[family-name:Georgia] after:text-[15px] after:leading-[normal] after:font-normal after:text-[#aaa083] after:not-italic after:[content:'❧']"
      )}
    >
      <span>{name}</span>
      <span className="folio">{String(number).padStart(2, "0")}</span>
    </div>
  )
}
