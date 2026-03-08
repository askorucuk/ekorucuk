"use client";
import { JSX } from 'react'
import ImageCollapse from './components/ImageCollapse'
import WhoAmI from './components/WhoAmI'
import EducationWork from './components/EducationWork'
import AcademicLife from './components/AcademicLife'
import BeyondHospital from './components/BeyondHospital'

const About = (): JSX.Element => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-start md:mt-16 mt-8">
      <ImageCollapse />
      <WhoAmI />
      <EducationWork />
      <AcademicLife />
      <BeyondHospital />
    </div>
  );
}

export default About;
