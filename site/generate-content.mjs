import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs"

const notesDirectory = new URL("../projects-info/", import.meta.url)
const output = new URL("../src/data/source-notes.json", import.meta.url)
const header =
  /^Исходный код: (.+)\r?\nДеплой: (.+)\r?\nСтатус: (активный проект|проект в прошлом)\r?\n/

const filenames = readdirSync(notesDirectory, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
  .map((entry) => entry.name)
  .sort()

const sourceNotes = Object.fromEntries(
  filenames.map((filename) => {
    const text = readFileSync(
      new URL(filename, notesDirectory),
      "utf8"
    ).replaceAll("\r\n", "\n")
    const match = text.match(header)
    const body = match && text.slice(match[0].length).trim()
    if (!match || !body) {
      throw new Error(`Invalid project notes in projects-info/${filename}`)
    }

    const [, code, deploy, status] = match
    return [
      filename.slice(0, -3),
      {
        code: code.trim(),
        deploy: deploy.trim(),
        active: status === "активный проект",
        body,
      },
    ]
  })
)

const json = JSON.stringify(sourceNotes, null, 2) + "\n"
if (!existsSync(output) || readFileSync(output, "utf8") !== json) {
  writeFileSync(output, json)
}
console.log(`Prepared ${filenames.length} project stories.`)
