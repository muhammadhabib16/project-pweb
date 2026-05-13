// app.js

const express = require("express");
const path = require("path");
const session = require("express-session");

const app = express();
const authRoutes = require("./routes/authRoutes");

// Membaca data form POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Folder public agar CSS, JS, dan gambar bisa diakses
app.use(express.static(path.join(__dirname, "public")));

// Session
app.use(
  session({
    secret: "rahasia_bos_123",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60, // 1 jam
    },
  })
);


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// Test route
app.get("/", (req, res) => {
  res.redirect("/login");
});

// Auth routes
app.use("/", authRoutes);


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});