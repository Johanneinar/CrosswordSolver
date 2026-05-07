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
];
