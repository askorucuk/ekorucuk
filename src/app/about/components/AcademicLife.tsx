"use client";
import { JSX, useState } from 'react'
import { LuBookOpen, LuGlobe, LuUsers, LuPresentation, LuFileText, LuBookMarked, LuClipboardCheck, LuChevronRight } from 'react-icons/lu'
import clsx from 'clsx'

const TABS = [
  { id: 'international', label: 'Yurtdışı Tecrübesi', icon: <LuGlobe size={18} /> },
  { id: 'associations', label: 'Dernek Üyeliklerim', icon: <LuUsers size={18} /> },
  { id: 'conferences', label: 'Kongre ve Konferanslar', icon: <LuPresentation size={18} /> },
  { id: 'publications', label: 'Ulusal ve Uluslararası Yayınlar', icon: <LuFileText size={18} /> },
  { id: 'papers', label: 'Ulusal ve Uluslararası Bildiriler', icon: <LuClipboardCheck size={18} /> },
  { id: 'books', label: 'Kitap Bölümleri', icon: <LuBookMarked size={18} /> },
  { id: 'reviews', label: 'Dergi Hakemlikleri', icon: <LuBookOpen size={18} /> },
]

const placeholderContent: Record<string, { title: string; description: string }> = {
  international: {
    title: "Yurtdışı Tecrübesi",
    description: "Yurtdışı deneyim bilgileri eklenecek.",
  },
  associations: {
    title: "Dernek Üyeliklerim",
    description: "Dernek üyelik bilgileri eklenecek.",
  },
  conferences: {
    title: "Katıldığım Kongre ve Konferanslar",
    description: "Kongre ve konferans bilgileri eklenecek.",
  },
  publications: {
    title: "Ulusal ve Uluslararası Yayınlar",
    description: "Yayın bilgileri eklenecek.",
  },
  papers: {
    title: "Ulusal ve Uluslararası Bildiriler",
    description: "Bildiri bilgileri eklenecek.",
  },
  books: {
    title: "Kitap Bölümleri",
    description: "Kitap bölümü bilgileri eklenecek.",
  },
  reviews: {
    title: "Dergi Hakemlikleri",
    description: "Hakemlik bilgileri eklenecek.",
  },
}

const AcademicLife = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState(TABS[0].id)
  const current = placeholderContent[activeTab]

  return (
    <section className="w-full bg-black text-gray-300 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-blue-primary/10 rounded-xl flex items-center justify-center text-blue-primary">
          <LuBookOpen size={22} />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">Akademik Hayat</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Side Menu */}
        <nav className="md:w-72 shrink-0">
          <div className="flex flex-col gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer text-left',
                  'border',
                  activeTab === tab.id
                    ? 'bg-blue-primary/10 text-blue-primary border-blue-primary/30'
                    : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a] border-transparent'
                )}
              >
                {tab.icon}
                <span className="flex-1">{tab.label}</span>
                {activeTab === tab.id && <LuChevronRight size={16} />}
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1 bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 md:p-8 min-h-[300px]">
          <h3 className="text-lg font-semibold text-white mb-4">{current.title}</h3>
          <p className="text-gray-400 text-sm">{current.description}</p>
        </div>
      </div>
    </section>
  )
}

export default AcademicLife
