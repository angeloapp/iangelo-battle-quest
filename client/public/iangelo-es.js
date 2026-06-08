(function () {
  'use strict';

  var PROJECT_NAME = 'iAngelo Battle Quest';
  var replacements = new Map([
    ['Battlefield honor', PROJECT_NAME],
    ['Battlefield Honor', PROJECT_NAME],
    ['Battlefield-honor', PROJECT_NAME],
    ['A Battle royale game for the real ones', 'Arena multijugador 2D estilo battle quest'],
    ['Name', 'Nombre de guerrero'],
    ['Enter your name', 'Nombre de guerrero'],
    ['Play', 'Entrar'],
    ['play', 'Entrar'],
    ['About', 'Sobre el juego'],
    ['How to play', 'Cómo jugar'],
    ['Stats', 'Estadísticas'],
    ['Resumen', 'Resumen'],
    ['score: ', 'puntuación: '],
    ['time survived: ', 'tiempo sobrevivido: '],
    ['hits: ', 'impactos: '],
    ['play again', 'jugar de nuevo'],
    ['share the game', 'compartir juego'],
    ['Tap the player to reload', 'Toca tu jugador para recargar'],
    ['Press R to reload', 'Presiona R para recargar'],
    ["'s party", ''],
    ['number of kills : ', 'bajas: '],
    ['number of kills: ', 'bajas: '],
    ['alive', 'vivos'],
    ['Reloading...', 'Recargando...'],
    ['Bullets', 'Munición'],
    ['Leaderboard', 'Ranking'],
    ['Kills', 'Bajas'],
    ['Loading...', 'Cargando...']
  ]);

  function replaceTextValue(value) {
    if (!value || typeof value !== 'string') return value;
    var output = value;
    replacements.forEach(function (to, from) {
      output = output.split(from).join(to);
    });
    return output;
  }

  function patchDomText(root) {
    root = root || document.body;
    if (!root) return;

    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    var node;
    while ((node = walker.nextNode())) {
      var next = replaceTextValue(node.nodeValue);
      if (next !== node.nodeValue) node.nodeValue = next;
    }

    Array.prototype.forEach.call(root.querySelectorAll('input, textarea, button, [placeholder], [title], [aria-label]'), function (el) {
      ['placeholder', 'title', 'aria-label', 'value'].forEach(function (attr) {
        if (el.getAttribute && el.getAttribute(attr)) {
          var next = replaceTextValue(el.getAttribute(attr));
          if (next !== el.getAttribute(attr)) el.setAttribute(attr, next);
        }
      });
    });
  }

  function applyBranding() {
    document.documentElement.lang = 'es-MX';
    document.title = PROJECT_NAME + ' | Arena Battle Quest 2D Multijugador';
    var desc = 'Arena multijugador 2D estilo battle quest: entra, sobrevive, elimina enemigos y domina el ranking.';
    var metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute('content', desc);
    Array.prototype.forEach.call(document.querySelectorAll('meta[property="og:title"]'), function (m) { m.setAttribute('content', PROJECT_NAME); });
    Array.prototype.forEach.call(document.querySelectorAll('meta[property="og:description"]'), function (m) { m.setAttribute('content', desc); });
  }

  function patchPhaserText() {
    if (!window.Phaser || !window.Phaser.GameObjects || !window.Phaser.GameObjects.GameObjectFactory) return false;
    var proto = window.Phaser.GameObjects.GameObjectFactory.prototype;
    if (!proto || proto.__iangeloSpanishPatch || !proto.text) return true;
    var originalText = proto.text;
    proto.text = function (x, y, text, style) {
      return originalText.call(this, x, y, replaceTextValue(text), style);
    };
    proto.__iangeloSpanishPatch = true;
    return true;
  }

  function run() {
    applyBranding();
    patchDomText(document.body);
    patchPhaserText();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.addedNodes) {
        Array.prototype.forEach.call(mutation.addedNodes, function (node) {
          if (node.nodeType === 1) patchDomText(node);
          if (node.nodeType === 3) node.nodeValue = replaceTextValue(node.nodeValue);
        });
      }
    });
  });

  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  var tries = 0;
  var timer = setInterval(function () {
    run();
    tries += 1;
    if (tries > 60 || patchPhaserText()) clearInterval(timer);
  }, 250);
})();
