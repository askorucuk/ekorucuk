'use client';

import Link from 'next/link'
import React, { JSX } from 'react'

const ImageCollapse = (): JSX.Element => {
  const handleScroll = () => {
    const journeySection = document.getElementById('journey-section');
    if (journeySection) {
      journeySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full h-auto flex flex-col items-center justify-center">
      <aside className="k-about-image-wrapper relative w-full h-full min-h-[50vh] flex flex-col items-start justify-end rounded-md overflow-hidden gap-8 p-8">
        <h2 className="text-[4rem] font-bold text-neutral-50 select z-2" style={{ fontSize: 'clamp(2rem, 8vw, 4rem)'}}>Op.Dr. Ebubekir Korucuk</h2>
        <div className="flex flex-row items-center justify-center gap-2 z-2">
          <button className="bg-red-primary text-sm font-normal text-neutral-50 hover:text-white rounded-sm px-4 py-2 cursor-pointer duration-300" onClick={handleScroll}>Yolculuğum</button>
          <Link href="/contact" className="bg-red-alternate text-sm font-normal text-neutral-50 hover:text-white rounded-sm px-4 py-2 cursor-pointer duration-300">Bana Ulaşın</Link>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-base-primary opacity-25 z-1" />
      </aside>
    </section>
  )
}

export default ImageCollapse