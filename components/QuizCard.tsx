import React from "react";
import { Clock, CheckCircle2, FileText } from "lucide-react";
import { cn } from "@/app/lib/utils";

type QuizStatus = "upcoming" | "completed" | "missed";

type QuizCardProps = {
  title: string;
  courseName: string;
  date: string;
  questions?: number;
  duration?: string;
  score?: number;
  status: QuizStatus;
  onClick?: () => void;
};

export default function QuizCard({
  title,
  courseName,
  date,
  questions = 10,
  duration = "30 min",
  score,
  status,
  onClick,
}: QuizCardProps) {
  return (
    <div 
      className="dashboard-card cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold text-lg mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{courseName}</p>
        </div>
        <div className={cn(
          "text-xs font-medium px-2 py-1 rounded-full",
          status === "upcoming" && "bg-elearn-tertiary/20 text-elearn-primary",
          status === "completed" && "bg-green-100 text-green-800",
          status === "missed" && "bg-red-100 text-red-800",
        )}>
          {status === "upcoming" ? "Upcoming" : status === "completed" ? "Completed" : "Missed"}
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Clock size={14} />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <FileText size={14} />
          <span>{questions} questions</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Date:</span>
          <span>{date}</span>
        </div>
        {status === "completed" && score !== undefined && (
          <div className="flex items-center gap-1">
            <CheckCircle2 size={14} className="text-green-600" />
            <span>Score: {score}%</span>
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <button 
          className={cn(
            "w-full py-2 rounded-md text-white text-sm",
            status === "upcoming" ? "bg-elearn-accent hover:bg-elearn-accent/90" : 
            status === "completed" ? "bg-elearn-secondary hover:bg-elearn-secondary/90" : 
            "bg-gray-300 text-gray-700"
          )}
        >
          {status === "upcoming" ? "Start Quiz" : status === "completed" ? "Review Quiz" : "Missed Quiz"}
        </button>
      </div>
    </div>
  );
}
