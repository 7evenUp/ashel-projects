import { useCallback, useEffect, useState } from "react"
import type { MouseEvent } from "react"

import { BookCover } from "./components/Book/BookCover"
import { Bookmarks } from "./components/Book/Bookmarks"
import { BookRibbon } from "./components/Book/BookRibbon"
import { ChapterControls } from "./components/Book/ChapterControls"
import { useBookNavigation } from "./components/Book/useBookNavigation"
import DesignSpread from "./components/DesignSpread"
import IntroSpread from "./components/IntroSpread/IntroSpread"
import { ModeSwitch } from "./components/ModeSwitch"
import { NotesDialog } from "./components/NotesDialog"
import PersonalSpread from "./components/PersonalSpread/PersonalSpread"
import { Spread } from "./components/Spread"
import TableScenery from "./components/TableScenery"

import { projects } from "./data/projects"
import { personalProjects, profile } from "./data/profile"
import sourceNotes from "./data/source-notes.json"

import { getProjectView, routeTheme } from "./routing"
import { cn } from "./lib/cn"

import type { NotesKind, Variant } from "./types"

export function App() {
  const [dialog, setDialog] = useState<NotesKind | null>(null)
  const closeDialog = useCallback(() => setDialog(null), [])
  const {
    book,
    route,
    turn,
    isReduced,
    navigate,
    navigateChapter,
    handleModeChange,
    touchHandlers,
    finishTurn,
  } = useBookNavigation({
    isDialogOpen: dialog !== null,
    onRouteChange: closeDialog,
  })

  const isDesign = route.page === "design"
  const isIntro = route.page === "intro"
  const isChapter = route.page === "personal" || route.page === "project"
  const bookProjects = route.page === "personal" ? personalProjects : projects
  const chapterIndex = isChapter ? route.index : -1
  const variant = route.page === "project" ? route.mode : "web"
  const personalProject =
    route.page === "personal" ? personalProjects[route.index] : null
  const project = route.page === "project" ? getProjectView(route) : null
  const source = project ? sourceNotes[project.id] : null

  const title = isDesign
    ? `${profile.name} — дизайн-работы`
    : personalProject
      ? `${personalProject.name} — личные проекты Артёма`
      : project
        ? `${project.name} — дневник разработчика Crypton`
        : `${profile.name} — дневник frontend-разработчика`

  useEffect(() => {
    document.title = title
  }, [title])

  const spreadLabel = isDesign
    ? "Альбом дизайн-работ"
    : isIntro
      ? "Личная и рабочая стороны"
      : "Разворот проекта"

  const handleSkipToSpread = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    book.current?.focus()
    book.current?.scrollIntoView({ block: "start", behavior: "instant" })
  }

  const handleOpenProject = (index: number) =>
    navigate({ page: "project", index, mode: "web" }, { scroll: true })
  const handleOpenPersonalProject = (index: number) =>
    navigate({ page: "personal", index }, { scroll: true })
  const handleOpenIntro = () => navigate({ page: "intro" }, { scroll: true })
  const handleVariantChange = (mode: Variant) => {
    if (route.page === "project") navigate({ ...route, mode })
  }

  return (
    <div
      className={cn(
        "game-world relative isolate min-h-[100svh] [&_>_.desk]:z-[1]",
        isDesign &&
          "bg-[#15131a] [background-image:var(--paper-grain),radial-gradient(ellipse_at_50%_25%,#352837,transparent_75%)] text-[#f5e9e5] [color-scheme:dark] [background-blend-mode:soft-light,normal]"
      )}
      style={routeTheme(route)}
    >
      <a
        className={cn(
          "skip-link",
          "[&:not(:focus)]:absolute [&:not(:focus)]:size-px [&:not(:focus)]:overflow-hidden [&:not(:focus)]:[clip-path:inset(50%)]",
          "[&:focus]:fixed [&:focus]:top-3 [&:focus]:left-3 [&:focus]:z-[100] [&:focus]:bg-white [&:focus]:p-3",
          isDesign && "[&:focus]:bg-[#352837] [&:focus]:outline-[#e6a996]"
        )}
        href="#spread"
        onClick={handleSkipToSpread}
      >
        К развороту
      </a>
      <ModeSwitch isDesign={isDesign} onChange={handleModeChange} />
      <TableScenery isDesign={isDesign} />
      <div className="mode-ripple" aria-hidden="true" />
      <main
        className={cn(
          "desk relative m-auto max-w-325 px-10.5 pt-20 pb-6.25",
          "min-[1450px]:pt-22",
          "max-[1101px]:pt-19 max-[1101px]:pr-6.25 max-[1101px]:pl-6.25",
          "max-[801px]:max-w-152.5 max-[801px]:px-4 max-[801px]:pt-0 max-[801px]:pb-5.75",
          isIntro || isDesign
            ? "intro-desk pt-6 pb-12 max-[1101px]:pt-6 max-[801px]:pt-5 min-[1450px]:pt-6"
            : "project-desk pl-[clamp(42px,_calc(746px_-_50vw),_96px)] max-[1101px]:pl-[clamp(42px,calc(746px-50vw),96px)] max-[801px]:pl-12",
          isDesign && "max-[801px]:pb-12"
        )}
      >
        <div className="book-shell relative isolate">
          {isChapter && (
            <Bookmarks
              projects={bookProjects}
              activeIndex={chapterIndex}
              isPersonal={route.page === "personal"}
              variant={variant}
              onSelect={
                route.page === "personal"
                  ? handleOpenPersonalProject
                  : handleOpenProject
              }
            />
          )}
          <BookCover
            book={book}
            label={spreadLabel}
            isDesign={isDesign}
            turn={turn}
            onTurnFinish={finishTurn}
            touchHandlers={isDesign ? undefined : touchHandlers}
          >
            {isDesign && <DesignSpread />}
            {isIntro && (
              <IntroSpread
                onOpenProject={handleOpenProject}
                onOpenPersonalProject={handleOpenPersonalProject}
              />
            )}
            {personalProject && (
              <PersonalSpread project={personalProject} index={chapterIndex} />
            )}
            {project && source && (
              <Spread
                project={project}
                index={chapterIndex}
                variant={variant}
                source={source}
                onVariant={handleVariantChange}
                onNotes={setDialog}
                reducedMotion={isReduced}
              />
            )}
          </BookCover>
          <BookRibbon
            isChapter={isChapter}
            isDesign={isDesign}
            onHome={handleOpenIntro}
          />
        </div>
        {isChapter && (
          <ChapterControls
            activeIndex={chapterIndex}
            bookProjects={bookProjects}
            onPrevious={() =>
              navigateChapter(chapterIndex - 1, { scroll: true })
            }
            onNext={() => navigateChapter(chapterIndex + 1, { scroll: true })}
          />
        )}
      </main>

      <p
        className="sr-only absolute size-px overflow-hidden [clip-path:inset(50%)]"
        role="status"
        aria-live="polite"
      >
        {isDesign
          ? spreadLabel
          : isIntro
            ? "Начало книги: личные и рабочие проекты"
            : `Глава ${chapterIndex + 1} из ${bookProjects.length}: ${bookProjects[chapterIndex].name}`}
      </p>

      {project && source && (
        <NotesDialog
          kind={dialog}
          name={project.name}
          body={source.body}
          onClose={closeDialog}
        />
      )}
    </div>
  )
}
