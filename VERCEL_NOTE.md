# Nota sobre Vercel

Este proyecto usa Colyseus con WebSockets para multijugador en tiempo real. Para una versión completa de producción conviene usar VPS, Render, Railway, Fly.io o cualquier servidor Node persistente.

Vercel puede servir una landing o un frontend estático, pero este juego necesita mantener conexiones WebSocket activas entre jugadores. Por eso la ruta recomendada es:

GitHub → VPS → PM2/Docker → Nginx → HTTPS
