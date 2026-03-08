import { JSX } from 'react'
import { User } from 'lucide-react'

const WhoAmI = (): JSX.Element => {
  return (
    <section className="w-full bg-black text-gray-300 py-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-primary/10 rounded-xl flex items-center justify-center text-blue-primary">
          <User size={22} />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">Ben Kimim?</h2>
      </div>
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 md:p-8">
        <h3 className="text-lg font-semibold text-white mb-4">Özgeçmişim</h3>
        <p className="text-gray-400 leading-relaxed text-sm md:text-base">
          Genel cerrahi alanında uzmanlaşmış bir hekim olarak, hastalarıma en güncel ve kanıta dayalı tedavi yöntemlerini sunmayı hedefliyorum.
          Cerrahi pratiğimde minimal invaziv yaklaşımları ön planda tutarak hastaların daha hızlı iyileşmesini ve daha az ağrı yaşamasını sağlamaya çalışıyorum.
        </p>
      </div>
    </section>
  )
}

export default WhoAmI
