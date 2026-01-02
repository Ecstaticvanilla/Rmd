const grid = document.getElementById("yearGrid");
const picker = document.getElementById("picker");

const year = new Date().getFullYear();
let activeDate = null;
let activeCell = null;
let db = {};

function formatDate(d) {
  return (
    d.getFullYear() + "-" +
    String(d.getMonth() + 1).padStart(2, "0") + "-" +
    String(d.getDate()).padStart(2, "0")
  );
}

async function loadDB() {
  try {
    const res = await fetch("/data");
    db = await res.json();
  } catch {
    alert("Failed to load data");
  }
}

async function save(date, mood) {
  try {
    await fetch("/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, mood })
    });
  } catch {
    alert("Save failed");
  }
}

function buildYear() {
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);
  const today = formatDate(new Date());

  let d = new Date(start);

  for (let i = 0; i < d.getDay(); i++) {
    grid.appendChild(document.createElement("div"));
  }

  while (d <= end) {
    const key = formatDate(d);
    const cell = document.createElement("div");
    cell.className = "day";

    if (db[key]) cell.classList.add(db[key]);
    if (key === today) cell.classList.add("today");

    cell.title = key;

    cell.onclick = () => {
      activeDate = key;
      activeCell = cell;
      picker.classList.remove("hidden");
    };

    grid.appendChild(cell);
    d.setDate(d.getDate() + 1);
  }
}

document.querySelectorAll(".mood").forEach(btn => {
  btn.onclick = async () => {
    if (!activeDate || !activeCell) return;

    const mood = btn.dataset.mood;
    db[activeDate] = mood;

    activeCell.className = "day " + mood;
    if (activeDate === formatDate(new Date())) {
      activeCell.classList.add("today");
    }

    await save(activeDate, mood);
    picker.classList.add("hidden");
  };
});

(async function init() {
  await loadDB();
  buildYear();
})();
