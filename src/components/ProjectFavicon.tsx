import { useState } from "react"

import { Icon } from "./Icon"

import { favicons } from "../data/favicons"
import { assetUrl } from "../lib/assetUrl"

import type { SymbolName } from "../types"

export function ProjectFavicon({
  id,
  symbol,
}: {
  id: string
  symbol: SymbolName
}) {
  const path = favicons[id]
  const [failedPath, setFailedPath] = useState<string | null>(null)

  return (
    <span
      className="bookmark-favicon flex size-5 flex-none items-center justify-center max-[801px]:size-4 [&_img]:size-full [&_img]:object-contain"
      aria-hidden="true"
    >
      {path && failedPath !== path ? (
        <img
          src={assetUrl(path)}
          alt=""
          onError={() => setFailedPath(path)}
        />
      ) : (
        <Icon name={symbol} />
      )}
    </span>
  )
}
