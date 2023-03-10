document.addEventListener("DOMContentLoaded", () => {
    // chrome.storage.sync.get("darkMode", (data) => {
    //     if (data.darkMode) {
    //         document.body.classList.add("dark-mode");
    //     }
    // });

    fetchNDisplayData();
});

// chrome.storage.onChanged.addListener((changes, namespace) => {
//     if (namespace === "sync" && changes.darkMode) {
//         const newValue = changes.darkMode.newValue;

//         document.body.classList.toggle("dark-mode");
//         console.log(
//             `dark mode ${newValue ? "on" : "off"}, newValue is :`,
//             newValue
//         );
//     }
// });

// ===================================================================
// ======================= Data.ts (modularize this) =================
// ===================================================================

type FetchedData = {
    id: number;
    subject: string;
    question: string;
    answer: string;
};
type StoredData = FetchedData & { date: string };

const fetchData = async (): Promise<StoredData> => {
    const API_URL = "https://hokagecv.github.io/revisio-data/data.json";

    try {
        const response = await fetch(API_URL);
        const json = await response.json();

        return selectRandomlyFromData(json);
    } catch (err) {
        console.error("error while fetching :", err);
        return {
            id: 0,
            subject: "stydy",
            question: "Bada Sapno Ka Size Toh ..",
            answer: "..Bada Prize Aur Sacrifice",
            date: new Date().toString(),
        };
    }
};

const selectRandomlyFromData = (data: FetchedData[]): StoredData => {
    const randomElement = data[Math.floor(Math.random() * data.length)];
    return { ...randomElement, date: new Date().toString() };
};

const displayData = (data: StoredData | FetchedData) => {
    const question = document.getElementById("question")!;
    const answer = document.getElementById("answer")!;

    question.innerText = data.question;
    answer.innerText = data.answer;
};

const storeData = async (data: FetchedData) => {
    await chrome.storage.sync.set({
        QAData: {
            id: data.id,
            subject: data.subject,
            question: data.question,
            answer: data.answer,
            date: new Date().toString(),
        },
    });
};

const isDataOlderThanToday = (storedData: StoredData) => {
    const storedDate = new Date(storedData.date);

    const today = new Date();

    // return true if stored date is older than today.
    return storedDate.toDateString() !== today.toDateString();
};

const getStoredData = async (): Promise<StoredData | null> => {
    const data = await chrome.storage.sync.get(["QAData"]);

    if (data.QAData && !isDataOlderThanToday(data.QAData)) {
        return data.QAData;
    } else return null;
};

const fetchNDisplayData = async () => {
    const storedData = await getStoredData();

    if (storedData && !isDataOlderThanToday(storedData)) {
        displayData(storedData);
    } else {
        const data = await fetchData();
        await storeData(data);
        displayData(data);
    }
};

// ===================================================================
// ======================= Data.ts END=================
// ===================================================================
