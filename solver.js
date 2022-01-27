const readline = require("readline");
const utils = require("./utils.js");

const wordsWithReductions = require("./data/wordsWithReductions.json");
const words = wordsWithReductions.map((v) => v["word"]);

const RL = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const filterWords = (remainWords, tryWord, hint) =>
    remainWords.filter((correctWord) => {
        return utils.makeHint(tryWord, correctWord).every((h, i) => {
            return h === hint[i];
        });
    });

const getInputWord = async () =>
    await new Promise((resolve) => {
        RL.question("INPUT WORD > ", resolve);
    });

const getInputHint = async () =>
    (
        await new Promise((resolve) => {
            RL.question("HINT > ", resolve);
        })
    )
        .split("")
        .map((v) => {
            return parseInt(v);
        });

const interactUser = async (remainWords, reductions) => {
    console.log("-----");

    console.log("NUMBER OF LEFT WORDS:", remainWords.length, "\n");

    if (remainWords.length < 100) {
        console.log("LEFT WORDS:", remainWords, "\n");
    }

    if (remainWords.length === 1) {
        console.log("ANSWER:", remainWords[0]);
        process.exit(0);
    } else if (remainWords.length === 0) {
        console.log("NO WORDS LEFT!");
        process.exit(1);
    }

    console.log("BEST WORDS:");
    [...Array(reductions.length >= 5 ? 5 : reductions.length).keys()].forEach(
        (i) => {
            console.log(
                `\t#${i + 1}:`,
                reductions[i]["word"],
                reductions[i]["reduction"]
            );
        }
    );
    console.log();

    return [await getInputWord(), await getInputHint()];
};

(async () => {
    let reductions = wordsWithReductions;
    let remainWords = words;

    while (true) {
        const [inputWord, inputHint] = await interactUser(
            remainWords,
            reductions
        );
        remainWords = filterWords(remainWords, inputWord, inputHint);
        reductions = await utils.getReductions(remainWords, words);
    }
})();
