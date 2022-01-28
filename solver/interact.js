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

const prompt = async (remainWords, reductions) => {
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

exports.prompt = prompt;
