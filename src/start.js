import { launch } from 'puppeteer';
import { autoReply } from './auto-reply.js';

const URL = process.argv[2];

(async () => {
    const browser = await launch({
        headless: "new",
        userDataDir: "./user-data"
    });
    const page = await browser.newPage();
    await page.goto(URL);
    page.evaluate(autoReply)
})();