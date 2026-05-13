const db = require("../config/db");

class User {
  static async findByEmail(email) {
    const query = `
        SELECT u.*, r.name as role, p.name as permission
        FROM users u
        LEFT JOIN model_has_roles mhr ON u.id = mhr.model_id AND mhr.model_type = 'User'
        LEFT JOIN roles r ON mhr.role_id = r.id
        LEFT JOIN role_has_permissions rhp ON r.id = rhp.role_id
        LEFT JOIN permissions p ON rhp.permission_id = p.id
        WHERE u.email = ?
    `;
    const [rows] = await db.execute(query, [email]);

    if (rows.length === 0) return null;

    // Mapping hasil query karena satu user bisa punya banyak permission
    const user = {
      id: rows[0].id,
      name: rows[0].name,
      email: rows[0].email,
      password: rows[0].password,
      role: rows[0].role, // Ini akan berisi 'admin' sesuai DB Bos
      permissions: rows.map((r) => r.permission).filter((p) => p != null),
    };
    return user;
  }
}

module.exports = User;
