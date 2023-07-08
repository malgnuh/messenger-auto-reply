import * as fs from 'node:fs';

export const importCookies = (filePath) => {
    const cookiesString = fs.readFileSync(filePath);
    const cookies = JSON.parse(cookiesString);
    return cookies;
}