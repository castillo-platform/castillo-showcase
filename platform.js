// The platform and how it is built: text, the architecture drawing and the timeline. Public-safe:
// no hostnames, domains, people, accounts or figures beyond counts of things in the repos.
window.CASTILLO_PLATFORM = {
  platform: {
    lead: 'Ein Mini-PC zu Hause, ohne offene Ports nach aussen. Darauf läuft Kubernetes, und alles vom Betriebssystem bis zur letzten App steht als Code in Git. Nach einem Push baut und prüft die eigene CI die neue Version und liefert sie selbst aus.',
    layers: [
      { name: 'Hardware und Host', color: '#f2a93b', points: ['Ein Mini-PC: 6 Kerne, 24 GB RAM, keine GPU, Ubuntu', 'Keine offenen Ports, erreichbar nur über einen ausgehenden Tunnel', 'Jeder Baustein des Hosts ist eine „Unit“ mit gepinnter Version, Trockenlauf mit Diff und automatischem Rollback', 'Host-Updates kommen als Pull Request'], tools: ['Ansible', 'Renovate', 'code-server'] },
      { name: 'Kubernetes', color: '#4f8df5', points: ['K3s mit einem Knoten, Ingress nur intern', 'Sicherheit per nativer Admission Policy: non-root, Seccomp, keine Rechte-Eskalation', 'Scale to zero: selten genutzte Dienste starten beim ersten Aufruf und schlafen im Leerlauf', 'Eigene Registry, eigener S3-Speicher, Wildcard-TLS'], tools: ['K3s', 'Traefik', 'cert-manager', 'Garage', 'Zot'] },
      { name: 'GitOps', color: '#2fb380', points: ['Jede Komponente ist genau ein Helm-Chart und ein HelmRelease', 'App-of-Apps-Repo legt Quellen, Namespaces, Policies und Backups an', 'Push statt Polling: Webhooks lösen den Abgleich aus', 'Rollout-Status erscheint direkt am Commit'], tools: ['Flux CD', 'Helm', 'OpenTofu'] },
      { name: 'CI/CD ohne GitHub Actions', color: '#e8603c', points: ['Pipelines laufen im eigenen Cluster, ausgelöst per Webhook', 'Jeder Pull Request bekommt einen Check, jeder Merge erzeugt automatisch ein Release', 'Die Auslieferung wartet, bis die neue Version gesund läuft, und rollt sonst zurück', 'Wöchentlicher Update-Zug: KI-Agenten aktualisieren, prüfen und verifizieren'], tools: ['Argo Workflows', 'Argo Events', 'BuildKit', 'Renovate'] },
      { name: 'Zugang und Identität', color: '#9b7bea', points: ['Standardmässig ist alles zu, jede App braucht eine eigene Freigabe', 'Apps prüfen die Anmeldung zusätzlich selbst', 'Ein Verzeichnis kennt Personen, Familien und Gruppen', 'Daten gehören einer Person und werden nur nach ausdrücklicher Freigabe geteilt'], tools: ['Cloudflare Tunnel', 'Cloudflare Access', 'Directory'] },
      { name: 'Secrets', color: '#d4a017', points: ['Eine einzige Quelle für alle Secrets', 'Kein Secret in Git, im Wissensspeicher oder im Chat', 'Secret-Scan vor jedem automatischen Commit', 'Agenten haben eine eigene, eingeschränkte Rolle'], tools: ['Akeyless', 'External Secrets'] },
      { name: 'Beobachten und Absichern', color: '#e0477c', points: ['Logs, Events und Metriken in der Cloud', 'Eigene Console zeigt Dienste, Host-Units und Updates', 'Täglicher Scan aller Images mit SBOM und Ausnutzungswahrscheinlichkeit (EPSS)', 'Monatlicher Konfigurations-Check nach CIS'], tools: ['Grafana Alloy', 'Grafana Cloud', 'Trivy', 'kube-bench', 'Lynis'] },
      { name: 'Backups', color: '#22a6b3', points: ['Täglich (7 Tage) und wöchentlich (4 Wochen) in einen Cloud-Bucket', 'Neue Apps bekommen den Plan automatisch', 'Fast jede App speichert in einer SQLite-Datei, ein Restore ist eine Datei'], tools: ['Velero', 'Kopia', 'SQLite'] },
      { name: 'KI für Apps und Agenten', color: '#5b6cf0', points: ['Ein LLM-Gateway: eigener Schlüssel, Budget und Limit pro App', 'Ein MCP-Endpunkt bündelt die Werkzeuge der Apps für KI-Assistenten', 'Ein echter Browser als Werkzeug', 'Jede Schreibaktion eines Agenten lässt sich rückgängig machen'], tools: ['GoModel', 'ToolHive', 'Cedar', 'Camoufox'] },
      { name: 'app-foundation', color: '#14a38b', points: ['Kleines Go-Toolkit statt Framework: Zugang, Identität, SQLite, Server, LLM, Push', '15 Frontend-Module ohne eigene Optik, jede App behält ihr Aussehen', 'Ein Scaffold erzeugt eine neue App samt CI und Helm-Chart'], tools: ['Go', 'React', 'Vite', 'TypeScript', 'TanStack Query'] },
    ],
  },
  how: {
    lead: 'Code, Konfiguration und Betrieb erledigen zum grössten Teil KI-Coding-Agenten. Der Owner gibt die Aufgaben, prüft die Ergebnisse und entscheidet, oft vom Handy aus.',
    cards: [
      { big: '16', title: 'Skills', text: 'Schritt-für-Schritt-Anleitungen für Agenten: neue App anlegen, CI-Fehler untersuchen, Produktion prüfen, Review.', color: '#5b6cf0' },
      { big: '18', title: 'Seiten im „Brain“', text: 'Ein Wissensspeicher als Markdown in Git. Hooks schlagen zu jeder Frage passende Seiten vor, nachts konsolidiert ein „Dream“-Lauf.', color: '#2fb380' },
      { big: '1', title: 'Plattform-Bot', text: 'Arbeitet im Gruppenchat und auf GitHub mit, liest Code und Checks und schlägt Änderungen als Entwurf vor. Mergen darf er nicht.', color: '#e8603c' },
      { big: '2', title: 'Plattformen, ein Upstream', text: 'Neutrale Apps und Bausteine werden mit einer befreundeten Plattform geteilt. Jede betreibt daraus ihre eigene Instanz.', color: '#f2a93b' },
      { big: '~2’400', title: 'Commits in drei Wochen', text: 'Seit dem Start von Castillo über alle Repos beider Organisationen gezählt, von Menschen, Agenten und Bot zusammen.', color: '#e0477c' },
      { big: '0', title: 'GitHub Actions', text: 'Prüfen, Releasen und Ausliefern laufen über Webhooks in der eigenen CI, mit Meldungen und Knöpfen im Chat.', color: '#4f8df5' },
    ],
    timeline: [
      { date: '28.10.2026', text: 'Castillo entsteht aus der Codebasis einer befreundeten Plattform, mit eigener Organisation und eigenem Server.' },
      { date: '31.10.2026', text: 'Der gemeinsame Upstream startet mit geteilten Charts sowie Directory, Console, Paper und Memory. Die erste Kinder-App geht live.' },
      { date: '01.11.2026', text: 'Das erste 3D-Spiel für die Kinder.' },
      { date: '07.11.2026', text: 'Weitere Familien-Apps: Spiele, To-dos, Ferienplanung.' },
      { date: '11.11.2026', text: 'Das „Brain“: ein Wissensspeicher in Git, aus dem die Agenten zu jeder Aufgabe die passenden Seiten erhalten.' },
      { date: '12.11.2026', text: 'Keine GitHub Actions mehr: Prüfen und Ausliefern übernimmt die eigene CI. Der Plattform-Bot geht live.' },
      { date: '13.11.2026', text: 'Eine neue App geht vom Scaffold bis in die Produktion am selben Tag.' },
      { date: '14.11.2026', text: 'Das Brain schreibt selbst nach, was eine Session gelernt hat, und räumt jede Nacht auf.' },
      { date: '16.11.2026', text: 'Stand dieser Seite: 36 Bausteine der Plattform, 20 Apps, 17 Websites und Spiele.' },
    ],
  },
};

