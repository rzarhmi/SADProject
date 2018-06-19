/**
 * Created by reza on 6/18/18.
 */

import org.openqa.selenium.By;
import org.openqa.selenium.Platform;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.remote.DesiredCapabilities;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.concurrent.TimeUnit;


public class TestAddTest {
    public static void main(String[] args) {
        System.setProperty("webdriver.gecko.driver", "C:\\Selenium\\geckodriver.exe");

        DesiredCapabilities capabilities = new DesiredCapabilities();

        capabilities = DesiredCapabilities.firefox();
        capabilities.setBrowserName("firefox");
        capabilities.setVersion("your firefox version");
        capabilities.setPlatform(Platform.WINDOWS);
        capabilities.setCapability("marionette", false);

        WebDriver driver = new FirefoxDriver(capabilities);

        String testName, testCost, testID, description;

        testName ="TOEFL";
        testCost = "225";
        testID = "10021";
        description = "adding toefl";

        driver.manage().timeouts().implicitlyWait(40, TimeUnit.SECONDS);
        driver.get("file:///home/reza/Phase%204/phase4-employer/AddTest.html");

        driver.findElement(By.id("current-charge")).sendKeys(testName);

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        driver.findElement(By.id("charge-amount")).sendKeys(testCost);

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        driver.findElement(By.id("card-number")).sendKeys(testID);

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        driver.findElement(By.id("note")).sendKeys(description);

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        boolean costValid = isCostValid(testCost);
        boolean descriptionValid = isdesValid(description);

        if (!costValid && !descriptionValid) return;

        driver.findElement(By.id("button")).click();

        if (!driver.getTitle().equals("test added")) {
            String output = "connection to server failed";
            writeLogToFile(output);
        }




    }

    private static boolean isCostValid(String cost){

        for (int i = 0; i < cost.length() ; i++) {
            if (!Character.isDigit(cost.charAt(i))){
                String output = "cost is not valid, let it be all number";
                writeLogToFile(output);
                return false;
            }
        }
        return true;
    }

    private static boolean isdesValid(String string){
        if (string.equals("")){
            String output = "description is not valid, write something";
            writeLogToFile(output);
            return false;
        }
        return true;
    }

    private static void writeLogToFile(String log){

        try (BufferedWriter out = new BufferedWriter(new FileWriter("test_addtest.txt"))){

            out.write(log);

        }
        catch (IOException e)
        {
            System.out.println("Exception ");

        }
    }
}
