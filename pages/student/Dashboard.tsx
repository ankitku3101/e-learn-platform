"use client";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import { 
  FiMenu, FiBookOpen, FiClipboard, FiBarChart2, 
  FiUser, FiLogOut, FiEdit, FiVideo 
} from "react-icons/fi";

const StudentDashboard = () => {

  const router = useRouter();
  const [firstName, setFirstName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateSession = async () => {
      const session = await getSession();
      if (!session || session?.user?.role !== "student") {
        router.push("/auth/signin");
      } else {
        setFirstName(session?.user?.name || "Student");
      }
      setLoading(false);
    };
    validateSession();
  }, [router]);

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
          {/* Sidebar Toggle - repositioned to top-right */}
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <FiMenu size={24} />
          </button>

          <div className="flex items-center justify-center mb-6 mt-6">  
          </div>
          
          <nav className="space-y-3">
            <SidebarLink Icon={FiBookOpen} text="View All Courses" isOpen={isSidebarOpen} />
            <SidebarLink Icon={FiClipboard} text="Quizzes" isOpen={isSidebarOpen} />
            <SidebarLink Icon={FiBarChart2} text="Performance" isOpen={isSidebarOpen} />
            <SidebarLink Icon={FiUser} text="Profile" isOpen={isSidebarOpen} />
            <SidebarLink Icon={FiVideo} text="Live Classes" isOpen={isSidebarOpen} />
          </nav>
          <div className="mt-auto border-t pt-4">
            <SidebarLink Icon={FiLogOut} text="Logout" isOpen={isSidebarOpen} />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Student Info Card */}
          <div className="bg-white p-5 rounded-lg shadow-md flex flex-col sm:flex-row items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#27187E] text-center sm:text-left">Student Dashboard</h2>
              <div className="bg-[#F8F9FC] p-4 rounded-lg mt-4 shadow-sm">
                <h3 className="text-lg font-semibold text-[#27187E]">Welcome {firstName}</h3>
              </div>
            </div>
            <button className="bg-[#758BFD] text-white px-4 py-2 mt-4 sm:mt-0 rounded-lg flex items-center gap-2 hover:bg-[#5a6dfd] transition">
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
              <div key={index} className={`${course.color} text-white p-6 h-40 rounded-lg shadow-lg flex items-center justify-center hover:scale-105 hover:shadow-xl transition-transform cursor-pointer`}>
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

const SidebarLink = ({ Icon, text, isOpen }: { Icon: any; text: string; isOpen: boolean }) => (
  <div className="flex items-center gap-3 p-3 hover:bg-[#758BFD] rounded-lg cursor-pointer transition">
    <Icon size={20} />
    <span className={`${isOpen ? "block" : "hidden"} text-sm font-medium`}>{text}</span>
  </div>
);

const StatCard = ({ title, value, icon }: { title: string; value: string; icon: JSX.Element }) => (
  <div className="bg-white p-5 rounded-lg shadow-md flex items-center gap-4 hover:shadow-lg transition">
    <div className="text-[#27187E]">{icon}</div>
    <div>
      <h4 className="text-sm text-gray-500 font-medium">{title}</h4>
      <p className="text-xl font-bold text-[#27187E]">{value}</p>
    </div>
  </div>
);

export default StudentDashboard;
