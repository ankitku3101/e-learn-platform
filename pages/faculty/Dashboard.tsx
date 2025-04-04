"use client";
import { JSX, useState } from "react";
import { 
  FiMenu, FiBookOpen, FiUsers, FiClipboard, 
  FiBarChart2, FiUser, FiLogOut, FiEdit 
} from "react-icons/fi";
import { BsPencilSquare } from "react-icons/bs";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const courses = [
    { title: "Data Structures and Algorithms", color: "bg-[#758BFD]" },
    { title: "Advanced Database Systems", color: "bg-[#AEB8FE]" },
    { title: "Machine Learning Fundamentals", color: "bg-[#27187E]" },
    { title: "Cloud Computing", color: "bg-[#FF8600]" },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#F1F2F6]">
      {/* Header */}
      <header className="bg-white shadow-md py-4 text-center text-xl font-bold">
        <span className="text-[#27187E]">UNILEARN</span>
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
            <SidebarLink Icon={FiBookOpen} text="Dashboard" isOpen={isSidebarOpen} />
            <SidebarLink Icon={BsPencilSquare} text="My Courses" isOpen={isSidebarOpen} />
            <SidebarLink Icon={FiUsers} text="Students" isOpen={isSidebarOpen} />
            <SidebarLink Icon={FiClipboard} text="Quizzes" isOpen={isSidebarOpen} />
            <SidebarLink Icon={FiBarChart2} text="Analytics" isOpen={isSidebarOpen} />
            <SidebarLink Icon={FiUser} text="Profile" isOpen={isSidebarOpen} />
          </nav>
          <div className="mt-auto">
            <SidebarLink Icon={FiLogOut} text="Logout" isOpen={isSidebarOpen} />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Faculty Info Card */}
          <div className="bg-white p-5 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#27187E]">Faculty Dashboard</h2>
              <div className="bg-[#F8F9FC] p-4 rounded-lg mt-4 shadow-sm">
                <h3 className="text-lg font-bold text-[#27187E]">Dr. Michael Chen</h3>
                <p className="text-gray-600">michael.chen@example.com</p>
                <p className="text-gray-500">Department: Computer Science</p>
                <p className="text-gray-500">Faculty ID: FAC54321</p>
              </div>
            </div>
            <button className="bg-[#758BFD] text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <FiEdit /> Edit Profile
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <StatCard title="Active Courses" value="3" icon={<FiBookOpen size={30} />} />
            <StatCard title="Total Students" value="112" icon={<FiUsers size={30} />} />
            <StatCard title="Avg. Performance" value="78%" icon={<FiBarChart2 size={30} />} />
            <StatCard title="Active Quizzes" value="5" icon={<FiClipboard size={30} />} />
          </div>

          {/* Courses Section */}
          <h3 className="mt-6 text-xl font-bold text-[#27187E]">My Courses</h3>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {courses.map((course, index) => (
              <div key={index} className={`${course.color} text-white p-6 h-40 rounded-lg shadow-lg flex items-center justify-center hover:scale-105 transition-transform cursor-pointer`}>
                <h4 className="text-lg font-bold text-center">{course.title}</h4>
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

const StatCard = ({ title, value, icon }: { title: string; value: string; icon: JSX.Element }) => (
  <div className="bg-white p-5 rounded-lg shadow-md flex items-center gap-4">
    <div className="text-[#27187E]">{icon}</div>
    <div>
      <h4 className="text-sm text-gray-500">{title}</h4>
      <p className="text-xl font-bold text-[#27187E]">{value}</p>
    </div>
  </div>
);

export default Dashboard;
