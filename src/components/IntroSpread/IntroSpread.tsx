import { Icon } from "../Art"
import { ProjectFavicon } from "../ProjectFavicon"
import ModeEmblem from "./ModeEmblem"
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
        <div className="mode-meta flex items-center justify-between gap-3">
          <span>01 / Личная сторона</span>
          <span className="difficulty">
            <i />
            <i />
            <i />
            <span>Easy</span>
          </span>
        </div>

        <header className="mode-heading">
          <span className="mode-eyebrow">Свободный режим</span>
          <h1 id="personal-title">Ради интереса.</h1>
          <p>Идеи, эксперименты и немного обо мне.</p>
        </header>

        <ModeEmblem mode="personal" />

        <section className="profile-note">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="intro-section-label">Игрок за клавиатурой</span>
            <span className="profile-age">{profile.age} лет</span>
          </div>
          <h2>Привет, я {profile.name}.</h2>
          <p className="profile-role">{profile.role}</p>
          <p>
            Создаю интерфейсы и немношко дизайню. А в свободном режиме — пробую
            новое и делаю свои проекты.
          </p>
          <span className="profile-experience">
            {profile.experience} · React · TypeScript
          </span>
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
              {String(personalProjects.length).padStart(2, "0")} главы
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
                <span>{project.name}</span>
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

        <div className="intro-folio">
          <span>Можно свернуть с тропинки</span>
          <span>01</span>
        </div>
      </section>

      <section
        className="paper-page page-right intro-page work-page"
        aria-labelledby="work-title"
      >
        <div className="mode-meta flex items-center justify-between gap-3">
          <span>02 / Рабочая сторона</span>
          <span className="difficulty">
            <i />
            <i />
            <i />
            <span>Hard</span>
          </span>
        </div>

        <header className="mode-heading">
          <span className="mode-eyebrow">Основная кампания</span>
          <h2 id="work-title">На результат.</h2>
          <p>Реальные продукты. Задачи со звёздочкой.</p>
        </header>

        <ModeEmblem mode="work" />

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
              Рабочие проекты
            </h3>
            <span className="project-count">
              {String(projects.length).padStart(2, "0")} глав
            </span>
          </div>
          <div className="campaign-project-list flex flex-wrap gap-2">
            {projects.map((project, index) => (
              <button
                key={project.id}
                className="campaign-project"
                onClick={() => onOpenProject(index)}
                aria-label={`Открыть главу ${project.name}`}
              >
                <ProjectFavicon id={project.id} symbol={project.symbol} />
                <span>{project.label}</span>
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

        <div className="intro-folio">
          <span>У каждого релиза своя история</span>
          <span>02</span>
        </div>
      </section>
    </>
  )
}

export default IntroSpread
