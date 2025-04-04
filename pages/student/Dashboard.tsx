"use client"
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import ProfileCard from "@/components/ProfileCard";
import CourseCard from "@/components/CourseCards";
import QuizCard from "@/components/QuizCard";
import StatCard from "@/components/StatCard";
import PerformanceChart from "@/components/PerformanceChart";
import { BookOpen, Award, Clock, BookCheck } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock data
const studentData = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  studentId: "STU12345",
  department: "Computer Science"
};

const coursesData = [
  {
    id: 1,
    title: "Introduction to Web Development",
    instructor: "Dr. Sarah Parker",
    progress: 75,
    bgColor: "bg-elearn-tertiary"
  },
  {
    id: 2,
    title: "Data Structures and Algorithms",
    instructor: "Prof. Michael Chen",
    progress: 45,
    bgColor: "bg-elearn-secondary"
  },
  {
    id: 3,
    title: "Machine Learning Fundamentals",
    instructor: "Dr. Emily Rodriguez",
    progress: 20,
    bgColor: "bg-elearn-primary"
  },
  {
    id: 4,
    title: "UI/UX Design Principles",
    instructor: "Sarah Thompson",
    progress: 0,
    upcoming: true,
    bgColor: "bg-elearn-accent"
  },
];

const quizzesData = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    courseName: "Introduction to Web Development",
    date: "April 10, 2025",
    questions: 15,
    duration: "45 min",
    status: "upcoming" as const
  },
  {
    id: 2,
    title: "CSS Layouts Quiz",
    courseName: "Introduction to Web Development",
    date: "April 3, 2025",
    questions: 10,
    duration: "30 min",
    score: 85,
    status: "completed" as const
  },
  {
    id: 3,
    title: "Binary Trees",
    courseName: "Data Structures and Algorithms",
    date: "April 1, 2025",
    questions: 12,
    duration: "40 min",
    score: 78,
    status: "completed" as const
  }
];

const performanceData = [
  { name: "Assignment 1", score: 85, average: 75 },
  { name: "Quiz 1", score: 78, average: 70 },
  { name: "Midterm", score: 82, average: 68 },
  { name: "Assignment 2", score: 90, average: 72 },
  { name: "Quiz 2", score: 88, average: 75 },
];

export default function StudentDashboard() {
  const router = useRouter();

  return (
    <DashboardLayout userType="student">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>
        
        <ProfileCard 
          userType="student"
          name={studentData.name}
          email={studentData.email}
          studentId={studentData.studentId}
          department={studentData.department}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Enrolled Courses" 
            value={3} 
            icon={BookOpen} 
          />
          <StatCard 
            title="Overall GPA" 
            value="3.75" 
            icon={Award}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard 
            title="Hours Spent" 
            value="42" 
            icon={Clock}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard 
            title="Completed Courses" 
            value={2} 
            icon={BookCheck}
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">My Courses</h2>
            <button 
              className="text-elearn-secondary hover:text-elearn-primary transition-colors"
              onClick={() => router.push("/student/courses")}
            >
              View all
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {coursesData.slice(0, 4).map((course) => (
              <CourseCard 
                key={course.id}
                title={course.title}
                instructor={course.instructor}
                progress={course.progress}
                bgColor={course.bgColor}
                upcoming={course.upcoming}
                onClick={() => router.push(`/student/courses/${course.id}`)}
              />
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Upcoming Quizzes</h2>
              <button 
                className="text-elearn-secondary hover:text-elearn-primary transition-colors"
                onClick={() => router.push("/student/quizzes")}
              >
                View all
              </button>
            </div>
            <div className="space-y-4">
              {quizzesData.slice(0, 3).map((quiz) => (
                <QuizCard 
                  key={quiz.id}
                  title={quiz.title}
                  courseName={quiz.courseName}
                  date={quiz.date}
                  questions={quiz.questions}
                  duration={quiz.duration}
                  score={quiz.score}
                  status={quiz.status}
                  onClick={() => router.push(`/student/quizzes/${quiz.id}`)}
                />
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4">Performance Overview</h2>
            <PerformanceChart 
              data={performanceData}
              title="Recent Performance"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
