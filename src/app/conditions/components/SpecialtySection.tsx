"use client";
import React, { useCallback } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { LuChevronRight, LuCalendarCheck } from 'react-icons/lu'
import { useUIStore } from '@/store/client/ui'

const MHRS_URL = 'https://mhrs.gov.tr/vatandas/?/Randevu#/'

import conditionsImg from '@/assets/img/conditions.jpeg'
import caresImg from '@/assets/img/cares.jpeg'

export type Specialty = {
  id: string;
  title: string;
  description: string;
  details: string[];
}

interface SpecialtySectionProps {
  specialty: Specialty;
  index?: number;
}

const SpecialtySection: React.FC<SpecialtySectionProps> = ({ specialty, index = 0 }) => {
  const router = useRouter();
  const { setContactPrefill } = useUIStore();
  const isReversed = index % 2 !== 0;
  const imageSrc = index % 2 === 0 ? conditionsImg : caresImg;

  const handleAppointmentClick = useCallback(() => {
    setContactPrefill({
      subject: `${specialty.title} - Randevu Talebi`,
      message: `${specialty.title} için randevu almak istiyorum.`,
    });
    router.push('/contact');
  }, [specialty.title, setContactPrefill, router]);

  return (
    <div className="group w-full bg-[#1a1a1a] border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-primary/30 transition-all duration-500 shadow-lg hover:shadow-blue-primary/10 hover:-translate-y-1">
      <div className={`flex flex-col md:flex-row ${isReversed ? 'md:flex-row-reverse' : ''} h-full`}>
        {/* Image Section */}
        <div className="w-full md:w-2/5 relative min-h-[180px] sm:min-h-[240px] md:min-h-full overflow-hidden shrink-0">
          <Image
            src={imageSrc}
            alt={specialty.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 mix-blend-luminosity hover:mix-blend-normal"
          />
          {/* Gradients for smooth blending */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/40 to-transparent md:hidden" />
          <div className={`hidden md:block absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/50 to-transparent`} />
          <div className={`hidden md:block absolute inset-0 ${isReversed ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-[#1a1a1a] via-[#1a1a1a]/80 to-transparent`} />

        </div>

        {/* Content Section */}
        <div className="w-full md:w-3/5 p-4 sm:p-6 md:p-10 flex flex-col justify-center relative z-10">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-blue-primary transition-colors">{specialty.title}</h3>
              <div className="w-10 sm:w-12 h-1 bg-blue-primary rounded-full mb-3 sm:mb-4"></div>
              <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed">{specialty.description}</p>
            </div>

            {specialty.details.length > 0 && (
              <ul className="flex flex-col gap-2 sm:gap-2.5 mt-2 bg-gray-900/50 p-3 sm:p-5 rounded-xl border border-gray-800/50">
                {specialty.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 sm:gap-3 text-gray-300 text-xs sm:text-sm">
                    <LuChevronRight size={14} className="text-blue-primary shrink-0 mt-0.5" />
                    <span className="leading-snug">{detail}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-4 sm:mt-6">
              <a
                href={MHRS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-primary hover:bg-blue-600 text-white text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-blue-primary/20 hover:shadow-blue-primary/40 animate-pulse-ring"
              >
                <LuCalendarCheck size={14} />
                Randevu Al
              </a>
              <button
                onClick={handleAppointmentClick}
                className="flex items-center gap-2 border border-gray-700 hover:border-blue-primary text-gray-300 hover:text-white bg-gray-800/50 hover:bg-blue-primary/10 text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium transition-all cursor-pointer"
              >
                <LuCalendarCheck size={14} />
                Randevu Almak İçin Ulaş
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpecialtySection
