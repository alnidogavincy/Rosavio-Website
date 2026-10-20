import { chapters } from "@/config/chapters";
import { ui } from "@/config/brand";

export function StoryNavigation({ active, navigate }: { active: number; navigate: (index: number) => void }) {
  return <>
    <aside className="chapter-rail" aria-label={`${ui.rail}, ${active + 1} / 04`}>
      <span>{ui.rail}</span><i aria-hidden="true" />
      <span className="rail-count"><b>{String(active + 1).padStart(2, "0")}</b><span> / 04</span></span>
    </aside>
    <nav className="scene-nav" aria-label={ui.chapters}>
      {chapters.map((chapter, index) => <button key={chapter.id} type="button" className="chapter-dot"
        aria-label={`Adegan ${index + 1}: ${chapter.title.join(" ")}`} aria-controls={chapter.id}
        aria-current={index === active ? "step" : undefined} onClick={() => navigate(index)}>
        <span className="dot-label" aria-hidden="true">{String(index + 1).padStart(2, "0")} — {chapter.label}</span><i aria-hidden="true" />
      </button>)}
      <span className="nav-divider" aria-hidden="true" />
      <button className="next-chapter" type="button" aria-label={active === 3 ? ui.restart : ui.next}
        onClick={() => navigate((active + 1) % chapters.length)}><span aria-hidden="true">{active === 3 ? "↑" : "↓"}</span></button>
    </nav>
    <div className="reading-progress" aria-hidden="true"><span style={{ transform: `scaleX(${(active + 1) / chapters.length})` }} /></div>
  </>;
}
