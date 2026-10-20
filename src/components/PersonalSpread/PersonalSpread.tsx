import { Icon } from "../Art"
import AgentSkillArt from "./AgentSkillArt"
import GymArt from "./GymArt"
import InstallCommand from "./InstallCommand"

import type { PersonalProject } from "../../data/profile"

const PersonalSpread = ({
  project,
  index,
}: {
  project: PersonalProject
  index: number
}) => {
  return (
    <>
      <section
        className="paper-page page-left personal-detail"
        aria-labelledby="project-title"
      >
        <div className="chapter-meta">
          <div className="chapter-label">
            ГЛАВА {String(index + 1).padStart(2, "0")}
            <span> / </span>
            {project.category}
          </div>
        </div>

        <div className="project-heading">
          <h1 id="project-title">{project.name}</h1>
        </div>
        <p className="tagline">{project.tagline}</p>

        {project.id === "ashel-gym" ? <GymArt /> : <AgentSkillArt />}

        <section className="note about-note tape">
          <h2>Об этом проекте</h2>
          <p>{project.summary}</p>
        </section>

        <section className="stack">
          <h2 className="stack-heading">
            <Icon name="code" />В моём рюкзаке
          </h2>
          <div className="stack-tags flex flex-wrap gap-1.5">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>

        <div className="page-number">
          <span>ЛИЧНЫЕ ПРОЕКТЫ / {project.name.toUpperCase()}</span>
          <span className="folio">
            {String(index * 2 + 1).padStart(2, "0")}
          </span>
        </div>
      </section>

      <section
        className="paper-page page-right personal-detail"
        aria-label="Возможности и ссылки личного проекта"
      >
        <div className="paperclip" aria-hidden="true" />
        <div className="margin-spark" aria-hidden="true">
          ✦<span>✧</span>
        </div>

        <nav
          className="page-running-head project-links"
          aria-label="Ссылки проекта"
        >
          <a
            className="project-link primary"
            href={project.preview}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="arrow" />
            {project.previewLabel}
          </a>
          <a
            className="project-link secondary"
            href={project.repository}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="code" />
            Исходный код
          </a>
        </nav>

        <section className="note contribution-note tape personal-feature-note">
          <div className="section-heading">
            <Icon name="spark" />
            <h2>Что внутри</h2>
          </div>
          <ol className="case-list">
            {project.features.map(([title, description], featureIndex) => (
              <li key={title}>
                <span className="case-number">
                  {String(featureIndex + 1).padStart(2, "0")}
                </span>
                <div>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {project.installCommand && (
          <section className="note cases-note personal-install">
            <div className="section-heading">
              <Icon name="code" />
              <h2>Попробовать skill</h2>
            </div>
            <p>Добавить в свой проект:</p>
            <InstallCommand command={project.installCommand} />
          </section>
        )}

        <p className="personal-postscript">Личная идея → рабочий код.</p>

        <div className="page-number">
          <span>СВОБОДНЫЙ РЕЖИМ / {project.name.toUpperCase()}</span>
          <span className="folio">
            {String(index * 2 + 2).padStart(2, "0")}
          </span>
        </div>
      </section>
    </>
  )
}

export default PersonalSpread
