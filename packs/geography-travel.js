// Geography & Travel — five 5×5 minis spanning five regions: Europe, Asia,
// Africa, the Americas, and Oceania (plus a globe-spanning travel finale).
// Clues lean on capitals, landmarks, geographic features, and travel touchstones.
window.PACK_GEOGRAPHY_TRAVEL = {
  id: 'geography-travel',
  title: 'Geography & Travel',
  description: 'Capitals, landmarks, and faraway places.',
  emoji: '🌍',
  color: '#0d9488',
  puzzles: [
    {
      // PARIS / ITALY / ESSAY  ×  PRIDE / ROADS / SHYLY
      size: 'mini',
      solution: [
        ['P','A','R','I','S'],
        ['R',null,'O',null,'H'],
        ['I','T','A','L','Y'],
        ['D',null,'D',null,'L'],
        ['E','S','S','A','Y'],
      ],
      clues: {
        across: [
          { number:1, row:0, col:0, len:5, clue:"City of Light, home to the Eiffel Tower" },
          { number:4, row:2, col:0, len:5, clue:"Boot-shaped Mediterranean nation" },
          { number:5, row:4, col:0, len:5, clue:"Form perfected by Montaigne, the original travel writer" },
        ],
        down: [
          { number:1, row:0, col:0, len:5, clue:"What Bastille Day stirs in every Frenchman" },
          { number:2, row:0, col:2, len:5, clue:"All these famously lead to Rome" },
          { number:3, row:0, col:4, len:5, clue:"How a tourist tends to first attempt 'bonjour'" },
        ],
      },
    },
    {
      // TOKYO / NEPAL / REACT  ×  TENOR / KAPPA / OWLET
      size: 'mini',
      solution: [
        ['T','O','K','Y','O'],
        ['E',null,'A',null,'W'],
        ['N','E','P','A','L'],
        ['O',null,'P',null,'E'],
        ['R','E','A','C','T'],
      ],
      clues: {
        across: [
          { number:1, row:0, col:0, len:5, clue:"Japanese capital with the world's busiest train stations" },
          { number:4, row:2, col:0, len:5, clue:"Himalayan country home to eight of Earth's tallest peaks" },
          { number:5, row:4, col:0, len:5, clue:"What followers do to your first ramen-shop photo" },
        ],
        down: [
          { number:1, row:0, col:0, len:5, clue:"Pavarotti's voice type, fitting in Verona's arena" },
          { number:2, row:0, col:2, len:5, clue:"Mythical Japanese water sprite said to live in rivers" },
          { number:3, row:0, col:4, len:5, clue:"Young owl, the kind featured in some Tokyo cafés" },
        ],
      },
    },
    {
      // EGYPT / GHANA / RANCH  ×  EAGER / YEARN / TEACH
      size: 'mini',
      solution: [
        ['E','G','Y','P','T'],
        ['A',null,'E',null,'E'],
        ['G','H','A','N','A'],
        ['E',null,'R',null,'C'],
        ['R','A','N','C','H'],
      ],
      clues: {
        across: [
          { number:1, row:0, col:0, len:5, clue:"Pharaohs' homeland, carved with pyramids" },
          { number:4, row:2, col:0, len:5, clue:"West African nation whose capital is Accra" },
          { number:5, row:4, col:0, len:5, clue:"Sprawling cattle property — also a salad-dressing style" },
        ],
        down: [
          { number:1, row:0, col:0, len:5, clue:"How a first-timer feels at dawn on safari" },
          { number:2, row:0, col:2, len:5, clue:"Long for, as for distant shores" },
          { number:3, row:0, col:4, len:5, clue:"What a Maasai guide does between Big Five sightings" },
        ],
      },
    },
    {
      // CHILE / DELTA / TROVE  ×  CADET / IGLOO / ELATE
      size: 'mini',
      solution: [
        ['C','H','I','L','E'],
        ['A',null,'G',null,'L'],
        ['D','E','L','T','A'],
        ['E',null,'O',null,'T'],
        ['T','R','O','V','E'],
      ],
      clues: {
        across: [
          { number:1, row:0, col:0, len:5, clue:"Long, narrow country hugging South America's Pacific coast" },
          { number:4, row:2, col:0, len:5, clue:"Triangular river mouth — the Mississippi's is famous" },
          { number:5, row:4, col:0, len:5, clue:"Hidden stash of treasures inside a Mayan ruin" },
        ],
        down: [
          { number:1, row:0, col:0, len:5, clue:"Junior trainee aboard a navy vessel" },
          { number:2, row:0, col:2, len:5, clue:"Inuit dome built from blocks of snow" },
          { number:3, row:0, col:4, len:5, clue:"What summiting Aconcagua does to a climber" },
        ],
      },
    },
    {
      // SAMOA / ATLAS / ENSUE  ×  SCALE / MILES / AISLE
      size: 'mini',
      solution: [
        ['S','A','M','O','A'],
        ['C',null,'I',null,'I'],
        ['A','T','L','A','S'],
        ['L',null,'E',null,'L'],
        ['E','N','S','U','E'],
      ],
      clues: {
        across: [
          { number:1, row:0, col:0, len:5, clue:"Polynesian island nation just west of the dateline" },
          { number:4, row:2, col:0, len:5, clue:"Bound book of maps every old-school traveler carried" },
          { number:5, row:4, col:0, len:5, clue:"Follow on, as delays do after a missed connection" },
        ],
        down: [
          { number:1, row:0, col:0, len:5, clue:"Ratio printed on a map's legend, like 1:50,000" },
          { number:2, row:0, col:2, len:5, clue:"Distance unit racked up by frequent fliers" },
          { number:3, row:0, col:4, len:5, clue:"Plane-seat preference for tall passengers" },
        ],
      },
    },
  ],
};
