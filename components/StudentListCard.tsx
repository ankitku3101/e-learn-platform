import React from "react";
import { ArrowUpDown, Search } from "lucide-react";

type Student = {
  id: string;
  name: string;
  email: string;
  progress: number;
  lastActive: string;
  performance: "excellent" | "good" | "average" | "poor";
};

type StudentListCardProps = {
  students: Student[];
  onViewStudent?: (id: string) => void;
};

export default function StudentListCard({
  students,
  onViewStudent,
}: StudentListCardProps) {
  return (
    <div className="dashboard-card overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Students</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search students..."
            className="pl-9 pr-4 py-2 rounded-md border border-elearn-tertiary/30 w-64 text-sm focus:outline-none focus:ring-1 focus:ring-elearn-secondary"
          />
          <Search
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto -mx-4">
        <table className="w-full min-w-full">
          <thead>
            <tr className="bg-elearn-tertiary/10 text-elearn-primary text-sm border-y border-elearn-tertiary/20">
              <th className="py-3 px-4 text-left font-medium flex items-center gap-1">
                Name
                <button>
                  <ArrowUpDown size={14} />
                </button>
              </th>
              <th className="py-3 px-4 text-left font-medium">Email</th>
              <th className="py-3 px-4 text-left font-medium">Progress</th>
              <th className="py-3 px-4 text-left font-medium">Last Active</th>
              <th className="py-3 px-4 text-left font-medium">Performance</th>
              <th className="py-3 px-4 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr 
                key={student.id}
                className="border-b border-elearn-tertiary/10 hover:bg-elearn-tertiary/5"
              >
                <td className="py-3 px-4 text-sm">{student.name}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{student.email}</td>
                <td className="py-3 px-4">
                  <div className="progress-bar w-24">
                    <div className="progress-value" style={{ width: `${student.progress}%` }} />
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">{student.lastActive}</td>
                <td className="py-3 px-4">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium
                    ${student.performance === 'excellent' ? 'bg-green-100 text-green-800' : 
                      student.performance === 'good' ? 'bg-blue-100 text-blue-800' : 
                      student.performance === 'average' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}
                  >
                    {student.performance.charAt(0).toUpperCase() + student.performance.slice(1)}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button 
                    onClick={() => onViewStudent?.(student.id)}
                    className="text-elearn-secondary hover:text-elearn-primary text-sm"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
