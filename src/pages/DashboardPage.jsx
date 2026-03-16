import { useState, useEffect } from 'react';
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
import { randInt } from '../services/mockData';

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
  const [sessions, setSessions] = useState(2847);
  const [cmds, setCmds] = useState(18492);

  useEffect(() => {
    const interval = setInterval(() => {
      setSessions(prev => prev + randInt(0, 1));
      setCmds(prev => prev + randInt(1, 5));
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

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.pageTitle}>Live Dashboard</h1>
      <p className={styles.pageSub}>// real-time threat intelligence · updates every 5s</p>

      <div className={styles.statGrid}>
        <StatCard label="TOTAL SESSIONS" value={sessions.toLocaleString()} change="↑ +12 today" colorClass="cyan" />
        <StatCard label="SUCCESSFUL LOGINS" value="1,203" change="↑ +8 / hour" colorClass="green" />
        <StatCard label="FAILED LOGINS" value="1,644" change="↑ +23 / hour" colorClass="red" />
        <StatCard label="COMMANDS EXECUTED" value={cmds.toLocaleString()} change="↑ +147 today" colorClass="amber" />
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
            {/* TODO: Doughnut Chart */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
