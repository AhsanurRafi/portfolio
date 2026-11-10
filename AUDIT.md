# AUDIT DATA PORTOFOLIO — MUHAMMAD AHSANUR RAFI
> Dokumen ini disusun secara otomatis berdasarkan audit menyeluruh seluruh berkas asli di workspace (`CV`, `Foto Profil`, `Projek Skripsi`, `Projek Magang`, `Sinta 4`, `Artikel Santika`, dan `Sertifikat`). Tidak ada data yang dikarang.

---

## 1. DAFTAR SEMUA BERKAS DALAM WORKSPACE

| No | Lokasi File | Kategori | Format | Keterangan |
|---|---|---|---|---|
| 1 | `Foto Profil/Profil RemoveBG.png` | Profil | PNG (Transparan) | Foto jas almamater hijau UPNVJT, background transparan |
| 2 | `Foto Profil/Profil.jpeg` | Profil | JPEG | Foto asli berlatar gedung rektorat UPN Veteran Jawa Timur |
| 3 | `CV/Muhammad Ahsanur Rafi-resume.pdf` | Resume / CV | PDF | CV lengkap resmi (1 halaman) |
| 4 | `Projek Skripsi/POTATO LEAF DISEASE CLASSIFICATION USING TRANSFER LEARNING BASED MOBILENETV3SMALL ARCHITECTURE.pdf` | Projek Skripsi | PDF (140 hal.) | Skripsi S1 Informatika UPN Veteran Jatim (2026) |
| 5 | `Projek Skripsi/Pictures/` | Aset Visual | Folder | *(Kosong — gambar tersimpan di dalam berkas PDF)* |
| 6 | `Projek Magang/PEMBARUAN DESAIN UIUX WEBSITE SILOBA DI DINAS KESEHATAN PROVINSI JAWA TIMUR.pdf` | Projek Magang | PDF (69 hal.) | Laporan PKL/Magang Mandiri di Dinkes Jatim (2025) |
| 7 | `Projek Magang/Pictures/` | Aset Visual | Folder | *(Kosong — gambar tersimpan di dalam berkas PDF)* |
| 8 | `Sinta 4/Potato Leaf Disease Classification Using MobileNetV3Small Transfer Learning with Dataset Split Ratio Comparison.pdf` | Publikasi Ilmiah | PDF (11 hal.) | Naskah Jurnal Sinta 4 *Bit-Tech* (Agustus 2026) |
| 9 | `Artikel Santika/Klasifikasi Penyakit Daun Kentang Menggunakan Metode ResNet50.pdf` | Publikasi Ilmiah | PDF (8 hal.) | Artikel Seminar Nasional *SANTIKA* Vol. 4 (2024) |
| 10 | `Sertifikat/Bangkit Academy - Cloud Computing Learning/Sertifikat Bangkit Academy - Cloud Computing.png` | Sertifikat | PNG | Sertifikat Kelulusan Resmi Bangkit Academy 2023 |
| 11 | `Sertifikat/Bangkit Academy - Cloud Computing Learning/Sertifikat Cloud Computing & Transkrip Bangkit Academy.pdf` | Sertifikat | PDF | Salinan sertifikat & transkrip Bangkit Academy |
| 12 | `Sertifikat/BNSP/Sertifikat Junior Web Programmer - BNSP.jpeg` | Sertifikat | JPEG | Sertifikat Kompetensi BNSP - LSP UPN Veteran Jawa Timur |
| 13 | `Sertifikat/Dicoding Indonesia/Sertifikat Belajar Dasar Pemrograman Web.pdf` | Sertifikat | PDF | Sertifikat Dicoding Academy |
| 14 | `Sertifikat/Dicoding Indonesia/Sertifikat Belajar Dasar Pemrograman JavaScript.pdf` | Sertifikat | PDF | Sertifikat Dicoding Academy (didukung AWS) |
| 15 | `Sertifikat/Dicoding Indonesia/Sertfikat Belajar Membuat Aplikasi Back-End untuk Pemula dengan Google Cloud.pdf` | Sertifikat | PDF | Sertifikat Dicoding Academy |
| 16 | `Sertifikat/Dicoding Indonesia/Sertifikat Menjadi Google Cloud Engineer.pdf` | Sertifikat | PDF | Sertifikat Dicoding Academy |

---

## 2. RINGKASAN DATA PRIBADI & PENDIDIKAN

