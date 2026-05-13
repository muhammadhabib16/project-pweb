const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { isAuthenticated, authorizeRole } = require("../middlewares/authMiddleware");

// Rute Autentikasi Dasar
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);

// Rute Dashboard Berdasarkan Role
// Pastikan middleware isAuthenticated mengecek session, 
// dan authorizeRole mengecek role_id dari database/session.

router.get("/pegawai/dashboard", 
    isAuthenticated, 
    authorizeRole('Pegawai'), 
    (req, res) => {
        res.render("pegawai/dashboard");
    }
);

router.get("/pimpinan/dashboard", 
    isAuthenticated, 
    authorizeRole('Pimpinan'), 
    (req, res) => {
        res.render("pimpinan/dashboard");
    }
);

router.get("/admin/dashboard", 
    isAuthenticated, 
    authorizeRole('Admin'), 
    (req, res) => {
        res.render("admin/dashboard");
    }
);

module.exports = router;