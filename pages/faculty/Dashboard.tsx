"use client";
import Image from "next/image";
import { useState, JSX } from "react";
import {
  FiMenu, FiBookOpen, FiUsers, FiClipboard,
  FiBarChart2, FiUser, FiLogOut, FiEdit
} from "react-icons/fi";
import { BsPencilSquare } from "react-icons/bs";
import Link from 'next/link';

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const courses = [
    { title: "Data Structures and Algorithms", color: "bg-[#758BFD]" },
    { title: "Advanced Database Systems", color: "bg-[#AEB8FE]" },
    { title: "Machine Learning Fundamentals", color: "bg-[#27187E]" },
    { title: "Cloud Computing", color: "bg-[#FF8600]" },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#F1F2F6] font-sans">
      <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image src="/Images/logo.png" alt="Unilearn Logo" width={40} height={40} />
          <span className="text-[#27187E] text-2xl font-extrabold tracking-wide">UNILEARN</span>
        </div>
        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="lg:hidden">
          <FiMenu size={24} />
        </button>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className={`relative ${isSidebarOpen ? "w-64" : "w-20"} bg-[#27187E] text-white h-full p-4 transition-all duration-300 flex flex-col`}>
          {/* Sidebar Toggle */}
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <FiMenu size={24} />
          </button>

          <div className="flex items-center justify-center mb-6 mt-6" />

          {/* Navigation */}
          <nav className="space-y-3">
            <SidebarLink Icon={FiBookOpen} text="Dashboard" isOpen={isSidebarOpen} href="/faculty/dashboard" />
            <SidebarLink Icon={BsPencilSquare} text="My Courses" isOpen={isSidebarOpen} href="/faculty/courses" />
            <SidebarLink Icon={FiUsers} text="Students" isOpen={isSidebarOpen} href="/faculty/students" />
            <SidebarLink Icon={FiClipboard} text="Quizzes" isOpen={isSidebarOpen} href="/faculty/quizzes" />
            <SidebarLink Icon={FiBarChart2} text="Analytics" isOpen={isSidebarOpen} href="/faculty/analytics" />
            <SidebarLink Icon={FiUser} text="Profile" isOpen={isSidebarOpen} href="/faculty/profile" />
          </nav>

          <div className="mt-auto border-t pt-4">
            <SidebarLink Icon={FiLogOut} text="Logout" isOpen={isSidebarOpen} href="/logout" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Faculty Info Card */}
          <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-between hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div>
              <h2 className="text-2xl font-bold text-[#27187E] text-center sm:text-left">Faculty Dashboard</h2>
              <div className="bg-[#F8F9FC] p-4 rounded-xl mt-2 shadow-sm border border-gray-200 transition hover:bg-[#eef1fb]">
                <h3 className="text-lg font-semibold text-[#27187E]">Dr. Michael Chen</h3>
                <p className="text-gray-600">michael.chen@example.com</p>
                <p className="text-gray-500">Department: Computer Science</p>
                <p className="text-gray-500">Faculty ID: FAC54321</p>
              </div>
            </div>
            <button className="bg-[#758BFD] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-md hover:bg-[#5c6bdf] transition-all">
              <FiEdit /> Edit Profile
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <StatCard title="Active Courses" value="3" icon={<FiBookOpen size={30} />} />
            <StatCard title="Total Students" value="112" icon={<FiUsers size={30} />} />
            <StatCard title="Avg. Performance" value="78%" icon={<FiBarChart2 size={30} />} />
            <StatCard title="Active Quizzes" value="5" icon={<FiClipboard size={30} />} />
          </div>

          {/* Courses Section */}
          <h3 className="mt-8 text-xl font-semibold text-[#27187E]">My Courses</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {courses.map((course, index) => (
              <div
                key={index}
                className={`${course.color} text-white p-6 h-40 rounded-xl shadow-md flex items-center justify-center hover:scale-[1.03] transition-transform cursor-pointer hover:shadow-xl`}
              >
                <h4 className="text-lg font-semibold text-center">{course.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1E1E2F] text-white text-center py-3 text-sm">
        © {new Date().getFullYear()} Unilearn. All rights reserved.
      </footer>
    </div>
  );
};

// Sidebar Link with routing
const SidebarLink = ({
  Icon,
  text,
  isOpen,
  href,
}: {
  Icon: any;
  text: string;
  isOpen: boolean;
  href: string;
}) => (
  <Link href={href}>
    <div className="flex items-center gap-3 p-3 hover:bg-[#758BFD] rounded-lg cursor-pointer transition">
      <Icon size={20} />
      <span className={`${isOpen ? "block" : "hidden"} text-sm`}>{text}</span>
    </div>
  </Link>
);

const StatCard = ({ title, value, icon }: { title: string; value: string; icon: JSX.Element }) => (
  <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-4 border border-gray-100">
    <div className="text-[#27187E]">{icon}</div>
    <div>
      <h4 className="text-sm text-gray-500">{title}</h4>
      <p className="text-xl font-bold text-[#27187E]">{value}</p>
    </div>
  </div>
);

export default Dashboard;
