# [E06] The Endpoint of Portals — RESTful API Todo App

Aplikasi manajemen tugas (Todo App) berbasis web yang telah dimigrasi dari arsitektur PHP klasik menjadi **RESTful API** dengan format pertukaran data **JSON** dan autentikasi **API Key**.

## Autentikasi
Seluruh *request* ke `api.php` wajib menyertakan *header* berikut:
- `X-API-Key: todo-key-5025251093`
- `Content-Type: application/json`

## Spesifikasi Endpoint

| Method | Endpoint | Deskripsi | Status Sukses | Status Error |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api.php` | Mengambil semua daftar tugas | `200 OK` | `401 Unauthorized` |
| `GET` | `/api.php?id={id}` | Mengambil detail tugas berdasarkan ID | `200 OK` | `400`, `401`, `404` |
| `POST` | `/api.php` | Menambahkan tugas baru | `201 Created` | `400`, `401` |
| `PUT` | `/api.php?id={id}` | Memperbarui seluruh data tugas | `200 OK` | `400`, `401`, `404` |
| `PATCH` | `/api.php?id={id}` | Memperbarui sebagian data / status selesai | `200 OK` | `400`, `401`, `404` |
| `DELETE` | `/api.php?id={id}` | Menghapus tugas berdasarkan ID | `200 OK` | `400`, `401`, `404` |

---

## Dokumentasi Pengujian API

### 1. Skenario Sukses (`200 OK` & `201 Created`)

* **GET All Tasks (`200 OK`)**
  ![GET 200](screenshots/get-200.png)

* **POST Create Task (`201 Created`)**
  ![POST 201](screenshots/post-201.png)

* **PUT Full Update (`200 OK`)**
  ![PUT 200](screenshots/put-200.png)

* **PATCH Partial Update (`200 OK`)**
  ![PATCH 200](screenshots/patch-200.png)

* **DELETE Task (`200 OK`)**
  ![DELETE 200](screenshots/delete-200.png)

### 2. Skenario Error & Autentikasi (`400`, `401`, `404`)

* **Unauthorized — Tanpa API Key (`401 Unauthorized`)**
  ![Error 401](screenshots/error-401.png)

* **Bad Request — Input JSON Kosong (`400 Bad Request`)**
  ![Error 400](screenshots/error-400.png)

* **Not Found — ID Tidak Ditemukan (`404 Not Found`)**
  ![Error 404](screenshots/error-404.png)
