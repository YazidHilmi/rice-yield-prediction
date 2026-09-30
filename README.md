# Rice Yield Prediction

Aplikasi web untuk memperkirakan produksi padi bulanan di lima kabupaten Jawa Timur: Bojonegoro, Jember, Ngawi, Tuban, dan Lamongan. Sistem mengolah indeks vegetasi NDVI, EVI, dan SAVI dari citra Sentinel-2, menggabungkannya dengan fitur historis, lalu menghasilkan estimasi produksi menggunakan TabPFN.

Project ini dikembangkan oleh tim **MONITOR ≠ JANITOR** untuk KOMPRES 16 (2026), Universitas Gunadarma.

## Arsitektur

Repository ini berbentuk monorepo:

```text
rice-yield-prediction/
├── backend/       FastAPI, Earth Engine, TabPFN, dan SQLite
├── frontend/      React + Vite
├── Dockerfile     Image backend untuk deployment Blitz Cloud
└── README.md
```

Alur utama aplikasi:

```text
Pengguna membuka frontend
        ↓
Frontend memeriksa health-check backend
        ↓
Pengguna memilih kabupaten, tahun, dan bulan
        ↓
Backend mengambil dan mengolah citra Sentinel-2 melalui Earth Engine
        ↓
Backend membentuk fitur dan menjalankan model TabPFN
        ↓
Frontend menampilkan prediksi, penjelasan, grafik, dan peta
```

## Tech stack

### Frontend

- React 19
- Vite 8
- Axios
- Leaflet dan React Leaflet
- Recharts
- Deployment: Vercel

### Backend

- Python 3.10
- FastAPI dan Uvicorn
- Google Earth Engine API dan Geemap
- TabPFN Client
- Pandas dan NumPy
- SQLAlchemy dan SQLite
- Docker
- Deployment: Blitz Cloud

## Prasyarat

Siapkan perangkat berikut:

- Git
- Python 3.10 atau versi kompatibel
- Node.js dan npm
- Akun serta project Google Earth Engine
- Google Cloud service account yang memiliki akses ke project Earth Engine
- Token TabPFN

## Setup lokal

### 1. Clone repository

```bash
git clone https://github.com/YazidHilmi/rice-yield-prediction.git
cd rice-yield-prediction
```

### 2. Setup backend

Masuk ke folder backend dan buat virtual environment:

```bash
cd backend
python -m venv .venv
```

Aktifkan virtual environment.

Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

Linux/macOS:

```bash
source .venv/bin/activate
```

Instal dependensi:

```bash
pip install -r requirements.txt
```

Salin contoh environment variable:

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Linux/macOS:

```bash
cp .env.example .env
```

Isi `backend/.env` dengan kredensial milik sendiri. Jangan commit file tersebut.

Jalankan backend dari folder `backend`:

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Backend lokal tersedia di:

- Health-check: `http://127.0.0.1:8000/`
- Dokumentasi Swagger: `http://127.0.0.1:8000/docs`
- Base API: `http://127.0.0.1:8000/api`

Saat startup, backend akan menginisialisasi SQLite, melakukan seed data, mengautentikasi Earth Engine, serta memuat model TabPFN. Startup pertama dapat memerlukan waktu lebih lama.

### 3. Setup frontend

Buka terminal baru dari root repository:

```bash
cd frontend
npm install
```

Salin contoh environment variable:

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Linux/macOS:

```bash
cp .env.example .env
```

Jalankan frontend:

```bash
npm run dev
```

Frontend lokal tersedia di `http://localhost:5173`.

## Environment variables

### Backend

| Variable | Wajib | Keterangan |
| --- | --- | --- |
| `GEE_PROJECT_ID` | Ya | ID Google Cloud project yang digunakan Earth Engine. |
| `GEE_SERVICE_ACCOUNT_JSON` | Salah satu | Path menuju file JSON service account; cocok untuk lokal. |
| `GEE_SERVICE_ACCOUNT_JSON_CONTENT` | Salah satu | Isi lengkap JSON service account; cocok untuk deployment. |
| `TABPFN_TOKEN` | Ya | Token akses TabPFN. |
| `DB_PATH` | Tidak | Lokasi database SQLite. Default-nya `backend/data/app.db`. |

Gunakan salah satu dari `GEE_SERVICE_ACCOUNT_JSON` atau `GEE_SERVICE_ACCOUNT_JSON_CONTENT`. Jangan menyimpan file service account, token, atau isi JSON asli di Git.

### Frontend

| Variable | Wajib | Keterangan |
| --- | --- | --- |
| `VITE_API_BASE_URL` | Ya | Base URL backend yang diakhiri `/api`. |

## Endpoint utama

| Method | Endpoint | Fungsi |
| --- | --- | --- |
| `GET` | `/` | Health-check backend. |
| `POST` | `/api/predict` | Menghitung prediksi produksi padi. |
| `POST` | `/api/map-layer` | Menghasilkan layer peta citra/indeks. |
| `POST` | `/api/interpret` | Menyusun interpretasi hasil prediksi. |
| `POST` | `/api/predict-trajectory` | Menghasilkan trajectory prediksi bulanan. |
| `GET` | `/api/model-info` | Mengambil informasi dan metrik model. |

Contoh payload prediksi:

```json
{
  "kabupaten": "Ngawi",
  "tahun": 2024,
  "bulan": 6
}
```

## Build frontend

```bash
cd frontend
npm run build
```

Hasil build berada di `frontend/dist`.

## Menjalankan backend dengan Docker

Dari root repository:

```bash
docker build -t rice-yield-backend .
docker run --rm -p 8080:8080 --env-file backend/.env rice-yield-backend
```

Backend Docker tersedia di `http://localhost:8080`.

## Deployment

### Backend di Blitz Cloud

Konfigurasi utama:

- Repository: `YazidHilmi/rice-yield-prediction`
- Branch: `main`
- Dockerfile: `Dockerfile` pada root repository
- Port: `8080`
- Environment variables: gunakan daftar variable backend di atas

Pada free plan, aplikasi dapat masuk status **Sleeping** setelah sekitar dua jam tanpa kunjungan. Sleeping bukan crash dan tidak menghapus deployment. Status **Paused** berarti aplikasi dihentikan manual, sedangkan **Stopped** dapat terjadi setelah crash berulang.

### Frontend di Vercel

Konfigurasi utama:

- Root Directory: `frontend`
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment variable `VITE_API_BASE_URL`: URL backend Blitz yang diakhiri `/api`

Production saat ini:

- Frontend: <https://rice-yield-prediction-olive.vercel.app>
- Backend: <https://rice-yield-prediction.yazidhilmi.blitz.cloud>

## Catatan keamanan

- Jangan commit `.env`, token TabPFN, atau JSON service account.
- Jangan menampilkan secret pada screenshot atau log publik.
- Gunakan environment variables terenkripsi pada platform deployment.
- Jika sebuah secret pernah terpublikasi, segera cabut dan buat ulang secret tersebut.

