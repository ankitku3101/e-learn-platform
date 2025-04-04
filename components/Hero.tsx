"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Corrected import
import Image from "next/image";
import Navbar from "./ui/Navbar";
import BackgroundGradient from "./BackgroundGradient";
import { FlipWords } from "./ui/flip-words";

const words = ["innovation", "collaboration", "growth", "success"];

function Hero() {
  // Prevent hydration mismatch
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      id="hero"
      className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center"
    >
      <BackgroundGradient color1="#AEB8FE" color2="#758BFD" position="bottom" id={6} />
      <div className="px-4 py-10 md:py-20">
        {/* Animated Heading */}
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-3xl font-bold text-[#27187E] md:text-5xl lg:text-7xl">
          {"Transforming Learning Empowering Colleges"
            .split(" ")
            .map((word, index) =>
              isMounted ? ( // Prevent hydration mismatch
                <motion.span
                  key={index}
                  initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: "easeInOut",
                  }}
                  className="mr-2 inline-block"
                >
                  {word}
                </motion.span>
              ) : (
                <span key={index} className="mr-2 inline-block">
                  {word}
                </span>
              )
            )}
        </h1>

        {/* Subtext with FlipWords */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="relative z-10 mx-auto py-4 text-center text-lg font-medium text-[#27187E]"
        >
          Enhancing learning, connecting minds, and streamlining{" "}
          {isMounted && <FlipWords words={words} />}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button className="w-60 transform rounded-lg bg-[#FF8600] px-6 py-2 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e67500]">
            Explore Now
          </button>
          <button className="w-60 transform rounded-lg border border-[#758BFD] bg-white px-6 py-2 font-medium text-[#27187E] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F1F2F6]">
            Contact Support
          </button>
        </motion.div>

        {/* Image Preview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1.2 }}
          className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-[#F1F2F6] p-4 shadow-md"
        >
          <div className="w-full overflow-hidden rounded-xl border border-[#AEB8FE]">
            <Image
              src="/hero.jpg"
              alt="Landing page preview"
              className="aspect-[16/9] h-auto w-full object-cover"
              height={1000}
              width={1000}
              priority 
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
