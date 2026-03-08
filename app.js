// Semester → VTU URL mapping
const semesterUrls = {
  "1": "https://results.vtu.ac.in/DJcbcs24/index.php",
  "2": "https://results.vtu.ac.in/JJEcbcs24/index.php",
  "3": "https://results.vtu.ac.in/DJcbcs25/index.php",
  "4": "https://results.vtu.ac.in/JJEcbcs25/index.php"
  "5":"https://results.vtu.ac.in/D25J26Ecbcs/index.php"
};

// Load saved USN on start
window.onload = () => {
  const savedUSN = localStorage.getItem("lastUSN");
  if (savedUSN) {
    document.getElementById("usn").value = savedUSN;
  }
  updateCGPA();
};

// Open correct VTU result page
function openResult() {
  const usn = document.getElementById("usn").value.trim().toUpperCase();
  const sem = document.getElementById("semester").value;

  if (!usn) {
    alert("Enter USN");
    return;
  }

  if (!sem) {
    alert("Select Semester");
    return;
  }

  localStorage.setItem("lastUSN", usn);

  const url = semesterUrls[sem];
  window.open(url, "_blank");
}

// Copy USN
function copyUSN() {
  const usn = document.getElementById("usn").value.trim().toUpperCase();
  if (!usn) {
    alert("Enter USN first");
    return;
  }
  navigator.clipboard.writeText(usn);
  alert("USN copied");
}

// SGPA / CGPA
let sgpas = JSON.parse(localStorage.getItem("sgpas")) || [];

function saveSGPA() {
  const sgpa = parseFloat(document.getElementById("sgpa").value);
  if (!sgpa || sgpa <= 0 || sgpa > 10) {
    alert("Enter valid SGPA");
    return;
  }
  sgpas.push(sgpa);
  localStorage.setItem("sgpas", JSON.stringify(sgpas));
  document.getElementById("sgpa").value = "";
  updateCGPA();
}

function updateCGPA() {
  if (sgpas.length === 0) return;
  const total = sgpas.reduce((a, b) => a + b, 0);
  document.getElementById("cgpa").innerText =
    `CGPA: ${(total / sgpas.length).toFixed(2)}`;
}
