const { parentPort, workerData } = require("worker_threads");
const wordle = require("./wordle.js");

parentPort.postMessage(
    workerData.tryWords.map((word) => ({
        word: word,
        reduction: wordle.calcReduction(word, workerData.remainWords),
    }))
);
