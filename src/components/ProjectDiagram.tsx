import { motion } from "framer-motion";

type Props = { kind: "infra" | "killchain" | "network" | "rbac" | "dataflow" };

const STROKE = "oklch(0.65 0.24 8)";
const DIM = "oklch(0.4 0.01 270)";
const TEXT = "oklch(0.95 0.005 270)";
const MUTED = "oklch(0.62 0.01 270)";

function Box({ x, y, w, h, label, sub, accent, delay = 0 }: {
  x: number; y: number; w: number; h: number; label: string; sub?: string; accent?: boolean; delay?: number;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
    >
      <rect x={x} y={y} width={w} height={h} rx={6}
        fill="oklch(0.16 0.006 270)"
        stroke={accent ? STROKE : DIM}
        strokeWidth={1.2} />
      <text x={x + w / 2} y={y + h / 2 - (sub ? 4 : 0)} textAnchor="middle"
        fontFamily="JetBrains Mono, monospace" fontSize="11" fontWeight="700"
        fill={accent ? STROKE : TEXT}>
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle"
          fontFamily="JetBrains Mono, monospace" fontSize="9" fill={MUTED}>
          {sub}
        </text>
      )}
    </motion.g>
  );
}

function Line({ x1, y1, x2, y2, dashed, delay = 0, label }: {
  x1: number; y1: number; x2: number; y2: number; dashed?: boolean; delay?: number; label?: string;
}) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <motion.line x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={STROKE} strokeWidth={1.2}
        strokeDasharray={dashed ? "4 4" : undefined}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay, duration: 0.7 }} />
      {label && (
        <text x={mx} y={my - 6} textAnchor="middle"
          fontFamily="JetBrains Mono, monospace" fontSize="9" fill={MUTED}>
          {label}
        </text>
      )}
    </motion.g>
  );
}

