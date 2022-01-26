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
                return TileColor.GREEN;
            }
            charCounter[char] = charCounter[char] + 1 || 1;
            return TileColor.GRAY;
        })
        .map((tileColor, i) => {
            if (
                tileColor != TileColor.GREEN &&
                charCounter[tryWord[i]] > 0 &&
                correctWord.includes(tryWord[i])
            ) {
                charCounter[tryWord[i]]--;
                return TileColor.YELLOW;
            }
            return tileColor;
        });
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

const getReductions = (remainWords, allWords) =>
    allWords
        .map((word) => ({
            word: word,
            reduction: calcExpectedReduction(word, remainWords),
        }))
        .sort((a, b) => {
            return b["reduction"] - a["reduction"];
        });

exports.makeHint = makeHint;
exports.calcExpectedReduction = calcExpectedReduction;
exports.getReductions = getReductions;
