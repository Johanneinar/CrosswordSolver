// Shared crossword game runtime for mini.html, midi.html, and pack.html.
// No JSX / no Babel — uses React.createElement directly so the file can be
// loaded as a plain <script> and works under file:// in any browser.
(function () {
  'use strict';

  const { useState, useEffect, useMemo, useCallback, useRef } = React;
  const h = React.createElement;
  const Fragment = React.Fragment;

  // ── HELPERS ──────────────────────────────────────────────────

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  function getWordCells(direction, row, col, solution) {
    if (solution[row][col] === null) return [];
    const cells = [];
    if (direction === 'across') {
      let c = col;
      while (c > 0 && solution[row][c - 1] !== null) c--;
      while (c < solution[0].length && solution[row][c] !== null) { cells.push({ row, col: c }); c++; }
    } else {
      let r = row;
      while (r > 0 && solution[r - 1][col] !== null) r--;
      while (r < solution.length && solution[r][col] !== null) { cells.push({ row: r, col }); r++; }
    }
    return cells.length >= 2 ? cells : [];
  }

  function hasWord(direction, row, col, solution) {
    return getWordCells(direction, row, col, solution).length >= 2;
  }

  function getActiveClue(direction, row, col, clues, solution) {
    const wordCells = getWordCells(direction, row, col, solution);
    if (wordCells.length === 0) return null;
    const { row: r0, col: c0 } = wordCells[0];
    return clues[direction].find(c => c.row === r0 && c.col === c0) || null;
  }

  function getValidDirection(direction, row, col, solution) {
    if (hasWord(direction, row, col, solution)) return direction;
    const other = direction === 'across' ? 'down' : 'across';
    return hasWord(other, row, col, solution) ? other : direction;
  }

  function checkSolved(userGrid, solution) {
    for (let r = 0; r < solution.length; r++)
      for (let c = 0; c < solution[0].length; c++)
        if (solution[r][c] !== null && userGrid[r][c] !== solution[r][c]) return false;
    return true;
  }

  function getNextWordTarget(curDir, curRow, curCol, puzzle, userGrid) {
    const allWords = [
      ...puzzle.clues.across.map(c => ({ ...c, direction: 'across' })),
      ...puzzle.clues.down.map(c => ({ ...c, direction: 'down' })),
    ].sort((a, b) => a.number - b.number || (a.direction === 'across' ? -1 : 1));

    const wordCells = getWordCells(curDir, curRow, curCol, puzzle.solution);
    if (!wordCells.length) return null;
    const { row: r0, col: c0 } = wordCells[0];
    const curIdx = allWords.findIndex(w => w.direction === curDir && w.row === r0 && w.col === c0);
    if (curIdx === -1) return null;

    for (let i = 1; i <= allWords.length; i++) {
      const w = allWords[(curIdx + i) % allWords.length];
      const cells = getWordCells(w.direction, w.row, w.col, puzzle.solution);
      const empty = cells.find(c => userGrid[c.row][c.col] === '');
      if (empty) return { cell: empty, direction: w.direction };
    }
    return null;
  }

  function getPuzzleByIndex(puzzles, i) {
    const idx = Math.max(0, Math.min(puzzles.length - 1, i | 0));
    return { ...puzzles[idx], puzzleIndex: idx };
  }

  function defaultCellSize(size) {
    if (size <= 5) return 58;
    if (size <= 7) return 46;
    return 32;
  }

  // ── STATS (parameterized on statsKey) ───────────────────────

  function loadStats(statsKey) {
    try {
      return JSON.parse(localStorage.getItem(statsKey)) ||
        { solvedPuzzles: {}, bestTime: null };
    } catch {
      return { solvedPuzzles: {}, bestTime: null };
    }
  }

  function recordSolve(statsKey, puzzleIndex, timeSeconds) {
    const stats = loadStats(statsKey);
    if (!stats.solvedPuzzles) stats.solvedPuzzles = {};
    if (stats.solvedPuzzles[puzzleIndex] !== undefined) return;
    stats.solvedPuzzles[puzzleIndex] = timeSeconds;
    stats.bestTime = stats.bestTime === null ? timeSeconds : Math.min(stats.bestTime, timeSeconds);
    localStorage.setItem(statsKey, JSON.stringify(stats));
  }

  function getInitialPuzzleIndex(statsKey, count) {
    const stats = loadStats(statsKey);
    const solved = stats.solvedPuzzles || {};
    for (let i = 0; i < count; i++) if (solved[i] === undefined) return i;
    return 0;
  }

  // ── COMPONENTS ───────────────────────────────────────────────

  function Cell({ row, col, letter, isBlack, isSelected, isHighlighted, cellState, number, onClick }) {
    if (isBlack) return h('div', { className: 'cell black', 'aria-hidden': 'true' });
    let className = 'cell';
    if (isSelected) className += ' selected';
    else if (isHighlighted) className += ' highlighted';
    if (cellState === 'correct') className += ' correct';
    if (cellState === 'wrong') className += ' wrong';
    return h(
      'div',
      {
        className,
        onClick,
        role: 'button',
        tabIndex: 0,
        'aria-label': `${number ? number + ', ' : ''}row ${row + 1}, column ${col + 1}${letter ? ', letter ' + letter : ''}`,
      },
      number ? h('span', { className: 'cell-number' }, number) : null,
      letter
    );
  }

  function Grid({ solution, userGrid, selectedCell, highlightedCells, cellStates, cellNumbers, onCellClick, cellSize }) {
    const sz = solution.length;
    const cs = cellSize || 58;
    const responsive = `min(${cs}px, calc((100vw - 28px) / ${sz}))`;
    const gridStyle = {
      gridTemplateColumns: `repeat(${sz}, var(--cell-size))`,
      gridTemplateRows: `repeat(${sz}, var(--cell-size))`,
      '--cell-size': responsive,
    };
    const cells = [];
    solution.forEach((row, r) => {
      row.forEach((cell, c) => {
        cells.push(h(Cell, {
          key: `${r},${c}`,
          row: r,
          col: c,
          letter: userGrid[r][c],
          isBlack: cell === null,
          isSelected: !!(selectedCell && selectedCell.row === r && selectedCell.col === c),
          isHighlighted: highlightedCells.has(`${r},${c}`),
          cellState: cellStates[r][c],
          number: cellNumbers[`${r},${c}`],
          onClick: () => onCellClick(r, c),
        }));
      });
    });
    return h('div', { className: 'grid', style: gridStyle, 'aria-label': 'Crossword grid' }, cells);
  }

  function Header({ title, eyebrowText, eyebrowHref, timerSeconds, timerStarted, solved, alreadySolved, puzzleIndex, puzzleCount, onPrev, onNext, onStatsClick }) {
    const time = (timerStarted || solved || alreadySolved) ? formatTime(timerSeconds) : '0:00';
    return h('header', { className: 'header' },
      h('div', { className: 'header-eyebrow' },
        h('a', {
          href: eyebrowHref,
          style: { color: '#666', textDecoration: 'none', fontSize: '11px', letterSpacing: '0.1em' },
        }, eyebrowText)
      ),
      h('h1', { className: 'header-title' }, title),
      h('div', { className: 'header-nav' },
        h('button', { className: 'nav-btn', onClick: onPrev, disabled: puzzleIndex <= 0, 'aria-label': 'Previous puzzle' }, '‹'),
        h('span', { className: 'header-dateline' }, `Puzzle #${puzzleIndex + 1}`),
        h('button', { className: 'nav-btn', onClick: onNext, disabled: puzzleIndex >= puzzleCount - 1, 'aria-label': 'Next puzzle' }, '›')
      ),
      h('div', { className: 'header-meta' },
        h('span', { className: 'header-timer' }, time),
        h('button', { className: 'header-stats-btn', onClick: onStatsClick, 'aria-label': 'View stats' }, '📊')
      )
    );
  }

  function ClueList({ clues, activeClue, onClueClick }) {
    const isActive = (dir, entry) =>
      activeClue && activeClue.direction === dir && activeClue.number === entry.number;
    return h('div', { className: 'clues-section' },
      ['across', 'down'].map(dir =>
        h('div', { className: 'clue-group', key: dir },
          h('div', { className: 'clue-group-title' }, dir),
          clues[dir].map(entry =>
            h('div', {
              key: entry.number,
              className: `clue${isActive(dir, entry) ? ' active' : ''}`,
              onClick: () => onClueClick(dir, entry),
            },
              h('span', { className: 'clue-num' }, entry.number),
              h('span', null, entry.clue)
            )
          )
        )
      )
    );
  }

  function Controls({ onCheck, onCheckWord, onReveal, onRevealWord, onShare, solved, revealed, alreadySolved, shareConfirm }) {
    const done = solved || revealed || alreadySolved;
    return h('div', null,
      h('div', { className: 'controls' },
        h('button', { className: 'btn btn-primary', onClick: onCheck, disabled: done }, 'Check All'),
        h('button', { className: 'btn', onClick: onReveal, disabled: done }, 'Reveal All'),
        done ? h('button', { className: 'btn btn-share', onClick: onShare }, 'Share') : null
      ),
      h('div', { className: 'controls-secondary' },
        h('button', { className: 'btn-sm', onClick: onCheckWord, disabled: done }, 'Check Word'),
        h('button', { className: 'btn-sm', onClick: onRevealWord, disabled: done }, 'Reveal Word')
      ),
      shareConfirm ? h('div', { className: 'share-confirm' }, shareConfirm) : null
    );
  }

  function MobileKeyboard({ onKey }) {
    const rows = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
    // onPointerDown fires once per interaction for both touch and mouse,
    // avoiding the iOS touchstart+mousedown double-fire that was duplicating letters.
    const handle = (k) => (e) => { e.preventDefault(); onKey(k); };
    return h('div', { className: 'mobile-keyboard' },
      rows.map((row, i) =>
        h('div', { className: 'kb-row', key: row },
          ...row.split('').map(k =>
            h('button', { key: k, className: 'kb-key', onPointerDown: handle(k) }, k)
          ),
          i === rows.length - 1
            ? h('button', { className: 'kb-key kb-backspace', onPointerDown: handle('Backspace'), 'aria-label': 'Backspace' }, '⌫')
            : null
        )
      )
    );
  }

  function ActiveClueBar({ activeClue, onPrev, onNext, onToggle, extraClass }) {
    const cls = 'active-clue-bar' + (extraClass ? ' ' + extraClass : '') + (!activeClue ? ' empty' : '');
    const otherDir = activeClue ? (activeClue.direction === 'across' ? 'down' : 'across') : '';
    return h('div', { className: cls, role: 'status', 'aria-live': 'polite' },
      activeClue
        ? h(Fragment, null,
            h('button', { className: 'acb-nav', onClick: onPrev, 'aria-label': 'Previous clue' }, '‹'),
            h('button', {
              type: 'button',
              className: 'acb-content',
              onClick: onToggle,
              'aria-label': `Switch to ${otherDir} clue`,
            },
              h('span', { className: 'acb-tag' }, `${activeClue.number} ${activeClue.direction}`),
              h('span', { className: 'acb-text' }, activeClue.clue)
            ),
            h('button', { className: 'acb-nav', onClick: onNext, 'aria-label': 'Next clue' }, '›')
          )
        : h('span', { className: 'acb-text' }, 'Tap a square to start')
    );
  }

  function StatsModal({ statsKey, onClose, puzzleCount }) {
    const stats = loadStats(statsKey);
    const solvedCount = Object.keys(stats.solvedPuzzles || {}).length;
    return h('div', { className: 'dialog-backdrop', onClick: onClose },
      h('div', { className: 'dialog-card', onClick: e => e.stopPropagation() },
        h('div', { className: 'dialog-title' }, 'Your Stats'),
        h('div', { className: 'stats-grid' },
          h('div', { className: 'stat' },
            h('span', { className: 'stat-num' }, `${solvedCount}/${puzzleCount}`),
            h('span', { className: 'stat-label' }, 'Solved')
          ),
          h('div', { className: 'stat' },
            h('span', { className: 'stat-num' }, stats.bestTime !== null ? formatTime(stats.bestTime) : '—'),
            h('span', { className: 'stat-label' }, 'Best')
          )
        ),
        h('p', { className: 'stats-disclaimer' }, "Stats are stored in your browser. They won't sync across devices and may be cleared if you clear browsing data."),
        h('div', { className: 'dialog-buttons' },
          h('button', { className: 'btn btn-primary', onClick: onClose }, 'Done')
        )
      )
    );
  }

  function RevealDialog({ onConfirm, onCancel }) {
    return h('div', { className: 'dialog-backdrop', onClick: onCancel },
      h('div', { className: 'dialog-card', onClick: e => e.stopPropagation() },
        h('div', { className: 'dialog-title' }, 'Reveal Answers?'),
        h('div', { className: 'dialog-body' }, 'This will fill in all answers and cannot be undone.'),
        h('div', { className: 'dialog-buttons' },
          h('button', { className: 'btn', onClick: onCancel }, 'Cancel'),
          h('button', { className: 'btn btn-primary', onClick: onConfirm }, 'Reveal')
        )
      )
    );
  }

  function CompletionOverlay({ timerSeconds, visible, puzzleIndex }) {
    const [opacity, setOpacity] = useState(0);
    useEffect(() => {
      if (!visible) { setOpacity(0); return; }
      const s = setTimeout(() => setOpacity(1), 50);
      const hd = setTimeout(() => setOpacity(0), 4000);
      return () => { clearTimeout(s); clearTimeout(hd); };
    }, [visible]);
    if (!visible && opacity === 0) return null;
    return h('div', {
      className: 'completion-overlay',
      style: { opacity, transition: 'opacity 0.5s ease' },
    },
      h('div', { className: 'completion-title' }, 'Solved!'),
      h('div', { className: 'completion-time' }, formatTime(timerSeconds)),
      h('div', { className: 'completion-rule' }),
      h('div', { className: 'completion-sub' }, `Puzzle #${puzzleIndex + 1}`)
    );
  }

  function PuzzlePicker({ count, currentIndex, solvedSet, onPick }) {
    return h('div', { className: 'puzzle-picker', 'aria-label': 'Choose puzzle' },
      Array.from({ length: count }, (_, i) => {
        const cls = 'pp-chip'
          + (i === currentIndex ? ' active' : '')
          + (solvedSet.has(i) ? ' solved' : '');
        return h('button', {
          key: i,
          type: 'button',
          className: cls,
          onClick: () => onPick(i),
          'aria-current': i === currentIndex ? 'true' : undefined,
          'aria-label': `Puzzle ${i + 1}${solvedSet.has(i) ? ' (solved)' : ''}`,
        }, solvedSet.has(i) ? `✓${i + 1}` : `${i + 1}`);
      })
    );
  }

  function Confetti({ active }) {
    const pieces = useMemo(() => {
      if (!active) return [];
      const colors = ['#d4a843', '#1a1a1a', '#c8e6c9', '#dce8f5', '#f5f0e8', '#ffcdd2'];
      return Array.from({ length: 60 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: 1.5 + Math.random() * 2,
        delay: Math.random() * 0.8,
        size: 6 + Math.random() * 6,
      }));
    }, [active]);
    if (!active) return null;
    return h('div', { className: 'confetti-wrap' },
      pieces.map(p =>
        h('div', {
          key: p.id,
          className: 'confetti-piece',
          style: {
            left: `${p.left}%`,
            background: p.color,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          },
        })
      )
    );
  }

  // ── APP ──────────────────────────────────────────────────────

  function App({ config }) {
    const {
      puzzles,
      statsKey,
      title,
      eyebrowText,
      eyebrowHref,
      cellSize: cellSizeOverride,
      shareLabel,
      shareUrl,
      initialPuzzleIndex,
    } = config;

    const [puzzleIndex, setPuzzleIndex] = useState(() =>
      initialPuzzleIndex !== undefined && initialPuzzleIndex !== null
        ? Math.max(0, Math.min(puzzles.length - 1, initialPuzzleIndex | 0))
        : getInitialPuzzleIndex(statsKey, puzzles.length)
    );
    const puzzle = useMemo(() => getPuzzleByIndex(puzzles, puzzleIndex), [puzzleIndex, puzzles]);

    const cellSize = useMemo(() => {
      if (cellSizeOverride) return cellSizeOverride;
      return defaultCellSize(puzzle.solution.length);
    }, [puzzle, cellSizeOverride]);

    const cellNumbers = useMemo(() => {
      const map = {};
      [...puzzle.clues.across, ...puzzle.clues.down].forEach(({ number, row, col }) => {
        map[`${row},${col}`] = number;
      });
      return map;
    }, [puzzle]);

    const emptyGrid = () => puzzle.solution.map(row => row.map(() => ''));
    const size = puzzle.solution.length;
    const emptyStates = () => Array(size).fill(null).map(() => Array(size).fill(null));

    const [userGrid, setUserGrid] = useState(emptyGrid);
    const [cellStates, setCellStates] = useState(emptyStates);
    const [selectedCell, setSelectedCell] = useState(null);
    const [direction, setDirection] = useState('across');
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [timerStarted, setTimerStarted] = useState(false);
    const [solved, setSolved] = useState(false);
    const [revealed, setRevealed] = useState(false);
    const [alreadySolved, setAlreadySolved] = useState(false);
    const [showRevealDialog, setShowRevealDialog] = useState(false);
    const [showStats, setShowStats] = useState(false);
    const [shareConfirm, setShareConfirm] = useState('');
    const [confetti, setConfetti] = useState(false);
    const kbCaptureRef = useRef(null);
    const focusKbCapture = useCallback(() => {
      const el = kbCaptureRef.current;
      if (el && document.activeElement !== el) {
        try { el.focus({ preventScroll: true }); } catch { el.focus(); }
      }
    }, []);

    // Reset state when puzzle changes
    useEffect(() => {
      setUserGrid(emptyGrid());
      setCellStates(emptyStates());
      setSelectedCell(null);
      setDirection('across');
      setTimerSeconds(0);
      setTimerStarted(false);
      setSolved(false);
      setRevealed(false);
      setAlreadySolved(false);
      setShareConfirm('');
      setConfetti(false);

      const stats = loadStats(statsKey);
      const savedTime = stats.solvedPuzzles && stats.solvedPuzzles[puzzle.puzzleIndex];
      if (savedTime !== undefined) {
        setAlreadySolved(true);
        setTimerSeconds(savedTime);
        const filledGrid = puzzle.solution.map(row => row.map(cell => cell === null ? '' : cell));
        setUserGrid(filledGrid);
        setCellStates(puzzle.solution.map(row => row.map(cell => cell !== null ? 'correct' : null)));
      }
    }, [puzzle.puzzleIndex]);

    const handleKey = useCallback((key) => {
      if (!selectedCell || solved || revealed || alreadySolved) return;
      const { row, col } = selectedCell;

      if (key.length === 1 && /[a-zA-Z]/.test(key)) {
        if (!timerStarted) setTimerStarted(true);
        const letter = key.toUpperCase();
        const newGrid = userGrid.map(r => [...r]);
        newGrid[row][col] = letter;
        setUserGrid(newGrid);
        const newStates = cellStates.map(r => [...r]);
        newStates[row][col] = null;
        setCellStates(newStates);
        if (checkSolved(newGrid, puzzle.solution)) {
          setSolved(true);
          setConfetti(true);
          setTimeout(() => setConfetti(false), 3000);
          recordSolve(statsKey, puzzle.puzzleIndex, timerSeconds);
        }
        const wordCells = getWordCells(direction, row, col, puzzle.solution);
        const idx = wordCells.findIndex(c => c.row === row && c.col === col);
        let target = null;
        if (idx !== -1) {
          for (let i = idx + 1; i < wordCells.length; i++) {
            const c = wordCells[i];
            if (newGrid[c.row][c.col] === '') { target = c; break; }
          }
          if (!target) {
            for (let i = 0; i < idx; i++) {
              const c = wordCells[i];
              if (newGrid[c.row][c.col] === '') { target = c; break; }
            }
          }
        }
        if (target) {
          setSelectedCell(target);
        } else {
          const next = getNextWordTarget(direction, row, col, puzzle, newGrid);
          if (next) { setSelectedCell(next.cell); setDirection(next.direction); }
        }

      } else if (key === 'Backspace') {
        if (!timerStarted) setTimerStarted(true);
        if (userGrid[row][col] !== '') {
          const newGrid = userGrid.map(r => [...r]);
          newGrid[row][col] = '';
          setUserGrid(newGrid);
          const newStates = cellStates.map(r => [...r]);
          newStates[row][col] = null;
          setCellStates(newStates);
        } else {
          const wordCells = getWordCells(direction, row, col, puzzle.solution);
          const idx = wordCells.findIndex(c => c.row === row && c.col === col);
          if (idx > 0) {
            const prev = wordCells[idx - 1];
            setSelectedCell(prev);
            const newGrid = userGrid.map(r => [...r]);
            newGrid[prev.row][prev.col] = '';
            setUserGrid(newGrid);
          }
        }
      }
    }, [selectedCell, direction, userGrid, cellStates, timerStarted, solved, revealed, alreadySolved, timerSeconds, puzzle, statsKey]);

    // Physical keyboard
    useEffect(() => {
      function onKeyDown(e) {
        if (!selectedCell || solved || revealed || alreadySolved) return;
        const { row, col } = selectedCell;
        if ((e.key.length === 1 && /[a-zA-Z]/.test(e.key)) || e.key === 'Backspace') {
          e.preventDefault();
          handleKey(e.key);
        } else if (e.key.startsWith('Arrow')) {
          e.preventDefault();
          if (!timerStarted) setTimerStarted(true);
          let nr = row, nc = col, newDir = direction;
          if (e.key === 'ArrowRight') { nc = col + 1; newDir = 'across'; }
          else if (e.key === 'ArrowLeft') { nc = col - 1; newDir = 'across'; }
          else if (e.key === 'ArrowDown') { nr = row + 1; newDir = 'down'; }
          else if (e.key === 'ArrowUp') { nr = row - 1; newDir = 'down'; }
          const _sz = puzzle.solution.length;
          if (nr >= 0 && nr < _sz && nc >= 0 && nc < _sz && puzzle.solution[nr][nc] !== null) {
            setSelectedCell({ row: nr, col: nc });
            setDirection(getValidDirection(newDir, nr, nc, puzzle.solution));
          }
        }
      }
      window.addEventListener('keydown', onKeyDown);
      return () => window.removeEventListener('keydown', onKeyDown);
    }, [selectedCell, direction, timerStarted, solved, revealed, alreadySolved, handleKey, puzzle]);

    // Timer
    useEffect(() => {
      if (!timerStarted || solved || revealed || alreadySolved) return;
      const id = setInterval(() => setTimerSeconds(s => s + 1), 1000);
      return () => clearInterval(id);
    }, [timerStarted, solved, revealed, alreadySolved]);

    const highlightedCells = useMemo(() => {
      if (!selectedCell) return new Set();
      const cells = getWordCells(direction, selectedCell.row, selectedCell.col, puzzle.solution);
      return new Set(cells.map(c => `${c.row},${c.col}`));
    }, [selectedCell, direction, puzzle]);

    const activeClue = useMemo(() => {
      if (!selectedCell) return null;
      const clue = getActiveClue(direction, selectedCell.row, selectedCell.col, puzzle.clues, puzzle.solution);
      return clue ? { ...clue, direction } : null;
    }, [selectedCell, direction, puzzle]);

    function handleCellClick(row, col) {
      if (puzzle.solution[row][col] === null) return;
      if (alreadySolved) return;
      if (selectedCell && selectedCell.row === row && selectedCell.col === col) {
        const toggled = direction === 'across' ? 'down' : 'across';
        setDirection(getValidDirection(toggled, row, col, puzzle.solution));
      } else {
        setDirection(getValidDirection(direction, row, col, puzzle.solution));
        setSelectedCell({ row, col });
      }
      focusKbCapture();
    }

    function toggleDirection() {
      if (!selectedCell) return;
      const toggled = direction === 'across' ? 'down' : 'across';
      setDirection(getValidDirection(toggled, selectedCell.row, selectedCell.col, puzzle.solution));
      focusKbCapture();
    }

    function jumpToWord(dir, entry) {
      setDirection(dir);
      setSelectedCell({ row: entry.row, col: entry.col });
      focusKbCapture();
    }

    function adjacentClue(delta) {
      const all = [
        ...puzzle.clues.across.map(c => ({ ...c, direction: 'across' })),
        ...puzzle.clues.down.map(c => ({ ...c, direction: 'down' })),
      ];
      if (!all.length) return;
      const cur = activeClue;
      let idx = 0;
      if (cur) {
        idx = all.findIndex(w => w.direction === cur.direction && w.number === cur.number);
        if (idx === -1) idx = 0;
        idx = (idx + delta + all.length) % all.length;
      }
      const target = all[idx];
      jumpToWord(target.direction, target);
    }

    function handleCheck() {
      const newStates = puzzle.solution.map((row, r) =>
        row.map((cell, c) => {
          if (cell === null) return null;
          if (userGrid[r][c] === '') return null;
          return userGrid[r][c] === cell ? 'correct' : 'wrong';
        })
      );
      setCellStates(newStates);
    }

    function handleCheckWord() {
      if (!selectedCell) return;
      const wordCells = getWordCells(direction, selectedCell.row, selectedCell.col, puzzle.solution);
      const newStates = cellStates.map(r => [...r]);
      wordCells.forEach(({ row, col }) => {
        if (userGrid[row][col] !== '')
          newStates[row][col] = userGrid[row][col] === puzzle.solution[row][col] ? 'correct' : 'wrong';
      });
      setCellStates(newStates);
    }

    function handleRevealWord() {
      if (!selectedCell) return;
      const wordCells = getWordCells(direction, selectedCell.row, selectedCell.col, puzzle.solution);
      const newGrid = userGrid.map(r => [...r]);
      const newStates = cellStates.map(r => [...r]);
      wordCells.forEach(({ row, col }) => {
        newGrid[row][col] = puzzle.solution[row][col];
        newStates[row][col] = 'correct';
      });
      setUserGrid(newGrid);
      setCellStates(newStates);
      if (checkSolved(newGrid, puzzle.solution)) {
        setSolved(true);
        setConfetti(true);
        setTimeout(() => setConfetti(false), 3000);
        recordSolve(statsKey, puzzle.puzzleIndex, timerSeconds);
      }
    }

    function handleReveal() {
      const fullGrid = puzzle.solution.map(row => row.map(cell => cell === null ? '' : cell));
      setUserGrid(fullGrid);
      setCellStates(puzzle.solution.map(row => row.map(cell => cell !== null ? 'correct' : null)));
      setRevealed(true);
      setShowRevealDialog(false);
    }

    function handleShare() {
      const time = formatTime(timerSeconds);
      const text = `Croosly ${shareLabel} #${puzzle.puzzleIndex + 1}\nSolved in ${time} 🎉\n\n${shareUrl}`;
      navigator.clipboard.writeText(text).then(() => {
        setShareConfirm('Copied to clipboard!');
        setTimeout(() => setShareConfirm(''), 3000);
      });
    }

    return h('main', null,
      h('input', {
        ref: kbCaptureRef,
        className: 'kb-capture',
        type: 'text',
        readOnly: true,
        inputMode: 'none',
        autoCapitalize: 'none',
        autoCorrect: 'off',
        spellCheck: false,
        tabIndex: -1,
        'aria-hidden': 'true',
      }),
      h(Header, {
        title,
        eyebrowText,
        eyebrowHref,
        timerSeconds,
        timerStarted,
        solved,
        alreadySolved,
        puzzleIndex: puzzle.puzzleIndex,
        puzzleCount: puzzles.length,
        onPrev: () => setPuzzleIndex(i => Math.max(0, i - 1)),
        onNext: () => setPuzzleIndex(i => Math.min(puzzles.length - 1, i + 1)),
        onStatsClick: () => setShowStats(true),
      }),
      h(PuzzlePicker, {
        count: puzzles.length,
        currentIndex: puzzle.puzzleIndex,
        solvedSet: new Set(Object.keys(loadStats(statsKey).solvedPuzzles || {}).map(Number)),
        onPick: setPuzzleIndex,
      }),
      alreadySolved
        ? h('div', { className: 'solved-banner' },
            h('strong', null, 'Already solved!'),
            ` You completed this puzzle in ${formatTime(timerSeconds)}.`)
        : null,
      h(ActiveClueBar, {
        activeClue,
        onPrev: () => adjacentClue(-1),
        onNext: () => adjacentClue(1),
        onToggle: toggleDirection,
        extraClass: 'inline-only',
      }),
      h('div', { className: 'puzzle-layout' },
        h('div', { className: 'grid-section' },
          h('div', { className: 'grid-wrap' },
            h(Grid, {
              solution: puzzle.solution,
              userGrid,
              selectedCell,
              highlightedCells,
              cellStates,
              cellNumbers,
              onCellClick: handleCellClick,
              cellSize,
            }),
            h(CompletionOverlay, { timerSeconds, visible: solved, puzzleIndex: puzzle.puzzleIndex })
          ),
          h(Controls, {
            onCheck: handleCheck,
            onCheckWord: handleCheckWord,
            onReveal: () => setShowRevealDialog(true),
            onRevealWord: handleRevealWord,
            onShare: handleShare,
            solved,
            revealed,
            alreadySolved,
            shareConfirm,
          })
        ),
        h(ClueList, {
          clues: puzzle.clues,
          activeClue,
          onClueClick: jumpToWord,
        })
      ),
      h('div', { className: 'mobile-bottom' },
        h(ActiveClueBar, {
          activeClue,
          onPrev: () => adjacentClue(-1),
          onNext: () => adjacentClue(1),
          onToggle: toggleDirection,
        }),
        h(MobileKeyboard, { onKey: handleKey })
      ),
      showRevealDialog ? h(RevealDialog, { onConfirm: handleReveal, onCancel: () => setShowRevealDialog(false) }) : null,
      showStats ? h(StatsModal, { statsKey, onClose: () => setShowStats(false), puzzleCount: puzzles.length }) : null,
      h(Confetti, { active: confetti })
    );
  }

  // ── PUBLIC API ───────────────────────────────────────────────

  function mountCrosswordGame(config) {
    const rootId = config.rootId || 'root';
    const root = document.getElementById(rootId);
    if (!root) throw new Error(`mountCrosswordGame: no element with id "${rootId}"`);
    return ReactDOM.createRoot(root).render(h(App, { config }));
  }

  window.mountCrosswordGame = mountCrosswordGame;
})();
