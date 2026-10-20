import { useLayoutEffect, useRef } from "react"
import type { ThemeStyle } from "../types"

// Copies are purely visual: keep them out of focus order and the accessibility tree.
let copySerial = 0
export function copyPage(page: Element) {
  const copy = page.cloneNode(true) as HTMLElement
  const prefix = `leaf-${++copySerial}-`
  const svgIds = new Map<string, string>()
  copy.removeAttribute("id")
  copy.querySelectorAll("[id]").forEach((element) => {
    if (element instanceof SVGElement) {
      const id = element.id
      svgIds.set(id, prefix + id)
      element.id = prefix + id
    } else element.removeAttribute("id")
  })
  copy.querySelectorAll("svg,svg *").forEach((element) => {
    for (const attribute of [...element.attributes]) {
      let value = attribute.value.replace(
        /url\(#([^)]+)\)/g,
        (_match, id: string) => `url(#${svgIds.get(id) ?? id})`
      )
      if (
        (attribute.name === "href" || attribute.name === "xlink:href") &&
        value.startsWith("#")
      )
        value = "#" + (svgIds.get(value.slice(1)) ?? value.slice(1))
      if (value !== attribute.value) element.setAttribute(attribute.name, value)
    }
  })
  copy
    .querySelectorAll("[aria-labelledby],[aria-controls]")
    .forEach((element) => {
      element.removeAttribute("aria-labelledby")
      element.removeAttribute("aria-controls")
    })
  return copy
}

export type Turn = {
  direction: number
  serial: number
  front: HTMLElement
  resting: HTMLElement
  style: ThemeStyle
}

export function PageTurn({
  turn,
  book,
  onFinish,
}: {
  turn: Turn
  book: HTMLDivElement | null
  onFinish: () => void
}) {
  const front = useRef<HTMLDivElement>(null)
  const back = useRef<HTMLDivElement>(null)
  const resting = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    front.current?.replaceChildren(turn.front)
    resting.current?.replaceChildren(turn.resting)
    const destination = book?.querySelector(
      turn.direction > 0 ? ".page-left" : ".page-right"
    )
    if (destination) back.current?.replaceChildren(copyPage(destination))
  }, [turn, book])
  return (
    <div className="turn-scene" aria-hidden="true" inert>
      <div ref={resting} className="turn-resting" style={turn.style} />
      <div className="turn-cast-shadow" />
      <div
        className="page-turn"
        onAnimationEnd={(event) => {
          if (event.target === event.currentTarget) onFinish()
        }}
      >
        <div ref={front} className="turn-face turn-front" style={turn.style} />
        <div ref={back} className="turn-face turn-back" />
      </div>
    </div>
  )
}
