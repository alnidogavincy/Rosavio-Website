import { brand, ui } from "@/config/brand";
import { chapters } from "@/config/chapters";

export function SiteHeader({ navigate }: { navigate: (index: number) => void }) {
  return <>
    <a className="skip-link" href={`#${chapters[0].id}`}>{ui.skip}</a>
    <header className="site-header flex items-center justify-between">
      <a className="wordmark" href={`#${chapters[0].id}`} aria-label={ui.home}
        onClick={(event) => { event.preventDefault(); navigate(0); }}>{brand.name}<span aria-hidden="true" className="wordmark-flower" /></a>
      <span className="header-note">{ui.headerNote}</span>
      <a className="header-action" href={`#${chapters[3].id}`}
        onClick={(event) => { event.preventDefault(); navigate(3); }}>{ui.explore}<span aria-hidden="true">↗</span></a>
    </header>
  </>;
}
