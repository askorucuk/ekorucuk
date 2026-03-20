"use client";
import { JSX, useState } from 'react'
import { LuBookOpen, LuGlobe, LuUsers, LuPresentation, LuFileText, LuBookMarked, LuClipboardCheck, LuChevronRight } from 'react-icons/lu'
import clsx from 'clsx'
import { academicData } from '@/constants/academic'

const TABS = [
  { id: 'international', label: 'Yurtdışı Tecrübesi', icon: <LuGlobe size={18} /> },
  { id: 'associations', label: 'Dernek Üyeliklerim', icon: <LuUsers size={18} /> },
  { id: 'conferences', label: 'Kongre ve Konferanslar', icon: <LuPresentation size={18} /> },
  { id: 'publications', label: 'Ulusal ve Uluslararası Yayınlar', icon: <LuFileText size={18} /> },
  { id: 'papers', label: 'Ulusal ve Uluslararası Bildiriler', icon: <LuClipboardCheck size={18} /> },
  { id: 'books', label: 'Kitap Bölümleri', icon: <LuBookMarked size={18} /> },
  { id: 'reviews', label: 'Dergi Hakemlikleri', icon: <LuBookOpen size={18} /> },
]

const AcademicLife = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState(TABS[0].id)
  const current = academicData[activeTab]

  return (
    <section className="w-full bg-black text-gray-300 py-8 sm:py-12">
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-primary/10 rounded-xl flex items-center justify-center text-blue-primary">
          <LuBookOpen size={20} />
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Akademik Hayat</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
        {/* Side Menu - horizontal scroll on mobile */}
        <nav className="md:w-72 shrink-0">
          <div className="flex md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0 scrollbar-hide -mx-1 px-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  'flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer text-left whitespace-nowrap md:whitespace-normal',
                  'border',
                  activeTab === tab.id
                    ? 'bg-blue-primary/10 text-blue-primary border-blue-primary/30'
                    : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a] border-transparent'
                )}
              >
                {tab.icon}
                <span className="flex-1">{tab.label}</span>
                {activeTab === tab.id && <LuChevronRight size={16} className="hidden md:block" />}
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1 bg-[#1a1a1a] border border-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 min-h-[200px] sm:min-h-[300px] max-h-[500px] sm:max-h-[600px] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-white">{current.title}</h3>
            <span className="text-[10px] sm:text-xs text-blue-primary bg-blue-primary/10 px-2 py-0.5 rounded-md font-mono shrink-0">
              {current.items.length}
            </span>
          </div>
          <ul className="flex flex-col gap-2.5">
            {current.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 sm:gap-3 text-gray-400 text-xs sm:text-sm">
                <LuChevronRight size={14} className="text-blue-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default AcademicLife
