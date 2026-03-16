import styles from './MapPage.module.css';
import AttackMap from '../components/AttackMap';

const MapPage = () => {
  return (
    <div className={styles.mapPage}>
      <h1 className={styles.pageTitle}>Attack Map</h1>
      <p className={styles.pageSub}>// global origin visualization · live attack stream</p>
      <AttackMap />
    </div>
  );
};

export default MapPage;
