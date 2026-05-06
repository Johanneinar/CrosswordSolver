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
  {
    solution: [
      ['P','A','C','K','I','N','G'],
      ['O',null,'L',null,'M',null,'O'],
      ['S','T','O','R','M','E','D'],
      ['S',null,'T',null,'E',null,'D'],
      ['E','N','H','A','N','C','E'],
      ['S',null,'E',null,'S',null,'S'],
      ['S','Y','S','T','E','M','S'],
    ],
    clues: {
      across: [
        { number:1, row:0, col:0, len:7, clue:'What you do the night before a flight' },
        { number:5, row:2, col:0, len:7, clue:'Charged out angrily' },
        { number:6, row:4, col:0, len:7, clue:'Improve upon' },
        { number:7, row:6, col:0, len:7, clue:'Operating ___' },
      ],
      down: [
        { number:1, row:0, col:0, len:7, clue:"Have firmly in one's grip" },
        { number:2, row:0, col:2, len:7, clue:'Closet contents' },
        { number:3, row:0, col:4, len:7, clue:'Vast and then some' },
        { number:4, row:0, col:6, len:7, clue:'Aphrodite or Athena' },
      ],
    },
  },
  {
    solution: [
      ['M','U','S','E','U','M','S'],
      ['O',null,'T',null,'N',null,'O'],
      ['T','E','R','R','I','E','R'],
      ['H',null,'I',null,'C',null,'C'],
      ['E','X','P','L','O','D','E'],
      ['R',null,'E',null,'R',null,'R'],
      ['S','T','R','I','N','G','Y'],
    ],
    clues: {
      across: [
        { number:1, row:0, col:0, len:7, clue:'The Met and the Louvre, e.g.' },
        { number:5, row:2, col:0, len:7, clue:'Yappy small dog breed' },
        { number:6, row:4, col:0, len:7, clue:'Pop, in a big way' },
        { number:7, row:6, col:0, len:7, clue:'Like overcooked celery' },
      ],
      down: [
        { number:1, row:0, col:0, len:7, clue:'Day-in-May celebrants' },
        { number:2, row:0, col:2, len:7, clue:'Striped game fish, casually' },
        { number:3, row:0, col:4, len:7, clue:'Mythical horned beast' },
        { number:4, row:0, col:6, len:7, clue:'Spell-casting craft' },
      ],
    },
  },
  {
    solution: [
      ['O','U','T','G','O','E','S'],
      ['B',null,'U',null,'P',null,'O'],
      ['S','U','R','R','E','A','L'],
      ['C',null,'N',null,'R',null,'V'],
      ['E','L','E','V','A','T','E'],
      ['N',null,'R',null,'T',null,'N'],
      ['E','A','S','I','E','S','T'],
    ],
    clues: {
      across: [
        { number:1, row:0, col:0, len:7, clue:'Surpasses in spending' },
        { number:5, row:2, col:0, len:7, clue:'Like a Dalí painting' },
        { number:6, row:4, col:0, len:7, clue:'Lift up' },
        { number:7, row:6, col:0, len:7, clue:'Simplest of all' },
      ],
      down: [
        { number:1, row:0, col:0, len:7, clue:'Past the line of decency' },
        { number:2, row:0, col:2, len:7, clue:'Pancake flippers' },
        { number:3, row:0, col:4, len:7, clue:'Run, as a machine' },
        { number:4, row:0, col:6, len:7, clue:'Able to pay debts' },
      ],
    },
  },
  {
    solution: [
      ['I','M','P','O','S','E','S'],
      ['N',null,'R',null,'E',null,'C'],
      ['C','H','A','P','T','E','R'],
      ['O',null,'I',null,'T',null,'O'],
      ['M','A','R','T','I','A','L'],
      ['E',null,'I',null,'N',null,'L'],
      ['S','L','E','I','G','H','S'],
    ],
    clues: {
      across: [
        { number:1, row:0, col:0, len:7, clue:'Levies, as taxes' },
        { number:5, row:2, col:0, len:7, clue:'Book section' },
        { number:6, row:4, col:0, len:7, clue:'___ arts' },
        { number:7, row:6, col:0, len:7, clue:"Santa's transports" },
      ],
      down: [
        { number:1, row:0, col:0, len:7, clue:'1040 inputs' },
        { number:2, row:0, col:2, len:7, clue:'Open grassland' },
        { number:3, row:0, col:4, len:7, clue:'Where a story takes place' },
        { number:4, row:0, col:6, len:7, clue:'Ancient documents, or what mice do' },
      ],
    },
  },
  {
    solution: [
      ['S','U','S','T','A','I','N'],
      ['T',null,'M',null,'T',null,'U'],
      ['R','O','O','S','T','E','R'],
      ['I',null,'K',null,'R',null,'S'],
      ['P','R','I','V','A','T','E'],
      ['E',null,'N',null,'C',null,'R'],
      ['R','I','G','H','T','L','Y'],
    ],
    clues: {
      across: [
        { number:1, row:0, col:0, len:7, clue:'Keep going' },
        { number:5, row:2, col:0, len:7, clue:'Cock-a-doodle-doer' },
        { number:6, row:4, col:0, len:7, clue:'Not for public eyes' },
        { number:7, row:6, col:0, len:7, clue:'Justly' },
      ],
      down: [
        { number:1, row:0, col:0, len:7, clue:'Bass with bands' },
        { number:2, row:0, col:2, len:7, clue:'Smoldering' },
        { number:3, row:0, col:4, len:7, clue:'Pull in, as customers' },
        { number:4, row:0, col:6, len:7, clue:'Where the toddlers nap' },
      ],
    },
  },
  {
    solution: [
      ['E','M','P','I','R','E','S'],
      ['N',null,'R',null,'E',null,'C'],
      ['T','R','A','I','N','E','R'],
      ['I',null,'Y',null,'T',null,'O'],
      ['T','R','I','V','I','A','L'],
      ['L',null,'N',null,'N',null,'L'],
      ['E','N','G','A','G','E','S'],
    ],
    clues: {
      across: [
        { number:1, row:0, col:0, len:7, clue:'Roman or British, historically' },
        { number:5, row:2, col:0, len:7, clue:'Gym helper' },
        { number:6, row:4, col:0, len:7, clue:'Pub-quiz adjective' },
        { number:7, row:6, col:0, len:7, clue:'Hires, or proposes to' },
      ],
      down: [
        { number:1, row:0, col:0, len:7, clue:'Give the right to' },
        { number:2, row:0, col:2, len:7, clue:'What a mantis is doing, by name' },
        { number:3, row:0, col:4, len:7, clue:"A landlord's verb" },
        { number:4, row:0, col:6, len:7, clue:'Lengthy unrolled documents' },
      ],
    },
  },
  {
    solution: [
      ['I','N','S','U','R','E','D'],
      ['N',null,'A',null,'E',null,'R'],
      ['C','O','L','L','E','G','E'],
      ['L',null,'V',null,'L',null,'S'],
      ['I','T','A','L','I','C','S'],
      ['N',null,'G',null,'N',null,'E'],
      ['E','M','E','R','G','E','D'],
    ],
    clues: {
      across: [
        { number:1, row:0, col:0, len:7, clue:'Covered, in case of accident' },
        { number:5, row:2, col:0, len:7, clue:'Higher-ed institution' },
        { number:6, row:4, col:0, len:7, clue:'Slanted text' },
        { number:7, row:6, col:0, len:7, clue:'Came forth from hiding' },
      ],
      down: [
        { number:1, row:0, col:0, len:7, clue:'Slope, or be inclined' },
        { number:2, row:0, col:2, len:7, clue:'Rescue from a wreck' },
        { number:3, row:0, col:4, len:7, clue:"What you're doing after a punch" },
        { number:4, row:0, col:6, len:7, clue:'Wearing clothes, or topped with vinaigrette' },
      ],
    },
  },
  {
    solution: [
      ['S','T','Y','L','I','S','H'],
      ['P',null,'E',null,'N',null,'A'],
      ['O','V','A','T','I','O','N'],
      ['N',null,'R',null,'T',null,'G'],
      ['G','E','N','U','I','N','E'],
      ['E',null,'E',null,'A',null,'R'],
      ['S','A','D','D','L','E','S'],
    ],
    clues: {
      across: [
        { number:1, row:0, col:0, len:7, clue:'Fashionable' },
        { number:5, row:2, col:0, len:7, clue:'Standing applause' },
        { number:6, row:4, col:0, len:7, clue:'The real McCoy' },
        { number:7, row:6, col:0, len:7, clue:'Horse seats' },
      ],
      down: [
        { number:1, row:0, col:0, len:7, clue:'Bath accessories' },
        { number:2, row:0, col:2, len:7, clue:'Longed deeply' },
        { number:3, row:0, col:4, len:7, clue:'First, alphabetically' },
        { number:4, row:0, col:6, len:7, clue:'Closet items' },
      ],
    },
  },
  {
    solution: [
      ['S','E','A','G','U','L','L'],
      ['P',null,'C',null,'P',null,'E'],
      ['O','C','T','A','G','O','N'],
      ['N',null,'R',null,'R',null,'I'],
      ['G','R','E','N','A','D','E'],
      ['E',null,'S',null,'D',null,'N'],
      ['S','U','S','P','E','C','T'],
    ],
    clues: {
      across: [
        { number:1, row:0, col:0, len:7, clue:'Beach scavenger' },
        { number:5, row:2, col:0, len:7, clue:'Stop sign shape' },
        { number:6, row:4, col:0, len:7, clue:'Hand-thrown explosive' },
        { number:7, row:6, col:0, len:7, clue:'Whom the detective interviews' },
      ],
      down: [
        { number:1, row:0, col:0, len:7, clue:'Soaks up bath water' },
        { number:2, row:0, col:2, len:7, clue:'Oscar nominee, possibly' },
        { number:3, row:0, col:4, len:7, clue:'Move to first class' },
        { number:4, row:0, col:6, len:7, clue:'Soft on the rules' },
      ],
    },
  },
];

function getPuzzleByIndex(i) {
  const idx = Math.max(0, Math.min(PUZZLES.length - 1, i | 0));
  return { ...PUZZLES[idx], puzzleIndex: idx };
}
