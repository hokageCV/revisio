console.log("popup is running");

const newTabBtn = document.getElementById("new-tab-btn")!;
newTabBtn.addEventListener("click", () => {
    const message = { command: "change new tab bg color" };

    chrome.tabs.query({}, (tabs) => {
        for (const tab of tabs) {
            chrome.tabs.sendMessage(tab.id as number, message);
        }
    });
});
