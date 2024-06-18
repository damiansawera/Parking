package playwright.config.tests;

import org.testng.annotations.Test;
import playwright.config.pages.ParkingSpotsPage;

public class parkingTests extends BaseTest {
    ParkingSpotsPage parkingSpotsPage = new ParkingSpotsPage();

    @Test
    public void addNewCarToParkingSpot() {
        homePage.selectParkingSpotsPage();
        parkingSpotsPage.SelectParkingSpot();
    }

}
