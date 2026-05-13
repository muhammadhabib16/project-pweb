const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");
require("dotenv").config();

async function fixPassword() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    const passwordBaru = "password123";
    // Kita generate hash langsung di mesin Bos
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(passwordBaru, salt);

    console.log("--- DEBUG INFO ---");
    console.log("Password asli:", passwordBaru);
    console.log("Hash baru dihasilkan:", hash);

    // Update ke database
    await connection.execute("UPDATE users SET password = ? WHERE email = ?", [
      hash,
      "pegawai@lembur.com",
    ]);

    // Tes langsung di sini
    const match = await bcrypt.compare(passwordBaru, hash);
    console.log("Tes verifikasi internal:", match ? "✅ BERHASIL" : "❌ GAGAL");

    console.log("------------------");
    console.log("Silakan coba login lagi di browser dengan password123");
  } catch (err) {
    console.error("Waduh error, Bos:", err);
  } finally {
    await connection.end();
  }
}

fixPassword();
