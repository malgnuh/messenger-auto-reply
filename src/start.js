import { launch } from 'puppeteer';
import { observeNewMessages } from './observer.js';
import { reply } from './reply.js';

const URL = process.argv[2];
const AUTO_MESSAGE = "(Tự động trả lời) Xin chào, tôi đang có việc bận, sau này cũng không chắc sẽ liên hệ lại";

(async () => {
    const browser = await launch({
        // headless: "new",
        headless: false,
        userDataDir: "./user-data"
    });
    const page = await browser.newPage();
    await page.goto(URL);

    await page.exposeFunction("selfMessageFunc", (message) => console.log("Self: ".concat(message)));
    await page.exposeFunction("oppMessageFunc", oppMessageFunc);

    page.evaluate(observeNewMessages);

    function oppMessageFunc(message) {
        console.log("Opp: ".concat(message));
        page.evaluate(reply, AUTO_MESSAGE)
    }

})();


