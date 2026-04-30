import type { Lang } from "./i18n";

export type SkillDetail = {
  slug: string;
  name: Record<Lang, string>;
  category: string;
  level: number; // 1-5
  description: Record<Lang, string>;
  tools: string[];
  experience: Record<Lang, string>;
};

export const SKILLS_DATA: SkillDetail[] = [
  {
    slug: "network-security",
    name: { en: "Network Security", fr: "Sécurité réseau" },
    category: "Infrastructure",
    level: 5,
    description: {
      en: "Design and implementation of secure network architectures, segmentation, firewall policies, and perimeter defense. Experience with network monitoring, traffic analysis, and threat detection.",
      fr: "Conception et mise en œuvre d'architectures réseau sécurisées, segmentation, politiques pare-feu et défense périmétrique. Expérience en monitoring réseau, analyse du trafic et détection des menaces.",
    },
    tools: ["pfSense", "Suricata", "Wireshark", "Nmap", "tcpdump", "VLAN", "VPN", "Firewall"],
    experience: {
      en: "2+ years hands-on experience designing enterprise-grade network architectures with segmentation, IDS/IPS deployment, and continuous monitoring.",
      fr: "2+ ans d'expérience pratique dans la conception d'architectures réseau d'entreprise avec segmentation, déploiement IDS/IPS et monitoring continu.",
    },
  },
  {
    slug: "incident-response",
    name: { en: "Incident Response", fr: "Réponse aux incidents" },
    category: "Operations",
    level: 5,
    description: {
      en: "End-to-end incident handling from detection and analysis to containment and recovery. Strong in alert triage, root cause analysis, and IR playbook development.",
      fr: "Gestion complète des incidents de la détection à la récupération. Compétences en tri d'alertes, analyse des causes racines et développement de playbooks IR.",
    },
    tools: ["Wazuh", "SIEM", "Splunk", "ELK Stack", "Wireshark", "Volatility", "Sysinternals"],
    experience: {
      en: "1.5+ years in SOC operations, handling 500+ alerts monthly with <15min average response time. Developed 5+ IR playbooks for common attack vectors.",
      fr: "1,5+ ans en opérations SOC, traitement de 500+ alertes mensuelles avec <15min de temps de réponse moyen. Développement de 5+ playbooks IR.",
    },
  },
  {
    slug: "penetration-testing",
    name: { en: "Penetration Testing", fr: "Tests d'intrusion" },
    category: "Offensive",
    level: 4,
    description: {
      en: "Comprehensive vulnerability assessment, exploitation, and post-exploitation techniques. Experience in both internal and external penetration testing engagements.",
      fr: "Évaluation complète des vulnérabilités, exploitation et techniques post-exploitation. Expérience en tests d'intrusion internes et externes.",
    },
    tools: ["Metasploit", "Burp Suite", "Nmap", "SQLmap", "Nikto", "Hydra", "Empire", "Cobalt Strike"],
    experience: {
      en: "150+ simulated attacks across web applications, networks, and systems. Proficient in OWASP Top 10 and common misconfigurations.",
      fr: "150+ attaques simulées sur applications web, réseaux et systèmes. Maîtrise du Top 10 OWASP et des mauvaises configurations courantes.",
    },
  },
  {
    slug: "system-administration",
    name: { en: "System Administration", fr: "Administration système" },
    category: "Infrastructure",
    level: 4,
    description: {
      en: "Linux and Windows system hardening, patch management, user access control, and security baseline implementation following CIS benchmarks.",
      fr: "Durcissement des systèmes Linux et Windows, gestion des correctifs, contrôle d'accès et implémentation de baselines de sécurité.",
    },
    tools: ["Linux", "Windows", "Bash", "PowerShell", "SSH", "SELinux", "AppArmor", "CIS Benchmarks"],
    experience: {
      en: "24+ production systems managed and hardened. Deep knowledge of Linux (Ubuntu, CentOS, Debian) and Windows server hardening practices.",
      fr: "24+ systèmes de production gérés et durcis. Connaissance approfondie des pratiques de durcissement Linux et Windows Server.",
    },
  },
  {
    slug: "siem-monitoring",
    name: { en: "SIEM / Monitoring", fr: "SIEM / Monitoring" },
    category: "Operations",
    level: 4,
    description: {
      en: "Centralized logging, correlation rules development, alert tuning, and dashboard design. Experience reducing false positives while maintaining high detection coverage.",
      fr: "Journalisation centralisée, développement de règles de corrélation, ajustement d'alertes et conception de tableaux de bord.",
    },
    tools: ["Wazuh", "Splunk", "ELK Stack", "Suricata", "Syslog", "Logstash", "Elasticsearch", "Kibana"],
    experience: {
      en: "Built SIEM infrastructure handling 11+ log sources, achieving <2min MTTD and 99.94% monitoring uptime.",
      fr: "Construction d'infrastructure SIEM traitant 11+ sources de logs, MTTD <2min et disponibilité monitoring 99,94%.",
    },
  },
  {
    slug: "threat-analysis",
    name: { en: "Threat Analysis", fr: "Analyse des menaces" },
    category: "Intelligence",
    level: 4,
    description: {
      en: "Threat modeling, attack vector mapping, MITRE ATT&CK framework application, and threat landscape assessment for infrastructure design.",
      fr: "Modélisation des menaces, cartographie des vecteurs d'attaque, application du framework MITRE ATT&CK et évaluation du paysage des menaces.",
    },
    tools: ["MITRE ATT&CK", "STRIDE", "Risk Assessment", "Attack Trees", "ThreatMap", "Shodan", "VirusTotal"],
    experience: {
      en: "Conducted threat modeling for 5+ projects using STRIDE methodology. Proficient in mapping attack surface and designing defense-in-depth strategies.",
      fr: "Modélisation des menaces pour 5+ projets. Cartographie experte de la surface d'attaque et conception de stratégies défense en profondeur.",
    },
  },
  {
    slug: "secure-coding",
    name: { en: "Secure Coding", fr: "Codage sécurisé" },
    category: "Development",
    level: 3,
    description: {
      en: "Secure application development practices, OWASP Top 10 prevention, input validation, secure authentication/authorization, and code review.",
      fr: "Pratiques de développement sécurisé, prévention du Top 10 OWASP, validation des entrées, authentification/autorisation sécurisée.",
    },
    tools: ["OWASP", "SAST", "DAST", "npm audit", "Semgrep", "SonarQube", "Snyk"],
    experience: {
      en: "Experience building security-first applications in React, Node.js. Implement JWT-based auth, role-based access control, and secure data handling.",
      fr: "Développement d'applications orientées sécurité en React et Node.js. Implémentation JWT, contrôle d'accès basé sur les rôles.",
    },
  },
  {
    slug: "web-technologies",
    name: { en: "Web Technologies", fr: "Technologies web" },
    category: "Development",
    level: 4,
    description: {
      en: "Full-stack web development with React, Node.js, TypeScript, and modern frameworks. Building responsive, secure web applications.",
      fr: "Développement web full-stack avec React, Node.js, TypeScript et frameworks modernes. Construction d'applications web réactives et sécurisées.",
    },
    tools: ["React", "Node.js", "TypeScript", "PostgreSQL", "MongoDB", "Tailwind CSS", "REST APIs", "GraphQL"],
    experience: {
      en: "Built 5+ production web applications. Proficient in React hooks, REST APIs, database design, and modern frontend frameworks.",
      fr: "Développement de 5+ applications web en production. Maîtrise des hooks React, APIs REST, conception de bases de données.",
    },
  },
];
