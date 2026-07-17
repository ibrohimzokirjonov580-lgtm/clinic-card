# TIJORAT — O'zbekiston kichik va o'rta bizneslari uchun avtomatlashtirish platformasi
## To'liq mahsulot spetsifikatsiyasi (Product Requirements Document)

**Versiya:** 1.0
**Sana:** 2026-yil iyul
**Maqsad:** Ushbu hujjat loyihani noldan qurish uchun to'liq texnik va funksional yo'l-yo'riq bo'lib xizmat qiladi — dasturchi jamoasiga yoki AI-yordamchiga (Claude Code, va h.k.) to'g'ridan-to'g'ri topshiriq sifatida berish mumkin.

---

## 1. LOYIHA HAQIDA UMUMIY MA'LUMOT

**Nima bu:** Kichik va o'rta bizneslar (do'kon, kafe, xizmat ko'rsatish, onlayn sotuvchi) uchun bitta platformada: (1) ichki boshqaruv paneli — buyurtma, ombor, mijozlar, soliq/EHF, buxgalteriya, va (2) mijozlarga ko'rinadigan avtomatik generatsiya qilinadigan veb-sayt/buyurtma sahifasi.

**Asosiy tamoyil:** Biznes egasi ro'yxatdan o'tib, biznes turini tanlagach, tizim o'sha sohaga mos **tayyor shablonni avtomatik chiqaradi** (veb-sayt + boshqaruv paneli konfiguratsiyasi). Biznes egasi faqat mazmunni (mahsulot, narx, rasm, brend rangi) o'zgartiradi — kod yozish yoki dizayner yollash shart emas.

**Uch turdagi foydalanuvchi:**
1. **Biznes egasi/admin** — boshqaruv panelidan foydalanadi
2. **Xodim** (kassir, ofitsiant, kuryer) — cheklangan huquq bilan panelga kiradi
3. **Yakuniy mijoz** — biznesning avtomatik generatsiya qilingan saytidan/Telegram-botidan buyurtma beradi

---

## 2. FOYDALANUVCHI OQIMI — TO'LIQ KETMA-KETLIK

Quyida butun tizim orqali foydalanuvchi bosib o'tadigan **aniq ketma-ketlik** keltirilgan:

### BOSQICH 0 — Kirish sahifasi (Landing page)
- Platforma haqida qisqa tanishtiruv, narxlar, "Bepul boshlash" tugmasi

### BOSQICH 1 — Ro'yxatdan o'tish
**Funksiyalar:**
- Telefon raqami orqali ro'yxatdan o'tish (SMS-kod tasdiqlash)
- Yoki Telegram orqali tezkor kirish (Telegram login widget)
- Parol o'rnatish
- Foydalanish shartlari va maxfiylik siyosatiga rozilik (checkbox, majburiy)

