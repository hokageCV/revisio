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
document.addEventListener("DOMContentLoaded", () => {
    updateDarkModeClass();
    fetchNDisplayData();
});
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === "sync" && changes.darkMode) {
        updateDarkModeClass();
    }
});
// ===================================================================
// ======================= updateDarkMode.ts (modularize this) =======
// ===================================================================
const updateDarkModeClass = () => {
    chrome.storage.sync.get("darkMode", (data) => {
        const darkMode = data.darkMode || false;
        document.body.classList.toggle("dark-mode", darkMode);
    });
};
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    const API_URL = "https://hokagecv.github.io/revisio-data/data.json";
    try {
        const response = yield fetch(API_URL);
        const json = yield response.json();
        return selectRandomlyFromData(json);
    }
    catch (err) {
        console.error("error while fetching :", err);
        return {
            id: 0,
            subject: "stydy",
            question: "Bada Sapno Ka Size Toh ..",
            answer: "..Bada Prize Aur Sacrifice",
            date: new Date().toString(),
        };
    }
});
const selectRandomlyFromData = (data) => {
    const randomElement = data[Math.floor(Math.random() * data.length)];
    return Object.assign(Object.assign({}, randomElement), { date: new Date().toString() });
};
const displayData = (data) => {
    const question = document.getElementById("question");
    const answer = document.getElementById("answer");
    question.innerText = data.question;
    answer.innerText = data.answer;
};
const storeData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield chrome.storage.sync.set({
        QAData: {
            id: data.id,
            subject: data.subject,
            question: data.question,
            answer: data.answer,
            date: new Date().toString(),
        },
    });
});
const isDataOlderThanToday = (storedData) => {
    const storedDate = new Date(storedData.date);
    const today = new Date();
    // return true if stored date is older than today.
    return storedDate.toDateString() !== today.toDateString();
};
const getStoredData = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield chrome.storage.sync.get(["QAData"]);
    if (data.QAData && !isDataOlderThanToday(data.QAData)) {
        return data.QAData;
    }
    else
        return null;
});
const fetchNDisplayData = () => __awaiter(void 0, void 0, void 0, function* () {
    const storedData = yield getStoredData();
    if (storedData && !isDataOlderThanToday(storedData)) {
        displayData(storedData);
    }
    else {
        const data = yield fetchData();
        yield storeData(data);
        displayData(data);
    }
});
// ===================================================================
// ======================= Data.ts END=================
// ===================================================================
