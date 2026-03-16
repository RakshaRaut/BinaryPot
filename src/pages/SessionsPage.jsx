import { useState, useMemo } from 'react';
import styles from './SessionsPage.module.css';
import TerminalReplay from '../components/TerminalReplay';
import { generateSessions } from '../services/mockData';

const SessionsPage = () => {
  const allSessions = useMemo(() => generateSessions(40), []);
  const [selectedSession, setSelectedSession] = useState(null);
  const [filter, setFilter] = useState('');

  const filtered = allSessions.filter(s => s.ip.includes(filter));

  return (
    <div className={styles.sessionsPage}>
      <h1 className={styles.pageTitle}>Sessions & Logs Browser</h1>
      <p className={styles.pageSub}>// click any session to replay terminal commands</p>
      
      <div className={styles.filterRow}>
        <input 
          className={styles.filterInput} 
          type="text" 
          placeholder="Filter by attacker IP..." 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <select className={styles.filterSelect}>
          <option>All Usernames</option>
          {/* ... */}
        </select>
        <button className={styles.filterBtn}>⇓ Export CSV</button>
        <button className={styles.filterBtn}>⇓ Export JSON</button>
      </div>

      <div className={styles.tableCard}>
        <div style={{ overflowX: 'auto' }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>SESSION ID</th><th>IP ADDRESS</th><th>USERNAME</th>
                <th>START TIME</th><th>DURATION</th><th>COMMANDS</th><th>STATUS</th><th>REPLAY</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id}>
                  <td style={{ color: 'var(--cyan)' }}>{s.id}</td>
                  <td>{s.ip}</td>
                  <td style={{ color: 'var(--amber)' }}>{s.username}</td>
                  <td style={{ color: 'var(--text3)', fontSize: '11px' }}>{s.start}</td>
                  <td>{Math.floor(s.duration/60)}m {s.duration%60}s</td>
                  <td>{s.commands}</td>
                  <td>
                    <span className={`${styles.badge} ${s.status === 'ACTIVE' ? styles.badgeGreen : styles.badgeRed}`}>
                      {s.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className={styles.filterBtn} 
                      style={{ padding: '4px 10px', fontSize: '10px' }}
                      onClick={() => setSelectedSession(s)}
                    >
                      ▶ REPLAY
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.chartCard}>
        <div className={styles.chartHead}>
          <div className={styles.chartTitle}>TERMINAL REPLAY</div>
          <div className={styles.chartBadge}>
            {selectedSession ? `${selectedSession.id} · ${selectedSession.ip}` : 'SELECT A SESSION ABOVE'}
          </div>
        </div>
        <TerminalReplay session={selectedSession} />
      </div>
    </div>
  );
};

export default SessionsPage;