- **Nama Lengkap:** Muhammad Ahsanur Rafi
- **Gelar:** Sarjana Komputer (S.Kom.), Jurusan Informatika
- **Universitas:** Universitas Pembangunan Nasional (UPN) "Veteran" Jawa Timur, Surabaya
- **Periode Kuliah:** Agustus 2021 – Juli 2026 *(Status: Fresh Graduate)*
- **IPK (GPA):** **3.82** / 4.00
- **Email:** `ahsanurrafi@gmail.com`
- **LinkedIn:** `https://www.linkedin.com/in/muhammad-ahsanur-rafi-57868a21a/`
- **Lokasi Ditampilkan:** Jawa Timur, Indonesia *(Alamat spesifik dan no. HP dirahasiakan sesuai ketentuan privasi)*
- **Ringkasan Profil (Draf dari CV):**
  > Fresh graduate Sarjana Informatika dari UPN "Veteran" Jawa Timur dengan IPK 3.82. Memiliki dedikasi tinggi dan ketertarikan mendalam pada Machine Learning & Computer Vision, UI/UX Design, serta Web Development. Memiliki rekam jejak riset klasifikasi citra berbasis deep learning yang dipublikasikan pada jurnal nasional, sertifikasi kompetensi Junior Web Programmer dari BNSP, serta pengalaman nyata meredesain sistem informasi distribusi obat di instansi pemerintah.

---

## 3. DATA DIEKSTRAK PER DOKUMEN & PROJEK

### A. Projek Skripsi (Machine Learning / Deep Learning)
- **Judul:** *Potato Leaf Disease Classification Using Transfer Learning Based MobileNetV3Small Architecture*
- **Penulis & Pembimbing:** Muhammad Ahsanur Rafi (NPM 21081010305); Pembimbing: Dr. Budi Nugroho, S.Kom., M.Kom. & Chrystia Aji Putra, S.Kom., M.T.
- **Tahun/Institusi:** 2026, Program Studi Informatika UPN "Veteran" Jawa Timur
- **Masalah/Latar Belakang:** Penyakit daun kentang (*Early Blight* dan *Late Blight*) mengancam produktivitas panen secara drastis. Dibutuhkan model klasifikasi yang sangat ringan, akurat, dan efisien agar dapat diimplementasikan pada perangkat komputasi terbatas / mobile.
- **Dataset:** 7.573 citra daun kentang (seimbang) gabungan dari *Potato Disease Leaf Dataset (PLD)* oleh Rizwan Saeed (2021) dan *Potato Leaf* oleh Pooja Dave (2025). 3 Kelas: *Early Blight* (2.529), *Late Blight* (2.524), *Healthy* (2.520).
- **Arsitektur Model:** MobileNetV3-Small (Pre-trained ImageNet)
  - Total Parameter: **940.851** parameter (~3,59 MB) — sangat ringan dibandingkan MobileNetV3-Large (2,99M) dan MobileNetV2 (2,26M).
  - Head Kustom: `GlobalAveragePooling2D` → `Dropout(0.1)` → `Dense(3, Softmax)`.
- **Metode & Teknik:**
  - *Preprocessing:* Standardisasi piksel resmi MobileNetV3 `preprocess_input` [-1.0, 1.0], resolusi 224×224 piksel.
  - *Dynamic Augmentation:* Rotasi (20°), horizontal flip, zoom (10%), Gaussian blur (p=30%, kernel 3x3/5x5), Gaussian noise (p=30%, std=10.0), dan variasi pencahayaan (p=40%, faktor 0.7–1.3).
  - *Two-Phase Transfer Learning:*
    - **Fase 1 (Feature Extraction):** Backbone dibekukan, melatih classification head dengan optimizer Adam (LR 0.005 hasil tuning Bayesian), max 30 epoch.
    - **Fase 2 (Fine-Tuning):** Membuka 40 layer teratas backbone (layer BatchNorm tetap beku) dengan optimizer SGD Nesterov (LR 1e-4, momentum 0.9), max 30 epoch.
  - *Hyperparameter Optimization:* Bayesian Optimization via Keras Tuner (20 trials).
