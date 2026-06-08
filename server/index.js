const http = require('http');
const express = require('express');
const colyseus = require('colyseus');
const monitor = require("@colyseus/monitor").monitor;
const path = require('path');
//const socialRoutes = require("@colyseus/social/express").default;

const outdoor = require('./room/public').outdoor;

const port = Number(process.env.PORT || 2567) + Number(process.env.NODE_APP_INSTANCE || 0);
const app = express();
const server = http.createServer(app);



//if the REDIS_URL is present? usit it or else use the default local prescence
const gameServer = new colyseus.Server({
    server,
    presence: process.env.REDIS_URL ? new colyseus.RedisPresence(process.env.REDIS_URL) : new colyseus.LocalPresence()
});

// register your room handlers
gameServer.register('outdoor', outdoor);

/* register @colyseus/social routes
app.use("/", socialRoutes);*/

// En producción servimos el bundle JS directo para evitar servir un .gz desactualizado.

app.use("/assets/game.png" ,  express.static(path.join(__dirname, "./../client/src/assets/game.png")));

app.get("/health", (req, res) => res.status(200).json({ ok: true, game: "iAngelo Battle Quest" }));

app.use("/politica-de-privacidad", express.static(path.join(__dirname, "./../client/politica-privacidad.html")));
app.use("/iangelo-battle-quest-privacy-policy", express.static(path.join(__dirname, "./../client/politica-privacidad.html")));

app.use("/terminos-y-condiciones", express.static(path.join(__dirname, "./../client/terminos-condiciones.html")));
app.use("/iangelo-battle-quest-terms-conditions", express.static(path.join(__dirname, "./../client/terminos-condiciones.html")));


app.use(express.static(path.join(__dirname, "./../client/public")));

// Ruta /play para acceso al juego
app.get('/play', (req, res) => {
  res.sendFile(path.join(__dirname, './../client/public/index.html'));
});

//register colyseus monitor AFTER registering your room handlers
if (process.env.NODE_ENV != "production") {
    app.use("/colyseus", monitor(gameServer));
}

gameServer.listen(port);
console.log(`iAngelo Battle Quest activo en http://localhost:${port}`)
