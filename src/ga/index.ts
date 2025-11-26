// src/ga/index.ts
// Lightweight GA4 helper for Vite + React (TypeScript)

const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;

/**
 * Load gtag.js and initialize GA.
 * - Uses send_page_view: false so we control SPA page_view events manually.
 * - Safe to call multiple times (idempotent).
 */
export function loadGtag() {
  if (!GA_ID) {
    // no GA configured
    // eslint-disable-next-line no-console
    console.warn("[GA] VITE_GA_ID is not defined. Skipping Google Analytics load.");
    return;
  }

  // If gtag is already loaded, do nothing
  if ((window as any).gtag) return;

  // Inject official gtag script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag stub
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).gtag =
    (window as any).gtag ||
    function () {
      (window as any).dataLayer.push(arguments);
    };

  // Initialize GA and disable automatic page_view, we will trigger manually
  (window as any).gtag("js", new Date());
  (window as any).gtag("config", GA_ID, { send_page_view: false });
}

/**
 * Send a SPA page_view event. Call on each client route change.
 * @param path path + query (e.g. location.pathname + location.search)
 */
export function pageview(path: string) {
  const gtag = (window as any).gtag;
  if (!gtag) {
    // try to lazy load (optional) and then exit; usually loadGtag() was called on startup
    loadGtag();
    return;
  }
  gtag("event", "page_view", {
    page_path: path,
  });
}

/**
 * Send a custom event to GA.
 * @param name Event name
 * @param params Event params object
 */
export function event(name: string, params: Record<string, any> = {}) {
  const gtag = (window as any).gtag;
  if (!gtag) return;
  gtag("event", name, params);
}
