import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

type PerformanceData = {
  name: string;
  score: number;
  average: number;
};

type PerformanceChartProps = {
  data: PerformanceData[];
  title: string;
};

export default function PerformanceChart({
  data,
  title,
}: PerformanceChartProps) {
  return (
    <div className="dashboard-card">
      <h3 className="font-bold text-lg mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
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
            <Bar
              dataKey="score"
              name="Your Score"
              fill="#758BFD"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="average"
              name="Class Average"
              fill="#AEB8FE"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
