"";
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import baseImage from '@/assets/img/op.jpg'
import { NAME, SURNAME, PROFESSION, GREEETINGS } from '@/constants/welcome'

const Welcome: React.FC = () => {

  return (
    <section className="w-full h-auto flex flex-row flex-wrap items-center justify-center">
      <div className="w-full h-auto flex md:flex-row flex-col-reverse items-start justify-between gap-8">
        <div className="w-full h-auto flex flex-col items-start justify-center gap-4">
          <div className="w-full h-auto flex flex-col items-start justify-center gap-2 text-left">
            <h2 className="text-4xl font-bold text-neutral-50 select">{NAME}</h2>
            <h2 className="text-4xl font-bold text-neutral-50 select">{SURNAME}</h2>
            <span className={`text-xl font-semibold text-[#ee2b4b]`}>{PROFESSION}</span>
            <p
              className="text-lg font-normal text-neutral-50 mt-4 select"
              style={{ whiteSpace: 'pre-wrap', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}
            >
              &quot;{GREEETINGS}&quot;
            </p>
          </div>
          <div className="w-full h-auto flex flex-row flex-wrap mt-2 items-start justify-start gap-4 text-left">
            <Link href="/about" className='bg-red-primary text-md font-normal text-neutral-50 hover:text-white rounded-sm px-4 py-2 duration-300'>Hakkımda</Link>
            <Link href="/contact" className='bg-gray-secondary text-md font-normal text-neutral-50 hover:text-white rounded-sm px-4 py-2 duration-300'>İletişim</Link>
          </div>
        </div>
        <aside className="k-baseImage-wrapper w-full h-auto flex flex-col items-center justify-center outline-[4px] outline-offset-[5px] outline-gray-300 rounded-md overflow-hidden">
          <Image
            src={baseImage}
            alt="Op.Dr. Ebubekir Korucuk"
            width={500}
            height={500}
            className="xl:aspect-3/2 sm:aspect-3/2 aspect-3/2 w-full h-full object-cover"
          />
        </aside>
      </div>
    </section>
  )
}

export default Welcome