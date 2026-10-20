# ANIMATION SPEC — ROSAVIA

## Inspiration
Video referensi ±11 detik memperlihatkan dark luxury storytelling: flower visual, floating/capturing scent, metallic process imagery, perfume bottle showcase. Rosavia menggunakan urutan empat scene dan copy asli, **tidak copy artwork, kode atau identitas website di video**.

## Recommended GSAP implementation

1. Register `ScrollTrigger` only client side.
2. `useGSAP()` dari `@gsap/react` dengan scoped `ref`, atau `gsap.context()` + cleanup di React effect.
3. Pin container desktop bila performanya layak; set `end: () => '+=' + window.innerHeight * 3` dan `scrub: 1`. Scene chapters ditata dalam timeline. Jika muncul keyboard/scroll conflict, pilih 4 independent sections dengan native scroll snap.
4. Scene transitions:

| Segment | Incoming | Outgoing | Notes |
|---|---|---|---|
| 0 → 1 | Rose + headline | — | rose scale 1.0→1.06, headline y24→0 |
| 1 → 2 | Glass bowl, petals | Rose image | fade dissolve + slide bowl +40→0 px |
| 2 → 3 | Copper vessel, gold drop | Glass bowl | warm tint shift, vessel scale .92→1 |
| 3 → 4 | Original Rosavia bottle | Vessel | product y80→0, opacity 0→1, petals parallax |

Use `transform` and `opacity`, not `top/left` or expensive CSS filters each frame. Timing can be adjusted to feel as fluid as the reference.

## Repeating ambient loops

- Petals: duration 5–8 sec, y ±12–20px, rotation ±8–12deg, stagger offset.
- Product: y ±8–16px, no excessive tilt; premium steady feel.
- Rose: scale very slow 1.0→1.04, 10–14 sec alternate.
- Gold drop: oscillate 10px opacity .6–1 over 4 sec.

## Navigation syncing

- Chapter state index 0..3 derived from ScrollTrigger active segment or IntersectionObserver.
- Dots are buttons and reflect `aria-current=step`.
- Clicking chapter should scroll to its exact trigger start, not only update state.
- ScrollProgress supports keyboard PageUp/PageDown and conventional swipe/scroll.
- Don't hijack mouse wheel with repeated preventDefault; avoid trapping users.

## Accessibility fallback

- If `(prefers-reduced-motion: reduce)` matches: kill timelines, no pinned scroll animation, render all story sections in document flow, remove looping ambient movement.
- Avoid autoplay audio. Clear focus states. Test dialog Escape and keyboard.

## Preview reference

`preview/index.html` includes lightweight, standalone **CSS animated** scenes and an IntersectionObserver-driven chapter rail. It is **not** the final Next.js/GSAP app; Codex should use it to understand visual/compositional targets, then implement production-ready animation timelines.
