import PaperPage from "../PaperPage"
import { Icon } from "../Art"
import { ProjectFavicon } from "../ProjectFavicon"
import WorkPeriod from "./WorkPeriod"
import ModeEmblem from "./ModeEmblem"

import { projects } from "../../data/projects"
import { personalProjects, profile } from "../../data/profile"

import { cn } from "../../lib/cn"

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

        <ModeEmblem mode="personal" />

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
          <div className="campaign-project-list mt-3.5 grid grid-cols-2 flex-wrap gap-2">
            {personalProjects.map((project, index) => (
              <button
                key={project.id}
                className={cn(
                  "campaign-project rounded-0 flex min-h-12 touch-manipulation items-center gap-2.5 border-0 border-none border-[currentcolor] bg-[#ffffff0b] p-3 text-left text-[15px] text-[var(--mode-ink)] [transition:background-color_160ms_ease,_transform_160ms_ease]",
                  "[&_.bookmark-favicon]:size-5.5 [&_.bookmark-favicon]:shrink-0",
                  "active:[transform:translateY(1px)]",
                  "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#ffffff15]"
                )}
                onClick={() => onOpenPersonalProject(index)}
                aria-label={`Открыть личный проект ${project.name}`}
              >
                <ProjectFavicon id={project.id} symbol={project.symbol} />
                <span className="project-summary grid gap-1 [&_>_span]:text-[14px] [&_>_span]:leading-[1.45] [&_>_span]:text-[var(--mode-muted)] [&_strong]:font-medium">
                  <strong>{project.name}</strong>
                  <span>{project.description}</span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <button
          className={cn(
            "campaign-button rounded-0 mt-auto flex min-h-13 w-full touch-manipulation items-center justify-between gap-3 border-0 border-none border-[currentcolor] bg-[#d8aa73] px-4.5 py-3.5 text-[15px] font-medium text-[#35282a] [transition:background-color_160ms_ease,_transform_160ms_ease]",
            "max-[391px]:px-3 max-[391px]:text-[14px]",
            "[&_>_span:first-child]:inline-flex [&_>_span:first-child]:items-center [&_>_span:first-child]:gap-2.25",
            "[&_>_span:last-child]:text-[22px] [&_>_span:last-child]:leading-[1]",
            "active:[transform:translateY(1px)]",
            "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#ebc38e]"
          )}
          onClick={handleOpenPersonalProjects}
        >
          <span>
            <Icon name="leaf" /> Открыть личные проекты
          </span>
          <span aria-hidden="true">→</span>
        </button>
      </PaperPage>

      <PaperPage
        side="right"
        className="intro-page work-page flex flex-col bg-[#35282a] [background-image:var(--paper-grain),var(--paper-fibers)] p-10 text-[var(--mode-ink)] [--mode-ink:#efcf9f] [--mode-muted:#d0b5a2] before:border-[#d1a77825] max-[1101px]:px-6.75 max-[1101px]:py-7.5 max-[801px]:[border-top-width:5px] max-[801px]:[border-top-style:solid] max-[801px]:[border-top-color:rgb(104,_101,_74)] max-[801px]:px-7 max-[801px]:py-7.5 max-[391px]:[border-top-width:5px] max-[391px]:[border-top-style:solid] max-[391px]:[border-top-color:rgb(104,_101,_74)] max-[391px]:px-5.5 max-[391px]:pt-7.5 max-[391px]:pb-7.5 min-[801px]:max-[1101px]:px-6.75 min-[801px]:max-[1101px]:py-7.5 [&_.emblem-fill]:[fill:#ba724c16] [&_.mode-emblem]:text-[#dca875] [&_a:focus-visible]:[outline-color:#f3d2a2] [&_button:focus-visible]:[outline-color:#f3d2a2]"
        aria-labelledby="work-title"
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
          <h2 id="work-title">Проекты Crypton</h2>
          <p>Личные кабинеты, игры и образовательные приложения.</p>
        </header>

        <ModeEmblem mode="work" />

        <section
          className={cn(
            "experience-note bg-[#ffffff08] p-5.5",
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
          <div
            className={cn(
              "experience-tags mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[14px] text-[var(--mode-muted)]",
              "[&_span_+_span:before]:mr-3 [&_span_+_span:before]:[content:'·']",
              "max-[391px]:[&_span_+_span:before]:mr-1.25"
            )}
          >
            <span>React + TypeScript</span>
            <span>Web3</span>
            <span>Telegram Mini Apps</span>
          </div>
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
          <div className="campaign-project-list mt-3.5 grid grid-cols-2 flex-wrap gap-2">
            {projects.map((project, index) => (
              <button
                key={project.id}
                className={cn(
                  "campaign-project rounded-0 flex min-h-12 touch-manipulation items-center gap-2.5 border-0 border-none border-[currentcolor] bg-[#ffffff0b] p-3 text-left text-[15px] text-[var(--mode-ink)] [transition:background-color_160ms_ease,_transform_160ms_ease]",
                  "[&_.bookmark-favicon]:size-5.5 [&_.bookmark-favicon]:shrink-0",
                  "active:[transform:translateY(1px)]",
                  "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#ffffff15]"
                )}
                onClick={() => onOpenProject(index)}
                aria-label={`Открыть проект ${project.name}`}
              >
                <ProjectFavicon id={project.id} symbol={project.symbol} />
                <span>{project.name}</span>
              </button>
            ))}
          </div>
        </section>

        <button
          className={cn(
            "campaign-button rounded-0 mt-auto flex min-h-13 w-full touch-manipulation items-center justify-between gap-3 border-0 border-none border-[currentcolor] bg-[#d8aa73] px-4.5 py-3.5 text-[15px] font-medium text-[#35282a] [transition:background-color_160ms_ease,_transform_160ms_ease]",
            "max-[391px]:px-3 max-[391px]:text-[14px]",
            "[&_>_span:first-child]:inline-flex [&_>_span:first-child]:items-center [&_>_span:first-child]:gap-2.25",
            "[&_>_span:last-child]:text-[22px] [&_>_span:last-child]:leading-[1]",
            "active:[transform:translateY(1px)]",
            "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#ebc38e]"
          )}
          onClick={handleOpenCampaign}
        >
          <span>
            <Icon name="sword" /> Открыть рабочие проекты
          </span>
          <span aria-hidden="true">→</span>
        </button>
      </PaperPage>
    </>
  )
}

export default IntroSpread
