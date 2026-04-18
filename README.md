# YMF 2026 — Yoğun Madde Fiziği İzmir Toplantısı Websitesi

Akademik etkinlik için tasarlanmış, iyiye ayarlanmış ve responsive bir landing page. İzmir Ekonomi Üniversitesi Fizik Bölümü tarafından organize edilen yoğun madde fiziği sempozyumunun resmi websitesi.

**Live:** https://ekinbinboga-sudo.github.io/ymf26/

---

## 🎯 Proje Yapısı

```
ymf26/
├── index.html          # Ana sayfa (tüm bölümler burada)
├── style.css           # Styling (v=9 cache-buster'ı vardır)
├── app.js              # JavaScript (v=6 cache-buster'ı vardır)
├── assets/
│   ├── images/
│   │   ├── logoson.jpg
│   │   ├── toplu-foto.jpg
│   │   ├── ymf_2024/   # Geçmiş yıl fotoğrafları
│   │   ├── speakers/   # Konuşmacı resimleri
│   │   └── ymf_sponsorlar/
│   │       └── sponsor-1.png  # Sponsor logoları
│   ├── pdfs/           # Konuşmacı özet PDFs (seyit-kale.pdf, fadil-iyikanat.pdf)
│   └── adiniz_soyadiniz_2026.docx  # Özet şablonu
├── README.md           # Bu dosya
└── EDITING_GUIDE.md    # (Varsa) editörlük kılavuzu
```

---

## 🎨 Temel Özellikler

