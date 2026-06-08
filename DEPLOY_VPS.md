# 🚀 DEPLOY_VPS.md — iAngelo Battle Quest

Guía de despliegue para el servidor Node.js/Colyseus en VPS.

> ⚠️ **CRÍTICO:** Este juego corre en el **mismo VPS** que iAngelo Quest (Canary).  
> **NO reiniciar el VPS** sin verificar primero que los procesos Canary/iAngelo Quest estén estables.  
> **NO tocar** ningún proceso llamado `canary`, `iangelo-quest` ni similares.

---

## Opción A — Mismo VPS (configuración actual · puerto 2568)

### Requisitos previos

```bash
# Verificar que Node.js 18+ esté instalado
node --version

# Verificar que PM2 esté instalado globalmente
pm2 --version

# Verificar puertos activos (no pisar otros procesos)
pm2 list
ss -tlnp | grep 2568
```

### Instalación inicial

```bash
# 1. Crear directorio
mkdir -p /var/www/iangelo-battle-quest
cd /var/www/iangelo-battle-quest

# 2. Clonar repositorio
git clone https://github.com/angeloapp/iangelo-battle-quest.git .

# 3. Instalar dependencias de producción
npm install --omit=dev

# 4. Crear directorio de logs
mkdir -p logs

# 5. Iniciar con PM2
pm2 start ecosystem.config.js --env production
pm2 save
```

### Actualizar versión publicada

```bash
cd /var/www/iangelo-battle-quest
git pull origin main
npm install --omit=dev
pm2 restart iangelo-battle-quest
pm2 logs iangelo-battle-quest --lines 20
```

### Verificar que levantó

```bash
pm2 list
curl -s http://localhost:2568/ | head -5
```

---

## Opción B — Servidor separado (futuro)

Cuando el estudio crezca y el VPS actual no sea suficiente:

1. Provisionar VPS nuevo (mínimo 1GB RAM, Ubuntu 22.04).
2. Instalar Node.js 18+ y PM2:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   npm install -g pm2
   ```
3. Seguir los mismos pasos de **Opción A**.
4. Actualizar la URL de beta en README.md y index.html con la nueva IP.

---

## Opción C — Nginx como reverse proxy (subdominio)

Para exponer `battle.iangeloquest.com` o similar en lugar de la IP + puerto:

```nginx
# /etc/nginx/sites-available/iangelo-battle-quest
server {
    listen 80;
    server_name battle.iangeloquest.com;

    location / {
        proxy_pass         http://127.0.0.1:2568;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection "upgrade";
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400s;
    }
}
```

```bash
# Activar configuración
sudo ln -s /etc/nginx/sites-available/iangelo-battle-quest /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Opcional: certificado SSL gratuito
sudo certbot --nginx -d battle.iangeloquest.com
```

> El header `Upgrade: websocket` es **obligatorio** para que Colyseus funcione a través de Nginx.

---

## Comandos de monitoreo

```bash
pm2 list                                    # Estado de todos los procesos
pm2 logs iangelo-battle-quest --lines 50    # Logs recientes
pm2 monit                                   # Monitor en tiempo real
free -h                                     # Memoria disponible del VPS
top                                         # Carga del sistema
ss -tlnp | grep 2568                        # Verificar puerto activo
```

---

## Seguridad operativa

```bash
# Detener sin eliminar (para mantenimiento)
pm2 stop iangelo-battle-quest

# Reanudar
pm2 start iangelo-battle-quest

# Eliminar proceso de PM2
pm2 delete iangelo-battle-quest
pm2 save

# Eliminación total del proyecto del VPS
pm2 delete iangelo-battle-quest
pm2 save
rm -rf /var/www/iangelo-battle-quest
```

---

## Parámetros de PM2 (ecosystem.config.js)

| Parámetro | Valor | Razón |
|---|---|---|
| `name` | `iangelo-battle-quest` | Identificador único en PM2 |
| `script` | `server/index.js` | Punto de entrada del servidor |
| `instances` | `1` | Un solo proceso (VPS compartido) |
| `exec_mode` | `fork` | Modo fork (no cluster, para socket.io) |
| `PORT` | `2568` | Puerto de producción — **no cambiar** |
| `NODE_ENV` | `production` | Activar optimizaciones de Node |
| `max_memory_restart` | `450M` | Límite de RAM (VPS compartido con Canary) |

---

*iAngelo Quest Studio · BCS, México*
