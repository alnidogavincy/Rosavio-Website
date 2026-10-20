import Image from "next/image";
import { brand } from "@/config/brand";
import { chapters, type SceneKind } from "@/config/chapters";

function Decoration({ file, className, width = 200, height = 200 }: { file: string; className: string; width?: number; height?: number }) {
  return <Image src={`/assets/${file}`} width={width} height={height} alt="" aria-hidden="true" className={className} />;
}

function Petals({ product = false }: { product?: boolean }) {
  return <div className={product ? "petals product-petals" : "petals"} aria-hidden="true">
    <Decoration file="petal-rose.svg" className="petal petal-a" />
    <Decoration file="petal-small.svg" className="petal petal-b" />
    {!product && <Decoration file="petal-rose.svg" className="petal petal-c" />}
  </div>;
}

export function SceneArtwork({ kind }: { kind: SceneKind }) {
  if (kind === "rose") return <div className="rose-background art-motion" aria-hidden="true">
    <Image src="/assets/rose-stage-1920x1080.webp" fill preload sizes="100vw" alt="" className="rose-photograph" />
    <div className="rose-shade" />
  </div>;

  if (kind === "essence") return <div className="artwork bowl-art art-motion" aria-hidden="true">
    <div className="art-halo" /><div className="bowl-shimmer" />
    <Decoration file="glass-bowl.svg" className="bowl ambient-float" width={950} height={680} />
    <Petals />
    <span className="art-caption">II — {chapters[1].caption}</span>
  </div>;

  if (kind === "character") return <div className="artwork craft-art art-motion" aria-hidden="true">
    <div className="art-halo" /><div className="craft-orbit" /><div className="craft-orbit orbit-inner" />
    <Decoration file="alembic.svg" className="vessel ambient-float" width={850} height={900} />
    <Decoration file="drop.svg" className="gold-drop" width={80} height={120} />
    <span className="art-caption">III — {chapters[2].caption}</span>
  </div>;

  return <div className="artwork product-art art-motion">
    <div className="art-halo" aria-hidden="true" /><div className="product-orbit" aria-hidden="true" />
    <Decoration file="rose-line.svg" className="botanical" width={640} height={740} />
    <div className="bottle-float"><Image src={brand.images.bottle} width={409} height={724}
      sizes="(max-width: 680px) 190px, (max-width: 1023px) 270px, 360px" alt={brand.images.bottleAlt} className="bottle" /></div>
    <Petals product />
    <span className="bottle-volume" aria-hidden="true">{brand.volume}<i />{brand.concentration}</span>
  </div>;
}
