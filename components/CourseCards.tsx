import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CourseCardProps = {
  title: string;
  instructor: string;
  progress?: number;
  thumbnail?: string;
  bgColor?: string;
  upcoming?: boolean;
  onClick?: () => void;
};

export default function CourseCard({
  title,
  instructor,
  progress = 0,
  thumbnail,
  bgColor = "bg-elearn-tertiary",
  upcoming = false,
  onClick,
}: CourseCardProps) {
  return (
    <div 
      className={cn(
        "dashboard-card cursor-pointer overflow-hidden",
        upcoming && "border-dashed"
      )}
      onClick={onClick}
    >
      <div className={cn("h-32 -mx-4 -mt-4 mb-3", bgColor)}>
        {thumbnail && (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <h3 className="font-bold text-lg mb-1 leading-tight">{title}</h3>
      <p className="text-sm text-gray-600 mb-3">By {instructor}</p>
      
      {!upcoming && (
        <div className="mb-2">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-value" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}
      
      <div className="mt-4 flex justify-end">
        <button className="text-elearn-primary hover:text-elearn-accent flex items-center gap-1 text-sm font-medium transition-colors">
          {upcoming ? "Enroll now" : "Continue"} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
