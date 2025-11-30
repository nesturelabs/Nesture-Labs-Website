// src/utils/analytics.ts
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'set' | 'event',
      targetId: string,
      config?: Record<string, string | number | boolean>
    ) => void;
  }
}

export const trackEvent = (
  eventName: string,
  params: Record<string, string | number | boolean> = {}
) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
};
