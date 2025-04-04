import BackgroundGradient from '@/components/BackgroundGradient'
import Hero from '@/components/Hero'
import React from 'react'

function Landing() {
  return (
    <>
        <BackgroundGradient color1='#AEB8FE' color2='#758BFD' id={9} position='right' />
        <Hero />
    </>
)
}

export default Landing