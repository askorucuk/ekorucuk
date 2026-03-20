"use client";
import React from 'react'
import { LuCalendarCheck } from 'react-icons/lu'

const TopAppointmentBar: React.FC = () => {
  return (
    <a
      href="https://mhrs.gov.tr/vatandas/?/Randevu#/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex sm:hidden items-center justify-center gap-2 py-1.5 -mx-[4vw] px-[4vw] bg-white/[0.02] border-b border-gray-800/50 hover:bg-white/[0.04] transition-colors"
    >
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      <span className="text-gray-500 text-[11px] tracking-wide">Randevu için uygun</span>
      <span className="text-gray-700 text-[11px]">·</span>
      <span className="text-blue-primary text-[11px] flex items-center gap-1 font-medium">
        <LuCalendarCheck size={11} />
        MHRS
      </span>
    </a>
  )
}

export default TopAppointmentBar
