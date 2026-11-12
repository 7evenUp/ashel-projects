import { IdArt, XProgramArt, PrimeArt, AcademyArt } from "./InterfaceArt"
import { NutcrackerArt } from "./NutcrackerArt"
import { XmsArt } from "./XmsArt"
import { NutsFarmArt } from "./NutsFarmArt"

import type { Project, Variant } from "../types"

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
