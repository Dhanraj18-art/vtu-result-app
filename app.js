/***********************
 * RESULT URLS
 ***********************/
const resultUrls = {
    1: "https://results.vtu.ac.in/DJcbcs24/index.php?usn=",
    2: "https://results.vtu.ac.in/JJEcbcs24/index.php?usn=",
    3: "https://results.vtu.ac.in/DJcbcs25/index.php?usn=",
    4: "https://results.vtu.ac.in/JJEcbcs25/index.php?usn=",
    5: "https://results.vtu.ac.in/D25J26Ecbcs/index.php?usn="
};

/***********************
 * USER STORAGE
 ***********************/
let currentUSN = null;
let sgpaData = {};

function getUsers() {
    return JSON.parse(localStorage.getItem("vtuUsers")) || {};
}

function saveUsers(users) {
    localStorage.setItem("vtuUsers", JSON.stringify(users));
}

function loadUserData() {

    const usn = document.getElementById("usn").value.trim().toUpperCase();

    if (!usn) return;

    currentUSN = usn;

    const users = getUsers();

    if (!users[currentUSN]) {
        users[currentUSN] = { sgpaData: {} };
        saveUsers(users);
    }

    sgpaData = users[currentUSN].sgpaData;

    document.getElementById("cgpaResult").innerText = "CGPA: --";
}

/***********************
 * UI CONTROL
 ***********************/
function openCalculator() {

    document.getElementById("resultSection").style.display = "none";

    document.getElementById("calculatorSection").style.display = "block";
}

function goBack() {

    document.getElementById("calculatorSection").style.display = "none";

    document.getElementById("resultSection").style.display = "block";
}

/***********************
 * OPEN RESULT
 ***********************/
function openResult() {

    const sem = document.getElementById("semester").value;

    const usn = document.getElementById("usn").value.trim().toUpperCase();

    if (!usn) {
        alert("Enter USN first");
        return;
    }

    if (!sem) {
        alert("Select semester first");
        return;
    }

    const url = resultUrls[sem] + usn;

    window.open(url, "_blank");
}

/***********************
 * ECE 2022 SCHEME SYLLABUS
 ***********************/
const syllabus = {

    1: [
        ["Mathematics-I", 4],
        ["Applied Physics", 4],
        ["Basic Electronics", 3],
        ["ESC-I", 3],
        ["ETC-I / PLC-I", 3],
        ["English", 1],
        ["Kannada / Constitution", 1],
        ["IDT / SFH", 1]
    ],

    2: [
        ["Mathematics-II", 4],
        ["Chemistry", 4],
        ["Engineering Drawing", 3],
        ["ESC-II", 3],
        ["ETC-II / PLC-II", 3],
        ["English", 1],
        ["Kannada / Constitution", 1],
        ["IDT / SFH", 1]
    ],

    3: [
        ["Mathematics III", 3],
        ["Digital Electronics", 3],
        ["Network Analysis", 3],
        ["Electronic Devices", 3],
        ["Signals and Systems", 3],
        ["Digital Electronics Lab", 1],
        ["Electronic Devices Lab", 1],
        ["Constitution of India", 1]
    ],

    4: [
        ["Mathematics IV", 3],
        ["Analog Circuits", 3],
        ["Control Systems", 3],
        ["Microcontrollers", 3],
        ["Probability & Random Processes", 3],
        ["Analog Circuits Lab", 1],
        ["Microcontroller Lab", 1],
        ["Universal Human Values", 1]
    ],

    5: [
        ["Digital Signal Processing", 4],
        ["Communication Systems", 4],
        ["VLSI Design", 3],
        ["Embedded Systems", 3],
        ["Open Elective", 3],
        ["DSP Lab", 1],
        ["Mini Project", 2]
    ]
};

/***********************
 * SEMESTER CREDITS
 ***********************/
const semesterCredits = {
    1: 20,
    2: 20,
    3: 18,
    4: 18,
    5: 20,
    6: 18,
    7: 24,
    8: 16
};

/***********************
 * MARKS → GRADE POINT
 ***********************/
function marksToPoint(m) {

    if (m >= 90) return 10;
    if (m >= 80) return 9;
    if (m >= 70) return 8;
    if (m >= 60) return 7;
    if (m >= 50) return 6;
    if (m >= 45) return 5;
    if (m >= 40) return 4;

    return 0;
}

/***********************
 * LOAD SUBJECTS
 ***********************/
function loadSubjects() {

    const sem = document.getElementById("semester").value;

    const box = document.getElementById("subjects");

    box.innerHTML = "";

    if (!syllabus[sem]) return;

    syllabus[sem].forEach((sub, i) => {

        box.innerHTML += `
        <div class="subject">
            <b>${sub[0]}</b> (Credits: ${sub[1]})<br>
            <input type="number" id="m${i}" placeholder="Marks out of 100">
        </div>
        `;
    });
}

/***********************
 * SAVE SGPA
 ***********************/
function saveSGPA() {

    if (!currentUSN) {
        alert("Enter USN first");
        return;
    }

    const sem = document.getElementById("semester").value;

    let totalCredits = 0;
    let totalPoints = 0;

    syllabus[sem].forEach((sub, i) => {

        const marks = parseFloat(document.getElementById(`m${i}`).value);

        if (isNaN(marks)) return;

        const gp = marksToPoint(marks);

        totalCredits += sub[1];

        totalPoints += sub[1] * gp;
    });

    const sgpa = (totalPoints / totalCredits).toFixed(2);

    document.getElementById("sgpaResult").innerText = "SGPA: " + sgpa;

    const users = getUsers();

    users[currentUSN].sgpaData[sem] = parseFloat(sgpa);

    saveUsers(users);

    sgpaData = users[currentUSN].sgpaData;
}

/***********************
 * CALCULATE CGPA
 ***********************/
function calculateCGPA() {

    let sum = 0;
    let credits = 0;

    for (let s in sgpaData) {

        sum += sgpaData[s] * semesterCredits[s];

        credits += semesterCredits[s];
    }

    if (credits === 0) {

        alert("No SGPA saved yet");

        return;
    }

    document.getElementById("cgpaResult").innerText =
        "CGPA: " + (sum / credits).toFixed(2);
}
