"use client";

import { useState } from "react";

interface DataPoint {
  label: string;
  value: number;
}

interface RevenueChartProps {
  data: DataPoint[];
  title?: string;
}

export default function RevenueChart({ data, title }: RevenueChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue;

  const getHeight = (value: number) => {
    if (range === 0) return 50;
    return ((value - minValue) / range) * 80 + 20;
  };

  return (
    <div className="h-full flex flex-col">
      {title && (
        <h4 className="text-sm font-medium text-gray-500 mb-4">{title}</h4>
      )}

      {/* Chart Area */}
      <div className="flex-1 flex items-end gap-2 min-h-[200px]">
        {data.map((point, index) => (
          <div
            key={index}
            className="flex-1 flex flex-col items-center gap-2"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Tooltip */}
            <div
              className={`bg-primary text-white text-xs px-2 py-1 rounded-lg transition-all duration-200 ${
                hoveredIndex === index
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }`}
            >
              ${point.value.toLocaleString()}
            </div>

            {/* Bar */}
            <div
              className={`w-full rounded-t-lg transition-all duration-300 cursor-pointer ${
                hoveredIndex === index
                  ? "bg-secondary"
                  : "bg-primary/80 hover:bg-primary"
              }`}
              style={{ height: `${getHeight(point.value)}%` }}
            />

            {/* Label */}
            <span className="text-xs text-gray-500 font-medium">
              {point.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
