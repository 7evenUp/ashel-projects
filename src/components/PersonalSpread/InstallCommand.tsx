import { useEffect, useState } from "react"

import { Icon } from "../Art"

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
        "install-command rounded-[4px] border-[1px] border-solid border-[rgba(133,_118,_175,_0.19)] bg-[#fffdf455]",
        "[&_code]:block [&_code]:[border-top-width:1px] [&_code]:[border-top-style:solid] [&_code]:[border-top-color:rgba(133,_118,_175,_0.133)] [&_code]:p-3 [&_code]:font-code [&_code]:text-[12px] [&_code]:leading-[1.6] [&_code]:font-normal [&_code]:[overflow-wrap:anywhere] [&_code]:text-[#62586d] [&_code]:not-italic [&_code]:select-text"
      )}
    >
      <div
        className={cn(
          "install-command-toolbar flex min-h-10.75 items-center justify-between gap-3 px-2.5 py-1.25 text-[10px] text-[#8b7c98]",
          "max-[801px]:flex-wrap max-[801px]:gap-1 max-[801px]:px-2"
        )}
      >
        <span>Терминал</span>
        <button
          className={cn(
            "copy-command inline-flex size-8 shrink-0 touch-manipulation items-center justify-center rounded-[3px] border-[1px] border-solid border-[rgba(168,_154,_183,_0.267)] bg-[#fffdf455] p-0 text-[11px] text-[#776388]",
            "max-[801px]:size-9",
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
        </button>
      </div>

      <code>{command}</code>

      {copyStatus === "error" && (
        <p className="copy-feedback" role="status" aria-live="polite">
          Не удалось скопировать. Выделите команду и скопируйте вручную.
        </p>
      )}
    </div>
  )
}

export default InstallCommand