- **Hasil & Metrik:**
  - **Akurasi Pengujian Internal:** **98.15%** (Test Loss: 0.0458, Macro F1: 0.9815).
    - *Early Blight:* Precision 0.9842, Recall 0.9816, F1 0.9829.
    - *Healthy:* Precision 0.9762, Recall 0.9881, F1 0.9821.
    - *Late Blight:* Precision 0.9839, Recall 0.9722, F1 0.9780.
  - **Akurasi Pengujian Eksternal (Domain Shift):** **84.67%** (600 citra independen, mengidentifikasi bias hipersensitivitas pada daun sehat terhadap noise lingkungan luar).
- **Tools:** Python 3, TensorFlow 2.20.0, Keras 3.13.2, Scikit-Learn, OpenCV, NumPy, Matplotlib, Seaborn, Kaggle Notebooks (NVIDIA Tesla P100 GPU).

---

### B. Projek Magang (UI/UX Design)
- **Judul:** *Pembaruan Desain UI/UX Website SILOBA di Dinas Kesehatan Provinsi Jawa Timur*
- **Instansi:** Dinas Kesehatan Provinsi Jawa Timur (Jl. Ahmad Yani No. 118, Surabaya)
- **Periode:** 08 Juli 2024 – 08 Agustus 2024 (1 bulan)
- **Peran:** UI/UX Designer (Tim: Daniel Bergas Prasetyo, Dzikra Fadhila Abrar Setiawan, Muhammad Ahsanur Rafi)
- **Dosen Pembimbing:** Fetty Tri Anggraeny, S.Kom., M.Kom.
- **Tentang SILOBA:** *Sistem Informasi Alokasi Obat* — aplikasi berbasis web milik Dinas Kesehatan Provinsi Jatim untuk merencanakan, mendistribusikan, dan memantau stok obat ke Dinas Kesehatan di seluruh 38 Kabupaten/Kota di Jawa Timur.
- **Masalah Sistem Lama:** Navigasi membingungkan, informasi tidak terstruktur, antarmuka kaku dan belum responsif, tata letak tombol bermasalah, koordinasi pengguna masih bergantung pada WhatsApp manual.
- **Metode Kerja:**
  - *User-Centered Design (UCD)* & *Agile Iterative Development*.
  - *User Research & Needs Analysis:* Wawancara langsung dan pengumpulan masukan dari pengguna Dinkes Kab/Kota dan administrator provinsi.
  - *Information Architecture & Modeling:* Penyusunan Use Case Diagram (aktor Pengguna & Admin) dan Activity Diagram.
  - *Prototyping:* Perancangan sketsa wireframe (Low-Fidelity) hingga purwarupa interaktif berkualitas tinggi (High-Fidelity) di Figma.
  - *Iterative Feedback:* Evaluasi berkala dengan admin pengelola SILOBA di Dinkes Jatim.
- **Hasil & Fitur Baru yang Dirancang:**
  1. Fitur Baru: Filter alokasi obat dinamis berdasarkan **Tahun Anggaran** dan **Program Kesehatan** (sebelumnya tidak ada).
  2. Modul Pengguna (Dinkes Kab/Kota): Dashboard Alokasi Obat, Form Permintaan Obat (unggah dokumen pengantar resmi PDF), Riwayat Permintaan Obat, Modul Penjadwalan Pengambilan Obat, dan Riwayat Pengambilan Obat.
  3. Modul Admin (Dinkes Provinsi): Import Data Alokasi Obat (via upload berkas Excel otomatis), Manajemen Stok & Alokasi, Verifikasi Permintaan Obat (setujui/tolak/proses), dan Verifikasi Penjemputan Obat.
- **Tools:** Figma (Auto-layout, Components, Interactive Prototyping, Grid System).

---

### C. Riset Akademik & Publikasi Ilmiah