// The architecture: who talks to whom. Drawn for a dark section; boxes carry the layer colours.
window.CASTILLO_PLATFORM.platform.arch = (() => {
  const box = (x, y, w, h, title, sub, c, opts = {}) => `
    <g>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${opts.fill || '#232b3b'}" stroke="${opts.stroke || '#323c50'}" ${opts.dash ? 'stroke-dasharray="6 6"' : ''}/>
      ${c ? `<rect x="${x + 16}" y="${y + 18}" width="10" height="10" rx="3" fill="${c}"/>` : ''}
      <text x="${x + (c ? 34 : 16)}" y="${y + 28}" class="arch-t">${title}</text>
      ${sub ? `<text x="${x + 16}" y="${y + 50}" class="arch-s">${sub}</text>` : ''}
    </g>`;
  let n = 0;
  const arrow = (d, label, lx, ly, opts = {}) => `
    <path d="${d}" fill="none" stroke="${opts.c || '#7d8aa3'}" stroke-width="1.6" ${opts.dash ? 'stroke-dasharray="5 5"' : ''} marker-end="url(#ah)"/>
    <circle r="${opts.dash ? 2.5 : 3.5}" fill="${opts.dash ? '#a2aab8' : '#f2a93b'}" class="pkt"><animateMotion dur="${(1.6 + (n++ % 5) * 0.35).toFixed(2)}s" begin="${((n * 0.37) % 2).toFixed(2)}s" repeatCount="indefinite" path="${d}"/></circle>
    ${label ? `<text x="${lx}" y="${ly}" class="arch-l" text-anchor="${opts.anchor || 'middle'}">${label}</text>` : ''}`;
  return `
  <svg viewBox="0 0 1200 660" role="img" aria-label="Architektur von Castillo">
    <style>
      .arch-t { font: 600 16px Geist, system-ui, sans-serif; fill: #eef1f6; }
      .arch-s { font: 400 14px Geist, system-ui, sans-serif; fill: #a2aab8; }
      .arch-l { font: 500 13px 'Geist Mono', ui-monospace, monospace; fill: #a2aab8; }
      .arch-h { font: 700 14px 'Geist Mono', ui-monospace, monospace; fill: #f2a93b; letter-spacing: .08em; }
    </style>
    <defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="#7d8aa3"/></marker></defs>

    ${box(20, 30, 230, 64, 'Familie', 'Handy und Browser', '#f2a93b')}
    ${box(20, 120, 230, 64, 'KI-Assistenten', 'als MCP-Client', '#5b6cf0')}
    ${box(20, 250, 230, 64, 'Mensch + Agenten', 'Claude Code, Skills, Brain', '#2fb380')}
    ${box(20, 340, 230, 64, 'Gruppenchat', 'Meldungen und Knöpfe', '#e8603c')}

    ${box(310, 70, 200, 80, 'Cloudflare', 'Tunnel + Access', '#9b7bea')}
    ${box(310, 270, 200, 112, 'GitHub', 'Upstream + Castillo', '#eef1f6')}
    <text x="326" y="356" class="arch-s">PRs · Releases</text><text x="326" y="374" class="arch-s">Deployments</text>

    <rect x="570" y="20" width="610" height="460" rx="22" fill="none" stroke="#f2a93b" stroke-width="1.5" stroke-dasharray="2 7" stroke-linecap="round"/>
    <text x="594" y="50" class="arch-h">HEIMSERVER · K3S</text>
    ${box(594, 70, 170, 64, 'Traefik', 'Ingress', '#4f8df5')}
    ${box(790, 70, 366, 64, 'Apps', 'rund 20 · Go + SQLite + React-PWA', '#f2a93b', { fill: '#2b3446' })}
    ${box(594, 160, 170, 64, 'Directory', 'Wer ist wer?', '#9b7bea')}
    ${box(790, 160, 175, 64, 'LLM-Gateway', '→ Cloud-Modelle', '#5b6cf0')}
    ${box(981, 160, 175, 64, 'MCP-Server', 'Werkzeuge + Browser', '#5b6cf0')}
    ${box(594, 270, 170, 64, 'CI', 'Argo + BuildKit', '#e8603c')}
    ${box(790, 270, 175, 64, 'Registry', 'Images + Charts', '#4f8df5')}
    ${box(981, 270, 175, 64, 'Flux CD', 'GitOps', '#2fb380')}
    ${box(594, 380, 170, 64, 'Plattform-Bot', 'Chat + GitHub', '#e8603c')}
    ${box(790, 380, 175, 64, 'Secrets', 'External Secrets', '#d4a017')}
    ${box(981, 380, 175, 64, 'Betrieb', 'Backup · Logs · Scan', '#22a6b3')}

    ${box(790, 540, 175, 64, 'Akeyless', 'Secrets', '#d4a017', { dash: true })}
    ${box(981, 540, 175, 64, 'Grafana + S3', 'Logs · Backups', '#22a6b3', { dash: true })}

    ${arrow('M250 62 C 280 62, 280 100, 306 104', '', 0, 0)}
    ${arrow('M250 152 C 280 152, 280 124, 306 120', '', 0, 0)}
    ${arrow('M510 102 L 590 102', 'Tunnel', 550, 88)}
    ${arrow('M764 102 L 786 102', '', 0, 0)}
    ${arrow('M890 134 L 890 156', '', 0, 0)}
    ${arrow('M700 134 C 700 146, 690 148, 690 156', '', 0, 0)}
    ${arrow('M1068 156 L 1068 138', '', 0, 0)}
    ${arrow('M250 282 L 306 300', 'PR', 276, 280)}
    ${arrow('M510 302 L 590 302', 'Webhook', 550, 294)}
    ${arrow('M764 302 L 786 302', '', 0, 0)}
    ${arrow('M981 302 L 969 302', '', 0, 0)}
    ${arrow('M1068 270 L 1068 228', 'rollt aus', 1100, 252, { anchor: 'start' })}
    ${arrow('M594 330 C 540 360, 540 370, 514 360', 'Release', 548, 384)}
    ${arrow('M594 412 C 400 450, 300 420, 254 380', '', 0, 0)}
    ${arrow('M679 224 C 679 250, 520 250, 512 140', '', 0, 0, { dash: true })}
    <text x="512" y="244" class="arch-l">gleicht</text><text x="512" y="260" class="arch-l">Access ab</text>
    ${arrow('M877 540 L 877 448', 'Secrets', 887, 500, { dash: true, anchor: 'start' })}
    ${arrow('M1068 448 L 1068 536', 'Logs · Backups', 1078, 500, { dash: true, anchor: 'start' })}
  </svg>`;
})();

