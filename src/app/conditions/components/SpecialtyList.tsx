"use client";
import React from 'react'
import SpecialtySection from './SpecialtySection'
import { specialities } from '@/constants/specs';

const SpecialtyList: React.FC = () => {
  console.log('specialities', specialities);
  return (
    <div className="flex flex-col gap-8 md:gap-12">
      {specialities.map((specialty, index) => (
        <SpecialtySection key={specialty.id} specialty={specialty} index={index} />
      ))}
    </div>
  )
}

export default SpecialtyList
