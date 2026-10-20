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
    <span className="bookmark-favicon" aria-hidden="true">
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
