/**
 * Central language management.
 * Source of truth: localStorage > browser language > 'en'
 */

export type Lang = "de" | "en";

const STORAGE_KEY = "lunara_language";

/** Get current language: localStorage > browser > 'en' */
export function getLanguage(): Lang {
  if (typeof window === "undefined") return "en";

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "de" || stored === "en") return stored;

  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith("de")) return "de";

  return "en";
}

/** Save user's chosen language and notify listeners */
export function setLanguage(lang: Lang) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, lang);
  window.dispatchEvent(new Event("languagechange-app"));
}

/** Subscribe to language changes. Returns an unsubscribe function. */
export function onLanguageChange(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => callback();
  window.addEventListener("languagechange-app", handler);
  return () => window.removeEventListener("languagechange-app", handler);
}
