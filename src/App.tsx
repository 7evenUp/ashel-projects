import { useCallback, useEffect, useRef, useState } from "react"
import type { MouseEvent, TouchEvent } from "react"

import IntroSpread from "./components/IntroSpread/IntroSpread"
import PersonalSpread from "./components/PersonalSpread/PersonalSpread"
import { Icon } from "./components/Art"
import { NotesDialog } from "./components/NotesDialog"
import { PageTurn, copyPage } from "./components/PageTurn"
import { ProjectFavicon } from "./components/ProjectFavicon"
import { Spread } from "./components/Spread"
import TableScenery from "./components/TableScenery"

import { compositionStyle } from "./data/compositions"
import { projects } from "./data/projects"
import { personalProjects, profile } from "./data/profile"
import sourceNotes from "./data/source-notes.json"

import type { Turn } from "./components/PageTurn"
import type { Route, ThemeStyle, Variant } from "./types"

import { parseRoute, routeHash } from "./routing"

const routePosition = (route: Route) =>
  route.page === "intro" ? -1 : route.index

const routeStyle = (route: Route): ThemeStyle => {
  if (route.page === "personal") {
    const project = personalProjects[route.index]
    return compositionStyle("nutsfarm", project.color, project.pale)
  }
  const project = projects[route.page === "project" ? route.index : 0]
  const isMini = route.page === "project" && route.mode === "mini"

  return compositionStyle(
    project.id + (isMini ? "-mini" : ""),
    project.color,
    project.pale
  )
}

const useReducedMotion = () => {
  const [isReduced, setIsReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handleChange = () => setIsReduced(media.matches)
    media.addEventListener("change", handleChange)

    return () => media.removeEventListener("change", handleChange)
  }, [])

  return isReduced
}

