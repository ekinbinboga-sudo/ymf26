# YMF 2026 — Hero Parçacık Animasyonu Güncellemesi

Mevcut `ymf26` reposuna uygulanacak 3 dosyalık yama.

## Ne değişti?

**Sadece hero bölümüne interaktif parçacık animasyonu eklendi.**
Fotoğraf slider'ı, metinler, CTA butonları, diğer tüm bölümler aynı kaldı.

Animasyon özellikleri:
- Yoğun madde fiziği esintili parçacık alanı (noktalar + bağlantı çizgileri)
- **Fare/imleç ile etkileşim:** imleç etrafındaki parçacıklar itilir, altın renkli halo oluşur
- Yakındaki parçacıklar parlar
- Dokunmatik cihazlarda da çalışır
- Ekran kenarlarında sarma (wrap-around)

## Nasıl uygularım?

Bu 3 dosyayı `ymf26` reponuzun kök dizinindeki aynı isimli dosyaların **üzerine** yazın:

```
ymf26/
├── index.html   ← değiştirildi (tek satır eklendi)
├── style.css    ← değiştirildi (hero canvas stili + z-index düzenlemeleri)
└── app.js       ← değiştirildi (sona parçacık animasyonu eklendi)
```

## Değişiklik detayları

### index.html
`<!-- HERO SLIDER -->` bölümünde `<div class="slider-overlay">` öncesine tek satır eklendi:
```html
<canvas id="hero-canvas"></canvas>
```

### style.css
Eklenen yeni blok (`#hero-canvas`) ve 4 yerde z-index güncellemesi:
- `.slider-overlay` → z-index: 1 (aynı)
- **yeni:** `#hero-canvas` → z-index: 2
- `.slider-content` → z-index: 2 → **3**
- `.slider-dots` / `.slider-arrow` → z-index: 3 → **4**

### app.js
Dosyanın **sonuna** yeni IIFE eklendi (var olan kod değiştirilmedi).
~155 satır parçacık fiziği kodu.

## Git komutları

```bash
cd ymf26
# 3 dosyayı bu paketten kopyala (üzerine yaz)
git add index.html style.css app.js
git commit -m "feat(hero): interaktif parçacık animasyonu ekle"
git push origin main
```

GitHub Pages otomatik olarak yayına alacak.

## Geri almak isterseniz

```bash
git revert HEAD
git push
```
