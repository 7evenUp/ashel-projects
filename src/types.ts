import type { CSSProperties } from "react"
export type SymbolName =
  | "key"
  | "spark"
  | "crown"
  | "gift"
  | "sword"
  | "leaf"
  | "book"
  | "code"
  | "arrow"
  | "lock"
  | "check"
  | "dumbbell"
  | "copy"
export type IllustrationName =
  | "id-ui"
  | "partner-ui"
  | "prime-ui"
  | "academy-ui"
  | "winter-quest"
  | "nft-assembly"
  | "farming"

export interface ProjectContent {
  name: string
  category: string
  tagline: string
  description: string
  role: string
  contribution: string[]
  cases: [string, string][]
  stack: string[]
}
export interface Project extends ProjectContent {
  id: string
  label: string
  symbol: SymbolName
  color: string
  pale: string
  active: boolean
  illustration: IllustrationName
  mini?: ProjectContent
}
export type Variant = "web" | "mini"
export type ProjectRoute = { page: "project"; index: number; mode: Variant }
export type Route =
  { page: "intro" } | { page: "personal"; index: number } | ProjectRoute
export interface Composition {
  about: number
  contribution: number
  cases: number
  tape: number
  contributionTape: number
  artifact: number
  x: number
  y: number
  starX: number
  starY: number
  arrow: number
  annotation: number
}
export type ThemeStyle = CSSProperties & Record<`--${string}`, string | number>
