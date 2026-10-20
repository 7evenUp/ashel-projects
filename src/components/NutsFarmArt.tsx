const asset = (name: string) =>
  `${import.meta.env.BASE_URL}assets/nutsfarm/${name}.png`

function Walnut({
  x,
  y,
  rotation = 0,
}: {
  x: number
  y: number
  rotation?: number
}) {
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${rotation})`}
      stroke="#89572c"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path
        d="M0-14C-14-14-19-3-13 9C-6 22 9 16 14 5C19-7 12-16 0-14Z"
        fill="#c88c47"
      />
      <path
        d="M0-13C-5-7 5-2 0 4S-3 12-1 16M-8-9C-12-2-4 1-8 7M8-9C4-3 12 0 8 8"
        fill="none"
      />
    </g>
  )
}

/** A scrapbook scene of the original coin farming loop and its adjacent game systems. */
export function NutsFarmArt() {
  return (
    <div className="illustration illustration-farming" aria-hidden="true">
      <svg className="nutsfarm-collage" viewBox="0 0 440 340" fill="none">
        <g transform="translate(0 35) rotate(-3 148 110)">
          <rect
            x="12"
            y="22"
            width="269"
            height="181"
            rx="5"
            fill="#b9aa8133"
            transform="translate(3 5)"
          />
          <rect
            x="12"
            y="22"
            width="269"
            height="181"
            rx="5"
            fill="#f1e5bf"
            stroke="#c9b684"
          />
          <rect
            x="19"
            y="29"
            width="255"
            height="167"
            rx="3"
            stroke="#bda972"
            strokeDasharray="3 4"
          />
          <path d="M95 19L163 13L166 32L98 37Z" fill="#d2c7a68c" />
          <text x="34" y="48" className="nutsfarm-art-label" fill="#8b744c">
            NUTS FARM / ЩЁЛК-ЩЁЛК
          </text>
          <ellipse
            cx="127"
            cy="122"
            rx="89"
            ry="64"
            fill="#e1d5a2"
            opacity=".5"
          />
          <image
            href={asset("nutcracker")}
            x="49"
            y="53"
            width="139"
            height="134"
          />
          <Walnut x={31} y={99} rotation={-18} />
          <path
            d="M36 123Q35 155 87 169M80 162L88 169L78 174"
            stroke="#a89060"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <Walnut x={119} y={173} rotation={14} />
          <path
            d="M141 171Q179 192 222 151M212 153L224 149L221 162"
            stroke="#a89060"
            strokeWidth="1.5"
          />
          <g transform="translate(213 136) rotate(13)">
            <path
              d="M-23 3C-29-22-9-25-3-7L-10-2L-4 6L-11 10L-4 20C-15 19-20 13-23 3Z"
              fill="#b97736"
              stroke="#89572c"
              strokeWidth="1.5"
            />
            <path
              d="M9-8C28-21 34 2 17 18L10 9L14 2L7-2Z"
              fill="#d6a05a"
              stroke="#89572c"
              strokeWidth="1.5"
            />
            <path
              d="M-21-7L-17 2L-18 10M21-6L19 3"
              stroke="#e8bc7b"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
          <image
            href={asset("coin")}
            x="188"
            y="84"
            width="34"
            height="34"
            transform="rotate(-14 205 101)"
          />
          <image
            href={asset("coin")}
            x="230"
            y="59"
            width="25"
            height="25"
            transform="rotate(16 243 72)"
          />
          <image href={asset("coin")} x="246" y="111" width="20" height="20" />
          <path
            d="M218 77L223 66M230 96L240 92M203 73L200 67M252 143L258 147"
            stroke="#b79b44"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <text x="177" y="185" className="nutsfarm-art-label" fill="#8b744c">
            ОРЕХ → МОНЕТА
          </text>
        </g>
        <defs>
          <linearGradient
            id="nutspass-purple"
            x1="294"
            y1="18"
            x2="425"
            y2="160"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#211a3e" />
            <stop offset="1" stopColor="#69509d" />
          </linearGradient>
          <linearGradient
            id="nutspass-premium"
            x1="360"
            y1="75"
            x2="425"
            y2="155"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#a659a5" />
            <stop offset="1" stopColor="#682879" />
          </linearGradient>
          <linearGradient id="nutspass-gold" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#fff36c" />
            <stop offset="1" stopColor="#eac400" />
          </linearGradient>
        </defs>
        <g transform="rotate(4 360 90)">
          <path
            d="M294 18H425V76C413 76 413 90 425 90V160H294V90C306 90 306 76 294 76Z"
            fill="#67558a33"
            transform="translate(2 4)"
          />
          <path
            d="M294 18H425V76C413 76 413 90 425 90V160H294V90C306 90 306 76 294 76Z"
            fill="url(#nutspass-purple)"
            stroke="#8c73b6"
            strokeWidth="1.2"
          />
          <path
            d="M360 63H425V76C413 76 413 90 425 90V160H360Z"
            fill="url(#nutspass-premium)"
          />
          <path
            d="M300 24H419M300 154H419"
            stroke="#c1a2d0"
            strokeWidth=".7"
            strokeDasharray="2 3"
          />
          <text
            x="360"
            y="39"
            textAnchor="middle"
            fontSize="13"
            fontWeight="500"
            letterSpacing=".8"
            fill="#eee5ff"
          >
            Nuts Pass
          </text>
          <rect x="308" y="48" width="104" height="6" rx="3" fill="#19152c" />
          <rect x="308" y="48" width="72" height="6" rx="3" fill="#ac76d8" />
          <path
            d="M305 44L311 47V54L305 58L299 54V47Z"
            fill="#a948c7"
            stroke="#c690ee"
          />
          <text
            x="305"
            y="53"
            textAnchor="middle"
            fontSize="5"
            fontWeight="500"
            fill="#fff0ff"
          >
            XP
          </text>
          <path d="M360 64V151" stroke="#ffe93f" strokeWidth="2" />
          <path
            d="M308 65H350V70C345 70 345 75 350 75V82H308V75C313 75 313 70 308 70Z"
            fill="#c0afd9"
            stroke="#aa96c8"
          />
          <text
            x="329"
            y="77"
            textAnchor="middle"
            fontSize="7"
            fontWeight="500"
            fill="#574b76"
          >
            FREE
          </text>
          <path
            d="M370 65H415V70C410 70 410 75 415 75V82H370V75C375 75 375 70 370 70Z"
            fill="url(#nutspass-gold)"
            stroke="#dfbe20"
          />
          <text
            x="392"
            y="77"
            textAnchor="middle"
            fontSize="6"
            fontWeight="500"
            fill="#8f6e0d"
          >
            PREMIUM
          </text>
          <rect
            x="305"
            y="91"
            width="46"
            height="42"
            rx="6"
            fill="#7850cc"
            stroke="#b192e7"
            strokeWidth="1.4"
          />
          <rect
            x="369"
            y="91"
            width="46"
            height="42"
            rx="6"
            fill="#e2b91a"
            stroke="#ffeb67"
            strokeWidth="1.4"
          />
          <image
            href={import.meta.env.BASE_URL + "assets/nutsfarm/chest-free.svg"}
            x="307"
            y="92"
            width="42"
            height="40"
          />
          <image
            href={
              import.meta.env.BASE_URL + "assets/nutsfarm/chest-premium.svg"
            }
            x="371"
            y="92"
            width="42"
            height="40"
          />
          <path
            d="M360 105L366 109V117L360 121L354 117V109Z"
            fill="#ffe62c"
            stroke="#fff4a0"
          />
          <path
            d="M358 113L360 115L363 111"
            stroke="#94771c"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <image href={asset("coin")} x="321" y="139" width="13" height="13" />
          <image href={asset("coin")} x="385" y="137" width="16" height="16" />
          <path
            d="M418 97v6m-3-3h6M371 137v5m-2.5-2.5h5"
            stroke="#ffed93"
            strokeWidth=".8"
          />
        </g>
        <g transform="rotate(2 358 251)">
          <rect
            x="294"
            y="178"
            width="132"
            height="150"
            rx="5"
            fill="#b0bd9726"
            transform="translate(2 3)"
          />
          <rect
            x="294"
            y="178"
            width="132"
            height="150"
            rx="5"
            fill="#eff2df"
            stroke="#a8b68f"
          />
          <text
            x="360"
            y="194"
            textAnchor="middle"
            className="nutsfarm-art-label"
            fill="#7c8d67"
          >
            КАРТА УРОКОВ
          </text>
          <path
            d="M329 213C329 229 373 224 373 242S329 253 329 271S370 281 370 301"
            stroke="#c6d3ae"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M329 213C329 229 373 224 373 242"
            stroke="#8eb765"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <ellipse cx="329" cy="216" rx="12" ry="10" fill="#779650" />
          <ellipse
            cx="329"
            cy="212"
            rx="12"
            ry="10"
            fill="#a2c47b"
            stroke="#7e9f5c"
          />
          <path
            d="M324 212l4 4 6-7"
            stroke="#fffce9"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <ellipse cx="373" cy="246" rx="13" ry="10" fill="#5c953c" />
          <ellipse
            cx="373"
            cy="241"
            rx="13"
            ry="10"
            fill="#8cbd5b"
            stroke="#76a64b"
          />
          <path
            d="M366 236h5l2 2 2-2h5v10h-5l-2 2-2-2h-5Z M373 238v10"
            stroke="#fffce9"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M393 236l4 4-4 4"
            stroke="#88a765"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <ellipse cx="329" cy="275" rx="12" ry="10" fill="#b7c5a1" />
          <ellipse
            cx="329"
            cy="271"
            rx="12"
            ry="10"
            fill="#d7e1c2"
            stroke="#b4c39c"
          />
          <path
            d="M329 264l2 4 5 1-4 3 1 4-4-2-4 2 1-4-4-3 5-1Z"
            fill="#a9bb8c"
          />
          <ellipse cx="370" cy="305" rx="12" ry="10" fill="#c8ad62" />
          <ellipse
            cx="370"
            cy="301"
            rx="12"
            ry="10"
            fill="#efd58a"
            stroke="#c8ad62"
          />
          <path
            d="M366 296h8v5l-4 3-4-3Zm4 8v3m-4 0h8m-8-10h-3v3l4 2m7-5h3v3l-4 2"
            stroke="#aa8e42"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <text x="307" y="316" fontSize="6" letterSpacing=".7" fill="#879975">
            УРОКИ · XP
          </text>
        </g>
        <text x="29" y="281" className="nutsfarm-art-caption" fill="#8d8063">
          Щёлк! Орех — монета — новый уровень.
        </text>
      </svg>
    </div>
  )
}
