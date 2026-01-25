let sgpas = JSON.parse(localStorage.getItem("sgpas")) || [];


function openResult() {
    const usn = document.getElementById("usn").value.toUpperCase();
    const sem = document.getElementById("sem").value;


    if (!usn) {
        alert("Enter USN");
        return;
    }


    let url = "https://results.vtu.ac.in";
    if (sem !== "cbcs") {
        url += `/resultpage.php?USN=${usn}`;
    }

window.open("https://results.vtu.ac.in", "_blank");
} let sgpas = JSON.parse(localStorage.getItem("sgpas")) || [];


function openResult() {
    const usn = document.getElementById("usn").value.toUpperCase();
    const sem = document.getElementById("sem").value;


    if (!usn) {
        alert("Enter USN");
        return;
    }


    let url = "https://results.vtu.ac.in";
    if (sem !== "cbcs") {
        url += `/resultpage.php?USN=${usn}`;
    }


    window.open(url, "_blank");
}


function saveSGPA() {
    const sgpa = parseFloat(document.getElementById("sgpa").value);
    if (!sgpa) return;


    sgpas.push(sgpa);
    localStorage.setItem("sgpas", JSON.stringify(sgpas));


    const total = sgpas.reduce((a, b) => a + b, 0);
    const cgpa = (total / sgpas.length).toFixed(2);


    document.getElementById("cgpa").innerText = `CGPA: ${cgpa}`;

}
