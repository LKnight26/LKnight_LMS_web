interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBgColor: "blue" | "orange";
}

export default function FeatureCard({
  icon,
  title,
  description,
  iconBgColor,
}: FeatureCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-shadow duration-300">
      <div className="flex items-start gap-4">
        {/* Icon Container */}
        <div
          className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 ${
            iconBgColor === "blue"
              ? "bg-[#E8EAF6]"
              : "bg-[#FFF3E0]"
          }`}
        >
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-[#000E51] font-semibold text-[15px] mb-1.5">
            {title}
          </h3>
          <p className="text-[#64748B] text-[13px] leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
