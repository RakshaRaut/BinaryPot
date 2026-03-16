import styles from './Layout.module.css';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className={styles.appWrapper}>
      <Sidebar />
      <main className={styles.mainContent}>
        <Topbar />
        <div className={styles.pageContainer}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
