package playwright.config.pages;

public class HomePage extends BasePage<HomePage> {

    private static final String PARKING_SPOTS_BUTTON = "#spots";


    public HomePage selectParkingSpotsPage() {
        click(PARKING_SPOTS_BUTTON);
        return this;
    }
}
