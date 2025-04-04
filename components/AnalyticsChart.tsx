import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type LineChartData = {
  name: string;
  completion: number;
  engagement: number;
  satisfaction: number;
};

type PieChartData = {
  name: string;
  value: number;
  color: string;
};

type AnalyticsChartProps = {
  lineData: LineChartData[];
  pieData: PieChartData[];
  title: string;
  type: "line" | "pie";
};

export default function AnalyticsChart({
  lineData,
  pieData,
  title,
  type,
}: AnalyticsChartProps) {
  return (
    <div className="dashboard-card">
      <h3 className="font-bold text-lg mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {type === "line" ? (
            <LineChart
              data={lineData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                }}
              />
              <Legend wrapperStyle={{ paddingTop: 10 }} />
              <Line
                type="monotone"
                dataKey="completion"
                name="Course Completion"
                stroke="#758BFD"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="engagement"
                name="Student Engagement"
                stroke="#27187E"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="satisfaction"
                name="Satisfaction"
                stroke="#FF8600"
                strokeWidth={2}
              />
            </LineChart>
          ) : (
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                }}
              />
              <Legend />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
