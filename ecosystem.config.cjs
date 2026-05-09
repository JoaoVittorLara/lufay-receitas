// Configuração PM2 para rodar o servidor de desenvolvimento local
module.exports = {
  apps: [
    {
      name: 'lufay-receitas',
      script: 'npx',
      args: 'wrangler pages dev dist --ip 0.0.0.0 --port 3000',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork'
    }
  ]
}
