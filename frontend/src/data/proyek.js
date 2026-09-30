export const IDENTITAS = {
  kompetisi: 'KOMPRES 16 (2026)',
  namaTim: 'MONITOR ≠ JANITOR',
  institusi: 'Universitas Gunadarma',
}

export const ANGGOTA = [
  { nama: 'Aldi Kurnia Fadillah', npm: '50423106' },
  { nama: 'Alexandro Kalindra E.', npm: '50423111' },
  { nama: 'Rahmah Dwi Afifah', npm: '11123092' },
  { nama: 'Yazid Hilmi Allamsyah', npm: '51423474' },
]

export const RINGKASAN =
  'Aplikasi ini memperkirakan produksi padi bulanan tingkat kabupaten di Jawa Timur ' +
  '(Bojonegoro, Jember, Ngawi, Tuban, dan Lamongan) dari indeks vegetasi yang dihitung ' +
  'dari citra satelit Sentinel-2. Pengguna cukup memilih kabupaten, tahun, dan bulan; ' +
  'seluruh pengolahan citra dan prediksi dijalankan otomatis oleh server.'

export const ALUR = [
  {
    judul: 'Citra satelit Sentinel-2',
    isi: 'Citra permukaan bumi dari Sentinel-2 Level-2A diakses melalui Google Earth Engine pada resolusi 10 meter.',
  },
  {
    judul: 'Pra-pemrosesan citra',
    isi: 'Piksel berawan disaring dengan s2cloudless, lalu citra dalam satu bulan digabung menjadi satu komposit median.',
  },
  {
    judul: 'Indeks vegetasi pada lahan sawah',
    isi: 'NDVI, EVI, dan SAVI dihitung, kemudian dirata-ratakan hanya pada area sawah tiap kabupaten.',
  },
  {
    judul: 'Rekayasa fitur',
    isi: 'Indeks bulan berjalan digabung dengan nilai bulan sebelumnya (lag), perubahan antarbulan, rata-rata bergulir, tren, pola musiman, dan identitas wilayah menjadi 18 fitur.',
  },
  {
    judul: 'Model prediksi TabPFN',
    isi: 'Fitur diproses oleh model TabPFN yang hiperparameternya dituning, dan menghasilkan estimasi produksi dalam Ton.',
  },
  {
    judul: 'Prediksi dan penjelasan hasil',
    isi: 'Hasil dibandingkan dengan statistik historis kabupaten untuk menyusun kategori, penjelasan, grafik riwayat, dan peta.',
  },
]

export const CARA_KERJA = [
  'Pengguna memilih kabupaten, tahun, dan bulan, lalu menekan tombol Prediksi.',
  'Server mengambil citra Sentinel-2 bulan tersebut dari Google Earth Engine, menyaring awan, membentuk komposit median, dan menghitung rata-rata NDVI, EVI, dan SAVI pada area sawah kabupaten.',
  'Indeks dua bulan sebelumnya diambil dari basis data historis untuk membentuk fitur lag, delta, tren, dan rata-rata bergulir. Jika data dua bulan sebelumnya belum lengkap, prediksi ditolak agar tidak menghasilkan angka yang keliru.',
  'Ke-18 fitur dikirim ke model TabPFN yang mengembalikan estimasi produksi dalam Ton.',
  'Hasil dibandingkan dengan statistik historis untuk menyusun penjelasan dan grafik riwayat. Server juga menghitung prediksi bulan-bulan antara data terakhir dan bulan target, sementara peta menampilkan komposit NDVI dan batas area sawah.',
]

export const SUMBER_DATA = [
  { komponen: 'Citra satelit', keterangan: 'Sentinel-2 Level-2A (COPERNICUS/S2_SR_HARMONIZED) melalui Google Earth Engine, resolusi 10 meter.' },
  { komponen: 'Penyaringan awan', keterangan: 'Sentinel-2 Cloud Probability (s2cloudless) dengan ambang probabilitas awan 40%.' },
  { komponen: 'Area analisis', keterangan: 'Batas administrasi dan lahan sawah kabupaten dari data Rupabumi Indonesia (RBI) skala 1:25.000.' },   // ISI: pastikan sesuai
  { komponen: 'Data produksi', keterangan: 'Data produksi padi bulanan per kabupaten dari Badan Pusat Statistik (BPS), periode 2019 sampai 2024.' },   // ISI: pastikan sesuai
  { komponen: 'Model', keterangan: 'TabPFN (regresi) dengan hiperparameter dituning menggunakan Optuna. Pada tahap eksperimen dibandingkan dengan TimesFM dan TimeGPT.' },
  { komponen: 'Skema evaluasi', keterangan: 'Model dilatih dengan data sampai 2023 dan diuji pada data 2024. Model pada aplikasi dilatih ulang dengan seluruh data yang tersedia.' },
  { komponen: 'Teknologi aplikasi', keterangan: 'Backend FastAPI, frontend React dengan Leaflet dan Recharts, dijalankan di SnapDeploy dan Vercel.' },
]

export const KETERBATASAN = [
  'Wilayah kajian terbatas pada Lamongan, Bojonegoro, Ngawi, Jember, dan Tuban. Hasil pengujian belum mewakili seluruh wilayah Indonesia.',
  'Purwarupa tidak dirancang untuk menghasilkan prediksi pada tingkat wilayah yang lebih kecil, seperti kecamatan, desa, atau lahan individual.',
  'Dataset pemodelan mencakup data bulanan 2019–2024. Data 2019–2023 digunakan untuk pengembangan model dan data 2024 sebagai pengujian akhir.',
  'Kualitas indeks vegetasi bergantung pada ketersediaan citra bebas awan. Pada bulan dengan tutupan awan tebal, jumlah citra dapat sedikit atau tidak tersedia.',
  'Purwarupa menghasilkan informasi pendukung pemantauan. Angka evaluasi penelitian berlaku pada pipeline pengembangan; kinerja pipeline operasional memerlukan pengujian tersendiri karena terdapat perbedaan pembentukan komposit dan mask lahan.',
]

export const PENGANTAR = {
  paragraf:
    'Aplikasi ini memperkirakan produksi padi bulanan tingkat kabupaten di Jawa Timur menggunakan indeks ' +
    'vegetasi (NDVI, EVI, SAVI) yang dihitung dari citra satelit Sentinel-2, dikombinasikan dengan model ' +
    'machine learning TabPFN. Prediksi ini membantu memberi gambaran awal kondisi produksi padi tanpa ' +
    'menunggu laporan resmi, misalnya untuk pemantauan dini atau perencanaan yang bersifat indikatif.',
  poin: [
    { label: 'Kabupaten tersedia', isi: 'Bojonegoro, Jember, Ngawi, Tuban, dan Lamongan' },
    { label: 'Rentang periode', isi: 'Tahun 2019 sampai 2026' },
    { label: 'Indeks yang digunakan', isi: 'NDVI, EVI, dan SAVI dari citra Sentinel-2' },
  ],
}
