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
      path : '~/root/ge2018',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env staging'
    }
  }
};
