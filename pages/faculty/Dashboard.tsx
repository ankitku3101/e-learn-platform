"use client"

import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import ProfileCard from "@/components/ProfileCard";
import CourseCard from "@/components/CourseCards";
import QuizCard from "@/components/QuizCard";
import StatCard from "@/components/StatCard";
import StudentListCard from "@/components/StudentListCard";
import AnalyticsChart from "@/components/AnalyticsChart";
import { BookOpen, Users, Award, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock data
const facultyData = {
  name: "Dr. Michael Chen",
  email: "michael.chen@example.com",
  facultyId: "FAC54321",
  department: "Computer Science"
};

const coursesData = [
  {
    id: 1,
    title: "Data Structures and Algorithms",
    instructor: "Dr. Michael Chen",
    progress: 100,
    bgColor: "bg-elearn-secondary"
  },
  {
    id: 2,
    title: "Advanced Database Systems",
    instructor: "Dr. Michael Chen",
    progress: 80,
    bgColor: "bg-elearn-tertiary"
  },
  {
    id: 3,
    title: "Machine Learning Fundamentals",
    instructor: "Dr. Michael Chen",
    progress: 60,
    bgColor: "bg-elearn-primary"
  },
  {
    id: 4,
    title: "Cloud Computing",
    instructor: "Dr. Michael Chen",
    progress: 0,
    upcoming: true,
    bgColor: "bg-elearn-accent"
  },
];

const quizzesData = [
  {
    id: 1,
    title: "Binary Trees",
    courseName: "Data Structures and Algorithms",
    date: "April 1, 2025",
    questions: 12,
    duration: "40 min",
    status: "completed" as const
  },
  {
    id: 2,
    title: "Graph Algorithms",
    courseName: "Data Structures and Algorithms",
    date: "April 10, 2025",
    questions: 15,
    duration: "45 min",
    status: "upcoming" as const
  },
  {
    id: 3,
    title: "Database Normalization",
    courseName: "Advanced Database Systems",
    date: "April 15, 2025",
    questions: 10,
    duration: "30 min",
    status: "upcoming" as const
  }
];
const studentsData = [
  {
    id: "s1",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    progress: 75,
    lastActive: "Today",
    performance: "excellent" as const
  },
  {
    id: "s2",
    name: "Emily Williams",
    email: "emily.williams@example.com",
    progress: 65,
    lastActive: "2 days ago",
    performance: "good" as const
  },
  {
    id: "s3",
    name: "David Brown",
    email: "david.brown@example.com",
    progress: 45,
    lastActive: "Yesterday",
    performance: "average" as const
  },
  {
    id: "s4",
    name: "Sarah Davis",
    email: "sarah.davis@example.com",
    progress: 30,
    lastActive: "1 week ago",
    performance: "poor" as const
  },
  {
    id: "s5",
    name: "James Wilson",
    email: "james.wilson@example.com",
    progress: 80,
    lastActive: "Today",
    performance: "excellent" as const
  }
];

const analyticsLineData = [
  { name: "Week 1", completion: 40, engagement: 30, satisfaction: 70 },
  { name: "Week 2", completion: 50, engagement: 45, satisfaction: 75 },
  { name: "Week 3", completion: 55, engagement: 60, satisfaction: 80 },
  { name: "Week 4", completion: 70, engagement: 65, satisfaction: 85 },
  { name: "Week 5", completion: 75, engagement: 70, satisfaction: 82 },
  { name: "Week 6", completion: 85, engagement: 80, satisfaction: 87 },
];

const analyticsPieData = [
  { name: "Excellent", value: 40, color: "#27187E" },
  { name: "Good", value: 30, color: "#758BFD" },
  { name: "Average", value: 20, color: "#AEB8FE" },
  { name: "Poor", value: 10, color: "#FF8600" },
];

export default function FacultyDashboard() {
  const router = useRouter();

  return (
    <DashboardLayout userType="faculty">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold mb-6">Faculty Dashboard</h1>
        
        <ProfileCard 
          userType="faculty"
          name={facultyData.name}
          email={facultyData.email}
          facultyId={facultyData.facultyId}
          department={facultyData.department}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Active Courses" 
            value={3} 
            icon={BookOpen} 
          />
          <StatCard 
            title="Total Students" 
            value={112} 
            icon={Users}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard 
            title="Avg. Performance" 
            value="78%" 
            icon={Award}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard 
            title="Active Quizzes" 
            value={5} 
            icon={FileText}
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">My Courses</h2>
            <button 
              className="text-elearn-secondary hover:text-elearn-primary transition-colors"
              onClick={() => router.push("/faculty/courses")}
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
                onClick={() => router.push(`/faculty/courses/${course.id}`)}
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
                onClick={() => router.push("/faculty/quizzes")}
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
                  status={quiz.status}
                  onClick={() => router.push(`/faculty/quizzes/${quiz.id}`)}
                />
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4">Student Performance Distribution</h2>
            <AnalyticsChart 
              lineData={analyticsLineData}
              pieData={analyticsPieData}
              title="Performance Breakdown"
              type="pie"
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Students</h2>
            <button 
              className="text-elearn-secondary hover:text-elearn-primary transition-colors"
              onClick={() => router.push("/faculty/students")}
            >
              View all
            </button>
          </div>
          <StudentListCard 
            students={studentsData}
            onViewStudent={(id) => router.push(`/faculty/students/${id}`)}
          />
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-4">Course Analytics</h2>
          <AnalyticsChart 
            lineData={analyticsLineData}
            pieData={analyticsPieData}
            title="Weekly Progress Metrics"
            type="line"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
