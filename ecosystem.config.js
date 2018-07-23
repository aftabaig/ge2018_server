module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [{
      name      : 'tabdeeli_api',
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
    },
    {
      name      : 'tabdeeli_worker',
      script    : 'bin/worker.js',
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
      key  : '/Users/aftab.akhtar/.ssh/tabdeeli',
      user : 'aftab',
      host : 'tabdeeliapp.ssasoft.com',
      ref  : 'origin/master',
      repo : 'git@git.ssasoft.com:tabdeeli/api.git',
      path : '/home/aftab/tabdeeli',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env staging'
    }
  }
};
