'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type CourseType = {
  _id: string;
  title: string;
  description: string;
  thumbnail?: string;
  createdAt: string;
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 6; 
  const [totalCourses, setTotalCourses] = useState(0);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/v1/course/get-courses?page=${page}&limit=${limit}`);
        const data = await res.json();
        if (data.success) {
          setCourses(data.data);
          setTotalCourses(data.totalCourses);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [page]);

  return (
    <div className='relative'>
        <Navbar />  
        <div className="min-h-screen flex items-center justify-center text-black">
        <div className="max-w-6xl mx-auto mt-24">
            <h1 className="text-3xl font-bold text-[#27187E] mb-6">Available Courses</h1>

            {loading ? (
            <p className="text-center text-[#27187E]">Loading...</p>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                <div
                    key={course._id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 border border-[#AEB8FE]"
                >
                    {course.thumbnail ? (
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-40 object-cover rounded-xl mb-4"
                    />
                    ) : (
                    <div className="w-full h-40 bg-[#AEB8FE] rounded-xl mb-4 flex items-center justify-center text-white font-semibold">
                        No Image
                    </div>
                    )}
                    <h2 className="text-xl font-semibold text-[#27187E]">{course.title}</h2>
                    <p className="text-sm text-[#27187E] mt-2">{course.description.slice(0, 100)}...</p>
                    <div className="mt-4">
                    <span className="text-xs bg-[#FF8600] text-white px-3 py-1 rounded-full">
                        New
                    </span>
                    </div>
                </div>
                ))}
            </div>
            )}

            <div className="mt-10 flex justify-center items-center gap-4">
            <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="bg-[#758BFD] text-white px-4 py-2 rounded-lg hover:bg-[#27187E] disabled:opacity-50 transition"
            >
                Previous
            </button>
            <span className="text-[#27187E] font-medium">Page {page}</span>
            <button
                onClick={() => setPage((prev) => (prev * limit < totalCourses ? prev + 1 : prev))}
                disabled={page * limit >= totalCourses}
                className="bg-[#758BFD] text-white px-4 py-2 rounded-lg hover:bg-[#27187E] disabled:opacity-50 transition"
            >
                Next
            </button>
            </div>
        </div>
        </div>
    </div>
  );
}


const Navbar = () => {
    return (
      <nav className="absolute flex w-full items-center justify-between border-t border-b border-neutral-200 px-8 py-4 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <h1 className="text-base font-bold tracking-tight md:text-2xl">UNILEARN</h1>
        </div>
        <Link href={"/student"}>
          <button className="cursor-pointer w-24 transform rounded-lg bg-[#27187E] px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FF8600] md:w-auto dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Back to Home
          </button>
        </Link>
      </nav>
    );
  };