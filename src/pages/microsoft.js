import { scrapeInfo } from "./scrape.js";

const url = "https://devblogs.microsoft.com/";

const title = "Microsoft Dev";

export const getMSArticles = () => {
  return scrapeInfo(
    title,
    url,
    "article",
    ".entry-title a",
    ".entry-title a",
    ".lp-default-image",
    ".entry-post-date",
    "data-src",
    "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31"
  );
};
