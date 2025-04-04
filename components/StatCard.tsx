import React from "react";
import { cn } from "@/app/lib/utils";
import { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  bgColor?: string;
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  bgColor = "bg-white",
}: StatCardProps) {
  return (
    <div className={cn("dashboard-card", bgColor)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <h3 className="dashboard-stat text-elearn-primary">{value}</h3>
          {trend && (
            <div className="flex items-center mt-1">
              <span
                className={cn(
                  "text-xs font-medium",
                  trend.isPositive ? "text-green-600" : "text-red-600"
                )}
              >
                {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-elearn-tertiary/20 rounded-full text-elearn-primary">
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}
