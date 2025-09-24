// backend/server.js
const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");

const app = express();
app.use(cors());
app.use(express.json());

// Buat / buka DB
const db = new Database("ffb.db");

// Buat tabel (sekali saja)
db.prepare(
  `
CREATE TABLE IF NOT EXISTS trips (
  id TEXT PRIMARY KEY,
  driver TEXT,
  vehicle TEXT,
  mill TEXT,
  scheduledDate TEXT,
  status TEXT
)
`
).run();

// Seed data contoh kalau kosong
const count = db.prepare("SELECT COUNT(*) AS c FROM trips").get().c;
if (count === 0) {
  console.log("Seeding 1000 trips...");
  const insert = db.prepare("INSERT INTO trips VALUES (?, ?, ?, ?, ?, ?)");
  for (let i = 0; i < 1000; i++) {
    insert.run(`t${i}`, `Driver ${i}`, `Vehicle ${i}`, `Mill ${i}`, new Date().toISOString(), i % 3 === 0 ? "completed" : "scheduled");
  }
}

// Endpoint GET semua trip
app.get("/trips", (req, res) => {
  const limit = parseInt(req.query.limit || "100", 10);
  const offset = parseInt(req.query.offset || "0", 10);
  const trips = db.prepare("SELECT * FROM trips LIMIT ? OFFSET ?").all(limit, offset);
  res.json(trips);
});


// Endpoint tambah trip
app.post("/trips", (req, res) => {
  console.log("POST /trips body:", req.body); // ✅ cek request
  const { id, driver, vehicle, mill, scheduledDate, status } = req.body;
  try {
    const insert = db.prepare("INSERT INTO trips (id, driver, vehicle, mill, scheduledDate, status) VALUES (?, ?, ?, ?, ?, ?)");
    insert.run(id, driver, vehicle, mill, scheduledDate, status);
    res.status(201).json({ id, driver, vehicle, mill, scheduledDate, status });
  } catch (err) {
    console.error("DB Insert error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Endpoint update status trip
app.put("/trips/:id", (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  db.prepare("UPDATE trips SET status=? WHERE id=?").run(status, id);
  const updated = db.prepare("SELECT * FROM trips WHERE id=?").get(id);
  res.json(updated);
});

// Jalankan server
const PORT = 4000;
app.listen(PORT, () => console.log(`API server running on http://localhost:${PORT}`));
