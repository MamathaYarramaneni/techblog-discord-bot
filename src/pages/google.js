import { scrapeInfo } from "./scrape.js";

const url = "https://developers.googleblog.com/";

const title = "Google for Developers";

export const getGoogleArticles = () => {
  return scrapeInfo(
    title,
    url,
    ".dgc-card",
    ".dgc-card__title",
    ".dgc-card__href",
    ".dgc-card__image",
    ".dgc-card__info p",
    "src",
    "https://www.gstatic.com/devrel-devsite/prod/vfe8699a5d354c41f3f953a7a9794768d4d2f39d37577d5708b5539be069912e1/developers/images/lockup-new.svg"
  );
};
