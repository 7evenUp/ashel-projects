import { assetUrl } from "../../lib/assetUrl"

const PortfolioArt = () => {
  return (
    <figure className="mx-auto mt-5.5 mb-4.5 max-w-115 -rotate-2 border border-[#d9d0bb] bg-[#fffaf0] p-2 shadow-[1px_4px_8px_#50432c26] max-[801px]:mt-6.25">
      <img
        className="block h-auto w-full"
        src={assetUrl("assets/personal/julia-portfolio.webp")}
        alt="Работы из портфолио Юлии, собранные в арку: веб-дизайн, афиши, баннеры и свадебная полиграфия"
        width={960}
        height={528}
      />
    </figure>
  )
}

export default PortfolioArt
