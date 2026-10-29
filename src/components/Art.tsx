import { IdArt, XProgramArt, PrimeArt, AcademyArt } from "./InterfaceArt"
import { NutcrackerArt } from "./NutcrackerArt"
import { XmsArt } from "./XmsArt"
import { NutsFarmArt } from "./NutsFarmArt"

import type { Project, SymbolName, Variant } from "../types"

import { cn } from "../lib/cn"

const paths = {
  key: (
    <>
      <circle cx="8" cy="8" r="4" />
      <path d="m11 11 9 9m-3-3 3-3m-6 0 3-3" />
    </>
  ),
  spark: (
    <>
      <path d="m12 2 2.8 7.2L22 12l-7.2 2.8L12 22l-2.8-7.2L2 12l7.2-2.8Z" />
    </>
  ),
  crown: (
    <>
      <path d="m3 6 4 4 5-6 5 6 4-4-2 13H5ZM5 16h14" />
    </>
  ),
  gift: (
    <>
      <path d="M3 10h18v4H3zm2 4v7h14v-7M12 10v11" />
      <path d="M12 10C3 10 4 2 8 4c2 1 4 6 4 6Zm0 0s2-5 4-6c4-2 5 6-4 6Z" />
    </>
  ),
  sword: (
    <>
      <path d="m5 19 3-3m-4-3 7 7m-3-6L18 3h3v3L10 16M3 19l2 2" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 3C9 1 2 6 5 14s16 4 15-11ZM4 21 15 9M8 16v-6m0 6h6" />
    </>
  ),
  book: (
    <>
      <path d="M12 5v16M12 5C8 2 4 3 2 4v15c4-1 7 0 10 2 3-2 6-3 10-2V4c-2-1-6-2-10 1Z" />
    </>
  ),
  code: (
    <>
      <path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 19 19 5M5 5h14v14" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3" />
    </>
  ),
  check: (
    <>
      <path d="m5 12 4 4L19 6" />
    </>
  ),
  dumbbell: (
    <>
      <path d="m6 6 12 12M3 7l4-4m10 18 4-4M5 9l4-4m6 14 4-4M3 5l2-2m14 18 2-2" />
      <path d="m2 6 4-4 4 4-4 4Zm12 12 4-4 4 4-4 4Z" />
    </>
  ),
  copy: (
    <>
      <rect x="8" y="8" width="12" height="13" rx="2" />
      <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
    </>
  ),
}
export function Icon({
  name,
  className = "",
}: {
  name: SymbolName
  className?: string
}) {
  return (
    <svg
      className={cn(
        "icon size-5.5 align-middle [a_&]:size-4.5 [a_&]:flex-none [button_&]:size-4.5 [button_&]:flex-none",
        className
      )}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}
export function Art({
  project,
  variant = "web",
}: {
  project: Project
  variant?: Variant
}) {
  switch (project.illustration) {
    case "id-ui":
      return <IdArt />
    case "partner-ui":
      return <XProgramArt />
    case "prime-ui":
      return <PrimeArt />
    case "academy-ui":
      return <AcademyArt mini={variant === "mini"} />
    case "nft-assembly":
      return <NutcrackerArt />
    case "winter-quest":
      return <XmsArt />
    case "farming":
      return <NutsFarmArt />
  }
}
