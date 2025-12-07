import Image from 'next/image'
import React from 'react'
import { clr } from '@/constants/colors'
import op from '@/assets/img/op.png'
import Link from 'next/link'

const Welcome: React.FC = () => {
    return (
        <section className="w-full h-auto flex flex-row flex-wrap items-center justify-center mt-24">
            <div className="w-full h-auto flex flex-row items-start justify-between gap-8">
                <div className="w-full h-auto flex flex-col items-start justify-center gap-4">
                    <div className="w-full h-auto flex flex-col items-start justify-center gap-2 text-left">
                        <h2 className="text-4xl font-bold text-neutral-50 select">Op.Dr. Ebubekir</h2>
                        <h2 className="text-4xl font-bold text-neutral-50 select">Korucuk</h2>
                        <span className={`text-xl font-semibold text-[#ee2b4b]`}>Genel Cerrah | Müzisyen | Kaşif</span>
                        <p className="text-lg font-normal text-neutral-50 select">&quot;Dijital muayenehaneme hoş geldiniz. Burada, bir cerrahın soğukkanlılığını ve insan hayatına dokunmanın derin sorumluluğunu paylaşıyorum. Neşterin keskinliğiyle notaların ahengini birleştiriyor; tıbbın bilimsel gücünü, sanatın ruhuyla dengeliyorum. Hedefim; tecrübelerimle bilgilendirmek, ilham vermek ve sizlerle şeffaf, iyileştirici bir iletişim kurmak.&quot;</p>
                    </div>
                    <div className="w-full h-auto flex flex-row flex-wrap items-start justify-start gap-4 text-left">
                        <Link href="/about" className={`bg-[#212733] text-md font-normal text-neutral-50 hover:text-white rounded-sm px-4 py-2 duration-300`}>Hakkımda</Link>
                        <Link href="/contact" className={`bg-[#82132590] text-md font-normal text-[#ee2b4b] rounded-sm px-4 py-2 duration-300`}>İletişim</Link>
                    </div>
                </div>
                <div className="w-full h-auto flex flex-col items-center justify-center rounded-md overflow-hidden">
                    <Image
                        src={op}
                        alt="doctor"
                        width={500}
                        height={500}
                    />
                </div>
            </div>
            <aside></aside>
        </section>
    )
}

export default Welcome