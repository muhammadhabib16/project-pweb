/**
 * Middleware untuk mengecek apakah user sudah login
 */
exports.isAuthenticated = (req, res, next) => {
    // Mengecek apakah session user tersedia 
    if (req.session && req.session.user) {
        return next();
    }
    // Jika tidak ada session, arahkan kembali ke halaman login
    res.redirect('/login');
};

/**
 * Middleware untuk mengecek hak akses (ACL) berdasarkan Role
 * @param {String} role - Peran yang diizinkan (Pegawai, Pimpinan, Admin)
 */
exports.authorizeRole = (role) => {
    return (req, res, next) => {
        // Memastikan data user dan role tersedia di session 
        if (!req.session.user || !req.session.user.role) {
            return res.status(403).send("Akses Ditolak: Sesi Tidak Valid");
        }

        // Normalisasi string untuk pengecekan yang lebih aman
        const userRole = req.session.user.role.toLowerCase();
        const requiredRole = role.toLowerCase();

        // Cek apakah role user sesuai dengan role yang dibutuhkan rute [cite: 39, 43]
        if (userRole === requiredRole) {
            return next();
        }

        // Jika role tidak sesuai, kirim pesan error atau arahkan ke halaman yang sesuai
        res.status(403).render("auth/login", { 
            error: "Anda tidak memiliki akses ke halaman tersebut!" 
        });
    };
};