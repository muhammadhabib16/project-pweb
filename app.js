// app.js
require("dotenv").config(); // Wajib agar file .env terbaca
const express = require("express");
const path = require("path");
const session = require("express-session");

const app = express();

// 2. Folder statis (CSS, JS, Images)
app.use(express.static(path.join(__dirname, "public")));
const authRoutes = require("./routes/authRoutes");

// 1. Parser untuk data form dan JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 3. Konfigurasi Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "rahasia_bos_123", // Pakai dari .env jika ada
    resave: false,
    saveUninitialized: false, // Disarankan false agar tidak membuat session kosong
    cookie: {
      secure: false, // Set true jika pakai HTTPS
      maxAge: 1000 * 60 * 60, // 1 jam
    },
  }),
);

// 4. View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 5. Routes
app.get("/", (req, res) => {
  res.redirect("/login");
});

app.use("/", authRoutes);

// 6. Jalankan Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
