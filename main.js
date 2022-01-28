const wordle = require("./solver/wordle.js");
const interact = require("./solver/interact.js");

const start = async (isHardMode) => {
    let reductions = require("./data/reductions.json");
    const allWords = reductions.map((v) => v["word"]);
    let remainWords = allWords;

    while (true) {
        const [inputWord, inputHint] = await interact.prompt(
            remainWords,
            reductions,
            isHardMode
        );
        remainWords = wordle.filterWords(remainWords, inputWord, inputHint);
        reductions = await wordle.getReductions(remainWords, allWords);
    }
};

(async () => {
    const isHardMode = process.argv.includes("--hard");
    start(isHardMode);
})();
