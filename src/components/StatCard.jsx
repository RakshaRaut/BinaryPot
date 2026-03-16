import styles from './StatCard.module.css';

const StatCard = ({ label, value, change, colorClass }) => {
  return (
    <div className={styles.statCard}>
      <div className={styles.statLabel}>{label}</div>
      <div className={`${styles.statVal} ${styles[colorClass]}`}>{value}</div>
      {change && (
        <div className={`${styles.statChange} ${change.startsWith('↑') ? styles.up : ''}`}>
          {change}
        </div>
      )}
    </div>
  );
};

export default StatCard;
