import { compositionStyle, compositions } from "./data/compositions"
import { projects } from "./data/projects"
import { personalProjects } from "./data/profile"

import type { ProjectRoute, Route, Variant } from "./types"

export const projectViewId = (id: string, variant: Variant) =>
  variant === "mini" ? id + "-mini" : id

export const parseRoute = (hash: string): Route => {
  const [id, mode] = hash.replace(/^#/, "").split("/")

  if (id === "design") return { page: "design" }

  if (id === "personal") {
    const index = personalProjects.findIndex((project) => project.id === mode)

    return index < 0 ? { page: "intro" } : { page: "personal", index }
  }

  const index = projects.findIndex((project) => project.id === id)

  if (index < 0) return { page: "intro" }

  return {
    page: "project",
    index,
    mode: projects[index].mini && mode === "mini" ? "mini" : "web",
  }
}

export const routePosition = (route: Route) =>
  route.page === "personal" || route.page === "project" ? route.index : -1

export function chapterRoute(route: Route, index: number): Route | null {
  if (route.page === "design" || index < -1) return null
  if (index === -1) return { page: "intro" }

  if (route.page === "personal") {
    return index < personalProjects.length ? { page: "personal", index } : null
  }

  return index < projects.length
    ? { page: "project", index, mode: "web" }
    : null
}

export function getProjectView(route: ProjectRoute) {
  const project = projects[route.index]
  return route.mode === "mini" && project.mini
    ? { ...project, ...project.mini }
    : project
}

export function routeTheme(route: Route) {
  if (route.page === "design") return
  if (route.page === "personal") {
    const { color, pale } = personalProjects[route.index]
    return compositionStyle(compositions.nutsfarm, color, pale)
  }

  const { id, color, pale } =
    projects[route.page === "project" ? route.index : 0]
  const viewId = projectViewId(
    id,
    route.page === "project" ? route.mode : "web"
  )
  return compositionStyle(compositions[viewId], color, pale)
}
export const routeHash = (route: Route) => {
  if (route.page === "intro") return "#intro"
  if (route.page === "design") return "#design"

  if (route.page === "personal")
    return `#personal/${personalProjects[route.index].id}`

  return `#${projects[route.index].id}${route.mode === "mini" ? "/mini" : ""}`
}
