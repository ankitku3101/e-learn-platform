"use client";

import { useState } from "react";
import BackgroundGradient from "@/components/BackgroundGradient";
import Link from "next/link";
import { FiPlus, FiEdit2, FiTrash2, FiCheck, FiX } from "react-icons/fi";

type Course = {
  name: string;
  code: string;
  instructor: string;
};

const CourseManagementPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [newCourse, setNewCourse] = useState<Course>({ name: "", code: "", instructor: "" });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editCourse, setEditCourse] = useState<Course>({ name: "", code: "", instructor: "" });

  const handleAddCourse = () => {
    if (!newCourse.name || !newCourse.code || !newCourse.instructor) return;
    setCourses([newCourse, ...courses]);
    setNewCourse({ name: "", code: "", instructor: "" });
  };

  const handleDelete = (index: number) => {
    const updated = [...courses];
    updated.splice(index, 1);
    setCourses(updated);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditCourse(courses[index]);
  };

  const handleSaveEdit = () => {
    if (editIndex === null) return;
    const updated = [...courses];
    updated[editIndex] = editCourse;
    setCourses(updated);
    setEditIndex(null);
  };

  return (
    <div className="relative">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center text-black pt-16">
        <BackgroundGradient color1="#AEB8FE" color2="#758BFD" position="bottom" id={10} />
        <div className="w-full max-w-5xl bg-white p-8 rounded-lg shadow-lg mt-12">
          <h2 className="text-2xl font-bold text-center mb-6">📘 Course Management</h2>

          {/* Add New Course */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <input
              value={newCourse.name}
              onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
              placeholder="Course Name"
              className="border px-4 py-2 rounded-md"
            />
            <input
              value={newCourse.code}
              onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
              placeholder="Course Code"
              className="border px-4 py-2 rounded-md"
            />
            <input
              value={newCourse.instructor}
              onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
              placeholder="Instructor"
              className="border px-4 py-2 rounded-md"
            />
            <button
              onClick={handleAddCourse}
              className="bg-[#27187E] text-white px-4 py-2 rounded-md hover:bg-[#FF8600] transition flex items-center justify-center gap-2"
            >
              <FiPlus /> Add
            </button>
          </div>

          {/* Course List */}
          <div className="grid gap-4">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-[#F1F2F6] p-5 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.01] transition-transform"
              >
                {editIndex === index ? (
                  <>
                    <div className="grid md:grid-cols-3 gap-3 mb-2">
                      <input
                        value={editCourse.name}
                        onChange={(e) => setEditCourse({ ...editCourse, name: e.target.value })}
                        className="border px-3 py-2 rounded-md"
                      />
                      <input
                        value={editCourse.code}
                        onChange={(e) => setEditCourse({ ...editCourse, code: e.target.value })}
                        className="border px-3 py-2 rounded-md"
                      />
                      <input
                        value={editCourse.instructor}
                        onChange={(e) => setEditCourse({ ...editCourse, instructor: e.target.value })}
                        className="border px-3 py-2 rounded-md"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveEdit}
                        className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 flex items-center gap-1"
                      >
                        <FiCheck /> Save
                      </button>
                      <button
                        onClick={() => setEditIndex(null)}
                        className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-gray-500 flex items-center gap-1"
                      >
                        <FiX /> Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between flex-wrap md:flex-nowrap md:items-center gap-3">
                      <div>
                        <h4 className="text-lg font-bold text-[#27187E]">{course.name}</h4>
                        <p className="text-sm text-gray-700">Code: {course.code}</p>
                        <p className="text-sm text-gray-700">Instructor: {course.instructor}</p>
                      </div>
                      <div className="flex gap-3 mt-2 md:mt-0">
                        <button
                          onClick={() => handleEdit(index)}
                          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          <FiEdit2 /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="text-red-600 hover:text-red-800 flex items-center gap-1"
                        >
                          <FiTrash2 /> Delete
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="absolute flex w-full items-center justify-between border-t border-b border-neutral-200 px-8 py-4 dark:border-neutral-800">
      <h1 className="text-base font-bold tracking-tight md:text-2xl">UNILEARN</h1>
      <Link href={"/admin"}>
        <button className="cursor-pointer w-24 transform rounded-lg bg-[#27187E] px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FF8600] md:w-auto dark:bg-white dark:text-black dark:hover:bg-gray-200">
          Back to Home
        </button>
      </Link>
    </nav>
  );
};

export default CourseManagementPage;
