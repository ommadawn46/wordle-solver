const fs = require("fs");
const { performance } = require("perf_hooks");
const wordle = require("./solver/wordle.js");

const answerWords = require("./data/answerWords.json");
const allWords = answerWords.concat(require("./data/nonAnswerWords.json"));

const makeData = async () => {
    const startTime = performance.now();
    console.log("processing...");
    reductions = await wordle.getReductions(answerWords, allWords);

    const endTime = performance.now();
    console.log(
        "PROCESSING TIME:",
        Math.floor(endTime - startTime) / 1000,
        "sec"
    );

    const outfile = "./data/reductions.json";
    fs.writeFileSync(outfile, JSON.stringify(reductions));
    console.log("OUTFILE:", outfile);
};

(async () => {
    makeData();
})();
