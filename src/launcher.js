import { launch } from 'puppeteer';
import { autoReply } from './browser-scripts/auto-reply.js';

export const start = async (url, cookies) => {
    const browser = await launch({
        headless: "new"
    });
    const page = await browser.newPage();
    page.setCookie(...cookies);
    await page.goto(url);
    page.evaluate(autoReply);
}