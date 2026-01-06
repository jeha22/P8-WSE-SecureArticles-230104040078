# SecureArticles API - Praktikum #8

Aplikasi REST API berbasis Node.js untuk pengelolaan artikel dengan sistem autentikasi JWT dan kontrol akses berbasis peran (RBAC).

## 👤 Informasi Mahasiswa
* **Nama:** Muhammad Naufal Jihaadi
* **NIM:** 230104040078

---

## 🚀 Fitur Utama
* **Autentikasi & Otorisasi:** Registrasi, Login, dan pengelolaan Token (Access & Refresh Token) menggunakan JWT.
* **Validasi Data:** Validasi input menggunakan **Joi** seperti batasan karakter nama dan format email.
* **CRUD Articles:** Operasi Create, Read, Update, dan Delete untuk artikel.
* **RBAC (Role-Based Access Control):** Pembatasan akses berdasarkan peran user dan admin (Contoh: Delete hanya untuk Admin).

---

## 🛠️ Teknologi yang Digunakan
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (Mongoose)
* **Validasi:** Joi
* **Autentikasi:** JSON Web Token (JWT)

---

## 📑 Daftar Endpoint

### 🔐 Auth Endpoints
| Method | Endpoint | Auth | Deskripsi |
| :--- | :--- | :--- | :--- |
| POST | `/api/auth/register` | ❌ Public | Register user baru (role: user/admin) |
| POST | `/api/auth/login` | ❌ Public | Login -> dpt accessToken+refreshToken |
| POST | `/api/auth/refresh` | ❌ Public | Minta accessToken baru via refreshToken |
| POST | `/api/auth/logout` | ✅ Access Token | Logout & invalidate refreshToken |
| GET | `/api/auth/me` | ✅ Access Token | Ambil profil user dari JWT |

### 📝 Articles Endpoints (CRUD + RBAC)
| Method | Endpoint | Auth | Role | Deskripsi |
| :--- | :--- | :--- | :--- | :--- |
| GET | `/api/articles` | ❌ Public | public | List semua artikel + pagination + search |
| POST | `/api/articles` | ✅ Access Token | user/admin | Create article (author otomatis dari JWT) |
| PUT | `/api/articles/:id` | ✅ Access Token | owner/admin | Update article |
| DELETE | `/api/articles/:id` | ✅ Access Token | admin | Hapus article |

---

## 📋 Cara Instalasi dan Menjalankan Proyek

1. **Clone Repository:**
   ```bash
   git clone <url-repository-anda>
   cd P8-SecureArticles-230104040126

   Install Dependencies:

Bash

npm install
Konfigurasi Environment (.env): Buat file .env di root directory dan isi sesuai kebutuhan database Anda.

Jalankan Server:

Bash

npm run dev
📸 Bukti Pengujian (Evidence)
