// app.js
const express = require("express");
const app = express();
const path = require("path");

// Mendaftarkan folder public agar bisa diakses secara publik
app.use(express.static(path.join(__dirname, "public")));

// Set View Engine (Misalnya EJS)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.send("Aplikasi Lembur B06 Siap!");
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
