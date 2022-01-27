const { Worker } = require("worker_threads");

const WORKER_NUMBER = 16;

const TileColor = {
    GRAY: 0,
    YELLOW: 1,
    GREEN: 2,
};

const makeHint = (tryWord, correctWord) => {
    tryWord = tryWord.toLowerCase();
    correctWord = correctWord.toLowerCase();

    const charCounter = {};

    return correctWord
        .split("")
        .map((char, i) => {
            if (char === tryWord[i]) {
                return true;
            }
            charCounter[char] = charCounter[char] + 1 || 1;
            return false;
        })
        .map((isGreen, i) =>
            isGreen
                ? TileColor.GREEN
                : tryWord[i] in charCounter && charCounter[tryWord[i]]-- > 0
                ? TileColor.YELLOW
                : TileColor.GRAY
        );
};

const calcExpectedReduction = (tryWord, remainWords) => {
    const hintCounter = {};

    remainWords.forEach((correctWord) => {
        const hint = makeHint(tryWord, correctWord);
        hintCounter[hint] = hintCounter[hint] + 1 || 1;
    });

    let expectedReduction = 0;
    for (let hint in hintCounter) {
        const probability = hintCounter[hint] / remainWords.length;
        const reductions = remainWords.length - hintCounter[hint];
        expectedReduction += probability * reductions;
    }

    return expectedReduction;
};

const getReductions = async (remainWords, allWords) => {
    const size = allWords.length / WORKER_NUMBER;

    const promises = [...Array(WORKER_NUMBER).keys()].map((i) => {
        const tryWords =
            i + 1 !== WORKER_NUMBER
                ? allWords.slice(i * size, (i + 1) * size)
                : allWords.slice(i * size);

        return new Promise((resolve) =>
            new Worker("./worker.js", {
                workerData: {
                    tryWords: tryWords,
                    remainWords: remainWords,
                },
            }).on("message", (workerResult) => resolve(workerResult))
        );
    });

    return [].concat(...(await Promise.all(promises))).sort((a, b) => {
        return b.reduction - a.reduction;
    });
};

exports.makeHint = makeHint;
exports.calcExpectedReduction = calcExpectedReduction;
exports.getReductions = getReductions;
