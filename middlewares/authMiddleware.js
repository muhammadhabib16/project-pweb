module.exports = {
  isLoggedIn: (req, res, next) => {
    if (req.session && req.session.user) {
      return next();
    }
    res.redirect("/login");
  },

  // Access Control List (ACL) Middleware
  checkRole: (roles) => {
    return (req, res, next) => {
      if (!req.session.user) {
        return res.redirect("/login");
      }

      if (roles.includes(req.session.user.role)) {
        return next();
      } else {
        return res.status(403).render("error", {
          message:
            "Akses Ditolak: Role Anda tidak diizinkan mengakses halaman ini.",
        });
      }
    };
  },
};
