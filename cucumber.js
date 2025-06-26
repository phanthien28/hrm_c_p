const path = require('path');

module.exports = {
    default: {
      requireModule: ['ts-node/register'],
      require: ['src/step-definitions/**/*.ts', 'src/support/**/*.ts'],
      paths: ['src/features/**/*.feature'],
      paths: ['src/features/**/*.feature'],
      format: [
        '@cucumber/pretty-formatter',
        //'html:reports/cucumber-report.html',
        'json:reports/cucumber-report.json',
        //'allure-cucumberjs/reporter'
      ],
      // formatOptions: { 
      //   resultsDir: "allure-results"
      // },
        
      //publishQuiet: true,
      parallel: 1,
      // parallelType: "features",
      retry: 0,
      worldParameters: {
        timeout: 60000,
        defaultNavigationTimeout: 45000
      }
    }
};