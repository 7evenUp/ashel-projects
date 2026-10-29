import { describe, expect, it } from "vitest"

import { cn } from "../../src/lib/cn"

describe("cn", () => {
  it("merges conditional utilities and lets consumers override defaults", () => {
    expect(cn("flex size-5 p-3", false && "hidden", "size-4 p-2")).toBe(
      "flex size-4 p-2"
    )
  })

  it("resolves conflicts within responsive and state variants", () => {
    expect(
      cn(
        "hover:bg-red-500 max-[801px]:p-3",
        "hover:bg-blue-500 max-[801px]:p-5"
      )
        .split(" ")
        .sort()
    ).toEqual(["hover:bg-blue-500", "max-[801px]:p-5"])
  })
})
