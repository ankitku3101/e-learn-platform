"use client";

import { useState } from "react";
import { FiBookOpen, FiUsers, FiBarChart2, FiEdit2 } from "react-icons/fi";

const MyCourses = () => {
  const [courses, setCourses] = useState([
    {
      title: "Data Structures and Algorithms",
      code: "CSE201",
      enrolled: 56,
      performance: "82%",
      color: "bg-[#758BFD]",
    },
    {
      title: "Advanced Database Systems",
      code: "CSE402",
      enrolled: 42,
      performance: "75%",
      color: "bg-[#AEB8FE]",
    },
    {
      title: "Machine Learning Fundamentals",
      code: "CSE317",
      enrolled: 63,
      performance: "88%",
      color: "bg-[#27187E]",
    },
    {
      title: "Cloud Computing",
      code: "CSE455",
      enrolled: 38,
      performance: "69%",
      color: "bg-[#FF8600]",
    },
  ]);

  return (
    <div className="min-h-screen p-8 bg-[#F1F2F6]">
      <h2 className="text-3xl font-bold text-[#27187E] mb-6">My Courses</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course, index) => (
          <div
            key={index}
            className={`${course.color} text-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold leading-snug">{course.title}</h3>
                <p className="text-sm text-white/80">{course.code}</p>
              </div>
              <FiEdit2 className="text-white hover:text-white/80 cursor-pointer" />
            </div>

            <div className="mt-6 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <FiUsers size={16} /> Enrolled Students: {course.enrolled}
              </div>
              <div className="flex items-center gap-2">
                <FiBarChart2 size={16} /> Avg. Performance: {course.performance}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
