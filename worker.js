const { parentPort, workerData } = require("worker_threads");
const utils = require("./utils.js");

parentPort.postMessage(
    workerData.tryWords.map((word) => ({
        word: word,
        reduction: utils.calcReduction(word, workerData.remainWords),
    }))
);
