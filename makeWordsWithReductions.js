const fs = require("fs");
const { performance } = require("perf_hooks");
const utils = require("./utils.js");

const words = require("./data/words.json");

const startTime = performance.now();
console.log("processing...");
wordsWithReducts = utils.getReductions(words, words);

const endTime = performance.now();
console.log("PROCESSING TIME:", Math.floor(endTime - startTime) / 1000, "sec");

const outfile = "./data/wordsWithReductions.json";
fs.writeFileSync(outfile, JSON.stringify(wordsWithReducts));
console.log("OUTFILE:", outfile);
