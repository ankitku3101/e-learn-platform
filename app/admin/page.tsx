"use client";
import Image from "next/image";
import Link from "next/link"; // Link import kiya
import { JSX, useState } from "react";
import {
  FiMenu, FiUsers, FiBookOpen, FiBarChart2,
  FiClipboard, FiUser, FiLogOut, FiVolume2
} from "react-icons/fi";

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const courseStats = {
    totalCourses: 35,
    activeCourses: 18,
    completedCourses: 12,
    upcomingCourses: 5,
  };

  const announcements = [
    {
      title: "New Semester Begins",
      content: "The new semester starts from April 15. Make sure all course materials are uploaded.",
      date: "April 1, 2025",
    },
    {
      title: "Platform Maintenance",
      content: "Unilearn will be under maintenance on April 10 from 1AM to 3AM.",
      date: "March 30, 2025",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F2F6]">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between h-16">
        {/* Left Side: Logo + Unilearn */}
        <div className="flex items-center gap-2">
          <Image src="/Images/logo.png" alt="Logo" width={40} height={40} />
          <span className="text-2xl font-bold text-[#27187E]">UNILEARN</span>
        </div>
        {/* Center: Admin Panel */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <span className="text-2xl font-bold text-[#27187E]">Admin Panel</span>
        </div>
      </header>

      {/* Sidebar + Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className={`${isSidebarOpen ? "w-64" : "w-20"} bg-[#27187E] text-white h-[calc(100vh-64px)] flex flex-col p-5 transition-all duration-300`}>
          {/* Toggle Button */}
          <div className="flex justify-end mb-6">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-white">
              <FiMenu size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <SidebarLink Icon={FiUsers} text="User Management" isOpen={isSidebarOpen} href="/admin/create-user" />
            <SidebarLink Icon={FiBookOpen} text="Course Management" isOpen={isSidebarOpen} href="" />
            <SidebarLink Icon={FiBarChart2} text="Reports" isOpen={isSidebarOpen} href="/admin/report-generation"/>
            <SidebarLink Icon={FiClipboard} text="System Monitoring" isOpen={isSidebarOpen} />
            <SidebarLink Icon={FiVolume2} text="Announcements" isOpen={isSidebarOpen} />
          </nav>

          {/* Bottom */}
          <div className="mt-auto border-t pt-4">
            <SidebarLink Icon={FiLogOut} text="Logout" isOpen={isSidebarOpen} />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Course Stats Section */}
          <div className="grid grid-cols-4 gap-4">
            <StatCard title="Total Courses" value={courseStats.totalCourses} icon={<FiBookOpen size={30} />} />
            <StatCard title="Active Courses" value={courseStats.activeCourses} icon={<FiClipboard size={30} />} />
            <StatCard title="Completed Courses" value={courseStats.completedCourses} icon={<FiBarChart2 size={30} />} />
            <StatCard title="Upcoming Courses" value={courseStats.upcomingCourses} icon={<FiUser size={30} />} />
          </div>

          {/* Announcements Section */}
          <h3 className="mt-6 text-xl font-bold text-[#27187E]">Announcements</h3>
          <div className="mt-4 space-y-4">
            {announcements.map((item, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-5">
                <h4 className="text-lg font-semibold text-[#27187E]">{item.title}</h4>
                <p className="text-gray-600 mt-2">{item.content}</p>
                <p className="text-sm text-gray-400 mt-1">{item.date}</p>
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

// Sidebar Link Component with Link
const SidebarLink = ({
  Icon,
  text,
  isOpen,
  href = "#",
}: {
  Icon: any;
  text: string;
  isOpen: boolean;
  href?: string;
}) => (
  <Link href={href}>
    <div className="flex items-center gap-3 p-3 hover:bg-[#758BFD] rounded-lg cursor-pointer transition">
      <Icon size={20} />
      <span className={`${isOpen ? "block" : "hidden"} text-sm`}>{text}</span>
    </div>
  </Link>
);

// Stat Card Component
const StatCard = ({ title, value, icon }: { title: string; value: number; icon: JSX.Element }) => (
  <div className="bg-white p-5 rounded-lg shadow-md flex items-center gap-4">
    <div className="text-[#27187E]">{icon}</div>
    <div>
      <h4 className="text-sm text-gray-500">{title}</h4>
      <p className="text-xl font-bold text-[#27187E]">{value}</p>
    </div>
  </div>
);

export default AdminDashboard;
