// src/components/Analytics/AnalyticsTracker.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag?: (
      command: "config" | "set" | "event",
      targetId: string,
      config?: Record<string, string | number | boolean>
    ) => void;
  }
}

export default function AnalyticsTracker(): null {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname + location.search;

    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: path,
      });
      // console.log("[GA] page_view", path); // you can temporarily enable this for debugging
    }
  }, [location]);

  return null;
}
