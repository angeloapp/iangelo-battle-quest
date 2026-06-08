/**
 * ecosystem.config.js — iAngelo Battle Quest
 * iAngelo Quest Studio · Beta Fundadora
 *
 * SEGURIDAD OPERATIVA:
 *   Parar proceso:   pm2 stop iangelo-battle-quest
 *   Eliminar proceso: pm2 delete iangelo-battle-quest && pm2 save
 *   Eliminar todo:   pm2 delete iangelo-battle-quest && pm2 save && rm -rf /var/www/iangelo-battle-quest
 *
 * NO reiniciar el VPS sin revisar primero los procesos Canary/iAngelo Quest.
 * NO tocar procesos canary ni iangelo-quest del VPS principal.
 */
module.exports = {
  apps: [
    {
      name:               'iangelo-battle-quest',
      script:             'server/index.js',
      instances:          1,
      exec_mode:          'fork',
      max_memory_restart: '450M',
      env_production: {
        NODE_ENV: 'production',
        PORT:     2568
      },
      env: {
        NODE_ENV: 'production',
        PORT:     2568
      },
      // Logs
      out_file:  './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      // Stability
      restart_delay:  3000,
      max_restarts:   10,
      watch:          false
    }
  ]
};
