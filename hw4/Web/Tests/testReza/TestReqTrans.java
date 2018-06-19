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


public class TestReqTrans {
    public static void main(String[] args) {
        System.setProperty("webdriver.gecko.driver", "C:\\Selenium\\geckodriver.exe");

        DesiredCapabilities capabilities = new DesiredCapabilities();

        capabilities = DesiredCapabilities.firefox();
        capabilities.setBrowserName("firefox");
        capabilities.setVersion("your firefox version");
        capabilities.setPlatform(Platform.WINDOWS);
        capabilities.setCapability("marionette", false);

        WebDriver driver = new FirefoxDriver(capabilities);

        String warning = "heads up bro";

        driver.manage().timeouts().implicitlyWait(40, TimeUnit.SECONDS);
        driver.get("file:///home/reza/Phase%204/Phase4-employee/RequestedTransations.html");

        driver.findElement(By.id("button1")).click();
        if (!driver.getTitle().equals("cnfirmed")){
            String output = "connection to server failed";
            writeLogToFile(output);
        }

    }

    private static void writeLogToFile(String log){

        try (BufferedWriter out = new BufferedWriter(new FileWriter("test_reqtrans.txt"))){

            out.write(log);

        }
        catch (IOException e)
        {
            System.out.println("Exception ");

        }
    }
}
