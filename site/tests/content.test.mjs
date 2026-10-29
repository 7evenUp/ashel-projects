import { test } from "vitest"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { projects } from "../../src/data/projects"
import sourceNotes from "../../src/data/source-notes.json"

test("Every supplied project is represented once, with its original links and full story", () => {
  assert.equal(projects.length, 7)
  assert.equal(new Set(projects.map((p) => p.id)).size, 7)
  assert.equal(sourceNotes.length, projects.length)
  projects.forEach((project, i) => {
    const original = readFileSync(
      new URL(`../../projects-info/project-${i + 1}.md`, import.meta.url),
      "utf8"
    )
    assert.equal(
      sourceNotes[i].code,
      original.match(/Исходный код: (.+)/)[1].trim()
    )
    assert.equal(
      sourceNotes[i].deploy,
      original.match(/Деплой: (.+)/)[1].trim()
    )
    assert.equal(
      sourceNotes[i].body,
      original
        .replace(/^Исходный код:.*\r?\nДеплой:.*\r?\nСтатус:.*\r?\n/, "")
        .trim()
    )
    assert.equal(project.active, original.includes("Статус: активный проект"))
  })
})

test("All chapters contain the PRD information, including both Academy experiences", () => {
  for (const project of [...projects, projects.at(-1).mini]) {
    for (const field of ["name", "category", "tagline", "description", "role"])
      assert.ok(project[field]?.length, `${project.name}: ${field}`)
    assert.ok(project.contribution.length >= 3)
    assert.ok(project.cases.length >= 3)
    assert.ok(project.stack.length >= 3)
  }
  assert.match(sourceNotes[6].body, /Academy TMA/)
  assert.equal(sourceNotes[6].code, "NDA")
})

test("External links use HTTPS and NDA does not become a fake repository link", () => {
  for (const { code, deploy } of sourceNotes) {
    assert.equal(new URL(deploy).protocol, "https:")
    if (code !== "NDA") {
      assert.equal(new URL(code).protocol, "https:")
      assert.equal(new URL(code).hostname, "github.com")
    }
  }
})

test("Portfolio copy does not reintroduce decorative slogans", () => {
  const paths = [
    "src/App.tsx",
    "src/components/IntroSpread/IntroSpread.tsx",
    "src/components/Spread.tsx",
    "src/components/PersonalSpread/PersonalSpread.tsx",
    "src/data/profile.ts",
    "src/data/projects.ts",
    "src/components/InterfaceArt.tsx",
    "src/components/NutsFarmArt.tsx",
    "src/components/NutcrackerArt.tsx",
    "src/components/XmsArt.tsx",
    "src/components/PersonalSpread/AgentSkillArt.tsx",
    "src/components/PersonalSpread/GymArt.tsx",
  ]
  const copy = paths
    .map((path) =>
      readFileSync(new URL(`../../${path}`, import.meta.url), "utf8")
    )
    .join("\n")
  for (const phrase of [
    "Можно свернуть с тропинки",
    "своя история",
    "Два режима. Один разработчик.",
    "Ради интереса.",
    "На результат.",
    "Задачи со звёздочкой",
    "Об этом приключении",
    "В моём рюкзаке",
    "Редкие находки",
    "Личная идея → рабочий код",
    "Знания открывают новые миры",
    "Каждый подход имеет значение",
    "к общему росту",
    "целая экосистема возможностей",
    "в карманном формате",
  ]) {
    assert.ok(!copy.includes(phrase), `Remove decorative copy: ${phrase}`)
  }
})
