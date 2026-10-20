"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { chapters } from "@/config/chapters";

type PinnedRange = { start: number; end: number };

export function useStoryMotion(stageRef: RefObject<HTMLDivElement | null>, dialogOpen: boolean) {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const pinned = useRef<PinnedRange | null>(null);

  const navigate = useCallback((requested: number) => {
    const index = Math.max(0, Math.min(chapters.length - 1, requested));
    const section = document.getElementById(chapters[index].id);
    if (!section) return;
    const range = pinned.current;
    const top = range ? range.start + (range.end - range.start) * index / 3 : section.getBoundingClientRect().top + window.scrollY;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: reduce ? "instant" : "smooth" });
    window.history.replaceState(null, "", `#${chapters[index].id}`);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const scenes = Array.from(stage.querySelectorAll<HTMLElement>(".scene"));
    let disposed = false;
    let revertMotion: (() => void) | undefined;
    let hashFrame = 0;
    const ratios = new Map<Element, number>();

    const update = (index: number) => {
      if (disposed) return;
      activeRef.current = index;
      setActive(index);
      if (pinned.current) scenes.forEach((scene, i) => {
        scene.inert = i !== index;
        if (i !== index) scene.setAttribute("aria-hidden", "true");
        else scene.removeAttribute("aria-hidden");
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => ratios.set(entry.target, entry.intersectionRatio));
      if (pinned.current) return;
      let best = 0;
      let bestRatio = 0;
      scenes.forEach((scene, index) => {
        const ratio = ratios.get(scene) ?? 0;
        if (ratio > bestRatio) { bestRatio = ratio; best = index; }
      });
      if (bestRatio > 0) update(best);
    }, { threshold: [0, .15, .3, .45, .5, .55, .7, .85, 1] });
    scenes.forEach(scene => observer.observe(scene));

    const onHash = () => {
      const index = chapters.findIndex(chapter => `#${chapter.id}` === window.location.hash);
      if (index >= 0) navigate(index);
    };
    window.addEventListener("hashchange", onHash);

    // Progressive enhancement: readable native sections remain if loading GSAP fails.
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add("(min-width: 1024px) and (min-height: 650px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        stage.classList.add("is-pinned");
        gsap.set(scenes, { autoAlpha: 0 });
        gsap.set(scenes[0], { autoAlpha: 1 });
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stage, start: "top top", end: () => `+=${window.innerHeight * 3}`,
            pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true,
            onRefresh: (self) => { pinned.current = { start: self.start, end: self.end }; },
          },
          onUpdate: function () { update(Math.min(3, Math.round(this.progress() * 3))); },
        });
        for (let index = 1; index < scenes.length; index++) {
          const outgoing = scenes[index - 1];
          const incoming = scenes[index];
          const at = index - .68;
          timeline.to(outgoing.querySelectorAll(".copy-reveal"), { y: -28, opacity: 0, duration: .28, stagger: .025 }, at)
            .to(outgoing.querySelector(".art-motion"), { y: -35, scale: 1.06, duration: .68 }, at)
            .to(outgoing, { autoAlpha: 0, duration: .48 }, at + .18)
            .fromTo(incoming, { autoAlpha: 0 }, { autoAlpha: 1, duration: .48 }, at + .18)
            .fromTo(incoming.querySelector(".art-motion"), { y: index === 3 ? 70 : 40, scale: .94 }, { y: 0, scale: 1, duration: .6 }, at + .08)
            .fromTo(incoming.querySelectorAll(".copy-reveal"), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .3, stagger: .035 }, at + .23);
          if (index === 1) {
            timeline.fromTo(incoming.querySelectorAll(".petal"), { y: -65, opacity: 0 }, { y: 0, opacity: 1, duration: .4, stagger: .06 }, at + .13);
          }
        }
        // End every transition at a precise chapter coordinate (0, 1, 2, 3).
        timeline.to({}, { duration: Math.max(0, 3 - timeline.duration()) });
        ScrollTrigger.refresh();
        update(Math.min(3, Math.round(timeline.progress() * 3)));
        hashFrame = requestAnimationFrame(onHash);
        return () => {
          pinned.current = null;
          stage.classList.remove("is-pinned");
          scenes.forEach(scene => { scene.inert = false; scene.removeAttribute("aria-hidden"); });
          observer.disconnect();
          scenes.forEach(scene => observer.observe(scene));
        };
      });
      revertMotion = () => media.revert();
      hashFrame = requestAnimationFrame(onHash);
    }).catch(() => { /* Native scrolling and all content stay available. */ });

    return () => {
      disposed = true;
      cancelAnimationFrame(hashFrame);
      window.removeEventListener("hashchange", onHash);
      revertMotion?.();
      observer.disconnect();
      pinned.current = null;
    };
  }, [stageRef, navigate]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (dialogOpen || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const target = event.target as HTMLElement;
      if (target.closest("input, textarea, select, [contenteditable=true], dialog")) return;
      if (event.key === "PageDown" || event.key === "PageUp") {
        event.preventDefault();
        navigate(activeRef.current + (event.key === "PageDown" ? 1 : -1));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dialogOpen, navigate]);

  return { active, navigate };
}
