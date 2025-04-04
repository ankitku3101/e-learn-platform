import React from 'react'
import { FlipWords } from './ui/flip-words'
import BackgroundGradient from './BackgroundGradient';

const words = ["learning", "teaching", "assessment"];

function Hero() {
  return (
    <section id='hero' className='relative flex flex-col items-center justify-center h-screen'>
        <BackgroundGradient color1="#AEB8FE" color2="#758BFD" position="bottom" id={6} />
        <div className='text-center'>
            <h1 className='text-7xl font-semibold tracking-tighter m-2'>
                UNILEARN
            </h1>
            <h2 className='text-2xl tracking-tight'>
                Enhancing education, connecting minds, and streamlining
                <FlipWords words={words} /> <br />
            </h2>
        </div>
    </section>
  )
}

export default Hero