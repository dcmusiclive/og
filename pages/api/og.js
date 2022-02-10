import DOMPurify from "isomorphic-dompurify";
import absoluteUrl from "next-absolute-url";
const chromium = require("chrome-aws-lambda");
import { truncate } from "../../utils/truncate";

export default async function og(req, res) {
  const {
    query: { title, description },
  } = req;
  const { origin } = absoluteUrl(req, "localhost:3000");

  const sanitizedTitle = truncate(
    DOMPurify.sanitize(decodeURIComponent(title)),
    71
  );

  const sanitizedDescription = truncate(
    DOMPurify.sanitize(decodeURIComponent(description)),
    175
  );
  const options = {
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    ignoreHTTPSErrors: true,
  };

  const browser = await chromium.puppeteer.launch(options);

  const [page] = await browser.pages();
  await page.setViewport({ width: 1200, height: 627 });

  await page.goto(
    `${origin}?title=${encodeURIComponent(
      sanitizedTitle
    )}&description=${encodeURIComponent(sanitizedDescription)}`
  );

  return page.screenshot({ type: "png" });
}
