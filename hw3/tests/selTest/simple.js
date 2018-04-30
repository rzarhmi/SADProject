let assert = require("assert").strict;
let sleep = require("thread-sleep");
let webdriver = require("selenium-webdriver");
let driver = new webdriver.Builder().forBrowser("chrome").build();

driver.get("https://www.google.com");

setTimeout(function(){
    driver.getTitle().then(function(title){
        console.log(title);
        if (title === 'Google')
            console.log(assert.strictEqual(title,'Google'))
            //console.log("success")
        else
            console.log("fail")
    setTimeout(()=>{driver.quit();},1000);
});
},3000);




// driver.wait(webdriver.until.titleIs('Google'), 1000);

// driver.wait(webdriver.until.elementLocated({xpath : '//*[@id="tsf"]/div[2]/div[3]/center/input[1]'}),5000);



//driver.manage().timeouts().implicitlyWait(5000);
// driver.sleep(3000);
// let val = driver.wait(webdriver.until.elementLocated({xpath : '//*[@id="tsf"]/div[2]/div[3]/center/input[1]'}));
// val.getText().then(function(txt){
//    console.log(txt); 
//    
//});
//driver.quit();
// driver.wait(webdriver.until.elementLocated({xpath : '//*[@id="lst-ib"]'}).then(function(title){
//     console.log(title);
//     console.log(assert.equal("Google",title));
// })
// ,1000);
//  driver.wait(webdriver.i.titleIs('Google'));
// 
// driver.getTitle().then(function(title){
//     console.log(title);
//     console.log(assert.equal("Google",title));
// });
