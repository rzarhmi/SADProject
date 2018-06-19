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

public class TestAddEmployee {
    public static void main(String[] args) {
        System.setProperty("webdriver.gecko.driver", "C:\\Selenium\\geckodriver.exe");

        DesiredCapabilities capabilities = new DesiredCapabilities();

        capabilities = DesiredCapabilities.firefox();
        capabilities.setBrowserName("firefox");
        capabilities.setVersion("your firefox version");
        capabilities.setPlatform(Platform.WINDOWS);
        capabilities.setCapability("marionette", false);

        WebDriver driver = new FirefoxDriver(capabilities);

        String employeeName, note;
        String monthlyWage;
        employeeName = "riza rahimi";
        monthlyWage = "200000";
        note = "adding riza";

        driver.manage().timeouts().implicitlyWait(40, TimeUnit.SECONDS);
        driver.get("file:///home/reza/Phase%204/phase4-employer/AddEmplyee.html");

        driver.findElement(By.id("current-charge")).sendKeys(employeeName);

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        driver.findElement(By.id("charge-amount")).sendKeys(monthlyWage);

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        driver.findElement(By.id("note")).sendKeys(note);

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

//        boolean nameValidity = isNameValid(employeeName);
        boolean wageValidity = isWageValid(monthlyWage);

        if (!wageValidity) return;

        driver.findElement(By.id("button")).click();

        if (!driver.getTitle().equals("employee added")) {
            String output = "connection to server failed";
            writeLogToFile(output);
        }
    }

    private static boolean isWageValid(String name){

        for (int i = 0; i < name.length(); i++) {
            if (!Character.isDigit(name.charAt(i))){
                String output = "wage is not valid, let it be all numbers";
                writeLogToFile(output);
                return false;
            }
        }
        return true;
    }

    private static void writeLogToFile(String log){

        try (BufferedWriter out = new BufferedWriter(new FileWriter("test_addemployee.txt"))){

            out.write(log);

        }
        catch (IOException e)
        {
            System.out.println("Exception ");

        }
    }

}


