import { JSX } from 'react'
import { Music } from 'lucide-react'

const BeyondHospital = (): JSX.Element => {
  return (
    <section className="w-full bg-black text-gray-300 py-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-primary/10 rounded-xl flex items-center justify-center text-blue-primary">
          <Music size={22} />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">Önlüğün Ötesinde</h2>
      </div>
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 md:p-8">
        <p className="text-gray-400 leading-relaxed text-sm md:text-base">
          Müzik ve cartcurt yazısı burada yer alacak.
        </p>
      </div>
    </section>
  )
}

export default BeyondHospital
