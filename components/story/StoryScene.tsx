import { brand, ui } from "@/config/brand";
import { chapters, type Chapter } from "@/config/chapters";
import { SceneArtwork } from "./SceneArtwork";

type Props = { chapter: Chapter; index: number; active: boolean; navigate: (index: number) => void; openDetails: () => void };

export function StoryScene({ chapter, index, active, navigate, openDetails }: Props) {
  const Heading = index === 0 ? "h1" : "h2";
  return <section id={chapter.id} className={`scene scene-${chapter.kind}${active ? " is-active" : ""}`}
    data-scene={index} aria-labelledby={`${chapter.id}-title`}>
    <div className="scene-wash" aria-hidden="true" />
    <SceneArtwork kind={chapter.kind} />
    <div className="scene-content">
      <p className="eyebrow copy-reveal"><span>Chapter {String(index + 1).padStart(2, "0")}</span><i aria-hidden="true" />{chapter.eyebrow}</p>
      <Heading className="headline copy-reveal" id={`${chapter.id}-title`} tabIndex={-1}>
        <span>{chapter.title[0]}</span><em>{chapter.title[1]}</em>
      </Heading>
      <p className="scene-description copy-reveal">{chapter.description}</p>
      {chapter.kind === "reveal" && <div className="product-spec copy-reveal"><span>{brand.concentration}</span><i aria-hidden="true" /><span>{brand.volume}</span></div>}
      {chapter.kind === "reveal" ? <button className="story-cta solid-cta copy-reveal" type="button" onClick={openDetails} aria-haspopup="dialog">{chapter.action}<span aria-hidden="true">↗</span></button>
        : <a className="story-cta text-cta copy-reveal" href={`#${chapters[index + 1].id}`}
          onClick={(event) => { event.preventDefault(); navigate(index + 1); }}>{chapter.action}<span aria-hidden="true">↗</span></a>}
    </div>
    <footer className="scene-footer">
      <span className="scene-footnote"><span className="footnote-index">{String(index + 1).padStart(2, "0")}</span><b>{chapter.label}</b><i aria-hidden="true" /><span>{chapter.caption}</span></span>
      <span className="scroll-hint">{index === 3 ? ui.conclusion : ui.scroll}<span aria-hidden="true">{index === 3 ? "" : "↓"}</span></span>
    </footer>
    <span className="scene-numeral" aria-hidden="true">{["I", "II", "III", "IV"][index]}</span>
  </section>;
}
