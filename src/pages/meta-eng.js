import { scrapeInfo } from "./scrape.js";

export const url = "https://engineering.fb.com";

const title = "Engineering at Meta";

export const getMetaArticles = () => {
  return scrapeInfo(
    title,
    url,
    "article",
    ".entry-title a",
    ".entry-title a",
    ".feat-image img",
    ".posted-on time",
    "src",
    "https://engineering.fb.com/wp-content/themes/code-fb-com/img/logo-meta.svg"
  );
};
