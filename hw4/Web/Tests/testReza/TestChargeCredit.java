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


public class TestChargeCredit {
    public static void main(String[] args) {
        System.setProperty("webdriver.gecko.driver", "C:\\Selenium\\geckodriver.exe");

        DesiredCapabilities capabilities = new DesiredCapabilities();

        capabilities = DesiredCapabilities.firefox();
        capabilities.setBrowserName("firefox");
        capabilities.setVersion("your firefox version");
        capabilities.setPlatform(Platform.WINDOWS);
        capabilities.setCapability("marionette", false);

        WebDriver driver = new FirefoxDriver(capabilities);
        String chargeAmnt, cardPin, cvv2;

        chargeAmnt = "20000";
        cardPin = "12548233";
        cvv2 = "4125";

        driver.manage().timeouts().implicitlyWait(40, TimeUnit.SECONDS);
        driver.get("file:///home/reza/Phase%204/phase4-employer/ChargeCredit.html");

        driver.findElement(By.id("charge-amount")).sendKeys(chargeAmnt);

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        driver.findElement(By.id("card-number")).sendKeys(cardPin);

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        driver.findElement(By.id("cvv2")).sendKeys(cvv2);

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        boolean chargeAmntValid = isChargeAmntValid(chargeAmnt);
        boolean  cardPinValid = isCardPinValid(cardPin);
        boolean cvv2Valid = isCvv2Valid(cvv2);

        if (!chargeAmntValid && !cardPinValid && !cvv2Valid) return;

        driver.findElement(By.id("button")).click();

        if (!driver.getTitle().equals("credit charged")){
            String output = "connection to server failed.";
            writeLogToFile(output);
        }

    }

    private static boolean isChargeAmntValid (String string){
        for (int i = 0; i < string.length(); i++) {
            if (!Character.isDigit(string.charAt(i))){
                String output = "Charge Amount not valid.";
                writeLogToFile(output);
            }
        }
        return true;
    }

    private static boolean isCardPinValid(String string){
        for (int i = 0; i < string.length(); i++) {
            if (!Character.isDigit(string.charAt(i))){
                String output = "Card Pin not valid.";
                writeLogToFile(output);
            }
        }
        return true;
    }

    private static boolean isCvv2Valid(String string){
        for (int i = 0; i < string.length(); i++) {
            if (!Character.isDigit(string.charAt(i))){
                String output = "CVV2 not valid.";
                writeLogToFile(output);
            }
        }
        return true;
    }

    private static void writeLogToFile(String log){

        try (BufferedWriter out = new BufferedWriter(new FileWriter("test_chargeCredit.txt"))){

            out.write(log);

        }
        catch (IOException e)
        {
            System.out.println("Exception ");

        }
    }
}
