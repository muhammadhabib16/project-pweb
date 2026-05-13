const User = require("../models/User");
const bcrypt = require("bcrypt");

// --- TAMBAHKAN INI: Untuk menampilkan halaman login ---
exports.getLogin = (req, res) => {
  // Jika user sudah login, jangan kasih login lagi, lempar ke dashboard
  if (req.session.user) {
    if (req.session.user.role === "pimpinan")
      return res.redirect("/pimpinan/dashboard");
    if (req.session.user.role === "pegawai")
      return res.redirect("/pegawai/dashboard");
  }
  res.render("auth/login", { error: null });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log("1. Password yang diketik user:", password);

  try {
    const user = await User.findByEmail(email);

    if (user) {
      console.log("2. Password Hash di DB:", user.password);

      const isMatch = await bcrypt.compare(password, user.password);
      console.log("3. Hasil Bcrypt Match:", isMatch);

      if (isMatch) {
        req.session.user = {
          id: user.id,
          name: user.name,
          role: user.role,
          permissions: user.permissions,
        };
        console.log("4. Session disimpan untuk role:", user.role);

        // Pastikan ada tujuan untuk 'admin'
        if (user.role === "admin") return res.redirect("/admin/dashboard");
        if (user.role === "pimpinan")
          return res.redirect("/pimpinan/dashboard");
        if (user.role === "pegawai") return res.redirect("/pegawai/dashboard");

        return res.redirect("/");
      }
    }

    console.log("5. Login Gagal (User null atau Password salah)");
    res.render("auth/login", { error: "Email atau Password salah!" });
  } catch (err) {
    console.error("ERROR SAAT LOGIN:", err);
    res.status(500).send("Server Error");
  }
};

// --- TAMBAHKAN INI: Untuk fungsi logout ---
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) console.log(err);
    res.redirect("/login");
  });
};
