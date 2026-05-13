/**
 * Middleware untuk mengecek apakah user sudah login
 * Digunakan untuk memproteksi halaman agar tidak bisa diakses tamu
 */
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  // Jika belum login, tendang ke halaman login
  res.redirect("/login");
};

/**
 * Middleware ACL: Mengecek apakah user memiliki izin spesifik
 * @param {string} permissionRequired - Nama izin (misal: 'buat_penugasan')
 */
const hasPermission = (permissionRequired) => {
  return (req, res, next) => {
    const user = req.session.user;

    // Jika user adalah admin, berikan akses ke semua fitur (Superuser bypass)
    if (user.role === "admin") {
      return next();
    }

    // Cek apakah daftar permissions di session mengandung izin yang diminta
    if (user.permissions && user.permissions.includes(permissionRequired)) {
      return next();
    }

    // Jika tidak punya izin, kirim error 403 (Forbidden) atau redirect
    res
      .status(403)
      .send("Akses Ditolak: Bos tidak memiliki izin untuk aksi ini.");
  };
};

module.exports = {
  isAuthenticated,
  hasPermission,
};
