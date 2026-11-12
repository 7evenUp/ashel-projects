import PaperPage from "./PaperPage"

const DesignSpread = () => (
  <>
    <PaperPage
      side="left"
      className="flex flex-col bg-[#25222c] [background-image:var(--paper-grain)] p-[clamp(26px,4.6vw,72px)] [background-blend-mode:soft-light] shadow-[inset_-18px_0_28px_-20px_#100c18b3,inset_3px_0_4px_#ad849a20] before:border-[#a78a9b30]"
      aria-labelledby="design-title"
    >
      <h1
        id="design-title"
        className="font-book text-[clamp(38px,5.1vw,80px)] leading-[0.98] tracking-[-0.055em]"
      >
        Дизайн-
        <br />
        работы
      </h1>
      <p className="mt-5 max-w-64 text-base leading-relaxed text-[#cfbcc7]">
        Здесь появятся мои дизайн-проекты.
      </p>

      <figure className="mt-9 min-[801px]:mt-auto min-[801px]:pt-12">
        <div
          className="relative aspect-[5/3] overflow-hidden border border-dashed border-[#8a697c] bg-[#322936]"
          aria-hidden="true"
        >
          <div className="absolute top-[17%] left-[16%] aspect-square w-[38%] rounded-full bg-[#d58e80]/85" />
          <div className="absolute top-[25%] left-[39%] h-[60%] w-[40%] -rotate-12 border border-[#ddb6c5]/65 bg-[#8e647c]/75" />
          <div className="absolute top-[44%] left-[59%] aspect-square w-[25%] rotate-12 bg-[#b4a1c6]/60" />
        </div>
        <figcaption className="mt-3 flex gap-4 font-book text-sm text-[#cfbcc7]">
          <span>01</span>
          <span>Место для проекта</span>
        </figcaption>
      </figure>
    </PaperPage>

    <PaperPage
      side="right"
      className="flex flex-col justify-center bg-[#2b2531] [background-image:var(--paper-grain)] p-[clamp(26px,4.6vw,72px)] [background-blend-mode:soft-light] shadow-[inset_19px_0_28px_-24px_#100c18b3,inset_-2px_0_4px_#ad849a20] before:border-[#a78a9b30]"
    >
      <figure>
        <div
          className="relative grid aspect-[6/5] place-items-center overflow-hidden border border-dashed border-[#8a697c] bg-[#322936] text-[#e6a996]"
          aria-hidden="true"
        >
          <div className="absolute inset-x-[17%] inset-y-[15%] border-y border-[#bd8ba3]/40" />
          <div className="absolute top-[23%] left-[23%] aspect-square w-[54%] rounded-full border border-[#bd8ba3]/55" />
          <span className="relative font-book text-[clamp(70px,11vw,164px)] leading-none tracking-[-0.1em] italic">
            Aa
          </span>
        </div>
        <figcaption className="mt-3 flex gap-4 font-book text-sm text-[#cfbcc7]">
          <span>02</span>
          <span>Место для проекта</span>
        </figcaption>
      </figure>
    </PaperPage>
  </>
)

export default DesignSpread
