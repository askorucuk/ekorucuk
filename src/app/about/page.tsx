import { JSX } from 'react'
import ImageCollapse from './components/ImageCollapse'
import Journey from './components/Journey'
import Passions from './components/Passions'
const About = (): JSX.Element => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-start md:mt-16 mt-8">
      <ImageCollapse />
      <Journey />
      <Passions />
    </div>
  );
}

export default About;
