"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { brand, ui, officialCheckout } from "@/config/brand";

export function ProductDetailDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const checkout = officialCheckout();

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [open]);

  return <dialog ref={dialogRef} className="product-dialog" aria-labelledby="product-dialog-title" onClose={onClose}
    onKeyDown={(event) => {
      if (event.key !== "Tab") return;
      const targets = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex="0"]'));
      const first = targets[0];
      const last = targets[targets.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first?.focus();
      }
    }}
    onClick={(event) => {
      if (event.target !== event.currentTarget) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
    }}>
    {open && <>
      <button type="button" className="dialog-close" aria-label={ui.close} onClick={onClose} autoFocus><span aria-hidden="true">×</span></button>
      <figure className="dialog-photo">
        <Image src={brand.images.original} width={1672} height={941} loading="eager" sizes="(max-width: 760px) 94vw, 60vw" alt={brand.images.originalAlt} />
        <figcaption>{ui.photoCaption}</figcaption>
      </figure>
      <div className="dialog-copy">
        <p className="eyebrow">{ui.dialogEyebrow}</p>
        <h2 id="product-dialog-title">{ui.dialogTitle[0]}<br /><em>{ui.dialogTitle[1]}</em></h2>
        <p>{ui.dialogCopy}</p>
        <dl className="detail-specs">
          <div><dt>{ui.concentration}</dt><dd>{brand.concentration}</dd></div>
          <div><dt>{ui.volume}</dt><dd>{brand.volume}</dd></div>
          <div><dt>{ui.character}</dt><dd>{brand.tagline}</dd></div>
        </dl>
        <div className="dialog-actions flex flex-wrap items-center gap-6">
          {checkout && <a className="story-cta solid-cta" href={checkout} target="_blank" rel="noopener noreferrer">{ui.buy}<span aria-hidden="true">↗</span></a>}
          <button type="button" className="story-cta text-cta" onClick={onClose}>{ui.back}<span aria-hidden="true">↗</span></button>
        </div>
      </div>
    </>}
  </dialog>;
}
