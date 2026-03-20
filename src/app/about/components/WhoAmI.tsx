"use client";

import { WHOAMI_RESUME } from '@/constants/welcome'
import { JSX, useState } from 'react'
import { LuUser, LuChevronDown } from 'react-icons/lu'
import ResumeCard from './ResumeCard'

const WhoAmI = (): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);

  const maxLength = 1000;
  const isLong = WHOAMI_RESUME.length > maxLength;

  const displayText = isExpanded || !isLong 
    ? WHOAMI_RESUME 
    : WHOAMI_RESUME.slice(0, maxLength) + '...';

  return (
    <section className="w-full bg-black text-gray-300 py-8 sm:py-12">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-primary/10 rounded-xl flex items-center justify-center text-blue-primary">
          <LuUser size={20} />
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Ben Kimim?</h2>
      </div>
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
        <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Özgeçmişim</h3>
        <div className="relative">
          <p className="text-gray-400 leading-relaxed text-xs sm:text-sm md:text-base whitespace-pre-wrap transition-opacity duration-500 ease-in-out pb-2">
            {displayText}
          </p>
          {!isExpanded && isLong && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#1a1a1a] to-transparent pointer-events-none" />
          )}
        </div>
        {isLong && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 mt-4 text-blue-primary hover:text-blue-400 font-medium transition-colors text-sm group"
          >
            <span>{isExpanded ? 'Daha Az Göster' : 'Devamını Oku'}</span>
            <span className={`transition-transform duration-300 flex items-center ${isExpanded ? 'rotate-180' : ''}`}>
              <LuChevronDown size={18} />
            </span>
          </button>
        )}
      </div>
      <ResumeCard />
    </section>
  )
}

export default WhoAmI