#### 1. Jurnal Terakreditasi Sinta 4
- **Judul Artikel:** *Potato Leaf Disease Classification Using MobileNetV3Small Transfer Learning with Dataset Split Ratio Comparison*
- **Jurnal:** *Bit-Tech (Binary Digital – Technology)*, Vol. 9, No. 1, Agustus 2026.
- **ISSN:** 2622-2728 (Online) | 2622-271X (Print)
- **Penerbit:** Komunitas Dosen Indonesia
- **Penulis:** Muhammad Ahsanur Rafi, Budi Nugroho, Chrystia Aji Putra (Penulis Pertama & Korespondensi)
- **URL Publikasi:** `http://jurnal.kdi.or.id/index.php/bt`
- **DOI:** `10.32877/bt.v9i1.XXXX` *(TODO: perlu konfirmasi nomor DOI final jika OJS sudah mengisinya)*
- **Fokus & Metodologi:** Menyelidiki dampak proporsi partisi data berstrata (60:20:20, 70:15:15, 80:10:10) pada performa arsitektur MobileNetV3Small transfer learning. Setiap skenario diuji 3 kali repetisi independen pada 4.988 citra daun kentang.
- **Temuan Kunci:** Rasio partisi **70:15:15** menghasilkan performa paling optimal dan stabil dengan rata-rata akurasi **96.53 ± 0.35%**, puncak akurasi tertinggi **96.80%**, dan F1-Score **96.78%**. Presisi pada kelas *Late Blight* mencapai 100%.

#### 2. Artikel Seminar Nasional SANTIKA (2024)
- **Judul Artikel:** *Klasifikasi Penyakit Daun Kentang Menggunakan Metode ResNet50*
- **Forum Ilmiah:** *Seminar Nasional Informatika Bela Negara (SANTIKA)* Vol. 4, 2024
- **ISSN:** 2747-0563 (Online)
- **Penulis:** Muhammad Ahsanur Rafi, Budi Nugroho, Chrystia Aji Putra
- **DOI / URL:** `TODO: perlu diisi` *(Tidak tercantum pada PDF artikel)*
- **Fokus & Metodologi:** Eksplorasi awal klasifikasi daun kentang menggunakan arsitektur ResNet50 transfer learning, penanganan ketidakseimbangan kelas (*imbalanced data*) menggunakan teknik oversampling citra daun sehat, serta modifikasi arsitektur head dengan *Dual Pooling* (gabungan Global Average Pooling dan Global Max Pooling).
- **Hasil Kunci:** Akurasi pengujian sebesar **82.72%** (Test Loss: 0.6277) pada dataset PLD 4.072 citra, dilatih menggunakan Google Colab GPU NVIDIA T4.

---

### D. Rekapitulasi Sertifikat Resmi

| No | Nama Sertifikat | Penerbit / Lembaga | Tanggal Terbit | Masa Berlaku | Nomor / ID Kredensial | Tautan / Bukti |
|---|---|---|---|---|---|---|
| 1 | **Bangkit Academy - Cloud Computing** | Bangkit Academy (Google, GoTo, Traveloka, Kemendikbudristek) | 19 Januari 2024 | Seumur hidup | `BA23/GRAD/XXIV-01/C296BSY4312` | File PNG & PDF di folder |
| 2 | **Sertifikat Kompetensi: Junior Web Programmer** | Badan Nasional Sertifikasi Profesi (BNSP) / LSP UPN "Veteran" Jawa Timur | 02 Oktober 2025 | 3 Tahun (s.d. 02 Okt 2028) | No Sertifikat: `62010.2513.3.0006188.2025`<br>Reg: `J.1030.00265.2025` | File JPEG di folder |
| 3 | **Menjadi Google Cloud Engineer** | Dicoding Academy | 10 November 2023 | 3 Tahun (s.d. 10 Nov 2026) | `JMZV176VQXN9` | `dicoding.com/certificates/JMZV176VQXN9` |
| 4 | **Belajar Membuat Aplikasi Back-End untuk Pemula dengan Google Cloud** | Dicoding Academy | 12 Oktober 2023 | 3 Tahun (s.d. 12 Okt 2026) | `NVP78NRWGXR0` | `dicoding.com/certificates/NVP78NRWGXR0` |
| 5 | **Belajar Dasar Pemrograman JavaScript** | Dicoding Academy (didukung AWS) | 28 September 2023 | 3 Tahun (s.d. 28 Sep 2026) | `1OP81WN3QZQK` | `dicoding.com/certificates/1OP81WN3QZQK` |
| 6 | **Belajar Dasar Pemrograman Web** | Dicoding Academy | 13 September 2023 | 3 Tahun (s.d. 13 Sep 2026) | `1RXY0MLR3ZVM` | `dicoding.com/certificates/1RXY0MLR3ZVM` |

---

## 4. PEMETAAN SKILLS & TOOLS (SESUAI DOKUMEN ASLI)

