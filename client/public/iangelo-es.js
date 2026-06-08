/**
 * iangelo-es.js
 * Patch de traducción y mejoras de UI para iAngelo Battle Quest.
 * Reemplaza textos del HUD en español sin modificar bundle.min.js ni
 * afectar la lógica Phaser/Colyseus existente.
 *
 * iAngelo Quest Studio · Beta Fundadora · MIT License
 */
(function() {
  'use strict';

  /* ── Mapa de traducciones HUD ── */
  var TRANSLATIONS = {
    // Etiquetas comunes en inglés → español
    'Health':       'Vida',
    'HEALTH':       'VIDA',
    'health':       'vida',
    'Shield':       'Escudo',
    'SHIELD':       'ESCUDO',
    'shield':       'escudo',
    'Bullets':      'Munición',
    'BULLETS':      'MUNICIÓN',
    'bullets':      'munición',
    'Ammo':         'Munición',
    'AMMO':         'MUNICIÓN',
    'ammo':         'munición',
    'Kills':        'Eliminaciones',
    'KILLS':        'ELIM.',
    'kills':        'eliminaciones',
    'Alive':        'Vivos',
    'ALIVE':        'VIVOS',
    'alive':        'vivos',
    'Players':      'Jugadores',
    'PLAYERS':      'JUGADORES',
    'players':      'jugadores',
    'Leaderboard':  'Ranking',
    'LEADERBOARD':  'RANKING',
    'leaderboard':  'ranking',
    'Score':        'Puntos',
    'SCORE':        'PUNTOS',
    'score':        'puntos',
    'Rank':         'Posición',
    'RANK':         'POS.',
    'rank':         'posición',
    'You died':     '¡Fuiste eliminado!',
    'You win':      '¡Victoria!',
    'You Won':      '¡Victoria!',
    'Game Over':    'Fin de partida',
    'GAME OVER':    'FIN DE PARTIDA',
    'Connecting':   'Conectando…',
    'Connected':    'Conectado',
    'Disconnected': 'Desconectado',
    'Waiting for players': 'Esperando jugadores…',
    'Game starting': 'La partida comienza…',
    'Enter your name': 'Escribe tu nombre',
    'Play':         'Jugar',
    'Spectate':     'Espectador',
    'Battlefield-Honor': 'iAngelo Battle Quest',
    'Battlefield Honor': 'iAngelo Battle Quest',
    'Battlefield':  'iAngelo Battle Quest'
  };

  /* ── Estilos premium para el HUD ── */
  var HUD_CSS = [
    '/* iAngelo Battle Quest — HUD premium overlay */',
    '#hud, .hud, [id*="hud"], [class*="hud"] {',
    '  font-family: "Inter", system-ui, sans-serif !important;',
    '}',
    /* Health bar */
    '.health-bar, [class*="health"] > .bar, [id*="health-bar"] {',
    '  background: linear-gradient(90deg, #b71c1c, #e53935) !important;',
    '  border-radius: 3px !important;',
    '}',
    /* Shield bar */
    '.shield-bar, [class*="shield"] > .bar, [id*="shield-bar"] {',
    '  background: linear-gradient(90deg, #0077b6, #00b4d8) !important;',
    '  border-radius: 3px !important;',
    '}',
    /* Kill counter */
    '[class*="kill"], [id*="kill"] {',
    '  color: #f0c040 !important;',
    '  font-weight: 700 !important;',
    '}',
    /* Leaderboard */
    '[class*="leaderboard"], [class*="ranking"], [id*="leaderboard"] {',
    '  background: rgba(10,10,15,0.85) !important;',
    '  border: 1px solid rgba(212,160,23,0.25) !important;',
    '  border-radius: 6px !important;',
    '}',
    /* Studio watermark */
    '#iangelo-watermark {',
    '  position: fixed;',
    '  bottom: 10px;',
    '  right: 12px;',
    '  font-family: "Inter", sans-serif;',
    '  font-size: 10px;',
    '  letter-spacing: 0.07em;',
    '  color: rgba(212,160,23,0.5);',
    '  pointer-events: none;',
    '  z-index: 9990;',
    '  user-select: none;',
    '}'  ].join('\n');

  /* ── Inject CSS ── */
  function injectStyles() {
    var style = document.createElement('style');
    style.id = 'iangelo-hud-styles';
    style.textContent = HUD_CSS;
    document.head.appendChild(style);
  }

  /* ── Inject watermark ── */
  function injectWatermark() {
    if (document.getElementById('iangelo-watermark')) return;
    var el = document.createElement('div');
    el.id = 'iangelo-watermark';
    el.textContent = '⚔ iAngelo Quest Studio · Beta Fundadora';
    document.body.appendChild(el);
  }

  /* ── Translate a single text node ── */
  function translateNode(node) {
    var original = node.nodeValue;
    if (!original || !original.trim()) return;
    var result = original;
    for (var key in TRANSLATIONS) {
      if (!Object.prototype.hasOwnProperty.call(TRANSLATIONS, key)) continue;
      // Whole-word safe replace
      var re = new RegExp('(?<![\\w])'  + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![\\w])', 'g');
      result = result.replace(re, TRANSLATIONS[key]);
    }
    if (result !== original) node.nodeValue = result;
  }

  /* ── Walk DOM text nodes ── */
  function walkAndTranslate(root) {
    var walker = document.createTreeWalker(
      root || document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    var node;
    while ((node = walker.nextNode())) {
      translateNode(node);
    }
  }

  /* ── Observe future DOM mutations ── */
  function observeMutations() {
    if (!window.MutationObserver) return;
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === Node.TEXT_NODE) {
            translateNode(node);
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            walkAndTranslate(node);
          }
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  /* ── Init ── */
  function init() {
    injectStyles();
    injectWatermark();
    walkAndTranslate();
    observeMutations();
    // Re-run after a delay to catch Phaser canvas text (canvas text is not DOM)
    setTimeout(walkAndTranslate, 2000);
    setTimeout(walkAndTranslate, 5000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
