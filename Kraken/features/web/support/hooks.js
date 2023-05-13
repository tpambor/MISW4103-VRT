const { After, Before, AfterStep } = require('@cucumber/cucumber');
const { WebClient } = require('kraken-node');
const Screenshots = require('./screenshots');
let screenshots;

Before(async function(scenario) {
  this.deviceClient = new WebClient('chrome', {}, this.userId);
  this.driver = await this.deviceClient.startKrakenForUserId(this.userId);
  const path = scenario.pickle.name.replace(/\s+/g, '');
  screenshots = new Screenshots(path);
  screenshots.createScreenshotsDir();
  screenshots.createFunctionDir();
});

AfterStep(async function() {
  await this.driver.saveScreenshot(screenshots.getName());
});

After(async function() {
  await this.deviceClient.stopKrakenForUserId(this.userId);
});