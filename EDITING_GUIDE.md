# YMF 2026 — İçerik Düzenleme Rehberi

Bu dosya, site içeriğini teknik bilgi gerektirmeden güncellemek için hazırlanmıştır.
**Yalnızca `index.html` dosyasını düzenleyin. `style.css` ve `app.js` dosyalarına dokunmayın.**

---

## Genel Kurallar

- HTML etiketlerini (`<div>`, `<p>`, `<a>` vb.) silmeyin.
- `class="..."` niteliklerini değiştirmeyin.
- Yalnızca etiketlerin **içindeki metni** veya `href=""`, `src=""` gibi değerleri güncelleyin.
- Her bölüm `<!-- ▶ DÜZENLE: ... -->` yorumlarıyla işaretlenmiştir.

---

## 1. Tarih ve Yer (Hero Bölümü)

`index.html` dosyasında `<!-- HERO -->` bölümünü bulun:

```html
<div class="value">TBA 2026</div>
```

Tarih belli olunca `TBA 2026` yerine gerçek tarihi yazın (örn. `15–16 Eylül 2026`).

---

## 2. Konuşmacı Ekleme

Her konuşmacı için `speakers-grid` içine yeni bir kart ekleyin:

```html
<div class="speaker-card">
  <div class="speaker-avatar">
    <img src="assets/images/speakers/ad-soyad.jpg" alt="Ad Soyad" />
  </div>
  <div class="speaker-name">Ad Soyad</div>
  <div class="speaker-aff">Üniversite / Kurum</div>
  <!-- Konuşma başlığı varsa: -->
  <!-- <div class="speaker-tba">Konuşma Başlığı</div> -->
</div>
```

Fotoğrafı `assets/images/speakers/` klasörüne koyun (200×200 px önerilir).

---

## 3. Program Güncelleme

`program-timeline` içindeki `.prog-row` satırlarını düzenleyin:

```html
<div class="prog-row">
  <div class="prog-time">10:00 – 11:00</div>
  <div>
    <span class="prog-type davet">Davetli</span>
    <div class="prog-event-title">Konuşma Başlığı</div>
    <div class="prog-event-detail">Prof. Dr. Ad Soyad · Kurum</div>
  </div>
</div>
```

**prog-type seçenekleri:**
- `davet` — Davetli konuşma (altın rengi)
- `sozlu` — Sözlü sunum (mavi)
- `poster` — Poster oturumu (yeşil)
- `break` — Mola / yemek (gri)
- `kapanis` — Kapanış (altın)

---

## 4. Kayıt Formu Bağlama

Google Forms'ta formunuzu oluşturun, ardından `Yanıtları Gönder → Bağlantıyı Göm` seçeneğini kullanın.

`index.html` içinde iki yeri güncelleyin:

```html
<!-- 1) iframe src -->
<iframe src="https://docs.google.com/forms/d/e/FORMID/viewform?embedded=true" ...>

<!-- 2) Fallback bağlantılar (2 adet) -->
<a href="https://docs.google.com/forms/d/e/FORMID/viewform" ...>
```

---

## 5. Fotoğraf Galerisi

1. Fotoğrafları `assets/images/gallery/` klasörüne koyun (`.jpg` veya `.webp`).
2. `index.html` içinde her `.gallery-item` için `.gallery-placeholder` div'ini silin ve `<img>` ekleyin:

```html
<div class="gallery-item">
  <img src="assets/images/gallery/foto1.jpg" alt="YMF 2026 - Açılış" />
  <div class="gallery-overlay"><span>🔍</span></div>
</div>
```

Daha fazla fotoğraf için mevcut bir `.gallery-item` bloğunu kopyalayıp yapıştırın.

---

## 6. Sponsor Logosu Ekleme

1. Logo dosyasını `assets/images/sponsors/` klasörüne koyun.
2. İlgili `.sponsor-card` içindeki `.sponsor-card-placeholder` div'ini silin:

```html
<div class="sponsor-card">
  <img src="assets/images/sponsors/tubi-tak.png" alt="TÜBİTAK" />
  <div class="sponsor-card-name">TÜBİTAK</div>
</div>
```

---

## 7. İEÜ Logosu Ekleme

Logo dosyasını `assets/images/ieu-logo.png` olarak kaydedin, ardından:

- **Nav logosu için** `index.html` başındaki nav bölümünde yorum satırını kaldırın:
  ```html
  <img class="nav-logo-img" src="assets/images/ieu-logo.png" alt="İEÜ" />
  ```

- **Sponsor bölümü için** `sponsor-ieu-block` içindeki yorum satırını kaldırın:
  ```html
  <img class="sponsor-ieu-logo" src="assets/images/ieu-logo.png" alt="İzmir Ekonomi Üniversitesi" />
  ```

---

## 8. İletişim Bilgilerini Güncelleme

`#iletisim` bölümünde e-posta ve komite üyelerini güncelleyin.

---

## 9. Geçmiş YMF Linklerini Kontrol Etme

Tüm geçmiş YMF linkleri `#gecmis` bölümünde gerçek URL'ler içermektedir.
Eksik veya hatalı bağlantılar için `href=""` değerini güncelleyin.

---

## Yerel Önizleme

Dosyayı tarayıcıda doğrudan açabilirsiniz (`index.html` üzerine çift tıklayın).

Daha iyi bir önizleme için terminal kullanın:
```bash
cd ymf26
python3 -m http.server 8000
# Ardından tarayıcıda: http://localhost:8000
```

---

## Sunucuya Yükleme (IT için)

Bu klasörün tamamını web sunucusunun ilgili dizinine kopyalayın.
Sunucu taraflı işlem gerekmez — saf statik HTML/CSS/JS dosyalarıdır.