### BOSQICH 2 — Biznes ma'lumotlari
**Kiritiladigan maydonlar:**
- Biznes nomi
- Faoliyat manzili (viloyat, tuman, ko'cha)
- Telefon raqami (jamoat uchun ko'rinadigan)
- YATT/MChJ guvohnoma raqami (ixtiyoriy, keyin ham to'ldirish mumkin)
- STIR (soliq to'lovchining identifikatsiya raqami) — EHF uchun zarur

### BOSQICH 3 — Biznes turini tanlash (ENG MUHIM QADAM)
Foydalanuvchi quyidagi variantlardan birini tanlaydi, har biri o'ziga xos shablon va modul to'plamini yoqadi:

| Biznes turi | Avtomatik yoqiladigan modullar |
|---|---|
| **Chakana savdo / Do'kon** | Katalog, Ombor/qoldiq, Savat+to'lov sayti, Sodiqlik dasturi |
| **Kafe / Restoran** | Menyu, Stol-buyurtma, Oshxona ekrani (KDS), Yetkazib berish |
| **Xizmat ko'rsatish** | Xizmatlar ro'yxati, Band qilish kalendari, Xodim tanlash |
| **Onlayn sotuvchi (marketpleys)** | Ombor, Buyurtma-yetkazish kuzatuvi, Ko'p kanalli sotuv hisoboti |

Tanlovdan so'ng, tizim orqa fonda (backend) avtomatik ravishda:
1. Shu turga mos ma'lumotlar bazasi jadvallarini (masalan `stol_buyurtma`, yoki `bandlash_kalendar`) faollashtiradi
2. Boshqaruv panelidagi chap menyuni shu modullarga moslab qayta quradi
3. Mijozlarga ko'rinadigan veb-sayt shablonini shu turga mos qilib generatsiya qiladi

### BOSQICH 4 — Shablonni sozlash (Brendlash)
- Logotip yuklash
- Brend rangi tanlash (oldindan tayyorlangan 6-8 ta rang palitrasidan, yoki HEX kod kiritish)
- Shrift uslubi tanlash (2-3 variant: "Zamonaviy", "Klassik", "Minimal")
- Sayt manzili (subdomain) tanlash: `[biznes-nomi].tijorat.uz`

### BOSQICH 5 — Mahsulot/xizmat kiritish
- Sohaga mos forma chiqadi (kafe uchun "taom nomi + narx + tayyorlanish vaqti", do'kon uchun "mahsulot nomi + narx + qoldiq soni + variant")
- Rasm yuklash (galereyadan yoki telefon kamerasidan)
- Ommaviy yuklash imkoniyati — Excel fayldan bir martada ko'p mahsulot import qilish

### BOSQICH 6 — To'lov tizimini ulash
- Click, Payme, Uzcard hisob raqamlarini kiritish va tasdiqlash
- Naqd pul qabul qilish sozlamasi (yoqish/o'chirish)

### BOSQICH 7 — EHF/Soliq ma'lumotlarini ulash
- STIR raqami orqali Soliq qo'mitasi tizimiga ulanish (EHF/DIDOX API)
- Soliq rejimini tanlash (aylanma solig'i / QQS to'lovchi / patent)

### BOSQICH 8 — Yakunlash va ishga tushirish
- Tayyor saytni oldindan ko'rish ("Mening saytim" — live preview)
- "Ishga tushirish" tugmasi — sayt darhol jonli (`live`) holatga o'tadi
- Tabriknoma ekrani + Telegram-botga ulanish havolasi

**Bu yerdan boshlab foydalanuvchi kundalik ishlatiladigan Boshqaruv paneliga (Dashboard) tushadi.**

---

## 3. BOSHQARUV PANELI — BARCHA BO'LIMLAR VA FUNKSIYALAR

### 3.1. Bosh sahifa (Dashboard)
**Vazifasi:** Kunlik holatni bir qarashda ko'rsatish

**Funksiyalar:**
- Bugungi savdo summasi (kechagi kun bilan solishtirilgan foiz o'zgarish)
- Bugungi buyurtmalar soni
- Faol mijozlar soni
- O'rtacha chek summasi
- So'nggi 5-10 ta buyurtma ro'yxati (holat bilan: yangi / jarayonda / yetkazildi / bekor qilindi)
- Eng ko'p sotilgan 5 ta mahsulot/xizmat reytingi
- Kam qolgan mahsulotlar haqida ogohlantirish (agar ombor moduli yoqilgan bo'lsa)
- Yaqinlashib kelayotgan soliq hisobot muddati haqida eslatma banner

### 3.2. Buyurtmalar bo'limi
**Vazifasi:** Barcha kanaldan (sayt, Telegram-bot, jismoniy do'kon) kelgan buyurtmalarni bitta joyda boshqarish

**Funksiyalar:**
- Buyurtmalar jadvali: № , mijoz ismi, mahsulot/xizmat, kanal (sayt/bot/do'kon), summa, holat, sana
- Holat filtri: Barchasi / Yangi / Jarayonda / Yetkazildi / Bekor qilindi
- Har bir buyurtmani bosib, batafsil ko'rish (mijoz manzili, izoh, to'lov usuli)
- Holatni o'zgartirish tugmalari ("Qabul qilish", "Yetkazishga berish", "Yakunlash", "Bekor qilish")
- Bekor qilish sababini yozish (majburiy maydon — statistik tahlil uchun)
- Chop etish (chek/EHF) tugmasi har bir buyurtma qatorida

**Kafe/restoran moduli qo'shimcha funksiyalari (Stol buyurtma tizimi):**
- Stollar xaritasi (vizual, har bir stol raqami bilan)
- Stolni bosib, o'sha stol uchun yangi buyurtma ochish
- Oshxona ekrani (Kitchen Display System — KDS): kelgan buyurtmalar avtomatik oshxona ekraniga chiqadi, oshpaz "Tayyor" tugmasini bosgach ofitsiantga bildirishnoma boradi
- Stol holati: Bo'sh / Band / Hisob-kitob kutilmoqda
- Chek bo'lish (bir stolni bir necha mijoz orasida bo'lish) funksiyasi
- **Kechiktirilgan hisob-kitob (open tab):** mehmon o'tirgach chek ochiladi, u davomida bir necha marta buyurtma qo'sha oladi, faqat ketayotganda barcha buyurtmalar uchun bitta umumiy to'lov amalga oshiriladi
- **Texnik xarita / retsept tizimi (RENGARANG MUHIM MODUL):** har bir taom tarkibiy qismlarga (ingredientlarga) ajratib tavsiflanadi — masalan "Lag'mon = 200g go'sht + 150g xamir + 30g sabzavot + ziravorlar". Taom sotilganda tizim **avtomatik ravishda omborni ingredient darajasida hisobdan chiqaradi**
- **Taom tannarxini avtomatik hisoblash (food cost):** retsept tarkibidagi ingredient narxlariga asoslanib, har bir taomning aniq tannarxi va foyda foizi avtomatik chiqariladi
- **Xodim ish vaqtini kuzatish:** ofitsiant/oshpaz ishga kelish-ketish vaqtini belgilash, bu ma'lumot to'g'ridan-to'g'ri ish haqi hisob-kitobiga (Buxgalteriya moduli) ulanadi

**Xizmat ko'rsatish moduli qo'shimcha funksiyalari (Band qilish):**
- Kalendar ko'rinishi — kunlik/haftalik jadval
- Mijoz onlayn band qilganda avtomatik kalendarga tushadi
- Xodim/usta tanlash (agar bir nechta xodim bo'lsa)
- Band qilishni bekor qilish/ko'chirish

### 3.3. Mahsulotlar/Xizmatlar bo'limi (Katalog)
**Funksiyalar:**
- Mahsulot/xizmat qo'shish, tahrirlash, o'chirish
- Kategoriya bo'yicha guruhlash
- Narx, tavsif, rasm, variant (hajm, rang, o'lcham) kiritish
- **Ombor/qoldiq nazorati** (do'kon va onlayn sotuvchi modullarida):
  - Har bir mahsulot uchun qoldiq soni
  - Minimal qoldiq chegarasi belgilash — shu chegaradan tushganda avtomatik ogohlantirish
  - Kirim/chiqim tarixi (qachon, qancha miqdorda kirim qilingan)
  - Shtrix-kod orqali qidirish (agar skaner ulangan bo'lsa)
- Mahsulotni "faol/nofaol" qilish (vaqtincha sotuvdan olib qo'yish)
- **Tovarni ajratib qo'yish (reserve/hold):** mijoz uchun tovarni belgilangan muddatga chetga olib qo'yish, boshqa xaridorga sotilmasligini ta'minlash
- **Ommaviy qayta baholash (bulk repricing):** kurs yoki tannarx o'zgarganda, tanlangan kategoriya yoki barcha mahsulotlar narxini bir vaqtda foiz yoki summa asosida o'zgartirish
- **Do'konlar/filiallar orasida tovar transferi:** bir filialdan ikkinchisiga tovar ko'chirish so'rovi, jo'natish va qabul qilish tasdig'i, transfer tarixi
- **Narxnoma chop etish/eksport:** tanlangan mahsulotlar ro'yxatini PDF/Excel holida chiqarish (yetkazib beruvchi yoki mijozga yuborish uchun)

### 3.4. Mijozlar bo'limi (CRM)
**Funksiyalar:**
- Barcha mijozlar ro'yxati: ism, telefon, jami buyurtmalar soni, oxirgi xarid sanasi, jami sarflagan summa
- Har bir mijozning to'liq xarid tarixini ko'rish
- Mijozlarni segmentlash: "VIP" (ko'p xarid qiluvchi), "Yangi", "Uzoq vaqt xarid qilmagan"
- **Mijozlarni erkin teg bilan belgilash** (masalan "Ulgurji xaridor", "Tug'ilgan kuni yaqin") — teg bo'yicha filtrlash va maqsadli xabar yuborish
- Sodiqlik dasturi (loyalty): ball tizimi — har bir xariddan ball to'planadi, ballni chegirmaga almashtirish
- **Mijozga qarz/nasiya berish (kredit boshqaruvi):** mijoz tovarni hozir olib, pulini keyinroq to'lashi mumkin; tizim har bir mijozning joriy qarz summasini, muddatini va to'lov tarixini kuzatadi; qarz chegarasidan oshganda ogohlantiradi
- SMS/Telegram orqali ommaviy xabar yuborish (aksiya, chegirma e'loni)
- Mijoz sharhlari/reytingi ko'rish (agar mijoz baho qoldirgan bo'lsa)
- Mijozning shaxsiy izoh/qaydlar varag'i (masalan "achchiq taomni yoqtirmaydi", "har doim naqd to'laydi")

### 3.4a. Yetkazib beruvchilar bo'limi (Suppliers) — YANGI MODUL
**Vazifasi:** Tovar/xomashyo qayerdan kelayotganini nazorat qilish — buyurtma qabul qilishning aksi (xarid tomoni)

**Funksiyalar:**
- Yetkazib beruvchilar ro'yxati: nomi, aloqa ma'lumotlari, yetkazib berish shartlari
- Har bir yetkazib beruvchidan xarid buyurtmasi (purchase order) yaratish
- Yetkazib beruvchiga qarzdorlik/hisob-kitob holatini kuzatish
- Xarid tarixi — qachon, qancha miqdorda, qanday narxda tovar kelgani
- Tovar kelganda avtomatik omborga kirim qilish (qoldiqni oshirish)
- Yetkazib beruvchi bo'yicha hisobot — eng ko'p ishlatiladigan, eng arzon/qimmat ta'minotchini taqqoslash

### 3.4b. Marketing va aksiyalar bo'limi — YANGI BO'LIM
**Vazifasi:** Oddiy chegirmadan tashqari, chuqurroq marketing vositalari bilan mijozni qaytarish va yangi mijoz jalb qilish

**Funksiyalar:**
- **Ko'p darajali aksiyalar:** masalan "2 tasini olsang 3-si tekin", yoki "500,000 so'mdan yuqori xaridga 10% chegirma" — shartga bog'liq murakkab aksiyalar yaratish
- **Sovg'a sertifikatlari va vaucherlar:** belgilangan summaga elektron sertifikat yaratish, mijoz uni to'lov sifatida ishlatishi mumkin
- **Promokodlar va attribution:** har bir promokodga alohida kod berish (masalan blogerlar uchun), qaysi promokod orqali qancha mijoz va savdo kelganini kuzatish
- **Tayyor aksiya shablonlari:** tez-tez ishlatiladigan aksiya turlarini (masalan "Tug'ilgan kun chegirmasi", "Birinchi xarid bonusi") bir marta bosib faollashtirish

### 3.5. Soliq va EHF bo'limi
**Vazifasi:** Soliq hisob-kitobi va elektron hisob-fakturalarni avtomatlashtirish

**Funksiyalar:**
- **Avtomatik EHF generatsiyasi** — har bir yakunlangan savdo uchun elektron hisob-faktura avtomatik shakllanadi va Soliq qo'mitasi tizimiga (DIDOX/OFD orqali) yuboriladi
- Oylik aylanma summasi ko'rsatkichi
- Hisoblangan QQS/aylanma solig'i summasi (soliq rejimiga qarab avtomatik hisoblanadi)
- Keyingi hisobot topshirish muddati — aniq sana va orqaga sanoq
- So'nggi chiqarilgan EHF'lar ro'yxati: EHF raqami, sana, mijoz, summa, holati (yuborilgan/xatolik)
- Har bir EHF'ni PDF holida yuklab olish
- Soliq rejimini o'zgartirish so'rovi (agar aylanma chegaradan oshsa, tizim avtomatik ogohlantiradi va rejim almashtirishni tavsiya qiladi)
- Yillik/choraklik soliq hisobotini avtomatik shakllantirish va eksport qilish (Excel/PDF)

### 3.6. Buxgalteriya bo'limi
**Vazifasi:** Moliyaviy holatni tushunarli ko'rsatish, kunlik hisob-kitobni avtomatlashtirish

**Funksiyalar:**
- **Kirim-chiqim jadvali** — barcha savdo (kirim) va xarajatlar (chiqim: ijaraga, xodim maoshi, tovar xaridi va h.k.) qo'lda yoki avtomatik kiritiladi
- **Foyda-zarar hisoboti** — kunlik/haftalik/oylik/yillik davr uchun avtomatik hisoblanadi (Kirim − Chiqim = Sof foyda)
- **Bank hisob raqami integratsiyasi** — bank tranzaksiyalarini avtomatik o'qib, kategoriyalarga ajratish (masalan "Yetkazib beruvchiga to'lov", "Ijaraga to'lov")
- **Xodimlar ish haqi hisob-kitobi:**
  - Har bir xodim uchun oylik/kunlik maosh belgilash
  - Ijtimoiy soliq va sug'urta badalini avtomatik hisoblash
  - Ish haqi to'lov varag'ini (paycheck) generatsiya qilish
- **Xarajatlar kategoriyasi bo'yicha diagramma** (masalan: Tovar xaridi 40%, Ijaraga 20%, Maosh 25%, Boshqa 15%)
- Buxgalter uchun eksport — **1C formatiga to'liq mos** yoki Excel formatida hisobotlarni yuklab olish (agar tashqi buxgalter bilan ishlansa)
- **Kassa smenasi hisobi (inkassatsiya):** kunlik kassa ochilishi va yopilishi qayd etiladi; smena boshida va oxirida naqd pul summasi kiritiladi; tizim kutilgan va haqiqiy summani solishtirib, farqni (kamomad/ortiqcha) avtomatik ko'rsatadi; har bir kassir/smena bo'yicha alohida hisobot

### 3.6a. Xodim samaradorligi va rejalar (KPI) — YANGI BO'LIM
**Funksiyalar:**
- Har bir sotuvchi/ofitsiant bo'yicha alohida savdo hisoboti (kim qancha sotgan, o'rtacha chek qancha)
- Oylik/haftalik savdo rejasi (maqsad) belgilash — xodim yoki butun do'kon/filial uchun
- Reja bajarilishi foizini real vaqtda ko'rsatish (masalan "Reja: 80% bajarildi")
- Eng yaxshi natijali xodimlarni avtomatik reyting qilish

### 3.7. Sozlamalar bo'limi
**Funksiyalar:**
- Biznes ma'lumotlarini tahrirlash (nom, manzil, STIR)
- Brendlash sozlamalari (logotip, rang, shrift) — istalgan vaqt o'zgartirish mumkin
- To'lov integratsiyasi (Click/Payme/Uzcard/naqd) yoqish-o'chirish
- Xodimlar va ularning huquqlarini boshqarish (kim qaysi bo'limga kira oladi)
- Bildirishnoma sozlamalari (qaysi hodisalarda Telegram orqali xabar kelishi)
- Tarif va to'lov tarixi
- Obunani bekor qilish/o'zgartirish

### 3.8. "Mening saytim" bo'limi (shablon boshqaruvi)
**Vazifasi:** Biznes egasiga o'zining avtomatik generatsiya qilingan saytini jonli ko'rish va tahrirlash imkonini berish

**Funksiyalar:**
- Live preview — saytning hozirgi holatini ko'rish
- Sahifa tartibini sozlash (qaysi bo'lim yuqorida chiqishi: mahsulotlar, aksiyalar, aloqa)
- Bosh sahifadagi banner/aksiya matnini o'zgartirish
- Sayt manzilini (subdomain) o'zgartirish yoki o'z domenini ulash (masalan `atirlarolami.uz`)
- SEO sozlamalari (sayt tavsifi, kalit so'zlar — Google qidiruvida chiqishi uchun)

---

## 4. MIJOZGA KO'RINADIGAN QISM (Avtomatik generatsiya qilingan sayt)

### 4.1. Do'kon shabloni
- Bosh sahifa: logotip, brend rang, mahsulot kategoriyalari
- Katalog sahifasi: mahsulot kartochkalari (rasm, nom, narx), filtr va qidiruv
- Mahsulot sahifasi: batafsil tavsif, variantlar, "Savatga qo'shish" tugmasi
- Savat va buyurtma berish: manzil kiritish, to'lov usuli tanlash (Click/Payme/naqd)
- Buyurtma holatini kuzatish sahifasi

### 4.2. Kafe/restoran shabloni
- Menyu sahifasi (kategoriya bo'yicha: sovuq ichimlik, issiq taom va h.k.)
- Stol raqamini kiritish (QR-kod orqali stoldan skanerlash imkoniyati)
- Buyurtma berish va oshxonaga avtomatik yuborilishi
- Hisobni so'rash tugmasi

### 4.3. Xizmat ko'rsatish shabloni
- Xizmatlar ro'yxati va narxlari
- Onlayn band qilish kalendari — mavjud vaqtlarni ko'rish va tanlash
- Xodim/usta tanlash (agar variant bo'lsa)
- Band qilishni tasdiqlash — SMS/Telegram orqali eslatma

### 4.4. Barcha shablonlar uchun umumiy
- Mobil qurilmalarga moslashgan (responsive) dizayn
- Telegram-bot orqali xuddi shu funksiyalarni takrorlash (saytga kira olmaydigan mijozlar uchun)
- Mijoz sharh/reyting qoldirish imkoniyati

---

## 5. TELEGRAM-BOT FUNKSIYALARI (mijoz tomoni)

- `/start` — biznes bilan tanishtiruv va asosiy menyu
- Katalog/menyuni ko'rish (inline tugmalar orqali)
- Buyurtma berish — mahsulot tanlash, miqdor, manzil, to'lov usuli
- Buyurtma holatini kuzatish
- Avtomatik bildirishnoma — buyurtma qabul qilindi / tayyorlanmoqda / yo'lda / yetkazildi
- Aksiya va chegirmalar haqida push-xabar (agar mijoz obuna bo'lsa)

---

## 6. TO'LOV VA MOLIYAVIY INTEGRATSIYALAR

| Xizmat | Vazifasi |
|---|---|
| **Click** | Onlayn to'lov qabul qilish |
| **Payme** | Onlayn to'lov qabul qilish |
| **Uzcard/Humo** | Karta orqali to'lov |
| **DIDOX / OFD** | EHF (elektron hisob-faktura) yuborish |
| **Bank API** (masalan Kapitalbank, Ipoteka bank ochiq bank interfeysi) | Tranzaksiyalarni avtomatik o'qish (buxgalteriya moduli uchun) |

---

## 7. FOYDALANUVCHI ROLLARI VA HUQUQLAR

| Rol | Kira oladigan bo'limlar |
|---|---|
| **Egasi/Admin** | Barcha bo'limlar, shu jumladan Sozlamalar va Soliq |
| **Menejer** | Dashboard, Buyurtmalar, Mahsulotlar, Mijozlar (Soliq/Sozlamalarsiz) |
| **Kassir/Ofitsiant** | Faqat Buyurtmalar bo'limi (yangi buyurtma yaratish, holat o'zgartirish) |
| **Buxgalter** | Faqat Soliq va Buxgalteriya bo'limlari |

---

## 8. TEXNIK ARXITEKTURA (tavsiya etilgan stack)

- **Backend:** Node.js (NestJS) yoki Python (Django/FastAPI) + PostgreSQL
- **Frontend (boshqaruv paneli):** React yoki Next.js
- **Mijozga ko'rinadigan sayt generatsiyasi:** Har bir biznes uchun statik/server-side generatsiya qilingan sahifa (Next.js dynamic routing yoki alohida shablon dvigateli)
- **Telegram-bot:** Telegram Bot API (Node.js yoki Python orqali)
- **To'lov:** Click va Payme rasmiy merchant API
- **EHF:** Soliq qo'mitasining rasmiy EHF/DIDOX integratsiya API'si
- **Fayl saqlash (rasmlar):** S3-mos ombor (masalan Amazon S3 yoki mahalliy IT Park bulut xizmati)
- **Bildirishnoma:** Telegram Bot API + SMS shlyuz (Eskiz.uz yoki Playmobile kabi mahalliy provayder)
- **Offline-first rejim (MUHIM, raqobatchilarda mavjud, avval yo'q edi):** Kassir/ofitsiant ilovasi mahalliy qurilmada (planshet/noutbuk) ma'lumotni vaqtincha saqlaydi va internet uzilganda ham savdo, buyurtma qabul qilish, chek chiqarish davom etadi; internet qaytganda barcha ma'lumot avtomatik serverga sinxronlanadi. Bu ayniqsa kafe/do'kon uchun **majburiy talab** — internet uzilishi savdoni to'xtatmasligi kerak
- **Ochiq API (Open API):** boshqa tashqi tizimlar (1C, marketpleyslar, maxsus qo'shimchalar) ulanishi uchun hujjatlashtirilgan ochiq API taqdim etish — kelajakda uchinchi tomon dasturchilar integratsiya qura olishi uchun

---

## 9. MA'LUMOTLAR BAZASI — ASOSIY JADVALLAR (yuqori darajadagi sxema)

- `businesses` (biznes ma'lumotlari, turi, STIR, brend sozlamalari)
- `users` (barcha foydalanuvchilar — admin, xodim, mijoz)
- `roles_permissions` (rol va huquqlar)
- `products_services` (mahsulot/xizmat katalogi)
- `inventory` (ombor qoldig'i, kirim-chiqim tarixi)
- `orders` (buyurtmalar — barcha kanaldan)
- `order_items` (buyurtma tarkibidagi mahsulotlar)
- `customers` (mijozlar bazasi, CRM)
- `loyalty_points` (sodiqlik ballari)
- `invoices_ehf` (EHF yozuvlari)
- `tax_records` (soliq hisob-kitoblari, muddatlar)
- `accounting_entries` (kirim-chiqim, xarajatlar)
- `payroll` (xodimlar ish haqi)
- `bookings` (xizmat ko'rsatish moduli uchun band qilish)
- `tables_orders` (kafe moduli uchun stol-buyurtma bog'lanishi)
- `subscriptions` (tarif va to'lov tarixi)
- `suppliers` (yetkazib beruvchilar ma'lumotlari)
- `purchase_orders` (yetkazib beruvchidan xarid buyurtmalari)
- `customer_debts` (mijoz qarz/nasiya yozuvlari)
- `product_transfers` (filiallar orasida tovar transferi)
- `recipes_tech_cards` (taom retsept/texnik xaritalari, ingredient darajasida)
- `cash_shifts` (kassa smena ochilishi/yopilishi, kutilgan va haqiqiy summa)
- `promotions_vouchers` (ko'p darajali aksiyalar, sertifikatlar, promokodlar)
- `staff_performance` (xodim savdo ko'rsatkichi va reja bajarilishi)

---

## 10. TARIFLAR VA MONETIZATSIYA

| Tarif | Narx/oy | Kiritilgan funksiyalar |
|---|---|---|
| **Boshlang'ich** | 99,000–150,000 so'm | Katalog, buyurtma, 1 ta shablon sayt, asosiy CRM |
| **Standart** | 300,000–400,000 so'm | + Ombor, EHF/Soliq, Telegram-bot, sodiqlik dasturi |
| **Biznes** | 600,000–900,000 so'm | + Buxgalteriya moduli, ko'p filial, ko'p xodim roli, AI-bot |

**Qo'shimcha daromad manbalari:**
- Tranzaksiya komissiyasi: to'lovlardan 0.5–1.5%
- Bir martalik sozlash to'lovi: 200,000–500,000 so'm
- Qo'shimcha domen ulash: 100,000 so'm/yil

---

## 11. ISHGA TUSHIRISH KETMA-KETLIGI (Loyihani qurish tartibi — roadmap)

### 1-oy: Poydevor
1. Ma'lumotlar bazasi sxemasini loyihalash va qurish
2. Foydalanuvchi autentifikatsiyasi (ro'yxatdan o'tish, kirish, rollar)
3. Biznes turi tanlash va asosiy onboarding oqimi

### 2-oy: Core modullar
4. Mahsulot/xizmat katalogi (CRUD)
5. Buyurtmalar tizimi (umumiy, barcha turlar uchun asosiy versiya)
6. Boshqaruv paneli — Dashboard va asosiy statistikalar

### 3-oy: Vertikal modullar
7. Kafe moduli — stol buyurtma, kechiktirilgan hisob-kitob va oshxona ekrani
8. **Texnik xarita/retsept tizimi va taom tannarxini hisoblash**
9. Xizmat ko'rsatish moduli — band qilish kalendari
10. Ombor/qoldiq nazorati (do'kon va onlayn sotuvchi uchun) + **tovarni ajratib qo'yish, ommaviy qayta baholash**

### 4-oy: Moliyaviy va xarid modullari
11. Click/Payme to'lov integratsiyasi
12. EHF/DIDOX integratsiyasi va avtomatik hisob-faktura
13. Soliq hisob-kitobi moduli
14. **Yetkazib beruvchilar bo'limi va mijozga qarz/nasiya berish**

### 5-oy: Mijozga ko'rinadigan qism va marketing
15. Avtomatik shablon-sayt generatsiya dvigatel
16. Telegram-bot (mijoz tomoni)
17. CRM, sodiqlik dasturi va **kengaytirilgan marketing (aksiya, sertifikat, promokod)**

### 6-oy: Sayqallash va bozorga chiqish
18. Buxgalteriya moduli (kirim-chiqim, ish haqi, **kassa smena hisobi, xodim KPI**)
19. **Offline-first rejimni sinovdan o'tkazish** va 1C eksport
20. Pilot mijozlar bilan sinov (5-10 ta real biznes)
21. Feedback asosida tuzatish va rasmiy ishga tushirish

---

## 12. RAQOBATBARDOSHLIK TAHLILI — QAYSI FUNKSIYA QAYERDAN OLINGAN

Ushbu bo'lim — nima uchun har bir yangi qo'shilgan modul spetsifikatsiyaga kiritilgani haqida shaffof izoh. Bozordagi yetakchi tizimlar (BILLZ — chakana savdo, iiko/Poster/JetCafe/Reca — restoran) bilan solishtirilgan tahlil asosida qo'shildi.

### 12.1. Chakana savdo yo'nalishida (BILLZ darajasiga tenglashtirish uchun) qo'shilgan modullar

| Modul | Nega kerak edi |
|---|---|
| Yetkazib beruvchilar bo'limi | Tovar xaridi tomonini butunlay yo'q edi — har qanday do'kon buni talab qiladi |
| Mijozga qarz/nasiya berish | Ko'p O'zbek do'konlarida naqd bo'lmagan, keyinroq to'lanadigan savdo odatiy holat |
| Tovarni ajratib qo'yish | Mijoz uchun tovar band qilib qo'yish — kundalik amaliyot |
| Do'konlar orasida transfer | Ko'p filialli bizneslar uchun zarur |
| Ommaviy qayta baholash | Kurs/tannarx o'zgarganda vaqt tejaydi |
| Xodim samaradorligi va reja (KPI) | Sotuvchi ishini baholash va rag'batlantirish uchun |
| Kengaytirilgan marketing (ko'p darajali aksiya, sertifikat, promokod) | Oddiy chegirmadan ko'ra chuqurroq mijoz jalb qilish vositasi |
| Kassa smena hisobi | Kunlik naqd pul nazorati — kamomadni oldini olish |

### 12.2. Kafe/restoran yo'nalishida (iiko/Poster/JetCafe darajasiga tenglashtirish uchun) qo'shilgan modullar

| Modul | Nega kerak edi |
|---|---|
| Texnik xarita / retsept tizimi | Eng jiddiy kamchilik edi — taomni ingredientga ajratmasdan ombor nazorati to'g'ri ishlamaydi |
| Taom tannarxini avtomatik hisoblash | Restoran egasi har bir taomdan qancha foyda qilayotganini bilishi shart |
| Kechiktirilgan hisob-kitob (open tab) | Mehmon bir necha marta buyurtma berib, oxirida bitta to'lov qilishi — restoran uchun standart stsenariy |
| Xodim ish vaqti kuzatuvi | Ish haqi hisob-kitobi bilan bog'lanishi kerak |

### 12.3. Umumiy arxitektura darajasida qo'shilgan tuzatishlar

| Tuzatish | Nega kerak edi |
|---|---|
| Offline-first rejim | Deyarli barcha raqobatchida bor — internet uzilganda ham savdo davom etishi majburiy talab |
| Ochiq API va 1C integratsiyasi | Ko'p buxgalter 1C bilan ishlaydi, integratsiyasiz mijoz yo'qotiladi |

### 12.4. Hali ham platformaning o'ziga xos ustunligi (raqobatchilarda yo'q)

Yuqoridagi barcha qo'shimchalardan so'ng ham, quyidagi jihatlar **faqat shu platformada** mavjud va bozordagi hech bir yetakchi o'yinchida yo'q:

- **Bir ro'yxatdan o'tish orqali avtomatik generatsiya qilinadigan mijozga ko'rinadigan veb-sayt** (10-15 daqiqada tayyor — BILLZ buni qo'lda, alohida xizmat sifatida, 1 oyda qiladi)
- **Do'kon + kafe + xizmat ko'rsatishni bitta platformada, bitta hisob ostida birlashtirish** (raqobatchilarning aksariyati faqat bitta sohaga qattiq ixtisoslashgan)
- **EHF/Soliq qo'mitasi integratsiyasi bilan buxgalteriyani bir joyda chuqur birlashtirish**

---

*Ushbu hujjat — loyihani boshlash uchun to'liq texnik topshiriq (prompt) sifatida ishlatilishi mumkin. Har bir bo'lim mustaqil modul sifatida ishlab chiqilishi va keyinchalik boshqalari bilan integratsiya qilinishi mumkin.*
