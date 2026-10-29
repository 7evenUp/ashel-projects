const skillsIcon = `${import.meta.env.BASE_URL}assets/projects/ashel-front-style.ico`

const AgentSkillArt = () => {
  return (
    <div
      className="personal-illustration skill-illustration"
      aria-hidden="true"
    >
      <svg className="personal-collage" viewBox="0 0 440 340" fill="none">
        <path
          d="M214 111c44-56 66-42 65-8m-6-7 6 7 7-5M333 201v30m-5-5 5 5 5-5"
          stroke="#a193b8"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          strokeLinecap="round"
        />
        <text x="244" y="66" className="personal-collage-small" fill="#9a8aab">
          читает контекст
        </text>

        <g transform="translate(20 25) rotate(-4 102 123)">
          <rect x="3" y="5" width="204" height="246" rx="5" fill="#55442d20" />
          <rect
            width="204"
            height="246"
            rx="5"
            fill="#fffaf0"
            stroke="#b9acc9"
          />
          <path d="M0 5a5 5 0 0 1 5-5h194a5 5 0 0 1 5 5v27H0Z" fill="#2b2633" />
          <image href={skillsIcon} x="12" y="8" width="16" height="16" />
          <text x="37" y="21" className="personal-collage-label" fill="#eee6f5">
            SKILL.md
          </text>
          <circle cx="187" cy="16" r="3" fill="#b6a0d0" />
          <text x="15" y="56" className="personal-collage-mono" fill="#94809e">
            ---
          </text>
          <text x="15" y="73" className="personal-collage-mono" fill="#8c709d">
            name:
          </text>
          <text x="15" y="89" className="personal-collage-mono" fill="#57505f">
            ashel-front-style
          </text>
          <text x="15" y="106" className="personal-collage-mono" fill="#94809e">
            ---
          </text>
          <text x="15" y="131" className="personal-collage-body" fill="#51435e">
            Мои правила для агента
          </text>
          {[
            "Небольшие компоненты",
            "Осмысленные состояния",
            "Явные обработчики",
          ].map((label, index) => (
            <g key={label} transform={`translate(15 ${148 + index * 25})`}>
              <rect
                width="174"
                height="20"
                rx="3"
                fill={index === 1 ? "#ede6f4" : "#f4efe6"}
              />
              <path
                d="m7 10 3 3 5-6"
                stroke="#8576af"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
              <text
                x="22"
                y="13"
                className="personal-collage-small"
                fill="#71637c"
              >
                {label}
              </text>
            </g>
          ))}
          <text x="15" y="232" className="personal-collage-tiny" fill="#9c8ba4">
            REACT · TYPESCRIPT · TAILWIND
          </text>
        </g>

        <g transform="translate(250 111) rotate(4 84 54)">
          <rect x="2" y="4" width="168" height="107" rx="7" fill="#55442d20" />
          <rect
            width="168"
            height="107"
            rx="7"
            fill="#e9e3f1"
            stroke="#a99abb"
          />
          <rect x="13" y="14" width="31" height="25" rx="7" fill="#8576af" />
          <path
            d="M28 14V9m-15 18H9m35 0h4"
            stroke="#8576af"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="28" cy="7" r="2" fill="#8576af" />
          <circle cx="23" cy="25" r="2" fill="#fffaf0" />
          <circle cx="34" cy="25" r="2" fill="#fffaf0" />
          <path
            d="M23 33h11"
            stroke="#fffaf0"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <text x="54" y="24" className="personal-collage-label" fill="#655272">
            AI-АГЕНТ
          </text>
          <text x="54" y="38" className="personal-collage-small" fill="#92819f">
            skill подключён
          </text>
          <rect x="12" y="52" width="144" height="25" rx="5" fill="#fffaf0" />
          <text x="21" y="68" className="personal-collage-small" fill="#6c6176">
            «Собери React-компонент»
          </text>
          <path
            d="m16 92 3 3 5-6"
            stroke="#7b8b65"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <text x="30" y="95" className="personal-collage-small" fill="#7b8b65">
            Следую вашим соглашениям
          </text>
        </g>

        <g transform="translate(224 242) rotate(-2 98 36)">
          <rect x="2" y="4" width="196" height="75" rx="5" fill="#55442d20" />
          <rect
            width="196"
            height="75"
            rx="5"
            fill="#2b2633"
            stroke="#6c5b7a"
          />
          <circle cx="12" cy="12" r="2" fill="#cda7a4" />
          <circle cx="20" cy="12" r="2" fill="#d2bd8e" />
          <circle cx="28" cy="12" r="2" fill="#9caf91" />
          <text x="43" y="15" className="personal-collage-tiny" fill="#ac9bb9">
            Profile.tsx
          </text>
          <text x="13" y="36" className="personal-collage-mono" fill="#d5c0e8">
            const handleSubmit = () =&gt; ...
          </text>
          <text x="13" y="55" className="personal-collage-mono" fill="#b5c99f">
            return &lt;Profile /&gt;
          </text>
          <text x="13" y="68" className="personal-collage-tiny" fill="#8e7f9b">
            КОМПОНЕНТ · СОСТОЯНИЯ · ОБРАБОТЧИК
          </text>
        </g>

        <path d="m77 16 53-3 2 15-52 4Z" fill="#d6c9a58c" />
        <text
          x="20"
          y="310"
          className="personal-collage-caption"
          fill="#989075"
        >
          Правила React и TypeScript
        </text>
        <text
          x="29"
          y="328"
          className="personal-collage-caption"
          fill="#989075"
        >
          для AI-агентов.
        </text>
      </svg>
    </div>
  )
}

export default AgentSkillArt
