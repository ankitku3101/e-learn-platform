"use client";

import { useEffect, useState } from "react";
import BackgroundGradient from "@/components/BackgroundGradient";
import Link from "next/link";

import { FiDownload } from "react-icons/fi";

// Types

type Student = {
  name: string;
  avgScore: number;
  attendance: string;
};

type Course = {
  course: string;
  completion: string;
};

type Faculty = {
  faculty: string;
  sessions: number;
};

const ReportGeneration = () => {
  const [studentPerformance, setStudentPerformance] = useState<Student[]>([]);
  const [courseProgress, setCourseProgress] = useState<Course[]>([]);
  const [facultyActivities, setFacultyActivities] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from an API
    setTimeout(() => {
      setStudentPerformance([
        { name: "Rahul Kumar", avgScore: 87, attendance: "92%" },
        { name: "Priya Sharma", avgScore: 78, attendance: "88%" },
      ]);
      setCourseProgress([
        { course: "Maths 101", completion: "75%" },
        { course: "Physics 202", completion: "60%" },
      ]);
      setFacultyActivities([
        { faculty: "Dr. Ramesh", sessions: 18 },
        { faculty: "Prof. Neha", sessions: 20 },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleDownload = () => {
    const report = {
      studentPerformance,
      courseProgress,
      facultyActivities,
    };
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    element.href = URL.createObjectURL(file);
    element.download = "unilearn_report.json";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="relative">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center text-black pt-16">
        <BackgroundGradient color1="#AEB8FE" color2="#758BFD" position="bottom" id={10} />
        <div className="w-full max-w-5xl bg-white p-8 rounded-lg shadow-lg mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-center w-full">Report Generation</h2>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-[#27187E] text-white px-4 py-2 rounded-md hover:bg-[#FF8600] transition"
            >
              <FiDownload /> Download Report
            </button>
          </div>

          {loading ? (
            <p className="text-center">Loading reports...</p>
          ) : (
            <>
              {/* Student Performance */}
              <ReportSection title="📊 Student Performance">
                {studentPerformance.map((student, index) => (
                  <ReportCard key={index} title={student.name}>
                    <p>Average Score: <b>{student.avgScore}</b></p>
                    <p>Attendance: <b>{student.attendance}</b></p>
                  </ReportCard>
                ))}
              </ReportSection>

              {/* Course Progress */}
              <ReportSection title="📚 Course Progress">
                {courseProgress.map((course, index) => (
                  <ReportCard key={index} title={course.course}>
                    <p>Completion: <b>{course.completion}</b></p>
                  </ReportCard>
                ))}
              </ReportSection>

              {/* Faculty Activities */}
              <ReportSection title="👩‍🏫 Faculty Activities">
                {facultyActivities.map((faculty, index) => (
                  <ReportCard key={index} title={faculty.faculty}>
                    <p>Sessions Conducted: <b>{faculty.sessions}</b></p>
                  </ReportCard>
                ))}
              </ReportSection>
            </>
          )}
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
      <Link href={"/admin"}>
        <button className="cursor-pointer w-24 transform rounded-lg bg-[#27187E] px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FF8600] md:w-auto dark:bg-white dark:text-black dark:hover:bg-gray-200">
          Back to Home
        </button>
      </Link>
    </nav>
  );
};

const ReportSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <h3 className="text-xl font-semibold text-[#27187E] mb-4">{title}</h3>
    <div className="grid md:grid-cols-2 gap-6">{children}</div>
  </div>
);

const ReportCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-[#F1F2F6] p-6 rounded-xl shadow-md transition-transform duration-300 transform hover:scale-[1.03] hover:shadow-xl">
    <h4 className="text-lg font-bold mb-2 text-[#27187E]">{title}</h4>
    <div className="text-sm text-gray-700">{children}</div>
  </div>
);

export default ReportGeneration;
