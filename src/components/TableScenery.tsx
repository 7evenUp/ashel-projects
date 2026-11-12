import { assetUrl } from "../lib/assetUrl"
import { cn } from "../lib/cn"

import "./TableScenery.css"

const sceneryByMode = {
  design: [
    {
      image: "design-paper-form.webp",
      placement: "top-[13%] left-[calc(50%_-_390px)] w-54 -rotate-12",
    },
    {
      image: "design-ink-collage.webp",
      placement: "top-[43%] left-[calc(50%_-_650px)] w-48 rotate-11",
    },
    {
      image: "design-fabric-study.webp",
      placement: "top-[94%] left-[calc(50%_-_265px)] w-57 -rotate-7",
    },
    {
      image: "design-glass-loop.webp",
      placement: "top-[35%] left-[calc(50%_+_715px)] w-46 rotate-14",
    },
    {
      image: "design-sculpture.webp",
      placement: "top-[72%] left-[calc(50%_+_640px)] w-55 -rotate-6",
    },
  ],
  code: [
    {
      image: "code-network-switch.webp",
      placement: "top-[37%] left-[calc(50%_-_620px)] w-56 -rotate-13",
    },
    {
      image: "code-processor.webp",
      placement: "top-[92%] left-[calc(50%_-_348px)] w-43 rotate-15",
    },
    {
      image: "code-web-globe.webp",
      placement: "top-[13%] left-[calc(50%_+_310px)] w-47 rotate-8",
    },
    {
      image: "code-network-nodes.webp",
      placement: "top-[49%] left-[calc(50%_+_710px)] w-52 -rotate-12",
    },
    {
      image: "code-terminal-keys.webp",
      placement: "top-[77%] left-[calc(50%_+_648px)] w-48 rotate-9",
    },
  ],
}

const codeSymbols = [
  ["<", "top-[19%] left-[14%] -rotate-12 text-2xl"],
  ["/", "top-[47%] left-[19%] rotate-9 text-xl"],
  ["=>", "top-[63%] left-[10%] rotate-7 text-lg"],
  ["{ }", "top-[85%] left-[21%] -rotate-8 text-xl"],
  ["0xFF", "top-[22%] left-[28%] rotate-10 text-xs"],
  ["!==", "top-[91%] left-[12%] rotate-7 text-sm"],
  ["...", "top-[39%] left-[8%] -rotate-8 text-sm"],
  ["+=", "top-[78%] left-[30%] rotate-9 text-base"],
  ["::", "top-[60%] left-[20%] -rotate-9 text-sm"],
  ["/*", "top-[9%] left-[18%] rotate-10 text-sm"],
  ["|>", "top-[12%] left-[38%] -rotate-12 text-lg"],
  ["( )", "top-[96%] left-[28%] rotate-6 text-xs"],
  [">", "top-[21%] left-[88%] rotate-12 text-2xl"],
  ["[]", "top-[67%] left-[93%] -rotate-8 text-lg"],
  ["?.", "top-[40%] left-[78%] rotate-7 text-lg"],
  ["O(n)", "top-[58%] left-[75%] -rotate-9 text-sm"],
  ["&&", "top-[87%] left-[88%] rotate-12 text-xl"],
  ["/* */", "top-[32%] left-[84%] rotate-8 text-xs"],
  ["#", "top-[31%] left-[93%] rotate-8 text-lg"],
  ["^", "top-[58%] left-[95%] -rotate-10 text-lg"],
  [";", "top-[94%] left-[65%] rotate-7 text-xl"],
  ["??", "top-[9%] left-[78%] rotate-8 text-xs"],
  ["<<", "top-[46%] left-[85%] -rotate-11 text-sm"],
  ["% 2", "top-[94%] left-[81%] rotate-9 text-sm"],
]

const TableScenery = ({ isDesign }: { isDesign: boolean }) => {
  const activeMode = isDesign ? "design" : "code"

  return (
    <div
      className="table-scenery pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      data-mode={activeMode}
      aria-hidden="true"
    >
      {(["design", "code"] as const).map((mode) => (
        <div key={mode} hidden={mode !== activeMode}>
          {mode === "code" &&
            codeSymbols.map(([symbol, placement]) => (
              <span
                key={symbol}
                className={cn(
                  "code-symbol absolute font-code leading-none whitespace-nowrap text-[#42556b]/35",
                  placement
                )}
              >
                {symbol}
              </span>
            ))}

          {sceneryByMode[mode].map(({ image, placement }) => (
            <img
              key={image}
              src={assetUrl(`assets/scenery/${image}`)}
              alt=""
              className={cn(
                "scenery-image absolute block -translate-x-1/2 -translate-y-1/2",
                placement,
                mode === "design" && "brightness-75 saturate-75"
              )}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default TableScenery
