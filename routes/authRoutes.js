const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { isAuthenticated } = require("../middlewares/authMiddleware");

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);

// Route Dashboard Admin
router.get("/admin/dashboard", isAuthenticated, (req, res) => {
  // Pastikan Bos punya file views/admin/dashboard.ejs
  res.render("admin/dashboard", { user: req.session.user });
});

// Route Dashboard Pimpinan
router.get("/pimpinan/dashboard", isAuthenticated, (req, res) => {
  // Pastikan Bos punya file views/admin/dashboard.ejs
  res.render("pimpinan/dashboard", { user: req.session.user });
});
module.exports = router;
