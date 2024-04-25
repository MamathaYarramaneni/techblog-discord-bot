import { scrapeInfo } from "./scrape.js";

const url = "https://www.linkedin.com/blog/engineering";

const title = "Linkedin Engineering";

export const getLinkedArticles = () => {
  return scrapeInfo(
    title,
    url,
    ".grid-post",
    ".grid-post__title a",
    ".grid-post__title a",
    ".post__image",
    ".grid-post__date",
    "data-ghost-url",
    "https://static.licdn.com/aero-v1/sc/h/6zm111mce7vohqze950ilreo4"
  );
};
