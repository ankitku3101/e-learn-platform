import BackgroundGradient from '@/components/BackgroundGradient'
import Hero from '@/components/Hero'
import Navbar from '@/components/ui/Navbar'
import React from 'react'

function Landing() {
  return (
    <>
        <Navbar />
        <BackgroundGradient color1='#AEB8FE' color2='#9ad4f5' id={9} position='right' />
        <Hero />
    </>
)
}

export default Landing

