// 15×15 daily crossword puzzles, New Yorker / NYT-style format.
// Black-cell pattern is irregular per puzzle (180° rotational symmetry recommended).
// Use the editor's "Import .puz" button to add puzzles from public-domain .puz files.
// PUZZLES = []  → daily.html will show a "no puzzles yet" message.

const PUZZLES = [];

const EPOCH = new Date('2026-05-01');

function getPuzzleForDay(dayOffset) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Math.floor((today - EPOCH) / 86400000) + (dayOffset || 0);
  if (PUZZLES.length === 0) return { empty: true, dayIndex: days };
  const idx = ((days % PUZZLES.length) + PUZZLES.length) % PUZZLES.length;
  return { ...PUZZLES[idx], dayIndex: days };
}
