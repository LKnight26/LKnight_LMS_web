"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface CourseEnrollment {
  name: string;
  enrollments: number;
  color?: string;
}

interface EnrollmentChartProps {
  data: CourseEnrollment[];
  layout?: "horizontal" | "vertical";
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: CourseEnrollment;
  }>;
  label?: string;
}

const COLORS = ["#000E51", "#FF6F00", "#3B82F6", "#A855F7", "#22C55E", "#EF4444", "#F59E0B"];

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#000E51] text-white px-4 py-3 rounded-xl shadow-xl border-0">
        <p className="text-xs text-gray-300 mb-1 max-w-[150px] truncate">{label}</p>
        <p className="text-lg font-bold">{payload[0].value.toLocaleString()} students</p>
      </div>
    );
  }
  return null;
};

export default function EnrollmentChart({
  data,
  layout = "horizontal",
}: EnrollmentChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const chartData = data.map((item, index) => ({
    ...item,
    color: item.color || COLORS[index % COLORS.length],
  }));

  const onBarEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  const onBarLeave = () => {
    setActiveIndex(null);
  };

  if (layout === "vertical") {
    return (
      <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
          >
            <defs>
              <linearGradient id="enrollmentGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#000E51" stopOpacity={1} />
                <stop offset="100%" stopColor="#FF6F00" stopOpacity={1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E5E7EB"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              type="number"
              tick={{ fill: "#6B7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: "#6B7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={120}
              tickFormatter={(value) =>
                value.length > 15 ? `${value.substring(0, 15)}...` : value
              }
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(0, 14, 81, 0.05)" }}
            />
            <Bar
              dataKey="enrollments"
              radius={[0, 8, 8, 0]}
              onMouseEnter={onBarEnter}
              onMouseLeave={onBarLeave}
              barSize={28}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={activeIndex === index ? "#FF6F00" : entry.color}
                  style={{
                    filter: activeIndex === index ? "drop-shadow(0 4px 8px rgba(255, 111, 0, 0.3))" : "none",
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -10, bottom: 20 }}
        >
          <defs>
            <linearGradient id="enrollmentBarGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#000E51" stopOpacity={1} />
              <stop offset="100%" stopColor="#000E51" stopOpacity={0.7} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#E5E7EB"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            tick={{ fill: "#6B7280", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            angle={-45}
            textAnchor="end"
            height={80}
            interval={0}
            tickFormatter={(value) =>
              value.length > 12 ? `${value.substring(0, 12)}...` : value
            }
          />
          <YAxis
            tick={{ fill: "#6B7280", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(0, 14, 81, 0.05)" }}
          />
          <Bar
            dataKey="enrollments"
            radius={[8, 8, 0, 0]}
            onMouseEnter={onBarEnter}
            onMouseLeave={onBarLeave}
            barSize={40}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={activeIndex === index ? "#FF6F00" : entry.color}
                style={{
                  filter: activeIndex === index ? "drop-shadow(0 4px 8px rgba(255, 111, 0, 0.3))" : "none",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
