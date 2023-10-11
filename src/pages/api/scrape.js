import puppeteer from "puppeteer";
import sentimentAnalyzer from "../../utils/sentimentAnalyzer";
import validateUrl from "../../utils/urlValidator";

export default async (req, res) => {
  if (!req.query || !req.query.url || !validateUrl(req.query.url))
    return res.status(400).json({ status: "invalid-url" });

  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disabled-setupid-sandbox"],
      headless: "new",
    });
    const page = await browser.newPage();
    await page.goto(req.query.url);
    await page.waitForSelector("body");

    const blogPosts = await page.evaluate(async () => {
      return [...document.querySelectorAll("a>img")].map((element) => ({
        title:
          element.parentElement.parentElement.firstChild.nextSibling.firstChild
            .nextSibling.firstChild.innerText,
        short_description:
          element.parentElement.parentElement.firstChild.nextSibling.firstChild
            .nextSibling.firstChild.nextSibling.innerText,
        image: element.getAttribute("src"),
        href: element.parentElement.getAttribute("href"),
      }));
    });
    await page.close();

    const detailedBlogPosts = await Promise.all(
      blogPosts.map(
        (post) =>
          new Promise(async (a, r) => {
            try {
              const href = `${req.query.url.replace(/\/+$/, "")}${post.href}`;
              const page = await browser.newPage();
              await page.goto(href);
              await page.waitForSelector("body");
              const content = await page.evaluate(async () =>
                document
                  .querySelector(
                    "body > div > div > div > div > div:nth-child(2) > div > div:nth-child(3)"
                  )
                  .innerText.split("\n")
                  .join(" ")
              );
              await page.close();
              a({
                ...post,
                image: `${req.query.url.replace(/\/+$/, "")}${post.image}`,
                href,
                sentiment: sentimentAnalyzer(content),
                long_description:
                  content.split(" ").length > 50
                    ? `${content.split(" ").slice(0, 50).join(" ")}...`
                    : content,
                words: content.split(" ").length,
              });
            } catch (err) {
              r(err);
            }
          })
      )
    );

    browser.close();
    return res.status(200).json({
      posts: detailedBlogPosts,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ ststus: "error" });
  }
};
