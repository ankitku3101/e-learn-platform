"use client";
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
    <div className="flex flex-col h-screen bg-[#F1F2F6]">
      {/* Header */}
      <header className="bg-white shadow-md py-4 text-center text-xl font-bold">
        <span className="text-[#27187E]">UNILEARN - Admin Panel</span>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className={`${isSidebarOpen ? "w-64" : "w-20"} bg-[#27187E] text-white h-full p-5 transition-all duration-300`}>
          <div className="flex items-center justify-between">
            <h1 className={`${isSidebarOpen ? "block" : "hidden"} text-xl font-bold`}>Unilearn</h1>
            <button onClick={() => setSidebarOpen(!isSidebarOpen)}>
              <FiMenu size={24} />
            </button>
          </div>
          <nav className="mt-10">
            <SidebarLink Icon={FiUsers} text="User Management" isOpen={isSidebarOpen} />
            <SidebarLink Icon={FiBookOpen} text="Course Management" isOpen={isSidebarOpen} />
            <SidebarLink Icon={FiBarChart2} text="Reports" isOpen={isSidebarOpen} />
            <SidebarLink Icon={FiClipboard} text="System Monitoring" isOpen={isSidebarOpen} />
            <SidebarLink Icon={FiVolume2} text="Announcements" isOpen={isSidebarOpen} />
          </nav>
          <div className="mt-auto">
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
      <footer className="bg-[#1E1E2F] text-white text-center py-3">
        © {new Date().getFullYear()} Unilearn. All rights reserved.
      </footer>
    </div>
  );
};

const SidebarLink = ({ Icon, text, isOpen }: { Icon: any; text: string; isOpen: boolean }) => (
  <div className="flex items-center gap-3 p-3 hover:bg-[#758BFD] rounded-lg cursor-pointer transition">
    <Icon size={20} />
    <span className={`${isOpen ? "block" : "hidden"} text-sm`}>{text}</span>
  </div>
);

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
