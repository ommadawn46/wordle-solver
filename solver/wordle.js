const { Worker } = require("worker_threads");

const WORKER_NUMBER = 16;

const TileColor = {
    GRAY: 0,
    YELLOW: 1,
    GREEN: 2,
};

const makeHint = (tryWord, correctWord, charCounter = {}) =>
    correctWord
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

const generateWorkerPromises = (remainWords, allWords, size) =>
    [...Array(WORKER_NUMBER).keys()]
        .map((i) =>
            i + 1 !== WORKER_NUMBER
                ? allWords.slice(i * size, (i + 1) * size)
                : allWords.slice(i * size)
        )
        .map(
            (tryWords) =>
                new Promise((resolve) =>
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
                )
        );

exports.makeHintCounter = (tryWord, remainWords, hintCounter = {}) => {
    remainWords
        .map((correctWord) => makeHint(tryWord, correctWord))
        .forEach((hint) => {
            hintCounter[hint] = hintCounter[hint] + 1 || 1;
        });
    return hintCounter;
};

exports.calcReduction = (hintCounter, wordsNumber) => ({
    min: Object.keys(hintCounter)
        .map((hint) => wordsNumber - hintCounter[hint])
        .reduce((r, s) => (r < s ? r : s)),
    mean: Object.keys(hintCounter)
        .map(
            (hint) =>
                (wordsNumber - hintCounter[hint]) *
                (hintCounter[hint] / wordsNumber)
        )
        .reduce((r, s) => r + s),
});

exports.getReductions = async (remainWords, allWords) =>
    remainWords.length > 0
        ? (
              await Promise.all(
                  generateWorkerPromises(
                      remainWords,
                      allWords,
                      Math.round(allWords.length / WORKER_NUMBER)
                  )
              )
          )
              .reduce((p, q) => p.concat(q))
              .sort((a, b) =>
                  a.reduction.min === b.reduction.min
                      ? b.reduction.mean - a.reduction.mean
                      : b.reduction.min - a.reduction.min
              )
        : [];

exports.filterWords = (remainWords, tryWord, hint) =>
    remainWords.filter((correctWord) =>
        makeHint(tryWord, correctWord).every((h, i) => h === hint[i])
    );
