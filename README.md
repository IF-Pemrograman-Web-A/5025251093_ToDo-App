# [E06]

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
<img width="1478" height="559" alt="Screenshot 2026-11-25 120442" src="https://github.com/user-attachments/assets/5efc492a-8cd9-4657-b0b0-1cad78652a23" />


* **POST Create Task (`201 Created`)**
<img width="1472" height="349" alt="Screenshot 2026-11-25 121325" src="https://github.com/user-attachments/assets/fa101615-f1cd-4507-ad4a-b881e4f10221" />


* **PUT Full Update (`200 OK`)**
<img width="1474" height="326" alt="Screenshot 2026-11-25 121345" src="https://github.com/user-attachments/assets/a830430f-8cde-4536-ac83-be7379fffbc5" />


* **PATCH Partial Update (`200 OK`)**
<img width="1463" height="316" alt="Screenshot 2026-11-25 121400" src="https://github.com/user-attachments/assets/9020317a-33f9-4084-b69f-14fd0f83acf9" />


* **DELETE Task (`200 OK`)**
<img width="1471" height="340" alt="Screenshot 2026-11-25 120745" src="https://github.com/user-attachments/assets/baf59bea-3eea-48f0-910b-99e0898c55e0" />


### 2. Skenario Error & Autentikasi (`400`, `401`, `404`)

* **Unauthorized — Tanpa API Key (`401 Unauthorized`)**
<img width="1462" height="301" alt="Screenshot 2026-11-25 120818" src="https://github.com/user-attachments/assets/eab31ff1-20a8-46ae-9816-28caff3bc931" />


* **Bad Request — Input JSON Kosong (`400 Bad Request`)**
<img width="1472" height="343" alt="Screenshot 2026-11-25 120849" src="https://github.com/user-attachments/assets/32a4d335-186e-4629-8c0e-5cb60e20899e" />


* **Not Found — ID Tidak Ditemukan (`404 Not Found`)**
<img width="1461" height="334" alt="Screenshot 2026-11-25 120909" src="https://github.com/user-attachments/assets/859840cf-8ffb-45d9-bd35-0ef47b7b8703" />

