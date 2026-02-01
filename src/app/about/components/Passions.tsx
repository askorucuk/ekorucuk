import { JSX } from 'react'
import { passions, passionsDescription } from '@/constants/passions'

const Passions = (): JSX.Element => {
  return (
    <section className="bg-black text-gray-300 py-16 px-6 md:px-12 border-t border-gray-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}>Kişisel Tutkular</h2>
          <p className="text-gray-400 max-w-3xl text-lg leading-relaxed" style={{ fontSize: 'clamp(.75rem, 2.5vw, 1rem)' }}>
            {passionsDescription}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {passions.map((item, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="w-full aspect-square bg-[#111111] border border-gray-800 rounded-2xl mb-5 overflow-hidden relative transition-all duration-300 group-hover:border-[#3C88CB]/50 group-hover:shadow-[0_0_20px_rgba(255,46,77,0.1)]">
                {item.img}
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#3C88CB] transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Passions;
