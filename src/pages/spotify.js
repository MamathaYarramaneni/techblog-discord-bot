import { scrapeInfo } from "./scrape.js";

const url = "https://engineering.atspotify.com/";

const title = "Spotify Engineering";

export const getSpotifyArticles = () => {
  return scrapeInfo(
    title,
    url,
    "article",
    "h2 a",
    "h2 a",
    "img",
    ".date",
    "src",
    "https://engineering.atspotify.com/wp-content/themes/theme-spotify/images/logo.svg"
  );
};
