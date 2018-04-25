
const {Builder, By, until} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver')
//
// let driver = new Builder()
//     .forBrowser('Chrome')
//     .build();
let driver = new webdriver.Builder().
usingServer('http://localhost:9515').
withCapabilities(webdriver.Capabilities.chrome()).
build();
driver.get('http://www.google.com/ncr');
driver.findElement(By.name('q')).sendKeys('webdriver');
driver.findElement(By.name('btnK')).click();
driver.wait(until.titleIs('webdriver - Google Search'), 1000);
driver.quit();