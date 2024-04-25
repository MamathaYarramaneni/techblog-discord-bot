import { scrapeInfo } from "./scrape.js";

const url = "https://netflixtechblog.com/";

const title = "The Netflix Tech";

export const getNetflixArticles = () => {
  return scrapeInfo(
    title,
    url,
    ".grid-post",
    ".grid-post__title a",
    ".grid-post__title a",
    ".post__image",
    ".grid-post__date",
    "data-ghost-url",
    "https://cdn-images-1.medium.com/max/606/1*rOPLUJ3W6FUA3rO1U1IeuA@2x.png"
  );
};
