"use client";

import { useRef, useState } from "react";
import { chapters } from "@/config/chapters";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { StoryNavigation } from "@/components/navigation/StoryNavigation";
import { ProductDetailDialog } from "@/components/product/ProductDetailDialog";
import { useStoryMotion } from "@/hooks/useStoryMotion";
import { StoryScene } from "./StoryScene";

export function StoryExperience() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { active, navigate } = useStoryMotion(stageRef, dialogOpen);
  return <>
    <SiteHeader navigate={navigate} />
    <StoryNavigation active={active} navigate={navigate} />
    <main id="story">
      <div ref={stageRef} className="story-stage">
        {chapters.map((chapter, index) => <StoryScene key={chapter.id} chapter={chapter} index={index}
          active={active === index} navigate={navigate} openDetails={() => setDialogOpen(true)} />)}
      </div>
    </main>
    <ProductDetailDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
  </>;
}
