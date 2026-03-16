import styles from './PortalPage.module.css';
import HeroTerminal from '../components/HeroTerminal';
import { Link } from 'react-router-dom';

const PortalPage = () => {
  return (
    <div className={styles.portal}>
      <div className={styles.landingHero}>
        <div className={styles.heroText}>
          <h1>Binary<span>Pot</span></h1>
          <p>An interactive SSH honeypot powered by LLMs. Captures attacker behavior with a realistic simulated Linux terminal — keeping attackers engaged longer for richer threat intelligence.</p>
          <div className={styles.heroCta}>
            <Link to="/dashboard" className={styles.btnPrimary}>→ Live Dashboard</Link>
            <Link to="/map" className={styles.btnSecondary}>Attack Map</Link>
            <Link to="/docs" className={styles.btnSecondary}>Docs</Link>
          </div>
        </div>
        <HeroTerminal />
      </div>

      <div className={styles.sectionLabel}>// quick access</div>
      <div className={styles.navHub}>
        <HubCard 
          to="/dashboard" icon="▥" title="Live Dashboard" 
          desc="Real-time Kibana-style metrics, charts, and attacker tables" 
        />
        <HubCard 
          to="/map" icon="◎" title="Attack Map" 
          desc="Live global visualization of attack origins and patterns" 
        />
        <HubCard 
          to="/sessions" icon="≡" title="Sessions Browser" 
          desc="Browse, filter, and replay attacker terminal sessions" 
        />
        <HubCard 
          to="/research" icon="⚗" title="Research Tools" 
          desc="IP intel, payload decoder, LLM-powered command analyzer" 
        />
        <HubCard 
          to="/docs" icon="◫" title="Documentation" 
          desc="Setup, API reference, architecture diagrams, and guides" 
        />
        <div className={`${styles.hubCard} ${styles.hubStatus}`}>
          <div className={styles.hubArrow} style={{ color: 'var(--green)' }}>●</div>
          <div className={styles.hubIcon}>⬡</div>
          <div className={styles.hubTitle}>System Status</div>
          <div className={styles.hubDesc}>All services operational · LLM engine online · SSH listener active</div>
        </div>
      </div>
    </div>
  );
};

const HubCard = ({ to, icon, title, desc }) => (
  <Link to={to} className={styles.hubCard}>
    <div className={styles.hubArrow}>→</div>
    <div className={styles.hubIcon}>{icon}</div>
    <div className={styles.hubTitle}>{title}</div>
    <div className={styles.hubDesc}>{desc}</div>
  </Link>
);

export default PortalPage;
