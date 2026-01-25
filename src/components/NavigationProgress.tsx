"use client";

import { useEffect, useState } from "react";

export default function NavigationProgress() {
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleStart = () => {
      setIsNavigating(true);
      setProgress(0);
    };

    const handleComplete = () => {
      setProgress(100);
      setTimeout(() => {
        setIsNavigating(false);
        setProgress(0);
      }, 200);
    };

    // Listen for navigation events
    window.addEventListener("navigation-start", handleStart);
    window.addEventListener("navigation-complete", handleComplete);

    return () => {
      window.removeEventListener("navigation-start", handleStart);
      window.removeEventListener("navigation-complete", handleComplete);
    };
  }, []);

  useEffect(() => {
    if (isNavigating && progress < 90) {
      const timer = setTimeout(() => {
        setProgress((prev) => {
          const increment = Math.random() * 15 + 5;
          return Math.min(prev + increment, 90);
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isNavigating, progress]);

  if (!isNavigating && progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px]">
      <div
        className="h-full bg-[#FF6F00] transition-all duration-200 ease-out"
        style={{
          width: `${progress}%`,
          boxShadow: "0 0 10px rgba(255, 0, 0, 0.7), 0 0 5px rgba(255, 0, 0, 0.5)",
        }}
      />
    </div>
  );
}
