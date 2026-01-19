"use client";

import { useState } from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface DataPoint {
  name: string;
  value: number;
  color?: string;
}

interface PieChartProps {
  data: DataPoint[];
  colors?: string[];
  innerRadius?: number;
  outerRadius?: number;
  showLegend?: boolean;
  centerLabel?: string;
  centerValue?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: DataPoint & { color: string };
  }>;
}

const COLORS = ["#000E51", "#FF6F00", "#3B82F6", "#A855F7", "#22C55E", "#EF4444", "#F59E0B"];

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-[#000E51] text-white px-4 py-3 rounded-xl shadow-xl border-0 z-50">
        <p className="text-xs text-gray-300 mb-1">{data.name}</p>
        <p className="text-lg font-bold">${data.value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export default function PieChart({
  data,
  colors = COLORS,
  innerRadius = 60,
  outerRadius = 90,
  showLegend = true,
  centerLabel,
  centerValue,
}: PieChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const chartData = data.map((item, index) => ({
    ...item,
    color: item.color || colors[index % colors.length],
  }));

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 relative min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              paddingAngle={2}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  style={{
                    outline: "none",
                    transform: activeIndex === index ? "scale(1.05)" : "scale(1)",
                    transformOrigin: "center",
                    transition: "transform 0.2s ease",
                    filter: activeIndex === index ? "drop-shadow(0 4px 8px rgba(0,0,0,0.2))" : "none",
                    cursor: "pointer",
                  }}
                />
              ))}
            </Pie>
            <Tooltip
              content={<CustomTooltip />}
              position={{ x: 0, y: -20 }}
              wrapperStyle={{
                zIndex: 100,
                pointerEvents: 'none',
              }}
              offset={30}
            />
          </RechartsPieChart>
        </ResponsiveContainer>

        {/* Center Label */}
        {(centerLabel || centerValue) && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center bg-white rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-sm">
              {centerValue && (
                <p className="text-xl font-bold text-primary">{centerValue}</p>
              )}
              {centerLabel && (
                <p className="text-xs text-gray-500 leading-tight">{centerLabel}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-4 pt-4 border-t border-gray-100">
          {chartData.map((entry, index) => (
            <button
              key={entry.name}
              className={`flex items-center gap-2 transition-all duration-200 ${
                activeIndex === index
                  ? "opacity-100 scale-105"
                  : activeIndex !== null
                  ? "opacity-50"
                  : "opacity-80 hover:opacity-100"
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <span
                className="w-3 h-3 rounded-full shadow-sm"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-600 font-medium">{entry.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
