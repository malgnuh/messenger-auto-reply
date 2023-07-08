import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { start } from "./src/launcher.js";
import { importCookies } from "./src/import-cookies.js";

const URL = process.argv[2];

const __dirname = dirname(fileURLToPath(import.meta.url));
const cookies = importCookies(path.resolve(__dirname, "cookies.json"));

start(URL, cookies);