# Objednávkový formular - FAPI Business

##  Popis projektu

Jednoduchý objednávkový systém vytvořený jako vstupní test pro firmu **FAPI Business s.r.o.** Aplikace umožňuje zákazníkům vytvořit objednávku produktů s automatickým výpočtem cen, validací formuláře a rekapitulací objednávky.

##  Autor

**Robin Lassak**

## Funkcionality

### Hlavní formulář (`index.html`)
- **Osobní údaje**: Jméno, email, telefon
- **Výběr produktu**: 3 produkty s různými cenami (100 Kč, 200 Kč, 300 Kč)
- **Množství**: Počet kusů s automatickým přepočtem celkové ceny
- **Validace**: Real-time validace všech polí
- **Odeslání**: Tlačítko pro odeslání objednávky

### Děkovací stránka (`thank-you.html`)
- **Rekapitulace objednávky**: Zobrazení všech zadaných údajů
- **Výpočet ceny s DPH**: Automatický výpočet 21% DPH
- **Přepočet měny**: Konverze na EUR (kurz 1 EUR = 25 Kč)
- **Nová objednávka**: Tlačítko pro návrat k formuláři

##  Technologie

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Moderní CSS s gradienty a responzivním designem
- **Validace**: Client-side validace s real-time zpětnou vazbou
- **Ukládání dat**: localStorage pro přenos dat mezi stránkami
- **Responzivita**: Optimalizováno pro desktop, tablet i mobil

##  Struktura projektu

```
FAPI_Formular/
├── index.html          # Hlavní formulář
├── thank-you.html      # Děkovací stránka
├── style.css           # Styly aplikace
├── script.js           # JavaScript funkcionalita
├── README.md           # Dokumentace
├── postup.md           # Vývojový postup
├── .gitignore          # Git ignorované soubory
└── vstupni_test.txt    # Původní zadání
```

##  Spuštění aplikace

1. **Lokální spuštění**:
   - Stáhněte všechny soubory
   - Otevřete `index.html` v prohlížeči
   - Aplikace je plně funkční bez nutnosti serveru

2. **Online nasazení**:
   - Nahrajte soubory na webhosting s podporou statických souborů
   - Aplikace je připravena k okamžitému použití

##  Automatické nasazení na webhosting

Aplikace využívá **GitHub Actions** pro automatické nasazení na webhosting:

### **CI/CD Pipeline:**
- **GitHub Actions**: Automatické nasazení při push do main větve
- **Workflow soubor**: `.github/workflows/deploy.yml`
- **Automatické nasazení**: Při každém commitu se aplikace automaticky nasadí

### **Proces nasazení:**
1. **Push kódu na GitHub**:
   - Commit změn do main větve
   - GitHub Actions automaticky spustí deployment

2. **Automatické nasazení**:
   - Workflow nahrává soubory na webhosting
   - Používá FTP/SFTP protokol
   - Nasazuje do veřejné složky webhostingu

3. **Ověření nasazení**:
   - Automatické testování dostupnosti
   - Kontrola funkčnosti formuláře
   - Monitoring deployment status

### **Výhody automatického nasazení:**
- **Automatizace**: Žádné manuální nahrávání souborů
- **Rychlost**: Nasazení během několika sekund
- **Konzistence**: Vždy aktuální verze kódu
- **Backup**: Historie verzí v Git
- **Monitoring**: Sledování deployment status
- **Rollback**: Možnost návratu k předchozí verzi

##  Klíčové funkce

### Validace formuláře
- **Jméno**: Minimálně 2 znaky
- **Email**: Platný formát emailu
- **Telefon**: Český formát (+420 123 456 789 nebo 123 456 789)
- **Produkt**: Povinný výběr
- **Množství**: 1-100 kusů

### Výpočty cen
- **Celková cena**: Produkt × Množství
- **DPH**: 21% z celkové ceny
- **Cena s DPH**: Celková cena + DPH
- **EUR přepočet**: Cena s DPH ÷ 25

### UX/UI prvky
- **Real-time validace**: Okamžitá zpětná vazba
- **Automatické výpočty**: Ceny se aktualizují při změně
- **Responzivní design**: Optimalizováno pro všechny zařízení
- **Moderní vzhled**: Gradient pozadí, stíny

##  Design

### Barevné schéma
- **Pozadí**: Světle šedý gradient na bílou
- **Formulář**: Blankytný gradient
- **Tlačítka**: Červené (odeslat), zelené (nová objednávka)
- **Cena**: Střední šedá

### Typografie
- **Font**: Segoe UI
- **Nadpisy**: Gradient text s moderním vzhledem
- **Text**: Tmavě šedý pro čitelnost

##  Responzivita

Aplikace je plně responzivní a optimalizovaná pro:
- **Desktop**: 900px+ šířka
- **Tablet**: 768px - 900px
- **Mobil**: < 768px

## Technické detaily

### JavaScript funkcionalita
- **Přenos dat**: localStorage mezi stránkami
- **Validace**: Real-time a submit validace
- **Výpočty**: Automatické přepočty cen
- **Event handling**: Moderní ES6+ syntax

### CSS vlastnosti
- **Flexbox**: Moderní layout
- **CSS Grid**: Responzivní design
- **Animace**: Plynulé přechody
- **Gradients**: Moderní pozadí

##  Splněné požadavky

 **Objednávková stránka s formulářem**
- Osobní údaje
- Výběr produktu
- Počet kusů s automatickým přepočtem
- Odeslání objednávky

 **Děkovací stránka**
- Rekapitulace objednávky
- Výpočet ceny s DPH
- Přepočet na jinou měnu

 **Technické požadavky**
- Validace formulářových polí
- Funkční přesměrování mezi stránkami

##  Cíl projektu

Tento projekt byl vytvořen jako **vstupní test pro FAPI Business s.r.o.** s cílem demonstrovat:
- **Funkčnost**: Plně funkční objednávkový systém
- **Čistota kódu**: Přehledný a udržovatelný kód
- **Přístup k řešení problémů**: Systematický vývoj
- **Moderní technologie**: Aktuální webové standardy

##  Kontakt

**Autor**: Robin Lassak  
**Projekt**: Vstupní test pro FAPI Business s.r.o.  
**Datum vytvoření**: 2025

---

*Projekt je připraven k nasazení a demonstraci všech požadovaných funkcionalit.*

