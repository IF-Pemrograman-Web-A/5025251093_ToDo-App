# 5025251093_ToDo-App

**Identitas**
- Nama: Muhammad Hanif Musyafa
- NRP: 5025251093
- Kelas: Pemrograman Web - A

**deskripsi**

project halaman web statis untuk aplikasi Todo List, dibuat menggunakan HTML dan CSS eksternal

- Menggunakan elemen semantik HTML (header, main, aside, dan footer).
- Layout dibagi jadi dua panel (kiri untuk list tugas, kanan untuk detail/form) dengan memanfaatkan Flexbox.
- Desain antarmuka sudah responsif, jadi tetap rapi saat dibuka di layar desktop maupun mobile.
- Menggunakan data dummy statis untuk list Todo-nya.

https://if-pemrograman-web-a.github.io/5025251093_ToDo-App/

**kondisi awal:**
<img width="1919" height="863" alt="image" src="https://github.com/user-attachments/assets/ce7d3eb9-b0e1-4312-b353-c907b325fa1a" />

**saat menambah task:**
<img width="1919" height="862" alt="image" src="https://github.com/user-attachments/assets/3b84161b-42ba-44b1-9060-a14b57b12711" />

**saat mengedit deskripsi
<img width="1919" height="756" alt="image" src="https://github.com/user-attachments/assets/1f1cc5e5-d2ff-44e1-aa46-c2d7ac4d9407" />
<img width="1919" height="858" alt="image" src="https://github.com/user-attachments/assets/5b17587b-1750-4911-88fb-822129960f5e" />

**saat ceklis:**
<img width="1919" height="931" alt="image" src="https://github.com/user-attachments/assets/e647b2e6-6d84-4953-85f3-4cee55149295" />

**saat Delete:**
<img width="1919" height="929" alt="image" src="https://github.com/user-attachments/assets/662dc836-225a-4df

**saat light mode:**
<img width="1919" height="927" alt="image" src="https://github.com/user-attachments/assets/578d3629-4d20-4168-97ce-83a9f8b0875a" />

**phpmyadmin:**
<img width="1919" height="512" alt="image" src="https://github.com/user-attachments/assets/23d5c312-d050-401a-a6bd-2083495555f0" />

## Bukti Pengerjaan [E05] The Offline Abyss

**Web App Manifest**
*(Taruh SS tab Application -> Manifest lu di sini)*
File `manifest.json` telah berhasil didaftarkan sehingga aplikasi memiliki identitas, ikon, dan tombol instal (PWA *installable*).

**Service Worker & Cache Storage**
*(Taruh SS tab Application -> Cache storage yang ada isi 3 filenya di sini)*
*Service Worker* telah aktif dan menggunakan metode precaching untuk menyimpan aset inti ke dalam *Cache Storage* saat proses instalasi.

**Pengujian Mode Offline**
*(Taruh SS layar web lu yang nampilin peringatan "Koneksi Terputus" di sini)*
Pengujian *Network First* fallback. Saat kondisi jaringan dimatikan (*Offline*), aplikasi tidak *crash* atau memunculkan pesan error bawaan browser (dinosaurus), melainkan berhasil menampilkan halaman darurat `offline.html` yang ditarik dari *cache*.

<img width="1077" height="372" alt="image" src="https://github.com/user-attachments/assets/63bd9782-ed8d-4065-b299-8cd99708410f" />

<img width="1334" height="679" alt="image" src="https://github.com/user-attachments/assets/d2655852-1413-4f74-aa7c-1c35546a77b6" />

<img width="1919" height="931" alt="image" src="https://github.com/user-attachments/assets/2d48d3f2-d6ba-4c75-9ed4-cf289d887e02" />
