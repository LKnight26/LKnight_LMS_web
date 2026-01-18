"use client";

import { useState } from "react";

interface DataPoint {
  label: string;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
  color?: string;
  fillColor?: string;
}

export default function LineChart({
  data,
  color = "#000E51",
  fillColor = "rgba(0, 14, 81, 0.1)",
}: LineChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;

  const chartWidth = 100;
  const chartHeight = 100;
  const padding = 5;

  const getX = (index: number) => {
    return padding + (index / (data.length - 1)) * (chartWidth - 2 * padding);
  };

  const getY = (value: number) => {
    return (
      chartHeight -
      padding -
      ((value - minValue) / range) * (chartHeight - 2 * padding)
    );
  };

  // Generate path for the line
  const linePath = data
    .map((point, index) => {
      const x = getX(index);
      const y = getY(point.value);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  // Generate path for the filled area
  const areaPath = `${linePath} L ${getX(data.length - 1)} ${
    chartHeight - padding
  } L ${getX(0)} ${chartHeight - padding} Z`;

  return (
    <div className="relative h-full">
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((percent) => (
          <line
            key={percent}
            x1={padding}
            y1={padding + ((100 - percent) / 100) * (chartHeight - 2 * padding)}
            x2={chartWidth - padding}
            y2={padding + ((100 - percent) / 100) * (chartHeight - 2 * padding)}
            stroke="#e5e7eb"
            strokeWidth="0.5"
            strokeDasharray="2,2"
          />
        ))}

        {/* Filled area */}
        <path d={areaPath} fill={fillColor} />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {data.map((point, index) => (
          <circle
            key={index}
            cx={getX(index)}
            cy={getY(point.value)}
            r={hoveredIndex === index ? 4 : 3}
            fill="white"
            stroke={hoveredIndex === index ? "#FF6F00" : color}
            strokeWidth="2"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="cursor-pointer transition-all duration-200"
          />
        ))}
      </svg>

      {/* Hover tooltip */}
      {hoveredIndex !== null && (
        <div
          className="absolute bg-primary text-white text-xs px-2 py-1 rounded-lg pointer-events-none z-10 transform -translate-x-1/2"
          style={{
            left: `${(hoveredIndex / (data.length - 1)) * 100}%`,
            top: `${getY(data[hoveredIndex].value) - 10}%`,
          }}
        >
          ${data[hoveredIndex].value.toLocaleString()}
        </div>
      )}

      {/* X-axis labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-1">
        {data.map((point, index) => (
          <span
            key={index}
            className={`text-xs ${
              hoveredIndex === index ? "text-primary font-medium" : "text-gray-400"
            }`}
          >
            {point.label}
          </span>
        ))}
      </div>
    </div>
  );
}
