import { launch } from 'puppeteer';

(async () => {
    const browser = await launch({
        headless: false,
        userDataDir: "./user-data"
    });
    const page = await browser.newPage();
    await page.goto('https://m.facebook.com');
})();