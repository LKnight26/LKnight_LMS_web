"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  label: string;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
  color?: string;
  fillColor?: string;
  showGrid?: boolean;
  valuePrefix?: string;
  valueSuffix?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: DataPoint }>;
  label?: string;
  valuePrefix?: string;
  valueSuffix?: string;
}

const CustomTooltip = ({
  active,
  payload,
  label,
  valuePrefix = "",
  valueSuffix = "",
}: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#000E51] text-white px-4 py-2.5 rounded-xl shadow-lg border-0">
        <p className="text-xs text-gray-300 mb-0.5">{label}</p>
        <p className="text-base font-semibold">
          {valuePrefix}
          {payload[0].value.toLocaleString()}
          {valueSuffix}
        </p>
      </div>
    );
  }
  return null;
};

export default function LineChart({
  data,
  color = "#000E51",
  fillColor,
  showGrid = true,
  valuePrefix = "",
  valueSuffix = "",
}: LineChartProps) {
  const formattedData = data.map((item) => ({
    name: item.label,
    value: item.value,
    label: item.label,
  }));

  const gradientId = `lineGradient-${color.replace("#", "")}`;
  const areaFill = fillColor || `${color}20`;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={formattedData}
        margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        {showGrid && (
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#E5E7EB"
            strokeOpacity={0.5}
          />
        )}
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#6B7280", fontSize: 11, fontWeight: 500 }}
          dy={10}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#9CA3AF", fontSize: 11 }}
          tickFormatter={(value) => {
            if (value >= 1000) {
              return `${(value / 1000).toFixed(0)}k`;
            }
            return value.toString();
          }}
          width={45}
        />
        <Tooltip
          content={
            <CustomTooltip
              valuePrefix={valuePrefix}
              valueSuffix={valueSuffix}
            />
          }
          cursor={{
            stroke: color,
            strokeWidth: 1,
            strokeDasharray: "5 5",
            strokeOpacity: 0.3,
          }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2.5}
          fill={`url(#${gradientId})`}
          dot={{
            r: 0,
            strokeWidth: 2,
            fill: "#fff",
            stroke: color,
          }}
          activeDot={{
            r: 6,
            strokeWidth: 3,
            fill: "#fff",
            stroke: color,
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
