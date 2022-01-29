const { parentPort, workerData } = require("worker_threads");
const wordle = require("./wordle.js");

parentPort.postMessage(
    workerData.tryWords.map((tryWord) => ({
        word: tryWord,
        reduction: wordle.calcReduction(
            wordle.makeHintCounter(tryWord, workerData.remainWords),
            workerData.remainWords.length
        ),
    }))
);
