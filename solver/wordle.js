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

const calcReduction = (tryWord, remainWords) => {
    const hintCounter = {};

    remainWords.forEach((correctWord) => {
        const hint = makeHint(tryWord, correctWord);
        hintCounter[hint] = hintCounter[hint] + 1 || 1;
    });

    let minReduction = null,
        meanReduction = 0;

    for (let hint in hintCounter) {
        const reductions = remainWords.length - hintCounter[hint];
        if (!minReduction || reductions < minReduction) {
            minReduction = reductions;
        }
        const probability = hintCounter[hint] / remainWords.length;
        meanReduction += probability * reductions;
    }

    return { min: minReduction, mean: meanReduction };
};

const getReductions = async (remainWords, allWords) => {
    const size = allWords.length / WORKER_NUMBER;

    const promises = [...Array(WORKER_NUMBER).keys()].map((i) => {
        const tryWords =
            i + 1 !== WORKER_NUMBER
                ? allWords.slice(i * size, (i + 1) * size)
                : allWords.slice(i * size);

        return new Promise((resolve) =>
            new Worker("./solver/worker.js", {
                workerData: {
                    tryWords: tryWords,
                    remainWords: remainWords,
                },
            })
                .on("message", (workerResult) => resolve(workerResult))
                .on("error", (err) => {
                    console.log(err);
                })
        );
    });

    return []
        .concat(...(await Promise.all(promises)))
        .sort((a, b) =>
            a.reduction.min === b.reduction.min
                ? b.reduction.mean - a.reduction.mean
                : b.reduction.min - a.reduction.min
        );
};

const filterWords = (remainWords, tryWord, hint) =>
    remainWords.filter((correctWord) => {
        return makeHint(tryWord, correctWord).every((h, i) => {
            return h === hint[i];
        });
    });

exports.makeHint = makeHint;
exports.calcReduction = calcReduction;
exports.getReductions = getReductions;
exports.filterWords = filterWords;
