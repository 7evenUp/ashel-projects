import { useRef } from "react"
import type { TouchEvent } from "react"

export function useBookSwipe(onSwipe: (step: number) => void) {
  const touch = useRef<{ id: number; x: number; y: number } | null>(null)

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const point = event.touches[0]
    touch.current =
      event.touches.length === 1 &&
      event.target instanceof Element &&
      !event.target.closest("a,button")
        ? { id: point.identifier, x: point.clientX, y: point.clientY }
        : null
  }

  const clearTouch = () => {
    touch.current = null
  }

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touch.current
    clearTouch()
    if (!start) return

    const end = Array.from(event.changedTouches).find(
      (point) => point.identifier === start.id
    )
    if (!end) return

    const dx = end.clientX - start.x
    const dy = end.clientY - start.y
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.8) {
      onSwipe(dx < 0 ? 1 : -1)
    }
  }

  return {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onTouchCancel: clearTouch,
  }
}
