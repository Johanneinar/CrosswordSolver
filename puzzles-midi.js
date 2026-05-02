// 7×7 Midi crossword puzzles.
// Grid: black cells at every (odd_row, odd_col) intersection.
// Each puzzle has 4 across (rows 0,2,4,6) and 4 down (cols 0,2,4,6), all 7 letters.
// 16 checked intersections at every (even_row, even_col) position.

const PUZZLES = [
  {
    // MARXIST / CANTATA / BEEHIVE / ESSENCE  ×  MACABRE / RENDERS / ITALIAN / TRAPEZE
    solution: [
      ['M','A','R','X','I','S','T'],
      ['A',null,'E',null,'T',null,'R'],
      ['C','A','N','T','A','T','A'],
      ['A',null,'D',null,'L',null,'P'],
      ['B','E','E','H','I','V','E'],
      ['R',null,'R',null,'A',null,'Z'],
      ['E','S','S','E','N','C','E'],
    ],
    clues: {
      across: [
        { number:1, row:0, col:0, len:7, clue:"Follower of Das Kapital's author" },
        { number:5, row:2, col:0, len:7, clue:'Bach vocal composition' },
        { number:6, row:4, col:0, len:7, clue:'Honey producer\'s home, or retro hairdo' },
        { number:7, row:6, col:0, len:7, clue:'Core nature' },
      ],
      down: [
        { number:1, row:0, col:0, len:7, clue:'Gruesome and ghoulish' },
        { number:2, row:0, col:2, len:7, clue:'Makes or provides' },
        { number:3, row:0, col:4, len:7, clue:'Roman in language and culture' },
        { number:4, row:0, col:6, len:7, clue:'Circus swinger\'s apparatus' },
      ],
    },
  },
];

const EPOCH = new Date('2026-05-01');

function getPuzzleForDay(dayOffset) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Math.floor((today - EPOCH) / 86400000) + (dayOffset || 0);
  const idx = ((days % PUZZLES.length) + PUZZLES.length) % PUZZLES.length;
  return { ...PUZZLES[idx], dayIndex: days };
}
