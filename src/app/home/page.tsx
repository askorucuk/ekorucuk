"use client";
import { JSX } from 'react'
import Welcome from '@/app/home/components/Welcome'
import AppointmentCTA from '@/app/home/components/AppointmentCTA'

function Home(): JSX.Element {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-start my-16">
      <Welcome />
      <AppointmentCTA />
    </div>
  )
}

export default Home