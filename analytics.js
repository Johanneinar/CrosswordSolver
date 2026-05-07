(function () {
  'use strict';

  var SUPABASE_URL = 'https://ygwegkcngfzyrqffgglm.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_67BMZp8nXzEZTg_W_ysADw_lQqA6Qb3';
  var DEVICE_KEY = 'croosly-device-id';

  function getDeviceId() {
    try {
      var id = localStorage.getItem(DEVICE_KEY);
      if (!id) {
        id = (window.crypto && crypto.randomUUID)
          ? crypto.randomUUID()
          : 'd-' + Date.now() + '-' + Math.random().toString(36).slice(2);
        localStorage.setItem(DEVICE_KEY, id);
      }
      return id;
    } catch (e) {
      return null;
    }
  }

  window.croosly = window.croosly || {};
  window.croosly.logSolve = function (params) {
    try {
      var ctrl = new AbortController();
      var timeout = setTimeout(function () { ctrl.abort(); }, 3000);

      var body = {
        device_id: getDeviceId(),
        pack_id: params.packId || null,
        puzzle_size: params.puzzleSize || null,
        puzzle_index: params.puzzleIndex,
        time_seconds: params.timeSeconds,
        user_agent: (navigator.userAgent || '').slice(0, 200),
      };

      fetch(SUPABASE_URL + '/rest/v1/solve_events', {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': 'Bearer ' + SUPABASE_KEY,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify(body),
        signal: ctrl.signal,
        keepalive: true,
      }).catch(function (err) {
        console.error('[croosly] solve event failed:', err);
      }).finally(function () {
        clearTimeout(timeout);
      });
    } catch (e) {
      console.error('[croosly] logSolve threw:', e);
    }
  };
})();
