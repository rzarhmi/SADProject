let assert = require("assert");
let webdriver = require("selenium-webdriver");
let driver = new webdriver.Builder().forBrowser("chrome").build();

driver.get("https://www.google.com");
let val;
driver.getTitle().then(function(title){
    console.log(title);
    val = title;
    console.log("\n")

});
//console.log(assert.equal("Google",val));
