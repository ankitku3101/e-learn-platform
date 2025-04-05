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

const LectureAccess = () => {
  const [courses] = useState([
    {
      id: 1,
      name: "Mathematics",
      recordedLectures: [
        { id: 1, title: "Algebra Basics", videoUrl: "https://www.youtube.com/embed/5o3fMLPY7qY" },
        { id: 2, title: "Linear Equations", videoUrl: "https://www.youtube.com/embed/nCUp_XwK1Uc" },
      ],
      liveClassLink: "https://meet.google.com/math-live",
      materials: [
        { id: 1, title: "Lecture Notes - Algebra", fileUrl: "/dummy/algebra.pdf" },
        { id: 2, title: "Linear Equations PPT", fileUrl: "/dummy/linear.pptx" },
      ],
    },
    {
      id: 2,
      name: "Physics",
      recordedLectures: [
        { id: 1, title: "Motion & Laws", videoUrl: "https://www.youtube.com/embed/x2gr-CvEhiQ" },
      ],
      liveClassLink: "https://meet.google.com/physics-live",
      materials: [
        { id: 1, title: "Motion Handout", fileUrl: "/dummy/motion.pdf" },
      ],
    },
  ]);

  return (
    <div className="relative">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center text-black pt-16">
        <BackgroundGradient color1="#AEB8FE" color2="#758BFD" position="bottom" id={31} />
        <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">🎓 Lecture Access</h2>

          {courses.map((course) => (
            <div key={course.id} className="mb-10 border rounded-lg p-5 shadow-md bg-gray-50">
              <h3 className="text-xl font-semibold mb-4">📘 {course.name}</h3>

              <div className="mb-6">
                <h4 className="text-lg font-medium mb-2">Recorded Lectures</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {course.recordedLectures.map((lecture) => (
                    <div key={lecture.id} className="aspect-video">
                      <iframe
                        width="100%"
                        height="100%"
                        src={lecture.videoUrl}
                        title={lecture.title}
                        allowFullScreen
                        className="rounded-md border"
                      ></iframe>
                      <p className="mt-2 text-sm font-medium text-center">{lecture.title}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium mb-2">Live Class</h4>
                <a
                  href={course.liveClassLink}
                  target="_blank"
                  className="text-blue-600 hover:underline text-sm bg-blue-100 px-3 py-1 rounded inline-block"
                >
                  Join Now
                </a>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-2">Course Materials</h4>
                <ul className="list-disc list-inside space-y-2">
                  {course.materials.map((mat) => (
                    <li key={mat.id}>
                      <a href={mat.fileUrl} className="text-blue-700 hover:underline" download>
                        📄 {mat.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LectureAccess;
