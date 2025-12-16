import { JSX, useState } from 'react'
import { FileText, Heart } from 'lucide-react';
import { timelineData } from '@/constants/journey';
import clsx from 'clsx';

const TABS = [{ id: 'journey', label: 'Professional Journey' }, { id: 'publications', label: 'Publications' }, { id: 'passions', label: 'Personal Passions' }];

const Journey = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  return (
    <section className="w-full h-full bg-black min-h-[500px] text-gray-300 pt-8" id="journey-section">
      <div className="w-full h-auto">
        <div className="flex space-x-8 border-b border-gray-800 mb-10 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx('pb-4 text-sm md:text-base font-medium transition-colors relative whitespace-nowrap cursor-pointer',
                activeTab === tab.id ? "text-white" : "text-gray-500 hover:text-gray-300"
              )}
              style={{ fontSize: 'clamp(.75rem, 2.5vw, 1rem)' }}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ff2e4d]" />
              )}
            </button>
          ))}
        </div>
        <div className="animate-in fade-in zoom-in duration-300">
          {activeTab === TABS[0].id && (
            <div>
              <h3 className="text-2xl font-semibold text-white mb-8" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}>Professional Journey</h3>
              <div className="relative pl-2">
                {timelineData.map((item, index) => (
                  <div key={item.id} className="flex gap-6 mb-8 relative group">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-secondary flex items-center justify-center text-[#ff2e4d] z-10">
                        {item.icon}
                      </div>
                      {index !== timelineData.length - 1 && (
                        <div className="w-[1px] h-full bg-gradient-to-b from-[#ff2e4d]/50 to-transparent my-2 absolute top-10 left-5 -translate-x-1/2" />
                      )}
                    </div>
                    <div className="pt-1">
                      <h4 className="text-lg text-gray-100 font-medium group-hover:text-[#ff2e4d] transition-colors" style={{ fontSize: 'clamp(.75rem, 2.5vw, 1rem)' }}>
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-500 font-mono block mt-1" style={{ fontSize: 'clamp(.5rem, 2.5vw, .75rem)' }}>
                        {item.description}
                      </p>
                      <span className="text-sm text-gray-500 font-mono block mt-1" style={{ fontSize: 'clamp(.5rem, 2.5vw, .75rem)' }}>
                        {item.year}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === TABS[1].id && (
            <div className="text-center py-12 border border-dashed border-gray-800 rounded-lg">
              <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Yayınlanan makaleler burada listelenecek.</p>
            </div>
          )}
          {activeTab === TABS[2].id && (
            <div className="text-center py-12 border border-dashed border-gray-800 rounded-lg">
              <Heart className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Müzik ve keşif tutkuları burada yer alacak.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Journey