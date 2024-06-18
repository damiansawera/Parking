package playwright.config.pages;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import playwright.config.PlaywrightManager;

@Slf4j
@NoArgsConstructor
public class BasePage<T extends BasePage<T>> {

    @Value("http://localhost:4200/")
    private String parkingUrl;

    public void goToDomain() {
        PlaywrightManager.initializePlaywright();
        PlaywrightManager.getPage().navigate(parkingUrl);
        log.debug("Navigating to URL: " +PlaywrightManager.getPage().url());
    }


    public Locator getVisibleElement(String selector) {
        Locator locator = PlaywrightManager.getPage().locator(selector).first();
        locator.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        return locator;
    }

    public void click(String selector) {
        getVisibleElement(selector).click();
    }
}
