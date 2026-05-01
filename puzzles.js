const PUZZLES = [
  {
    solution: [
      ['T','E','M','P','O'],
      ['A',null,'O',null,'K'],
      ['L','A','S','E','R'],
      ['E',null,'S',null,'A'],
      ['S','T','Y','E','S'],
    ],
    clues: {
      across: [
        { number:1, row:0, col:0, len:5, clue:'Adagio or allegro, e.g.' },
        { number:4, row:2, col:0, len:5, clue:'Light show staple' },
        { number:5, row:4, col:0, len:5, clue:'Pig pens or eye irritants' },
      ],
      down: [
        { number:1, row:0, col:0, len:5, clue:"Scheherazade's stock in trade" },
        { number:2, row:0, col:2, len:5, clue:'Like a damp forest stone' },
        { number:3, row:0, col:4, len:5, clue:'Gumbo pods' },
      ],
    },
  },
  {
    solution: [
      ['S','N','A','R','E'],
      ['P',null,'G',null,'Q'],
      ['L','L','A','M','A'],
      ['I',null,'I',null,'U'],
      ['T','O','N','A','L'],
    ],
    clues: {
      across: [
        { number:1, row:0, col:0, len:5, clue:'Trap for small animals' },
        { number:4, row:2, col:0, len:5, clue:'South American pack animal' },
        { number:5, row:4, col:0, len:5, clue:'Like most music with a key signature' },
      ],
      down: [
        { number:1, row:0, col:0, len:5, clue:'Banana ___' },
        { number:2, row:0, col:2, len:5, clue:'Once more' },
        { number:3, row:0, col:4, len:5, clue:'On par' },
      ],
    },
  },
  {
    solution: [
      ['T','A','P','A','S'],
      ['H',null,'R',null,'E'],
      ['O','L','I','V','E'],
      ['R',null,'O',null,'D'],
      ['N','E','R','D','Y'],
    ],
    clues: {
      across: [
        { number:1, row:0, col:0, len:5, clue:'Spanish bar snacks' },
        { number:4, row:2, col:0, len:5, clue:'Martini garnish' },
        { number:5, row:4, col:0, len:5, clue:'Bookish, in modern slang' },
      ],
      down: [
        { number:1, row:0, col:0, len:5, clue:"Rose's defense" },
        { number:2, row:0, col:2, len:5, clue:'Earlier' },
        { number:3, row:0, col:4, len:5, clue:'Disreputable-looking' },
      ],
    },
  },
];

const EPOCH = new Date('2026-05-01');

function getDailyPuzzle() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Math.floor((today - EPOCH) / 86400000);
  const idx = ((days % PUZZLES.length) + PUZZLES.length) % PUZZLES.length;
  return { ...PUZZLES[idx], dayIndex: days };
}
