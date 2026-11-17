# Castillo – Showcase

Öffentliche Übersichtsseite der Castillo-Plattform: alle Apps, die Spiele und die Plattform darunter.

- Statische Seite ohne Build: `index.html`, `style.css`, `app.js`, Inhalte in `data.js` und `platform.js`. GitHub Pages liefert `main` direkt aus.
- Pro App 2–4 Sichten auf Desktop, iPad und iPhone. `views.js` ist generiert: `python3 tools/views.py <ordner mit views-*.json>`.
- Alle Screenshots stammen aus lokalen Läufen mit Demo- oder erfundenen Daten oder aus dem Gastmodus ohne Anmeldung. Kein Name, kein Betrag und kein Dokument darin ist echt.
- Schriften: Geist und Geist Mono, selbst gehostet unter `fonts/` (SIL Open Font License, `fonts/OFL.txt`).
- Vorschau lokal: `python3 -m http.server` in diesem Ordner.
- Nach Änderungen an CSS oder JS die Zahl in `?v=` in `index.html` erhöhen, sonst sehen Besucher bis zu 10 Minuten die alte Datei.
