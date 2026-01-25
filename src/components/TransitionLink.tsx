"use client";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface TransitionLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function TransitionLink({
  children,
  href,
  className,
  onClick,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Call any additional onClick handler
    if (onClick) onClick();

    // Dispatch navigation start event
    window.dispatchEvent(new CustomEvent("navigation-start"));

    // Navigate
    router.push(href.toString());

    // Complete after a short delay
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("navigation-complete"));
    }, 300);
  };

  return (
    <Link href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
