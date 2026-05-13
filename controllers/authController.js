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
      // Set session
      req.session.user = {
        id: user.id,
        username: user.username,
        role: user.role,
        nama: user.nama_lengkap,
      };

      // Redirect based on role
      if (user.role === "pimpinan") return res.redirect("/pimpinan/dashboard");
      if (user.role === "pegawai") return res.redirect("/pegawai/dashboard");
      return res.redirect("/");
    }

    res.render("auth/login", { error: "Username atau Password salah!" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};
