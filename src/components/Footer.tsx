import { Copyright } from 'lucide-react'
import IconLogo from '../assets/logo.svg'
import React from 'react'
import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer className="w-full h-auto flex flex-col items-center justify-center border-t border-gray-secondary gap-4 mt-auto pb-4">
      <div className="k-logo-wrapper w-auto flex items-center justify-center gap-2 mt-4">
        <IconLogo className="w-5 h-5 shrink-0" />
        <h1 className="text-md font-semibold text-neutral-50">Op.Dr. Ebubekir Korucuk</h1>
      </div>
      <div className="w-full h-auto flex flex-row items-center justify-center text-xs text-gray-500 gap-2">
        <Copyright size={10} />
        <p>{new Date().getFullYear()}</p>
        <p>Op.Dr. Ebubekir Korucuk. All rights reserved.</p>
      </div>
      <div className="w-full h-auto flex flex-row items-center justify-center text-xs md:text-sm md:gap-4 gap-2 duration-300">
        <Link
          href="https://www.linkedin.com/in/drekorucuk229"
          target="_blank"
          className="text-gray-500 hover:text-gray-300 cursor-pointer duration-300"
        >
          LinkedIn
        </Link>
        <span className="text-gray-500">|</span>
        <Link
          href="https://www.researchgate.net/profile/Ebubekir-Korucuk"
          target="_blank"
          className="text-gray-500 hover:text-gray-300 cursor-pointer duration-300"
        >
          ResearchGate
        </Link>
        <span className="text-gray-500">|</span>
        <Link
          href="https://www.instagram.com/ekorucuk/"
          target="_blank"
          className="text-gray-500 hover:text-gray-300 cursor-pointer duration-300"
        >
          Instagram
        </Link>
      </div>
    </footer>
  )
}

export default Footer