export function App() {
  const [route, setRoute] = useState(() => parseRoute(location.hash))
  const routeRef = useRef(route)
  const book = useRef<HTMLDivElement>(null)
  const tabs = useRef<HTMLElement>(null)
  const touch = useRef<{ x: number; y: number } | null>(null)
  const isReduced = useReducedMotion()

  const [turn, setTurn] = useState<Turn | null>(null)
  const turnSerial = useRef(0)

  const [dialog, setDialog] = useState<"notes" | "nda" | null>(null)
  const closeDialog = useCallback(() => setDialog(null), [])

  const applyRoute = useCallback(
    (next: Route, animate = true) => {
      const previous = routeRef.current
      if (routeHash(next) === routeHash(previous)) return

      const direction = routePosition(next) - routePosition(previous)
      const front = book.current?.querySelector(
        direction > 0 ? ".page-right" : ".page-left"
      )
      const resting = book.current?.querySelector(
        direction > 0 ? ".page-left" : ".page-right"
      )
      const isMobile = window.matchMedia("(max-width: 800px)").matches

      setTurn(
        isReduced || !animate || !direction || !front || !resting
          ? null
          : {
              direction,
              serial: ++turnSerial.current,
              front: copyPage(isMobile && book.current ? book.current : front),
              resting: copyPage(resting),
              style: routeStyle(previous),
            }
      )

      routeRef.current = next
      setRoute(next)
      setDialog(null)

      if (next.page !== previous.page) {
        requestAnimationFrame(() =>
          book.current?.focus({ preventScroll: true })
        )
      }
    },
    [isReduced]
  )

  const navigate = useCallback(
    (next: Route, scroll = false, animate = true) => {
      if (routeHash(next) === routeHash(routeRef.current)) return

      history.pushState(null, "", routeHash(next))
      applyRoute(next, animate)

      if (scroll && window.matchMedia("(max-width: 800px)").matches) {
        window.scrollTo({ top: 0, behavior: isReduced ? "instant" : "smooth" })
      }
    },
    [applyRoute, isReduced]
  )

  const navigateChapter = useCallback(
    (index: number, scroll = false, animate = true) => {
      const isPersonal = routeRef.current.page === "personal"
      const chapterCount = isPersonal
        ? personalProjects.length
        : projects.length
      if (index < -1 || index >= chapterCount) return

      const next: Route =
        index === -1
          ? { page: "intro" }
          : isPersonal
            ? { page: "personal", index }
            : { page: "project", index, mode: "web" }
      navigate(next, scroll, animate)
    },
    [navigate]
  )

  useEffect(() => {
    const handleRestore = () => applyRoute(parseRoute(location.hash))
    window.addEventListener("popstate", handleRestore)
    window.addEventListener("hashchange", handleRestore)

    return () => {
      window.removeEventListener("popstate", handleRestore)
      window.removeEventListener("hashchange", handleRestore)
    }
  }, [applyRoute])

  useEffect(() => {
    if (isReduced) setTurn(null)
  }, [isReduced])

  const isIntro = route.page === "intro"
  const isPersonal = route.page === "personal"
  const activeIndex = routePosition(route)
  const bookProjects = isPersonal ? personalProjects : projects
  const chapterCount = bookProjects.length
  const chapterName = bookProjects[isIntro ? 0 : activeIndex].name
  const base = projects[route.page === "project" ? route.index : 0]
  const variant = route.page === "project" ? route.mode : "web"
  const project =
    variant === "mini" && base.mini ? { ...base, ...base.mini } : base

  useEffect(() => {
    document.title = isIntro
      ? `${profile.name} — дневник frontend-разработчика`
      : isPersonal
        ? `${chapterName} — личные проекты Артёма`
        : `${project.name} — дневник разработчика Crypton`
  }, [isIntro, isPersonal, chapterName, project.name])

  useEffect(() => {
    if (!window.matchMedia("(max-width: 800px)").matches) return

    const nav = tabs.current
    const active = nav?.querySelector<HTMLButtonElement>(
      `[data-project="${activeIndex}"]`
    )
    if (nav && active) {
      nav.scrollTo({
        left: active.offsetLeft - (nav.clientWidth - active.offsetWidth) / 2,
        behavior: "instant",
      })
    }
  }, [activeIndex, isPersonal])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target instanceof HTMLElement ? event.target : null
      if (
        dialog ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        target?.closest('input,textarea,select,[contenteditable="true"]')
      )
        return
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return

      event.preventDefault()
      navigateChapter(
        routePosition(routeRef.current) + (event.key === "ArrowRight" ? 1 : -1),
        false,
        false
      )

      if (target?.closest(".bookmark")) {
        tabs.current
          ?.querySelector<HTMLButtonElement>(
            `[data-project="${routePosition(routeRef.current)}"]`
          )
          ?.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [dialog, navigateChapter])

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement
    touch.current =
      event.touches.length === 1 && !target.closest("a,button")
        ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
        : null
  }

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touch.current
    touch.current = null
    if (!start || !event.changedTouches.length) return

    const dx = event.changedTouches[0].clientX - start.x
    const dy = event.changedTouches[0].clientY - start.y
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.8) {
      navigateChapter(routePosition(routeRef.current) + (dx < 0 ? 1 : -1), true)
    }
  }

  const handleSkipToSpread = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    book.current?.focus()
    book.current?.scrollIntoView({ block: "start", behavior: "instant" })
  }

  const handleOpenProject = (index: number) =>
    navigate({ page: "project", index, mode: "web" }, true)
  const handleOpenPersonalProject = (index: number) =>
    navigate({ page: "personal", index }, true)
  const handleOpenIntro = () => navigate({ page: "intro" }, true)
  const handlePreviousProject = () => navigateChapter(activeIndex - 1, true)
  const handleNextProject = () => navigateChapter(activeIndex + 1, true)
  const handleVariantChange = (mode: Variant) =>
    navigate({ page: "project", index: activeIndex, mode })
  const handleTurnFinish = () =>
    setTurn((current) => (current?.serial === turn?.serial ? null : current))

  return (
    <div className="game-world" style={routeStyle(route)}>
      <a className="skip-link" href="#spread" onClick={handleSkipToSpread}>
        К развороту
      </a>
      <TableScenery />
      <main
        className={[
          "desk relative mx-auto",
          isIntro ? "intro-desk" : "project-desk",
        ].join(" ")}
      >
        <div className="book-shell relative isolate">
          {!isIntro && (
            <nav
              ref={tabs}
              className={
                isPersonal ? "bookmarks bookmarks-personal" : "bookmarks"
              }
              aria-label={isPersonal ? "Личные проекты" : "Проекты"}
            >
              {bookProjects.map((item, index) => (
                <button
                  key={item.id}
                  className="bookmark"
                  data-project={index}
                  data-project-id={item.id}
                  style={
                    {
                      "--tab": item.pale,
                      "--tab-strong": item.color,
                    } as ThemeStyle
                  }
                  aria-label={item.name}
                  aria-controls="spread"
                  aria-current={index === activeIndex ? "page" : undefined}
                  onClick={() =>
                    isPersonal
                      ? handleOpenPersonalProject(index)
                      : handleOpenProject(index)
                  }
                >
                  <ProjectFavicon
                    key={
                      item.id +
                      (item.id === "academy" && variant === "mini"
                        ? "-mini"
                        : "")
                    }
                    id={
                      item.id +
                      (item.id === "academy" && variant === "mini"
                        ? "-mini"
                        : "")
                    }
                    symbol={item.symbol}
                  />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          )}

          <div
            className={[
              "book-cover",
              turn &&
                (turn.direction > 0 ? "turning-forward" : "turning-backward"),
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div className="binding-stitches" aria-hidden="true" />
            <div className="cover-corner corner-tl" aria-hidden="true" />
            <div className="cover-corner corner-br" aria-hidden="true" />

            <div
              ref={book}
              className="book grid grid-cols-1 min-[801px]:grid-cols-2"
              id="spread"
              tabIndex={-1}
              aria-label={
                isIntro ? "Личная и рабочая стороны" : "Разворот проекта"
              }
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={() => {
                touch.current = null
              }}
            >
              {route.page === "intro" ? (
                <IntroSpread
                  onOpenProject={handleOpenProject}
                  onOpenPersonalProject={handleOpenPersonalProject}
                />
              ) : route.page === "personal" ? (
                <PersonalSpread
                  project={personalProjects[route.index]}
                  index={route.index}
                />
              ) : (
                <Spread
                  project={project}
                  index={route.index}
                  variant={route.mode}
                  source={sourceNotes[route.index]}
                  onVariant={handleVariantChange}
                  onNotes={setDialog}
                  reducedMotion={isReduced}
                />
              )}
            </div>

            {turn && (
              <PageTurn
                key={turn.serial}
                turn={turn}
                book={book.current}
                onFinish={handleTurnFinish}
              />
            )}
          </div>
          {isIntro ? (
            <div className="ribbon" aria-hidden="true" />
          ) : (
            <div className="home-ribbon-rail">
              <button
                className="home-ribbon"
                aria-label="Начало книги"
                aria-controls="spread"
                title="Вернуться к началу книги"
                onClick={handleOpenIntro}
              >
                <Icon name="book" />
                <span>Начало</span>
              </button>
            </div>
          )}
        </div>

        {!isIntro && (
          <footer className="book-controls">
            <button
              className="page-button"
              aria-label={
                activeIndex === 0 ? "Вернуться к выбору" : "Предыдущий проект"
              }
              onClick={handlePreviousProject}
            >
              <span aria-hidden="true">←</span>
              <span className="nav-label">
                {activeIndex === 0 ? "К началу" : "Назад"}
              </span>
            </button>

            <div className="reading-progress">
              <span className="chapter-counter">
                ГЛАВА {String(activeIndex + 1).padStart(2, "0")} ИЗ{" "}
                {String(chapterCount).padStart(2, "0")}
              </span>
              <div className="progress-dots" aria-hidden="true">
                {bookProjects.map((item, index) => (
                  <i
                    key={item.id}
                    className={index === activeIndex ? "current" : ""}
                  />
                ))}
              </div>
              <span className="keyboard-hint">
                Переключать проекты <kbd>←</kbd> <kbd>→</kbd>
              </span>
            </div>

            <button
              className="page-button"
              disabled={activeIndex === chapterCount - 1}
              aria-label="Следующий проект"
              onClick={handleNextProject}
            >
              <span className="nav-label">Дальше</span>
              <span aria-hidden="true">→</span>
            </button>
          </footer>
        )}
      </main>

      <p className="sr-only" role="status" aria-live="polite">
        {isIntro
          ? "Начало книги: личные и рабочие проекты"
          : `Глава ${activeIndex + 1} из ${chapterCount}: ${chapterName}`}
      </p>

      {route.page === "project" && (
        <NotesDialog
          kind={dialog}
          name={project.name}
          body={sourceNotes[route.index].body}
          onClose={closeDialog}
        />
      )}
    </div>
  )
}
