# ⚔ iAngelo Battle Quest

> **iAngelo Quest Studio presenta** — Primer battle royale web de nuestro estudio.

[![Estado](https://img.shields.io/badge/estado-Beta%20Fundadora-orange)](http://178.105.155.86:2568)
[![Puerto](https://img.shields.io/badge/puerto-2568-blue)](#)
[![Licencia](https://img.shields.io/badge/licencia-MIT-green)](LICENSE)
[![Stack](https://img.shields.io/badge/stack-Node.js%20%7C%20Colyseus%20%7C%20Phaser-purple)](#)

---

## 🎯 Visión del proyecto

**iAngelo Battle Quest** es el primer battle royale web de iAngelo Quest Studio. Hasta 20 jugadores compiten en tiempo real en una arena 2D construida con Phaser 3 y sincronización de estado vía Colyseus. El juego corre en un VPS propio para garantizar conexión persistente WebSocket — algo que plataformas serverless como Vercel no pueden sostener.

> *Entra a la arena, sobrevive, elimina rivales y domina el ranking.*

---

## 🔥 Estado actual — Beta Fundadora

| Característica | Estado |
|---|---|
| Servidor Colyseus + Node.js | ✅ Activo |
| HUD en español (Vida / Escudo / Munición / Ranking) | ✅ Activo |
| Hasta 20 jugadores por sala | ✅ Funcional |
| Zona de daño dinámica | ✅ Funcional |
| Leaderboard en tiempo real | ✅ Funcional |
| Branding iAngelo Quest Studio | ✅ Beta Fundadora |
| App móvil nativa | 🔄 Roadmap |

🌐 **Beta pública:** [http://178.105.155.86:2568](http://178.105.155.86:2568)

---

## 💻 Correr localmente

```bash
# 1. Clona el repositorio
git clone https://github.com/angeloapp/iangelo-battle-quest.git
cd iangelo-battle-quest

# 2. Instala dependencias
npm install

# 3. Inicia en modo desarrollo
npm run dev

# 4. Abre el cliente
# http://localhost:2568
```

Requisitos: **Node.js 18+**, npm 9+.

---

## 🚀 Despliegue en VPS (puerto 2568)

Ver [DEPLOY_VPS.md](DEPLOY_VPS.md) para el proceso completo. Resumen rápido:

```bash
# En el VPS, dentro de /var/www/iangelo-battle-quest
git pull origin main
npm install --omit=dev
pm2 restart iangelo-battle-quest
```

---

## ❓ ¿Por qué VPS y no solo Vercel?

Colyseus necesita **conexiones WebSocket persistentes** y **estado compartido en memoria** entre todos los jugadores de una sala. Las funciones serverless (Vercel, Netlify) matan el proceso tras cada request y no mantienen estado entre conexiones — esto rompe la sincronización del juego. Un VPS dedicado mantiene el servidor activo 24/7 con memoria compartida real.

---

## 📊 Monitoreo en producción

```bash
# Estado de todos los procesos PM2
pm2 list

# Memoria libre del VPS
free -h

# Procesos del sistema
top

# Logs del juego en tiempo real
pm2 logs iangelo-battle-quest

# Reiniciar el juego (nunca el VPS sin verificar Canary primero)
pm2 restart iangelo-battle-quest
```

---

## 🛡 Comandos de emergencia

```bash
# Detener sin eliminar
pm2 stop iangelo-battle-quest

# Eliminar proceso completamente
pm2 delete iangelo-battle-quest
pm2 save

# Eliminación total del proyecto
pm2 delete iangelo-battle-quest
pm2 save
rm -rf /var/www/iangelo-battle-quest
```

---

## 🗂 Estructura del proyecto

```
iangelo-battle-quest/
├── client/
│   └── public/          ← HTML, bundle Phaser, assets
│       ├── index.html   ← Landing + pantalla inicial
│       ├── bundle.min.js← Motor del juego (Phaser + Colyseus client)
│       └── iangelo-es.js← Traducciones HUD + mejoras UI
├── server/
│   └── index.js         ← Servidor Node.js + Colyseus rooms
├── ecosystem.config.js  ← Configuración PM2
├── DEPLOY_VPS.md        ← Guía de despliegue
└── package.json
```

---

## 📄 Open Source

Este proyecto está licenciado bajo **MIT License**. El código del servidor y cliente es libre de usar, modificar y distribuir con atribución. Ver [LICENSE](LICENSE) y [OPEN_SOURCE_NOTES.md](OPEN_SOURCE_NOTES.md).

---

*iAngelo Quest Studio · BCS, México · 2025*
