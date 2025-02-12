const questions = [
    { id: 1, type: "radio", question: "1) Which country first colonized India?", options: ["Portugal", "Dutch", "Britain", "France"], correct: 0 },
    { id: 2, type: "checkbox", question: "2) What are the official languages of India?", options: ["Tamil", "Hindi", "Telugu", "English"], correct: [1, 3] },
    { id: 3, type: "dropdown", question: "3) What is the capital of Portugal?", options: ["London", "Barcelona", "Lisbon", "Madrid"], correct: 2 },
    { id: 4, type: "text", question: "4) What is the largest mammal?", correct: "Blue Whale" },
    { id: 5, type: "radio", question: "5) How many sides are in Nanogon?", options: ["7", "8", "9", "10"], correct: 2 },
    { id: 6, type: "checkbox", question: "6) What are the functions of OS?", options: ["Memory management", "Storage management", "Resource management", "None of the above"], correct: [0, 1, 2] },
    { id: 7, type: "dropdown", question: "7) What is the second stage of Data Science Process?", options: ["Goal Setting", "Data Mining", "Building a Model", "Data Acquisition"], correct: 3 },
    { id: 8, type: "text", question: "8) Who invented the Turing machine?", correct: "Alan Turing" },
    { id: 9, type: "radio", question: "9) What is the oldest software development model?", options: ["Waterfall model", "Agile model", "Rapid Application model", "V shape model"], correct: 0 },
    { id: 10, type: "checkbox", question: "10) What are the non-linear data structures?", options: ["Graph", "Stack", "Queue", "Tree"], correct: [0, 3] },
    { id: 11, type: "dropdown", question: "11) Which company developed Elden Ring?", options: ["Santa Monica Studios", "Rockstar Games", "From Software", "Ubisoft"], correct: 2 },
    { id: 12, type: "text", question: "12) Who is the protagonist of God of War?", correct: "Kratos" },
    { id: 13, type: "radio", question: "13) How many protagonists are in GTA V?", options: ["2", "3", "4", "5"], correct: 1 },
    { id: 14, type: "checkbox", question: "14) Who are the main characters in The Last Of Us?", options: ["Tommy", "Rebecca", "Joel", "Ellie"], correct: [2, 3] },
    { id: 15, type: "dropdown", question: "15) In which game did Lady Dimitrescu appear?", options: ["Resident Evil", "Bloodborne", "Dark Souls", "Devil May Cry"], correct: 0 },
    { id: 16, type: "text", question: "16) Who is the protagonist of Attack On Titan?", correct: "Eren Yeager" },
    { id: 17, type: "radio", question: "17) What is the real name of L in Death Note?", options: ["Lelouch", "Levi", "Lawliet", "Laufey"], correct: 2 },
    { id: 18, type: "checkbox", question: "18) Who are the arch enemies?", options: ["Gojo", "Yuji", "Mahito", "Nanami"], correct: [1, 3] },
    { id: 19, type: "dropdown", question: "19) Who is the strongest character in One Punch Man?", options: ["Genos", "Boros", "Blast", "Saitama"], correct: 3 },
    { id: 20, type: "text", question: "20) What is the last name of Edward in Fullmetal Alchemist?", correct: "Elric" }
];

