import puppeteer from "puppeteer";

export const scrapeInfo = async (
  pageTitle,
  pageUrl,
  elements,
  descElement,
  urlElement,
  imgElement,
  dateElement,
  imageAttrElement,
  defaultImgUrl
) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(pageUrl, {
    waitUntil: "domcontentloaded",
  });

  const articlesData = await page.evaluate(
    (
      allElementsSelector,
      descSelector,
      urlSelector,
      imgSelector,
      dateSelector,
      imgAttrSelector,
      defaultImgUrl
    ) => {
      const articles = Array.from(
        document.querySelectorAll(allElementsSelector)
      ).slice(0, 10);

      const allArticles = articles?.map((article) => {
        const desc = article.querySelector(descSelector)?.textContent.trim();
        const url = article.querySelector(urlSelector)?.getAttribute("href");
        const imageUrl =
          article.querySelector(imgSelector)?.getAttribute(imgAttrSelector) ||
          defaultImgUrl;
        const postedOn = article
          .querySelector(dateSelector)
          ?.textContent.trim();
        return { desc, url, imageUrl, postedOn };
      });

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      return allArticles
        .filter(
          (ar) =>
            ar.url != "" &&
            ar.desc != "" &&
            ar.postedOn != "" &&
            ar.imageUrl != ""
        )
        .filter((ar) => new Date(ar.postedOn) > yesterday);
    },
    elements,
    descElement,
    urlElement,
    imgElement,
    dateElement,
    imageAttrElement,
    defaultImgUrl
  );

  return { title: pageTitle, articlesData };
};
