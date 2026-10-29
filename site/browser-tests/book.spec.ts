import { test, expect } from "@playwright/test"
const chapters = [
  "crypton-id",
  "x-program",
  "in-prime",
  "web3-xms",
  "nutcracker",
  "nutsfarm",
  "academy",
  "academy/mini",
]

test("Personal projects open their own book, tabs, links, history, and keyboard navigation", async ({
  page,
}) => {
  const errors: string[] = []
  page.on("pageerror", (error) => errors.push(error.message))
  await page.goto("/")
  await page
    .getByRole("button", { name: "Открыть личные проекты", exact: true })
    .click()
  await expect(page).toHaveURL(/#personal\/ashel-gym$/)
  await expect(page.locator("#spread h1")).toHaveText("Ashel Gym")
  const nav = page.getByRole("navigation", {
    name: "Личные проекты",
    exact: true,
  })
  await expect(nav.getByRole("button")).toHaveCount(2)
  await expect(nav.locator("img")).toHaveCount(2)
  await expect
    .poll(() =>
      nav
        .locator("img")
        .evaluateAll((images) =>
          images.every(
            (image) =>
              (image as HTMLImageElement).complete &&
              (image as HTMLImageElement).naturalWidth > 0
          )
        )
    )
    .toBe(true)
  await expect(nav.locator('[aria-current="page"]')).toHaveAccessibleName(
    "Ashel Gym"
  )
  await expect(
    page
      .locator("#spread")
      .getByRole("link", { name: "Открыть превью", exact: true })
  ).toHaveAttribute(
    "href",
    "https://ashel-gym-web-preview.vercel.app/#/profile"
  )
  await expect(
    page
      .locator("#spread")
      .getByRole("link", { name: "Исходный код", exact: true })
  ).toHaveAttribute("href", "https://github.com/7evenUp/ashel-gym")
  await page.keyboard.press("ArrowRight")
  await expect(page).toHaveURL(/#personal\/ashel-front-style$/)
  await expect(page.locator("#spread h1")).toHaveText("Личный Skill")
  await expect(
    page
      .locator("#spread")
      .getByRole("link", { name: "Открыть на skills.sh", exact: true })
  ).toHaveAttribute(
    "href",
    "https://skills.sh/7evenup/ashel-skills/ashel-front-style"
  )
  await expect(
    page
      .locator("#spread")
      .getByRole("link", { name: "Исходный код", exact: true })
  ).toHaveAttribute("href", "https://github.com/7evenUp/ashel-skills")
  await expect(
    page.getByRole("button", { name: "Следующий проект", includeHidden: true })
  ).toBeDisabled()
  await page.keyboard.press("ArrowRight")
  await expect(page).toHaveURL(/#personal\/ashel-front-style$/)
  await page.goBack()
  await expect(page.locator("#spread h1")).toHaveText("Ashel Gym")
  await nav.getByRole("button", { name: "Личный Skill", exact: true }).click()
  await expect(page.locator("#spread h1")).toHaveText("Личный Skill")
  await page.reload()
  await expect(page.locator("#spread h1")).toHaveText("Личный Skill")
  await expect(nav.locator('[aria-current="page"]')).toHaveAccessibleName(
    "Личный Skill"
  )
  await page.getByRole("button", { name: "Начало книги", exact: true }).click()
  await expect(page).toHaveURL(/#intro$/)
  await page
    .getByRole("button", {
      name: "Открыть личный проект Личный Skill",
      exact: true,
    })
    .click()
  await expect(page).toHaveURL(/#personal\/ashel-front-style$/)
  await page.keyboard.press("ArrowLeft")
  await expect(page).toHaveURL(/#personal\/ashel-gym$/)
  await page.keyboard.press("ArrowLeft")
  await expect(page).toHaveURL(/#intro$/)
  expect(errors).toEqual([])
})

test("The skill install command copies to the clipboard and reports denied access", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"])
  await page.goto("/#personal/ashel-front-style")
  const copyButton = page.locator(".copy-command")
  await expect(copyButton).toHaveText("")
  const copyIcon = await copyButton.locator("svg").innerHTML()
  await page
    .getByRole("button", { name: "Копировать команду установки", exact: true })
    .click()
  await expect(
    page.getByRole("button", { name: "Команда скопирована", exact: true })
  ).toBeVisible()
  const command = await page.locator(".install-command code").innerText()
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    command
  )
  await expect(copyButton).toHaveText("")
  expect(await copyButton.locator("svg").innerHTML()).not.toBe(copyIcon)
  await expect(page.locator('.install-command [role="status"]')).toHaveCount(0)
  await expect(copyButton).toHaveAccessibleName("Копировать команду установки")
  expect(await copyButton.locator("svg").innerHTML()).toBe(copyIcon)

  await page.evaluate(() => {
    Object.defineProperty(navigator.clipboard, "writeText", {
      value: () => Promise.reject(new Error("Clipboard access denied")),
    })
  })
  await page
    .getByRole("button", { name: "Копировать команду установки", exact: true })
    .click()
  await expect(page.locator('.install-command [role="status"]')).toContainText(
    "Выделите команду и скопируйте вручную"
  )
  await expect(
    page.getByRole("button", {
      name: "Копировать команду установки",
      exact: true,
    })
  ).toBeEnabled()
})

test("Personal chapter layouts fit both book pages and all target widths", async ({
  page,
}, testInfo) => {
  const widths =
    testInfo.project.name === "mobile" ? [320, 375, 800] : [801, 1024, 1440]
  for (const width of widths) {
    await page.setViewportSize({ width, height: 1000 })
    for (const chapter of ["ashel-gym", "ashel-front-style"]) {
      await page.goto("/#personal/" + chapter)
      await expect(page.locator("#spread h1")).toBeVisible()
      await expect(page.locator(".turn-scene")).toHaveCount(0)
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth
        )
      ).toBe(true)
      for (const selector of [".page-left", ".page-right"]) {
        const content = page.locator("#spread " + selector)
        expect(
          await content.evaluate((el) => el.scrollWidth <= el.clientWidth)
        ).toBe(true)
        const previousBottom = await content
          .locator(".page-number")
          .evaluate(
            (el) => el.previousElementSibling!.getBoundingClientRect().bottom
          )
        const footer = (await content.locator(".page-number").boundingBox())!
        expect(previousBottom).toBeLessThanOrEqual(footer.y)
      }
      await page.screenshot({
        path: testInfo.outputPath(`${chapter}-${width}.png`),
        fullPage: true,
      })
    }
  }
})

test("The introductory spread opens first and links both sides to real projects", async ({
  page,
}, testInfo) => {
  const errors: string[] = []
  page.on("pageerror", (error) => errors.push(error.message))
  await page.goto("/")
  await expect(page).toHaveTitle("Артём — дневник frontend-разработчика")
  const intro = page.locator("#spread")
  await expect(intro.getByRole("heading", { name: "Артём" })).toBeVisible()
  await expect(
    intro.getByRole("heading", { name: "Проекты Crypton" })
  ).toBeVisible()
  await expect(intro).toContainText("Frontend-разработчик")
  await expect(intro).toContainText("программирую с 16 лет")
  await expect(
    intro.locator(".difficulty, .mode-eyebrow, .intro-folio")
  ).toHaveCount(0)
  await expect(intro).not.toContainText("Задачи со звёздочкой")
  await expect(intro.locator(".personal-page .campaign-project")).toHaveCount(2)
  await expect(
    intro.getByRole("button", { name: "Открыть личные проекты", exact: true })
  ).toBeVisible()
  await expect(intro.getByRole("link", { name: "Мой GitHub" })).toHaveAttribute(
    "href",
    "https://github.com/7evenUp"
  )
  expect(
    await intro
      .locator(".personal-page")
      .evaluate((el) => getComputedStyle(el).backgroundColor)
  ).not.toBe(
    await intro
      .locator(".work-page")
      .evaluate((el) => getComputedStyle(el).backgroundColor)
  )
  await page.screenshot({
    path: testInfo.outputPath("intro.png"),
    fullPage: true,
  })

  await page
    .getByRole("button", { name: "Открыть рабочие проекты", exact: true })
    .click()
  await expect(page).toHaveURL(/#crypton-id$/)
  await expect(
    intro.getByRole("heading", { name: "Crypton ID", exact: true })
  ).toBeVisible()
  await expect(intro).toBeFocused()
  await page.goBack()
  await expect(intro.getByRole("heading", { name: "Артём" })).toBeVisible()
  await page.goForward()
  await expect(
    intro.getByRole("heading", { name: "Crypton ID", exact: true })
  ).toBeVisible()
  await page.getByRole("button", { name: "Начало книги", exact: true }).click()
  await expect(page).toHaveURL(/#intro$/)
  await page.reload()
  await expect(intro.getByRole("heading", { name: "Артём" })).toBeVisible()
  await page
    .getByRole("button", { name: "Открыть проект Academy", exact: true })
    .click()
  await expect(page).toHaveURL(/#academy$/)
  await page.keyboard.press("ArrowLeft")
  await expect(page).toHaveURL(/#nutsfarm$/)
  await page.goto("/#intro")
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.keyboard.press("ArrowRight")
  await expect(page).toHaveURL(/#crypton-id$/)
  await page.keyboard.press("ArrowLeft")
  await expect(page).toHaveURL(/#intro$/)
  await expect(page.locator(".turn-scene")).toHaveCount(0)
  expect(errors).toEqual([])
})

test("The introductory spread fits desktop and phone layouts", async ({
  page,
}, testInfo) => {
  const widths =
    testInfo.project.name === "mobile" ? [320, 375, 800] : [801, 1024, 1440]
  for (const width of widths) {
    await page.setViewportSize({ width, height: 1000 })
    await page.goto("/#intro")
    const personal = page.locator("#spread .personal-page")
    const work = page.locator("#spread .work-page")
    await expect(personal.getByRole("heading", { name: "Артём" })).toBeVisible()
    const personalBox = (await personal.boundingBox())!
    const workBox = (await work.boundingBox())!
    if (width > 800) expect(personalBox.y).toBe(workBox.y)
    else
      expect(workBox.y).toBeGreaterThanOrEqual(
        personalBox.y + personalBox.height
      )
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth
      )
    ).toBe(true)
    for (const selector of [".personal-page", ".work-page"]) {
      const content = page.locator("#spread " + selector)
      expect(
        await content.evaluate((el) => el.scrollWidth <= el.clientWidth)
      ).toBe(true)
      const action = (await content.locator(".campaign-button").boundingBox())!
      const previous = await content
        .locator(".campaign-button")
        .evaluate(
          (el) => el.previousElementSibling!.getBoundingClientRect().bottom
        )
      expect(previous).toBeLessThanOrEqual(action.y)
      const pageBox = (await content.boundingBox())!
      expect(action.y + action.height).toBeLessThanOrEqual(
        pageBox.y + pageBox.height
      )
      for (const button of await content.locator("button").all()) {
        expect((await button.boundingBox())!.height).toBeGreaterThanOrEqual(44)
      }
    }
    await page.screenshot({
      path: testInfo.outputPath(`intro-${width}.png`),
      fullPage: true,
    })
  }
})

test("The work period is computed once per site load", async ({ page }) => {
  await page.clock.install({ time: new Date("2026-10-31T20:59:50Z") })
  await page.goto("/")
  const period = page.locator("#spread .experience-period")
  await expect(period).toHaveText("ноябрь 2022 - октябрь 2026")
  await page.clock.fastForward(10_000)
  await page.evaluate(() => {
    window.dispatchEvent(new Event("focus"))
    document.dispatchEvent(new Event("visibilitychange"))
  })
  await page
    .getByRole("button", { name: "Открыть рабочие проекты", exact: true })
    .click()
  await page.getByRole("button", { name: "Начало книги", exact: true }).click()
  await expect(period).toHaveText("ноябрь 2022 - октябрь 2026")

  await page.reload()
  await expect(period).toHaveText("ноябрь 2022 - ноябрь 2026")

  await page.clock.setSystemTime(new Date("2026-12-31T21:00:00Z"))
  await page.reload()
  await expect(period).toHaveText("ноябрь 2022 - январь 2027")
})

test("The home ribbon sits beside the book and returns to the opening spread", async ({
  page,
}, testInfo) => {
  const widths =
    testInfo.project.name === "mobile" ? [320, 375, 800] : [801, 1024, 1440]
  for (const width of widths) {
    await page.setViewportSize({ width, height: 1000 })
    await page.goto("/#crypton-id")
    await expect(page.locator("#spread h1")).toHaveText("Crypton ID")
    await expect(page.locator(".turn-scene")).toHaveCount(0)
    const home = page.getByRole("button", { name: "Начало книги", exact: true })
    const nav = page.getByRole("navigation", { name: "Проекты" })
    await expect(nav.getByRole("button")).toHaveCount(7)
    await expect(
      nav.getByRole("button", { name: "Начало книги", exact: true })
    ).toHaveCount(0)
    const ribbonBox = (await home.boundingBox())!
    const bookBox = (await page.locator(".book-cover").boundingBox())!
    expect(ribbonBox.x).toBeLessThan(bookBox.x)
    expect(ribbonBox.x + ribbonBox.width).toBeGreaterThan(bookBox.x)
    expect(ribbonBox.x).toBeGreaterThanOrEqual(0)
    expect(ribbonBox.width).toBeGreaterThan(ribbonBox.height)
    expect(
      await home
        .locator("span")
        .evaluate((el) => getComputedStyle(el).writingMode)
    ).toBe("horizontal-tb")
    expect(ribbonBox.x + ribbonBox.width).toBeLessThanOrEqual(width)
    expect(
      await page.evaluate(
        ({ x, y }) =>
          Boolean(document.elementFromPoint(x, y)?.closest(".home-ribbon")),
        {
          x: bookBox.x + 2,
          y: ribbonBox.y + ribbonBox.height / 2,
        }
      )
    ).toBe(false)
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth
      )
    ).toBe(true)
    await page.screenshot({
      path: testInfo.outputPath(`home-ribbon-${width}.png`),
      fullPage: true,
    })
    await home.focus()
    await page.keyboard.press("Enter")
    await expect(page).toHaveURL(/#intro$/)
    await expect(page.locator("#spread h1")).toHaveText("Артём")
  }
})

test("Printed page faces turn in both directions and cancel safely", async ({
  page,
}, testInfo) => {
  await page.goto("/#crypton-id")
  await page.getByRole("button", { name: "X-Program", exact: true }).click()
  const scene = page.locator(".turn-scene")
  await expect(scene).toHaveAttribute("inert", "")
  await page.locator(".page-turn").evaluate(async (el) => {
    const animations = el.parentElement!.getAnimations({ subtree: true })
    animations.forEach((animation) => animation.pause())
    await Promise.all(animations.map((animation) => animation.ready))
    animations.forEach((animation) => {
      animation.currentTime = matchMedia("(max-width:800px)").matches
        ? 140
        : 360
    })
    await new Promise(requestAnimationFrame)
  })
  await expect(scene.locator("[id]")).toHaveCount(0)
  await expect(page.locator(".turn-front")).toContainText("Мой вклад")
  await expect(page.locator(".turn-back")).toContainText("X-Program")
  if (testInfo.project.name === "desktop") {
    const hinge = await page
      .locator(".page-turn")
      .evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m11)
    expect(Math.abs(hinge)).toBeLessThan(0.7)
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth
      )
    ).toBe(true)
  }
  await page.screenshot({
    path: testInfo.outputPath("printed-page-mid-turn.png"),
    fullPage: true,
  })
  if (testInfo.project.name === "desktop") {
    await scene.evaluate((el) =>
      el.getAnimations({ subtree: true }).forEach((animation) => {
        animation.currentTime = 520
      })
    )
    await page.screenshot({
      path: testInfo.outputPath("printed-page-landing.png"),
      fullPage: true,
    })
  }
  await scene.evaluate((el) =>
    el
      .getAnimations({ subtree: true })
      .forEach((animation) => animation.finish())
  )
  await expect(scene).toHaveCount(0)
  await page.getByRole("button", { name: "Crypton ID", exact: true }).click()
  await expect(page.locator(".turning-backward .page-turn")).toHaveCount(1)
  await expect(page.locator(".turn-front")).toContainText("X-Program")
  await expect(page.locator(".turn-back")).toContainText("Мой вклад")
  await page.getByRole("button", { name: "In-Prime", exact: true }).click()
  await expect(page.locator("#spread h1")).toHaveText("In-Prime")
  await expect(page.locator(".page-turn")).toHaveCount(0)
  await page.getByRole("button", { name: "NutsFarm", exact: true }).click()
  await expect(page.locator(".turn-back linearGradient")).toHaveCount(3)
  expect(
    await page.evaluate(() => {
      const ids = [...document.querySelectorAll("[id]")].map((el) => el.id)
      return ids.length === new Set(ids).size
    })
  ).toBe(true)
  await page.getByRole("button", { name: "Crypton ID", exact: true }).click()
  await page.emulateMedia({ reducedMotion: "reduce" })
  await expect(scene).toHaveCount(0)
})
test("Mobile project tabs stay reachable while reading and return to the new chapter", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile navigation layout")
  for (const width of [320, 375, 800]) {
    await page.setViewportSize({ width, height: 812 })
    await page.goto("/#academy/mini")
    const nav = page.getByRole("navigation", { name: "Проекты" })
    const active = nav.locator('[aria-current="page"]')
    await expect(active).toHaveAccessibleName("Academy")
    const navBox = (await nav.boundingBox())!
    const activeBox = (await active.boundingBox())!
    expect(activeBox.x).toBeGreaterThanOrEqual(navBox.x)
    expect(activeBox.x + activeBox.width).toBeLessThanOrEqual(
      navBox.x + navBox.width
    )
    await page.evaluate(() => window.scrollTo(0, 900))
    await expect.poll(async () => (await nav.boundingBox())!.y).toBe(0)
    const home = page.getByRole("button", { name: "Начало книги", exact: true })
    await expect(home).toBeInViewport()
    expect((await home.boundingBox())!.y).toBeGreaterThanOrEqual(
      (await nav.boundingBox())!.height
    )
    await expect(page.locator(".book-controls")).toBeHidden()
    await nav.evaluate((el) => el.scrollTo({ left: 0, behavior: "instant" }))
    await nav.getByRole("button", { name: "Crypton ID", exact: true }).click()
    await expect(page.locator("#spread h1")).toHaveText("Crypton ID")
    await expect(nav.locator('[aria-current="page"]')).toHaveAccessibleName(
      "Crypton ID"
    )
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth
      )
    ).toBe(true)
  }
})
test("Academy variants stay above the title and reveal ink without turning the book", async ({
  page,
}) => {
  await page.goto("/#academy")
  const tabs = page.getByRole("group", { name: "Версия Academy" })
  await expect(tabs).toBeVisible()
  const before = await tabs.boundingBox()
  const heading = await page.locator("#spread h1").boundingBox()
  expect(before!.y + before!.height).toBeLessThan(heading!.y)
  await page
    .getByRole("button", { name: "Telegram + Base", exact: true })
    .click()
  await expect(page.locator("#spread h1")).toHaveText("Academy TMA")
  await expect(page.locator(".page-turn")).toHaveCount(0)
  expect((await tabs.boundingBox())!.y).toBe(before!.y)
  // Reverse while the short content reveal and tab highlight are still moving.
  await page.getByRole("button", { name: "Веб-платформа", exact: true }).click()
  await page
    .getByRole("button", { name: "Telegram + Base", exact: true })
    .click()
  await expect(page.locator("#spread h1")).toHaveText("Academy TMA")
  await expect
    .poll(() =>
      page
        .locator("#spread")
        .evaluate(
          (el) =>
            el
              .getAnimations({ subtree: true })
              .filter((a) => a.playState === "running").length
        )
    )
    .toBe(0)
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.getByRole("button", { name: "Веб-платформа", exact: true }).click()
  await expect(page.locator("#spread h1")).toHaveText("Academy")
  expect(
    await page
      .locator("#spread")
      .evaluate(
        (el) =>
          el
            .getAnimations({ subtree: true })
            .filter((a) => a.playState === "running").length
      )
  ).toBe(0)
  await page.goBack()
  await expect(page.locator("#spread h1")).toHaveText("Academy TMA")
  await expect(page.locator(".page-turn")).toHaveCount(0)
})
test("All views load with favicon, stable composition, and no overflow", async ({
  page,
}, testInfo) => {
  const errors: string[] = []
  page.on("pageerror", (e) => errors.push(e.message))
  for (const chapter of chapters) {
    await page.goto("/#" + chapter)
    await expect(page.locator("#spread h1")).toBeVisible()
    await expect(page.locator("#spread .project-heading img")).toHaveCount(0)
    await expect(page.locator(".bookmark img")).toHaveCount(7)
    await expect
      .poll(() =>
        page
          .locator(".bookmark img")
          .evaluateAll((images) =>
            images.every(
              (img) =>
                (img as HTMLImageElement).complete &&
                (img as HTMLImageElement).naturalWidth > 0
            )
          )
      )
      .toBe(true)
    await expect(
      page.locator('.bookmark[aria-current="page"] img')
    ).toHaveAttribute(
      "src",
      new RegExp(chapter === "academy/mini" ? "academy-mini" : chapter)
    )
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth
      )
    ).toBe(true)
    for (const [content, footer] of [
      [".stack", ".page-left .page-number"],
      [".notes-footer", ".page-right .page-number"],
    ]) {
      const contentBox = await page.locator("#spread " + content).boundingBox()
      const footerBox = await page.locator("#spread " + footer).boundingBox()
      expect(contentBox!.y + contentBox!.height).toBeLessThanOrEqual(
        footerBox!.y
      )
    }
    const angle = await page
      .locator("#spread .about-note")
      .evaluate((el) => getComputedStyle(el).transform)
    await page.reload()
    await expect(page.locator("#spread h1")).toBeVisible()
    expect(
      await page
        .locator("#spread .about-note")
        .evaluate((el) => getComputedStyle(el).transform)
    ).toBe(angle)
    await page.screenshot({
      path: testInfo.outputPath(chapter.replace("/", "-") + ".png"),
      fullPage: true,
    })
  }
  expect(errors).toEqual([])
})
test("Navigation, history, Academy variants, notes, and NDA", async ({
  page,
}) => {
  await page.goto("/#crypton-id")
  await expect(
    page.getByRole("button", {
      name: "Вернуться к выбору",
      includeHidden: true,
    })
  ).toBeEnabled()
  await page.keyboard.press("ArrowRight")
  await expect(page).toHaveURL(/#x-program$/)
  await page.goBack()
  await expect(page.locator("#spread h1")).toHaveText("Crypton ID")
  await page.getByRole("button", { name: "Academy", exact: true }).click()
  await expect(
    page.getByRole("button", { name: "Следующий проект", includeHidden: true })
  ).toBeDisabled()
  await page
    .getByRole("button", { name: "Telegram + Base", exact: true })
    .click()
  await expect(page).toHaveURL(/#academy\/mini$/)
  await expect(page.locator("#spread h1")).toHaveText("Academy TMA")
  await expect(
    page.getByRole("button", { name: "Telegram + Base", exact: true })
  ).toBeFocused()
  await page.getByRole("button", { name: "Подробнее о разработке" }).click()
  await expect(page.locator("dialog")).toBeVisible()
  await page.keyboard.press("ArrowLeft")
  await expect(page).toHaveURL(/#academy\/mini$/)
  await page.keyboard.press("Escape")
  await expect(page.locator("dialog")).not.toBeVisible()
  await expect(
    page.getByRole("button", { name: "Подробнее о разработке" })
  ).toBeFocused()
  await page.getByRole("button", { name: "Исходный код закрыт по NDA" }).click()
  await expect(page.locator("#dialog-title")).toHaveText("Исходный код под NDA")
  await page.getByRole("button", { name: "Закрыть заметки" }).click()
  await page.getByRole("button", { name: "Подробнее о разработке" }).click()
  await page.mouse.click(1, 1)
  await expect(page.locator("dialog")).not.toBeVisible()
})
test("Fast turns settle and reduced motion disables page flip", async ({
  page,
}) => {
  await page.goto("/#crypton-id")
  await expect(page.locator("#spread h1")).toHaveText("Crypton ID")
  await page.keyboard.press("ArrowRight")
  await page.keyboard.press("ArrowRight")
  await page.keyboard.press("ArrowLeft")
  await expect(page.locator("#spread h1")).toHaveText("X-Program")
  await expect(page.locator(".page-turn")).toHaveCount(0)
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.keyboard.press("ArrowRight")
  await expect(page.locator("#spread h1")).toHaveText("In-Prime")
  await expect(page.locator(".page-turn")).toHaveCount(0)
})
test("Horizontal swipes navigate, vertical gestures and buttons do not", async ({
  page,
}) => {
  await page.goto("/#crypton-id")
  const swipe = async (selector: string, dx: number, dy: number) =>
    page.locator("#spread " + selector).evaluate(
      (target, { dx, dy }) => {
        target.dispatchEvent(
          new TouchEvent("touchstart", {
            bubbles: true,
            touches: [
              new Touch({ identifier: 1, target, clientX: 200, clientY: 200 }),
            ],
          })
        )
        target.dispatchEvent(
          new TouchEvent("touchend", {
            bubbles: true,
            changedTouches: [
              new Touch({
                identifier: 1,
                target,
                clientX: 200 + dx,
                clientY: 200 + dy,
              }),
            ],
          })
        )
      },
      { dx, dy }
    )
  await swipe(".about-note", -120, 5)
  await expect(page).toHaveURL(/#x-program$/)
  await swipe(".about-note", 5, 120)
  await expect(page).toHaveURL(/#x-program$/)
  await swipe(".all-notes", -120, 5)
  await expect(page).toHaveURL(/#x-program$/)
})

test("Book cover and direction stay correct throughout forward and backward turns", async ({
  page,
}, testInfo) => {
  const isMobile = testInfo.project.name === "mobile"
  const chapterPairs = [
    {
      from: "crypton-id",
      to: "x-program",
      firstTab: "Crypton ID",
      secondTab: "X-Program",
    },
    {
      from: "personal/ashel-gym",
      to: "personal/ashel-front-style",
      firstTab: "Ashel Gym",
      secondTab: "Личный Skill",
    },
  ]

  for (const pair of chapterPairs) {
    await page.goto("/#" + pair.from)
    const cover = page.locator(".book-cover")
    await expect(page.locator("main")).toHaveClass(/\bproject-desk\b/)
    await expect(cover).toBeVisible()
    const border = await cover.evaluate((element) => {
      const style = getComputedStyle(element)
      return { width: style.borderLeftWidth, color: style.borderLeftColor }
    })

    for (const direction of ["forward", "backward"] as const) {
      await page
        .getByRole("button", {
          name: direction === "forward" ? pair.secondTab : pair.firstTab,
          exact: true,
        })
        .click()

      await expect(page).toHaveURL(
        new RegExp("#" + (direction === "forward" ? pair.to : pair.from) + "$")
      )
      await expect(cover).toHaveCount(1)
      const leaf = page.locator(".page-turn")
      await expect(leaf).toHaveCSS(
        "animation-name",
        isMobile
          ? direction === "forward"
            ? "mobile-leaf"
            : "mobile-leaf-back"
          : direction === "forward"
            ? "leaf-forward"
            : "leaf-backward"
      )

      await page.locator(".turn-scene").evaluate(async (element) => {
        const animations = element.getAnimations({ subtree: true })
        animations.forEach((animation) => animation.pause())
        await Promise.all(animations.map((animation) => animation.ready))
      })

      for (const progress of [0.25, 0.5, 0.75]) {
        await page.locator(".turn-scene").evaluate(
          async (element, time) => {
            element.getAnimations({ subtree: true }).forEach((animation) => {
              animation.currentTime = time
            })
            await new Promise(requestAnimationFrame)
          },
          progress * (isMobile ? 300 : 720)
        )
        await expect(cover).toHaveCSS("border-left-width", border.width)
        await expect(cover).toHaveCSS("border-left-color", border.color)
        const rotation = await leaf.evaluate(
          (element) => new DOMMatrix(getComputedStyle(element).transform).m13
        )
        if (direction === "forward") expect(rotation).toBeGreaterThan(0)
        else expect(rotation).toBeLessThan(0)
      }

      await page.screenshot({
        path: testInfo.outputPath(
          pair.from.replace("/", "-") + "-" + direction + "-cover.png"
        ),
        fullPage: true,
      })
      await page.locator(".turn-scene").evaluate((element) => {
        element
          .getAnimations({ subtree: true })
          .forEach((animation) => animation.finish())
      })
      await expect(page.locator(".turn-scene")).toHaveCount(0)
      await expect(cover).toHaveCSS("border-left-color", border.color)
    }
  }
})
