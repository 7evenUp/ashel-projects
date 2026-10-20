import { expect, test } from "vitest"

import { formatWorkPeriod } from "../../src/components/IntroSpread/WorkPeriod"

test.each([
  ["2026-10-19T00:00:00Z", "ноябрь 2022 - октябрь 2026"],
  ["2026-10-31T20:59:59Z", "ноябрь 2022 - октябрь 2026"],
  ["2026-10-31T21:00:00Z", "ноябрь 2022 - ноябрь 2026"],
  ["2026-12-31T21:00:00Z", "ноябрь 2022 - январь 2027"],
])("The work period uses the current Moscow month for %s", (date, expected) => {
  expect(formatWorkPeriod(new Date(date))).toBe(expected)
})
