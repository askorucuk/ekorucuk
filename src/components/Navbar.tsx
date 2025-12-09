"use client";

import Link from 'next/link'
import React from 'react'
import IconLogo from '../assets/logo.svg';
import { nav } from './classes';
import useResizeListener from '../hooks/useResizeListener';
import FloatingNavbarItems from './floatings/FloatingNavbarItems';

const Navbar: React.FC = () => {

  const {width} = useResizeListener();
  const menuActive = width <= 680;

  return (
    <nav className={`w-full h-auto flex items-center justify-between border-b border-gray-secondary pt-4 pb-2`}>
      <div className="k-logo-wrapper w-auto flex items-center justify-center gap-4">
        <IconLogo className="w-10 h-10 shrink-0" />
        <h1 className="text-xl font-semibold text-neutral-50">Op.Dr. Ebubekir Korucuk</h1>
      </div>
      {menuActive ? (
        <FloatingNavbarItems />
      ) : (
        <div className="w-auto flex items-center justify-center md:gap-2 gap-0">
          <Link
            href="/"
            className={nav.link}
          >
            Ana Sayfa
          </Link>
          <Link
            href="/about"
            className={nav.link}
          >
            Hakkımda
          </Link>
          <Link
            href="/blog"
            className={nav.link}
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className={nav.link}
          >
            İletişim
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
