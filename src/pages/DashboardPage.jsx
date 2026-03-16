import { useState, useEffect, useMemo } from 'react';
import styles from './DashboardPage.module.css';
import StatCard from '../components/StatCard';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  ArcElement,
  Title, 
  Tooltip, 
  Legend, 
  Filler 
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { randInt, COUNTRIES, generateSessions } from '../services/mockData';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  ArcElement,
  Title, 
  Tooltip, 
  Legend, 
  Filler
);

const DashboardPage = () => {
  const [sessionsCount, setSessionsCount] = useState(2847);
  const [cmdsCount, setCmdsCount] = useState(18492);
  const [filter, setFilter] = useState('');
  
  const allSessions = useMemo(() => generateSessions(50), []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSessionsCount(prev => prev + randInt(0, 1));
      setCmdsCount(prev => prev + randInt(1, 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const lineOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#4a5568', font: { family: 'IBM Plex Mono', size: 9 }, maxTicksLimit: 8 } },
      y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#4a5568', font: { family: 'IBM Plex Mono', size: 9 } } }
    }
  };

  const hours = Array.from({length:24}, (_,i) => `${String(i).padStart(2,'0')}:00`);
  const attackData = {
    labels: hours,
    datasets: [{
      label: 'Attacks',
      data: hours.map(() => randInt(10, 180)),
      borderColor: '#00d4ff',
      backgroundColor: 'rgba(0,212,255,0.06)',
      borderWidth: 1.5,
      fill: true,
      tension: 0.4,
      pointRadius: 0,
    }]
  };

  const countryData = {
    labels: COUNTRIES.slice(0,8).map(c => c.flag + ' ' + c.code),
    datasets: [{
      data: COUNTRIES.slice(0,8).map(c => c.count),
      backgroundColor: ['#ef4444','#f59e0b','#00d4ff','#10b981','#8b5cf6','#ec4899','#06b6d4','#84cc16'],
      borderWidth: 0, borderRadius: 2,
    }]
  };

  const cmdNames = ['ls', 'whoami', 'cat /etc/passwd', 'wget', 'curl', 'uname', 'id', 'ps aux'];
  const cmdData = {
    labels: cmdNames,
    datasets: [{
      data: [892, 743, 681, 534, 487, 412, 389, 341],
      backgroundColor: 'rgba(0,212,255,0.2)', borderColor: '#00d4ff', borderWidth: 1, borderRadius: 2,
    }]
  };

  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const loginTrendData = {
    labels: days,
    datasets: [
      { label: 'Successful', data: days.map(() => randInt(80,200)), borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.08)', fill: true, tension: 0.4, borderWidth: 1.5, pointRadius: 3, pointBackgroundColor: '#10b981' },
      { label: 'Failed', data: days.map(() => randInt(200,600)), borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.06)', fill: true, tension: 0.4, borderWidth: 1.5, pointRadius: 3, pointBackgroundColor: '#ef4444' }
    ]
  };

  const filteredSessions = allSessions.filter(s => 
    s.ip.includes(filter) || s.country.name.toLowerCase().includes(filter.toLowerCase())
  ).slice(0, 15);

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.pageTitle}>Live Dashboard</h1>
      <p className={styles.pageSub}>// real-time threat intelligence · updates every 5s</p>

      <div className={styles.statGrid}>
        <StatCard label="TOTAL SESSIONS" value={sessionsCount.toLocaleString()} change="↑ +12 today" colorClass="cyan" />
        <StatCard label="SUCCESSFUL LOGINS" value="1,203" change="↑ +8 / hour" colorClass="green" />
        <StatCard label="FAILED LOGINS" value="1,644" change="↑ +23 / hour" colorClass="red" />
        <StatCard label="COMMANDS EXECUTED" value={cmdsCount.toLocaleString()} change="↑ +147 today" colorClass="amber" />
        <StatCard label="UNIQUE COUNTRIES" value="34" change="Active sources" />
      </div>

      <div className={styles.chartGrid}>
        <div className={styles.chartCard}>
          <div className={styles.chartHead}>
            <div className={styles.chartTitle}>ATTACKS PER HOUR</div>
            <div className={`${styles.chartBadge} ${styles.live}`}>LIVE</div>
          </div>
          <div className={styles.chartWrapper}><Line options={lineOptions} data={attackData} /></div>
        </div>
        <div className={styles.chartCard}>
          <div className={styles.chartHead}>
            <div className={styles.chartTitle}>ATTACKERS BY COUNTRY</div>
            <div className={`${styles.chartBadge} ${styles.top8}`}>TOP 8</div>
          </div>
          <div className={styles.chartWrapper}>
            <Doughnut 
              data={countryData} 
              options={{
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'right', labels: { color: '#8892a4', font: { family: 'IBM Plex Mono', size: 10 }, boxWidth: 10, padding: 8 } } }
              }} 
            />
          </div>
        </div>
      </div>

      <div className={styles.chartRow}>
        <div className={styles.chartCard}>
          <div className={styles.chartHead}><div className={styles.chartTitle}>COMMAND FREQUENCY</div></div>
          <div className={styles.chartWrapper}><Bar options={lineOptions} data={cmdData} /></div>
        </div>
        <div className={styles.chartCard}>
          <div className={styles.chartHead}><div className={styles.chartTitle}>LOGIN ATTEMPTS OVER TIME</div></div>
          <div className={styles.chartWrapper}>
            <Line 
              data={loginTrendData} 
              options={{
                ...lineOptions,
                plugins: { legend: { labels: { color: '#8892a4', font: { family: 'IBM Plex Mono', size: 10 }, boxWidth: 10 } } }
              }} 
            />
          </div>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHeadRow}>
          <div className={styles.chartTitle}>ATTACKER DETAILS</div>
          <div className={styles.tableSearch}>
            <span style={{ color:'var(--text3)', fontFamily:'var(--mono)', fontSize:'11px' }}>⌕</span>
            <input 
              type="text" 
              placeholder="filter by IP or country..." 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>IP ADDRESS</th><th>COUNTRY</th><th>USERNAME</th>
                <th>COMMANDS</th><th>SESSION DURATION</th><th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredSessions.map(s => (
                <tr key={s.id}>
                  <td><span className={styles.ipLink}>{s.ip}</span></td>
                  <td>{s.country.flag} {s.country.name}</td>
                  <td style={{ color:'var(--amber)' }}>{s.username}</td>
                  <td style={{ color:'var(--cyan)' }}>{s.commands}</td>
                  <td>{Math.floor(s.duration/60)}m {s.duration%60}s</td>
                  <td>
                    <span className={`${styles.badge} ${s.status==='ACTIVE' ? styles.badgeGreen : styles.badgeRed}`}>
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
