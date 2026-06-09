/*
 * iAngelo Battle Quest - HUD móvil de powerups
 * Capa DOM segura para que Vida, Blink/Velocidad y Escudo sean visibles y usables en móvil.
 * Se alimenta de window.__IBQ_POWERUPS__ cuando el bundle sincroniza el estado.
 */
(function () {
  'use strict';

  var VERSION = 'powerups-mobile-2026-06-09-v1';
  var state = { health: 0, blink: 0, shield: 0 };
  var labels = {
    health: { icon: '+', title: 'Vida', className: 'health' },
    blink: { icon: '↯', title: 'Velocidad', className: 'blink' },
    shield: { icon: '🛡', title: 'Escudo', className: 'shield' }
  };

  function isMobileLike() {
    return (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) || window.innerWidth <= 900;
  }

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  function injectStyle() {
    if (document.getElementById('ibq-powerups-mobile-style')) return;
    var style = document.createElement('style');
    style.id = 'ibq-powerups-mobile-style';
    style.textContent = '' +
      '#ibq-powerups-mobile{position:fixed;left:10px;right:10px;bottom:88px;z-index:70;display:none;justify-content:center;gap:10px;pointer-events:none;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;}' +
      '#ibq-powerups-mobile .ibq-pu{position:relative;width:62px;height:62px;border:2px solid rgba(255,225,118,.78);border-radius:18px;background:rgba(5,8,18,.68);box-shadow:0 10px 24px rgba(0,0,0,.34),inset 0 0 20px rgba(255,255,255,.07);display:grid;place-items:center;pointer-events:auto;touch-action:none;user-select:none;-webkit-user-select:none;backdrop-filter:blur(8px);}' +
      '#ibq-powerups-mobile .ibq-pu .icon{font-weight:950;font-size:28px;line-height:1;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,.6);}' +
      '#ibq-powerups-mobile .ibq-pu .label{position:absolute;left:50%;bottom:-17px;transform:translateX(-50%);font-size:9px;font-weight:900;letter-spacing:.04em;text-transform:uppercase;color:#fff4c0;text-shadow:0 2px 8px #000;white-space:nowrap;}' +
      '#ibq-powerups-mobile .ibq-pu .count{position:absolute;right:-8px;top:-9px;min-width:25px;height:25px;padding:0 5px;border-radius:999px;background:linear-gradient(135deg,#202432,#0a0c14);border:2px solid rgba(255,255,255,.55);display:grid;place-items:center;color:white;font-size:13px;font-weight:950;box-shadow:0 6px 16px rgba(0,0,0,.32);}' +
      '#ibq-powerups-mobile .ibq-pu.health{background:radial-gradient(circle at 35% 20%,rgba(255,255,255,.22),transparent 26%),linear-gradient(145deg,rgba(26,142,72,.86),rgba(4,64,38,.82));}' +
      '#ibq-powerups-mobile .ibq-pu.blink{background:radial-gradient(circle at 35% 20%,rgba(255,255,255,.22),transparent 26%),linear-gradient(145deg,rgba(29,172,234,.86),rgba(8,56,116,.82));}' +
      '#ibq-powerups-mobile .ibq-pu.shield{background:radial-gradient(circle at 35% 20%,rgba(255,255,255,.22),transparent 26%),linear-gradient(145deg,rgba(72,104,226,.86),rgba(29,34,116,.82));}' +
      '#ibq-powerups-mobile .ibq-pu.empty{opacity:.45;filter:grayscale(.25);}' +
      '#ibq-powerups-mobile .ibq-pu:active{transform:scale(.94);}' +
      '#ibq-powerups-toast{position:fixed;left:50%;bottom:168px;z-index:95;transform:translateX(-50%) translateY(8px);padding:9px 13px;border-radius:14px;border:1px solid rgba(255,225,118,.35);background:rgba(4,7,16,.84);color:#fff5cf;font-size:12px;font-weight:900;box-shadow:0 12px 32px rgba(0,0,0,.38);opacity:0;transition:opacity .18s ease,transform .18s ease;pointer-events:none;}' +
      '#ibq-powerups-toast.show{opacity:1;transform:translateX(-50%) translateY(0);}' +
      '@media (pointer:coarse),(max-width:900px){#ibq-powerups-mobile{display:flex;}#ibq-mobile-controls .hint{display:none!important;}#ibq-mobile-controls .reload{bottom:170px!important;right:16px!important;width:68px!important;height:68px!important;font-size:22px!important;}#ibq-mobile-controls .fire{bottom:92px!important;right:16px!important;width:74px!important;height:74px!important;font-size:14px!important;}#ibq-mobile-controls .aim-zone{top:18%!important;height:54%!important;}}' +
      '@media (max-height:720px){#ibq-powerups-mobile{bottom:78px;}#ibq-powerups-mobile .ibq-pu{width:56px;height:56px;border-radius:16px;}#ibq-powerups-mobile .ibq-pu .icon{font-size:25px;}#ibq-mobile-controls .reload{bottom:154px!important;}#ibq-mobile-controls .fire{bottom:82px!important;}}';
    document.head.appendChild(style);
  }

  function makeButton(type) {
    var meta = labels[type];
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ibq-pu ' + meta.className + ' empty';
    btn.setAttribute('data-type', type);
    btn.setAttribute('aria-label', 'Usar ' + meta.title);
    btn.innerHTML = '<span class="icon">' + meta.icon + '</span><span class="count">0</span><span class="label">' + meta.title + '</span>';

    function use(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      if ((state[type] || 0) <= 0) {
        toast(meta.title + ' no disponible');
        return;
      }
      var used = false;
      try {
        if (window.iAngeloBattleControls && typeof window.iAngeloBattleControls.usePowerup === 'function') {
          used = window.iAngeloBattleControls.usePowerup(type);
        }
      } catch (error) {
        used = false;
      }
      toast(used === false ? 'No se pudo usar ' + meta.title : meta.title + ' activado');
    }

    btn.addEventListener('touchstart', use, { passive: false });
    btn.addEventListener('pointerdown', use);
    return btn;
  }

  function ensurePanel() {
    if (!isMobileLike()) return;
    if (document.getElementById('ibq-powerups-mobile')) return;
    var panel = document.createElement('div');
    panel.id = 'ibq-powerups-mobile';
    panel.innerHTML = '';
    panel.appendChild(makeButton('health'));
    panel.appendChild(makeButton('blink'));
    panel.appendChild(makeButton('shield'));
    document.body.appendChild(panel);
    render();
  }

  function render() {
    var panel = document.getElementById('ibq-powerups-mobile');
    if (!panel) return;
    ['health', 'blink', 'shield'].forEach(function (type) {
      var btn = panel.querySelector('[data-type="' + type + '"]');
      if (!btn) return;
      var count = Number(state[type] || 0);
      btn.querySelector('.count').textContent = count;
      btn.classList.toggle('empty', count <= 0);
    });
  }

  function toast(message) {
    var el = document.getElementById('ibq-powerups-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'ibq-powerups-toast';
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(el.__timer);
    el.__timer = setTimeout(function () { el.classList.remove('show'); }, 1050);
  }

  function updateState(next) {
    if (!next) return;
    state.health = Number(next.health || 0);
    state.blink = Number(next.blink || 0);
    state.shield = Number(next.shield || 0);
    render();
  }

  function boot() {
    injectStyle();
    ensurePanel();
    updateState(window.__IBQ_POWERUPS__ || state);
    window.addEventListener('ibq:powerups', function (evt) { updateState(evt.detail); });
    window.addEventListener('ibq:powerup-collected', function (evt) {
      var detail = evt.detail || {};
      if (detail.type && labels[detail.type]) toast(labels[detail.type].title + ' obtenido');
    });
    window.addEventListener('resize', ensurePanel);
    console.info('[IBQ] HUD móvil de powerups activo:', VERSION);
  }

  ready(boot);
}());
