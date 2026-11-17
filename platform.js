// The platform and how it is built, as data for the drawings in app.js. Public-safe: no hostnames,
// domains, people or accounts; figures are counts of things in the repos.
window.CASTILLO_PLATFORM = {
  platform: {
    lead: 'Ein Mini-PC zu Hause, ohne offene Ports. Alles vom Betriebssystem bis zur App steht als Code in Git.',

    // Figures that need no sentence
    figures: [
      { n: '0', label: 'offene Ports', color: '#e8603c' },
      { n: '1', label: 'Knoten, 6 Kerne, 24 GB', color: '#f2a93b' },
      { n: '36', label: 'Bausteine der Plattform', color: '#4f8df5' },
      { n: '22', label: 'Repos an der eigenen CI', color: '#2fb380' },
      { n: '2', label: 'Backups: täglich, wöchentlich', color: '#22a6b3' },
      { n: '15', label: 'geteilte UI-Module', color: '#9b7bea' },
    ],

    // Architecture: nodes on a 1200 x 640 board, edges between them, flows that light a path.
    nodes: [
      { id: 'family', x: 20, y: 40, t: 'Familie', s: 'Handy + iPad', i: 'phone', c: '#f2a93b' },
      { id: 'ai', x: 20, y: 160, t: 'KI-Assistent', s: 'als MCP-Client', i: 'sparkle', c: '#5b6cf0' },
      { id: 'dev', x: 20, y: 330, t: 'Agenten', s: 'Owner + Claude Code', i: 'bot', c: '#2fb380' },
      { id: 'cf', x: 280, y: 95, t: 'Cloudflare', s: 'Tunnel + Login', i: 'shield', c: '#9b7bea' },
      { id: 'gh', x: 280, y: 330, t: 'GitHub', s: 'Code + Releases', i: 'git', c: '#1d2433' },
      { id: 'traefik', x: 565, y: 60, t: 'Traefik', s: 'Eingang', i: 'door', c: '#4f8df5', home: true },
      { id: 'apps', x: 795, y: 60, t: 'Apps', s: 'Go + React', i: 'grid', c: '#f2a93b', home: true },
      { id: 'dir', x: 1025, y: 60, t: 'Directory', s: 'Wer ist wer', i: 'users', c: '#9b7bea', home: true },
      { id: 'mcp', x: 565, y: 180, t: 'MCP-Server', s: 'Werkzeuge', i: 'plug', c: '#5b6cf0', home: true },
      { id: 'llm', x: 795, y: 180, t: 'LLM-Gateway', s: 'Budget pro App', i: 'sparkle', c: '#5b6cf0', home: true },
      { id: 'ci', x: 565, y: 300, t: 'CI', s: 'Argo + BuildKit', i: 'cog', c: '#e8603c', home: true },
      { id: 'zot', x: 795, y: 300, t: 'Registry', s: 'Images + Charts', i: 'box', c: '#4f8df5', home: true },
      { id: 'flux', x: 1025, y: 300, t: 'Flux', s: 'GitOps', i: 'refresh', c: '#2fb380', home: true },
      { id: 'eso', x: 795, y: 420, t: 'Secrets', s: 'External Secrets', i: 'key', c: '#d4a017', home: true },
      { id: 'ops', x: 1025, y: 420, t: 'Betrieb', s: 'Backup + Logs', i: 'chart', c: '#22a6b3', home: true },
      { id: 'models', x: 1275, y: 180, t: 'Modelle', s: 'in der Cloud', i: 'cloud', c: '#5b6cf0', cloud: true },
      { id: 'backup', x: 1275, y: 420, t: 'Grafana + S3', s: 'Logs, Backups', i: 'cloud', c: '#22a6b3', cloud: true },
      { id: 'akeyless', x: 795, y: 556, t: 'Akeyless', s: 'Secret-Quelle', i: 'lock', c: '#d4a017', cloud: true },
    ],
    edges: [
      ['family', 'cf'], ['ai', 'cf'], ['cf', 'traefik'], ['traefik', 'apps'], ['apps', 'dir'],
      ['cf', 'mcp'], ['mcp', 'apps'], ['apps', 'llm'], ['llm', 'models'],
      ['dev', 'gh'], ['gh', 'ci'], ['ci', 'zot'], ['zot', 'flux'], ['flux', 'apps'],
      ['akeyless', 'eso'], ['eso', 'apps'], ['apps', 'ops'], ['ops', 'backup'],
    ],
    // Hand-laid routes through the gaps between the columns, so no line crosses a box
    routes: {
      'eso>apps': 'M795 459H786Q778 459 778 447V111Q778 99 786 99H795',
      'flux>apps': 'M1025 339H1014Q1001 339 1001 326V128Q1001 116 994 116H991',
      'apps>ops': 'M991 84H1004Q1015 84 1015 96V446Q1015 459 1020 459H1025',
      'mcp>apps': 'M761 219H770Q778 219 778 207V126Q778 118 786 118H795',
    },
    flows: [
      { id: 'request', t: 'Aufruf einer App', i: 'phone', c: '#f2a93b', path: [['family', 'cf'], ['cf', 'traefik'], ['traefik', 'apps'], ['apps', 'dir']], text: 'Die Anmeldung prüft Cloudflare, der Tunnel bringt die Anfrage nach Hause, die App fragt Directory, wer das ist.' },
      { id: 'deploy', t: 'Neue Version', i: 'rocket', c: '#e8603c', path: [['dev', 'gh'], ['gh', 'ci'], ['ci', 'zot'], ['zot', 'flux'], ['flux', 'apps']], text: 'Ein Push startet die eigene CI. Sie baut, prüft, erstellt ein Release, und Flux rollt es aus.' },
      { id: 'ai', t: 'KI-Assistent', i: 'sparkle', c: '#5b6cf0', path: [['ai', 'cf'], ['cf', 'mcp'], ['mcp', 'apps'], ['apps', 'llm'], ['llm', 'models']], text: 'Ein Assistent nutzt die Werkzeuge der Apps über einen MCP-Endpunkt; Apps erreichen Modelle nur über das Gateway.' },
      { id: 'safe', t: 'Secrets & Backup', i: 'key', c: '#22a6b3', path: [['akeyless', 'eso'], ['eso', 'apps'], ['apps', 'ops'], ['ops', 'backup']], text: 'Secrets kommen nur aus Akeyless. Logs gehen laufend in die Cloud, Backups täglich und wöchentlich.' },
    ],

    // Delivery as a conveyor
    pipeline: [
      { t: 'Push', s: 'Webhook', i: 'git' },
      { t: 'Prüfen', s: 'Tests im Build', i: 'check' },
      { t: 'Release', s: 'Version aus dem Commit', i: 'tag' },
      { t: 'Ausliefern', s: 'Flux', i: 'refresh' },
      { t: 'Läuft', s: 'sonst Rollback', i: 'heart' },
    ],

    // The stack, from the ground up; the top band shows the apps themselves
    stack: [
      { t: 'Mini-PC', i: 'server', c: '#f2a93b', tools: ['Ubuntu', 'Ansible', 'Renovate'] },
      { t: 'Kubernetes', i: 'box', c: '#4f8df5', tools: ['K3s', 'Traefik', 'cert-manager', 'Garage', 'Zot'] },
      { t: 'Plattform', i: 'cog', c: '#2fb380', tools: ['Flux', 'Argo Workflows', 'BuildKit', 'External Secrets', 'Velero', 'Grafana Alloy', 'LLM-Gateway', 'ToolHive'] },
      { t: 'app-foundation', i: 'layers', c: '#14a38b', tools: ['Go', 'React', 'Vite', 'TypeScript', 'SQLite'] },
      { t: 'Apps', i: 'grid', c: '#e0477c', apps: true },
    ],
    cloud: [
      { t: 'Cloudflare', s: 'Tunnel, Anmeldung', i: 'shield', c: '#9b7bea' },
      { t: 'GitHub', s: 'Code', i: 'git', c: '#1d2433' },
      { t: 'Akeyless', s: 'Secrets', i: 'lock', c: '#d4a017' },
      { t: 'Grafana Cloud', s: 'Logs, Metriken', i: 'chart', c: '#22a6b3' },
    ],
  },

  how: {
    lead: 'Den grössten Teil von Code und Betrieb erledigen KI-Agenten. Der Owner gibt Aufgaben und entscheidet.',
    // The loop of a change, clockwise from the owner
    loop: [
      { t: 'Owner', s: 'Aufgabe, oft vom Handy', i: 'user', c: '#f2a93b' },
      { t: 'Agenten', s: 'Claude Code', i: 'bot', c: '#2fb380' },
      { t: 'Skills + Brain', s: '16 Skills, 19 Seiten', i: 'book', c: '#5b6cf0' },
      { t: 'Pull Request', s: 'mit Check', i: 'git', c: '#1d2433' },
      { t: 'CI + Release', s: 'im eigenen Cluster', i: 'cog', c: '#e8603c' },
      { t: 'Produktion', s: 'Rollout oder Rollback', i: 'rocket', c: '#4f8df5' },
      { t: 'Bot im Chat', s: 'meldet, merged nie', i: 'chat', c: '#e0477c' },
    ],
    cards: [
      { big: '16', title: 'Skills', color: '#5b6cf0' },
      { big: '19', title: 'Seiten im Brain', color: '#2fb380' },
      { big: '2382', title: 'Commits in drei Wochen', color: '#e0477c' },
      { big: '2', title: 'Plattformen, ein Upstream', color: '#f2a93b' },
    ],
    // Commits per day over every repo of both organisations, each commit counted once (git log, 2026-11-17).
    commits: [["2026-10-28", 152], ["2026-10-29", 84], ["2026-10-30", 50], ["2026-10-31", 359], ["2026-11-01", 318], ["2026-11-02", 61], ["2026-11-03", 1], ["2026-11-04", 11], ["2026-11-05", 0], ["2026-11-06", 13], ["2026-11-07", 149], ["2026-11-08", 89], ["2026-11-09", 111], ["2026-11-10", 47], ["2026-11-11", 37], ["2026-11-12", 486], ["2026-11-13", 155], ["2026-11-14", 103], ["2026-11-15", 34], ["2026-11-16", 122]],
    timeline: [
      { date: '28.10.2026', short: 'Castillo startet', i: 'castle', text: 'Castillo entsteht aus der Codebasis einer befreundeten Plattform, mit eigener Organisation und eigenem Server.' },
      { date: '31.10.2026', short: 'Gemeinsamer Upstream', i: 'git', text: 'Der gemeinsame Upstream startet mit Directory, Console, Paper und Memory. Die erste Kinder-App geht live.' },
      { date: '01.11.2026', short: 'Erstes 3D-Spiel', i: 'car', text: 'Das erste 3D-Spiel für die Kinder.' },
      { date: '07.11.2026', short: 'Familien-Apps', i: 'check', text: 'Weitere Familien-Apps: Spiele, To-dos, Ferienplanung.' },
      { date: '11.11.2026', short: 'Das Brain', i: 'book', text: 'Ein Wissensspeicher in Git, aus dem die Agenten zu jeder Aufgabe die passenden Seiten erhalten.' },
      { date: '12.11.2026', short: 'Eigene CI, Bot live', i: 'rocket', text: 'Prüfen und Ausliefern übernimmt die eigene CI statt GitHub Actions. Der Plattform-Bot geht live.' },
      { date: '13.11.2026', short: 'App an einem Tag', i: 'sparkle', text: 'Eine neue App geht am selben Tag vom ersten Entwurf bis in die Produktion.' },
      { date: '14.11.2026', short: 'Brain lernt selbst', i: 'brain', text: 'Das Brain schreibt selbst nach, was eine Session gelernt hat, und räumt jede Nacht auf.' },
    ],
  },
};
