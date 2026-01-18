"use client";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: "increase" | "decrease";
  };
  icon: React.ReactNode;
  iconBgColor?: string;
}

export default function StatsCard({
  title,
  value,
  change,
  icon,
  iconBgColor = "bg-primary/10",
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl lg:text-3xl font-bold text-primary font-outfit">
            {value}
          </h3>
          {change && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={`flex items-center gap-0.5 text-sm font-medium ${
                  change.type === "increase" ? "text-green-600" : "text-red-500"
                }`}
              >
                {change.type === "increase" ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
                {change.value}%
              </span>
              <span className="text-gray-400 text-sm">vs last month</span>
            </div>
          )}
        </div>
        <div
          className={`w-12 h-12 ${iconBgColor} rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
