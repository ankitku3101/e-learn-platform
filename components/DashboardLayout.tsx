'use client';

import React from "react";
import { 
  BookOpen, 
  User, 
  FileText, 
  Award, 
  BarChart2, 
  Users,
  LogOut,
  Home
} from "lucide-react";
import { cn } from "@/app/lib/utils";
import { useRouter, usePathname } from "next/navigation";

type DashboardLayoutProps = {
  children: React.ReactNode;
  userType: "student" | "faculty";
};

export default function DashboardLayout({ 
  children,
  userType 
}: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname(); // Replacing useLocation()

  const studentNavItems = [
    { icon: Home, label: "Dashboard", path: "/student" },
    { icon: BookOpen, label: "My Courses", path: "/student/courses" },
    { icon: FileText, label: "Quizzes", path: "/student/quizzes" },
    { icon: Award, label: "Grades", path: "/student/grades" },
    { icon: User, label: "Profile", path: "/student/profile" },
  ];
  
  const facultyNavItems = [
    { icon: Home, label: "Dashboard", path: "/faculty" },
    { icon: BookOpen, label: "My Courses", path: "/faculty/courses" },
    { icon: Users, label: "Students", path: "/faculty/students" },
    { icon: FileText, label: "Quizzes", path: "/faculty/quizzes" },
    { icon: BarChart2, label: "Analytics", path: "/faculty/analytics" },
    { icon: User, label: "Profile", path: "/faculty/profile" },
  ];
  
  const navItems = userType === "student" ? studentNavItems : facultyNavItems;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-elearn-primary text-white h-full flex flex-col">
        <div className="p-4 border-b border-elearn-secondary/30">
          <h1 className="text-xl font-bold">Spectrum Learn</h1>
          <p className="text-sm text-elearn-tertiary">
            {userType === "student" ? "Student" : "Faculty"} Portal
          </p>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => router.push(item.path)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                    pathname === item.path
                      ? "bg-elearn-secondary text-white"
                      : "text-elearn-tertiary hover:bg-elearn-secondary/20"
                  )}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-elearn-secondary/30">
          <button
            onClick={() => router.push("/")}
            className="w-full flex items-center gap-3 px-3 py-2 text-elearn-tertiary hover:bg-elearn-secondary/20 rounded-md transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-elearn-background">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
