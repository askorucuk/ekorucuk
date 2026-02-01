"use client";
import Link from 'next/link'
import React from 'react'
import IconLogo from '../assets/logo.png';
import IconLogoText from '../assets/logo-name.png';
import { nav } from '../constants/classes';
import useResizeListener from '../hooks/useResizeListener';
import FloatingNavbarItems from './floatings/FloatingNavbarItems';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {

  const { width } = useResizeListener();
  const menuActive = width <= 680;

  const activePath = usePathname();

  return (
    <nav className={`w-full h-auto flex items-center justify-between border-b border-gray-secondary pt-4 pb-2 z-[100]`}>
      <Link href="/" className="k-logo-wrapper w-auto flex items-center justify-center">
        <img src={IconLogo.src} alt="Logo" className="w-auto h-auto shrink-0 mr-1" style={{ width: '100px', height: 'auto' }} />
        <div className="w-[1px] h-14 flex flex-col items-start justify-center bg-[#808080] mt-1" />
        <div className="flex flex-col items-start justify-center text-center ml-3">
          <h1 className="text-gray-300 text-2xl font-light tracking-[0.25em] uppercase ml-1" style={{ lineHeight: '1.2' }}>
            EBUBEKİR
          </h1>
          <h1 className="text-gray-300 text-2xl font-light tracking-[0.3em] uppercase ml-1" style={{ lineHeight: '1.2' }}>
            KORUCUK
          </h1>
          <div className="flex items-center justify-center gap-2">
            <div className="h-[1px] w-4 bg-white/40"></div>
            <p className="text-gray-300 text-[8px] tracking-widest uppercase font-medium">
              GENEL CERRAHİ UZMANI
            </p>
            <div className="h-[1px] w-4 bg-white/40"></div>
          </div>
        </div>
      </Link>

      {menuActive ? (
        <FloatingNavbarItems />
      ) : (
        <div className="w-auto flex items-center justify-center md:gap-2 gap-0">
          <Link
            href="/"
            className={activePath === '/' ? nav.activeLink : nav.link}
          >
            Ana Sayfa
          </Link>
          <Link
            href="/about"
            className={activePath === '/about' ? nav.activeLink : nav.link}
          >
            Hakkımda
          </Link>
          <Link
            href="/blog"
            className={activePath === '/blog' ? nav.activeLink : nav.link}
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className={activePath === '/contact' ? nav.activeLink : nav.link}
          >
            İletişim
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
