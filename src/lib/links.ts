/**
 * A link counts as configured once the placeholder text has been replaced.
 * Unconfigured links render as disabled controls instead of broken anchors.
 */
export function isConfigured(url: string | undefined): url is string {
  if (!url) return false;
  return !url.includes("PASTE_") && url !== "#";
}

export function isExternal(url: string): boolean {
  return /^https?:\/\//.test(url);
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

export function scrollToTop() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}
