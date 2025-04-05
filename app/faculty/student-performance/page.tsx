"use client";

import { useEffect, useState } from "react";
import BackgroundGradient from "@/components/BackgroundGradient";
import Link from "next/link";

const StudentPerformanceTracking = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "Rahul Kumar", assignmentScore: 85, quizScore: 90, feedback: "", submitted: false },
    { id: 2, name: "Priya Sharma", assignmentScore: 78, quizScore: 82, feedback: "", submitted: false },
  ]);

  const handleGradeChange = (id: number, field: string, value: number | string) => {
    const updated = students.map((student) =>
      student.id === id ? { ...student, [field]: value, submitted: false } : student
    );
    setStudents(updated);
  };

  const handleSubmit = (id: number) => {
    const updated = students.map((student) =>
      student.id === id ? { ...student, submitted: true } : student
    );
    setStudents(updated);
  };

  return (
    <div className="relative">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center text-black pt-16">
        <BackgroundGradient color1="#AEB8FE" color2="#758BFD" position="bottom" id={20} />
        <div className="w-full max-w-6xl bg-white p-8 rounded-lg shadow-lg mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">🎓 Student Performance Tracking</h2>

          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-[#F1F2F6] text-left">
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Assignment Score</th>
                  <th className="px-4 py-3">Quiz Score</th>
                  <th className="px-4 py-3">Feedback</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">{student.name}</td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        className="border p-1 rounded w-20"
                        value={student.assignmentScore}
                        onChange={(e) =>
                          handleGradeChange(student.id, "assignmentScore", +e.target.value)
                        }
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        className="border p-1 rounded w-20"
                        value={student.quizScore}
                        onChange={(e) =>
                          handleGradeChange(student.id, "quizScore", +e.target.value)
                        }
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        className="border p-1 rounded w-full"
                        placeholder="Enter feedback..."
                        value={student.feedback}
                        onChange={(e) =>
                          handleGradeChange(student.id, "feedback", e.target.value)
                        }
                      />
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleSubmit(student.id)}
                        className="bg-[#27187E] text-white px-3 py-1 rounded hover:bg-[#FF8600] transition-all"
                      >
                        Submit
                      </button>
                      {student.submitted && (
                        <p className="text-green-600 text-sm mt-1">Feedback submitted!</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="absolute flex w-full items-center justify-between border-t border-b border-neutral-200 px-8 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        <h1 className="text-base font-bold tracking-tight md:text-2xl">UNILEARN</h1>
      </div>
      <Link href="/faculty">
        <button className="cursor-pointer w-24 transform rounded-lg bg-[#27187E] px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FF8600] md:w-auto dark:bg-white dark:text-black dark:hover:bg-gray-200">
          Back to Home
        </button>
      </Link>
    </nav>
  );
};

export default StudentPerformanceTracking;
