import { useEffect, useState } from "react"

import { Icon } from "../Art"

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
    <div className="install-command">
      <div className="install-command-toolbar flex items-center justify-between gap-3">
        <span>Терминал</span>
        <button
          className="copy-command"
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
