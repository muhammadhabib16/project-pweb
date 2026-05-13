const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.getLogin = (req, res) => {
  res.render("auth/login", { error: null });
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findByUsername(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      // Simpan informasi user dan role ke dalam session
      req.session.user = {
        id: user.id,
        username: user.username,
        role: user.role, // Pastikan nilai ini 'Pegawai', 'Pimpinan', atau 'Admin'
        nama: user.name,
      };

      // Redirect berdasarkan role sesuai rute yang sudah kita buat [cite: 39, 43]
      // Gunakan lowercase untuk pengecekan agar lebih aman jika ada perbedaan kapitalisasi
      const userRole = user.role.toLowerCase();

      if (userRole === "pimpinan") {
        return res.redirect("/pimpinan/dashboard");
      } else if (userRole === "pegawai") {
        return res.redirect("/pegawai/dashboard");
      } else if (userRole === "admin") {
        return res.redirect("/admin/dashboard");
      }
      
      return res.redirect("/");
    }

    res.render("auth/login", { error: "Username atau Password salah!" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Terjadi kesalahan pada server");
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) console.log(err);
    res.redirect("/login");
  });
};