import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <nav className={styles.sidebar}>
      <div className={styles.sidebarLogo}>
        <div className={styles.logoIcon}>⬡</div>
        <div>
          <div className={styles.logoText}>BinaryPot</div>
          <span className={styles.logoVer}>SSH HONEYPOT v1.0</span>
        </div>
      </div>
      <div className={styles.sidebarStatus}>
        <div className={styles.statusDot}></div>
        <span>LISTENING · port 22</span>
      </div>
      <div className={styles.sidebarNav}>
        <div className={styles.navSection}>Main</div>
        <NavLink to="/" className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem} end>
          <span className={styles.navIcon}>⊞</span>Portal Home
        </NavLink>
        
        <div className={styles.navSection}>Monitor</div>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}>
          <span className={styles.navIcon}>▥</span>Live Dashboard
        </NavLink>
        <NavLink to="/map" className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}>
          <span className={styles.navIcon}>◎</span>Attack Map
        </NavLink>
        <NavLink to="/sessions" className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}>
          <span className={styles.navIcon}>≡</span>Sessions & Logs
        </NavLink>
        
        <div className={styles.navSection}>Analyze</div>
        <NavLink to="/research" className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}>
          <span className={styles.navIcon}>⚗</span>Research Tools
        </NavLink>
        <NavLink to="/docs" className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}>
          <span className={styles.navIcon}>◫</span>Documentation
        </NavLink>
      </div>
      <div className={styles.sidebarFooter}>
        <div className={styles.sshPort}>SSH LISTENER: <span>0.0.0.0:22</span></div>
        <div className={styles.sshPort} style={{ marginTop: '3px' }}>API: <span>localhost:8000</span></div>
      </div>
    </nav>
  );
};

export default Sidebar;
