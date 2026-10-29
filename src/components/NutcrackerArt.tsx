const asset = (name: string) =>
  `${import.meta.env.BASE_URL}assets/nutcracker/${name}.png`
const parts = [
  ["head", "ГОЛОВА"],
  ["body", "КОРПУС"],
  ["left_hand", "ЛЕВАЯ РУКА"],
  ["right_hand", "ПРАВАЯ РУКА"],
  ["left_leg", "ЛЕВАЯ НОГА"],
  ["right_leg", "ПРАВАЯ НОГА"],
] as const

export function NutcrackerArt() {
  return (
    <div className="illustration illustration-nft-assembly" aria-hidden="true">
      <svg className="nutcracker-collage" viewBox="0 0 440 260" fill="none">
        <g transform="rotate(-3 116 131)">
          <rect
            x="12"
            y="32"
            width="208"
            height="199"
            rx="4"
            fill="#89775422"
            transform="translate(3 5)"
          />
          <rect
            x="12"
            y="32"
            width="208"
            height="199"
            rx="4"
            fill="#eee4d3"
            stroke="#c5b49c"
          />
          <rect
            x="18"
            y="38"
            width="196"
            height="187"
            rx="2"
            stroke="#c8bca5"
            strokeDasharray="3 4"
          />
          <path d="M78 27L144 22L147 41L81 46Z" fill="#d2c7a68c" />
          <text x="30" y="60" className="nutcracker-art-label" fill="#8a7761">
            ИНВЕНТАРЬ / 6 ДЕТАЛЕЙ
          </text>
          {parts.map(([name, label], i) => {
            const x = 27 + (i % 3) * 62,
              y = 73 + Math.floor(i / 3) * 74
            return (
              <g key={name}>
                <rect
                  x={x - 2}
                  y={y - 2}
                  width="58"
                  height="69"
                  rx="2"
                  fill="#b1a18a22"
                />
                <rect
                  x={x - 3}
                  y={y - 3}
                  width="58"
                  height="69"
                  rx="2"
                  fill="#fff9ed"
                  stroke="#d1c4b0"
                />
                <image href={asset(name)} x={x} y={y} width="52" height="52" />
                <text
                  x={x + 26}
                  y={y + 61}
                  textAnchor="middle"
                  className="nutcracker-art-small"
                  fill="#86745f"
                >
                  {label}
                </text>
              </g>
            )
          })}
        </g>
        <path
          d="M223 133H291M283 125L292 133L283 141"
          stroke="#a77c85"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="257"
          cy="133"
          r="23"
          fill="#f7f1e3"
          stroke="#c2a2a6"
          strokeDasharray="2 3"
        />
        <path
          d="M247 119H267L257 137Z M257 119V137"
          stroke="#7e9bac"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <text
          x="257"
          y="147"
          textAnchor="middle"
          className="nutcracker-art-label"
          fill="#9a6d78"
        >
          МИНТ
        </text>
        <g transform="rotate(4 363 132)">
          <rect
            x="301"
            y="32"
            width="126"
            height="199"
            rx="4"
            fill="#89775422"
            transform="translate(3 5)"
          />
          <rect
            x="301"
            y="32"
            width="126"
            height="199"
            rx="4"
            fill="#eadce7"
            stroke="#b69cac"
          />
          <rect
            x="307"
            y="38"
            width="114"
            height="187"
            rx="2"
            stroke="#bea6b6"
            strokeDasharray="3 4"
          />
          <path d="M327 27L393 23L395 41L330 46Z" fill="#d2c7a68c" />
          <text
            x="364"
            y="60"
            textAnchor="middle"
            className="nutcracker-art-label"
            fill="#8d6b81"
          >
            NUTCRACKERS / NFT
          </text>
          <image
            href={asset("nutcracker-example")}
            x="312"
            y="72"
            width="104"
            height="113"
          />
          <path d="M316 196H412" stroke="#c6afbf" />
          <text
            x="364"
            y="211"
            textAnchor="middle"
            className="nutcracker-art-label"
            fill="#8d6b81"
          >
            ПРИМЕР ГОТОВОГО NFT
          </text>
        </g>
        <path
          d="M289 46L292 54L300 57L292 60L289 68L286 60L278 57L286 54Z"
          fill="#cfb76d"
        />
        <path d="M236 192V204M230 198H242" stroke="#baa16c" strokeWidth="1.5" />
        <text x="27" y="253" className="nutcracker-art-caption" fill="#927d75">
          Инвентарь деталей и готовый NFT.
        </text>
      </svg>
    </div>
  )
}
