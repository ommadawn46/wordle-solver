const readline = require("readline");

const RL = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
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

exports.prompt = async (remainWords, reductions, isHardMode) => {
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

    console.log(`BEST WORDS${isHardMode ? " (Hard Mode)" : ""}:`);

    const ranking = isHardMode
        ? reductions.filter((r) => remainWords.includes(r.word))
        : reductions;

    ranking
        .slice(0, ranking.length >= 5 ? 5 : ranking.length)
        .forEach((r, i) => {
            console.log(`\t#${i + 1}:`, r.word, r.reduction);
        });
    console.log();

    return [(await getInputWord()).toLowerCase(), await getInputHint()];
};
