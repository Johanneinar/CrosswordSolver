(function () {
  'use strict';

  function loadStats(statsKey) {
    try {
      return JSON.parse(localStorage.getItem(statsKey)) ||
        { solvedPuzzles: {}, bestTime: null };
    } catch (e) {
      return { solvedPuzzles: {}, bestTime: null };
    }
  }

  function formatTime(seconds) {
    var m = Math.floor(seconds / 60);
    var s = seconds % 60;
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  function sizeLabel(size) {
    if (size === 'mini') return 'Mini · 5×5';
    if (size === 'midi') return 'Midi · 7×7';
    if (size === 'maxi') return 'Maxi · 15×15';
    return size || '';
  }

  window.renderPuzzleList = function (opts) {
    var container = opts.container;
    container.innerHTML = '';

    if (opts.accentColor) {
      document.body.style.setProperty('--pack-accent', opts.accentColor);
    }

    var main = document.createElement('main');
    main.className = 'pack-shell';

    var header = document.createElement('header');
    header.className = 'pack-header';

    var eyebrow = document.createElement('div');
    eyebrow.className = 'pack-eyebrow';
    var a = document.createElement('a');
    a.href = opts.eyebrowHref || 'index.html';
    a.textContent = opts.eyebrowText || '← Back';
    eyebrow.appendChild(a);
    header.appendChild(eyebrow);

    if (opts.emoji) {
      var emoji = document.createElement('div');
      emoji.className = 'pack-emoji';
      emoji.textContent = opts.emoji;
      emoji.setAttribute('aria-hidden', 'true');
      header.appendChild(emoji);
    }

    var title = document.createElement('h1');
    title.className = 'pack-title';
    title.textContent = opts.title || '';
    header.appendChild(title);

    if (opts.description) {
      var desc = document.createElement('p');
      desc.className = 'pack-desc';
      desc.textContent = opts.description;
      header.appendChild(desc);
    }

    var stats = loadStats(opts.statsKey);
    var solved = stats.solvedPuzzles || {};
    var solvedCount = Object.keys(solved).length;

    var progress = document.createElement('div');
    progress.className = 'pack-progress';
    progress.textContent = solvedCount + ' / ' + opts.puzzles.length + ' solved';
    header.appendChild(progress);

    var metaItems = (opts.metaItems || []).slice();
    if (stats.bestTime !== null && stats.bestTime !== undefined) {
      metaItems.push('Your best: ' + formatTime(stats.bestTime));
    }
    if (metaItems.length > 0) {
      var strip = document.createElement('div');
      strip.className = 'pack-meta-strip';
      strip.textContent = metaItems.join(' · ');
      header.appendChild(strip);
    }

    main.appendChild(header);

    var showSize = opts.showSizeOnRows !== false;
    var list = document.createElement('div');
    list.className = 'puzzle-list';
    opts.puzzles.forEach(function (puzzle, i) {
      var link = document.createElement('a');
      link.href = opts.hrefForPuzzle(i);
      link.className = 'puzzle-row';

      var num = document.createElement('div');
      num.className = 'puzzle-row-num';
      num.textContent = String(i + 1);
      link.appendChild(num);

      var body = document.createElement('div');
      body.className = 'puzzle-row-body';
      var t = document.createElement('div');
      t.className = 'puzzle-row-title';
      t.textContent = 'Puzzle ' + (i + 1);
      body.appendChild(t);

      var time = solved[i];
      var size = puzzle.size || opts.defaultSize;
      var parts = [];
      if (showSize && size) parts.push(sizeLabel(size));
      if (time !== undefined) parts.push('solved in ' + formatTime(time));
      if (parts.length > 0) {
        var m = document.createElement('div');
        m.className = 'puzzle-row-meta';
        m.textContent = parts.join(' · ');
        body.appendChild(m);
      }
      link.appendChild(body);

      var status = document.createElement('div');
      status.className = 'puzzle-row-status' + (time !== undefined ? '' : ' unsolved');
      status.textContent = '✓';
      status.setAttribute('aria-label', time !== undefined ? 'Solved' : 'Not yet solved');
      link.appendChild(status);

      list.appendChild(link);
    });
    main.appendChild(list);
    container.appendChild(main);
  };
})();
