// 90s Nostalgia — three 5×5 mini puzzles.
// Format mirrors puzzles-mini.js: solution is a 5×5 array (null = black cell),
// clues split into across and down with { number, row, col, len, clue }.
// Black cells at the standard mini positions: (1,1), (1,3), (3,1), (3,3).
window.PACK_NOSTALGIA_90S = {
  id: 'nostalgia-90s',
  title: '90s Nostalgia',
  description: 'Test your memory of the decade that gave us dial-up.',
  emoji: '📼',
  color: '#7c3aed',
  puzzles: [
    {
      // Theme: Dial-Up Era — DENIM/ASKED/SWARM × DIALS/NOKIA/MODEM
      size: 'mini',
      solution: [
        ['D','E','N','I','M'],
        ['I',null,'O',null,'O'],
        ['A','S','K','E','D'],
        ['L',null,'I',null,'E'],
        ['S','W','A','R','M'],
      ],
      clues: {
        across: [
          { number:1, row:0, col:0, len:5, clue:"'90s fabric, often acid-washed" },
          { number:4, row:2, col:0, len:5, clue:'Posed a question' },
          { number:5, row:4, col:0, len:5, clue:'Mosh-pit motion' },
        ],
        down: [
          { number:1, row:0, col:0, len:5, clue:'Spins, like a rotary phone' },
          { number:2, row:0, col:2, len:5, clue:"Brand whose 6110 brought us Snake" },
          { number:3, row:0, col:4, len:5, clue:'Box that screeched its way onto the internet' },
        ],
      },
    },
    {
      // Theme: Pop Charts — SHOOT/INSET/EASEL × SPICE/OASIS/TOTAL
      size: 'mini',
      solution: [
        ['S','H','O','O','T'],
        ['P',null,'A',null,'O'],
        ['I','N','S','E','T'],
        ['C',null,'I',null,'A'],
        ['E','A','S','E','L'],
      ],
      clues: {
        across: [
          { number:1, row:0, col:0, len:5, clue:"Basketball verb, or 'darn!'" },
          { number:4, row:2, col:0, len:5, clue:'Smaller picture-in-picture' },
          { number:5, row:4, col:0, len:5, clue:"Painter's tripod" },
        ],
        down: [
          { number:1, row:0, col:0, len:5, clue:'Group of five: Sporty, Scary, Posh, Ginger, Baby' },
          { number:2, row:0, col:2, len:5, clue:"Gallagher brothers' Britpop band" },
          { number:3, row:0, col:4, len:5, clue:'Sum, or absolute' },
        ],
      },
    },
    {
      // Theme: Mall Crawl — PAGER/STEAM/EWERS × PASTE/GEESE/RAMPS
      size: 'mini',
      solution: [
        ['P','A','G','E','R'],
        ['A',null,'E',null,'A'],
        ['S','T','E','A','M'],
        ['T',null,'S',null,'P'],
        ['E','W','E','R','S'],
      ],
      clues: {
        across: [
          { number:1, row:0, col:0, len:5, clue:'Belt-clipped buzzer of yore' },
          { number:4, row:2, col:0, len:5, clue:'Rises off a fresh soft pretzel' },
          { number:5, row:4, col:0, len:5, clue:'Decorative water pitchers' },
        ],
        down: [
          { number:1, row:0, col:0, len:5, clue:'Cut and ___' },
          { number:2, row:0, col:2, len:5, clue:'V-formation honkers' },
          { number:3, row:0, col:4, len:5, clue:'Skate-park half-pipes' },
        ],
      },
    },
  ],
};
