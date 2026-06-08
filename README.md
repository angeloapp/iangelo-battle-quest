# iAngelo Battle Quest

Versión personalizada para el ecosistema **iAngelo Quest**, basada en el proyecto open source `Battlefield-honor`.

## Qué incluye

- Cliente HTML5 con Phaser 3 + React.
- Servidor multijugador Node.js con Colyseus.
- Interfaz visible en español para la landing, HUD, pantalla de carga y pantalla final.
- Metadata Open Graph, favicon/manifest y rutas legales personalizadas.
- Configuración lista para VPS con PM2, Docker o Nginx como reverse proxy.

## Hosting recomendado

Este juego no es solamente una página estática. El modo multijugador usa WebSockets con Colyseus, por lo que necesita un proceso Node.js persistente.

- **Recomendado para producción:** VPS con Node/PM2 o Docker.
- **GitHub:** repositorio fuente del proyecto.
- **Vercel:** útil para una landing o frontend estático, pero no es la mejor opción para correr el servidor en tiempo real del juego.

## Ejecutar local

```bash
npm install --omit=dev --legacy-peer-deps
PORT=2567 NODE_ENV=production npm start
```

Abrir:

```txt
http://localhost:2567
```

## Despliegue rápido en VPS

Ver instrucciones completas en:

```txt
DEPLOY_VPS.md
```

## Rutas útiles

```txt
/health
/politica-de-privacidad
/terminos-y-condiciones
```

## Notas de licencia

El proyecto original conserva licencia MIT. Se mantiene `LICENSE` y se agrega `OPEN_SOURCE_NOTES.md` para dejar claro el origen y la personalización.
