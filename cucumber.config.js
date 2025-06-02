const path = require('path');

module.exports = {
    default: {
      requireModule: ['ts-node/register'],
      require: ['src/step-definitions/**/*.ts', 'src/support/**/*.ts'],
      paths: ['src/features/**/*.feature'],
      format: ['@cucumber/pretty-formatter'],
      //publishQuiet: true,
      parallel: 1,
      // parallelType: "features",
      retry: 0,
      worldPrameters: {
        timeout: 60000,
        defaultNavigationTimeout: 45000
      }
    }
  };