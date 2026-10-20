const asset = (name: string) =>
  `${import.meta.env.BASE_URL}assets/personal/${name}`

const GymArt = () => {
  const trainingDays = [2, 4, 8, 11, 15, 18, 22, 25]

  return (
    <div className="personal-illustration gym-illustration" aria-hidden="true">
      <svg className="personal-collage" viewBox="0 0 440 340" fill="none">
        <g transform="translate(26 12) rotate(-4 98 148)">
          <rect x="3" y="5" width="196" height="294" rx="18" fill="#55442d25" />
          <rect
            width="196"
            height="294"
            rx="18"
            fill="#1C1B1F"
            stroke="#938F99"
            strokeWidth="1.5"
          />
          <rect x="75" y="6" width="46" height="4" rx="2" fill="#49454F" />
          <text x="16" y="31" className="personal-collage-title" fill="#E6E1E5">
            Ashel Gym
          </text>
          <text x="16" y="48" className="personal-collage-small" fill="#CAC4D0">
            Моя тренировка
          </text>
          <rect x="12" y="58" width="172" height="108" rx="10" fill="#2B2930" />
          <image
            href={asset("bench-press.png")}
            x="31"
            y="57"
            width="134"
            height="106"
          />
          <text x="17" y="184" className="personal-collage-body" fill="#EADDFF">
            Жим лёжа
          </text>
          <text x="17" y="201" className="personal-collage-tiny" fill="#938F99">
            ПОДХОД
          </text>
          <text x="74" y="201" className="personal-collage-tiny" fill="#938F99">
            ВЕС
          </text>
          <text
            x="123"
            y="201"
            className="personal-collage-tiny"
            fill="#938F99"
          >
            ПОВТОРЫ
          </text>
          {[
            ["1", "40 кг", "12"],
            ["2", "45 кг", "10"],
            ["3", "50 кг", "8"],
          ].map(([set, weight, reps], index) => (
            <g key={set} transform={`translate(12 ${208 + index * 20})`}>
              <rect
                width="172"
                height="17"
                rx="5"
                fill={index === 2 ? "#4F378B" : "#2B2930"}
              />
              <text
                x="10"
                y="12"
                className="personal-collage-small"
                fill="#D0BCFF"
              >
                {set}
              </text>
              <text
                x="63"
                y="12"
                className="personal-collage-small"
                fill="#E6E1E5"
              >
                {weight}
              </text>
              <text
                x="119"
                y="12"
                className="personal-collage-small"
                fill="#E6E1E5"
              >
                {reps}
              </text>
              <path
                d="m151 8 3 3 5-6"
                stroke="#D0BCFF"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </g>
          ))}
          <path
            d="M28 280h26m29 0h26m29 0h26"
            stroke="#938F99"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>

        <g transform="translate(238 34) rotate(5 88 76)">
          <rect x="2" y="4" width="176" height="154" rx="7" fill="#55442d20" />
          <rect
            width="176"
            height="154"
            rx="7"
            fill="#F3EDF7"
            stroke="#b2a4c0"
          />
          <text x="14" y="22" className="personal-collage-label" fill="#6750A4">
            КАЛЕНДАРЬ АКТИВНОСТИ
          </text>
          {["П", "В", "С", "Ч", "П", "С", "В"].map((label, index) => (
            <text
              key={index}
              x={20 + index * 22}
              y="43"
              textAnchor="middle"
              className="personal-collage-small"
              fill="#938F99"
            >
              {label}
            </text>
          ))}
          {Array.from({ length: 28 }, (_, index) => {
            const x = 20 + (index % 7) * 22
            const y = 62 + Math.floor(index / 7) * 22
            const isTrainingDay = trainingDays.includes(index)

            return (
              <g key={index}>
                {isTrainingDay && (
                  <circle cx={x} cy={y - 3} r="9" fill="#6750A4" />
                )}
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  className="personal-collage-small"
                  fill={isTrainingDay ? "#fff" : "#625B71"}
                >
                  {index + 1}
                </text>
              </g>
            )
          })}
          <circle cx="15" cy="142" r="3" fill="#6750A4" />
          <text x="24" y="145" className="personal-collage-tiny" fill="#79747E">
            ДНИ ТРЕНИРОВОК
          </text>
        </g>

        <g transform="translate(238 207) rotate(-3 88 48)">
          <rect x="2" y="4" width="176" height="98" rx="7" fill="#55442d20" />
          <rect
            width="176"
            height="98"
            rx="7"
            fill="#fffaf0"
            stroke="#c6b99c"
          />
          <text x="13" y="20" className="personal-collage-label" fill="#7D5260">
            ПРОГРЕСС В УПРАЖНЕНИИ
          </text>
          <text x="13" y="44" className="personal-collage-title" fill="#4F378B">
            50 кг
          </text>
          <text x="13" y="61" className="personal-collage-small" fill="#93847c">
            Рабочий вес
          </text>
          <path
            d="M14 79h148m-100-40v40m34-40v40m34-40v40"
            stroke="#ddd4c6"
            strokeDasharray="2 4"
          />
          <path
            d="m19 75 28-5 25 2 28-15 28-5 30-19"
            stroke="#9674bd"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="158"
            cy="33"
            r="4"
            fill="#6750A4"
            stroke="#fffaf0"
            strokeWidth="2"
          />
        </g>

        <path d="m91 4 53-3 2 15-52 4Z" fill="#d6c9a58c" />
        <path d="m302 26 47 4-2 15-47-4Z" fill="#d6c9a58c" />
        <text
          x="241"
          y="330"
          className="personal-collage-caption"
          fill="#989075"
        >
          Каждый подход имеет значение.
        </text>
      </svg>
    </div>
  )
}

export default GymArt
