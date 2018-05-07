import org.openqa.selenium.By;
import org.openqa.selenium.Platform;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.remote.DesiredCapabilities;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.concurrent.TimeUnit;

/**
 * Created by reza on 4/29/18.
 */
public class test_signup {
    public static void main(String[] args) {
        System.setProperty("webdriver.gecko.driver", "C:\\Selenium\\geckodriver.exe");

        DesiredCapabilities capabilities = new DesiredCapabilities();

        capabilities = DesiredCapabilities.firefox();
        capabilities.setBrowserName("firefox");
        capabilities.setVersion("your firefox version");
        capabilities.setPlatform(Platform.WINDOWS);
        capabilities.setCapability("marionette", false);

        WebDriver driver = new FirefoxDriver(capabilities);

//        driver.get("https://maps.mapmyindia.com");

//        System.setProperty("webdriver.firefox.driver","/home/reza/tahlil_selenium/geckodriver");

//        DesiredCapabilities capabilities = new DesiredCapabilities();
//        DesiredCapabilities capabilities = new DesiredCapabilities();
//
//        capabilities = new ();
//        capabilities.setBrowserName("firefox");
//        capabilities.setVersion("your firefox version");
//        capabilities.setPlatform(Platform.WINDOWS);
//        capabilities.setCapability("marionette", false);
//
//        WebDriver driver = new FirefoxDriver();

        String username, mail, password;
        username = "admin";
        mail = "ra@google.com";
        password = "admin12";



        driver.manage().timeouts().implicitlyWait(40, TimeUnit.SECONDS);
        driver.get("file:///home/reza/tahlil_selenium/signupPage/signup.html");

        driver.findElement(By.id("name")).sendKeys(username);
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        driver.findElement(By.id("mail")).sendKeys(mail);
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        driver.findElement(By.id("password")).sendKeys(password);
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        boolean usernameValidity = isUsernameValid(username);
        boolean mailValidity = isMailValid(mail);
        boolean passwordValidity = isPasswordValid(password, username);

        if (!usernameValidity && !mailValidity && !passwordValidity) {
            return;
        }

        driver.findElement(By.id("under_13")).click();
        driver.findElement(By.id("signupButton")).click();

        if (!driver.getTitle().equals("Verify your mail")){
            String output = "connection to server failed.\ntest failed.";
            writeLogToFile(output);
        }


    }

    private static boolean isUsernameValid(String username) {
        if (username.length() < 6) {
            String output = "username can not have less than 6 characters.\ntest failed.";
            writeLogToFile(output);
            //TODO Write in file
            return false;
        }
        if (username.contains("/") || username.contains("\\") || username.contains("(") || username.contains("-")
                || username.contains(")") || username.contains("?") || username.contains("!") || username.contains("{")
                || username.contains("*") || username.contains("&") || username.contains("}") || username.contains("+")) {
            String output = "username with illegal characters.\ntest failed.";
            writeLogToFile(output);
            return false;
        }
        return true;

    }

    private static boolean isMailValid(String mail){
        if (!mail.contains("@") || !mail.contains(".") || mail.contains(" ")){
            String output = "invalid mail format.\ntest failed.";
            writeLogToFile(output);
            //TODO write in file
            return false;
        }
        return true;
    }

    private static boolean isPasswordValid(String password, String username){
        if (password.length() < 6){
            String output = "password is too weak.\ntest failed.";
            writeLogToFile(output);
            //TODO write in file
            return false;
        }
        if (password.equals(username)){
            String output = "username and password can not be the same.\ntest failed.";
            writeLogToFile(output);
            //TODO write in file
            return false;
        }
        return true;
    }

    private static void writeLogToFile(String log){

        try (BufferedWriter out = new BufferedWriter(new FileWriter("test_signup.txt"))){

            out.write(log);

        }
        catch (IOException e)
        {
            System.out.println("Exception ");

        }
    }
}
