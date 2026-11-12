import PaperPage from "../PaperPage"
import { Icon } from "../Icon"
import { ProjectFavicon } from "../ProjectFavicon"
import WorkPeriod from "./WorkPeriod"

import { projects } from "../../data/projects"
import { personalProjects, profile } from "../../data/profile"

import { cn } from "../../lib/cn"

import type { ProjectBookmark, SymbolName } from "../../types"

const projectButtonClass = cn(
  "campaign-project rounded-0 flex min-h-12 touch-manipulation items-center gap-2.5 border-0 border-none border-[currentcolor] bg-[#e8d7b9] p-3 text-left text-[15px] text-[var(--mode-ink)] [transition:background-color_160ms_ease,_transform_160ms_ease]",
  "[&_.bookmark-favicon]:size-5.5 [&_.bookmark-favicon]:shrink-0",
  "active:[transform:translateY(1px)]",
  "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#dfcaa6]"
)
const campaignButtonClass = cn(
  "campaign-button rounded-0 mt-auto flex min-h-13 w-full touch-manipulation items-center justify-between gap-3 border-0 border-none border-[currentcolor] bg-[#815733] px-4.5 py-3.5 text-[15px] font-medium text-[#fff7e7] [transition:background-color_160ms_ease,_transform_160ms_ease]",
  "max-[391px]:px-3 max-[391px]:text-[14px]",
  "[&_>_span:first-child]:inline-flex [&_>_span:first-child]:items-center [&_>_span:first-child]:gap-2.25",
  "[&_>_span:last-child]:text-[22px] [&_>_span:last-child]:leading-[1]",
  "active:[transform:translateY(1px)]",
  "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#6c4629]"
)

function ProjectList({
  items,
  isPersonal = false,
  onSelect,
}: {
  items: readonly (ProjectBookmark & { description?: string })[]
  isPersonal?: boolean
  onSelect: (index: number) => void
}) {
  return (
    <div className="campaign-project-list mt-3.5 grid grid-cols-2 flex-wrap gap-2">
      {items.map((project, index) => (
        <button
          key={project.id}
          type="button"
          className={projectButtonClass}
          onClick={() => onSelect(index)}
          aria-label={
            (isPersonal ? "Открыть личный проект " : "Открыть проект ") +
            project.name
          }
        >
          <ProjectFavicon id={project.id} symbol={project.symbol} />
          {isPersonal ? (
            <span className="project-summary grid gap-1 [&_>_span]:text-[14px] [&_>_span]:leading-[1.45] [&_>_span]:text-[var(--mode-muted)] [&_strong]:font-medium">
              <strong>{project.name}</strong>
              <span>{project.description}</span>
            </span>
          ) : (
            <span>{project.name}</span>
          )}
        </button>
      ))}
    </div>
  )
}

function OpenCollectionButton({
  icon,
  onClick,
  children,
}: {
  icon: SymbolName
  onClick: () => void
  children: string
}) {
  return (
    <button type="button" className={campaignButtonClass} onClick={onClick}>
      <span>
        <Icon name={icon} /> {children}
      </span>
      <span aria-hidden="true">→</span>
    </button>
  )
}

