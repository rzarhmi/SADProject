let webdriver = require("selenium-webdriver");
let driver = new webdriver.Builder().forBrowser("firefox").build();

driver.get("file:///media/navidx/E658E07858E0493F/sharif%20uni/SystemAnalyzeDesign/project/git/hw4/Web/Phase%204-user/ChargeCredit.html");

setTimeout(function(){
    driver.findElement(webdriver.By.id('charge-amount')).sendKeys('500000');
    driver.findElement(webdriver.By.id('card-number')).sendKeys('21222122');

    driver.findElement(webdriver.By.id('cvv2')).sendKeys('629');
    driver.findElement(webdriver.By.id('note')).sendKeys('this will be a charge for amount of 6000');
//     driver.findElement(webdriver.By.id('telnum')).sendKeys('09197104871');
    setTimeout(()=>driver.findElement(webdriver.By.id('submitForm')).click(),3000)
    
},5000);
setTimeout(function(){
    driver.getTitle().then(function(title){
        console.log(title);
        if (title === 'AmountCharged'){
            console.log("success")
        }
        else{
            console.log("fail")
        }
    setTimeout(()=>{driver.quit();},2000);
});
},10000);



// let webdriver = require("selenium-webdriver");
// let driver = new webdriver.Builder().forBrowser("firefox").build();
// 
// driver.get("file:///media/navidx/E658E07858E0493F/sharif%20uni/SystemAnalyzeDesign/project/git/hw4/Web/Phase%204-user/EditProfile.html");
// 
// setTimeout(function(){
//     driver.getTitle().then(function(title){
//         console.log(title);
//         if (title === 'Google')
//             console.log("success")
//         else
//             console.log("fail")
//     setTimeout(()=>{driver.quit();},1000);
// });
// },5000);

 
