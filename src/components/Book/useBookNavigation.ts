import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react"
import { flushSync } from "react-dom"

import { captureTurn } from "../PageTurn"
import { useBookSwipe } from "./useBookSwipe"

import {
  chapterRoute,
  parseRoute,
  routeHash,
  routePosition,
  routeTheme,
} from "../../routing"

import type { Turn } from "../PageTurn"
import type { Route } from "../../types"

export const mobileBookQuery = "(max-width: 800px)"
const reducedMotionQuery = "(prefers-reduced-motion: reduce)"

const subscribeToReducedMotion = (onChange: () => void) => {
  const media = window.matchMedia(reducedMotionQuery)
  media.addEventListener("change", onChange)
  return () => media.removeEventListener("change", onChange)
}

const getReducedMotion = () => window.matchMedia(reducedMotionQuery).matches

type NavigationOptions = { animate?: boolean; scroll?: boolean }

export function useBookNavigation({
  isDialogOpen,
  onRouteChange,
}: {
  isDialogOpen: boolean
  onRouteChange: () => void
}) {
  const [route, setRoute] = useState(() => parseRoute(location.hash))
  const currentRoute = useRef(route)
  const codeRoute = useRef<Route>(
    route.page === "design" ? { page: "intro" } : route
  )
  const book = useRef<HTMLDivElement>(null)

  const isReduced = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion
  )
  const [turn, setTurn] = useState<Turn | null>(null)
  const turnSerial = useRef(0)
  const modeTransition = useRef<ViewTransition | null>(null)

  const applyRoute = useCallback(
    (next: Route, animate = true) => {
      const previous = currentRoute.current
      if (routeHash(next) === routeHash(previous)) return

      const isModeChange = previous.page === "design" || next.page === "design"
      const direction = Math.sign(routePosition(next) - routePosition(previous))
      const style = routeTheme(previous)
      const nextTurn =
        animate &&
        !isReduced &&
        !isModeChange &&
        direction &&
        book.current &&
        style
          ? captureTurn(
              book.current,
              direction,
              style,
              ++turnSerial.current,
              window.matchMedia(mobileBookQuery).matches
            )
          : null

      currentRoute.current = next
      if (next.page !== "design") codeRoute.current = next
      setRoute(next)
      setTurn(nextTurn)
      onRouteChange()

      if (!isModeChange && next.page !== previous.page) {
        requestAnimationFrame(() => {
          if (currentRoute.current === next)
            book.current?.focus({ preventScroll: true })
        })
      }
    },
    [isReduced, onRouteChange]
  )

  const navigate = useCallback(
    (
      next: Route,
      { animate = true, scroll = false }: NavigationOptions = {}
    ) => {
      const hash = routeHash(next)
      if (hash === routeHash(currentRoute.current)) return

      history.pushState(null, "", hash)
      applyRoute(next, animate)

      if (scroll && window.matchMedia(mobileBookQuery).matches) {
        window.scrollTo({ top: 0, behavior: isReduced ? "instant" : "smooth" })
      }
    },
    [applyRoute, isReduced]
  )

  const navigateChapter = useCallback(
    (index: number, options?: NavigationOptions) => {
      const next = chapterRoute(currentRoute.current, index)
      if (next) navigate(next, options)
    },
    [navigate]
  )

  useEffect(() => {
    const restoreRoute = () => {
      modeTransition.current?.skipTransition()
      applyRoute(parseRoute(location.hash))
    }
    window.addEventListener("popstate", restoreRoute)
    window.addEventListener("hashchange", restoreRoute)
    return () => {
      window.removeEventListener("popstate", restoreRoute)
      window.removeEventListener("hashchange", restoreRoute)
    }
  }, [applyRoute])

  useEffect(() => {
    if (isReduced) {
      modeTransition.current?.skipTransition()
      setTurn(null)
    }
  }, [isReduced])

  const isDesign = route.page === "design"

  useEffect(() => {
    if (isDesign || isDialogOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return

      const target = event.target instanceof Element ? event.target : null
      if (
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        target?.closest('input,textarea,select,[contenteditable="true"]')
      )
        return

      event.preventDefault()
      const step = event.key === "ArrowRight" ? 1 : -1
      navigateChapter(routePosition(currentRoute.current) + step, {
        animate: false,
      })

      target
        ?.closest(".bookmark")
        ?.parentElement?.querySelector<HTMLButtonElement>(
          `[data-project="${routePosition(currentRoute.current)}"]`
        )
        ?.focus()
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isDesign, isDialogOpen, navigateChapter])

  const handleModeChange = () => {
    if (modeTransition.current) return

    const next: Route = isDesign ? codeRoute.current : { page: "design" }
    const changeMode = () => {
      navigate(next, { animate: false })
      window.scrollTo({ top: 0, behavior: "instant" })
    }

    if (isReduced || !document.startViewTransition) {
      changeMode()
      return
    }

    const root = document.documentElement
    const fromHash = location.hash
    root.dataset.modeTransition = isDesign ? "close" : "open"
    const transition = document.startViewTransition(() => {
      if (location.hash !== fromHash) return

      flushSync(changeMode)
    })
    modeTransition.current = transition

    const finish = () => {
      delete root.dataset.modeTransition
      modeTransition.current = null
    }
    void transition.finished.then(finish, finish)
  }

  const touchHandlers = useBookSwipe((step) => {
    navigateChapter(routePosition(currentRoute.current) + step, {
      scroll: true,
    })
  })

  const finishTurn = (serial: number) =>
    setTurn((current) => (current?.serial === serial ? null : current))

  return {
    book,
    route,
    turn,
    isReduced,
    navigate,
    navigateChapter,
    handleModeChange,
    finishTurn,
    touchHandlers,
  }
}
