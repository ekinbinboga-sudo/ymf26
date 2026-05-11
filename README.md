# YMF 2026 — Yoğun Madde Fiziği İzmir Toplantısı

**XIII. Yoğun Madde Fiziği – İzmir Toplantısı** resmi websitesi. İzmir Ekonomi Üniversitesi Fizik Bölümü tarafından organize edilen akademik konferans için tasarlanmış modern, responsive landing page.

**Live Site:** https://ekinbinboga-sudo.github.io/ymf26/

---

## 📋 Etkinlik Bilgileri

| Detay | Bilgi |
|-------|-------|
| **Tarih** | 15 Mayıs 2026 |
| **Konum** | İzmir Ekonomi Üniversitesi, D Blok Çok Amaçlı Salon |
| **Konuşmacı Sayısı** | 6 davetli konuşmacı |
| **Sözlü Sunum** | 7 kısa sunum |
| **Poster Oturumu** | 3 poster oturum |

---

## 🎯 Proje Yapısı

```
ymf26/
├── index.html              # Ana sayfa
├── style.css               # Tüm styling (CSS variables + dark mode)
├── app.js                  # JavaScript (accordion, slider, theme toggle)
├── .github/workflows/      # GitHub Pages deployment
├── assets/
│   ├── images/
│   │   ├── speakers/       # 6 konuşmacı fotoğrafı
│   │   ├── ymf_2024/       # Geçmiş yıl galerisi
│   │   ├── ymf_sponsorlar/ # Sponsor logoları
│   │   ├── logoson.jpg     # Ana logo
│   │   └── toplu-foto.jpg  # Hero slider
│   ├── pdfs/
│   │   ├── program-ymf-2026.pdf    # Program PDF
│   │   ├── ramazan-sahin.pdf       # Konuşmacı özetleri
│   │   ├── serap-aksu-ramazanoglu.pdf
│   │   ├── devrim-guclu.pdf
│   │   ├── fadil-iyikanat.pdf
│   │   ├── goktug-karpat.pdf
│   │   └── gursoy-akguc.pdf
│   └── adiniz_soyadiniz_2026.docx  # Özet şablonu
└── README.md
```

---

## 🎨 Özellikler

### Bölümler
1. **Navigation** — Fixed header, smart hide on scroll, mobile sidebar
2. **Hero Slider** — 6 fotoğraf, auto-rotate (5s), dots + arrows
3. **Duyuru** — Etkinlik tanıtımı
4. **Konuşmacılar** — 6 konuşmacı kartı, PDF badge, soyad sıralaması
5. **Program** — Full schedule (accordion), PDF download
6. **Bildiri Formatı** — Poster kuralları (accordion)
7. **Kayıt** — Google Forms link
8. **Geçmiş YMF** — Arşiv (2012–2025) + fotoğraf galerisi
9. **Kurullar** — Bilim/Düzenleme/Organizasyon (accordion)
10. **İletişim** — E-posta, adres, Google Maps
11. **Sponsorlar** — Eduline, İYTE-AVILAR

### Teknik Özellikler
- **Dark/Light Mode** — Theme toggle with localStorage
- **Accordion Pattern** — Kurullar, Geçmiş, Program, Bildiri
- **Responsive** — Desktop, tablet, mobile optimized
- **Smart Navbar** — Hide on scroll down, show on scroll up

---

## 👥 Konuşmacılar (2026)

| Konuşmacı | Kurum |
|-----------|-------|
| Gürsoy Bozkurt AKGÜÇ | İzmir Ekonomi Üniversitesi |
| Serap AKSU RAMAZANOĞLU | Koç Üniversitesi |
| Devrim GÜÇLÜ | İzmir Yüksek Teknoloji Enstitüsü |
| Fadıl İYİKANAT | Dokuz Eylül Üniversitesi |
| Göktuğ KARPAT | Sabancı Üniversitesi |
| Ramazan ŞAHİN | Atatürk Üniversitesi |

---

## 🌙 Dark Mode

Website dark/light tema destekler:
- **Toggle:** Nav'da icon (desktop), sidebar'da icon (mobile)
- **localStorage:** Tercih kaydedilir
- **Colors:** Dark theme — `#1a1a2e` background, `#e8e8e8` text

---

## 🚀 Deployment

### GitHub Pages
- Repository → Settings → Pages → Source: `main` branch
- Her `git push` sonrası otomatik deploy
- Workflow: `.github/workflows/pages.yml`

### Cache Busting
CSS/JS güncellemelerinde version artır:
```html
<link rel="stylesheet" href="style.css?v=10" />
<script src="app.js?v=7"></script>
```

---

## 🛠️ Yerel Geliştirme

```bash
git clone https://github.com/ekinbinboga-sudo/ymf26.git
cd ymf26

# Local server
python -m http.server 8000
# veya
npx http-server

# Browser
http://localhost:8000
```

---

## 📱 Responsive Breakpoints

| Device | Width | Features |
|--------|-------|----------|
| Desktop | >768px | Full nav, 3-column kurullar |
| Tablet | 768px | Hamburger menu, 2-column |
| Mobile | <768px | Sidebar, 1-column, theme toggle in sidebar |

---

## 📞 İletişim

- **E-posta:** ymf.izmir.ekonomi@gmail.com
- **Web:** https://physics.ieu.edu.tr
- **IEU:** https://www.ieu.edu.tr/tr

---

## 📄 Lisans

© 2026 YMF – İzmir Ekonomi Üniversitesi Fizik Bölümü