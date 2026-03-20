import { JSX } from 'react'
import { LuGraduationCap, LuBriefcase } from 'react-icons/lu'

type TimelineItem = {
  id: string;
  year: string;
  title: string;
  description: string;
  type: 'education' | 'work';
}

const timeline: TimelineItem[] = [
  {
    id: "1",
    year: "2013 - 2019",
    title: "Tıp Fakültesi",
    description: "Ege Üniversitesi Tıp Fakültesi",
    type: "education"
  },
  {
    id: "2",
    year: "2019",
    title: "Pratisyen Doktor",
    description: "Horasan Devlet Hastanesi",
    type: "work"
  },
  {
    id: "3",
    year: "2019 - 2025",
    title: "Genel Cerrahi İhtisası",
    description: "Ege Üniversitesi Tıp Fakültesi Hastanesi Genel Cerrahi ABD",
    type: "education"
  },
  {
    id: "4",
    year: "2026 - Halen",
    title: "Operatör Doktor",
    description: "Van Erciş Şehit Rıdvan Çevik Devlet Hastanesi",
    type: "work"
  },
]

const EducationWork = (): JSX.Element => {
  return (
    <section id="education-work-section" className="w-full bg-black text-gray-300 py-8 sm:py-12">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-primary/10 rounded-xl flex items-center justify-center text-blue-primary">
          <LuGraduationCap size={20} />
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Eğitim ve Çalışma</h2>
      </div>
      <p className="text-gray-500 text-xs sm:text-sm mb-6 sm:mb-8">Eğitim aldığım ve çalıştığım yerler, tarih sırasıyla</p>
      <div className="relative pl-0 sm:pl-2">
        {timeline.map((item, index) => (
          <div key={item.id} className="flex gap-3 sm:gap-6 mb-6 sm:mb-8 relative group">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1a1a1a] border border-gray-800 flex items-center justify-center text-blue-primary z-10 shrink-0">
                {item.type === 'education' ? <LuGraduationCap size={16} /> : <LuBriefcase size={16} />}
              </div>
              {index !== timeline.length - 1 && (
                <div className="w-[1px] h-full bg-gradient-to-b from-blue-primary/50 to-transparent my-2 absolute top-8 sm:top-10 left-4 sm:left-5 -translate-x-1/2" />
              )}
            </div>
            <div className="pt-1 bg-[#1a1a1a] border border-gray-800 rounded-xl sm:rounded-2xl p-3 sm:p-5 flex-1 group-hover:border-blue-primary/50 transition-all duration-300 min-w-0">
              <span className="text-[10px] sm:text-xs text-blue-primary font-mono">{item.year}</span>
              <h4 className="text-sm sm:text-lg text-white font-medium mt-1">{item.title}</h4>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 break-words">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default EducationWork
