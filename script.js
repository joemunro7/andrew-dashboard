// 1) set your password here
const SITE_PASSWORD = "Teo07503*";

// 2) Looker Studio links
const REPORT_URL = "https://lookerstudio.google.com/reporting/2fcac423-160d-4ea6-aead-23448b375b68";  // paste your share link
const EMBED_URL = "";   // paste embed URL if you have one

function formatUKDateTime(){
  return new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });
}

// password gate logic
const gate = document.getElementById("gate");
const site = document.getElementById("site");
const gateForm = document.getElementById("gateForm");
const gatePassword = document.getElementById("gatePassword");
const gateError = document.getElementById("gateError");

function unlockSite(){
  gate.style.display = "none";
  site.style.display = "block";
}

function lockSite(){
  localStorage.removeItem("am_site_unlocked");
  location.reload();
}

if (localStorage.getItem("am_site_unlocked") === "true") {
  unlockSite();
} else {
  // keep site hidden until unlocked
  site.style.display = "none";
}

gateForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const entered = (gatePassword.value || "").trim();
  if (entered === SITE_PASSWORD) {
    localStorage.setItem("am_site_unlocked", "true");
    gateError.textContent = "";
    unlockSite();
  } else {
    gateError.textContent = "Incorrect password.";
    gatePassword.value = "";
    gatePassword.focus();
  }
});

// normal page setup
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastRefresh").textContent = formatUKDateTime();

// hook up report button
const openReport = document.getElementById("openReport");
if (REPORT_URL && REPORT_URL.trim().length > 0) {
  openReport.href = REPORT_URL;
} else {
  openReport.href = "#";
  openReport.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Add your Looker Studio link in script.js (REPORT_URL).");
  });
}

// embed in iframe if provided
const frame = document.getElementById("reportFrame");
if (EMBED_URL && EMBED_URL.trim().length > 0) {
  frame.src = EMBED_URL;
} else {
  frame.style.display = "none";
}

// optional: add a simple logout shortcut (press L)
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "l" && (e.ctrlKey || e.metaKey)) {
    lockSite();
  }
});
