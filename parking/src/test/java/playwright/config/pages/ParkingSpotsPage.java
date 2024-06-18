package playwright.config.pages;

import playwright.config.PlaywrightManager;

public class ParkingSpotsPage extends BasePage<ParkingSpotsPage> {

    private static final String SELECT_PARKING_SPOT_BUTTON = "#available-button";


    public ParkingSpotsPage SelectParkingSpot() {
        PlaywrightManager.getPage().locator(SELECT_PARKING_SPOT_BUTTON).first().click();
        return this;
    }
}
