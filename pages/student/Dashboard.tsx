"use client";
import { JSX, useState } from "react";
import { 
  FiMenu, FiBookOpen, FiClipboard, FiBarChart2, 
  FiUser, FiLogOut, FiEdit, FiVideo 
} from "react-icons/fi";

const StudentDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const courses = [
    { title: "Data Structures", color: "bg-[#758BFD]" },
    { title: "Database Systems", color: "bg-[#AEB8FE]" },
    { title: "Machine Learning", color: "bg-[#27187E]" },
    { title: "Web Development", color: "bg-[#FF8600]" },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#F1F2F6]">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <span className="text-[#27187E] text-2xl font-bold">UNILEARN</span>
        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="lg:hidden">
          <FiMenu size={24} />
        </button>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className={`${isSidebarOpen ? "w-64" : "w-20"} bg-[#27187E] text-white h-full p-5 transition-all duration-300`}>
          <h1 className={`${isSidebarOpen ? "block" : "hidden"} text-xl font-bold`}>Unilearn</h1>
          <nav className="mt-10 space-y-4">
            <SidebarLink Icon={FiBookOpen} text="Dashboard" isOpen={isSidebarOpen} />
            <SidebarLink Icon={FiClipboard} text="Quizzes" isOpen={isSidebarOpen} />
            <SidebarLink Icon={FiBarChart2} text="Performance" isOpen={isSidebarOpen} />
            <SidebarLink Icon={FiUser} text="Profile" isOpen={isSidebarOpen} />
            <SidebarLink Icon={FiVideo} text="Attend Live Lectures" isOpen={isSidebarOpen} /> {/* ✅ Added Live Lectures */}
          </nav>
          <div className="mt-auto">
            <SidebarLink Icon={FiLogOut} text="Logout" isOpen={isSidebarOpen} />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Student Info Card */}
          <div className="bg-white p-5 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#27187E]">Student Dashboard</h2>
              <div className="bg-[#F8F9FC] p-4 rounded-lg mt-4 shadow-sm">
                <h3 className="text-lg font-bold text-[#27187E]">Alex Johnson</h3>
                <p className="text-gray-600">alex.johnson@example.com</p>
                <p className="text-gray-500">Department: Computer Science</p>
                <p className="text-gray-500">Student ID: STU12345</p>
              </div>
            </div>
            <button className="bg-[#758BFD] text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <FiEdit /> Edit Profile
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <StatCard title="Enrolled Courses" value="3" icon={<FiBookOpen size={30} />} />
            <StatCard title="Overall GPA" value="3.75" icon={<FiBarChart2 size={30} />} />
            <StatCard title="Hours Spent" value="42" icon={<FiClipboard size={30} />} />
            <StatCard title="Completed Courses" value="2" icon={<FiBookOpen size={30} />} />
          </div>

          {/* Courses Section */}
          <h3 className="mt-6 text-xl font-bold text-[#27187E]">My Courses</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {courses.map((course, index) => (
              <div key={index} className={`${course.color} text-white p-6 h-40 rounded-lg shadow-lg flex items-center justify-center hover:scale-105 transition-transform cursor-pointer`}>
                <h4 className="text-lg font-bold text-center">{course.title}</h4>
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

const SidebarLink = ({ Icon, text, isOpen }: { Icon: any; text: string; isOpen: boolean }) => (
  <div className="flex items-center gap-3 p-3 hover:bg-[#758BFD] rounded-lg cursor-pointer transition">
    <Icon size={20} />
    <span className={`${isOpen ? "block" : "hidden"} text-sm`}>{text}</span>
  </div>
);

const StatCard = ({ title, value, icon }: { title: string; value: string; icon: JSX.Element }) => (
  <div className="bg-white p-5 rounded-lg shadow-md flex items-center gap-4">
    <div className="text-[#27187E]">{icon}</div>
    <div>
      <h4 className="text-sm text-gray-500">{title}</h4>
      <p className="text-xl font-bold text-[#27187E]">{value}</p>
    </div>
  </div>
);

export default StudentDashboard;
