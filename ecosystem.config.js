module.exports = {
  apps : [{
    name: 'iangelo-battle-quest',
    script: 'server/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'development',
      PORT: 2567
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 2567
    }
  }]
};
