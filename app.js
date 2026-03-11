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
function addSubject() {

  const box = document.getElementById("subjectList");

  const id = box.children.length;

  box.innerHTML += `
  <div class="subject">
  Subject:
  <input type="text" id="s${id}" placeholder="Subject Name">

  Credit:
  <input type="number" id="c${id}" placeholder="Credits">

  Marks:
  <input type="number" id="m${id}" placeholder="Marks">
  </div>
  `;

}
function marksToPoint(m){

 if(m>=90) return 10;
 if(m>=80) return 9;
 if(m>=70) return 8;
 if(m>=60) return 7;
 if(m>=50) return 6;
 if(m>=45) return 5;
 if(m>=40) return 4;

 return 0;
}
function calculateSGPA(){

 const box = document.getElementById("subjectList");

 let totalCredits = 0;
 let totalPoints = 0;

 for(let i=0;i<box.children.length;i++){

  const credit = parseFloat(document.getElementById(`c${i}`).value);
  const marks = parseFloat(document.getElementById(`m${i}`).value);

  if(isNaN(credit) || isNaN(marks)) continue;

  const gp = marksToPoint(marks);

  totalCredits += credit;
  totalPoints += credit * gp;

 }

 const sgpa = (totalPoints / totalCredits).toFixed(2);

 document.getElementById("sgpaResult").innerText = "SGPA: " + sgpa;

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
function calculateCGPA(){

 const data = JSON.parse(localStorage.getItem("cgpaData")) || {};

 let total = 0;
 let count = 0;

 for(let sem in data){

  total += data[sem];
  count++;

 }

 if(count === 0){
  alert("No SGPA saved yet");
  return;
 }

 const cgpa = (total / count).toFixed(2);

 document.getElementById("cgpaResult").innerText =
 "CGPA: " + cgpa;

}
function saveSGPA(){

 const sem = document.getElementById("semesterInput").value;
 const sgpa = parseFloat(document.getElementById("sgpaInput").value);

 if(!sem || isNaN(sgpa)){
  alert("Enter semester and SGPA");
  return;
 }

 let data = JSON.parse(localStorage.getItem("cgpaData")) || {};

 data[sem] = sgpa;

 localStorage.setItem("cgpaData", JSON.stringify(data));

 document.getElementById("saveMessage").innerText =
 "Semester " + sem + " SGPA saved";

}
