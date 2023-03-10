const toggleBtn = document.getElementById("toggle-btn")!;
const body = document.querySelector("body")!;

document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get("darkMode", (data) => {
        if (data.darkMode) {
            body.classList.add("dark-mode");
        }
    });
});

toggleBtn.addEventListener("click", function () {
    body.classList.toggle("dark-mode");

    chrome.storage.sync.get("darkMode", (data) => {
        chrome.storage.sync.set({ darkMode: !data.darkMode });
    });
});
