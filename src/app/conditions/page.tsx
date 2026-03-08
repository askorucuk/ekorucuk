"use client";
import { JSX } from 'react';
import SpecialtyList from './components/SpecialtyList';

const Hastaliklar = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-black text-white py-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-3 text-white">Hastalıklar & Tedaviler</h2>
          <p className="text-gray-400 text-lg">Genel cerrahi uzmanlık alanlarım ve tedavi yöntemleri hakkında bilgi edinebilirsiniz.</p>
        </div>
        <SpecialtyList />
      </div>
    </div>
  );
};

export default Hastaliklar;
