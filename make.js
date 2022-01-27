const fs = require("fs");
const { performance } = require("perf_hooks");
const utils = require("./utils.js");

const words = require("./data/words.json");

const makeData = async (strategy) => {
    const startTime = performance.now();
    console.log(strategy, "processing...");
    wordsWithReducts = await utils.getReductions(words, words, strategy);

    const endTime = performance.now();
    console.log(
        strategy,
        "PROCESSING TIME:",
        Math.floor(endTime - startTime) / 1000,
        "sec"
    );

    const outfile = `./data/${strategy}.json`;
    fs.writeFileSync(outfile, JSON.stringify(wordsWithReducts));
    console.log("OUTFILE:", outfile);
};

(async () => {
    makeData("mean");
    makeData("min");
})();
