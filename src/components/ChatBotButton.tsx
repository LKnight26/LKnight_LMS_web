"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

const HIDDEN_ROUTES = [
  "/signin",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/admin",
];

export default function ChatBotButton() {
  const pathname = usePathname();
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const shouldHide = HIDDEN_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (shouldHide) return null;

  const handleClick = () => {
    // Future: window.botpressWebChat?.open()
    setIsTooltipVisible(true);
    setTimeout(() => setIsTooltipVisible(false), 3000);
  };

  return (
    <div className="fixed bottom-[10px] right-4 sm:right-8 z-50">
      {/* Tooltip */}
      <div
        className={`absolute bottom-full right-0 mb-3 transition-all duration-300 ${
          isTooltipVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-[#000E51] text-white text-xs font-medium px-4 py-2.5 rounded-lg shadow-lg whitespace-nowrap">
          <div className="flex items-center gap-2">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6V12L16 14" />
            </svg>
            AI Chat Assistant — Coming Soon
          </div>
          <div className="absolute -bottom-1 right-6 w-2 h-2 bg-[#000E51] rotate-45" />
        </div>
      </div>

      {/* Button */}
      <button
        onClick={handleClick}
        className="group w-14 h-14 rounded-full bg-gradient-to-br from-[#FF6F00] to-[#E86400] text-white shadow-lg shadow-[#FF6F00]/30 hover:shadow-xl hover:shadow-[#FF6F00]/40 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer"
        aria-label="Chat with us"
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="group-hover:scale-110 transition-transform duration-200"
        >
          <path
            d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
            fill="white"
          />
          <circle cx="9" cy="12" r="1" fill="#FF6F00" />
          <circle cx="12.5" cy="12" r="1" fill="#FF6F00" />
          <circle cx="16" cy="12" r="1" fill="#FF6F00" />
        </svg>
      </button>
    </div>
  );
}
