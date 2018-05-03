//Put this at the top of the file:
import org.openqa.selenium.By;
import org.openqa.selenium.Platform;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.remote.DesiredCapabilities;

import java.io.*;
import java.util.*;
import java.util.concurrent.TimeUnit;

/**
 * Created by reza on 4/29/18.
 */
public class test_pannel {
    public static void main(String[] args) {


//Add this to write a string to a file
//
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

//        String username, mail, password;
//        username = "admin123";
//        mail = "ra@google.com";
//        password = "admin12";

        String message = "THIS IS A TEST"; //Put msg here

        driver.manage().timeouts().implicitlyWait(40, TimeUnit.SECONDS);
        driver.get("file:///home/reza/tahlil_selenium/pannelPage/panel.html");

        driver.findElement(By.id("msgText")).sendKeys(message);
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        driver.findElement(By.id("button")).click();
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        if (!driver.getTitle().equals("success")){
            String output = "connection to server failed.\ntest failed.";
            writeLogToFile(output);
        }


    }

    private static void writeLogToFile(String log){
        try (BufferedWriter out = new BufferedWriter(new FileWriter("test_pannel.txt"))){

            out.write(log);

        }
        catch (IOException e)
        {
            System.out.println("Exception ");

        }
    }
}