### Bölüm Haritası
1. **Navigation** — Fixed header, mobilde sidebar menü, scroll hide
2. **Hero Slider** — 6 fotoğraf, otomatik döngü, mouse interaktif parçacık animasyonu
3. **Duyuru** — Etkinlik tanıtımı, başvuru deadline'ı
4. **Bildiri Formatı** — Poster boyutları, metin kuralları, şablon indir
5. **Konuşmacılar** — 5 konuşmacı kartı (Fadıl İYİKANAT ve Seyit KALE'nin kartlarında PDF badge)
6. **Program** — Günün takvimi (detaylar henüz doldurulmamış)
7. **Kayıt** — Google Forms embed
8. **Geçmiş Toplantılar** — Arşiv grid (2012–2025) + Fotoğraf galerisi (accordion'da)
9. **Kurullar** — 3 kurul (Bilim/Düzenleme/Organizasyon) — her biri accordion
10. **İletişim** — E-posta, adres, Google Maps embed
11. **Sponsorlar** — Logo kartları (Eduline linki var)
12. **Footer** — Telif, linkler, nanotube background

### Etkileşim Özellikleri

#### Accordion Pattern
- **Kurullar:** 3 kurul başlığı yan yana grid (toggle'lı), liste kapalı başlıyor
- **Geçmiş Toplantılar:** 2 accordion
  - "Toplantılar Arşivi (2012–2025)" — geçmiş yıllar
  - "Fotoğraf Galerisi — YMF 2024" — carousel

#### Carousels
- **Hero Slider:** 6 fotoğraf, dots, prev/next arrows, auto-rotate (5s), pause on visibility change
- **Photo Carousel:** Geçmiş toplantı fotoğrafları (4s interval), lightbox açılır

#### Responsive
- Desktop: 3-column kurullar, full navigation
- Tablet (768px): 2-column gallery, hamburger menu
- Mobile (480px): 1-column layout, hamburger menu

---

## 🔧 Teknik Detaylar

### CSS Variables (Color Scheme)
```css
--navy: #0d1b2e              /* Koyu mavi */
--gold: #f47920              /* Akademik altın */
--academic-maroon: #8b1a1a   /* Akademik kestane */
--text: #2c3a4a              /* Ana metin */
--bg: #ffffff                /* Arka plan */
--bg-alt: #f7f8fa            /* Alternatif arka plan */
```

### Font Stack
- **Serif:** EB Garamond (başlıklar, akademik görünüş)
- **Sans:** Outfit (metin, UI)
- Google Fonts'tan CDN yüklenir

### Cache Busting
- `style.css?v=9` — CSS güncellemeleri için sürümü artırın
- `app.js?v=6` — JavaScript güncellemeleri için sürümü artırın

---

## 📝 Sonraki Etkinliklere Özelleştirme

### 1. Yıl Güncelleme
```html
<!-- index.html -->
<title>YMF 2027 – Yoğun Madde Fiziği İzmir Toplantısı</title>
<h1 class="slider-title">
  Yoğun Madde Fiziği
  <em>İzmir Toplantısı 2027</em>
</h1>
```

### 2. Tarih & Konum
```html
<div class="slider-meta">
  <span>15 Mayıs 2027, Cuma</span>  <!-- Tarihi değiştir -->
  <span>D Blok Çok Amaçlı Salon</span>  <!-- Konumu değiştir -->
</div>
```

### 3. Başvuru Deadline
```html
<div class="deadline-box">
  <span class="dl-label">Başvuru Son Tarihi:</span>
  <span class="dl-date">27 Nisan 2027</span>  <!-- Güncelle -->
</div>
```

### 4. Konuşmacılar
Speaker kartlarını değiştirmek için `<!-- KONUŞMACILAR -->` bölümünü bulun:

**Yeni konuşmacı eklemek (PDF olmadan):**
```html
<div class="speaker-card">
  <img class="speaker-avatar" src="assets/images/speakers/ad-soyad.jpg" alt="Ad SOYAD" />
  <div class="speaker-name">Ad SOYAD</div>
  <div class="speaker-aff">Üniversite Adı</div>
</div>
```

**PDF özet linki olan konuşmacı:**
```html
<a href="assets/pdfs/ad-soyad.pdf" target="_blank" class="speaker-card-link">
  <div class="speaker-card">
    <img class="speaker-avatar" src="assets/images/speakers/ad-soyad.jpg" alt="Ad SOYAD" />
    <div class="speaker-name">Ad SOYAD</div>
    <div class="speaker-aff">Üniversite Adı</div>
    <div class="speaker-pdf-badge">Özet</div>
  </div>
</a>
```

### 5. Program
`<!-- PROGRAM -->` bölümünde `.prog-row` ekle/düzenle:
```html
<div class="prog-row">
  <div class="prog-time">09:00 – 10:30</div>
  <div class="prog-event">
    <div class="prog-event-title">Açılış Konuşması</div>
    <span class="prog-type davet">Davetli Konuşma</span>
  </div>
</div>
```

### 6. Kurullar
`<!-- KURUL -->` bölümünde üye adları düzenle:
```html
<li><span class="kurul-name">Ad SOYAD</span><span class="kurul-aff"> (Üniversite)</span></li>
```

### 7. Sponsorlar
Yeni sponsor eklemek (`<!-- SPONSORLAR -->`):
```html
<!-- Logo ile -->
<a href="https://sponsor-website.com" target="_blank" rel="noopener" class="sponsor-logo-card">
  <img src="assets/images/ymf_sponsorlar/sponsor-2.png" alt="Sponsor Adı" />
</a>

<!-- Metin linki ile -->
<div class="sponsor-text-link">
  <a href="https://sponsor-website.com" target="_blank" rel="noopener">Sponsor Adı</a>
</div>
```

### 8. Kayıt Formu Linki
Google Form'u değiştir (`<!-- KAYIT -->`):
```html
<a href="https://forms.gle/YENI_FORM_ID" target="_blank" rel="noopener" class="btn-primary academic-btn">
  Kayıt Formuna Git <span style="font-size: 1.3rem;">↗</span>
</a>
```

### 9. İletişim Bilgileri
```html
<div class="contact-label">E-posta</div>
<div class="contact-val"><a href="mailto:yeni-email@example.com">yeni-email@example.com</a></div>

<div class="contact-label">Ev Sahibi Kurum</div>
<div class="contact-val">
  Üniversite Adı<br>
  Fakülte/Bölüm<br>
  Adres
</div>
```

---

## 🚀 Deployment

### GitHub Pages
1. Repository ayarları → Pages → Branch: `main`, folder: `/ (root)`
2. Site otomatik deploy olur her `git push` sonrası
3. URL: `https://[USERNAME].github.io/[REPO_NAME]/`

### Cache Invalidation
Tarayıcı cache'ini temizlemek için CSS/JS sürümlerini artırın:
```html
<link rel="stylesheet" href="style.css?v=10" />
<script src="app.js?v=7"></script>
```

---

## 📱 Responsive Breakpoints

- **Desktop:** 900px+ (3-column grid, full nav)
- **Tablet:** 768px–899px (2-column grid, hamburger menu)
- **Mobile:** <768px (1-column layout, touch-optimized)

---

## 🎯 JavaScript Fonksiyonları

### Accordion Toggle
```javascript
// Otomatik tetiklenir, manuel kullanım:
const btn = document.querySelector('.kurul-toggle');
btn.click(); // toggle aç/kapa
```

### Hero Slider
```javascript
// Otomatik döngü, 5 saniye interval
// Dots tıkla, prev/next arrow'a tıkla, veya mouseover'la play/pause
```

### Photo Carousel
```javascript
// 4 saniyelik auto-rotate
// Resime tıkla → lightbox aç
// Lightbox: ESC veya background tık → kapat
```

---

## ⚠️ Dikkat Edilmesi Gerekenler

1. **Resim Boyutları**
   - Speaker avatarı: 102px × 102px (circle, object-fit: cover)
   - Sponsor logo: max-height 56px
   - Hero/carousel: responsive, object-fit: cover

2. **Meta Tags**
   - `<meta name="description">` güncelle
   - Open Graph tags varsa güncellenebilir (`og:title`, `og:image`)

3. **Google Forms Embed**
   - Form linkini test et, paylaşılabilir mi kontrol et
   - İlk defa açıldığında tarayıcı uyarı verebilir → normal

4. **PDF Dosyaları**
   - `assets/pdfs/` klasörüne ekle
   - Speaker kartında `href="assets/pdfs/dosya-adi.pdf"` yap

5. **Fotoğraf Galerisi**
   - Yeni yıl fotoğraflarını `assets/images/ymf_20XX/` klasöründe sakla
   - Photo carousel'da şu yapıyı güncelle:
     ```html
     <div class="photo-slide">
       <img src="assets/images/ymf_2027/_MG_XXXX.jpeg" alt="YMF 2027" loading="lazy" />
     </div>
     ```

---

## 🛠️ Yerel Geliştirme

```bash
# Clone et
git clone https://github.com/ekinbinboga-sudo/ymf26.git
cd ymf26

# Local server başlat (Python 3)
python -m http.server 8000
# Veya Node.js http-server
npx http-server

# Browser'da aç
http://localhost:8000
```

---

## 📄 Lisans & Telif

© 2026 YMF – İzmir Ekonomi Üniversitesi Fizik Bölümü

Akademik amaçlı, Atatürk Üniversitesi, Bilkent Üniversitesi, ODTÜ, Sabancı Üniversitesi, Adnan Menderes Üniversitesi, Hacettepe Üniversitesi, İzmir Katip Çelebi Üniversitesi, İzmir Ekonomi Üniversitesi işbirliğinde.

---

## 📞 Sorular & Destek

- **E-posta:** ymf.izmir.ekonomi@gmail.com
- **Website:** https://physics.ieu.edu.tr
- **Repo:** https://github.com/ekinbinboga-sudo/ymf26
