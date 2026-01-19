"use client";

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
import { useState } from "react";

interface DataPoint {
  label: string;
  value: number;
}

interface RevenueChartProps {
  data: DataPoint[];
  title?: string;
  barColor?: string;
  hoverColor?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: DataPoint }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#000E51] text-white px-4 py-2.5 rounded-xl shadow-lg border-0">
        <p className="text-xs text-gray-300 mb-0.5">{label}</p>
        <p className="text-base font-semibold">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default function RevenueChart({
  data,
  barColor = "#000E51",
  hoverColor = "#FF6F00",
}: RevenueChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const formattedData = data.map((item) => ({
    name: item.label,
    value: item.value,
    label: item.label,
  }));

  const maxValue = Math.max(...data.map((d) => d.value));
  const yAxisMax = Math.ceil(maxValue / 5000) * 5000;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={formattedData}
        margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
        barCategoryGap="20%"
        onMouseLeave={() => setActiveIndex(null)}
      >
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={barColor} stopOpacity={1} />
            <stop offset="100%" stopColor={barColor} stopOpacity={0.7} />
          </linearGradient>
          <linearGradient id="barGradientHover" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={hoverColor} stopOpacity={1} />
            <stop offset="100%" stopColor={hoverColor} stopOpacity={0.8} />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
          </filter>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#E5E7EB"
          strokeOpacity={0.5}
        />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#6B7280", fontSize: 12, fontWeight: 500 }}
          dy={10}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#9CA3AF", fontSize: 11 }}
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          domain={[0, yAxisMax]}
          width={50}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ fill: "rgba(0, 14, 81, 0.05)", radius: 8 }}
        />
        <Bar
          dataKey="value"
          radius={[8, 8, 0, 0]}
          maxBarSize={50}
          onMouseEnter={(_, index) => setActiveIndex(index)}
        >
          {formattedData.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                activeIndex === index
                  ? "url(#barGradientHover)"
                  : "url(#barGradient)"
              }
              style={{
                filter: activeIndex === index ? "url(#shadow)" : "none",
                transition: "all 0.2s ease",
              }}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
