// src/components/Analytics/AnalyticsTracker.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pageview } from "../../ga";

export default function AnalyticsTracker(): null {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname + location.search;
    pageview(path);
  }, [location]);

  return null;
}
