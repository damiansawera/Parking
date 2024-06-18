package playwright.config;

import com.microsoft.playwright.*;
import lombok.extern.slf4j.Slf4j;

import java.util.Map;

@Slf4j
public class PlaywrightManager {

    private static ThreadLocal<Playwright> playwrightThread = new ThreadLocal<>();
    private static ThreadLocal<Browser> browserThread = new ThreadLocal<>();
    private static ThreadLocal<Page> pageThread = new ThreadLocal<>();
    private static ThreadLocal<BrowserContext> browserContextThread = new ThreadLocal<>();

    public static void initializePlaywright() {
        log.debug("Initializing Playwright");

        if (playwrightThread.get() == null) {
            Playwright.CreateOptions createOptions = new Playwright.CreateOptions();
            createOptions.setEnv(
                    Map.of(
                            "NODE_TLS_REJECT_UNAUTHORIZED","0"));
                    playwrightThread.set(Playwright.create(createOptions));
        }

        if (browserThread.get() == null) {
            browserThread.set(
                    playwrightThread
                            .get()
                            .chromium()
                            .launch(
                                    new BrowserType.LaunchOptions()
                                            .setHeadless(false)
                                            .setChannel("chrome")));
        }
        if (browserContextThread.get() == null) {
            browserContextThread.set(browserThread.get().newContext());
        }

        if (pageThread.get() == null) {
            pageThread.set(browserContextThread.get().newPage());
        }
        log.debug("Initialize Playwright");
}
public static void closePlaywright() {
        log.debug("Cleaning Playwright");
        closePage();

        Browser browser = browserThread.get();
        if (browser != null) {
            browser.close();
        }
        browserThread.remove();

        Playwright playwright = playwrightThread.get();
        if (playwright != null) {
            playwright.close();
        }
        playwrightThread.remove();
        log.debug("Cleaned Playwright");
}

public static void closePage() {
        Page page = pageThread.get();
        if (page != null) {
            browserContextThread.get().pages().forEach(Page::close);
        }
        pageThread.remove();

        BrowserContext browserContext = browserContextThread.get();
        if (browserContext != null) {
            browserContext.close();
        }
        browserContextThread.remove();
}

public static Page getPage() {
        return  getPage();
}
}
