/* eslint-disable @next/next/no-img-element */
import { JSX } from 'react';
import Register from '../../assets/DOOR.gif';

const Blog = (): JSX.Element => {
  return (
    <div className="w-full h-auto bg-black text-white flex items-center justify-center p-4 md:p-12">
      <img src={Register.src} alt="Register" className="w-full h-full min-w-[400px] min-h-[400px]" />
    </div>
  );
}

export default Blog;

