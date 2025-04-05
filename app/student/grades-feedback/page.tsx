"use client";

import { useState } from "react";
import Link from "next/link";
import BackgroundGradient from "@/components/BackgroundGradient";

const Navbar = () => {
  return (
    <nav className="absolute flex w-full items-center justify-between border-t border-b border-neutral-200 px-8 py-4 dark:border-neutral-800 bg-white z-50">
      <div className="flex items-center gap-2">
        <h1 className="text-base font-bold tracking-tight md:text-2xl">UNILEARN</h1>
      </div>
      <Link href="/student">
        <button className="cursor-pointer w-24 transform rounded-lg bg-[#27187E] px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FF8600] md:w-auto dark:bg-white dark:text-black dark:hover:bg-gray-200">
          Back to Home
        </button>
      </Link>
    </nav>
  );
};

const GradesAndFeedback = () => {
  const [grades] = useState([
    {
      course: "Mathematics",
      grade: "A",
      feedback: "Excellent grasp of concepts. Keep practicing problem-solving!",
      performance: 90,
    },
    {
      course: "Physics",
      grade: "B+",
      feedback: "Good understanding, needs improvement in numerical questions.",
      performance: 75,
    },
    {
      course: "Chemistry",
      grade: "A-",
      feedback: "Great performance in lab and theory. Revise regularly.",
      performance: 85,
    },
  ]);

  return (
    <div className="relative">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center text-black pt-16">
        <BackgroundGradient color1="#AEB8FE" color2="#758BFD" position="bottom" id={32} />
        <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">📊 Grades & Feedback</h2>

          {grades.map((item, index) => (
            <div key={index} className="mb-8 border rounded-lg p-5 shadow-md bg-gray-50">
              <h3 className="text-xl font-semibold mb-2">📘 {item.course}</h3>
              <p className="text-sm mb-1">Grade: <span className="font-medium">{item.grade}</span></p>
              <p className="text-sm mb-3">Feedback: <span className="italic">{item.feedback}</span></p>

              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-green-500 h-4 rounded-full"
                  style={{ width: `${item.performance}%` }}
                ></div>
              </div>
              <p className="text-sm text-right mt-1">Performance: {item.performance}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradesAndFeedback;
