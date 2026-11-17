// Content of the showcase. Every screenshot comes from a local run with demo or invented data;
// the views per app (desktop, tablet, phone) come from views.js (tools/views.py).
(() => {
const A = (id, name, color, icon, pitch, extra = {}) => ({ id, name, color, icon, pitch, features: [], tags: [], shots: [], ...extra });

window.CASTILLO = {
  ...window.CASTILLO_PLATFORM,
  stats: [
    { n: '20', from: 'apps', label: 'Apps und Spiele', color: '#f2a93b' },
    
    { n: '2382', label: 'Commits in drei Wochen', color: '#4f8df5' },
    { n: '1', label: 'Mini-PC zu Hause', color: '#e8603c' },
  ],
  // Recent changes, newest first; each links to its app
  news: [
    { date: '17.11.', app: 'read', text: 'Read und Listen sind auf dem iPhone aufgeräumt: Knöpfe, Reihen und Titel passen.' },
    { date: '17.11.', app: 'console', text: 'Die Kennzahlen der Console passen jetzt auch aufs iPad.' },
    { date: '16.11.', app: 'omni', text: 'Omni übernimmt Karten für das Mail-Archiv und für Notizen aus dem Upstream.' },
    { date: '16.11.', app: 'finance', text: 'Finance zeigt Geld, das zwischen eigenen Konten unterwegs ist, als eigene Zeile.' },
    { date: '15.11.', app: 'paper', text: 'Paper schlägt in der Vertragsübersicht Kündigungsfristen vor.' },
    { date: '13.11.', app: 'fit', text: 'Fit ging vom ersten Entwurf bis in die Produktion an einem Tag.' },
  ],
  groups: [
    { id: 'planen', nav: 'Planen', kicker: 'Für jeden Tag', title: 'Woche, Haushalt, Ferien',
      sub: 'Was die Familie erledigen muss und wann sie frei hat. Alle Apps sind fürs Handy gebaut und laufen auch auf dem iPad und als App auf dem Home-Bildschirm.', apps: [
      A('omni', 'Omni', '#3b82f6', 'mail', 'Mails, Aufgaben und Wochenplanung in einer App. Wichtige Mails kommen mit Zusammenfassung und Antwortentwurf, und für die Ziele der Woche bereitet ein Agent den nächsten Schritt vor.', {
        who: 'Persönlicher Assistent',
        features: ['Eine Inbox für Mails und für Hinweise aus Finance und Paper', 'Antwortentwürfe, die nie von selbst verschickt werden', 'Aufgaben mit Listen, Fälligkeit, Wiederholung und Unteraufgaben', 'Bis zu drei Fokus-Aufgaben pro Woche, für die ein Agent vorarbeitet', 'Fragen der Agenten lassen sich mit einem Tipp beantworten', 'Jede Aktion eines Agenten kann rückgängig gemacht werden'],
        tags: ['Go', 'SQLite', 'React', 'MCP'] }),
      A('zuhause', 'Zuhause', '#0d9488', 'check', 'Die Aufgaben und Routinen der Familie mit Abwechseln, gemeinsamer Einkaufsliste und Erinnerungen per Mail.', {
        who: 'Für die ganze Familie',
        features: ['Schnelleingabe als Satz: „Müll raus jeden Di @Sabine“', 'Rhythmen nach Kalender oder ab der letzten Erledigung, mit Saisons und Pausen', 'Aufgaben im Wechsel oder offen für alle mit „Mach ich“', 'Gemeinsame Einkaufsliste mit „Oft gekauft“', 'Geburtstage mit Vorlauf und Kalender-Abo für das Handy'],
        tags: ['Go', 'SQLite', 'Vanilla JS', 'iCal'] }),
      A('ferien', 'Ferien', '#0f766e', 'sun', 'Zählt die Ferientage beider Eltern, findet Brückentage und plant jede Reise mit Packliste, Tagesplan und Budget.', {
        who: 'Für die ganze Familie',
        features: ['Ferienkonto pro Person und Jahr, Feiertage und Wochenenden zählen nicht', 'Brückentage, auch für beide Eltern gemeinsam', 'Jahreskalender mit Reisen, Feiertagen und Schulferien', 'Jede Reise mit Tagesplan, Packliste, To-dos und Ausgaben', 'Ein Reiseführer für den Zielort, geschrieben von einem Sprachmodell'],
        tags: ['Go', 'SQLite', 'ES-Module', 'SearXNG'] }),
    ] },

    { id: 'essen', nav: 'Essen', kicker: 'Küche und Bewegung', title: 'Essen und Bewegung',
      sub: 'Was im Vorrat ist, was gekocht wird und wie viel man sich bewegt.', apps: [
      A('cook', 'Cook', '#5f9a6e', 'cook', 'Einkaufsliste, Vorräte und Rezepte für die Familie. Was gekocht wird, geht vom Vorrat ab, und was für ein Rezept fehlt, landet auf der Liste.', {
        who: 'Küche',
        features: ['Die Einkaufsliste ordnet jeden Artikel einem Ladenbereich zu', 'Vorräte nach Kühlschrank, Schrank und Tiefkühler, mit Haltbarkeit', 'Rezepte rechnen die Zutaten auf die Zahl der Portionen um', 'Ein Foto vom Kühlschrank wird zu einer Liste von Lebensmitteln', 'Vorlieben pro Person fliessen in die Rezeptvorschläge ein'],
        tags: ['Go', 'SQLite', 'React', 'Vision-Modell'] }),
      A('fit', 'Fit', '#65a30d', 'fit', 'Tagesziele, Mahlzeiten und Gewicht in einer App. XP, Level und Serien belohnen jeden Tag, an dem die Ziele erreicht werden.', {
        who: 'Training und Ernährung',
        features: ['Tages-Check mit drei Ja-Nein-Fragen', 'Mahlzeiten mit einem Tipp aus Vorlagen, mit Kalorien und Protein', 'Gewicht gegen eine Planlinie bis zum Ziel', 'Schritte und Schlaf kommen aus Apple Health', 'Belohnungen, die man sich selbst für Etappenziele setzt'],
        tags: ['Go', 'SQLite', 'React', 'Apple Health'] }),
    ] },

    { id: 'lesen', nav: 'Lesen', kicker: 'Wissen', title: 'Lesen und Fragen',
      sub: 'Die Nachrichten des Tages in Kurzfassung und ein KI-Chat für alle in der Familie.', apps: [
      A('read', 'Read', '#c2410c', 'read', 'Eine Tagesausgabe mit höchstens zwölf Artikeln aus selbst gewählten Quellen, jeder mit einer Kurzfassung. Gespeicherte Links landen in einer durchsuchbaren Bibliothek.', {
        who: 'Nachrichten und Links',
        features: ['Berichten mehrere Quellen über dasselbe, wird daraus ein Artikel', 'Kurzfassung in einem Satz und drei Punkten, in der Sprache des Artikels', 'Leseliste für später und Bibliothek nach Themen', 'Suche im Volltext, nach Bedeutung oder als Frage in eigenen Worten', '„Wiederentdecken“ zeigt ältere gespeicherte Links wieder an'],
        tags: ['Go', 'SQLite FTS5', 'React', 'Embeddings'] }),
      A('chat', 'Chat', '#7c3aed', 'chat', 'Ein KI-Chat für die Familie mit Websuche, Dateianhängen und einem Canvas zum Weiterbearbeiten. Jede Person sieht nur ihre eigenen Unterhaltungen.', {
        who: 'KI-Chat',
        features: ['Antworten laufen auf dem Server weiter, auch wenn das Handy schläft', 'Anhänge als Foto, PDF, Word, PowerPoint oder Code', 'Websuche über die eigene Suchmaschine, Quellen nummeriert', 'Tabellen, Formeln und Diagramme in der Antwort', 'Canvas neben dem Chat zum Bearbeiten und Herunterladen'],
        tags: ['Go', 'Vanilla JS', 'SearXNG'] }),
    ] },

    { id: 'geld', nav: 'Geld', kicker: 'Haushalt', title: 'Geld und Papierkram',
      sub: 'Kontoauszüge, Belege, Verträge und Steuern. Beide Apps lesen die Unterlagen selbst und fragen nur nach, wenn etwas unklar ist.', apps: [
      A('finance', 'Finance', '#2563eb', 'wallet', 'Das Haushaltsbuch für Konten in mehreren Währungen: Buchungen, Ausgaben, Depot, Steuern und ein Plan bis Ende des nächsten Jahres.', {
        who: 'Haushalt',
        features: ['Bankdaten kommen täglich per Abruf oder als Datei, jeder Import lässt sich zurücknehmen', 'Ausgaben nach Kategorie, mit Vorjahresvergleich', 'Depot mit Rendite, Ausschüttungen und dem Inhalt jedes ETF', 'Steuerjahr mit Prognose und Vorschlägen aus Online-Bestellungen', 'Was-wäre-wenn-Rechnung bis Ende des nächsten Jahres', 'Abos werden an ihrem Rhythmus erkannt'],
        tags: ['Go', 'SQLite', 'React', 'ECharts'] }),
      A('paper', 'Paper', '#b45309', 'paper', 'Liest jedes Dokument in der Ablage, erkennt Absender, Beträge und Fristen und schlägt Ordner und Dateinamen vor. Verschoben wird erst, wenn man zustimmt.', {
        who: 'Dokumente der Familie',
        features: ['Meldet Preiserhöhungen, fehlende Rechnungen und ablaufende Garantien', 'Suche als Satz: „Rechnungen über 100 dieses Jahr“', 'Verträge mit Kündigungsfrist und Erinnerung vorher', 'Ausweise und Karten mit Ablaufdatum', 'Scannen mit dem Handy, jede Person hat ihre eigene Ablage'],
        tags: ['Go', 'SQLite', 'Embeddings', 'Google Drive'] }),
    ] },

    { id: 'kinder', nav: 'Kinder', kicker: 'Für die Kinder', title: 'Malen und Hören',
      sub: 'Zwei Apps, die Kinder selbst bedienen. Gemalt wird auf echtem Papier, gehört wird nur, was die Eltern freigegeben haben.', apps: [
      A('color', "Color", '#e0362c', 'brush', "Zeichenanleitungen für Kinder von 3 bis 7: Jedes Bild entsteht Schritt für Schritt aus einfachen Formen, gezeichnet wird mit Stiften auf Papier.", {
        who: "Für Kinder von 3 bis 7",
        features: ["28 Themen, im Thema Baustelle allein 36 Bilder", "Jeder Schritt zeigt einen neuen Teil und nennt vorher die nötigen Stifte", "Ausmalbilder zum Drucken mit Farbhilfe", "Mal-Würfel und Missionen als Ideen", "Zwei Stufen: klein (3–4 Jahre) und gross (5–7 Jahre)"],
        tags: ["Go", "SQLite", "React"] }),
      A('listen', 'Listen', '#16a34a', 'music', 'Ein Musik- und Hörspielplayer für Kinder. Sie hören nur, was die Eltern vorher freigegeben haben, ohne Suche und ohne Empfehlungen.', {
        who: 'Kinder hören, Eltern geben frei',
        features: ['„Weiterhören“ merkt sich Kapitel und Stelle', 'Hörspiele, Hörbücher und Wissen getrennt von der Musik', 'Lieblinge, eigene Playlists und Wünsche an die Eltern', 'Schlaf-Timer, der die Musik langsam leiser macht', 'Neuerscheinungen freigegebener Künstler landen bei den Eltern'],
        tags: ['Go', 'SQLite', 'React', 'Spotify'] }),
    ] },

    { id: 'spiele', nav: 'Spiele', kicker: 'Spielen', title: 'Die Spiele',
      sub: 'Selbst gebaute Spiele ohne Werbung, ohne Käufe und ohne Verlieren, gespielt auf dem iPad und dem iPhone.', games: [
      A('baustelle', "Baustelle XXL", '#f5b700', 'crane', "Eine Stadt bauen mit Bagger, Kran und Betonmischer. Ein grosser Knopf macht immer den nächsten Arbeitsschritt.", {
        who: "iPhone und iPad",
        feature: true,
        features: ["Bagger, Kipplaster, Planierraupe, Betonmischer und Abrissbirne", "Gruben ausheben, Fundamente giessen, Ziegel mit dem Kran heben", "24 Gebäude, freigeschaltet über Sterne, dazu Strassen, Strom und Wasser", "Stufe klein: der Polier plant; Stufe gross: eigene Häuser und Aufträge"],
        tags: ["Go", "SQLite", "Three.js"] }),
      A('sandburg', "Sandburg", '#e6a95c', 'castle', "Sandburgen bauen an einem 3D-Strand, bis die Flut kommt. Danach wird gefeiert, mit Feuerwerk über der Burg.", {
        who: "iPhone und iPad",
        feature: true,
        features: ["Sand häufen, glätten, graben und giessen, Türme mit Förmchen", "Mauern schliessen sich von selbst, dazu Tor, Bergfried, Brunnen und Windmühle", "Kanäle graben, in die das Meer läuft", "Fundstücke und ein versteckter Schatz im Sand"],
        tags: ["Go", "SQLite", "Three.js"] }),
      A('garage', "Garage", '#0ea5e9', 'car', "Fahrzeuge aus Teilen bauen, über eine Insel fahren und danach in der Waschanlage putzen.", {
        who: "iPhone und iPad",
        feature: true,
        features: ["Ungewöhnliche Kombinationen fahren auch, etwa ein Feuerwehr-Traktor", "58 kleine Aufgaben auf der Insel", "Waschanlage: Der Schlamm geht dort weg, wo der Finger reibt", "Kein Verlieren, keine Zeitlimits, gesprochene Sätze statt Text"],
        tags: ["Go", "SQLite", "react-three-fiber"] }),
    ] },

    { id: 'betrieb', nav: 'Betrieb', kicker: 'Für den Betrieb', title: 'Apps für die Plattform',
      sub: 'Was läuft und wer was darf. Beide Apps liegen im gemeinsamen Upstream und laufen auch auf der befreundeten Plattform.', apps: [
      A('console', 'Console', '#1d4ed8', 'console', 'Zeigt, was auf dem Server läuft: Apps, Jobs, Updates und die Konfiguration des Hosts. Updates und Konfiguration lassen sich von hier aus anwenden.', {
        who: 'Für die Plattform-Owner',
        features: ['Status aller Apps, Vorfälle und laufende Jobs', 'Der Update-Zug: was automatisch aktualisiert wurde und wo ein Mensch entscheiden muss', 'Alle geplanten Jobs eines Tages auf einer Zeitachse', 'Host-Konfiguration mit Vergleich und Knopf zum Anwenden', 'CI-Läufe mit Pipeline und Logs, Suche mit Ctrl K'],
        tags: ['Go', 'React', 'Argo Workflows', 'Kubernetes'] }),
      A('directory', 'Directory', '#7c3aed', 'users', 'Verwaltet Personen, Familien und Freigaben. Jede App fragt hier, wer angemeldet ist und was diese Person öffnen darf.', {
        who: 'Identität für alle Apps',
        features: ['Rollen: Owner, Familie, Gäste und Kinderprofile ohne eigenes Login', 'Freigaben pro App, auf Wunsch befristet', 'Eine Matrix aller Personen gegen alle Apps', 'Liste aller Adressen, die von aussen erreichbar sind, mit Warnungen', 'Gleicht die Gruppen der Zugangskontrolle selbst ab'],
        tags: ['Go', 'SQLite', 'React', 'Cloudflare Access'] }),
    ] },

    { id: 'agenten', nav: 'Agenten', kicker: 'Dienste ohne Oberfläche', title: 'Helfer für die Agenten',
      sub: 'Drei Dienste, über die KI-Agenten und Apps arbeiten: ein gemeinsames Gedächtnis, ein Browser und ein Bot im Chat.', apps: [
      A('memory', 'Memory', '#be185d', 'brain', 'Speichert Vorlieben und Notizen für alle Apps. Jede App liest und schreibt nur ihren eigenen Bereich, geteilt wird nur ausdrücklich.', {
        who: 'Dienst ohne Oberfläche', service: true,
        features: ['Vorlieben zu Essen, Lesen und Personen an einem Ort', 'KI-Agenten lesen und schreiben über MCP, jeder Lauf ist umkehrbar', 'Volltextsuche über die erlaubten Notizen', 'Apps arbeiten weiter, wenn der Dienst kurz fehlt'],
        tags: ['Go', 'SQLite FTS5', 'MCP'] }),
      A('browser', 'Browser', '#ea580c', 'browser', 'Ein Firefox, den KI-Agenten fernsteuern: Seiten öffnen, Formulare ausfüllen und Screenshots machen.', {
        who: 'Werkzeug für Agenten', service: true,
        features: ['Gehärtet gegen Bot-Erkennung', 'Erreichbar über den gemeinsamen MCP-Endpunkt', 'Nur mit Anmeldung und nur für freigegebene Werkzeuge'],
        tags: ['Python', 'Camoufox', 'MCP'] }),
      A('bot', 'Plattform-Bot', '#e8603c', 'bot', 'Arbeitet im Gruppenchat und auf GitHub mit. Er beantwortet Fragen zu Code und Checks und legt Entscheide als Pull Request an. Mergen darf er nicht.', {
        who: 'Im Chat und auf GitHub', service: true,
        features: ['Liest Code, Issues, Pull Requests und Checks', 'Schlägt Änderungen als Entwurf vor', 'Übergibt Releases, Deploys und Rollbacks an die CI', 'Hat er fremde Inhalte gelesen, braucht jede weitere Aktion eine Bestätigung'],
        tags: ['Go', 'SQLite', 'Telegram', 'GitHub'] }),
    ] },
  ],
};

// Every app gets its views when there are any (views.js).
window.CASTILLO.groups.forEach((g) => [...(g.apps || []), ...(g.games || []), ...(g.tiles || [])].forEach((a) => { const v = window.CASTILLO_VIEWS?.[a.id]; if (v?.length) a.views = v; }));
})();