export function ProjectDiagram({ kind }: Props) {
  const W = 720, H = 420;
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-[oklch(0.10_0.005_270)] p-4">
      <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        <span>// architecture.svg</span>
        <span className="text-primary">● live</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img">
        {/* grid */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="oklch(0.22 0.01 270)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#grid)" />

        {kind === "infra" && (
          <>
            <Box x={20} y={20} w={140} h={50} label="INTERNET" sub="WAN" delay={0} />
            <Line x1={90} y1={70} x2={360} y2={120} delay={0.3} label="HTTPS" />
            <Box x={290} y={120} w={140} h={50} label="pfSense FW" sub="IDS / Suricata" accent delay={0.4} />

            <Line x1={360} y1={170} x2={170} y2={230} delay={0.7} />
            <Line x1={360} y1={170} x2={360} y2={230} delay={0.8} />
            <Line x1={360} y1={170} x2={560} y2={230} delay={0.9} />

            <Box x={100} y={230} w={140} h={50} label="DMZ" sub="Nginx · Web" delay={1.0} />
            <Box x={290} y={230} w={140} h={50} label="LAN" sub="MariaDB · MySQL" delay={1.1} />
            <Box x={490} y={230} w={140} h={50} label="MGMT" sub="Wazuh · Zabbix" accent delay={1.2} />

            <Line x1={170} y1={280} x2={560} y2={340} dashed delay={1.5} label="syslog" />
            <Line x1={360} y1={280} x2={560} y2={340} dashed delay={1.6} />
            <Box x={490} y={340} w={140} h={50} label="SIEM" sub="alerts → SOC" accent delay={1.7} />
          </>
        )}

        {kind === "killchain" && (
          <>
            {[
              ["Recon", "nmap · OSINT"],
              ["Weaponize", "msfvenom"],
              ["Deliver", "phish / exploit"],
              ["Exploit", "SQLi → upload"],
              ["Install", "reverse shell"],
              ["C2", "Meterpreter"],
              ["Action", "exfil / pivot"],
            ].map(([l, s], i) => (
              <Box key={i} x={20 + (i % 4) * 175} y={i < 4 ? 40 : 220} w={155} h={60}
                label={l as string} sub={s as string} accent={i === 3 || i === 5} delay={i * 0.12} />
            ))}
            {[0, 1, 2].map((i) => (
              <Line key={`a${i}`} x1={175 + i * 175} y1={70} x2={195 + i * 175} y2={70} delay={0.6 + i * 0.1} />
            ))}
            <Line x1={680} y1={100} x2={680} y2={220} dashed delay={1.0} />
            <Line x1={680} y1={250} x2={195} y2={250} dashed delay={1.1} label="lateral" />
            {[0, 1, 2].map((i) => (
              <Line key={`b${i}`} x1={175 + i * 175} y1={250} x2={195 + i * 175} y2={250} delay={1.2 + i * 0.1} />
            ))}
            <text x={360} y={350} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fill={STROKE}>
              ↓ DETECTION LAYER ↓
            </text>
            <Box x={120} y={360} w={480} h={40} label="Suricata + Wazuh + custom signatures" accent delay={1.8} />
          </>
        )}

        {kind === "network" && (
          <>
            <Box x={290} y={20} w={140} h={50} label="WAN" sub="ISP gateway" delay={0} />
            <Line x1={360} y1={70} x2={360} y2={110} delay={0.3} />
            <Box x={260} y={110} w={200} h={60} label="pfSense" sub="firewall · IDS · captive" accent delay={0.4} />
            {[
              ["MGMT", 30, 220],
              ["LAN", 175, 220],
              ["IoT", 320, 220],
              ["GUEST", 465, 220],
              ["DMZ", 580, 220],
            ].map(([l, x, y], i) => (
              <g key={i}>
                <Line x1={360} y1={170} x2={(x as number) + 60} y2={y as number} delay={0.7 + i * 0.1} />
                <Box x={x as number} y={y as number} w={120} h={50} label={l as string} sub={`VLAN ${10 + i * 10}`} delay={0.8 + i * 0.1} />
              </g>
            ))}
            <Box x={260} y={330} w={200} h={50} label="RADIUS + OpenVPN" sub="identity layer" accent delay={1.5} />
            <Line x1={360} y1={270} x2={360} y2={330} dashed delay={1.6} label="auth" />
          </>
        )}

        {kind === "rbac" && (
          <>
            <Box x={20} y={40} w={130} h={50} label="ADMIN" accent delay={0} />
            <Box x={20} y={120} w={130} h={50} label="TEACHER" delay={0.1} />
            <Box x={20} y={200} w={130} h={50} label="STUDENT" delay={0.2} />
            <Box x={20} y={280} w={130} h={50} label="GUEST" delay={0.3} />
            <Box x={250} y={150} w={180} h={70} label="JWT + RBAC" sub="middleware guard" accent delay={0.6} />
            {[40, 120, 200, 280].map((y, i) => (
              <Line key={i} x1={150} y1={y + 25} x2={250} y2={185} delay={0.8 + i * 0.05} />
            ))}
            <Line x1={430} y1={185} x2={520} y2={120} delay={1.2} label="allow" />
            <Line x1={430} y1={185} x2={520} y2={200} delay={1.25} />
            <Line x1={430} y1={185} x2={520} y2={280} dashed delay={1.3} label="deny" />
            <Box x={520} y={90} w={170} h={50} label="API · Grades" delay={1.4} />
            <Box x={520} y={170} w={170} h={50} label="API · Schedule" delay={1.45} />
            <Box x={520} y={250} w={170} h={50} label="API · Admin" accent delay={1.5} />
            <Box x={250} y={330} w={180} h={50} label="Audit Log" sub="append-only" delay={1.7} />
            <Line x1={340} y1={220} x2={340} y2={330} dashed delay={1.8} />
          </>
        )}

        {kind === "dataflow" && (
          <>
            <Box x={20} y={170} w={130} h={60} label="USER" sub="manual + CSV" delay={0} />
            <Line x1={150} y1={200} x2={210} y2={200} delay={0.3} label="ingest" />
            <Box x={210} y={170} w={150} h={60} label="API" sub="Node.js" accent delay={0.4} />
            <Line x1={360} y1={200} x2={420} y2={120} delay={0.6} />
            <Line x1={360} y1={200} x2={420} y2={200} delay={0.65} />
            <Line x1={360} y1={200} x2={420} y2={280} delay={0.7} />
            <Box x={420} y={90} w={150} h={60} label="MongoDB" sub="encrypted" delay={0.8} />
            <Box x={420} y={170} w={150} h={60} label="Aggregator" sub="pipelines" accent delay={0.85} />
            <Box x={420} y={250} w={150} h={60} label="Alert Engine" sub="thresholds" delay={0.9} />
            <Line x1={570} y1={200} x2={620} y2={200} delay={1.1} />
            <Box x={620} y={170} w={80} h={60} label="UI" sub="charts" accent delay={1.2} />
            <Line x1={570} y1={280} x2={620} y2={340} dashed delay={1.3} />
            <Box x={560} y={340} w={140} h={50} label="Email + In-app" delay={1.4} />
          </>
        )}
      </svg>
    </div>
  );
}
