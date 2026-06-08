module.exports = {
  apps : [{
    name: 'iangelo-battle-quest',
    script: 'server/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '450M',
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'development',
      PORT: process.env.PORT || 2568
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: process.env.PORT || 2568
    }
  }]
};
