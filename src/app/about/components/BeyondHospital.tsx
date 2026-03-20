import { JSX } from 'react'
import { LuMusic } from 'react-icons/lu'

const BeyondHospital = (): JSX.Element => {
  return (
    <section className="w-full bg-black text-gray-300 py-8 sm:py-12">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-primary/10 rounded-xl flex items-center justify-center text-blue-primary">
          <LuMusic size={20} />
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Önlüğün Ötesinde</h2>
      </div>
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
        <p className="text-gray-400 leading-relaxed text-xs sm:text-sm md:text-base">
          Önlüğün Ötesinde paylaşımlarım yakında sizlerle olacak
        </p>
      </div>
    </section>
  )
}

export default BeyondHospital
