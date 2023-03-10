chrome.runtime.onInstalled.addListener(async (e) => {
    if (e.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        await chrome.storage.sync.set({ isOnboarded: false });
        await chrome.storage.sync.set({ darkMode: false });

        chrome.tabs.create({
            url: "./background/onboard/onboard.html", //this path has to be relative to root directory
        });
    } else if (e.reason === "update") {
        console.log("reloaded");
    }
});
