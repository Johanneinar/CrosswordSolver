# CrosswordSolver Mini

A fully playable daily mini crossword puzzle, styled like *The New Yorker*. No app, no login — just open the link.

**Play:** https://johanneinar.github.io/CrosswordSolver/

---

## Features

- **Daily puzzle** — a new 5×5 puzzle every day, rotating through the library
- **Puzzle navigation** — use the ‹ › arrows to go back and replay previous days
- **Already solved** — if you've solved today's puzzle, your time is shown when you return
- **Check Puzzle** — marks correct cells green and wrong cells red
- **Reveal Puzzle** — fills in all answers after a confirmation prompt
- **Timer** — starts on your first keypress, freezes when you solve
- **Completion animation** — a brief overlay fades in on solve
- **Stats & streaks** — tracks total solves, current streak, and best time (📊 in the header)
- **Share button** — copies your solve time and a link to the clipboard after completing
- **Mobile keyboard** — QWERTY on-screen keyboard on small screens
- **Responsive layout** — clues beside the grid on desktop, below on mobile

---

## How to Play

- **Click** a white cell to select it; click again to toggle across/down
- **Type** to fill in letters — the cursor advances automatically
- **Backspace** to erase
- **Arrow keys** to navigate
- **Click a clue** to jump to that word

---

## Adding Puzzles

Puzzles are stored in [`puzzles.js`](puzzles.js). Each entry follows this format:

```js
{
  solution: [
    ['W','O','R','D','S'],
    ['A',null,'O',null,'T'],
    ['T','E','N','T','H'],
    ['E',null,'T',null,'I'],
    ['R','E','A','D','S'],
  ],
  clues: {
    across: [
      { number:1, row:0, col:0, len:5, clue:'Your clue here' },
      { number:4, row:2, col:0, len:5, clue:'Your clue here' },
      { number:5, row:4, col:0, len:5, clue:'Your clue here' },
    ],
    down: [
      { number:1, row:0, col:0, len:5, clue:'Your clue here' },
      { number:2, row:0, col:2, len:5, clue:'Your clue here' },
      { number:3, row:0, col:4, len:5, clue:'Your clue here' },
    ],
  },
}
```

**Grid rules for this format:**
- Black cells are `null`; white cells are the correct letter
- Black cells are fixed at positions (row 1, col 1), (row 1, col 3), (row 3, col 1), (row 3, col 3)
- 3 across words (rows 0, 2, 4) and 3 down words (cols 0, 2, 4)
- Every intersection must match: `solution[row][col]` must be the same letter whether you read it across or down

Use the **Puzzle Editor** to design new puzzles visually.

---

## Puzzle Editor

https://johanneinar.github.io/CrosswordSolver/editor.html

- Right-click cells to toggle them black
- Type letters to fill in answers
- Enter clues in the panel on the right
- Click **Copy to Clipboard** — paste the JSON directly into the `PUZZLES` array in `puzzles.js`

---

## Tech Stack

- React 18 (UMD via unpkg) + Babel Standalone — no build step
- Google Fonts: Playfair Display, Libre Baskerville
- `localStorage` for stats and solved state
- GitHub Pages for hosting
