# Croosly

Croosly — Mini, Midi, and Maxi crosswords inspired by *The New York Times*. Free, no signup, no app.

**Play:** https://croosly.com/

---

## Three Sizes

- **Mini · 5×5** — 6 clues, ~2 min. Quick warm-up.
- **Midi · 7×7** — 8 clues, ~8 min. Bigger challenge with longer words.
- **Maxi · 15×15** — ~60-78 clues, ~25 min. Full NYT-style 15×15. (Seeded with 2 algorithmically-generated puzzles; expand by importing `.puz` files.)

The home page lets you pick which to play. Each size has its own numbered set of puzzles and tracks which you've solved plus your best time. Maxi-size puzzles can be added by importing `.puz` files via the editor.

---

## Features

- **Numbered puzzle set** — 10 hand-picked puzzles each in Mini and Midi (2 in Maxi); pick from the list view or the ‹ › arrows
- **Already solved** — if you've solved a puzzle, your time is shown when you return to it
- **Auto-advance** — cursor jumps to the next unsolved word, skipping cells already filled in
- **Check All / Check Word** — mark correct cells green and wrong cells red, for the full puzzle or just the active word
- **Reveal All / Reveal Word** — fill in answers for the full puzzle (with confirmation) or just the active word
- **Timer** — starts on your first keypress, freezes when you solve
- **Confetti** — brief celebration animation on solve
- **Stats** — tracks how many puzzles you've solved and your best time per size (📊 in the header)
- **Share button** — copies your solve time and a link to the clipboard after completing
- **Mobile keyboard** — QWERTY on-screen keyboard on small screens
- **Responsive layout** — clues beside the grid on desktop, below on mobile

---

## How to Play

- **Click** a white cell to select it; click again to toggle across/down
- **Type** to fill in letters — the cursor advances, skipping any cell already filled in; once the word is complete it jumps to the next unsolved word
- **Backspace** to erase
- **Arrow keys** to navigate
- **Click a clue** to jump to that word
- **Mobile**: tap the clue bar above the keyboard to switch between across/down at the selected cell

---

## Adding Puzzles

Mini puzzles live in [`puzzles-mini.js`](puzzles-mini.js); Midi puzzles in [`puzzles-midi.js`](puzzles-midi.js). Both arrays use the same format — only the grid size differs.

**Mini format (5×5)** — black cells fixed at (1,1), (1,3), (3,1), (3,3); 3 across + 3 down, all 5-letter words.

**Midi format (7×7)** — black cells fixed at every (odd_row, odd_col); 4 across + 4 down, all 7-letter words. 16 checked intersections to solve when constructing.

```js
{
  solution: [...],         // 2D array, null = black, letter = white
  clues: {
    across: [{ number, row, col, len, clue }, ...],
    down:   [{ number, row, col, len, clue }, ...],
  },
}
```

**Grid rules:**
- Every intersection must match: `solution[row][col]` is the same letter whether read across or down
- Across word boundaries form on rows 0, 2, 4 (Mini) or 0, 2, 4, 6 (Midi)
- Down word boundaries form on cols 0, 2, 4 (Mini) or 0, 2, 4, 6 (Midi)
- Use the **Puzzle Editor** to design new puzzles visually

---

## Puzzle Editor

https://croosly.com/editor.html

- Pick **Mini (5×5)**, **Midi (7×7)**, or **Maxi (15×15)** at the top
- Right-click cells to toggle them black
- Type letters to fill in answers
- Enter clues in the panel on the right
- Click **Copy to Clipboard** — paste the JSON directly into the matching `PUZZLES` array

### Importing `.puz` Files

The editor has an **Import .puz** button that parses standard `.puz` crossword files (the format used by Across Lite and most crossword software). Useful for adding 15×15 Maxi puzzles from public-domain sources.

1. Click **Import .puz** in the editor toolbar
2. Select a `.puz` file
3. The grid, letters, and clues are loaded automatically
4. Click **Copy to Clipboard** to get the JSON
5. Paste into `puzzles-maxi.js` (or `puzzles-mini.js` / `puzzles-midi.js` depending on size)

Public-domain `.puz` sources include:
- `crosswordnexus.com/puzzles` (some constructor archives are CC-licensed)
- Constructor websites that release Creative Commons puzzles
- `.puz` files in your own collection

---

## File Structure

```
index.html       # Selection screen — pick Mini, Midi, or Maxi
mini.html        # 5×5 list + game
midi.html        # 7×7 list + game
maxi.html        # 15×15 list + game
daily.html       # Redirect stub → maxi.html (keeps old bookmarks)
editor.html      # Puzzle editor (all sizes + .puz import)
puzzles-mini.js  # Mini puzzle library
puzzles-midi.js  # Midi puzzle library
puzzles-maxi.js  # Maxi puzzle library (expand via editor)
```

---

## Tech Stack

- React 18 (UMD via unpkg) + Babel Standalone — no build step
- Google Fonts: Playfair Display, Libre Baskerville
- `localStorage` for stats and solved state (separate keys per size)
- GitHub Pages for hosting
