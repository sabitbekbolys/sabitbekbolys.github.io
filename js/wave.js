/* ==========================================================================
   Live 2-D wave equation:  u_tt = c² Δu   (finite differences, leapfrog,
   first-order Mur absorbing boundaries), rendered as a 3-D wireframe
   surface in perspective on a plain <canvas>. No dependencies.

   Usage:  <canvas id="wave"></canvas>            — full hero surface
           <canvas id="wave" data-variant="banner"> — smaller page banner
   Move the pointer across the surface to disturb the membrane.
   ========================================================================== */

(function () {
  "use strict";

  var canvas = document.getElementById("wave");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  if (!ctx) return;

  var banner = canvas.dataset.variant === "banner";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- simulation state ---------------- */

  var N = banner ? 64 : 88;         // grid points per side
  var K = 0.19;                     // c²·Δt²/Δx²  (CFL: must be < 0.5)
  var DAMP = 0.9975;                // per-step energy loss
  var MUR = (Math.sqrt(K) - 1) / (Math.sqrt(K) + 1);

  var u0 = new Float32Array(N * N); // u at t-1
  var u1 = new Float32Array(N * N); // u at t
  var u2 = new Float32Array(N * N); // u at t+1

  function drop(ci, cj, amp, r) {
    var r2 = r * r;
    var i0 = Math.max(1, Math.floor(ci - r * 2)), i1e = Math.min(N - 2, Math.ceil(ci + r * 2));
    var j0 = Math.max(1, Math.floor(cj - r * 2)), j1e = Math.min(N - 2, Math.ceil(cj + r * 2));
    for (var i = i0; i <= i1e; i++) {
      for (var j = j0; j <= j1e; j++) {
        var d2 = (i - ci) * (i - ci) + (j - cj) * (j - cj);
        var g = amp * Math.exp(-d2 / r2);
        u1[i * N + j] += g;
        u0[i * N + j] += g;          // zero initial velocity
      }
    }
  }

  function step() {
    var i, j, idx;
    for (i = 1; i < N - 1; i++) {
      var row = i * N;
      for (j = 1; j < N - 1; j++) {
        idx = row + j;
        var lap = u1[idx - 1] + u1[idx + 1] + u1[idx - N] + u1[idx + N] - 4 * u1[idx];
        u2[idx] = (2 * u1[idx] - u0[idx] + K * lap) * DAMP;
      }
    }
    // first-order Mur absorbing edges (waves leave instead of bouncing)
    for (i = 1; i < N - 1; i++) {
      u2[i * N] = u1[i * N + 1] + MUR * (u2[i * N + 1] - u1[i * N]);
      u2[i * N + N - 1] = u1[i * N + N - 2] + MUR * (u2[i * N + N - 2] - u1[i * N + N - 1]);
      u2[i] = u1[N + i] + MUR * (u2[N + i] - u1[i]);
      u2[(N - 1) * N + i] = u1[(N - 2) * N + i] + MUR * (u2[(N - 2) * N + i] - u1[(N - 1) * N + i]);
    }
    var tmp = u0; u0 = u1; u1 = u2; u2 = tmp;
  }

  /* ---------------- projection ---------------- */

  var W = 0, H = 0, dpr = 1;
  var px = new Float32Array(N * N);
  var py = new Float32Array(N * N);

  var HEIGHT = banner ? 0.42 : 0.5;  // world height per unit of u
  var pointerX = 0, pointerY = 0;    // -1..1 parallax

  // Low "landscape" camera: eye slightly above the membrane looking toward
  // a high horizon, grid wider than the viewport so it spills past the edges.
  function project(t) {
    var yaw = -0.26 + Math.sin(t * 0.00005) * 0.07 + pointerX * 0.05;
    var cy = Math.cos(yaw), sy = Math.sin(yaw);
    var camH = (banner ? 0.78 : 0.95) + pointerY * 0.06;
    var D = banner ? 2.1 : 2.35;                 // camera distance to grid centre
    var SX = 2.6, SY = banner ? 1.6 : 1.55;      // world half-extents
    var f = Math.min(W * 0.75, H * 1.15);
    var cxs = W * 0.5;
    var horizon = H * (banner ? -0.15 : 0.10);
    var inv = 2 / (N - 1);

    for (var i = 0; i < N; i++) {
      var Y = (i * inv - 1) * SY;
      for (var j = 0; j < N; j++) {
        var X = (j * inv - 1) * SX;
        var Z = u1[i * N + j] * HEIGHT;
        var x1 = X * cy - Y * sy;
        var y1 = X * sy + Y * cy;
        var d = y1 + D;
        if (d < 0.2) d = 0.2;
        var s = f / d;
        var idx = i * N + j;
        px[idx] = cxs + x1 * s;
        py[idx] = horizon + (camH - Z) * s;
      }
    }
  }

  /* ---------------- drawing ---------------- */

  // teal → violet across depth
  function rowColor(k, alpha) {
    var r = Math.round(100 + (154 - 100) * k);
    var g = Math.round(227 + (140 - 227) * k);
    var b = Math.round(193 + (245 - 193) * k);
    return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
  }

  function draw() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.lineWidth = 1;
    ctx.globalCompositeOperation = "lighter";

    var i, j, idx;
    // lines along x (rows) — the main "sheet", far to near
    for (i = N - 1; i >= 0; i--) {
      var k = i / (N - 1);                 // 0 = near, 1 = far
      ctx.strokeStyle = rowColor(k, 0.08 + 0.34 * (1 - k));
      ctx.beginPath();
      idx = i * N;
      ctx.moveTo(px[idx], py[idx]);
      for (j = 1; j < N; j++) ctx.lineTo(px[idx + j], py[idx + j]);
      ctx.stroke();
    }
    // converging depth-lines
    for (j = 0; j < N; j += 4) {
      ctx.strokeStyle = "rgba(148,168,210,0.06)";
      ctx.beginPath();
      ctx.moveTo(px[j], py[j]);
      for (i = 1; i < N; i++) ctx.lineTo(px[i * N + j], py[i * N + j]);
      ctx.stroke();
    }
    ctx.globalCompositeOperation = "source-over";
  }

  /* ---------------- sizing ---------------- */

  function resize() {
    var rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = rect.width;
    H = rect.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
  }

  /* ---------------- pointer interaction ---------------- */

  var lastPX = -1, lastPY = -1, lastMove = 0, lastAuto = 0;

  function nearestCell(x, y) {
    var best = -1, bestD = 1e12;
    for (var i = 0; i < N; i += 2) {
      for (var j = 0; j < N; j += 2) {
        var idx = i * N + j;
        var dx = px[idx] - x, dy = py[idx] - y;
        var d = dx * dx + dy * dy;
        if (d < bestD) { bestD = d; best = idx; }
      }
    }
    if (bestD > 90 * 90) return -1;
    return best;
  }

  function onPointerMove(e) {
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left, y = e.clientY - rect.top;
    pointerX = (x / rect.width) * 2 - 1;
    pointerY = (y / rect.height) * 2 - 1;
    if (reduceMotion) return;

    var now = performance.now();
    var speed = 1;
    if (lastPX >= 0) {
      var dt = Math.max(now - lastMove, 1);
      speed = Math.min(Math.hypot(x - lastPX, y - lastPY) / dt, 3);
    }
    lastPX = x; lastPY = y; lastMove = now;

    var idx = nearestCell(x, y);
    if (idx >= 0) {
      drop((idx / N) | 0, idx % N, -0.28 * (0.4 + speed * 0.4), 2.2);
    }
  }

  function onPointerDown(e) {
    if (reduceMotion) return;
    var rect = canvas.getBoundingClientRect();
    var idx = nearestCell(e.clientX - rect.left, e.clientY - rect.top);
    if (idx >= 0) {
      drop((idx / N) | 0, idx % N, -1.4, 3.2);
      lastMove = performance.now();
    }
  }

  canvas.addEventListener("pointermove", onPointerMove, { passive: true });
  canvas.addEventListener("pointerdown", onPointerDown, { passive: true });

  /* ---------------- rain + main loop ---------------- */

  function randomDrop(amp) {
    var m = 10;
    drop(m + ((Math.random() * (N - 2 * m)) | 0),
         m + ((Math.random() * (N - 2 * m)) | 0),
         amp || (-0.8 - Math.random() * 1.2),
         2.6 + Math.random() * 1.8);
  }

  var running = true, rafId = 0;

  function frame(t) {
    if (!running) return;
    var now = performance.now();
    // ambient rain, held back while the visitor is playing
    if (now - lastMove > 2200 && now - lastAuto > 1400 + Math.random() * 1200) {
      randomDrop();
      lastAuto = now;
    }
    step();
    project(t);
    draw();
    rafId = requestAnimationFrame(frame);
  }

  function setRunning(on) {
    if (on && !running) {
      running = true;
      rafId = requestAnimationFrame(frame);
    } else if (!on && running) {
      running = false;
      cancelAnimationFrame(rafId);
    }
  }

  // pause when scrolled out of view or tab hidden
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      setRunning(entries[0].isIntersecting && !document.hidden && !reduceMotion);
    }, { threshold: 0 }).observe(canvas);
  }
  document.addEventListener("visibilitychange", function () {
    if (!reduceMotion) setRunning(!document.hidden);
  });

  var resizeTimer = 0;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      resize();
      if (reduceMotion) { project(0); draw(); }
    }, 120);
  });

  /* ---------------- boot ---------------- */

  resize();
  randomDrop(-1.2);
  randomDrop(-0.8);

  if (reduceMotion) {
    // settle into a pleasant static surface, draw once
    for (var s = 0; s < 140; s++) {
      if (s === 60) randomDrop(-0.9);
      step();
    }
    project(0);
    draw();
    running = false;
  } else {
    rafId = requestAnimationFrame(frame);
  }
})();
