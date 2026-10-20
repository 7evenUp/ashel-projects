const asset = (name: string) =>
  `${import.meta.env.BASE_URL}assets/xms/${name}.png`

function PrizePhoto({
  name,
  label,
  x,
  angle,
}: {
  name: string
  label: string
  x: number
  angle: number
}) {
  return (
    <g transform={`rotate(${angle} ${x + 27} 213)`}>
      <rect x={x + 2} y="178" width="54" height="71" rx="2" fill="#89775422" />
      <rect
        x={x}
        y="175"
        width="54"
        height="71"
        rx="2"
        fill="#fff9e9"
        stroke="#c7bca4"
      />
      <rect x={x + 4} y="179" width="46" height="49" fill="#e9e4d4" />
      <image href={asset(name)} x={x + 4} y="179" width="46" height="49" />
      <text
        x={x + 27}
        y="238"
        textAnchor="middle"
        className="xms-art-small"
        fill="#817461"
      >
        {label}
      </text>
    </g>
  )
}

export function XmsArt() {
  return (
    <div className="illustration illustration-winter-quest" aria-hidden="true">
      <svg className="xms-collage" viewBox="0 0 440 295" fill="none">
        <path
          d="M8 12Q112 34 230 13T428 13"
          stroke="#9c9a77"
          strokeWidth="1.3"
        />
        {[18, 57, 99, 140, 181, 222, 263, 304, 345, 386, 423].map((x, i) => (
          <g key={x}>
            <path d={`M${x} ${i < 6 ? 15 : 9}v7`} stroke="#9c9a77" />
            <ellipse
              cx={x}
              cy={i < 6 ? 26 : 20}
              rx="3.5"
              ry="5"
              fill={["#ce867c", "#d8bd6c", "#83a3aa"][i % 3]}
            />
          </g>
        ))}
        <g transform="rotate(-5 120 130)">
          <rect
            x="11"
            y="47"
            width="222"
            height="182"
            rx="3"
            fill="#89775422"
            transform="translate(3 5)"
          />
          <rect
            x="11"
            y="47"
            width="222"
            height="182"
            rx="3"
            fill="#dce9e6"
            stroke="#a2b9b3"
          />
          <rect
            x="17"
            y="53"
            width="210"
            height="170"
            rx="2"
            stroke="#a2b9b3"
            strokeDasharray="3 4"
          />
          <path d="M85 41L149 37L151 55L87 59Z" fill="#d2c7a68c" />
          <text x="28" y="72" className="xms-art-label" fill="#5b8079">
            WEB3 XMS / WINTER QUEST
          </text>
          <image
            href={asset("mustang")}
            x="23"
            y="77"
            width="200"
            height="139"
          />
          <text
            x="128"
            y="220"
            textAnchor="middle"
            className="xms-art-small"
            fill="#5b8079"
          >
            FORD MUSTANG · МЕЧТА ПОД ЁЛКОЙ
          </text>
        </g>
        <g transform="rotate(3 327 100)">
          <ellipse cx="326" cy="151" rx="77" ry="9" fill="#b4b8a422" />
          <image href={asset("girl")} x="251" y="33" width="62" height="125" />
          <image href={asset("robot")} x="312" y="31" width="93" height="140" />
        </g>
        <path
          d="M245 62L241 70L233 73L241 76L245 84L248 76L256 73L248 70Z"
          fill="#cdb66f"
        />
        <path d="M412 118V132M405 125H419" stroke="#bdad7c" strokeWidth="1.5" />
        <PrizePhoto name="sweater" label="WEB3 СВИТЕР" x={248} angle={-7} />
        <PrizePhoto name="airpods" label="AIRPODS" x={307} angle={5} />
        <PrizePhoto name="macbook" label="MACBOOK" x={367} angle={-3} />
        <text
          x="330"
          y="262"
          textAnchor="middle"
          className="xms-art-label"
          fill="#8b806b"
        >
          ПОДАРКИ ЗА УЧАСТИЕ
        </text>
        <g transform="rotate(4 124 252)">
          <path
            d="M25 255Q115 238 221 251"
            stroke="#ada38a"
            strokeDasharray="3 4"
          />
          <image
            href={asset("case-red")}
            x="28"
            y="228"
            width="54"
            height="48"
          />
          <image
            href={asset("case-purple")}
            x="91"
            y="224"
            width="59"
            height="52"
          />
          <image
            href={asset("case-gold")}
            x="161"
            y="220"
            width="62"
            height="56"
          />
        </g>
        <text
          x="120"
          y="289"
          textAnchor="middle"
          className="xms-art-label"
          fill="#8b806b"
        >
          XP → КЕЙСЫ → ПОДАРКИ
        </text>
      </svg>
    </div>
  )
}
