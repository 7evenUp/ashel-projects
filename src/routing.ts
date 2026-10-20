import { projects } from "./data/projects"
import { personalProjects } from "./data/profile"
import type { Route } from "./types"

export const parseRoute = (hash: string): Route => {
  const [id, mode] = hash.replace(/^#/, "").split("/")

  if (id === "personal") {
    const index = personalProjects.findIndex((project) => project.id === mode)

    return index < 0 ? { page: "intro" } : { page: "personal", index }
  }

  const index = projects.findIndex((project) => project.id === id)

  if (index < 0) return { page: "intro" }

  return {
    page: "project",
    index,
    mode: id === "academy" && mode === "mini" ? "mini" : "web",
  }
}
export const routeHash = (route: Route) => {
  if (route.page === "intro") return "#intro"

  if (route.page === "personal")
    return `#personal/${personalProjects[route.index].id}`

  return `#${projects[route.index].id}${route.mode === "mini" ? "/mini" : ""}`
}
