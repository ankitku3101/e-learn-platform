import React from "react";
import { User } from "lucide-react";

type ProfileCardProps = {
  userType: "student" | "faculty";
  name: string;
  email: string;
  department?: string;
  studentId?: string;
  facultyId?: string;
  profileImage?: string;
};

export default function ProfileCard({
  userType,
  name,
  email,
  department,
  studentId,
  facultyId,
  profileImage,
}: ProfileCardProps) {
  return (
    <div className="dashboard-card flex flex-col md:flex-row items-center gap-4">
      <div className="h-20 w-20 rounded-full bg-elearn-tertiary flex items-center justify-center text-elearn-primary shrink-0">
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <User size={40} />
        )}
      </div>
      <div className="flex-1 text-center md:text-left">
        <h2 className="font-bold text-lg">{name}</h2>
        <p className="text-sm text-gray-600">{email}</p>
        {department && <p className="text-sm text-gray-600">Department: {department}</p>}
        {studentId && <p className="text-sm text-gray-600">Student ID: {studentId}</p>}
        {facultyId && <p className="text-sm text-gray-600">Faculty ID: {facultyId}</p>}
      </div>
      <button className="px-4 py-2 bg-elearn-secondary text-white rounded-md hover:bg-elearn-secondary/90 transition-colors text-sm">
        Edit Profile
      </button>
    </div>
  );
}
