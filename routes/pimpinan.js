const express = require("express");
const router = express.Router();
const {
  isAuthenticated,
  hasPermission,
} = require("../middlewares/authMiddleware");

// Halaman Dashboard Pimpinan
// Syarat: Harus login DAN punya izin 'view_laporan'
router.get(
  "/dashboard",
  isAuthenticated,
  hasPermission("view_laporan"),
  (req, res) => {
    res.render("pimpinan/dashboard", { user: req.session.user });
  },
);

// Aksi Membuat Penugasan (Fitur utama Bos)
// Syarat: Harus login DAN punya izin 'buat_penugasan'
router.post(
  "/tambah-tugas",
  isAuthenticated,
  hasPermission("buat_penugasan"),
  (req, res) => {
    // Logika simpan tugas...
  },
);

module.exports = router;
