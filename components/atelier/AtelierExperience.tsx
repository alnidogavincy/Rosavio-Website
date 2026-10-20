"use client";
import { useEffect, useRef } from 'react';
import { atelierMarkup } from './markup';
import { mountAtelier } from './controller';

export function AtelierExperience(){
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{if(ref.current)return mountAtelier(ref.current);},[]);
  return <div ref={ref} className="atelier-root relative w-full h-screen overflow-hidden bg-[#08090a] text-[#f7f4f0]" dangerouslySetInnerHTML={{__html:atelierMarkup}} />;
}
