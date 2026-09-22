(function () {
  'use strict';

  var WHATSAPP_NUMBER = '51981111518';

  function buildWaLink(planLabel) {
    var text = 'Hola, quiero información sobre el ' + planLabel + ' de Nobukaza Media.';
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
  }

  document.querySelectorAll('[data-wa-plan]').forEach(function (el) {
    el.setAttribute('href', buildWaLink(el.getAttribute('data-wa-plan')));
  });

  // ---- Videos: independent mute + restart, no restart-on-mute ----
  function wireVideo(prefix) {
    var video = document.getElementById(prefix + '-video');
    if (!video) return;
    var hit = document.getElementById(prefix + '-hit');
    var iconMuted = document.getElementById(prefix + '-icon-muted');
    var iconUnmuted = document.getElementById(prefix + '-icon-unmuted');
    var restartBtn = document.getElementById(prefix + '-restart-btn');

    function updateIcons() {
      if (iconMuted) iconMuted.style.display = video.muted ? '' : 'none';
      if (iconUnmuted) iconUnmuted.style.display = video.muted ? 'none' : '';
    }
    function toggleMute() {
      video.muted = !video.muted;
      updateIcons();
    }
    if (hit) hit.addEventListener('click', toggleMute);
    if (restartBtn) {
      restartBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        video.currentTime = 0;
        attemptPlay();
      });
    }
    updateIcons();

    function attemptPlay() {
      var p = video.play();
      if (p !== undefined) p.catch(function () {});
    }
    attemptPlay();
    var retries = 0;
    var retryTimer = setInterval(function () {
      retries++;
      if (!video.paused || retries > 8) { clearInterval(retryTimer); return; }
      attemptPlay();
    }, 400);
  }

  ['hero', 'clip1', 'clip2', 'clip3'].forEach(wireVideo);

  // ---- Hero title typewriter ----
  var line1Text = 'Contenido que vende.';
  var line2Text = 'Presencia que crece.';
  var line1El = document.getElementById('hero-line1');
  var line2El = document.getElementById('hero-line2');
  var caret1 = document.getElementById('hero-caret-1');
  var caret2 = document.getElementById('hero-caret-2');

  if (line1El && line2El) {
    if (caret2) caret2.style.display = 'none';
    var typed = 0;
    var totalLen = line1Text.length + line2Text.length;
    var typeTimer = setInterval(function () {
      typed++;
      if (typed <= line1Text.length) {
        line1El.textContent = line1Text.slice(0, typed);
      } else {
        if (caret1) caret1.style.display = 'none';
        if (caret2) caret2.style.display = '';
        line2El.textContent = line2Text.slice(0, typed - line1Text.length);
      }
      if (typed >= totalLen) clearInterval(typeTimer);
    }, 45);
  }

  // ---- Contact form: sound toggle + typing click sound ----
  var soundOn = true;
  var soundBtn = document.getElementById('sound-toggle-btn');
  var audioCtx = null;

  function playTypeSound() {
    if (!soundOn) return;
    try {
      if (!audioCtx) {
        var Ctx = window.AudioContext || window.webkitAudioContext;
        audioCtx = new Ctx();
      }
      if (audioCtx.state === 'suspended') audioCtx.resume();
      var now = audioCtx.currentTime;
      var osc = audioCtx.createOscillator();
      var gain = audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(650 + Math.random() * 500, now);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } catch (e) { /* Web Audio unavailable — fail silently */ }
  }

  if (soundBtn) {
    soundBtn.addEventListener('click', function () {
      soundOn = !soundOn;
      soundBtn.classList.toggle('is-on', soundOn);
      soundBtn.setAttribute('aria-pressed', String(soundOn));
    });
  }
  ['np-name', 'np-msg'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('input', playTypeSound);
  });

  // ---- Send form via WhatsApp ----
  var sendBtn = document.getElementById('send-btn');
  if (sendBtn) {
    sendBtn.addEventListener('click', function () {
      var nameEl = document.getElementById('np-name');
      var planEl = document.getElementById('np-plan');
      var msgEl = document.getElementById('np-msg');
      var name = (nameEl && nameEl.value) ? nameEl.value : 'Hola';
      var plan = (planEl && planEl.value) ? planEl.value : 'Plan Crecimiento / El Más Recomendado';
      var message = msgEl ? msgEl.value : '';
      var extra = message ? ' ' + message : '';
      var text = 'Hola, soy ' + name + '. Me interesa el ' + plan + ' de Nobukaza Media.' + extra;
      var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
      window.open(url, '_blank', 'noopener');
    });
  }
})();
