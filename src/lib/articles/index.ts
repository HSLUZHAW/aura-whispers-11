export type { Article } from "./en";
import { ARTICLES as EN } from "./en";

// Lazy-load translations to avoid bundling all languages upfront
async function loadDe() {
  const m = await import("./de");
  return m.ARTICLES;
}
async function loadFr() {
  const m = await import("./fr");
  return m.ARTICLES;
}

export { EN as ARTICLES };

export async function getArticlesForLang(lang: string) {
  if (lang === "de") return loadDe();
  if (lang === "fr") return loadFr();
  return EN;
}

/** Synchronous fallback — returns English if translation not loaded yet */
export function getArticlesSync(lang: string) {
  return EN;
}
