# Panduan Instalasi dan Menjalankan Aplikasi

## Prerequisites

Sebelum memulai, pastikan Anda memiliki:
- **Node.js** versi 16.0 atau lebih tinggi
- **npm** atau **yarn** sebagai package manager
- **Git** (opsional, untuk clone repository)

## Langkah-langkah Instalasi

### 1. Setup Project

#### Opsi A: Clone dari Repository
\`\`\`bash
git clone <repository-url>
cd book-management-app
\`\`\`

#### Opsi B: Download Manual
- Download file project
- Extract ke folder yang diinginkan
- Buka terminal di folder tersebut

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

Atau jika menggunakan yarn:
\`\`\`bash
yarn install
\`\`\`

### 3. Jalankan Development Server

\`\`\`bash
npm run dev
\`\`\`

Aplikasi akan otomatis membuka di browser pada `http://localhost:3000`

### 4. (Opsional) Jalankan Tests

\`\`\`bash
npm run test
\`\`\`

## Struktur Folder

\`\`\`
book-management-app/
├── src/
│   ├── components/          # React Components
│   │   ├── BookForm/
│   │   ├── BookList/
│   │   ├── BookCard/
│   │   ├── BookFilter/
│   │   ├── Header/
│   │   └── Sidebar/
│   ├── pages/              # Page Components
│   │   ├── Home/
│   │   └── Stats/
│   ├── hooks/              # Custom Hooks
│   │   ├── useLocalStorage.js
│   │   └── useBookStats.js
│   ├── context/            # Context API
│   │   └── BookContext.jsx
│   ├── __tests__/          # Test Files
│   │   ├── BookContext.test.jsx
│   │   ├── useLocalStorage.test.jsx
│   │   ├── useBookStats.test.jsx
│   │   ├── BookForm.test.jsx
│   │   └── setup.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   ├── index.css
│   └── main.jsx
├── index.html              # Entry HTML
├── package.json            # Dependencies
├── vite.config.js          # Vite Config
├── vitest.config.js        # Vitest Config
├── README.md               # Documentation
├── INSTALLATION.md         # Installation Guide (file ini)
└── TESTING.md              # Testing Documentation
\`\`\`

## Available Commands

### Development
\`\`\`bash
npm run dev
\`\`\`
Menjalankan dev server dengan hot-reload di `http://localhost:3000`

### Build
\`\`\`bash
npm run build
\`\`\`
Build project untuk production. Output akan berada di folder `dist/`

### Preview
\`\`\`bash
npm run preview
\`\`\`
Preview hasil build secara lokal

### Testing
\`\`\`bash
npm run test
\`\`\`
Jalankan test suite dengan Vitest

\`\`\`bash
npm run test:ui
\`\`\`
Buka test UI dashboard untuk visualisasi test results

## Troubleshooting

### Port 3000 sudah digunakan
Jika port 3000 sudah digunakan, Vite akan otomatis menggunakan port yang berbeda. Lihat console output untuk URL yang benar.

### Module not found errors
Pastikan semua dependencies sudah terinstall:
\`\`\`bash
npm install
\`\`\`

### localStorage tidak bekerja
Pastikan menggunakan browser modern yang support localStorage (semua browser modern support ini).

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: Modern versions

## Next Steps

1. Buka aplikasi di `http://localhost:3000`
2. Mulai tambahkan buku ke koleksi Anda
3. Explore fitur filter, search, dan statistik
4. Jalankan tests dengan `npm run test`
5. Baca dokumentasi lengkap di `README.md`

## Support

Jika mengalami masalah atau pertanyaan, silakan:
1. Check `README.md` untuk dokumentasi lengkap
2. Check `TESTING.md` untuk info testing
3. Lihat folder `src/__tests__` untuk contoh test cases