const IntroSpread = ({
  onOpenProject,
  onOpenPersonalProject,
}: {
  onOpenProject: (index: number) => void
  onOpenPersonalProject: (index: number) => void
}) => {
  const handleOpenCampaign = () => onOpenProject(0)
  const handleOpenPersonalProjects = () => onOpenPersonalProject(0)

  return (
    <>
      <PaperPage
        side="left"
        className="intro-page personal-page flex flex-col bg-[#f3f0dd] [background-image:var(--paper-grain),var(--paper-fibers)] p-10 text-[var(--mode-ink)] [--mode-ink:#46533a] [--mode-muted:#626952] max-[1101px]:px-6.75 max-[1101px]:py-7.5 max-[801px]:px-7 max-[801px]:py-7.5 max-[391px]:px-5.5 max-[391px]:pt-7.5 max-[391px]:pb-7.5 min-[801px]:max-[1101px]:px-6.75 min-[801px]:max-[1101px]:py-7.5 [&_.campaign-button]:bg-[#637449] [&_.campaign-button]:text-[#fffdf1] [&_.campaign-project]:bg-[#e5e7d0] [@media(hover:hover)_and_(pointer:fine)]:[&_.campaign-button:hover]:bg-[#53643b] [@media(hover:hover)_and_(pointer:fine)]:[&_.campaign-project:hover]:bg-[#d8dec0]"
        aria-labelledby="personal-title"
      >
        <header
          className={cn(
            "mode-heading mb-3 text-center",
            "[&_h1]:m-0 [&_h1]:font-book [&_h1]:text-[clamp(36px,_3.8vw,_54px)] [&_h1]:leading-[1.08] [&_h1]:font-normal [&_h1]:tracking-[-1.8px] [&_h1]:text-balance [&_h1]:text-[var(--mode-ink)] [&_h1]:not-italic",
            "min-[801px]:max-[1101px]:[&_h1]:text-[40px]",
            "max-[801px]:[&_h1]:text-[clamp(36px,_8vw,_50px)]",
            "[&_h2]:m-0 [&_h2]:font-book [&_h2]:text-[clamp(36px,_3.8vw,_54px)] [&_h2]:leading-[1.08] [&_h2]:font-normal [&_h2]:tracking-[-1.8px] [&_h2]:text-balance [&_h2]:text-[var(--mode-ink)] [&_h2]:not-italic",
            "min-[801px]:max-[1101px]:[&_h2]:text-[40px]",
            "max-[801px]:[&_h2]:text-[clamp(36px,_8vw,_50px)]",
            "[&_p]:mx-0 [&_p]:mt-5 [&_p]:mb-0 [&_p]:text-[18px] [&_p]:leading-[1.5] [&_p]:text-pretty [&_p]:text-[var(--mode-ink)]"
          )}
        >
          <h1
            className="m-0 mb-2.25 font-[family-name:Georgia,'Times_New_Roman',serif] text-[clamp(39px,4.2vw,64px)] leading-[1.1] font-medium tracking-[-2.4px] text-[#393e34] max-[801px]:text-[52px] max-[391px]:text-[46px]"
            id="personal-title"
          >
            {profile.name}
          </h1>
          <p>{profile.role}. React и TypeScript.</p>
        </header>

        <section
          className={cn(
            "profile-note bg-[#fbf9ecb8] p-5.5",
            "min-[801px]:max-[1101px]:p-4.5",
            "max-[801px]:p-5",
            "max-[391px]:p-4",
            "[&_h2]:m-0 [&_h2]:font-book [&_h2]:text-[26px] [&_h2]:leading-[1.15] [&_h2]:font-normal [&_h2]:tracking-[-0.6px] [&_h2]:not-italic",
            "[&_p]:mx-0 [&_p]:mt-3.5 [&_p]:mb-0 [&_p]:text-[16px] [&_p]:leading-[1.55] [&_p]:text-pretty [&_p]:text-[var(--mode-ink)]"
          )}
        >
          <h2>Обо мне</h2>
          <p>
            Разрабатываю веб-интерфейсы, занимаюсь UI-дизайном. В личных
            проектах делаю приложение для тренировок и собираю соглашения по
            коду для AI-агентов.
          </p>
          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="profile-experience text-[14px] text-[var(--mode-muted)]">
              {profile.experience}
            </span>
            <nav
              className="personal-links flex shrink-0 items-center gap-2 [&_a]:inline-flex [&_a]:size-11 [&_a]:touch-manipulation [&_a]:items-center [&_a]:justify-center [&_a]:border [&_a]:border-solid [&_a]:border-[#46533a40] [&_a]:text-[var(--mode-ink)] [@media(hover:hover)_and_(pointer:fine)]:[&_a:hover]:bg-[#46533a0d]"
              aria-label="Личные ссылки"
            >
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <svg
                  className="size-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 .297C5.37.297 0 5.67 0 12.297c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.043-1.61-4.043-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.838 1.237 1.838 1.237 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.3-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.123-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.652.242 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.628-5.479 5.925.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.595 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
              <a
                href={profile.telegram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
              >
                <svg
                  className="size-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm5.563 8.161c-.18 1.897-.962 6.502-1.36 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.46-1.9-.902-1.056-.692-1.653-1.123-2.678-1.798-1.185-.78-.417-1.21.259-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.06 3.344-.479.329-.913.489-1.302.48-.428-.009-1.252-.242-1.865-.441-.752-.244-1.35-.374-1.298-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.121.098.154.23.17.324.016.093.036.305.02.47Z" />
                </svg>
              </a>
            </nav>
          </div>
        </section>

        <section
          className="personal-projects mx-0 mt-7 mb-6 [&_.campaign-project-list]:grid-cols-[minmax(0,_1fr)]"
          aria-labelledby="personal-projects-title"
        >
          <div className="flex items-center justify-between gap-3">
            <h2
              className="intro-section-label m-0 text-[16px] leading-[1.5] font-medium text-[var(--mode-ink)]"
              id="personal-projects-title"
            >
              Личные проекты
            </h2>
            <span className="project-count text-[14px] whitespace-nowrap text-[var(--mode-muted)]">
              {personalProjects.length} проекта
            </span>
          </div>
          <ProjectList
            items={personalProjects}
            onSelect={onOpenPersonalProject}
            isPersonal
          />
        </section>

        <OpenCollectionButton icon="leaf" onClick={handleOpenPersonalProjects}>
          Открыть личные проекты
        </OpenCollectionButton>
      </PaperPage>

      <PaperPage
        side="right"
        className="intro-page work-page flex flex-col bg-[#f1e5ce] [background-image:var(--paper-grain),var(--paper-fibers)] p-10 text-[var(--mode-ink)] [--mode-ink:#593d2e] [--mode-muted:#745843] before:border-[#a47a5133] max-[1101px]:px-6.75 max-[1101px]:py-7.5 max-[801px]:[border-top-width:5px] max-[801px]:[border-top-style:solid] max-[801px]:[border-top-color:rgb(104,_101,_74)] max-[801px]:px-7 max-[801px]:py-7.5 max-[391px]:[border-top-width:5px] max-[391px]:[border-top-style:solid] max-[391px]:[border-top-color:rgb(104,_101,_74)] max-[391px]:px-5.5 max-[391px]:pt-7.5 max-[391px]:pb-7.5 min-[801px]:max-[1101px]:px-6.75 min-[801px]:max-[1101px]:py-7.5 [&_a:focus-visible]:[outline-color:#845632] [&_button:focus-visible]:[outline-color:#845632]"
        aria-labelledby="work-title"
      >
        <header className="mb-3 text-center">
          <h2
            id="work-title"
            className="font-book text-[clamp(36px,3.8vw,54px)] leading-[1.08] font-normal tracking-[-1.8px] text-balance max-[801px]:text-[clamp(36px,8vw,50px)] min-[801px]:max-[1101px]:text-[40px]"
          >
            Коммерческая разработка
          </h2>
        </header>

        <section
          className={cn(
            "experience-note bg-[#fff5e3b8] p-5.5",
            "min-[801px]:max-[1101px]:p-4.5",
            "max-[801px]:p-5",
            "max-[391px]:p-4",
            "[&_p]:mx-0 [&_p]:mt-3.5 [&_p]:mb-0 [&_p]:text-[16px] [&_p]:leading-[1.55] [&_p]:text-pretty [&_p]:text-[var(--mode-ink)]",
            "[&_.experience-period]:mx-0 [&_.experience-period]:mt-2.5 [&_.experience-period]:mb-0 [&_.experience-period]:text-[14px] [&_.experience-period]:text-[var(--mode-muted)]"
          )}
          aria-labelledby="experience-title"
        >
          <div
            className={cn(
              "experience-heading flex flex-wrap items-center justify-between gap-3",
              "[&_h3]:m-0 [&_h3]:font-book [&_h3]:text-[26px] [&_h3]:leading-[1.15] [&_h3]:font-normal [&_h3]:tracking-[-0.6px] [&_h3]:not-italic",
              "[&_>_span]:max-w-40 [&_>_span]:text-[14px] [&_>_span]:leading-[1.45] [&_>_span]:text-[var(--mode-muted)]"
            )}
          >
            <h3 id="experience-title">Crypton</h3>
            <span>Senior frontend / Front lead</span>
          </div>
          <WorkPeriod />
          <p>
            Разрабатывал и развивал продукты экосистемы: от лендингов и личного
            кабинета до игровых и образовательных приложений.
          </p>
          <ul
            aria-label="Технологии"
            className={cn(
              "experience-tags m-0 mt-4 flex list-none flex-wrap gap-2 p-0",
              "text-[14px] leading-tight text-[var(--mode-ink)]",
              "[&>li]:inline-flex [&>li]:min-h-8 [&>li]:items-center [&>li]:gap-2 [&>li]:rounded-full",
              "[&>li]:border [&>li]:border-[#d7bea0] [&>li]:bg-[#f4e7d0] [&>li]:px-2.75 [&>li]:py-1",
              "[&_svg]:size-4 [&_svg]:shrink-0"
            )}
          >
            <li>
              <span className="inline-flex gap-1">
                <Icon name="react" className="text-[#176a7a]" />
                <Icon name="typescript" className="text-[#275c93]" />
              </span>
              React + TypeScript
            </li>
            <li>
              <Icon name="link" className="text-[#745437]" />
              Web3
            </li>
            <li>
              <Icon name="telegram" className="text-[#166588]" />
              Telegram Mini Apps
            </li>
          </ul>
        </section>

        <section
          className="campaign-projects mx-0 mt-7 mb-6"
          aria-labelledby="work-projects-title"
        >
          <div className="flex items-center justify-between gap-3">
            <h3
              className="intro-section-label m-0 text-[16px] leading-[1.5] font-medium text-[var(--mode-ink)]"
              id="work-projects-title"
            >
              Кликни на проект, чтобы изучить его подробнее
            </h3>
            <span className="project-count text-[14px] whitespace-nowrap text-[var(--mode-muted)]">
              {projects.length} проектов
            </span>
          </div>
          <ProjectList items={projects} onSelect={onOpenProject} />
        </section>

        <OpenCollectionButton icon="sword" onClick={handleOpenCampaign}>
          Открыть рабочие проекты
        </OpenCollectionButton>
      </PaperPage>
    </>
  )
}

export default IntroSpread
