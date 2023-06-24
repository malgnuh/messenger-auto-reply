import { launch } from 'puppeteer';
import { observeNewMessages } from './observer.js';
import { reply } from './reply.js';

const URL = process.argv[2];

(async () => {
    const messageHistory = []
    const browser = await launch({
        // headless: "new",
        headless: false,
        userDataDir: "./user-data"
    });
    const page = await browser.newPage();
    await page.goto(URL);

    await page.exposeFunction("processTextMessage", processTextMessage);

    page.evaluate(observeNewMessages);

    function processTextMessage(message) {
        messageHistory.push(message);
        console.log(messageHistory);
    }

})();