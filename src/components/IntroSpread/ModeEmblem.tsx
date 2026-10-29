import { cn } from "../../lib/cn"

const ModeEmblem = ({ mode }: { mode: "personal" | "work" }) => {
  return (
    <div
      className={cn(
        "mode-emblem mt-0 -mr-2 mb-5.5 -ml-2 text-[#6f7e53]",
        "[&_svg]:block [&_svg]:h-37 [&_svg]:w-full [&_svg]:[stroke-width:1.1]",
        "max-[801px]:[&_svg]:h-32.5",
        `mode-emblem-${mode}`
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 420 190"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          className="emblem-rule opacity-[0.4]"
          d="M12 98h70m256 0h70M27 92l-6 6 6 6m366-12 6 6-6 6"
        />
        <circle
          className="emblem-orbit opacity-[0.4]"
          cx="210"
          cy="95"
          r="81"
          strokeDasharray="2 7"
        />

        {mode === "personal" ? (
          <>
            <circle cx="210" cy="95" r="66" />
            <path
              className="emblem-fill [fill:#82914d16]"
              d="M157 133c15-28 26-28 38-15 14-29 31-29 53 15"
            />
            <path
              d="M158 137h104M210 130V74m0 33c-26 0-37-15-35-29 22-1 35 11 35 29Zm0-14c1-23 14-36 34-35 0 21-13 36-34 35Z"
              strokeWidth="2"
            />
            <path d="m184 85 26 22m25-39-25 25m-47 28 7-5m75 12 7-6M178 51v10m-5-5h10m70-17v13m-6-6h12" />
            <circle cx="169" cy="103" r="2" />
            <path d="M131 54c-11 12-18 26-19 42m1 12 2 9m190-41c4 12 5 24 3 35" />
            <path
              className="emblem-diamond [fill:currentColor] [stroke:none]"
              d="m210 4 4 7-4 7-4-7Zm0 168 4 7-4 7-4-7Z"
            />
          </>
        ) : (
          <>
            <path
              className="emblem-fill [fill:#82914d16]"
              d="m210 27 52 20v49c0 34-31 59-52 68-21-9-52-34-52-68V47Z"
            />
            <path d="m210 37 42 16v43c0 26-23 48-42 57-19-9-42-31-42-57V53Z" />
            <path
              d="m174 137 74-91 9-2-1 10-73 91m-18-18 26 22m55-12-74-91-9-2 1 10 73 91m18-18-26 22"
              strokeWidth="2"
            />
            <path
              className="emblem-solid [fill:#b77c4940]"
              d="m210 60 7 15 16 2-12 12 3 17-14-8-14 8 3-17-12-12 16-2Z"
            />
            <path d="M147 139c-18-20-24-48-15-74m-4 28-9-9m13 25-10-6m16 23-11-4m146 17c18-20 24-48 15-74m4 28 9-9m-13 25 10-6m-16 23 11-4M210 9v10m-5-5h10" />
            <path
              className="emblem-diamond [fill:currentColor] [stroke:none]"
              d="m103 95 4 6-4 6-4-6Zm214 0 4 6-4 6-4-6Z"
            />
          </>
        )}
      </svg>
    </div>
  )
}

export default ModeEmblem
