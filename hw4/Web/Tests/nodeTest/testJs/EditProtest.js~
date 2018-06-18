let webdriver = require("selenium-webdriver");
let driver = new webdriver.Builder().forBrowser("firefox").build();

driver.get("file:///media/navidx/E658E07858E0493F/sharif%20uni/SystemAnalyzeDesign/project/git/hw4/Web/Phase%204-user/EditProfile.html");

setTimeout(function(){
    driver.findElement(webdriver.By.id('usrname')).sendKeys('navidpadid');
        driver.findElement(webdriver.By.id('frstname')).sendKeys('navidpadid');

    driver.findElement(webdriver.By.id('lstname')).sendKeys('navidpadid');
    driver.findElement(webdriver.By.id('defaultForm-email')).sendKeys('navidpadid@fsdf.com');
    driver.findElement(webdriver.By.id('telnum')).sendKeys('09197104871');


    driver.findElement(webdriver.By.id('submitForm')).click();
},5000);
setTimeout(function(){
    driver.getTitle().then(function(title){
        console.log(title);
        if (title === 'ProfileSaved'){
            console.log("success")
            driver.get("file:///media/navidx/E658E07858E0493F/sharif%20uni/SystemAnalyzeDesign/project/git/hw4/Web/Phase%204-user/EditProfile.html");

        }
        else{
            console.log("fail")
            driver.get("file:///media/navidx/E658E07858E0493F/sharif%20uni/SystemAnalyzeDesign/project/git/hw4/Web/Phase%204-user/EditProfile.html");
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

