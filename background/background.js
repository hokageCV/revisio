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
chrome.runtime.onInstalled.addListener((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(e);
    if (e.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        yield chrome.storage.sync.set({ isOnboarded: false });
        yield chrome.storage.sync.set({ darkMode: false });
        chrome.tabs.create({
            url: "./background/onboard/onboard.html", //this path has to be relative to root directory
        });
    }
    else if (e.reason === "update") {
        console.log("reloaded");
    }
}));
