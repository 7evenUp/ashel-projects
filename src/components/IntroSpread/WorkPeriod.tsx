const monthFormatter = new Intl.DateTimeFormat("ru-RU", {
  month: "long",
  year: "numeric",
  timeZone: "Europe/Moscow",
})

export const formatWorkPeriod = (date: Date) => {
  const currentMonth = monthFormatter
    .formatToParts(date)
    .filter((part) => part.type === "month" || part.type === "year")
    .map((part) => part.value)
    .join(" ")

  return `ноябрь 2022 - ${currentMonth}`
}

const period = formatWorkPeriod(new Date())

const WorkPeriod = () => {
  return <p className="experience-period">{period}</p>
}

export default WorkPeriod