### Kolom 1: Machine Learning & AI
- **Bahasa & Framework:** Python 3, TensorFlow, Keras, Scikit-Learn
- **Arsitektur & Konsep:** Convolutional Neural Networks (CNN), Transfer Learning, MobileNetV3-Small, ResNet50, Dual Pooling (GAP + GMP), Bayesian Hyperparameter Optimization
- **Pengolahan Data & Visi Komputer:** OpenCV (cv2), NumPy, Image Augmentation (Gaussian Blur/Noise, Dynamic Brightness), Domain Shift Analysis
- **Lingkungan Komputasi:** Kaggle Notebooks (GPU Tesla P100), Google Colab (GPU T4)

### Kolom 2: UI/UX Design
- **Tools Utama:** Figma (Components, Auto-Layout, Interactive Prototyping, Design Systems, Grid Layout)
- **Metodologi & Riset:** User-Centered Design (UCD), Agile Methodology, User Research & Interview, Needs Analysis
- **Pemodelan Sistem:** Use Case Diagram, Activity Diagram, User Journey, Information Architecture
- **Desain & Aset Pendukung:** Canva (Visual Asset Design), DaVinci Resolve (Video Editing)

### Kolom 3: Web & Cloud Development
- **Front-End Dasar:** HTML5 (Semantic HTML), CSS3 (Flexbox, Responsive Layout, Media Queries), JavaScript (ES6+, Async/Await, OOP, Functional)
- **Sertifikasi Profesi:** Junior Web Programmer (Badan Nasional Sertifikasi Profesi - BNSP)
- **Back-End Fundamentals:** Node.js, Hapi Framework, RESTful API Development, Postman API Testing
- **Cloud Computing & Database Integration:**
  - Google Cloud Platform (GCP): Google Compute Engine, VPC Networking, Cloud IAM, Monitoring & Logging
  - Cloud Database Integration: *Firebase Realtime Database / Firestore & Google Sheets* (sesuai arahan kebutuhan integrasi)

---

## 5. STATISTIK KUNCI (UNTUK ANIMASI COUNT-UP)

- **Total Projek:** **3** (Skripsi MobileNetV3, UI/UX SILOBA Dinkes Jatim, Web Programming / Bookshelf API)
- **Publikasi Ilmiah:** **2** (1 Jurnal Terakreditasi Sinta 4 + 1 Prosiding Seminar Nasional SANTIKA)
- **Sertifikat Resmi:** **6** (1 Bangkit Google/GoTo, 1 BNSP LSP, 4 Dicoding Academy)
- **Indeks Prestasi Kumulatif (IPK):** **3.82** (Skala 4.00)

---

## 6. DATA AMBIGU & CATATAN PERLU KONFIRMASI (`TODO`)

1. **[AMBIGUITAS TANGGAL] Tanggal Sertifikasi LSP UPN Veteran Jatim:**
   - Di dokumen CV tertulis: `Oct 2024`.
   - Di sertifikat fisik BNSP tertulis: `Surabaya, 02 Oktober 2025`.
   - *Status:* Untuk website, akan ditampilkan tahun yang valid sesuai tanggal sertifikat fisik (**Oktober 2025**) atau disesuaikan dengan konfirmasi Anda.
2. **[TODO] Nomor DOI & Tautan Publikasi Jurnal Sinta 4 (Bit-Tech):**
   - Pada naskah tercantum `10.32877/bt.v9i1.XXXX` (placeholder dari template sebelum terbit final).
   - Tautan URL jurnal: `http://jurnal.kdi.or.id/index.php/bt`.
   - *Status:* Tombol "Baca Publikasi" sementara diarahkan ke URL portal jurnal `http://jurnal.kdi.or.id/index.php/bt` sampai tautan DOI spesifik diisi.
3. **[TODO] Tautan Prosiding SANTIKA 2024:**
   - Tidak ada tautan URL/DOI yang tercantum dalam naskah PDF.
   - *Status:* Diberi penanda `TODO: link publikasi SANTIKA`.
4. **[CATATAN] Folder Gambar Projek:**
   - Folder `Projek Skripsi/Pictures/` dan `Projek Magang/Pictures/` saat ini kosong.
   - *Solusi otomatis:* Kami dapat mengekstrak gambar diagram arsitektur / hasil model dari PDF skripsi serta tangkapan layar desain dari PDF laporan magang, atau menampilkan kartu projek berbasis representasi visual SVG / UI mockup modern yang presisi jika gambar belum disediakan manual.

