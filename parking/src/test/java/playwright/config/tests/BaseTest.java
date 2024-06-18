package playwright.config.tests;

import lombok.extern.slf4j.Slf4j;
import org.assertj.core.util.Sets;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeMethod;
import playwright.config.PlaywrightManager;
import playwright.config.pages.HomePage;

import java.util.Set;

@Slf4j
public class BaseTest {

    private static Set<Long> threadIds = Sets.newHashSet();
    public HomePage homePage;

    @BeforeMethod(alwaysRun = true)
    public void goToHomePage() {
        PlaywrightManager.getPage().navigate("http://localhost:4200/");
        homePage = new HomePage();
    }

    @BeforeMethod(alwaysRun = true)
    public void addToThreads() {
        threadIds.add(Thread.currentThread().getId());
    }

    @AfterMethod(alwaysRun = true)
    public void closePlaywrightPage() {
        PlaywrightManager.closePage();
    }

    @AfterSuite(alwaysRun = true)
    public void closePlaywright() {
        PlaywrightManager.closePlaywright();
    }
}
