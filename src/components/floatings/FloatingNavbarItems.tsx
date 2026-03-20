"use client";

import React, { useState, useEffect } from 'react'
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LuHouse, LuUser, LuStethoscope, LuPenLine, LuMail, LuCalendarCheck, LuX, LuMenu } from 'react-icons/lu';

const navItems = [
  { path: "/", label: "Ana Sayfa", icon: <LuHouse size={18} /> },
  { path: "/about", label: "Hakkımda", icon: <LuUser size={18} /> },
  { path: "/conditions", label: "Hastalıklar & Tedaviler", icon: <LuStethoscope size={18} /> },
  { path: "/blog", label: "Blog", icon: <LuPenLine size={18} /> },
  { path: "/contact", label: "İletişim", icon: <LuMail size={18} /> },
];

const appointmentItem = {
  path: "https://mhrs.gov.tr/vatandas/?/Randevu#/",
  label: "Randevu Al",
  icon: <LuCalendarCheck size={18} />,
};

const FloatingNavbarItems: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const activePath = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [activePath]);

  return (
    <>
      {/* Hamburger / Close Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'relative w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 cursor-pointer z-[60]',
          isOpen
            ? 'bg-gray-800 text-white'
            : 'text-gray-300 hover:text-white'
        )}
        aria-label={isOpen ? 'Menüyü Kapat' : 'Menüyü Aç'}
      >
        {isOpen ? <LuX size={22} /> : <LuMenu size={22} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-in Menu */}
      <div
        className={clsx(
          'fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-[#111] border-l border-gray-800 z-[100] flex flex-col transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Menu Header with Close Button */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-800">
          <p className="text-gray-500 text-xs uppercase tracking-widest font-medium">Menü</p>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Menüyü Kapat"
          >
            <LuX size={18} />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-3 px-3">
          {navItems.map((item) => {
            const isActive = activePath === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  'flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 mb-1',
                  isActive
                    ? 'bg-blue-primary/10 text-blue-primary border border-blue-primary/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                )}
              >
                <span className={clsx(
                  'shrink-0',
                  isActive ? 'text-blue-primary' : 'text-gray-500'
                )}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Randevu Al - Highlighted CTA */}
        <div className="px-4 pb-6 pt-4 border-t border-gray-800">
          <Link
            href={appointmentItem.path}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="group relative flex items-center justify-center gap-2.5 w-full py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-blue-primary to-blue-600 hover:from-blue-600 hover:to-blue-primary transition-all duration-500 shadow-xl shadow-blue-primary/40 hover:shadow-blue-primary/60 overflow-hidden animate-pulse-ring"
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            <LuCalendarCheck size={20} className="relative z-10" />
            <span className="relative z-10">{appointmentItem.label}</span>
          </Link>
          <p className="text-center text-gray-600 text-[10px] mt-2">MHRS üzerinden online randevu</p>
        </div>
      </div>
    </>
  );
};

export default FloatingNavbarItems;
