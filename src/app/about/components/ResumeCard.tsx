"use client";
import { JSX, useState, useEffect } from 'react'
import { LuFileText, LuDownload, LuEye, LuX } from 'react-icons/lu'

const RESUME_PATH = '/resume.pdf'

const ResumeCard = (): JSX.Element => {
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    if (showPreview) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [showPreview])

  return (
    <>
      <div className="w-full bg-[#1a1a1a] border border-gray-800 rounded-2xl p-4 sm:p-5 md:p-6 hover:border-blue-primary/30 transition-all duration-300 mt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-primary/10 rounded-xl flex items-center justify-center text-blue-primary shrink-0">
              <LuFileText size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm sm:text-base font-medium text-white">Özgeçmiş</h4>
              <p className="text-gray-500 text-xs mt-0.5">Özgeçmişime buradan ulaşabilirsiniz</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto">
            <button
              onClick={() => setShowPreview(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg font-medium transition-all cursor-pointer border border-gray-700 hover:border-gray-600"
            >
              <LuEye size={15} />
              Önizleme
            </button>
            <a
              href={RESUME_PATH}
              download
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-primary hover:bg-blue-600 text-white text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg font-medium transition-all shadow-lg shadow-blue-primary/20 hover:shadow-blue-primary/40"
            >
              <LuDownload size={15} />
              İndir
            </a>
          </div>
        </div>
      </div>

      {/* Preview Modal - Fully Responsive */}
      {showPreview && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4"
          onClick={(e) => e.target === e.currentTarget && setShowPreview(false)}
        >
          <div className="relative w-full sm:max-w-4xl h-[95vh] sm:h-[85vh] bg-[#1a1a1a] border-t sm:border border-gray-800 rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-800 shrink-0">
              <h3 className="text-white font-medium text-sm sm:text-base">Özgeçmiş Önizleme</h3>
              <div className="flex items-center gap-2">
                <a
                  href={RESUME_PATH}
                  download
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-primary/20 hover:bg-blue-primary/30 text-blue-primary transition-colors"
                >
                  <LuDownload size={16} />
                </a>
                <button
                  onClick={() => setShowPreview(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <LuX size={18} />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto">
              <iframe
                src={RESUME_PATH}
                className="w-full h-full border-0 min-h-[500px]"
                title="Özgeçmiş"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ResumeCard
