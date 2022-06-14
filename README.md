# wordle-solver

[WORDLE](https://www.nytimes.com/games/wordle/index.html) solver written in node.js

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
NUMBER OF LEFT WORDS: 2315

BEST WORDS:
	#1: raise { min: 2147, mean: 2253.9991360691165 }
	#2: arise { min: 2147, mean: 2251.2742980561566 }
	#3: aesir { min: 2147, mean: 2245.1170626349926 }
	#4: reais { min: 2147, mean: 2243.3892008639336 }
	#5: serai { min: 2147, mean: 2242.0786177105856 }

INPUT WORD > raise
HINT > 10000
-----
NUMBER OF LEFT WORDS: 103

BEST WORDS:
	#1: colon { min: 93, mean: 97.45631067961166 }
	#2: cloot { min: 92, mean: 98.15533980582524 }
	#3: coopt { min: 92, mean: 97.32038834951456 }
	#4: wroot { min: 92, mean: 96.89320388349516 }
	#5: cyton { min: 91, mean: 97.5339805825243 }

INPUT WORD > colon
HINT > 00020
-----
NUMBER OF LEFT WORDS: 7

LEFT WORDS: [
  'furor', 'humor',
  'juror', 'throb',
  'throw', 'tumor',
  'tutor'
]

BEST WORDS:
	#1: bathe { min: 5, mean: 5.7142857142857135 }
	#2: withe { min: 5, mean: 5.7142857142857135 }
	#3: metif { min: 5, mean: 5.7142857142857135 }
	#4: beths { min: 5, mean: 5.7142857142857135 }
	#5: fetch { min: 5, mean: 5.7142857142857135 }

INPUT WORD > bathe
HINT > 00010
-----
NUMBER OF LEFT WORDS: 1

LEFT WORDS: [ 'humor' ]

ANSWER: humor
```
