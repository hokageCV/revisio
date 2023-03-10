"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log("onboard is running");
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("input");
    const btn = document.getElementById("btn");
    btn.addEventListener("click", () => saveName(input));
    input.addEventListener("keydown", (e) => {
        let keyCode = e.code || e.key;
        if (keyCode === "Enter") {
            e.preventDefault();
            saveName(input);
        }
    });
});
const saveName = (input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield chrome.storage.sync.set({ userName: input.value });
        yield chrome.storage.sync.set({ isOnboarded: true });
        window.close();
        chrome.tabs.create({ url: "chrome://newtab" });
    }
    catch (err) {
        console.log(err);
    }
});
