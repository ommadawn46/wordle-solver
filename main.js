const wordle = require("./solver/wordle.js");
const interact = require("./solver/interact.js");

const loop = async (reductions, remainWords, allWords, isHardMode) => {
    interact.print(remainWords, reductions, isHardMode);
    const [inputWord, inputHint] = await interact.prompt();

    const nextRemainWords = wordle.filterWords(
        remainWords,
        inputWord,
        inputHint
    );

    loop(
        await wordle.getReductions(nextRemainWords, allWords),
        nextRemainWords,
        allWords,
        isHardMode
    );
};

const isHardMode = process.argv.includes("--hard");
const reductions = require("./data/reductions.json");

loop(
    reductions,
    reductions.map((v) => v.word),
    reductions.map((v) => v.word),
    isHardMode
);
