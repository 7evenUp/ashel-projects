import type { ReactNode } from "react"

const asset = (name: string) =>
  `${import.meta.env.BASE_URL}assets/interfaces/${name}`

function Paper({
  x,
  y,
  w,
  h,
  angle = 0,
  fill = "#fff9ee",
  stroke = "#c9bda8",
  children,
}: {
  x: number
  y: number
  w: number
  h: number
  angle?: number
  fill?: string
  stroke?: string
  children: ReactNode
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle} ${w / 2} ${h / 2})`}>
      <rect x="3" y="4" width={w} height={h} rx="5" fill="#76654a20" />
      <rect width={w} height={h} rx="5" fill={fill} stroke={stroke} />
      {children}
    </g>
  )
}
function Tape({ x, y }: { x: number; y: number }) {
  return <path d={`M${x} ${y}l62-5 3 17-62 5Z`} fill="#d2c7a68c" />
}
function Lines({
  x,
  y,
  w = 70,
  color = "#c9c4b9",
}: {
  x: number
  y: number
  w?: number
  color?: string
}) {
  return (
    <path
      d={`M${x} ${y}h${w}m-${w} 7h${w * 0.8}m-${w * 0.8} 7h${w * 0.55}`}
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
    />
  )
}
function Caption({ children }: { children: string }) {
  return (
    <text x="23" y="281" className="interface-art-caption" fill="#8b806f">
      {children}
    </text>
  )
}
function Frame({ children, name }: { children: ReactNode; name: string }) {
  return (
    <div
      className={`illustration illustration-interface illustration-${name}`}
      aria-hidden="true"
    >
      <svg className="interface-collage" viewBox="0 0 440 295" fill="none">
        {children}
      </svg>
    </div>
  )
}
function Check({
  x,
  y,
  color = "#7ca87d",
}: {
  x: number
  y: number
  color?: string
}) {
  return (
    <g>
      <circle cx={x} cy={y} r="6" fill={color} />
      <path
        d={`M${x - 3} ${y}l2 2 4-4`}
        stroke="#fffdf2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  )
}

export function IdArt() {
  return (
    <Frame name="id-ui">
      <Paper x={12} y={38} w={263} h={201} angle={-3} fill="#f4f2ef">
        <rect width="263" height="24" rx="5" fill="#252526" />
        <rect x="12" y="6" width="16" height="13" rx="3" fill="#f04453" />
        <text x="20" y="16" textAnchor="middle" fontSize="9" fill="white">
          ID
        </text>
        <text x="35" y="16" className="interface-art-label" fill="#f6f2ea">
          CRYPTON / ЛИЧНЫЙ КАБИНЕТ
        </text>
        <rect x="10" y="35" width="48" height="155" rx="3" fill="#e8e4df" />
        {[49, 70, 91, 112].map((y, i) => (
          <g key={y}>
            <rect
              x="15"
              y={y - 7}
              width="38"
              height="15"
              rx="3"
              fill={i === 0 ? "#f8f6f2" : "transparent"}
            />
            <path
              d={`M21 ${y}h22`}
              stroke={i === 0 ? "#d6616b" : "#b8afa7"}
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        ))}
        <circle cx="90" cy="55" r="15" fill="#efd3cf" />
        <text x="90" y="59" textAnchor="middle" fontSize="10" fill="#a05b60">
          ID
        </text>
        <text x="113" y="50" className="interface-art-label" fill="#494547">
          МОЙ ПРОФИЛЬ
        </text>
        <Lines x={113} y={61} w={92} />
        <rect
          x="72"
          y="82"
          width="177"
          height="48"
          rx="4"
          fill="#fffdfa"
          stroke="#dfd8cf"
        />
        <text x="81" y="95" className="interface-art-label" fill="#77706a">
          ПРИВЯЗАННЫЕ АККАУНТЫ
        </text>
        {["EMAIL", "TELEGRAM", "TON"].map((label, i) => (
          <g key={label}>
            <rect
              x={80 + i * 55}
              y="104"
              width="50"
              height="17"
              rx="3"
              fill="#ecece5"
            />
            <text
              x={105 + i * 55}
              y="115"
              textAnchor="middle"
              fontSize="5.5"
              fill="#5b665c"
            >
              {label} ✓
            </text>
          </g>
        ))}
        <text x="74" y="145" className="interface-art-label" fill="#77706a">
          МОИ ПРОДУКТЫ
        </text>
        {["prime", "academy", "calendar"].map((name, i) => (
          <g key={name}>
            <rect
              x={73 + i * 59}
              y="152"
              width="53"
              height="36"
              rx="4"
              fill={["#efdaed", "#f1e6bf", "#f2dcd9"][i]}
            />
            <image
              href={asset("id-" + name + ".svg")}
              x={82 + i * 59}
              y="158"
              width="16"
              height="16"
            />
            <path
              d={`M${102 + i * 59} 162h15m-15 6h10`}
              stroke="#b6a494"
              strokeWidth="2"
            />
          </g>
        ))}
      </Paper>
      <Tape x={104} y={30} />
      <Paper
        x={294}
        y={26}
        w={125}
        h={96}
        angle={6}
        fill="#f5e8d0"
        stroke="#cab383"
      >
        <text x="13" y="20" className="interface-art-label" fill="#897044">
          CRYPTON POINTS
        </text>
        <circle cx="34" cy="53" r="19" fill="#e9c46e" stroke="#c09a46" />
        <circle cx="34" cy="53" r="13" stroke="#fff0b7" />
        <text x="34" y="58" textAnchor="middle" fontSize="13" fill="#a37b26">
          CP
        </text>
        <Lines x={63} y={43} w={42} color="#d1b777" />
        <text x="15" y="83" fontSize="7" fill="#9b8254">
          МАГАЗИН · НАГРАДЫ
        </text>
      </Paper>
      <Paper
        x={296}
        y={144}
        w={125}
        h={91}
        angle={-4}
        fill="#ecddea"
        stroke="#c7a8c1"
      >
        <text x="12" y="20" className="interface-art-label" fill="#916b87">
          PRIME / ПОДПИСКА
        </text>
        <image
          href={asset("id-prime.svg")}
          x="14"
          y="32"
          width="24"
          height="26"
        />
        <Lines x={49} y={37} w={59} color="#c7aac1" />
        <rect x="13" y="68" width="98" height="12" rx="3" fill="#ac7e9d" />
        <text x="62" y="77" textAnchor="middle" fontSize="6" fill="#fff9ee">
          УПРАВЛЕНИЕ ДОСТУПОМ
        </text>
      </Paper>
      <Caption>Профиль и управление подписками.</Caption>
    </Frame>
  )
}

export function XProgramArt() {
  return (
    <Frame name="partner-ui">
      <Paper
        x={15}
        y={43}
        w={263}
        h={195}
        angle={-4}
        fill="#b294dc"
        stroke="#9871c2"
      >
        <text x="17" y="25" fontSize="22" fontWeight="500" fill="#e5fb8d">
          X-PROGRAM
        </text>
        <path d="M17 34H246" stroke="#80649f" />
        <text x="17" y="62" fontSize="13" fontWeight="500" fill="#30243f">
          ПАРТНЁРСКАЯ
        </text>
        <text x="17" y="80" fontSize="13" fontWeight="500" fill="#30243f">
          ПРОГРАММА CRYPTON
        </text>
        <Lines x={18} y={102} w={105} color="#d3bfe9" />
        <rect
          x="16"
          y="150"
          width="129"
          height="25"
          rx="3"
          fill="#e1fe6a"
          stroke="#a9c74a"
        />
        <text
          x="81"
          y="166"
          textAnchor="middle"
          fontSize="8"
          fontWeight="500"
          fill="#3b4130"
        >
          СТАТЬ ПАРТНЁРОМ ↗
        </text>
        <image
          href={asset("x-character.svg")}
          x="154"
          y="82"
          width="94"
          height="112"
        />
      </Paper>
      <Tape x={96} y={35} />
      <Paper
        x={300}
        y={24}
        w={119}
        h={68}
        angle={7}
        fill="#e7f5bb"
        stroke="#b7c58a"
      >
        <text x="12" y="18" className="interface-art-label" fill="#647342">
          ПАРТНЁРСТВО
        </text>
        <circle cx="28" cy="44" r="12" fill="#c0a0df" />
        <circle cx="89" cy="44" r="12" fill="#b7d377" />
        <path d="M43 44h30m-6-5 7 5-7 5" stroke="#84975a" strokeWidth="1.5" />
        <text x="28" y="47" textAnchor="middle" fontSize="6" fill="#574074">
          АВТОР
        </text>
        <text x="89" y="47" textAnchor="middle" fontSize="6" fill="#536937">
          WEB3
        </text>
      </Paper>
      <Paper
        x={297}
        y={120}
        w={121}
        h={113}
        angle={-5}
        fill="#f8f2e3"
        stroke="#c3b4a0"
      >
        <text x="11" y="20" className="interface-art-label" fill="#817360">
          ПРОДУКТЫ CRYPTON
        </text>
        <path d="M15 77H106M15 77V33" stroke="#d4c7b1" />
        <path
          d="M23 66L44 57L60 62L80 44L101 35"
          stroke="#9e7ec4"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <image
          href={asset("x-coin.svg")}
          x="66"
          y="74"
          width="29"
          height="29"
        />
        <text x="16" y="99" fontSize="7" fill="#8b7c69">
          ЗАЯВКА НА УЧАСТИЕ
        </text>
      </Paper>
      <Caption>Условия программы и заявка на участие.</Caption>
    </Frame>
  )
}

export function PrimeArt() {
  return (
    <Frame name="prime-ui">
      <Paper
        x={13}
        y={35}
        w={257}
        h={202}
        angle={-3}
        fill="#25232b"
        stroke="#5f546b"
      >
        <text x="17" y="29" fontSize="24" fontWeight="500" fill="#f3d3eb">
          CRYPTON PRIME
        </text>
        <text x="18" y="46" className="interface-art-label" fill="#b78da9">
          СООБЩЕСТВО · АНАЛИТИКА · ОБУЧЕНИЕ
        </text>
        <rect
          x="15"
          y="62"
          width="142"
          height="81"
          rx="4"
          fill="#39333e"
          stroke="#594b61"
        />
        <text x="25" y="79" className="interface-art-label" fill="#d8c5d6">
          АНАЛИТИКА РЫНКА
        </text>
        <path d="M25 130H145M25 113H145M25 96H145" stroke="#4c424f" />
        <path
          d="M26 127L42 117L55 121L73 106L89 110L107 91L122 98L145 86"
          stroke="#dc98cc"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="169" y="62" width="72" height="81" rx="4" fill="#45303f" />
        <text x="205" y="79" textAnchor="middle" fontSize="7" fill="#e8c6dc">
          ПРОПУСК
        </text>
        <path
          d="M185 99L193 105L205 88L216 105L225 99L221 123H189Z"
          fill="#ddb28d"
          stroke="#f4d7b7"
        />
        <rect x="15" y="156" width="226" height="29" rx="4" fill="#b369a7" />
        <text x="128" y="175" textAnchor="middle" fontSize="9" fill="#fff7ed">
          ВЫБРАТЬ ПОДПИСКУ ↗
        </text>
      </Paper>
      <Tape x={98} y={28} />
      <Paper
        x={291}
        y={23}
        w={127}
        h={112}
        angle={6}
        fill="#efe5f0"
        stroke="#bba6bc"
      >
        <text x="13" y="20" className="interface-art-label" fill="#896e8a">
          КАЛЕНДАРЬ WEB3
        </text>
        <path d="M13 29H114" stroke="#c7b5cb" />
        {Array.from({ length: 15 }, (_, i) => (
          <rect
            key={i}
            x={14 + (i % 5) * 20}
            y={38 + Math.floor(i / 5) * 21}
            width="15"
            height="15"
            rx="3"
            fill={[2, 6, 13].includes(i) ? "#b87fa9" : "#dfd1e2"}
          />
        ))}
      </Paper>
      <Paper
        x={297}
        y={157}
        w={120}
        h={81}
        angle={-5}
        fill="#f1e3bd"
        stroke="#c5ae77"
      >
        <text x="10" y="17" className="interface-art-label" fill="#88713b">
          BLACK FRIDAY
        </text>
        <image
          href={asset("prime-gift.png")}
          x="9"
          y="21"
          width="53"
          height="54"
        />
        <text x="69" y="40" fontSize="9" fontWeight="500" fill="#9c718e">
          КЛЮЧИ
        </text>
        <path
          d="M72 48h25m-25 6h19"
          stroke="#c1a879"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <text x="69" y="69" fontSize="6" fill="#9c8964">
          И ПОДАРКИ
        </text>
      </Paper>
      <Caption>Подписка, аналитика и календарь активностей.</Caption>
    </Frame>
  )
}

function LessonMap({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M28 9C28 26 63 22 63 42S28 55 28 74S63 84 63 102"
        stroke="#cfb9e5"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {[
        [28, 9],
        [63, 42],
        [28, 74],
        [63, 102],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <ellipse
            cx={cx}
            cy={cy + 3}
            rx="12"
            ry="10"
            fill={i < 2 ? "#8e60ba" : "#b9a5ce"}
          />
          <ellipse
            cx={cx}
            cy={cy}
            rx="12"
            ry="10"
            fill={i < 2 ? "#b58ae0" : "#e4d9ef"}
            stroke="#b095ca"
          />
          {i === 0 ? (
            <path
              d={`M${cx - 4} ${cy}l3 3 6-6`}
              stroke="#fff9ee"
              strokeWidth="2"
            />
          ) : (
            <text
              x={cx}
              y={cy + 3}
              textAnchor="middle"
              fontSize="10"
              fill={i === 1 ? "#fff9ee" : "#ab92c5"}
            >
              {i === 3 ? "★" : "▰"}
            </text>
          )}
        </g>
      ))}
    </g>
  )
}
export function AcademyArt({ mini }: { mini: boolean }) {
  return (
    <Frame name={mini ? "academy-mini-ui" : "academy-ui"}>
      {mini ? (
        <>
          <Paper
            x={38}
            y={18}
            w={141}
            h={234}
            angle={-5}
            fill="#33233f"
            stroke="#705780"
          >
            <rect x="6" y="7" width="129" height="220" rx="14" fill="#f4ecfa" />
            <rect x="46" y="11" width="49" height="9" rx="5" fill="#33233f" />
            <text
              x="70"
              y="38"
              textAnchor="middle"
              fontSize="10"
              fontWeight="500"
              fill="#8e5abd"
            >
              Open Academy
            </text>
            <rect x="19" y="48" width="103" height="18" rx="4" fill="#d9c0ee" />
            <text x="70" y="60" textAnchor="middle" fontSize="7" fill="#855da3">
              УРОКИ · ЕЖЕДНЕВНЫЙ ПРОГРЕСС
            </text>
            <LessonMap x={25} y={86} />
            <path d="M21 211H119" stroke="#d8c4e6" />
            {[35, 69, 103].map((x) => (
              <circle key={x} cx={x} cy="219" r="3" fill="#a47bca" />
            ))}
          </Paper>
          <Tape x={82} y={12} />
          <Paper
            x={212}
            y={28}
            w={202}
            h={107}
            angle={4}
            fill="#e7dcf1"
            stroke="#b89ace"
          >
            <text x="13" y="22" className="interface-art-label" fill="#9565b5">
              RUMI / AI-АССИСТЕНТ
            </text>
            <image
              href={asset("rumi.svg")}
              x="12"
              y="31"
              width="71"
              height="67"
            />
            <rect x="92" y="35" width="95" height="23" rx="7" fill="#fff9f0" />
            <text x="101" y="50" fontSize="7" fill="#8c6b9c">
              Изучаем Web3?
            </text>
            <rect x="105" y="67" width="81" height="23" rx="7" fill="#b995db" />
            <text x="115" y="82" fontSize="7" fill="#fff8ef">
              Начать викторину
            </text>
          </Paper>
          <Paper
            x={224}
            y={160}
            w={182}
            h={78}
            angle={-4}
            fill="#e7e9fc"
            stroke="#a4afd5"
          >
            <text x="13" y="20" className="interface-art-label" fill="#707fad">
              TELEGRAM + BASE
            </text>
            <circle cx="29" cy="49" r="14" fill="#90b8d8" />
            <path d="M21 48l17-6-5 17-5-7-7-4Z" fill="#fff9ef" />
            <path
              d="M50 49H74m-5-4 5 4-5 4"
              stroke="#adacd0"
              strokeWidth="1.5"
            />
            <circle cx="95" cy="49" r="14" fill="#708ae3" />
            <path d="M85 49h20" stroke="#fff9ef" strokeWidth="2" />
            <text x="118" y="46" fontSize="8" fill="#7a75aa">
              КУРСЫ
            </text>
            <text x="118" y="59" fontSize="7" fill="#9690b4">
              ETH В BASE
            </text>
          </Paper>
        </>
      ) : (
        <>
          <Paper
            x={12}
            y={35}
            w={266}
            h={207}
            angle={-3}
            fill="#f1eaf7"
            stroke="#c4acd4"
          >
            <rect width="266" height="27" rx="5" fill="#a77bcf" />
            <text x="14" y="18" fontSize="11" fontWeight="500" fill="#fff9f0">
              OPEN ACADEMY
            </text>
            <text x="17" y="48" className="interface-art-label" fill="#86629f">
              МОИ КУРСЫ
            </text>
            <rect
              x="14"
              y="58"
              width="144"
              height="131"
              rx="4"
              fill="#fffaf1"
              stroke="#d8c5e5"
            />
            <rect x="20" y="64" width="132" height="60" rx="3" fill="#d4b8ec" />
            <image
              href={asset("academy-mascot.svg")}
              x="59"
              y="64"
              width="60"
              height="57"
            />
            <text x="24" y="140" fontSize="9" fontWeight="500" fill="#8d60b0">
              ЗНАКОМСТВО С WEB3
            </text>
            <path
              d="M25 154H144"
              stroke="#e5d8ef"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M25 154H95"
              stroke="#ad80cf"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <rect
              x="24"
              y="166"
              width="120"
              height="14"
              rx="3"
              fill="#a97bcf"
            />
            <text
              x="84"
              y="176"
              textAnchor="middle"
              fontSize="6"
              fill="#fff9f0"
            >
              ПРОДОЛЖИТЬ ОБУЧЕНИЕ
            </text>
            <LessonMap x={174} y={73} />
          </Paper>
          <Tape x={100} y={28} />
          <Paper
            x={292}
            y={21}
            w={132}
            h={130}
            angle={5}
            fill="#fffaf1"
            stroke="#b49bc4"
          >
            <rect width="132" height="23" rx="5" fill="#c4a4df" />
            <text x="10" y="15" className="interface-art-label" fill="#674780">
              РЕДАКТОР КУРСА
            </text>
            <rect x="7" y="30" width="31" height="82" rx="3" fill="#eee4f5" />
            {[39, 54, 69, 84].map((y, i) => (
              <g key={y}>
                <rect
                  x="10"
                  y={y - 5}
                  width="25"
                  height="11"
                  rx="2"
                  fill={i === 1 ? "#c3a1de" : "#e1d0ec"}
                />
                <path
                  d={`M14 ${y}h16`}
                  stroke={i === 1 ? "#fff8ef" : "#c4a8d4"}
                  strokeWidth="1.5"
                />
              </g>
            ))}
            <text
              x="23"
              y="106"
              textAnchor="middle"
              fontSize="5"
              fill="#9674ac"
            >
              + УРОК
            </text>
            <rect
              x="44"
              y="30"
              width="80"
              height="15"
              rx="2"
              fill="#efe5f5"
              stroke="#ddc9e8"
            />
            <text x="50" y="40" fontSize="8" fontWeight="500" fill="#8c65a5">
              B
            </text>
            <text x="64" y="40" fontSize="8" fontStyle="italic" fill="#8c65a5">
              I
            </text>
            <path
              d="M78 34v7m-3 0h6m-2-7h-2m12 1h7m-7 3h7m-7 3h5"
              stroke="#9c7db0"
              strokeWidth="1"
            />
            <rect
              x="44"
              y="51"
              width="80"
              height="23"
              rx="2"
              stroke="#dbc8e7"
              strokeDasharray="2 2"
            />
            <Lines x={50} y={58} w={63} color="#ccb7d9" />
            <rect x="44" y="81" width="80" height="31" rx="3" fill="#d8bfe9" />
            <circle cx="84" cy="96" r="8" fill="#f8effb" />
            <path d="M82 92l6 4-6 4Z" fill="#a47bc2" />
            <text x="10" y="122" fontSize="5.5" fill="#a48aaf">
              ✓ СОХРАНЕНО
            </text>
            <rect x="85" y="117" width="39" height="8" rx="2" fill="#ab82cb" />
            <text
              x="104"
              y="123"
              textAnchor="middle"
              fontSize="4.5"
              fill="#fff9f0"
            >
              ПУБЛИКАЦИЯ
            </text>
          </Paper>
          <Paper
            x={295}
            y={157}
            w={125}
            h={81}
            angle={-5}
            fill="#f4e8c7"
            stroke="#cdb984"
          >
            <text x="12" y="20" className="interface-art-label" fill="#937c47">
              НАГРАДА ЗА УРОК
            </text>
            <path
              d="M34 31h22v17l-11 8-11-8Zm11 25v10m-11 0h22m-22-32h-8v11l10 5m20-16h8v11l-10 5"
              stroke="#c0a258"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <text x="77" y="48" fontSize="16" fontWeight="500" fill="#b89c4c">
              XP
            </text>
            <Check x={89} y={65} color="#b49acb" />
          </Paper>
        </>
      )}
      <Caption>
        {mini
          ? "Уроки, AI-ассистент и оплата в ETH."
          : "Кабинет ученика и редактор курсов."}
      </Caption>
    </Frame>
  )
}
