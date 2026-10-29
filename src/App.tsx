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

import { cn } from "./lib/cn"

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
    <div
      className="game-world relative isolate min-h-[100svh] [&_>_.desk]:z-[1]"
      style={routeStyle(route)}
    >
      <a
        className={cn(
          "skip-link",
          "[&:not(:focus)]:absolute [&:not(:focus)]:size-px [&:not(:focus)]:overflow-hidden [&:not(:focus)]:[clip-path:inset(50%)]",
          "[&:focus]:fixed [&:focus]:top-3 [&:focus]:left-3 [&:focus]:z-[100] [&:focus]:bg-white [&:focus]:p-3"
        )}
        href="#spread"
        onClick={handleSkipToSpread}
      >
        К развороту
      </a>
      <TableScenery />
      <main
        className={cn(
          "desk relative m-auto max-w-325 px-10.5 pt-24.5 pb-6.25",
          "min-[1450px]:pt-27.5",
          "max-[1101px]:pt-22.5 max-[1101px]:pr-6.25 max-[1101px]:pl-6.25",
          "max-[801px]:max-w-152.5 max-[801px]:px-4 max-[801px]:pt-0 max-[801px]:pb-5.75",
          isIntro
            ? "intro-desk pt-12 max-[1101px]:pt-12 max-[801px]:pt-5 min-[1450px]:pt-12"
            : "project-desk pl-[clamp(42px,_calc(746px_-_50vw),_96px)] max-[1101px]:pl-[clamp(42px,calc(746px-50vw),96px)] max-[801px]:pl-12"
        )}
      >
        <div className="book-shell relative isolate">
          {!isIntro && (
            <nav
              ref={tabs}
              className={cn(
                "bookmarks absolute right-8 bottom-[calc(100%_-_3px)] left-8 z-[-1] flex items-end justify-between gap-2",
                "max-[1101px]:right-5.5 max-[1101px]:left-5.5",
                "max-[801px]:sticky max-[801px]:top-0 max-[801px]:right-auto max-[801px]:bottom-auto max-[801px]:left-auto max-[801px]:z-[20] max-[801px]:[scroll-padding-inline:4px] max-[801px]:[scrollbar-width:none] max-[801px]:items-stretch max-[801px]:justify-start max-[801px]:gap-1.25 max-[801px]:[overflow-x:auto] max-[801px]:bg-[#e8e6df] max-[801px]:px-1 max-[801px]:pt-[calc(10px_+_env(safe-area-inset-top,_0px))] max-[801px]:pb-0",
                "max-[391px]:sticky max-[391px]:top-0 max-[391px]:right-auto max-[391px]:bottom-auto max-[391px]:left-auto max-[391px]:z-[20] max-[391px]:[scroll-padding-inline:4px] max-[391px]:[scrollbar-width:none] max-[391px]:items-stretch max-[391px]:justify-start max-[391px]:gap-1.25 max-[391px]:[overflow-x:auto] max-[391px]:bg-[#e8e6df] max-[391px]:px-1 max-[391px]:pt-[calc(10px_+_env(safe-area-inset-top,_0px))] max-[391px]:pb-0",
                "max-[801px]:[&::-webkit-scrollbar]:hidden",
                "max-[801px]:[&_.bookmark]:h-14.5 max-[801px]:[&_.bookmark]:[flex:0_0_82px] max-[801px]:[&_.bookmark]:touch-manipulation max-[801px]:[&_.bookmark]:px-1.25 max-[801px]:[&_.bookmark]:pt-2.5 max-[801px]:[&_.bookmark]:pb-2 max-[801px]:[&_.bookmark]:text-[12px] max-[801px]:[&_.bookmark]:select-none max-[801px]:[&_.bookmark]:[-webkit-user-select:none] max-[801px]:[&_.bookmark]:[transition:none]",
                "max-[801px]:[&_.bookmark:hover]:h-14.5 max-[801px]:[&_.bookmark:hover]:[filter:none]",
                "max-[801px]:[&_.bookmark[aria-current='page']]:h-14.5 max-[801px]:[&_.bookmark[aria-current='page']]:shadow-[inset_0_-3px_0_currentColor] max-[801px]:[&_.bookmark[aria-current='page']]:[filter:none]",
                "max-[801px]:[&_.bookmark:active]:[filter:brightness(0.94)]",
                "max-[801px]:[&_.bookmark:focus-visible]:[outline-offset:-3px]",
                isPersonal &&
                  "bookmarks-personal min-[801px]:justify-start min-[801px]:[&_.bookmark]:[flex:0_1_180px]"
              )}
              aria-label={isPersonal ? "Личные проекты" : "Проекты"}
            >
              {bookProjects.map((item, index) => (
                <button
                  key={item.id}
                  className={cn(
                    "bookmark relative flex h-13.25 min-w-0 flex-1 items-center justify-center gap-2 rounded-[7px_7px_0_0] border-[1px] [border-bottom-width:0px] border-solid [border-bottom-style:none] border-[rgba(0,_0,_0,_0.086)] [border-bottom-color:currentcolor] bg-[color:var(--tab)] [background-image:var(--paper-grain)] px-2.25 pt-4 pb-4.5 text-[15px] whitespace-nowrap text-[#514e48] shadow-[inset_0_2px_#ffffff38] [transition:height_0.22s,_filter_0.2s,_transform_0.2s]",
                    "max-[1101px]:gap-1.25 max-[1101px]:text-[12px]",
                    "max-[801px]:h-11.25 max-[801px]:flex-col max-[801px]:gap-0.75 max-[801px]:px-0.75 max-[801px]:py-2.75 max-[801px]:text-[10px]",
                    "max-[391px]:h-11.25 max-[391px]:flex-col max-[391px]:gap-0.75 max-[391px]:px-0.75 max-[391px]:py-2.75 max-[391px]:text-[9px]",
                    "[&_.icon]:size-4.5",
                    "max-[801px]:[&_.icon]:size-3.75",
                    "max-[391px]:[&_.icon]:size-3.5",
                    "hover:h-15.25 hover:[filter:brightness(1.03)]",
                    "max-[801px]:hover:h-13",
                    "[&[aria-current='page']]:h-17.25 [&[aria-current='page']]:bg-[color:var(--tab-strong)] [&[aria-current='page']]:font-medium [&[aria-current='page']]:text-[#fffef8]",
                    "max-[801px]:[&[aria-current='page']]:h-15",
                    "[&[aria-current='page']:after]:absolute [&[aria-current='page']:after]:top-1.75 [&[aria-current='page']:after]:right-2.5 [&[aria-current='page']:after]:left-2.5 [&[aria-current='page']:after]:[border-top-width:1px] [&[aria-current='page']:after]:[border-top-style:dashed] [&[aria-current='page']:after]:[border-top-color:rgba(255,_255,_255,_0.376)] [&[aria-current='page']:after]:content-['']",
                    "max-[801px]:[&[aria-current='page']:after]:right-1.25 max-[801px]:[&[aria-current='page']:after]:left-1.25",
                    "[&[data-project-id='crypton-id'][aria-current='page']]:bg-[#fbede5] [&[data-project-id='crypton-id'][aria-current='page']]:bg-none",
                    "[&[data-project-id='in-prime'][aria-current='page']]:bg-[#fff1cf] [&[data-project-id='in-prime'][aria-current='page']]:bg-none",
                    "[&[data-project-id='academy'][aria-current='page']]:bg-[#f0e8ff] [&[data-project-id='academy'][aria-current='page']]:bg-none",
                    "[&:is(_[data-project-id='crypton-id'],_[data-project-id='in-prime'],_[data-project-id='academy']_)[aria-current='page']]:text-[#463d50]",
                    "[&:is(_[data-project-id='crypton-id'],_[data-project-id='in-prime'],_[data-project-id='academy']_)[aria-current='page']:after]:[border-top-color:#463d5059]"
                  )}
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
            className={cn(
              "book-cover relative rounded-[11px_10px_14px_13px] border-[7px] [border-top-width:6px] border-solid border-[#626b56] bg-[#59614e] px-0.5 pt-0 pb-2.25 shadow-[inset_0_0_0_1px_#e3e3bb50,_0_2px_2px_#31382a60,_0_15px_18px_-9px_#37342e65,_0_38px_65px_-24px_#35312860]",
              "max-[801px]:border-[5px] max-[801px]:pr-px max-[801px]:pb-2 max-[801px]:pl-px",
              "before:absolute before:top-1.75 before:right-px before:-bottom-px before:left-px before:[transform:translateY(3px)] before:rounded-[4px_4px_8px_8px] before:shadow-[0_2px_2px_#34322b50,_2px_0_0_#dbd1b9,_-2px_0_0_#d4cbb5] before:content-[''] before:[background:repeating-linear-gradient(_0deg,_#c0b69e_0_1px,_#eee7d5_1px_3px,_#ded4bc_3px_4px,_#faf4e5_4px_6px_)]",
              turn &&
                (turn.direction > 0 ? "turning-forward" : "turning-backward")
            )}
          >
            <div
              className={cn(
                "binding-stitches pointer-events-none absolute top-3 bottom-5 left-[calc(50%_-_2px)] z-[7] w-1 opacity-[0.7] [background:repeating-linear-gradient(_0deg,_transparent_0_65px,_#e6dbc0_65px_73px,_#796c4d_73px_75px,_transparent_75px_142px_)]",
                "max-[801px]:hidden"
              )}
              aria-hidden="true"
            />
            <div
              className={cn(
                "cover-corner corner-tl pointer-events-none absolute -top-1 -left-1.25 z-[8] size-6 rounded-[5px_0_0] border-[1px] border-solid border-[rgba(193,_172,_107,_0.5)] shadow-[1px_2px_3px_#453c3025] [background:linear-gradient(_135deg,_#d3bd7b,_#9c874e_40%,_#e1d298_50%,_#8e7949_)] [clip-path:polygon(0_0,_100%_0,_0_100%)]"
              )}
              aria-hidden="true"
            />
            <div
              className={cn(
                "cover-corner corner-br pointer-events-none absolute -right-1.25 -bottom-1.25 z-[8] size-6 rounded-[0_0_6px] border-[1px] border-solid border-[rgba(193,_172,_107,_0.5)] shadow-[1px_2px_3px_#453c3025] [background:linear-gradient(_135deg,_#d3bd7b,_#9c874e_40%,_#e1d298_50%,_#8e7949_)] [clip-path:polygon(100%_0,_100%_100%,_0_100%)]"
              )}
              aria-hidden="true"
            />

            <div
              ref={book}
              className={cn(
                "book relative grid min-h-184.5 grid-cols-2 rounded-[4px_4px_5px_5px] bg-[#f4efdf] [outline:none] [perspective:2000px]",
                "min-[801px]:grid-cols-2",
                "min-[1450px]:min-h-191.5",
                "max-[1101px]:min-h-188.75",
                "max-[801px]:min-h-0 max-[801px]:[scroll-margin-top:calc(78px_+_env(safe-area-inset-top,_0px))] max-[801px]:grid-cols-[1fr]",
                "after:pointer-events-none after:absolute after:top-0 after:bottom-0 after:left-[50%] after:z-[6] after:w-17.5 after:[transform:translateX(-50%)] after:content-[''] after:[background:linear-gradient(_90deg,_transparent,_#7d6d4820_30%,_#51462d45_47%,_#4038224d_49%,_#fffbeccc_51%,_#ac997135_56%,_transparent_)]",
                "max-[801px]:after:hidden"
              )}
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
            <div
              className={cn(
                "ribbon absolute -bottom-9.25 left-[calc(50%_+_60px)] z-[-1] h-16.5 w-6.75 [transform:rotate(-3deg)] bg-[#a18eaf] shadow-[3px_2px_6px_#6c52643b] [clip-path:polygon(0_0,_100%_0,_100%_100%,_50%_83%,_0_100%)]",
                "max-[801px]:right-10.5 max-[801px]:left-auto",
                "after:absolute after:top-0 after:right-1 after:bottom-0 after:left-1 after:[border-right-width:1px] after:[border-left-width:1px] after:[border-right-style:solid] after:[border-left-style:solid] after:[border-right-color:rgb(196,_182,_206)] after:[border-left-color:rgb(196,_182,_206)] after:content-['']"
              )}
              aria-hidden="true"
            />
          ) : (
            <div
              className={cn(
                "home-ribbon-rail pointer-events-none absolute top-27.5 bottom-0 -left-22 z-[-1] w-26",
                "max-[801px]:top-25 max-[801px]:-left-9.5 max-[801px]:w-12"
              )}
            >
              <button
                className={cn(
                  "home-ribbon pointer-events-auto relative flex h-11 w-26 touch-manipulation items-center justify-center gap-2 border-0 border-none border-[currentcolor] bg-[#8d789c] py-2 pr-3 pl-5 text-[#fff5e7] shadow-[inset_-3px_0_5px_#44334f40] select-none [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%,_12%_50%)]",
                  "max-[801px]:sticky max-[801px]:top-[calc(84px_+_env(safe-area-inset-top,_0px))] max-[801px]:h-10 max-[801px]:w-12 max-[801px]:pr-2 max-[801px]:pl-3.5",
                  "before:pointer-events-none before:absolute before:top-1.25 before:right-0 before:bottom-1.25 before:left-3 before:[border-block-width:1px] before:[border-block-style:solid] before:[border-block-color:rgba(210,_194,_221,_0.44)] before:content-['']",
                  "[&_.icon]:size-4.25 [&_.icon]:shrink-0",
                  "[&_span]:text-[12px] [&_span]:tracking-[0.4px]",
                  "max-[801px]:[&_span]:hidden",
                  "focus-visible:bg-[#6b537f] focus-visible:[outline:none]",
                  "[&:focus-visible:before]:[outline:2px_solid_#fff5e7] [&:focus-visible:before]:[outline-offset:-3px]",
                  "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#756086]"
                )}
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
          <footer
            className={cn(
              "book-controls mx-auto mt-7.5 mb-0 flex max-w-145 items-center justify-between gap-6.25",
              "max-[801px]:mt-8 max-[801px]:hidden max-[801px]:gap-3",
              "max-[391px]:mt-8 max-[391px]:hidden max-[391px]:max-w-67.5 max-[391px]:gap-3"
            )}
          >
            <button
              className={cn(
                "page-button flex min-h-10.5 items-center gap-3 rounded-[5px] border-[1px] border-solid border-[rgb(185,_187,_172)] bg-[#ecece2bd] px-4.25 py-2.5 text-[13px] text-[#656d5a] shadow-[0_2px_0_#cccdc0] [transition:background_0.2s,_transform_0.2s]",
                "max-[801px]:gap-2 max-[801px]:px-3 max-[801px]:py-2.25 max-[801px]:text-[12px]",
                "enabled:hover:[transform:translateY(-1px)] enabled:hover:bg-[#dce1ce]",
                "disabled:opacity-[0.36] disabled:shadow-none",
                "[&_>_span:not(.nav-label)]:font-book [&_>_span:not(.nav-label)]:text-[22px] [&_>_span:not(.nav-label)]:leading-[1] [&_>_span:not(.nav-label)]:font-normal [&_>_span:not(.nav-label)]:not-italic"
              )}
              aria-label={
                activeIndex === 0 ? "Вернуться к выбору" : "Предыдущий проект"
              }
              onClick={handlePreviousProject}
            >
              <span aria-hidden="true">←</span>
              <span className="nav-label max-[391px]:hidden">
                {activeIndex === 0 ? "К началу" : "Назад"}
              </span>
            </button>

            <div className="reading-progress min-w-42.5 text-center max-[801px]:min-w-33">
              <span className="chapter-counter text-[10px] tracking-[1.8px] text-[#747568] max-[801px]:text-[9px]">
                ГЛАВА {String(activeIndex + 1).padStart(2, "0")} ИЗ{" "}
                {String(chapterCount).padStart(2, "0")}
              </span>
              <div
                className={cn(
                  "progress-dots mx-0 my-2.25 flex justify-center gap-1.75",
                  "[&_i]:size-1 [&_i]:rounded-full [&_i]:bg-[#c6c5b7]",
                  "[&_i.current]:w-3.75 [&_i.current]:rounded-[2px] [&_i.current]:bg-[#747f62]"
                )}
                aria-hidden="true"
              >
                {bookProjects.map((item, index) => (
                  <i
                    key={item.id}
                    className={index === activeIndex ? "current" : ""}
                  />
                ))}
              </div>
              <span className="keyboard-hint flex items-center justify-center gap-1.25 text-[10px] text-[#96988b] max-[801px]:text-[9px]">
                Переключать проекты{" "}
                <kbd className="rounded-[2px] border border-[#c1c2b7] px-0.75 py-0 font-commons text-[11px] leading-[normal] font-normal">
                  ←
                </kbd>{" "}
                <kbd className="rounded-[2px] border border-[#c1c2b7] px-0.75 py-0 font-commons text-[11px] leading-[normal] font-normal">
                  →
                </kbd>
              </span>
            </div>

            <button
              className={cn(
                "page-button flex min-h-10.5 items-center gap-3 rounded-[5px] border-[1px] border-solid border-[rgb(185,_187,_172)] bg-[#ecece2bd] px-4.25 py-2.5 text-[13px] text-[#656d5a] shadow-[0_2px_0_#cccdc0] [transition:background_0.2s,_transform_0.2s]",
                "max-[801px]:gap-2 max-[801px]:px-3 max-[801px]:py-2.25 max-[801px]:text-[12px]",
                "enabled:hover:[transform:translateY(-1px)] enabled:hover:bg-[#dce1ce]",
                "disabled:opacity-[0.36] disabled:shadow-none",
                "[&_>_span:not(.nav-label)]:font-book [&_>_span:not(.nav-label)]:text-[22px] [&_>_span:not(.nav-label)]:leading-[1] [&_>_span:not(.nav-label)]:font-normal [&_>_span:not(.nav-label)]:not-italic"
              )}
              disabled={activeIndex === chapterCount - 1}
              aria-label="Следующий проект"
              onClick={handleNextProject}
            >
              <span className="nav-label max-[391px]:hidden">Дальше</span>
              <span aria-hidden="true">→</span>
            </button>
          </footer>
        )}
      </main>

      <p
        className="sr-only absolute size-px overflow-hidden [clip-path:inset(50%)]"
        role="status"
        aria-live="polite"
      >
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
