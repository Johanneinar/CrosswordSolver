// Lightweight registry of available themed packs. Loaded by index.html (to
// render pack cards) and pack.html (to look up which file/global to load
// from a ?id= query parameter). Full puzzle data lives in packs/<id>.js.
window.PACK_REGISTRY = [
  {
    id: 'nostalgia-90s',
    title: '90s Nostalgia',
    description: 'Test your memory of the decade that gave us dial-up.',
    emoji: '📼',
    color: '#7c3aed',
    puzzleCount: 3,
    file: 'packs/nostalgia-90s.js',
    global: 'PACK_NOSTALGIA_90S',
  },
  {
    id: 'animated-classics',
    title: 'Animated Classics',
    description: 'From hand-drawn fairy tales to Pixar masterpieces.',
    emoji: '🎬',
    color: '#f59e0b',
    puzzleCount: 7,
    file: 'packs/animated-classics.js',
    global: 'PACK_ANIMATED_CLASSICS',
  },
  {
    id: 'pop-2000s',
    title: '2000s Pop',
    description: 'The decade of TRL, ringtones, and pop royalty.',
    emoji: '🎤',
    color: '#ec4899',
    puzzleCount: 7,
    file: 'packs/pop-2000s.js',
    global: 'PACK_POP_2000S',
  },
];
