import { Icon } from "../Art"
import { ProjectFavicon } from "../ProjectFavicon"
import WorkPeriod from "./WorkPeriod"

import { projects } from "../../data/projects"
import { personalProjects, profile } from "../../data/profile"

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
      <section
        className="paper-page page-left intro-page personal-page"
        aria-labelledby="personal-title"
      >
        <header className="mode-heading">
          <h1 id="personal-title">{profile.name}</h1>
          <p>{profile.role}. React и TypeScript.</p>
        </header>

        <section className="profile-note">
          <h2>Обо мне</h2>
          <p>
            Разрабатываю веб-интерфейсы, занимаюсь UI-дизайном. В личных
            проектах делаю приложение для тренировок и собираю соглашения по
            коду для AI-агентов.
          </p>
          <span className="profile-experience">{profile.experience}</span>
        </section>

        <section
          className="personal-projects"
          aria-labelledby="personal-projects-title"
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className="intro-section-label" id="personal-projects-title">
              Личные проекты
            </h2>
            <span className="project-count">
              {personalProjects.length} проекта
            </span>
          </div>
          <div className="campaign-project-list flex flex-wrap gap-2">
            {personalProjects.map((project, index) => (
              <button
                key={project.id}
                className="campaign-project"
                onClick={() => onOpenPersonalProject(index)}
                aria-label={`Открыть личный проект ${project.name}`}
              >
                <ProjectFavicon id={project.id} symbol={project.symbol} />
                <span className="project-summary">
                  <strong>{project.name}</strong>
                  <span>{project.description}</span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <nav
          className="personal-links flex flex-wrap items-center gap-x-5 gap-y-2"
          aria-label="Личные ссылки"
        >
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            <Icon name="code" /> Мой GitHub <Icon name="arrow" />
          </a>
        </nav>

        <button
          className="campaign-button flex items-center justify-between gap-3"
          onClick={handleOpenPersonalProjects}
        >
          <span>
            <Icon name="leaf" /> Открыть личные проекты
          </span>
          <span aria-hidden="true">→</span>
        </button>
      </section>

      <section
        className="paper-page page-right intro-page work-page"
        aria-labelledby="work-title"
      >
        <header className="mode-heading">
          <h2 id="work-title">Проекты Crypton</h2>
          <p>Личные кабинеты, игры и образовательные приложения.</p>
        </header>

        <section className="experience-note" aria-labelledby="experience-title">
          <div className="experience-heading flex items-center justify-between gap-3">
            <h3 id="experience-title">Crypton</h3>
            <span>Senior frontend / Front lead</span>
          </div>
          <WorkPeriod />
          <p>
            Разрабатывал и развивал продукты экосистемы: от лендингов и личного
            кабинета до игровых и образовательных приложений.
          </p>
          <div className="experience-tags flex flex-wrap gap-x-3 gap-y-1">
            <span>React + TypeScript</span>
            <span>Web3</span>
            <span>Telegram Mini Apps</span>
          </div>
        </section>

        <section
          className="campaign-projects"
          aria-labelledby="work-projects-title"
        >
          <div className="flex items-center justify-between gap-3">
            <h3 className="intro-section-label" id="work-projects-title">
              Кликни на проект, чтобы изучить его подробнее
            </h3>
            <span className="project-count">{projects.length} проектов</span>
          </div>
          <div className="campaign-project-list flex flex-wrap gap-2">
            {projects.map((project, index) => (
              <button
                key={project.id}
                className="campaign-project"
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
          className="campaign-button flex items-center justify-between gap-3"
          onClick={handleOpenCampaign}
        >
          <span>
            <Icon name="sword" /> Открыть рабочие проекты
          </span>
          <span aria-hidden="true">→</span>
        </button>
      </section>
    </>
  )
}

export default IntroSpread
