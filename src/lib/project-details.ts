import type { Lang } from "./i18n";

export type Phase = { step: string; title: string; body: string };
export type LogLine = { type: "cmd" | "out" | "ok" | "warn" | "err"; text: string };
export type Metric = { k: string; v: string };

export type ProjectDetail = {
  slug: string;
  codename: string;
  classification: string;
  duration: string;
  role: string;
  team: "BLUE" | "RED" | "PURPLE" | "DEV";
  summary: Record<Lang, string>;
  objective: Record<Lang, string>;
  metrics: Record<Lang, Metric[]>;
  phases: Record<Lang, Phase[]>;
  outcomes: Record<Lang, string[]>;
  logs: LogLine[];
  diagram: "infra" | "killchain" | "network" | "rbac" | "dataflow";
};

export const PROJECT_DETAILS: ProjectDetail[] = [
  {
    slug: "secure-infrastructure",
    codename: "OPERATION BLACKWALL",
    classification: "INTERNAL // BLUE TEAM",
    duration: "6 weeks",
    role: "Security Engineer / SOC N2",
    team: "BLUE",
    summary: {
      en: "End-to-end design of a hardened enterprise infrastructure: segmented network, centralized logging, host-based intrusion detection, and uptime monitoring across all critical services.",
      fr: "Conception complète d'une infrastructure d'entreprise durcie : réseau segmenté, journalisation centralisée, détection d'intrusion HIDS et monitoring de disponibilité sur tous les services critiques.",
    },
    objective: {
      en: "Build a defensible architecture where every service is monitored, every log is correlated, and every anomaly triggers an alert in <2 minutes.",
      fr: "Construire une architecture défendable où chaque service est surveillé, chaque log corrélé, et chaque anomalie déclenche une alerte en <2 minutes.",
    },
    metrics: {
      en: [
        { k: "Hosts monitored", v: "24" }, { k: "Log sources", v: "11" },
        { k: "MTTD", v: "1m 48s" }, { k: "Uptime SLA", v: "99.94%" },
      ],
      fr: [
        { k: "Hôtes surveillés", v: "24" }, { k: "Sources de logs", v: "11" },
        { k: "MTTD", v: "1m 48s" }, { k: "SLA dispo.", v: "99,94%" },
      ],
    },
    phases: {
      en: [
        { step: "01", title: "Recon & Threat Model", body: "Inventory of assets, STRIDE threat model, attack-surface mapping per service." },
        { step: "02", title: "Network Segmentation", body: "VLAN design (DMZ, LAN, MGMT), firewall ruleset, jumphost-only SSH access." },
        { step: "03", title: "Hardening", body: "CIS benchmarks applied, fail2ban, SELinux enforcing, kernel sysctl tuning." },
        { step: "04", title: "Detection Layer", body: "Wazuh agents on all hosts, Suricata on perimeter, Syslog → SIEM pipeline." },
        { step: "05", title: "Response Playbooks", body: "5 IR playbooks: brute-force, malware, exfil, lateral movement, privilege escalation." },
      ],
      fr: [
        { step: "01", title: "Reco & modèle de menace", body: "Inventaire des actifs, modèle STRIDE, cartographie de surface d'attaque par service." },
        { step: "02", title: "Segmentation réseau", body: "Design VLAN (DMZ, LAN, MGMT), ruleset pare-feu, accès SSH via jumphost uniquement." },
        { step: "03", title: "Durcissement", body: "Benchmarks CIS, fail2ban, SELinux enforcing, tuning sysctl noyau." },
        { step: "04", title: "Couche de détection", body: "Agents Wazuh sur tous les hôtes, Suricata en périmètre, pipeline Syslog → SIEM." },
        { step: "05", title: "Playbooks de réponse", body: "5 playbooks IR : brute-force, malware, exfiltration, mouvement latéral, escalade." },
      ],
    },
    outcomes: {
      en: [
        "Reduced mean time to detect (MTTD) from ~14min to under 2min.",
        "Zero successful brute-force after fail2ban + geo-block deployment.",
        "Centralized 11 log sources into a single Wazuh dashboard.",
      ],
      fr: [
        "Temps moyen de détection (MTTD) réduit de ~14min à moins de 2min.",
        "Zéro brute-force réussi après déploiement fail2ban + geo-block.",
        "11 sources de logs centralisées dans un seul dashboard Wazuh.",
      ],
    },
    logs: [
      { type: "cmd", text: "$ wazuh-control status" },
      { type: "ok", text: "✓ wazuh-manager       running (pid 4421)" },
      { type: "ok", text: "✓ wazuh-analysisd     running (pid 4438)" },
      { type: "cmd", text: "$ tail -f /var/log/suricata/fast.log" },
      { type: "warn", text: "[1:2013504:5] ET POLICY SSH session in progress" },
      { type: "err", text: "[1:2024897:3] ET SCAN Nmap Scripting Engine User-Agent" },
      { type: "cmd", text: "$ wazuh-cli alert --severity high --last 24h" },
      { type: "out", text: "→ 7 alerts, 3 escalated, 4 auto-resolved" },
    ],
    diagram: "infra",
  },
  {
    slug: "pentest-defense-sim",
    codename: "OPERATION CRIMSON ECHO",
    classification: "RESTRICTED // RED + BLUE",
    duration: "3 weeks",
    role: "Red Team Operator → Defender",
    team: "PURPLE",
    summary: {
      en: "Full kill-chain simulation against a vulnerable web target. Reconnaissance, exploitation, post-exploit, then pivoting to the blue side: detection signatures, IDS rules, and incident response.",
      fr: "Simulation kill-chain complète contre une cible web vulnérable. Reconnaissance, exploitation, post-exploit, puis bascule côté défense : signatures, règles IDS, et réponse à incident.",
    },
    objective: {
      en: "Validate detection coverage of the SOC by emulating a realistic external attacker and tuning Suricata/Snort rules until every TTP is caught.",
      fr: "Valider la couverture de détection du SOC en émulant un attaquant externe réaliste et en affinant les règles Suricata/Snort jusqu'à détecter chaque TTP.",
    },
    metrics: {
      en: [
        { k: "TTPs simulated", v: "17" }, { k: "Initial coverage", v: "41%" },
        { k: "Final coverage", v: "94%" }, { k: "Custom rules", v: "23" },
      ],
      fr: [
        { k: "TTPs simulés", v: "17" }, { k: "Couverture initiale", v: "41%" },
        { k: "Couverture finale", v: "94%" }, { k: "Règles custom", v: "23" },
      ],
    },
    phases: {
      en: [
        { step: "01", title: "Recon", body: "Passive OSINT, then nmap service/version scan, directory bruteforce." },
        { step: "02", title: "Weaponization", body: "Crafted payloads with msfvenom, staged listener via Metasploit." },
        { step: "03", title: "Exploitation", body: "SQL injection → file upload bypass → reverse shell as www-data." },
        { step: "04", title: "Privilege Escalation", body: "Linux enumeration with linpeas, exploited misconfigured sudo entry." },
        { step: "05", title: "Detection Tuning", body: "Wrote Suricata signatures for each TTP, validated zero false-negatives." },
      ],
      fr: [
        { step: "01", title: "Recon", body: "OSINT passif, puis scan nmap services/versions, bruteforce de répertoires." },
        { step: "02", title: "Weaponization", body: "Payloads msfvenom, listener staged via Metasploit." },
        { step: "03", title: "Exploitation", body: "SQLi → bypass upload de fichier → reverse shell www-data." },
        { step: "04", title: "Escalade de privilèges", body: "Énumération Linux avec linpeas, exploitation d'un sudo mal configuré." },
        { step: "05", title: "Tuning détection", body: "Signatures Suricata par TTP, validation zéro faux-négatif." },
      ],
    },
    outcomes: {
      en: [
        "Coverage of MITRE ATT&CK techniques jumped from 41% to 94%.",
        "Identified and patched 4 critical web vulnerabilities pre-prod.",
        "Documented full attack timeline with PCAP evidence.",
      ],
      fr: [
        "Couverture des techniques MITRE ATT&CK passée de 41% à 94%.",
        "4 vulnérabilités web critiques identifiées et corrigées avant prod.",
        "Timeline d'attaque complète documentée avec preuves PCAP.",
      ],
    },
    logs: [
      { type: "cmd", text: "$ nmap -sV -sC -p- 10.10.42.7" },
      { type: "out", text: "22/tcp  open  ssh     OpenSSH 8.2p1" },
      { type: "out", text: "80/tcp  open  http    Apache 2.4.41" },
      { type: "cmd", text: "$ sqlmap -u 'http://target/login' --dbs" },
      { type: "warn", text: "[INFO] target appears injectable (boolean-blind)" },
      { type: "cmd", text: "$ msfconsole -r exploit.rc" },
      { type: "ok", text: "[+] Meterpreter session 1 opened (10.10.42.7:4444)" },
      { type: "err", text: "[BLUE] Suricata SID:1000023 — REVERSE SHELL detected" },
    ],
    diagram: "killchain",
  },
  {
    slug: "pfsense-advanced",
    codename: "OPERATION IRON GATE",
    classification: "INTERNAL // NETWORK",
    duration: "2 weeks",
    role: "Network Security Engineer",
    team: "BLUE",
    summary: {
      en: "Hardened pfSense deployment with multi-VLAN segmentation, captive portal authentication via RADIUS, IDS inline mode with Suricata, and site-to-site VPN.",
      fr: "Déploiement pfSense durci avec segmentation multi-VLAN, portail captif via RADIUS, IDS en mode inline avec Suricata, et VPN site-à-site.",
    },
    objective: {
      en: "Deliver a perimeter that blocks 100% of known-bad traffic, isolates IoT and guest devices, and provides identity-aware Wi-Fi access.",
      fr: "Livrer un périmètre qui bloque 100% du trafic malveillant connu, isole IoT et invités, et fournit un accès Wi-Fi authentifié.",
    },
    metrics: {
      en: [
        { k: "VLANs", v: "5" }, { k: "Firewall rules", v: "47" },
        { k: "Suricata rules", v: "32k" }, { k: "VPN tunnels", v: "3" },
      ],
      fr: [
        { k: "VLAN", v: "5" }, { k: "Règles pare-feu", v: "47" },
        { k: "Règles Suricata", v: "32k" }, { k: "Tunnels VPN", v: "3" },
      ],
    },
    phases: {
      en: [
        { step: "01", title: "VLAN Architecture", body: "Designed MGMT, LAN, IoT, GUEST, DMZ with strict inter-VLAN ACLs." },
        { step: "02", title: "Firewall Ruleset", body: "Default-deny posture, explicit allow per service, geo-blocking on WAN." },
        { step: "03", title: "Suricata Inline", body: "ET Open + custom rules, drop mode for high-confidence signatures." },
        { step: "04", title: "Captive Portal", body: "RADIUS-backed auth, MAC quarantine for unknown devices." },
        { step: "05", title: "VPN", body: "OpenVPN site-to-site + remote-access with cert auth." },
      ],
      fr: [
        { step: "01", title: "Architecture VLAN", body: "MGMT, LAN, IoT, GUEST, DMZ avec ACL inter-VLAN strictes." },
        { step: "02", title: "Ruleset pare-feu", body: "Default-deny, allow explicite par service, geo-blocking sur WAN." },
        { step: "03", title: "Suricata inline", body: "ET Open + règles custom, mode drop pour signatures fiables." },
        { step: "04", title: "Portail captif", body: "Auth RADIUS, quarantaine MAC pour devices inconnus." },
        { step: "05", title: "VPN", body: "OpenVPN site-à-site + accès distant avec auth par certificat." },
      ],
    },
    outcomes: {
      en: [
        "Blocked 12,400+ malicious connections in first month.",
        "Isolated IoT segment — zero lateral movement possible to LAN.",
        "Reduced guest-network incidents by 87%.",
      ],
      fr: [
        "12 400+ connexions malveillantes bloquées le premier mois.",
        "Segment IoT isolé — zéro mouvement latéral possible vers LAN.",
        "Incidents réseau invité réduits de 87%.",
      ],
    },
    logs: [
      { type: "cmd", text: "$ pfctl -s rules | head" },
      { type: "out", text: "block drop in quick on em0 from <bogons> to any" },
      { type: "out", text: "pass in on em1 inet proto tcp from any to (em1) port 443" },
      { type: "cmd", text: "$ suricatasc -c 'iface-stat em0'" },
      { type: "ok", text: "{ pkts: 18429301, drop: 12, invalid: 0 }" },
      { type: "warn", text: "[Suricata] ET CINS Active Threat Intelligence — DROP" },
    ],
    diagram: "network",
  },
  {
    slug: "quatro-school",
    codename: "PROJECT QUATRO",
    classification: "PUBLIC // WEB APP",
    duration: "10 weeks",
    role: "Full-stack + Security",
    team: "DEV",
    summary: {
      en: "Multi-tenant school management platform with role-based access control across students, teachers, and administrators. Built with security-by-design principles.",
      fr: "Plateforme multi-tenant de gestion scolaire avec contrôle d'accès par rôle pour étudiants, enseignants et administrateurs. Conçue selon les principes security-by-design.",
    },
    objective: {
      en: "Ship a production-ready RBAC system with audit logs, secure session handling, and zero OWASP Top-10 findings on launch.",
      fr: "Livrer un système RBAC production-ready avec audit logs, gestion de session sécurisée, et zéro finding OWASP Top-10 au lancement.",
    },
    metrics: {
      en: [
        { k: "Roles", v: "4" }, { k: "API endpoints", v: "62" },
        { k: "Test coverage", v: "81%" }, { k: "OWASP findings", v: "0" },
      ],
      fr: [
        { k: "Rôles", v: "4" }, { k: "Endpoints API", v: "62" },
        { k: "Couverture tests", v: "81%" }, { k: "Findings OWASP", v: "0" },
      ],
    },
    phases: {
      en: [
        { step: "01", title: "Data Model", body: "Normalized schema in PostgreSQL with row-level security policies." },
        { step: "02", title: "Auth Layer", body: "JWT with rotating refresh tokens, bcrypt hashing, rate-limited login." },
        { step: "03", title: "RBAC Engine", body: "Permission matrix per role, middleware-enforced on every route." },
        { step: "04", title: "Frontend", body: "React with route-guarded pages, optimistic UI, error boundaries." },
        { step: "05", title: "Audit Trail", body: "Append-only audit log for every privileged action, exportable as CSV." },
      ],
      fr: [
        { step: "01", title: "Modèle de données", body: "Schéma normalisé PostgreSQL avec politiques row-level security." },
        { step: "02", title: "Couche auth", body: "JWT avec refresh tokens rotatifs, hash bcrypt, login rate-limité." },
        { step: "03", title: "Moteur RBAC", body: "Matrice de permissions par rôle, vérification middleware sur chaque route." },
        { step: "04", title: "Frontend", body: "React avec pages protégées par route, UI optimiste, error boundaries." },
        { step: "05", title: "Audit", body: "Log d'audit append-only pour chaque action privilégiée, exportable CSV." },
      ],
    },
    outcomes: {
      en: [
        "Passed external pentest with zero critical or high findings.",
        "Sub-200ms p95 API response time at 500 concurrent users.",
        "Full GDPR-aligned data export and deletion workflows.",
      ],
      fr: [
        "Pentest externe réussi sans aucun finding critique ou élevé.",
        "Temps de réponse API p95 < 200ms à 500 utilisateurs simultanés.",
        "Workflows complets d'export et suppression des données alignés RGPD.",
      ],
    },
    logs: [
      { type: "cmd", text: "$ npm run test -- --coverage" },
      { type: "ok", text: "✓ 142 tests passed (auth, rbac, api, ui)" },
      { type: "out", text: "Coverage: 81.4% statements, 76.2% branches" },
      { type: "cmd", text: "$ npm audit --production" },
      { type: "ok", text: "found 0 vulnerabilities" },
      { type: "cmd", text: "$ curl -s -o /dev/null -w '%{http_code}' /admin" },
      { type: "warn", text: "401 — JWT required, RBAC enforced" },
    ],
    diagram: "rbac",
  },
  {
    slug: "budget-manager",
    codename: "PROJECT LEDGER",
    classification: "PUBLIC // WEB APP",
    duration: "4 weeks",
    role: "Full-stack",
    team: "DEV",
    summary: {
      en: "Personal finance tracker with real-time analytics, category-based budgets, and threshold alerts. Encrypts sensitive transaction metadata at rest.",
      fr: "Suivi de finances personnelles avec analytique temps réel, budgets par catégorie, et alertes de seuil. Métadonnées de transaction chiffrées au repos.",
    },
    objective: {
      en: "Give the user a single dashboard answering: where is my money going, am I on track, and what should I cut?",
      fr: "Donner à l'utilisateur un dashboard unique répondant à : où va mon argent, suis-je dans les clous, que dois-je couper ?",
    },
    metrics: {
      en: [
        { k: "Categories", v: "12" }, { k: "Charts", v: "6" },
        { k: "Alert types", v: "4" }, { k: "Avg load", v: "180ms" },
      ],
      fr: [
        { k: "Catégories", v: "12" }, { k: "Graphiques", v: "6" },
        { k: "Types d'alerte", v: "4" }, { k: "Chargement moyen", v: "180ms" },
      ],
    },
    phases: {
      en: [
        { step: "01", title: "Schema Design", body: "Mongo collections for accounts, transactions, budgets, alerts." },
        { step: "02", title: "Ingest", body: "Manual entry + CSV import with deduplication and category guessing." },
        { step: "03", title: "Analytics", body: "Aggregation pipelines for monthly trends, category share, forecast." },
        { step: "04", title: "Alerts", body: "Threshold rules per category with email + in-app notifications." },
        { step: "05", title: "UI", body: "Chart.js dashboards, dark mode, mobile-first responsive layout." },
      ],
      fr: [
        { step: "01", title: "Schéma", body: "Collections Mongo pour comptes, transactions, budgets, alertes." },
        { step: "02", title: "Ingestion", body: "Saisie manuelle + import CSV avec dédoublonnage et catégorisation auto." },
        { step: "03", title: "Analytique", body: "Pipelines d'agrégation pour tendances mensuelles, parts catégories, prévision." },
        { step: "04", title: "Alertes", body: "Règles de seuil par catégorie avec notifs email + in-app." },
        { step: "05", title: "UI", body: "Dashboards Chart.js, dark mode, layout mobile-first." },
      ],
    },
    outcomes: {
      en: [
        "Reduced unplanned spending by 30% in pilot user group.",
        "Sub-second dashboard render with 12 months of data.",
        "Encrypted transaction notes using AES-256 envelope encryption.",
      ],
      fr: [
        "Dépenses non planifiées réduites de 30% sur le groupe pilote.",
        "Rendu du dashboard sub-seconde avec 12 mois de données.",
        "Notes de transaction chiffrées en AES-256 (envelope encryption).",
      ],
    },
    logs: [
      { type: "cmd", text: "$ node scripts/seed.js" },
      { type: "ok", text: "✓ seeded 1,240 transactions across 12 months" },
      { type: "cmd", text: "$ npm run analyze:trends" },
      { type: "out", text: "→ Top category: Groceries (24.1%)" },
      { type: "out", text: "→ Forecast next month: 1,840 EUR (-6%)" },
      { type: "warn", text: "⚠ Alert: 'Dining' at 92% of monthly budget" },
    ],
    diagram: "dataflow",
  },
];

export const findProject = (slug: string) =>
  PROJECT_DETAILS.find((p) => p.slug === slug);