// The same architecture for narrow screens: four zones from outside to inside, read top to bottom.
window.CASTILLO_PLATFORM.platform.zones = [
  { name: 'Draussen', items: [['Familie', 'Handy und Browser'], ['KI-Assistenten', 'als MCP-Client'], ['Mensch und Agenten', 'Claude Code, Skills, Brain'], ['Gruppenchat', 'Meldungen und Knöpfe']] },
  { name: 'Am Rand', items: [['Cloudflare', 'Tunnel und Anmeldung'], ['GitHub', 'Pull Requests, Releases, Deployments']] },
  { name: 'Heimserver · K3s', home: true, items: [['Traefik', 'leitet jede Anfrage an ihre App'], ['Apps', 'Go, SQLite und React'], ['Directory', 'wer ist wer'], ['LLM-Gateway', 'Schlüssel und Budgets'], ['MCP-Server', 'Werkzeuge und Browser'], ['CI', 'Argo und BuildKit'], ['Registry', 'Images und Charts'], ['Flux CD', 'rollt aus'], ['Plattform-Bot', 'Chat und GitHub'], ['Secrets', 'External Secrets'], ['Betrieb', 'Backup, Logs, Scans']] },
  { name: 'In der Cloud', items: [['Cloud-Modelle', 'hinter dem Gateway'], ['Akeyless', 'Secrets'], ['Grafana und S3', 'Logs und Backups']] },
];
