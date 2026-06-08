# Despliegue en VPS para iAngelo Battle Quest

## Opción recomendada: VPS + GitHub + PM2

En el VPS Ubuntu, ejecuta:

```bash
sudo apt update
sudo apt install -y git nginx curl
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
sudo mkdir -p /var/www
cd /var/www
sudo git clone https://github.com/angeloapp/iangelo-battle-quest.git iangelo-battle-quest
sudo chown -R $USER:$USER /var/www/iangelo-battle-quest
cd /var/www/iangelo-battle-quest
npm install --omit=dev --legacy-peer-deps
PORT=2567 NODE_ENV=production pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

Probar que el servidor responde:

```bash
curl http://127.0.0.1:2567/health
```

## Nginx con dominio

Cambia `tudominio.com` por el dominio real:

```nginx
server {
    listen 80;
    server_name tudominio.com www.tudominio.com;

    location / {
        proxy_pass http://127.0.0.1:2567;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Crear archivo de Nginx:

```bash
sudo nano /etc/nginx/sites-available/iangelo-battle-quest
```

Pega la configuración, guarda y activa el sitio:

```bash
sudo ln -s /etc/nginx/sites-available/iangelo-battle-quest /etc/nginx/sites-enabled/iangelo-battle-quest
sudo nginx -t
sudo systemctl reload nginx
```

## HTTPS con Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d tudominio.com -d www.tudominio.com
```

## Opción Docker

```bash
docker compose up -d --build
```

## Notas técnicas

- El cliente se conecta por WebSocket al mismo host donde se abre la página.
- Si entras por `http://IP:2567`, el socket usa `ws://IP:2567`.
- Si entras por `https://tudominio.com`, el socket usa `wss://tudominio.com` y Nginx reenvía al proceso Node en `127.0.0.1:2567`.
- El endpoint de salud está disponible en `/health`.
- Las páginas legales están en `/politica-de-privacidad` y `/terminos-y-condiciones`.
