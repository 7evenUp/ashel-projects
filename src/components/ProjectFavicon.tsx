import { useState } from "react"
import { Icon } from "./Art"
import { favicons } from "../data/favicons"
import type { SymbolName } from "../types"

export function ProjectFavicon({
  id,
  symbol,
}: {
  id: string
  symbol: SymbolName
}) {
  const [failed, setFailed] = useState(false)
  return (
    <span
      className="bookmark-favicon flex size-5 flex-none items-center justify-center max-[801px]:size-4 [&_img]:size-full [&_img]:object-contain"
      aria-hidden="true"
    >
      {failed ? (
        <Icon name={symbol} />
      ) : (
        <img
          src={import.meta.env.BASE_URL + favicons[id]}
          alt=""
          onError={() => setFailed(true)}
        />
      )}
    </span>
  )
}
