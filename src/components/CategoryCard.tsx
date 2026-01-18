import Link from "next/link";

export interface CategoryCardProps {
  id: string;
  icon: React.ReactNode;
  iconBgColor: string;
  title: string;
  description: string;
  courseCount: number;
  href?: string;
}

export default function CategoryCard({
  icon,
  iconBgColor,
  title,
  description,
  courseCount,
  href = "#",
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="relative block bg-white rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100 overflow-hidden"
    >
      {/* Orange left border on hover - slides in on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
      {/* Icon */}
      <div
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 ${iconBgColor}`}
      >
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-base sm:text-lg font-bold text-primary mb-1.5 group-hover:text-secondary transition-colors duration-200">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-500 mb-4 line-clamp-1">{description}</p>

      {/* Course Count */}
      <div className="flex items-center gap-2 text-secondary font-medium text-sm">
        <span>{courseCount} courses</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transform group-hover:translate-x-1 transition-transform duration-200"
        >
          <path
            d="M5 12H19M19 12L12 5M19 12L12 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </Link>
  );
}
