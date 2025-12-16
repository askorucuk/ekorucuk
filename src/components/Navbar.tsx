"use client";
import Link from 'next/link'
import React from 'react'
import IconLogo from '../assets/logo.svg';
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
      <Link href="/" className="k-logo-wrapper w-auto flex items-center justify-center gap-4">
        <IconLogo className="w-10 h-10 shrink-0" />
        <h1 className="text-xl font-semibold text-neutral-50">Op.Dr. Ebubekir Korucuk</h1>
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
