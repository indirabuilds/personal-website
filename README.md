# Indira Mumtaz Khairunnisa - Personal Website

Portfolio statis yang dibuat dengan HTML, CSS, dan JavaScript murni. Tidak memerlukan proses build atau instalasi dependensi.

## Mengubah isi website

1. Buka file `konten.txt` di VS Code.
2. Ubah tulisan di sebelah kanan tanda `=`. Contoh: `headline=Indira's Portfolio`.
3. Jangan ubah nama bagian di dalam tanda kurung siku atau nama di sebelah kiri tanda `=`.
4. Untuk penghargaan, pisahkan tahun, judul, dan keterangan dengan tanda `|` seperti contoh yang tersedia.
5. Simpan file lalu kirim perubahan ke GitHub. Netlify akan menerbitkan versi terbaru secara otomatis.

File `konten.txt` adalah file teks biasa. Anda tidak perlu mengubah HTML, CSS, atau JavaScript untuk memperbarui tulisan yang tersedia di sana.

## Deploy ke Netlify

1. Pastikan file website sudah di-push ke repository GitHub `indirabuilds/personal-website`.
2. Di Netlify, pilih **Add new site** lalu **Import an existing project**.
3. Hubungkan GitHub dan pilih repository `indirabuilds/personal-website`.
4. Biarkan build command kosong. Publish directory sudah ditetapkan ke `.` dalam `netlify.toml`.
5. Pilih **Deploy site**.

File CV PDF sengaja diabaikan oleh Git agar tidak terpublikasi bersama website. Folder environment lokal dan pengaturan VS Code juga tidak masuk repository.

## Preview lokal

Buka `index.html` langsung di browser. Semua halaman dan interaksi berjalan tanpa server.