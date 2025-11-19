# Panduan Deployment

## Build untuk Production

### Step 1: Build Project
\`\`\`bash
npm run build
\`\`\`

Ini akan generate folder `dist/` berisi file-file production yang sudah dioptimasi.

### Step 2: Preview Build Lokal (Opsional)
\`\`\`bash
npm run preview
\`\`\`

Verifikasi build berfungsi dengan benar sebelum deploy.

## Deploy ke Vercel

### Persiapan
1. Push code ke GitHub
2. Buat akun di [vercel.com](https://vercel.com)

### Steps
1. Login ke Vercel dashboard
2. Click "Add New..." > "Project"
3. Import repository GitHub Anda
4. Framework: Pilih "React"
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click "Deploy"

Vercel akan otomatis:
- Menjalankan build
- Menjalankan tests
- Deploy ke production
- Setup CI/CD pipeline

### Environment Variables
Jika Anda menambahkan environment variables, setup di Vercel dashboard:
1. Project Settings > Environment Variables
2. Add variable baru
3. Redeploy project

## Deploy ke Netlify

### Steps
1. Push code ke GitHub
2. Login ke [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect repository
5. Build Command: `npm run build`
6. Publish Directory: `dist`
7. Click "Deploy site"

## Deploy ke GitHub Pages

### Steps
1. Update `vite.config.js`:
   \`\`\`js
   export default defineConfig({
     base: '/book-management-app/',
     // ... existing config
   })
   \`\`\`

2. Create `deploy.sh`:
   \`\`\`bash
   npm run build
   cd dist
   git init
   git add .
   git commit -m 'Deploy to GH Pages'
   git push -f https://github.com/username/book-management-app.git main:gh-pages
   \`\`\`

3. Run script:
   \`\`\`bash
   chmod +x deploy.sh
   ./deploy.sh
   \`\`\`

## Performance Optimization

### Implemented
- Code splitting via Vite
- CSS minification
- JS minification dan tree-shaking
- Responsive images placeholders
- Lazy component loading

### Additional Tips
- Gzip compression di server
- CDN for static assets
- Caching strategy untuk localStorage
- Progressive Web App (PWA) - optional

## Monitoring

### Setup Error Tracking (Sentry)
\`\`\`bash
npm install @sentry/react @sentry/tracing
\`\`\`

\`\`\`jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_DSN",
  environment: process.env.NODE_ENV,
});
\`\`\`

### Analytics
Tambahkan Google Analytics atau similar untuk track user behavior.

## Maintenance

- Keep dependencies updated: `npm outdated`
- Run tests regularly: `npm run test`
- Monitor error reports dari Sentry/monitoring tools
- Update security patches promptly

## Rollback

Jika ada issue setelah deploy:

**Vercel**: 
- Dashboard > Deployments > Select previous version > Redeploy

**Netlify**:
- Site settings > Deploys > Select previous deploy > Restore

**GitHub Pages**:
- Revert commit dan redeploy
