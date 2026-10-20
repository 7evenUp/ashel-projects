import type { SymbolName } from "../types"

export interface PersonalProject {
  id: string
  name: string
  description: string
  label: string
  symbol: SymbolName
  color: string
  pale: string
  category: string
  tagline: string
  summary: string
  features: [string, string][]
  stack: string[]
  preview: string
  previewLabel: string
  repository: string
  installCommand?: string
}

export const profile = {
  name: "Артём",
  role: "Senior Dev",
  age: 25,
  experience: "программирую с 16 лет",
  github: "https://github.com/7evenUp",
}

export const personalProjects: PersonalProject[] = [
  {
    id: "ashel-gym",
    name: "Ashel Gym",
    label: "Ashel Gym",
    symbol: "dumbbell",
    color: "#78865d",
    pale: "#e5ebd4",
    category: "ЛИЧНЫЙ ПРОЕКТ · REACT NATIVE",
    description: "Дневник тренировок на React Native",
    tagline: "Прогресс начинается с одного подхода.",
    summary: "Моё приложение для записи тренировок и подходов, календаря активности и отслеживания прогресса в упражнениях. Разрабатываю его на React Native и Expo; данные хранятся локально на устройстве.",
    features: [
      ["Тренировки и подходы", "Запись упражнений и подходов в собственном дневнике тренировок."],
      ["Активность и прогресс", "Календарь тренировок и история прогресса в упражнениях."],
      ["Локальные данные", "SQLite и Drizzle ORM для хранения тренировок на устройстве."],
    ],
    stack: ["React Native", "Expo", "TypeScript", "SQLite", "Drizzle ORM", "Zustand", "Reanimated"],
    preview: "https://ashel-gym-web-preview.vercel.app/#/profile",
    previewLabel: "Открыть превью",
    repository: "https://github.com/7evenUp/ashel-gym",
  },
  {
    id: "ashel-front-style",
    name: "Личный Skill",
    label: "Личный Skill",
    symbol: "code",
    color: "#8576af",
    pale: "#e8e1f3",
    category: "АВТОРСКИЙ SKILL · AI-АГЕНТЫ",
    description: "Соглашения React и TypeScript для AI-агентов",
    tagline: "Мой подход к коду — в одном skill.",
    summary: "Собрал свои соглашения по React и TypeScript в skill Ashel Front Style для AI-агентов. Он помогает сохранять понятную структуру компонентов, состояний и обработчиков, учитывая архитектуру и правила конкретного проекта.",
    features: [
      ["Читаемая структура", "Смысловые группы импортов, небольшие компоненты и код рядом со своим сценарием."],
      ["Явное поведение", "Понятные имена, прямые обработчики и отдельные состояния загрузки, ошибки и успеха."],
      ["Уважение к проекту", "Существующие соглашения, форматирование и зависимости важнее предпочтений skill."],
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "AI-агенты", "skills.sh"],
    preview: "https://skills.sh/7evenup/ashel-skills/ashel-front-style",
    previewLabel: "Открыть на skills.sh",
    repository: "https://github.com/7evenUp/ashel-skills",
    installCommand: "npx skills add 7evenUp/ashel-skills --skill ashel-front-style",
  },
]
