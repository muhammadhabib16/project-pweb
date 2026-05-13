# 🚀 Sistem Manajemen Lembur - Kelompok B06

Sistem berbasis Web untuk pengelolaan data lembur pegawai yang terintegrasi dengan sistem otorisasi **Role-Based Access Control (RBAC)** dan **Access Control List (ACL)**. Proyek ini dibangun menggunakan **Node.js** dengan pendekatan **Native SQL Query** (Tanpa ORM) untuk memenuhi spesifikasi tugas mata kuliah Pengembangan Web.

## 📌 Fitur Utama

- **Autentikasi Terenkripsi:** Login menggunakan pengamanan password satu arah berbasis `bcrypt`.
- **RBAC & ACL:** Pembatasan akses halaman berdasarkan peran (Admin, Pimpinan, Pegawai) menggunakan database Polymorphic.
- **Manajemen Session:** Pengelolaan status login pengguna secara aman di sisi server.
- **UI Modern:** Antarmuka responsif menggunakan **Basecoat UI** dan kustomisasi CSS modern.

## 🛠️ Stack Teknologi

- **Backend:** Node.js, Express.js
- **Database:** MySQL (MariaDB)
- **View Engine:** EJS (Embedded JavaScript)
- **Security:** Bcrypt (Hashing), Express-Session
- **Styling:** Basecoat UI Framework

## 📂 Struktur Proyek

```text
PROJECT-PWEB/
├── config/             # Konfigurasi koneksi database
├── controllers/        # Logika bisnis (Auth, Pimpinan, Pegawai)
├── middlewares/        # Satpam aplikasi (Auth & Permission check)
├── models/             # Query SQL Native (Data Layer)
├── public/             # Asset statis (CSS, JS, Images)
├── routes/             # Definisi endpoint URL
├── views/              # Template tampilan (EJS)
├── .env.example        # Contoh konfigurasi environment
└── app.js              # Entry point aplikasi
```
