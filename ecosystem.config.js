module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [{
      name      : 'ge2018',
      script    : 'bin/www.js',
      env: {
        NODE_ENV: 'development'
      },
      env_staging : {
        NODE_ENV: 'staging'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    staging : {
      key  : '/Users/ssasoft/.ssh/id_rsa',
      user : 'root',
      host : '188.40.167.174',
      ref  : 'origin/master',
      repo : 'https://github.com/aftabaig/ge2018_server.git',
      path : '/root/ge2018',
      'post-deploy' : 'pm2 reload ecosystem.config.js --env staging'
    },
    production: {
      key: '/Users/ssasoft/.ssh/id_rsa',
      user: 'deployer',
      host: '35.229.86.235',
      ref: 'origin/master',
      repo: 'https://github.com/aftabaig/ge2018_server.git',
      path: '/home/deployer/ge2018_server',
      'post-deploy' : 'pm2 reload ecosystem.config.js --env production'
    }
  }
};
