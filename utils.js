const { Worker } = require("worker_threads");

const WORKER_NUMBER = 16;

const TileColor = {
    GRAY: 0,
    YELLOW: 1,
    GREEN: 2,
};

const Strategy = {
    min: (hintCounter, wordsNumber) => {
        let minReduction;
        for (let hint in hintCounter) {
            const reductions = wordsNumber - hintCounter[hint];
            if (!minReduction || reductions < minReduction) {
                minReduction = reductions;
            }
        }
        return minReduction;
    },
    mean: (hintCounter, wordsNumber) => {
        let expectedReduction = 0;
        for (let hint in hintCounter) {
            const probability = hintCounter[hint] / wordsNumber;
            const reductions = wordsNumber - hintCounter[hint];
            expectedReduction += probability * reductions;
        }
        return expectedReduction;
    },
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

const calcReductionWithStrategy = (tryWord, remainWords, strategy) => {
    const hintCounter = {};

    remainWords.forEach((correctWord) => {
        const hint = makeHint(tryWord, correctWord);
        hintCounter[hint] = hintCounter[hint] + 1 || 1;
    });

    return strategy(hintCounter, remainWords.length);
};

const getReductions = async (remainWords, allWords, strategy) => {
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
                    strategy: strategy,
                },
            }).on("message", (workerResult) => resolve(workerResult))
        );
    });

    return [].concat(...(await Promise.all(promises))).sort((a, b) => {
        return b.reduction - a.reduction;
    });
};

exports.Strategy = Strategy;
exports.makeHint = makeHint;
exports.calcReductionWithStrategy = calcReductionWithStrategy;
exports.getReductions = getReductions;
