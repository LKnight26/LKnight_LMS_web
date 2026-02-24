"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const HIDDEN_ROUTES = [
  "/signin",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/admin",
];

declare global {
  interface Window {
    $zoho?: {
      salesiq?: {
        ready?: () => void;
        floatwindow?: {
          visible: (mode: "show" | "hide") => void;
        };
        chat?: {
          waittime: (time: number) => void;
        };
      };
    };
  }
}

let scriptsLoaded = false;

export default function ChatBotButton() {
  const pathname = usePathname();

  const shouldHide = HIDDEN_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  // Load Zoho SalesIQ scripts once
  useEffect(() => {
    if (scriptsLoaded) return;
    scriptsLoaded = true;

    // Initialize Zoho global object
    window.$zoho = window.$zoho || {};
    window.$zoho.salesiq = window.$zoho.salesiq || {
      ready: function () {},
    };

    // Load the widget script
    const script = document.createElement("script");
    script.id = "zsiqscript";
    script.src =
      "https://salesiq.zohopublic.com/widget?wc=siq305e35b9b1d3b72c2db4c9906d40446582284415e714acbbf7c960431f93fd90";
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  // Show/hide the widget based on route
  useEffect(() => {
    const toggleWidget = () => {
      if (window.$zoho?.salesiq?.floatwindow) {
        window.$zoho.salesiq.floatwindow.visible(
          shouldHide ? "hide" : "show"
        );
      }
    };

    // Try immediately
    toggleWidget();

    // Also retry after a short delay (widget may not be ready yet)
    const timeout = setTimeout(toggleWidget, 1500);
    return () => clearTimeout(timeout);
  }, [shouldHide, pathname]);

  return null;
}
