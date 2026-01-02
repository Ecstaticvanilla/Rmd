const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const DB_FILE = path.join(__dirname, "db.json");

app.use(express.json());
app.use(express.static("public"));

function readDB() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({}, null, 2));
  }
  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

app.get("/data", (req, res) => {
  res.json(readDB());
});

app.post("/data", (req, res) => {
  const { date, mood } = req.body;

  if (
    typeof date !== "string" ||
    typeof mood !== "string"
  ) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const db = readDB();
  db[date] = mood;
  writeDB(db);

  res.json({ ok: true });
});

app.listen(3000, () => {
  console.log("Running → http://localhost:3000");
});
