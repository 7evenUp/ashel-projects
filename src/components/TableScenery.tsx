const CompassRose = () => (
  <svg className="table-compass" viewBox="0 0 200 200" fill="none">
    <circle cx="100" cy="100" r="70" stroke="currentColor" />
    <circle
      cx="100"
      cy="100"
      r="79"
      stroke="currentColor"
      strokeDasharray="1 8"
    />
    <path
      d="m100 12 16 66 46-40-40 46 66 16-66 16 40 46-46-40-16 66-16-66-46 40 40-46-66-16 66-16-40-46 46 40Z"
      stroke="currentColor"
    />
    <path
      d="m100 12 0 88 16-22Zm88 88h-88l22 16Zm-88 88v-88l-16 22Zm-88-88h88L78 84Z"
      fill="currentColor"
      opacity=".38"
    />
    <circle cx="100" cy="100" r="7" fill="currentColor" />
    <text x="100" y="7" textAnchor="middle" fill="currentColor">
      N
    </text>
  </svg>
)

const RouteMap = () => (
  <svg className="table-map" viewBox="0 0 250 300" fill="none">
    <path
      d="m23 25 67-8 64 9 72-12-5 252-68 17-68-12-67 15Z"
      fill="#d8d2ba"
      stroke="#a7a387"
    />
    <path
      d="m23 25 67-8-5 254-67 15Zm131 1 72-12-5 252-68 17Z"
      fill="#eeead9"
    />
    <path d="m90 17-5 254m69-245-1 257" stroke="#aaa58b" opacity=".5" />
    <path
      d="m38 81 18-24 16 21m-26-8 10-13 8 13m80 116 20-31 26 35m-38-24 12-11 10 15m-62 70 17-22 18 25"
      stroke="#969b7b"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M193 42c-34 26-62 8-65 41s39 30 28 64-80 1-94 40 29 38 38 65"
      stroke="#a6a99a"
      strokeWidth="6"
      opacity=".45"
    />
    <path
      d="M54 242c-20-40 38-24 37-63s-42-42-24-70 65 33 88-6 7-37 36-48"
      stroke="#9e8066"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="3 7"
    />
    <circle cx="54" cy="242" r="6" stroke="#8a9273" strokeWidth="2" />
    <path d="m184 48 14 14m0-14-14 14" stroke="#9e8066" strokeWidth="2" />
    <path
      d="m42 146 4-12 5 12m-8-5h6m146 82 5-16 6 16m-9-6h7"
      stroke="#8f9576"
    />
    <circle cx="127" cy="112" r="18" stroke="#a8a08b" opacity=".4" />
    <path
      d="m127 98 4 10 10 4-10 4-4 10-4-10-10-4 10-4Z"
      fill="#a8a08b"
      opacity=".3"
    />
  </svg>
)

const DiceAndCoins = () => (
  <svg className="table-tokens" viewBox="0 0 240 210" fill="none">
    <ellipse cx="143" cy="164" rx="54" ry="12" fill="#696651" opacity=".1" />
    <g transform="rotate(17 145 100)">
      <path
        d="m145 32 55 34 8 65-63 41-61-40 6-65Z"
        fill="#c9cfbb"
        stroke="#808b73"
        strokeWidth="1.5"
      />
      <path
        d="m145 32-29 57 60 1Zm-55 35 26 22-32 43 61 40 31-82 32 41-63 41-29-83 60 1 24-24"
        stroke="#808b73"
      />
      <path d="m116 89 29 83 31-82Z" fill="#a4b296" opacity=".35" />
      <path d="m145 32 55 34-24 24Z" fill="#edf0df" opacity=".65" />
      <text x="146" y="119" textAnchor="middle" fill="#65745d">
        20
      </text>
    </g>
    <g transform="rotate(-18 49 153)">
      <circle cx="49" cy="157" r="29" fill="#a79b71" />
      <circle cx="49" cy="152" r="29" fill="#d4c394" stroke="#aa9869" />
      <circle cx="49" cy="152" r="22" stroke="#aa9869" />
      <path
        d="m49 136 5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2Z"
        stroke="#aa9869"
      />
    </g>
    <g transform="rotate(12 74 186)">
      <ellipse cx="77" cy="189" rx="25" ry="10" fill="#a79b71" />
      <ellipse
        cx="77"
        cy="184"
        rx="25"
        ry="10"
        fill="#dbcb9e"
        stroke="#b29f70"
      />
      <ellipse cx="77" cy="184" rx="17" ry="6" stroke="#b29f70" />
    </g>
  </svg>
)

const Quill = () => (
  <svg className="table-quill" viewBox="0 0 220 320" fill="none">
    <path
      d="M42 290C75 187 93 83 186 24c13 65-5 145-66 184l-35 9-5 28-20-1Z"
      fill="#d5d7c5"
      stroke="#a0a58c"
    />
    <path d="M42 290C79 186 119 107 186 24" stroke="#949b80" strokeWidth="2" />
    <path
      d="m83 192 40-9m-29-17 48-13m-36-9 50-20m-37-3 49-28m-35 10 43-36m-83 116 1-47m12 21 4-57m9 36 10-60m4 37 14-58"
      stroke="#a0a58c"
      opacity=".65"
    />
    <path
      d="m186 24-13 62-24-7-19 53-24-4-16 57-11-1"
      fill="#ececde"
      opacity=".45"
    />
  </svg>
)

const Constellation = () => (
  <svg className="table-constellation" viewBox="0 0 210 230" fill="none">
    <path
      d="m31 172 35-69 43 22 43-71 26 30m-69 41 33 63"
      stroke="currentColor"
      strokeDasharray="3 6"
    />
    {[
      [31, 172],
      [66, 103],
      [109, 125],
      [152, 54],
      [178, 84],
      [142, 188],
    ].map(([horizontal, vertical]) => (
      <circle
        key={horizontal}
        cx={horizontal}
        cy={vertical}
        r="3"
        fill="currentColor"
      />
    ))}
    <circle cx="109" cy="125" r="12" stroke="currentColor" opacity=".45" />
    <path
      d="m50 30 4 12 12 4-12 4-4 12-4-12-12-4 12-4Z"
      fill="currentColor"
      opacity=".6"
    />
  </svg>
)

const Spark = ({ className }: { className: string }) => (
  <svg className={`table-spark ${className}`} viewBox="0 0 64 80" fill="none">
    <path
      d="M25 4c3 18 7 23 22 27-15 4-19 9-22 27C22 40 18 35 3 31 18 27 22 22 25 4Z"
      fill="currentColor"
    />
    <path d="m49 55 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" stroke="currentColor" />
  </svg>
)

const TableScenery = () => (
  <div className="table-scenery" aria-hidden="true">
    <div className="table-margin table-margin-left">
      <Constellation />
      <RouteMap />
      <Spark className="table-spark-left" />
    </div>
    <div className="table-margin table-margin-right">
      <CompassRose />
      <DiceAndCoins />
      <Quill />
      <Spark className="table-spark-right" />
    </div>
  </div>
)

export default TableScenery
