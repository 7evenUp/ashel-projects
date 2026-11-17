import { useEffect, useState } from "react"

import { Icon } from "../Icon"

import { cn } from "../../lib/cn"

const InstallCommand = ({ command }: { command: string }) => {
  const [copyStatus, setCopyStatus] = useState<
    "idle" | "copying" | "copied" | "error"
  >("idle")

  useEffect(() => {
    if (copyStatus !== "copied") return

    const timeout = window.setTimeout(() => setCopyStatus("idle"), 2000)

    return () => window.clearTimeout(timeout)
  }, [copyStatus])

  const handleCopy = async () => {
    if (copyStatus === "copying") return

    setCopyStatus("copying")
    try {
      await navigator.clipboard.writeText(command)
      setCopyStatus("copied")
    } catch {
      setCopyStatus("error")
    }
  }

  return (
    <div
      className={cn(
        "install-command rounded-[4px] border border-solid border-[rgba(133,_118,_175,_0.19)] bg-[#fffdf455]",
        "[&_code]:block [&_code]:[border-top-width:1px] [&_code]:[border-top-style:solid] [&_code]:[border-top-color:rgba(133,_118,_175,_0.133)] [&_code]:p-3 [&_code]:font-code [&_code]:text-[13px] [&_code]:leading-[1.6] [&_code]:font-normal [&_code]:[overflow-wrap:anywhere] [&_code]:text-[#62586d] [&_code]:not-italic [&_code]:select-text"
      )}
    >
      <div
        className={cn(
          "flex min-h-10.75 items-center justify-between gap-3 px-2.5 py-1.25 text-[13px] text-[#62516f]",
          "max-[801px]:flex-wrap max-[801px]:gap-1 max-[801px]:px-2"
        )}
      >
        <span>Команда установки</span>
        <button
          className={cn(
            "copy-command inline-flex min-h-11 shrink-0 touch-manipulation items-center justify-center gap-2 rounded-[3px] border border-solid border-[rgba(168,_154,_183,_0.267)] bg-[#fffdf455] px-3 text-[13px] text-[#62516f]",
            "[&_.icon]:size-3.25",
            "disabled:cursor-wait disabled:opacity-[0.6]",
            "[@media(hover:hover)_and_(pointer:fine)]:enabled:hover:border-[#8576af] [@media(hover:hover)_and_(pointer:fine)]:enabled:hover:bg-[#fffdf4a6]"
          )}
          type="button"
          onClick={handleCopy}
          disabled={copyStatus === "copying"}
          aria-label={
            copyStatus === "copied"
              ? "Команда скопирована"
              : "Копировать команду установки"
          }
        >
          <Icon name={copyStatus === "copied" ? "check" : "copy"} />
          {copyStatus === "copied"
            ? "Скопировано"
            : copyStatus === "copying"
              ? "Копирование…"
              : "Копировать"}
        </button>
      </div>

      <code>{command}</code>

      <p
        className={copyStatus === "error" ? "copy-feedback" : "sr-only"}
        role="status"
        aria-live="polite"
      >
        {copyStatus === "copied"
          ? "Команда скопирована"
          : copyStatus === "error"
            ? "Не удалось скопировать. Выделите команду и скопируйте вручную."
            : ""}
      </p>
    </div>
  )
}

export default InstallCommand
