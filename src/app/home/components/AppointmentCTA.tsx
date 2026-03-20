"use client";
import React from 'react'
import Link from 'next/link'
import { LuCalendarCheck, LuMapPin, LuArrowRight } from 'react-icons/lu'

const MHRS_URL = 'https://mhrs.gov.tr/vatandas/?/Randevu#/'

const AppointmentCTA: React.FC = () => {
  return (
    <section className="w-full mt-10 sm:mt-16 md:mt-20">
      <div className="relative w-full rounded-2xl overflow-hidden border border-gray-800 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0d1b2a]">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-primary/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 p-6 sm:p-8 md:p-10">
          {/* Left: Text */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-400 text-xs font-medium tracking-wide uppercase">Randevu Açık</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Randevu Almak İster Misiniz?
            </h3>
            <p className="text-gray-400 text-sm sm:text-base max-w-lg">
              MHRS üzerinden online randevu alabilir veya iletişim formu aracılığıyla bize ulaşabilirsiniz.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2 mt-3 text-gray-500 text-xs">
              <LuMapPin size={14} />
              <span>Erciş Şehit Rıdvan Çevik Devlet Hastanesi, Van</span>
            </div>
          </div>

          {/* Right: Buttons */}
          <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
            <a
              href={MHRS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-blue-primary to-blue-600 hover:from-blue-600 hover:to-blue-primary transition-all duration-500 shadow-xl shadow-blue-primary/30 hover:shadow-blue-primary/50 overflow-hidden animate-pulse-ring"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              <LuCalendarCheck size={20} className="relative z-10" />
              <span className="relative z-10">MHRS Randevu Al</span>
            </a>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white border border-gray-700 hover:border-blue-primary/50 bg-white/5 hover:bg-blue-primary/10 transition-all duration-300"
            >
              <span>İletişim ile Ulaş</span>
              <LuArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AppointmentCTA
