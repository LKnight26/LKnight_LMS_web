import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  showArrow?: boolean;
  onClick?: () => void;
  href?: string;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  bgColor = "bg-secondary",
  textColor = "text-primary",
  showArrow = true,
  onClick,
  href,
  className = "",
  disabled = false,
  type = "button",
}: ButtonProps) {
  const baseClasses = `
    inline-flex items-center ${showArrow ? "justify-between" : "justify-center"}
    w-full sm:w-[200px] md:w-[220px] lg:w-[230px] xl:w-[240px]
    px-6 py-3.5
    ${bgColor} ${textColor}
    text-base font-semibold
    rounded-lg
    transition-all duration-200
    hover:opacity-90 hover:shadow-md
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6F00]
    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
    ${className}
  `.trim().replace(/\s+/g, " ");

  const ArrowIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <path
        d="M5 12H19M19 12L12 5M19 12L12 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const content = (
    <>
      <span>{children}</span>
      {showArrow && <ArrowIcon />}
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {content}
    </button>
  );
}
