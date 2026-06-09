/**
 * iAngelo Battle Quest - Studio Skin Layer
 * Capa nativa segura: traducción, UI premium, controles móviles DOM y ayudas visuales.
 * No modifica bundle.min.js ni lógica Phaser/Colyseus.
 */
(function () {
  'use strict';

  var VERSION = 'studio-skin-2026-06-09';
  var PROJECT_NAME = 'iAngelo Battle Quest';
  var STUDIO_NAME = 'iAngelo Quest Studio';

  var TRANSLATIONS = {
    'Battlefield-honor': PROJECT_NAME,
    'Battlefield Honor': PROJECT_NAME,
    'Battlefield': PROJECT_NAME,
    'Health': 'Vida',
    'Shield': 'Escudo',
    'Bullets': 'Munición',
    'Ammo': 'Munición',
    'Kills': 'Bajas',
    'kill': 'baja',
    'kills': 'bajas',
    'alive': 'vivos',
    'Alive': 'Vivos',
    'Ranking': 'Ranking',
    'Reload': 'Recargar',
    'Fire': 'Fuego',
    'Controls': 'Controles',
    'Move': 'Moverse',
    'Shoot': 'Disparar',
    'Click': 'Click',
    'WASD': 'WASD',
    'Leaderboard': 'Ranking',
    'Squadron of': 'Escuadrón de',
    'Squad of': 'Escuadrón de',
    'Team of': 'Escuadrón de'
  };

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  function isMobileLike() {
    return (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) || window.innerWidth <= 900;
  }

  function injectStyle() {
    if (document.getElementById('ibq-studio-style')) return;

    var css = '' +
      ':root{--ibq-bg:#060711;--ibq-panel:rgba(8,10,24,.78);--ibq-panel2:rgba(10,14,28,.62);--ibq-gold:#f5b51b;--ibq-gold2:#ff7b00;--ibq-cyan:#14e6ff;--ibq-red:#ff2c18;--ibq-text:#fff7db;}' +
      'html,body{background:radial-gradient(circle at 20% 10%,rgba(245,181,27,.12),transparent 26%),radial-gradient(circle at 88% 82%,rgba(20,230,255,.11),transparent 28%),linear-gradient(135deg,#05060f,#091017 62%,#04050a)!important;}' +
      'body{margin:0!important;overflow:hidden!important;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif!important;color:var(--ibq-text);}' +
      'body::before{content:"";position:fixed;inset:0;pointer-events:none;z-index:2;background:linear-gradient(180deg,rgba(255,183,24,.16),transparent 12%,transparent 82%,rgba(20,230,255,.12)),radial-gradient(circle at 50% 0%,rgba(255,255,255,.08),transparent 25%);mix-blend-mode:screen;opacity:.6;}' +
      'canvas{display:block!important;max-width:100vw!important;max-height:100vh!important;touch-action:none!important;image-rendering:auto;filter:saturate(1.13) contrast(1.06) drop-shadow(0 0 18px rgba(0,0,0,.34));}' +
      '#ibq-topbar{position:fixed;left:0;right:0;top:0;z-index:30;height:34px;display:flex;align-items:center;gap:10px;padding:0 14px;background:linear-gradient(90deg,rgba(5,7,18,.82),rgba(9,12,27,.42),rgba(5,7,18,.78));border-bottom:1px solid rgba(245,181,27,.35);box-shadow:0 10px 30px rgba(0,0,0,.22);pointer-events:none;}' +
      '#ibq-topbar .crest{width:21px;height:21px;display:grid;place-items:center;border:1px solid rgba(245,181,27,.72);border-radius:7px;background:radial-gradient(circle,#332100,#0b0b11);color:var(--ibq-gold);font-size:12px;font-weight:900;}' +
      '#ibq-topbar .brand{font-family:Georgia,serif;font-size:13px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:var(--ibq-gold);text-shadow:0 0 14px rgba(245,181,27,.38);}' +
      '#ibq-topbar .sub{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,247,219,.54);}' +
      '#ibq-topbar .pill{margin-left:auto;border:1px solid rgba(245,181,27,.42);border-radius:999px;padding:4px 10px;color:#ffd978;background:rgba(0,0,0,.28);font-size:10px;font-weight:800;text-transform:uppercase;}' +
      '#ibq-watermark{position:fixed;right:10px;bottom:8px;z-index:31;color:rgba(255,215,120,.72);font-size:10px;text-shadow:0 1px 8px #000;letter-spacing:.04em;pointer-events:none;}' +
      '#ibq-help{position:fixed;left:14px;top:44px;z-index:31;width:164px;padding:9px 10px;border:1px solid rgba(245,181,27,.25);border-radius:10px;background:rgba(7,8,17,.58);backdrop-filter:blur(8px);box-shadow:0 10px 22px rgba(0,0,0,.26);color:#fff2c0;font-size:11px;line-height:1.35;pointer-events:none;}' +
      '#ibq-help strong{display:block;color:var(--ibq-gold);font-size:10px;text-transform:uppercase;letter-spacing:.12em;margin-bottom:4px;}' +
      '#ibq-help kbd{font-family:inherit;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.12);border-radius:5px;padding:1px 4px;color:#fff;}' +
      '#ibq-mobile-controls{display:none;}' +
      '@media (pointer:coarse),(max-width:900px){' +
      '  #ibq-topbar{height:28px;padding:0 9px;}' +
      '  #ibq-topbar .brand{font-size:10px;letter-spacing:.08em;}.ibq-hide-mobile{display:none!important;}' +
      '  #ibq-help{display:none!important;}' +
      '  #ibq-mobile-controls{display:block;position:fixed;inset:0;z-index:35;pointer-events:none;}' +
      '  #ibq-mobile-controls .aim-zone{position:absolute;right:0;top:12%;width:52%;height:68%;border-radius:26px;background:radial-gradient(circle at 72% 70%,rgba(20,230,255,.12),transparent 35%);opacity:.65;pointer-events:auto;touch-action:none;}' +
      '  #ibq-mobile-controls .hint{position:absolute;left:50%;bottom:128px;transform:translateX(-50%);padding:8px 12px;border-radius:14px;background:rgba(0,0,0,.48);border:1px solid rgba(245,181,27,.22);color:#fff2c0;font-size:11px;font-weight:800;text-align:center;opacity:.78;}' +
      '  #ibq-mobile-controls .btn{position:absolute;right:18px;width:82px;height:82px;border-radius:999px;border:2px solid rgba(255,228,124,.9);box-shadow:0 10px 28px rgba(0,0,0,.38), inset 0 0 20px rgba(255,255,255,.11);display:grid;place-items:center;color:white;font-weight:950;letter-spacing:.05em;text-shadow:0 2px 7px rgba(0,0,0,.45);pointer-events:auto;touch-action:none;user-select:none;-webkit-user-select:none;}' +
      '  #ibq-mobile-controls .fire{bottom:22px;background:radial-gradient(circle at 35% 25%,#ffcc3b,#e03b18 68%,#651014);font-size:17px;}' +
      '  #ibq-mobile-controls .reload{bottom:116px;background:radial-gradient(circle at 35% 25%,#21d7ff,#0c75a6 70%,#07364c);font-size:27px;}' +
      '  #ibq-watermark{font-size:9px;right:8px;bottom:3px;color:rgba(255,218,117,.55);}' +
      '}' +
      '.ibq-toast{position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:80;padding:10px 14px;border-radius:14px;background:rgba(4,7,16,.82);border:1px solid rgba(245,181,27,.34);color:#fff4ca;font-size:12px;font-weight:800;box-shadow:0 12px 32px rgba(0,0,0,.35);opacity:0;transition:opacity .22s ease,transform .22s ease;pointer-events:none;}' +
      '.ibq-toast.show{opacity:1;transform:translateX(-50%) translateY(-6px);}';

    var style = document.createElement('style');
    style.id = 'ibq-studio-style';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function translateText(text) {
    var next = text;
    Object.keys(TRANSLATIONS).forEach(function (key) {
      next = next.split(key).join(TRANSLATIONS[key]);
    });
    return next;
  }

  function translatePage() {
    try {
      var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
      var node;
      while ((node = walker.nextNode())) {
        var original = node.nodeValue;
        var translated = translateText(original);
        if (translated !== original) node.nodeValue = translated;
      }
      document.title = PROJECT_NAME + ' · Beta Fundadora';
    } catch (err) {
      console.warn('[IBQ] Traducción omitida:', err);
    }
  }

  function ensureTopbar() {
    if (document.getElementById('ibq-topbar')) return;
    var bar = document.createElement('div');
    bar.id = 'ibq-topbar';
    bar.innerHTML = '<div class="crest">IA</div><div class="brand">' + STUDIO_NAME + '</div><div class="sub ibq-hide-mobile">· ' + PROJECT_NAME + '</div><div class="pill">Beta Fundadora</div>';
    document.body.appendChild(bar);
  }

  function ensureWatermark() {
    if (document.getElementById('ibq-watermark')) return;
    var wm = document.createElement('div');
    wm.id = 'ibq-watermark';
    wm.textContent = '⚔ ' + STUDIO_NAME + ' · ' + VERSION;
    document.body.appendChild(wm);
  }

  function ensureHelp() {
    if (document.getElementById('ibq-help')) return;
    var help = document.createElement('div');
    help.id = 'ibq-help';
    help.innerHTML = '<strong>Controles</strong><kbd>WASD</kbd> moverse<br><kbd>Click</kbd> disparar<br><kbd>R</kbd> recargar';
    document.body.appendChild(help);
  }

  function findCanvas() {
    return document.querySelector('canvas');
  }

  function dispatchKeyboard(code, key) {
    try {
      var down = new KeyboardEvent('keydown', { key: key, code: code, bubbles: true, cancelable: true });
      var up = new KeyboardEvent('keyup', { key: key, code: code, bubbles: true, cancelable: true });
      window.dispatchEvent(down);
      document.dispatchEvent(down);
      setTimeout(function () {
        window.dispatchEvent(up);
        document.dispatchEvent(up);
      }, 60);
    } catch (err) {
      console.warn('[IBQ] No se pudo disparar teclado virtual:', err);
    }
  }

  function canvasPointFromTouch(evt) {
    var canvas = findCanvas();
    if (!canvas) return null;
    var rect = canvas.getBoundingClientRect();
    var t = (evt.touches && evt.touches[0]) || (evt.changedTouches && evt.changedTouches[0]) || evt;
    var x = Math.max(rect.left + 8, Math.min(rect.right - 8, t.clientX || (rect.left + rect.width * 0.72)));
    var y = Math.max(rect.top + 8, Math.min(rect.bottom - 8, t.clientY || (rect.top + rect.height * 0.55)));
    return { canvas: canvas, x: x, y: y };
  }

  function dispatchCanvasPointer(type, point) {
    if (!point || !point.canvas) return;
    var eventInit = { bubbles: true, cancelable: true, clientX: point.x, clientY: point.y, pointerId: 99, pointerType: 'touch', isPrimary: true, buttons: type === 'pointerup' ? 0 : 1 };
    try {
      point.canvas.dispatchEvent(new PointerEvent(type, eventInit));
    } catch (err) {
      var mouseType = type === 'pointerdown' ? 'mousedown' : type === 'pointerup' ? 'mouseup' : 'mousemove';
      point.canvas.dispatchEvent(new MouseEvent(mouseType, eventInit));
    }
  }

  function tapCanvasForFire(evt) {
    var point = canvasPointFromTouch(evt || {});
    if (!point) return;
    dispatchCanvasPointer('pointermove', point);
    dispatchCanvasPointer('pointerdown', point);
    setTimeout(function () {
      dispatchCanvasPointer('pointerup', point);
    }, 55);
  }

  function ensureMobileControls() {
    if (!isMobileLike()) return;
    if (document.getElementById('ibq-mobile-controls')) return;

    var controls = document.createElement('div');
    controls.id = 'ibq-mobile-controls';
    controls.innerHTML = '<div class="aim-zone" aria-label="Zona de apuntado"></div><div class="hint">Zona derecha: apuntar · Fuego: disparar · R: recargar</div><button class="btn reload" type="button" aria-label="Recargar">R</button><button class="btn fire" type="button" aria-label="Disparar">FUEGO</button>';
    document.body.appendChild(controls);

    var aim = controls.querySelector('.aim-zone');
    var fire = controls.querySelector('.fire');
    var reload = controls.querySelector('.reload');

    function stop(evt) {
      evt.preventDefault();
      evt.stopPropagation();
    }

    aim.addEventListener('touchstart', function (evt) { stop(evt); dispatchCanvasPointer('pointermove', canvasPointFromTouch(evt)); }, { passive: false });
    aim.addEventListener('touchmove', function (evt) { stop(evt); dispatchCanvasPointer('pointermove', canvasPointFromTouch(evt)); }, { passive: false });
    aim.addEventListener('pointermove', function (evt) { stop(evt); dispatchCanvasPointer('pointermove', canvasPointFromTouch(evt)); });

    fire.addEventListener('touchstart', function (evt) { stop(evt); tapCanvasForFire(evt); }, { passive: false });
    fire.addEventListener('pointerdown', function (evt) { stop(evt); tapCanvasForFire(evt); });

    reload.addEventListener('touchstart', function (evt) { stop(evt); dispatchKeyboard('KeyR', 'r'); toast('Recargando munición'); }, { passive: false });
    reload.addEventListener('pointerdown', function (evt) { stop(evt); dispatchKeyboard('KeyR', 'r'); toast('Recargando munición'); });
  }

  function toast(message) {
    var el = document.getElementById('ibq-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'ibq-toast';
      el.className = 'ibq-toast';
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(el.__timer);
    el.__timer = setTimeout(function () { el.classList.remove('show'); }, 1200);
  }

  function installObservers() {
    try {
      var translateTimer = 0;
      var observer = new MutationObserver(function () {
        clearTimeout(translateTimer);
        translateTimer = setTimeout(translatePage, 250);
      });
      observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    } catch (err) {
      console.warn('[IBQ] Observer no disponible:', err);
    }
  }

  function boot() {
    injectStyle();
    ensureTopbar();
    ensureWatermark();
    ensureHelp();
    ensureMobileControls();
    translatePage();
    installObservers();
    console.info('[IBQ] Studio Skin activo:', VERSION);
  }

  ready(boot);
}());
