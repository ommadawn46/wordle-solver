const wordle = require("./solver/wordle.js");
const interact = require("./solver/interact.js");

(async () => {
    let reductions = require("./data/reductions.json");
    const allWords = reductions.map((v) => v["word"]);
    let remainWords = allWords;

    while (true) {
        const [inputWord, inputHint] = await interact.prompt(
            remainWords,
            reductions
        );
        remainWords = wordle.filterWords(remainWords, inputWord, inputHint);
        reductions = await wordle.getReductions(remainWords, allWords);
    }
})();
