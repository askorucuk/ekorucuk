import { JSX } from 'react'
import Welcome from '@/app/home/components/Welcome'

function Home(): JSX.Element {
  return (
    <div className="w-full h-full flex flex-col items-center justify-start mt-16">
      <Welcome />
    </div>
  )
}

export default Home