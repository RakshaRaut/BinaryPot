import { useState, useEffect } from 'react';
import { useAuth } from '../services/AuthContext';
import { useLocation } from 'react-router-dom';
import styles from './Topbar.module.css';

const Topbar = () => {
  const { logout } = useAuth();
  const [time, setTime] = useState(new Date());
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    return path.substring(1).replace('-', ' ');
  };

  return (
    <div className={styles.topbar}>
      <div className={styles.topbarLeft}>
        <div className={styles.breadcrumb}>binarypot / <span className={styles.crumbText}>{getBreadcrumb()}</span></div>
      </div>
      <div className={styles.topbarRight}>
        <div className={styles.tbPill}>{time.toTimeString().slice(0, 8)} UTC</div>
        <button className={styles.tbBtn}>⇓ Export Logs</button>
        <button className={styles.tbBtn} onClick={logout}>⊗ Logout</button>
      </div>
    </div>
  );
};

export default Topbar;
