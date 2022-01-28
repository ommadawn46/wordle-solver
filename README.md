# wordle-solver

[WORDLE](https://www.powerlanguage.co.uk/wordle/) solver written in node.js

```
⬛ = 0
🟨 = 1
🟩 = 2
```

```
⬛⬛⬛⬛⬛ = 00000
🟨🟩⬛⬛🟨 = 12001
🟩🟩🟩🟩🟩 = 22222
```


## Usage

```
node main [--hard]

Options:
  --hard  enable Hard Mode
```


## Demo

```
❯ node main
-----
NUMBER OF LEFT WORDS: 12972 

BEST WORDS:
        #1: serai { min: 12275, mean: 12656.866635831011 }
        #2: soare { min: 12203, mean: 12668.169133518342 }
        #3: reais { min: 12203, mean: 12667.238976256549 }
        #4: paseo { min: 12196, mean: 12543.62781375269 }
        #5: aeros { min: 12171, mean: 12662.266574159734 }

INPUT WORD > serai
HINT > 00100
-----
NUMBER OF LEFT WORDS: 214 

BEST WORDS:
        #1: choon { min: 190, mean: 202.93457943925236 }
        #2: croon { min: 189, mean: 203.28037383177573 }
        #3: phono { min: 189, mean: 200.94392523364488 }
        #4: brunt { min: 188, mean: 202.55140186915887 }
        #5: cloot { min: 187, mean: 203.42056074766356 }

INPUT WORD > choon
HINT > 01020
-----
NUMBER OF LEFT WORDS: 1 

LEFT WORDS: [ 'humor' ] 

ANSWER: humor
```
