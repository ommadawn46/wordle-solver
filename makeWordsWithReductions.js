const fs = require("fs");
const utils = require("./utils.js");

const words = require("./data/words.json");

wordsWithReducts = words
    .map((tryWord, i) => {
        process.stdout.write(`[${i + 1}/${words.length}]\r`);
        const expectedReduction = utils.calcExpectedReduction(tryWord, words);
        return { word: tryWord, reduction: expectedReduction };
    })
    .sort((a, b) => {
        return b["reduction"] - a["reduction"];
    });
console.log();

const outfile = "./data/wordsWithReductions.json";
fs.writeFileSync(outfile, JSON.stringify(wordsWithReducts));

console.log("OUTFILE:", outfile);
