/* ============================================================
   main.js — Portfolio Website JavaScript
   Vanilla ES6+ · No frameworks · No libraries
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  /* ----------------------------------------------------------
     UTILITIES & SHARED STATE
     ---------------------------------------------------------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isTouchDevice = !window.matchMedia('(hover: hover)').matches || 'ontouchstart' in window;

  /* ----------------------------------------------------------
     1. TYPING ANIMATION (Terminal Style)
     ---------------------------------------------------------- */
  (() => {
    const roles = ['Machine Learning Engineer', 'UI/UX Designer', 'Web Developer'];
    const el = document.getElementById('typing-text');
    if (!el) return;

    // Reduced-motion: cycle static text every 3 s
    if (prefersReducedMotion.matches) {
      let idx = 0;
      el.textContent = roles[idx];
      setInterval(() => {
        idx = (idx + 1) % roles.length;
        el.textContent = roles[idx];
      }, 3000);
      return;
    }

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const TYPE_SPEED = 80;
    const DELETE_SPEED = 40;
    const PAUSE_AFTER_TYPE = 2000;
    const PAUSE_AFTER_DELETE = 500;

    function tick() {
      const currentRole = roles[roleIndex];

      if (!isDeleting) {
        // Typing forward
        charIndex++;
        el.textContent = currentRole.substring(0, charIndex);

        if (charIndex === currentRole.length) {
          isDeleting = true;
          setTimeout(tick, PAUSE_AFTER_TYPE);
          return;
        }
        setTimeout(tick, TYPE_SPEED);
      } else {
        // Deleting
        charIndex--;
        el.textContent = currentRole.substring(0, charIndex);

        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(tick, PAUSE_AFTER_DELETE);
          return;
        }
        setTimeout(tick, DELETE_SPEED);
      }
    }

    tick();
  })();

  /* ----------------------------------------------------------
     2. SPOTLIGHT HOVER EFFECT ON CARDS
     ---------------------------------------------------------- */
  (() => {
    if (isTouchDevice) return;

    const cards = document.querySelectorAll('.spotlight-card');
    if (!cards.length) return;

    cards.forEach((card) => {
      let rafId = null;

      card.addEventListener(
        'mousemove',
        (e) => {
          if (rafId) cancelAnimationFrame(rafId);

          rafId = requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            rafId = null;
          });
        },
        { passive: true }
      );

      card.addEventListener('mouseleave', () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        card.style.removeProperty('--mouse-x');
        card.style.removeProperty('--mouse-y');
      });
    });
  })();

  /* ----------------------------------------------------------
     3. SCROLL REVEAL (IntersectionObserver)
     ---------------------------------------------------------- */
  (() => {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    if (prefersReducedMotion.matches) {
      revealElements.forEach((el) => el.classList.add('active'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  })();

  /* ----------------------------------------------------------
     4. PROJECT FILTER & MODAL (ENHANCED)
     ---------------------------------------------------------- */

  // --- Project Detailed Data ---
  const projectsData = {
    'skripsi': {
      title: 'Potato Leaf Disease Classification Using Transfer Learning Based MobileNetV3Small Architecture',
      category: 'Machine Learning · Skripsi S1',
      period: 'Tugas Akhir Skripsi (2026)',
      image: 'assets/img/projects/skripsi-p106-0.png',
      gallery: [
        {
          src: 'assets/img/projects/skripsi-samples.jpg',
          webp: 'assets/img/projects/skripsi-samples.webp',
          alt: 'Sampel Dataset Citra Daun Kentang (Early Blight, Late Blight, Healthy)',
          caption: 'Sampel Citra Daun Kentang: Early Blight (kiri), Late Blight (tengah), dan Healthy (kanan) dari total 7.573 citra.'
        },
        {
          src: 'assets/img/projects/skripsi-flow.jpg',
          webp: 'assets/img/projects/skripsi-flow.webp',
          alt: 'Diagram Alur Penelitian Klasifikasi Deep Learning MobileNetV3-Small',
          caption: 'Diagram Alur Metodologi Penelitian: Preprocessing, Partisi Stratified, Two-Phase Transfer Learning, & Evaluasi.'
        },
        {
          src: 'assets/img/projects/skripsi-curves.jpg',
          webp: 'assets/img/projects/skripsi-curves.webp',
          alt: 'Kurva Evaluasi Training dan Validation Accuracy serta Loss',
          caption: 'Grafik Konvergensi Akurasi dan Loss selama Fase Feature Extraction & Fine-Tuning 40 Layer Teratas.'
        },
        {
          src: 'assets/img/projects/skripsi-cm-internal.jpg',
          webp: 'assets/img/projects/skripsi-cm-internal.webp',
          alt: 'Confusion Matrix Evaluasi Data Uji Internal (Akurasi 98.15%)',
          caption: 'Confusion Matrix Pengujian Internal (757 Citra Uji): Akurasi 98.15%, Macro F1-Score 0.9815, Loss 0.0458.'
        },
        {
          src: 'assets/img/projects/skripsi-cm-external.jpg',
          webp: 'assets/img/projects/skripsi-cm-external.webp',
          alt: 'Confusion Matrix Evaluasi Cross-Dataset Domain Shift (Akurasi 84.67%)',
          caption: 'Confusion Matrix Uji Ketahanan Domain Shift (600 Citra Independen Lingkungan Nyata): Akurasi 84.67%.'
        }
      ],
      link: 'https://repository.upnjatim.ac.id/id/eprint/57961',
      linkLabel: 'Buka Repositori Skripsi (UPN Jatim)',
      problem: [
        'Penyakit Early Blight (Alternaria solani) dan Late Blight (Phytophthora infestans) pada daun kentang merupakan ancaman patogen serius yang sering memicu gagal panen massal.',
        'Diagnosis visual konvensional di lapangan membutuhkan pakar agronomi, lambat, dan rentan bias subjektif.',
        'Model CNN konvensional (seperti VGG atau ResNet) memiliki parameter masif puluhan juta dan ukuran berkas sangat besar, sehingga sulit dan lambat diterapkan pada perangkat mobile atau edge computing berdaya rendah.',
        'Tantangan fenomena domain shift di mana model kehilangan akurasi ketika diuji pada citra lapangan nyata dengan pencahayaan dan latar belakang berbeda.'
      ],
      solution: [
        'Merancang sistem klasifikasi berbasis deep learning menggunakan arsitektur mutakhir MobileNetV3-Small yang dioptimalkan secara terstruktur.',
        'Menerapkan transfer learning dua fase: Feature Extraction dengan membekukan backbone, dilanjutkan Fine-Tuning 40 layer konvolusi teratas.',
        'Mengimplementasikan optimasi hyperparameter otomatis dengan Bayesian Optimization via Keras Tuner (20 trials) untuk menemukan kombinasi parameter terbaik.',
        'Menerapkan Dynamic Data Augmentation (Gaussian Blur, Gaussian Noise, variasi kecerahan adaptif) untuk meningkatkan ketahanan model terhadap noise citra lingkungan luar.',
        'Mencapai bobot model ultra-ringan hanya 940.851 parameter (3,59 MB) dengan akurasi pengujian internal 98.15%.'
      ],
      process: [
        { title: 'Kurasi & Preprocessing Dataset', desc: 'Menggabungkan 7.573 citra daun kentang seimbang dari dataset publik Kaggle (Early Blight: 2.529, Late Blight: 2.524, Healthy: 2.520). Normalisasi piksel ke skala [-1.0, 1.0] sesuai standardisasi resmi ImageNet MobileNetV3.' },
        { title: 'Studi Ablasi Partisi & Pasangan Optimizer', desc: 'Menguji proporsi dataset (80:10:10, 70:15:15, 60:20:20) serta membandingkan performa kombinasi optimizer Adam vs SGD Nesterov untuk memastikan stabilitas konvergensi loss.' },
        { title: 'Perancangan Custom Head', desc: 'Mengintegrasikan GlobalAveragePooling2D, Dropout (0.1), dan layer klasifikasi Dense(3, Softmax).' },
        { title: 'Bayesian Hyperparameter Tuning', desc: 'Menjalankan 20 trial Bayesian Optimization untuk menemukan nilai optimal learning rate, batch size (16), dropout rate, dan jumlah layer yang di-unfreeze (40 layer).' },
        { title: 'Pelatihan Two-Phase Transfer Learning', desc: 'Fase 1 melatih head baru dengan Adam (LR 0.005), Fase 2 unfreeze 40 layer teratas dengan SGD Nesterov (LR 1e-4, momentum 0.9) dan membekukan layer BatchNorm.' },
        { title: 'Evaluasi & Domain Shift Testing', desc: 'Pengujian internal 757 citra menghasilkan akurasi 98.15% (Loss 0.0458, Macro F1 0.9815). Dilanjutkan cross-dataset testing pada 600 citra independen (akurasi 84.67%) untuk menganalisis efek pergeseran domain lingkungan nyata.' }
      ],
      tools: ['Python 3', 'TensorFlow 2.20', 'Keras 3.13', 'Scikit-Learn', 'OpenCV', 'NumPy', 'Matplotlib', 'Seaborn', 'Kaggle GPU (Tesla P100)'],
      results: 'Akurasi internal 98.15% dengan Macro F1-Score 0.9815 dan test loss 0.0458. Model hanya berukuran 3,59 MB (940.851 parameter), menjadikannya sangat siap untuk diimplementasikan ke sistem embedded / mobile monitoring petani kentang.'
    },
    'magang': {
      title: 'Pembaruan Desain UI/UX Website SILOBA di Dinas Kesehatan Provinsi Jawa Timur',
      category: 'UI/UX Design · Magang Mandiri',
      period: 'Juli – Agustus 2024 (1 Bulan)',
      image: 'assets/img/projects/magang-p51-0.jpg',
      gallery: [
        {
          src: 'assets/img/projects/magang-landing.jpg',
          webp: 'assets/img/projects/magang-landing.webp',
          alt: 'Desain High-Fidelity Landing Page Website SILOBA Dinkes Jatim',
          caption: 'Purwarupa High-Fidelity Beranda SILOBA dengan Desain Modern, Hero Section & Akses Cepat Layanan Dinkes.'
        },
        {
          src: 'assets/img/projects/magang-alokasi.jpg',
          webp: 'assets/img/projects/magang-alokasi.webp',
          alt: 'Halaman Alokasi Obat SILOBA dengan Fitur Filter Dinamis',
          caption: 'Fitur Baru Filter Dinamis Alokasi Obat berdasarkan Tahun Anggaran dan Program Kesehatan untuk 38 Kab/Kota.'
        },
        {
          src: 'assets/img/projects/magang-permintaan.jpg',
          webp: 'assets/img/projects/magang-permintaan.webp',
          alt: 'Formulir Permintaan Obat & Upload Surat Pengantar PDF',
          caption: 'Digitalisasi Formulir Pengajuan Permintaan Obat ke Dinkes Provinsi beserta Unggah Surat Pengantar PDF.'
        },
        {
          src: 'assets/img/projects/magang-pengambilan.jpg',
          webp: 'assets/img/projects/magang-pengambilan.webp',
          alt: 'Halaman Surat Bukti Pengambilan / Penjemputan Obat',
          caption: 'Antarmuka Konfirmasi Surat Bukti Pengambilan Obat Fisik oleh Petugas Farmasi Kabupaten/Kota.'
        },
        {
          src: 'assets/img/projects/magang-admin-input.jpg',
          webp: 'assets/img/projects/magang-admin-input.webp',
          alt: 'Dashboard Administrator SILOBA: Input & Rekapitulasi Alokasi Obat',
          caption: 'Dashboard Pengelola SILOBA Dinkes Jatim: Modul Input Alokasi Manual dan Rekapitulasi Kuota Obat Tahunan.'
        }
      ],
      link: 'https://www.figma.com/design/SQS2vtr7LMSkYQArgHfhKe/pkl-siloba?node-id=0-1&t=92Ai07pxTyOnAha1-1',
      linkLabel: 'Buka Desain di Figma',
      problem: [
        'Website SILOBA (Sistem Informasi Alokasi Obat) versi lama milik Dinas Kesehatan Provinsi Jawa Timur memiliki navigasi yang tidak intuitif dan informasi yang tidak terstruktur.',
        'Alur pengajuan dan konfirmasi permintaan obat antar instansi masih mengandalkan koordinasi via pesan WhatsApp manual, yang menyebabkan inefisiensi pencatatan dan lambatnya alur distribusi ke 38 Kabupaten/Kota.',
        'Tidak tersedianya fitur filter penyaringan alokasi obat berdasarkan tahun anggaran maupun program kesehatan tertentu.',
        'Antarmuka lama belum responsif, penempatan tombol rawan bug/kesalahan klik, dan dashboard admin belum menyediakan rekapitulasi data otomatis.'
      ],
      solution: [
        'Meredesain menyeluruh pengalaman pengguna (UX) dan antarmuka visual (UI) website SILOBA dengan metodologi User-Centered Design (UCD) dan pendekatan Agile.',
        'Membagi sistem ke dalam dua peran utama dengan antarmuka terdedikasi: Sisi Pengguna (Dinkes Kab/Kota) dan Sisi Administrator (Dinkes Provinsi).',
        'Menginovasikan fitur baru filter data alokasi obat dinamis berdasarkan tahun anggaran dan program kesehatan.',
        'Merancang alur digitalisasi permohonan obat dengan unggah Surat Pengantar resmi berformat PDF serta modul upload Excel otomatis untuk pembaruan kuota alokasi oleh admin.',
        'Membangun purwarupa interaktif High-Fidelity (11 halaman lengkap) di Figma dengan Auto-Layout, sistem komponen varian, dan layout grid yang konsisten.'
      ],
      process: [
        { title: 'Riset Pengguna & Analisis Kebutuhan', desc: 'Wawancara langsung dan observasi alur kerja pengelola farmasi Dinkes Kab/Kota dan administrator SILOBA Dinkes Provinsi Jawa Timur untuk memetakan pain points dan batasan teknis.' },
        { title: 'Pemodelan Sistem & Diagram UML', desc: 'Menyusun Use Case Diagram untuk aktor Pengguna dan Admin serta Activity Diagram pemetaan alur permohonan dan pengambilan obat.' },
        { title: 'Perancangan Wireframe (Lo-Fi)', desc: 'Membuat sketsa tata letak antarmuka awal untuk mengevaluasi susunan navigasi, hierarki formulir pengajuan, dan tabel riwayat alokasi obat.' },
        { title: 'Desain High-Fidelity & Prototyping (Figma)', desc: 'Membangun purwarupa interaktif 11 halaman (Landing, Login, Alokasi Obat, Permintaan Obat, Riwayat Permintaan, Pengambilan Obat, Riwayat Pengambilan, serta halaman Admin: Upload Excel, Manajemen Alokasi, Verifikasi Permintaan, Verifikasi Penjemputan).' },
        { title: 'Evaluasi Iteratif & Serah Terima Desain', desc: 'Melakukan sesi peninjauan berkala bersama pembimbing lapangan (administrator SILOBA) untuk menyempurnakan fitur dan memastikan prototipe selaras dengan rencana pengembangan sistem Dinkes Jatim.' }
      ],
      tools: ['Figma', 'Auto-Layout', 'Component Variants', 'Interactive Prototyping', 'Grid System', 'User-Centered Design (UCD)', 'Use Case & Activity Diagrams'],
      results: 'Berhasil menyelesaikan purwarupa Hi-Fi interaktif 11 halaman website SILOBA dalam waktu 1 bulan. Desain mendapat apresiasi dari mentor administrator SILOBA dan masuk ke tahap revisi rencana implementasi digitalisasi logistik farmasi Pemprov Jawa Timur.'
    },
    'jurnal-sinta4': {
      title: 'Potato Leaf Disease Classification Using MobileNetV3Small Transfer Learning with Dataset Split Ratio Comparison',
      category: 'Riset & Publikasi · Jurnal Sinta 4',
      period: 'Agustus 2026',
      image: 'assets/img/projects/skripsi-p66-0.jpeg',
      gallery: [
        {
          src: 'assets/img/projects/sinta4-dataset.jpg',
          webp: 'assets/img/projects/sinta4-dataset.webp',
          alt: 'Karakteristik & Distribusi Dataset 4.988 Citra Daun Kentang',
          caption: 'Distribusi dan Karakteristik 4.988 Citra Daun Kentang (Early Blight: 1.828, Late Blight: 1.624, Healthy: 1.536).'
        },
        {
          src: 'assets/img/projects/sinta4-flow.jpg',
          webp: 'assets/img/projects/sinta4-flow.webp',
          alt: 'Diagram Alur Eksperimen Rasio Split Dataset',
          caption: 'Metodologi Komparasi 3 Skenario Partisi (60:20:20, 70:15:15, 80:10:10) dengan 3 Kali Repetisi Independen.'
        },
        {
          src: 'assets/img/projects/sinta4-cm.jpg',
          webp: 'assets/img/projects/sinta4-cm.webp',
          alt: 'Confusion Matrix Partisi Optimal 70:15:15',
          caption: 'Confusion Matrix Skenario Optimal Rasio 70:15:15 dengan Akurasi Puncak 96.80% (Presisi Late Blight 100%).'
        },
        {
          src: 'assets/img/projects/sinta4-eval.jpg',
          webp: 'assets/img/projects/sinta4-eval.webp',
          alt: 'Tabel Evaluasi Komparasi Metrik dan Uji Stabilitas',
          caption: 'Hasil Komparasi Statistik (Mean ± Std Dev) Akurasi, Precision, Recall, dan F1-Score Antar Skenario Partisi.'
        }
      ],
      link: 'https://doi.org/10.32877/bt.v9i1.4138',
      linkLabel: 'Buka Jurnal (DOI: 10.32877/bt.v9i1.4138)',
      problem: [
        'Proporsi partisi data pelatihan, validasi, dan pengujian sering kali ditentukan secara acak tanpa pembuktian empiris dampaknya terhadap performa arsitektur transfer learning.',
        'Dibutuhkan pemahaman empiris mendalam mengenai rasio split data yang paling konsisten dan tahan terhadap variasi random seed pada model klasifikasi tanaman berbobot ringan.'
      ],
      solution: [
        'Melakukan investigasi eksperimental terhadap 3 skenario partisi berstrata: 60:20:20, 70:15:15, dan 80:10:10 pada 4.988 citra daun kentang.',
        'Masing-masing skenario diuji 3 kali repetisi independen dengan random seed berbeda untuk mendapatkan data statistik yang reliabel (mean dan standard deviation).',
        'Menggunakan arsitektur MobileNetV3Small transfer learning dua fase untuk mengevaluasi generalisasi akurasi dan metrik F1-Score.'
      ],
      process: [
        { title: 'Pengolahan Data Berstrata', desc: 'Mempersiapkan dataset 4.988 citra (Early Blight: 1.828, Late Blight: 1.624, Healthy: 1.536) dengan teknik stratified splitting.' },
        { title: 'Eksperimen Repetisi 3-Run', desc: 'Melatih model MobileNetV3Small pada setiap partisi sebanyak 3 kali percobaan berulang secara independen.' },
        { title: 'Analisis Statistik Performa', desc: 'Membandingkan metrik akurasi, presisi, recall, dan f1-score secara komparatif untuk setiap kelas penyakit.' }
      ],
      tools: ['Python', 'TensorFlow', 'Keras', 'MobileNetV3Small', 'Stratified Splitting', 'Statistical Evaluation'],
      results: 'Partisi 70:15:15 terbukti menghasilkan akurasi rata-rata tertinggi yaitu 96.53 ± 0.35% dengan puncak akurasi single-run mencapai 96.80% dan nilai presisi 100% pada kelas Late Blight. Artikel diterbitkan pada Jurnal Bit-Tech Vol. 9 No. 1 (Agustus 2026).'
    },
    'artikel-santika': {
      title: 'Klasifikasi Penyakit Daun Kentang Menggunakan Metode ResNet50',
      category: 'Riset & Publikasi · SANTIKA 2024',
      period: 'Tahun 2024 (Presenter / Pemakalah Ilmiah)',
      image: 'assets/img/projects/skripsi-p56-0.jpeg',
      gallery: [
        {
          src: 'assets/img/projects/santika-flow.jpg',
          webp: 'assets/img/projects/santika-flow.webp',
          alt: 'Diagram Alur Penelitian ResNet-50 dengan Dual Pooling',
          caption: 'Alur Riset Klasifikasi ResNet-50: Oversampling Citra Sehat, Custom Head Dual Pooling (GAP + GMP), & Fine-Tuning.'
        },
        {
          src: 'assets/img/projects/santika-curves.jpg',
          webp: 'assets/img/projects/santika-curves.webp',
          alt: 'Kurva Akurasi dan Loss Pelatihan ResNet-50 di Google Colab T4',
          caption: 'Kurva Akurasi Pelatihan Feature Extraction (40 Epoch) dan Fine-Tuning (30 Epoch) Menggunakan Akselerasi GPU T4.'
        },
        {
          src: 'assets/img/projects/santika-cm.jpg',
          webp: 'assets/img/projects/santika-cm.webp',
          alt: 'Confusion Matrix Evaluasi ResNet-50 pada 405 Citra Uji',
          caption: 'Confusion Matrix Uji ResNet-50 (Akurasi 82.72%, Early Blight F1-Score 0.8822) Dipresentasikan di Forum SANTIKA 2024.'
        }
      ],
      link: null,
      linkLabel: null,
      problem: [
        'Tantangan ketidakseimbangan jumlah data (class imbalance) antara citra daun sehat dan citra daun berpenyakit pada dataset publik PLD.',
        'Kebutuhan eksplorasi performa arsitektur residual network (ResNet50) dalam mengekstrak fitur patologi daun kentang sebelum melangkah ke arsitektur mobile yang lebih ringan.'
      ],
      solution: [
        'Menerapkan teknik oversampling pada kelas minoritas (Healthy) untuk menyeimbangkan representasi kelas data latih.',
        'Merancang custom classification head dengan mekanisme Dual Pooling (menggabungkan Global Average Pooling dan Global Max Pooling) untuk menangkap fitur latar global sekaligus fitur lesi penyakit spesifik.',
        'Menerapkan transfer learning dua fase dengan regularisasi Dropout dan Label Smoothing.'
      ],
      process: [
        { title: 'Oversampling Citra Daun Sehat', desc: 'Menambah 487 sampel citra daun sehat yang diaugmentasi sehingga jumlah kelas seimbang di angka 1.303 sampel.' },
        { title: 'Perancangan Head Dual Pooling', desc: 'Menggabungkan GAP dan GMP yang disambungkan ke dense layer 512 dan 256 sebelum layer output softmax.' },
        { title: 'Pelatihan GPU Google Colab', desc: 'Pelatihan fase Feature Extraction 40 epoch dan Fine-Tuning 30 epoch menggunakan akselerasi GPU NVIDIA T4.' },
        { title: 'Presentasi Forum Seminar Nasional', desc: 'Mempresentasikan hasil temuan dan naskah ilmiah sebagai Presenter / Pemakalah pada Seminar Nasional Informatika Bela Negara (SANTIKA) Volume 4.' }
      ],
      tools: ['Python', 'TensorFlow', 'Keras', 'ResNet50', 'Dual Pooling (GAP+GMP)', 'Google Colab GPU T4'],
      results: 'Mencapai akurasi pengujian 82.72% pada 405 citra uji dengan performa tertinggi pada kelas Early Blight (F1-Score 0.8822). Penulis bertindak langsung sebagai Presenter / Pemakalah Artikel Ilmiah pada seminar nasional SANTIKA 2024.'
    }
  };

  // --- Filter ---
  (() => {
    const filterBtns = document.querySelectorAll('[data-filter]');
    const projectCards = document.querySelectorAll('[data-category]');
    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          const shouldShow = filter === 'all' || category === filter;

          if (shouldShow) {
            card.style.display = '';
            void card.offsetHeight;
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.96)';
            setTimeout(() => {
              if (card.style.opacity === '0') {
                card.style.display = 'none';
              }
            }, 300);
          }
        });
      });
    });
  })();

  // --- Modal Logic ---
  (() => {
    const modal = document.getElementById('project-modal');
    if (!modal) return;

    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalPeriod = document.getElementById('modal-period');
    const modalTools = document.getElementById('modal-tools');
    const modalResults = document.getElementById('modal-results');
    const modalLink = document.getElementById('modal-link');
    const modalLinkText = document.getElementById('modal-link-text');

    const modalProblemSec = document.getElementById('modal-problem-sec');
    const modalProblem = document.getElementById('modal-problem');
    const modalSolutionSec = document.getElementById('modal-solution-sec');
    const modalSolution = document.getElementById('modal-solution');
    const modalProcessSec = document.getElementById('modal-process-sec');
    const modalProcess = document.getElementById('modal-process');

    // Gallery Elements
    const modalGalleryStage = document.getElementById('modal-gallery-stage');
    const modalGalleryPrev = document.getElementById('modal-gallery-prev');
    const modalGalleryNext = document.getElementById('modal-gallery-next');
    const modalGalleryBadge = document.getElementById('modal-gallery-badge');
    const modalGalleryCaption = document.getElementById('modal-gallery-caption');
    const modalGalleryThumbs = document.getElementById('modal-gallery-thumbs');

    let currentGallery = [];
    let currentGalleryIndex = 0;
    let previouslyFocusedElement = null;

    function renderGalleryImage(index, animate = false) {
      if (!currentGallery.length) return;
      currentGalleryIndex = (index + currentGallery.length) % currentGallery.length;
      const item = currentGallery[currentGalleryIndex];

      if (modalImage) {
        if (animate) {
          modalImage.style.opacity = '0.35';
          modalImage.style.transform = 'scale(0.985)';
          setTimeout(() => {
            modalImage.src = item.src;
            modalImage.alt = item.alt || '';
            modalImage.style.opacity = '1';
            modalImage.style.transform = 'scale(1)';
          }, 120);
        } else {
          modalImage.src = item.src;
          modalImage.alt = item.alt || '';
        }
      }

      if (modalGalleryBadge) {
        modalGalleryBadge.textContent = `${currentGalleryIndex + 1} / ${currentGallery.length}`;
      }

      if (modalGalleryCaption) {
        modalGalleryCaption.textContent = item.caption || '';
        modalGalleryCaption.style.display = item.caption ? '' : 'none';
      }

      if (modalGalleryThumbs) {
        const thumbs = modalGalleryThumbs.querySelectorAll('.modal__gallery-thumb');
        thumbs.forEach((th, i) => {
          const isActive = i === currentGalleryIndex;
          th.classList.toggle('active', isActive);
          th.setAttribute('aria-selected', isActive ? 'true' : 'false');
          if (isActive) {
            th.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
          }
        });
      }
    }

    function openModal(projectId) {
      const data = projectsData[projectId];
      if (!data) return;

      previouslyFocusedElement = document.activeElement;

      // Populate Project Info
      if (modalTitle) modalTitle.textContent = data.title;
      if (modalCategory) modalCategory.textContent = data.category;
      if (modalPeriod) modalPeriod.textContent = data.period;

      // Gallery setup
      currentGallery = (data.gallery && data.gallery.length)
        ? data.gallery
        : [{ src: data.image, alt: data.title, caption: '' }];
      currentGalleryIndex = 0;

      if (modalGalleryThumbs) {
        modalGalleryThumbs.innerHTML = '';
        if (currentGallery.length > 1) {
          currentGallery.forEach((item, idx) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'modal__gallery-thumb' + (idx === 0 ? ' active' : '');
            btn.setAttribute('role', 'tab');
            btn.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
            btn.setAttribute('aria-label', `Lihat gambar ${idx + 1}: ${item.alt || item.caption || ''}`);
            btn.innerHTML = `<img src="${item.webp || item.src}" alt="${item.alt || ''}" width="68" height="44" loading="lazy">`;
            btn.addEventListener('click', (e) => {
              e.stopPropagation();
              renderGalleryImage(idx, true);
            });
            modalGalleryThumbs.appendChild(btn);
          });
          modalGalleryThumbs.style.display = 'flex';
          if (modalGalleryPrev) modalGalleryPrev.hidden = false;
          if (modalGalleryNext) modalGalleryNext.hidden = false;
          if (modalGalleryBadge) modalGalleryBadge.style.display = '';
        } else {
          modalGalleryThumbs.style.display = 'none';
          if (modalGalleryPrev) modalGalleryPrev.hidden = true;
          if (modalGalleryNext) modalGalleryNext.hidden = true;
          if (modalGalleryBadge) modalGalleryBadge.style.display = 'none';
        }
      }

      renderGalleryImage(0, false);

      // Problem Section
      if (modalProblemSec && modalProblem) {
        if (data.problem && data.problem.length) {
          modalProblemSec.style.display = '';
          modalProblem.innerHTML = Array.isArray(data.problem)
            ? '<ul class="modal__list">' + data.problem.map((item) => `<li>${item}</li>`).join('') + '</ul>'
            : `<p>${data.problem}</p>`;
        } else {
          modalProblemSec.style.display = 'none';
        }
      }

      // Solution Section
      if (modalSolutionSec && modalSolution) {
        if (data.solution && data.solution.length) {
          modalSolutionSec.style.display = '';
          modalSolution.innerHTML = Array.isArray(data.solution)
            ? '<ul class="modal__list">' + data.solution.map((item) => `<li>${item}</li>`).join('') + '</ul>'
            : `<p>${data.solution}</p>`;
        } else {
          modalSolutionSec.style.display = 'none';
        }
      }

      // Process Section
      if (modalProcessSec && modalProcess) {
        if (data.process && data.process.length) {
          modalProcessSec.style.display = '';
          modalProcess.innerHTML = Array.isArray(data.process)
            ? '<ol class="modal__step-list">' +
              data.process.map((step) => `<li><strong>${step.title}:</strong> ${step.desc}</li>`).join('') +
              '</ol>'
            : `<p>${data.process}</p>`;
        } else {
          modalProcessSec.style.display = 'none';
        }
      }

      // Tools badges
      if (modalTools) {
        modalTools.innerHTML = '';
        if (data.tools && data.tools.length) {
          data.tools.forEach((tool) => {
            const badge = document.createElement('span');
            badge.className = 'badge';
            badge.textContent = tool;
            modalTools.appendChild(badge);
          });
        }
      }

      // Results
      if (modalResults) {
        modalResults.innerHTML = data.results ? `<p>${data.results}</p>` : '';
      }

      // Link button
      if (modalLink) {
        if (data.link) {
          modalLink.href = data.link;
          modalLink.style.display = '';
          if (modalLinkText) modalLinkText.textContent = data.linkLabel || 'Buka Tautan';
        } else {
          modalLink.href = '#';
          modalLink.style.display = 'none';
        }
      }

      modal.classList.add('active');
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
      modal.setAttribute('tabindex', '-1');
      modal.focus();
    }

    function closeModal() {
      modal.classList.remove('active');
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      if (previouslyFocusedElement) {
        previouslyFocusedElement.focus();
        previouslyFocusedElement = null;
      }
    }

    // Prev / Next button listeners
    if (modalGalleryPrev) {
      modalGalleryPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        renderGalleryImage(currentGalleryIndex - 1, true);
      });
    }

    if (modalGalleryNext) {
      modalGalleryNext.addEventListener('click', (e) => {
        e.stopPropagation();
        renderGalleryImage(currentGalleryIndex + 1, true);
      });
    }

    // Click stage to zoom in Lightbox
    if (modalGalleryStage) {
      modalGalleryStage.addEventListener('click', (e) => {
        if (e.target.closest('.modal__gallery-btn')) return;
        if (!currentGallery.length) return;
        const currentItem = currentGallery[currentGalleryIndex];
        if (window.openPortfolioLightbox) {
          window.openPortfolioLightbox(currentItem.src, currentItem.caption || currentItem.alt);
        }
      });

      modalGalleryStage.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (e.target.closest('.modal__gallery-btn')) return;
          e.preventDefault();
          const currentItem = currentGallery[currentGalleryIndex];
          if (window.openPortfolioLightbox) {
            window.openPortfolioLightbox(currentItem.src, currentItem.caption || currentItem.alt);
          }
        }
      });

      // Touch swipe gestures
      let touchStartX = 0;
      let touchStartY = 0;
      modalGalleryStage.addEventListener('touchstart', (e) => {
        if (e.changedTouches && e.changedTouches.length) {
          touchStartX = e.changedTouches[0].screenX;
          touchStartY = e.changedTouches[0].screenY;
        }
      }, { passive: true });

      modalGalleryStage.addEventListener('touchend', (e) => {
        if (e.changedTouches && e.changedTouches.length) {
          const touchEndX = e.changedTouches[0].screenX;
          const touchEndY = e.changedTouches[0].screenY;
          const diffX = touchEndX - touchStartX;
          const diffY = touchEndY - touchStartY;
          if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX < 0) {
              renderGalleryImage(currentGalleryIndex + 1, true);
            } else {
              renderGalleryImage(currentGalleryIndex - 1, true);
            }
          }
        }
      }, { passive: true });
    }

    // Open modal on project card click (unless clicking link/button)
    document.querySelectorAll('[data-project]').forEach((card) => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('a') || e.target.closest('button')) return;
        openModal(card.getAttribute('data-project'));
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (e.target.closest('a') || e.target.closest('button')) return;
          e.preventDefault();
          openModal(card.getAttribute('data-project'));
        }
      });
    });

    // Explicit detail buttons inside cards
    document.querySelectorAll('[data-open-modal]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const projectId = btn.getAttribute('data-open-modal');
        if (projectId) openModal(projectId);
      });
    });

    // Close modal on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    // Close button
    const closeBtn = modal.querySelector('.modal-close, [data-modal-close]');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Escape and Arrow keys
    document.addEventListener('keydown', (e) => {
      const lightbox = document.getElementById('lightbox');
      const isLightboxActive = lightbox && lightbox.classList.contains('active');

      if (e.key === 'Escape' && modal.classList.contains('active') && !isLightboxActive) {
        closeModal();
      }

      if (modal.classList.contains('active') && !isLightboxActive && currentGallery.length > 1) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          renderGalleryImage(currentGalleryIndex - 1, true);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          renderGalleryImage(currentGalleryIndex + 1, true);
        }
      }
    });

    // Focus trapping
    modal.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      if (!modal.classList.contains('active')) return;

      const focusable = modal.querySelectorAll(
        'a[href], button:not([hidden]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first || document.activeElement === modal) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  })();

  /* ----------------------------------------------------------
     5. CERTIFICATE LIGHTBOX
     ---------------------------------------------------------- */
  (() => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    if (!lightbox) return;

    function openLightbox(imgSrc, caption) {
      if (lightboxImg) lightboxImg.src = imgSrc;
      if (lightboxCaption) lightboxCaption.textContent = caption || '';
      lightbox.classList.add('active');
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
      lightbox.setAttribute('tabindex', '-1');
      lightbox.focus();
    }

    // Expose for project gallery zoom
    window.openPortfolioLightbox = openLightbox;

    function closeLightbox() {
      lightbox.classList.remove('active');
      const projectModal = document.getElementById('project-modal');
      const isProjectModalActive = projectModal && projectModal.classList.contains('active');
      if (!isProjectModalActive) {
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
      }
      if (lightboxImg) lightboxImg.src = '';
    }

    // Open on cert card click (unless clicking credential button)
    document.querySelectorAll('.cert-card').forEach((card) => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('a') || e.target.closest('button')) return;
        const imgPath = card.getAttribute('data-img');
        const caption = card.getAttribute('data-caption') || '';
        if (imgPath) openLightbox(imgPath, caption);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (e.target.closest('a') || e.target.closest('button')) return;
          e.preventDefault();
          const imgPath = card.getAttribute('data-img');
          const caption = card.getAttribute('data-caption') || '';
          if (imgPath) openLightbox(imgPath, caption);
        }
      });
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    const closeBtn = lightbox.querySelector('.lightbox-close, [data-lightbox-close]');
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  })();

  /* ----------------------------------------------------------
     6. PERMANENT DARK THEME
     ---------------------------------------------------------- */
  (() => {
    document.documentElement.classList.remove('light');
    document.documentElement.setAttribute('data-theme', 'dark');
    try {
      localStorage.removeItem('theme');
    } catch {}
  })();

  /* ----------------------------------------------------------
     7. COUNT-UP ANIMATION ON STATS (FIXED DECIMAL HANDLING)
     ---------------------------------------------------------- */
  (() => {
    const counters = document.querySelectorAll('.count-up');
    if (!counters.length) return;

    const DURATION = 2000;

    function getDecimals(el) {
      if (!el.hasAttribute('data-decimal')) return 0;
      const val = el.getAttribute('data-decimal');
      if (val === '' || val === 'true') return 2;
      const parsed = parseInt(val, 10);
      return isNaN(parsed) ? 2 : parsed;
    }

    function animateCount(el) {
      const target = parseFloat(el.getAttribute('data-target'));
      const decimals = getDecimals(el);
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const t = Math.min(elapsed / DURATION, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const current = eased * target;

        el.textContent = current.toFixed(decimals);

        if (t < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target.toFixed(decimals);
        }
      }

      requestAnimationFrame(update);
    }

    if (prefersReducedMotion.matches) {
      counters.forEach((el) => {
        const target = parseFloat(el.getAttribute('data-target'));
        const decimals = getDecimals(el);
        el.textContent = target.toFixed(decimals);
      });
      return;
    }

    const countObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    counters.forEach((el) => countObserver.observe(el));
  })();

  /* ----------------------------------------------------------
     8. NAVBAR FUNCTIONALITY
     ---------------------------------------------------------- */
  (() => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
          } else {
            navbar.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();

  // --- Active section highlighting ---
  (() => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    if (!navLinks.length || !sections.length) return;

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
          }
        });
      },
      { threshold: 0.3, rootMargin: '-70px 0px -40% 0px' }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  })();

  // --- Smooth scroll on nav link click ---
  (() => {
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  })();

  // --- Mobile menu drawer toggle ---
  (() => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navBackdrop = document.getElementById('nav-backdrop');
    if (!hamburger || !navMenu) return;

    function openMenu() {
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      navMenu.classList.add('active');
      if (navBackdrop) navBackdrop.classList.add('active');
      document.body.classList.add('menu-open');
    }

    function closeMenu() {
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('active');
      if (navBackdrop) navBackdrop.classList.remove('active');
      document.body.classList.remove('menu-open');
    }

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.contains('active');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (navBackdrop) {
      navBackdrop.addEventListener('click', closeMenu);
    }

    navMenu.querySelectorAll('.nav-link, .btn--mobile-cv').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMenu();
      }
    });

    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        closeMenu();
      }
    });
  })();

  /* ----------------------------------------------------------
     9. SCROLL PROGRESS BAR
     ---------------------------------------------------------- */
  (() => {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    let ticking = false;

    function updateProgress() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const maxScroll = scrollHeight - clientHeight;

      const percentage = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
      progressBar.style.width = `${percentage}%`;
    }

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            updateProgress();
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );

    updateProgress();
  })();

  /* ----------------------------------------------------------
     10. COMMAND PALETTE (CTRL/CMD+K)
     ---------------------------------------------------------- */
  (() => {
    const palette = document.getElementById('cmd-palette');
    const input = document.getElementById('cmd-input');
    const list = document.getElementById('cmd-list');
    const backdrop = document.getElementById('cmd-backdrop');
    const closeBtn = document.getElementById('cmd-close');
    const searchBtn = document.getElementById('search-btn');

    if (!palette || !input || !list) return;

    let selectedIndex = 0;
    let filteredItems = [];

    const searchableItems = [
      {
        title: 'Tentang Saya (About)',
        sub: 'Profil & Rekapitulasi Akademik IPK 3.82',
        category: 'Navigasi',
        action: () => scrollToSection('#about')
      },
      {
        title: 'Projek Skripsi: Klasifikasi Penyakit Kentang',
        sub: 'MobileNetV3-Small (98.67% Akurasi)',
        category: 'Projek',
        action: () => openProjectModal('skripsi')
      },
      {
        title: 'Projek Magang: Redesain SILOBA Dinkes Jatim',
        sub: 'Figma UI/UX & Evaluasi Desain Bersama Dinkes Jatim',
        category: 'Projek',
        action: () => openProjectModal('magang')
      },
      {
        title: 'Publikasi Jurnal Sinta 4',
        sub: 'Jurnal RESTI / Sinta 4 - UPN Veteran Jatim',
        category: 'Publikasi',
        action: () => scrollToSection('#projects')
      },
      {
        title: 'Artikel SANTIKA ResNet-50',
        sub: 'Seminar Nasional SANTIKA UPN Veteran Jatim',
        category: 'Publikasi',
        action: () => scrollToSection('#projects')
      },
      {
        title: 'Skills: Machine Learning & Deep Learning',
        sub: 'TensorFlow, Keras, CNN, Scikit-Learn',
        category: 'Skills',
        action: () => scrollToSection('#skills')
      },
      {
        title: 'Skills: UI/UX & Product Design',
        sub: 'Figma, Prototyping, Wireframing, Usability Testing',
        category: 'Skills',
        action: () => scrollToSection('#skills')
      },
      {
        title: 'Skills: Web Development & Cloud',
        sub: 'HTML5, CSS3, JavaScript, Node.js, Hapi, GCP',
        category: 'Skills',
        action: () => scrollToSection('#skills')
      },
      {
        title: 'Soft Skills & Other Tools',
        sub: 'Komunikatif, Berpikir Kritis, Analitis, Canva, DaVinci Resolve, MS Office',
        category: 'Skills',
        action: () => scrollToSection('#skills')
      },
      {
        title: 'Riwayat Pendidikan & Pengalaman',
        sub: 'UPN Veteran Jatim, Bangkit Academy, Dinkes Jatim',
        category: 'Timeline',
        action: () => scrollToSection('#timeline')
      },
      {
        title: 'Sertifikat & Lisensi',
        sub: 'BNSP Junior Web, Bangkit Cloud, BISA AI Excel, Dicoding',
        category: 'Sertifikat',
        action: () => scrollToSection('#certificates')
      },
      {
        title: 'Sertifikat Basic Excel — BISA AI Academy',
        sub: 'Pelatihan Asinkronus Microsoft Excel (No: 2026/294/76203)',
        category: 'Sertifikat',
        action: () => scrollToSection('#certificates')
      },
      {
        title: 'Minat & Hobi',
        sub: 'Komputer Vision, Riset UI/UX, Badminton, Catur',
        category: 'Minat',
        action: () => scrollToSection('#interests')
      },
      {
        title: 'Hubungi Saya (Kontak)',
        sub: 'Email & LinkedIn Muhammad Ahsanur Rafi',
        category: 'Kontak',
        action: () => scrollToSection('#contact')
      },
      {
        title: 'Download Curriculum Vitae (CV)',
        sub: 'CV_Muhammad_Ahsanur_Rafi.pdf (68 KB)',
        category: 'Aksi',
        action: () => downloadCV()
      }
    ];

    function scrollToSection(selector) {
      const el = document.querySelector(selector);
      if (el) {
        closePalette();
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }

    function openProjectModal(id) {
      closePalette();
      const modalTrigger = document.querySelector(`[data-open-modal="${id}"]`) || document.querySelector(`[data-project="${id}"]`);
      if (modalTrigger) {
        modalTrigger.click();
      } else {
        scrollToSection('#projects');
      }
    }

    function downloadCV() {
      closePalette();
      const cvLink = document.querySelector('.navbar__cv-btn') || document.querySelector('.btn--mobile-cv');
      if (cvLink) {
        cvLink.click();
      } else {
        window.open('assets/cv/CV_Muhammad_Ahsanur_Rafi.pdf', '_blank');
      }
    }

    function openPalette() {
      palette.style.display = 'flex';
      void palette.offsetWidth; // trigger layout
      palette.classList.add('active');
      document.body.classList.add('modal-open');
      input.value = '';
      filterItems('');
      setTimeout(() => input.focus(), 60);
    }

    function closePalette() {
      palette.classList.remove('active');
      document.body.classList.remove('modal-open');
      setTimeout(() => {
        if (!palette.classList.contains('active')) {
          palette.style.display = 'none';
        }
      }, 260);
    }

    function renderList() {
      list.innerHTML = '';
      if (filteredItems.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'cmd-palette__empty';
        empty.textContent = 'Tidak ada hasil untuk pencarian tersebut.';
        list.appendChild(empty);
        return;
      }

      filteredItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = `cmd-palette__item ${index === selectedIndex ? 'selected' : ''}`;
        li.setAttribute('role', 'option');
        li.setAttribute('aria-selected', index === selectedIndex ? 'true' : 'false');

        li.innerHTML = `
          <div class="cmd-palette__item-main">
            <span class="cmd-palette__item-icon">
              <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </span>
            <div>
              <span class="cmd-palette__item-title">${escapeHTML(item.title)}</span>
              <span class="cmd-palette__item-sub">${escapeHTML(item.sub)}</span>
            </div>
          </div>
          <span class="cmd-palette__item-badge">${escapeHTML(item.category)}</span>
        `;

        li.addEventListener('click', () => {
          item.action();
        });

        li.addEventListener('mouseenter', () => {
          selectedIndex = index;
          updateSelection();
        });

        list.appendChild(li);
      });

      ensureSelectedVisible();
    }

    function escapeHTML(str) {
      return str.replace(/[&<>'"]/g, (tag) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag));
    }

    function updateSelection() {
      const items = list.querySelectorAll('.cmd-palette__item');
      items.forEach((el, idx) => {
        el.classList.toggle('selected', idx === selectedIndex);
        el.setAttribute('aria-selected', idx === selectedIndex ? 'true' : 'false');
      });
      ensureSelectedVisible();
    }

    function ensureSelectedVisible() {
      const selected = list.children[selectedIndex];
      if (selected && typeof selected.scrollIntoView === 'function') {
        selected.scrollIntoView({ block: 'nearest' });
      }
    }

    function filterItems(query) {
      const q = query.toLowerCase().trim();
      if (!q) {
        filteredItems = [...searchableItems];
      } else {
        filteredItems = searchableItems.filter((item) =>
          item.title.toLowerCase().includes(q) ||
          item.sub.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );
      }
      selectedIndex = 0;
      renderList();
    }

    input.addEventListener('input', (e) => {
      filterItems(e.target.value);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (filteredItems.length > 0) {
          selectedIndex = (selectedIndex + 1) % filteredItems.length;
          updateSelection();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (filteredItems.length > 0) {
          selectedIndex = (selectedIndex - 1 + filteredItems.length) % filteredItems.length;
          updateSelection();
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closePalette();
      }
    });

    // Global Shortcut: Ctrl+K or Cmd+K
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        if (palette.classList.contains('active')) {
          closePalette();
        } else {
          openPalette();
        }
      }
    });

    if (searchBtn) {
      searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openPalette();
      });
    }

    if (backdrop) backdrop.addEventListener('click', closePalette);
    if (closeBtn) closeBtn.addEventListener('click', closePalette);
  })();
});
