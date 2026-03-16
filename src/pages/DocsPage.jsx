import styles from './DocsPage.module.css';

const DocsPage = () => {
  return (
    <div className={styles.docsPage}>
      <h1 className={styles.pageTitle}>Documentation</h1>
      <p className={styles.pageSub}>// setup guide · API reference · architecture</p>
      
      <div className={styles.toolGrid}>
        <div className={styles.toolCard} style={{ gridColumn: '1/-1' }}>
          <div className={styles.toolTitle}>⚡ Quick Start</div>
          <div className={styles.terminal}>
            <span className={styles.tComment}># Clone and install</span><br />
            <span className={styles.tPrompt}>$ </span><span className={styles.tCmd}>git clone https://github.com/yourorg/binarypot.git &amp;&amp; cd binarypot</span><br />
            <span className={styles.tPrompt}>$ </span><span className={styles.tCmd}>pip install -r requirements.txt</span><br /><br />
            <span className={styles.tComment}># Start the honeypot</span><br />
            <span className={styles.tPrompt}>$ </span><span className={styles.tCmd}>python binarypot.py --port 22</span><br />
            <span className={styles.tSys}>✓ SSH honeypot listening on 0.0.0.0:22</span><br />
            <span className={styles.tSys}>✓ FastAPI dashboard at http://localhost:8000</span>
          </div>
        </div>

        <div className={styles.toolCard}>
          <div className={styles.toolTitle}>🔌 API Endpoints</div>
          <div className={styles.apiList}>
            <div><span>GET</span> /api/sessions</div>
            <div><span>GET</span> /api/stats</div>
            <div><span>WS</span> /ws/live</div>
          </div>
        </div>

        <div className={styles.toolCard}>
          <div className={styles.toolTitle}>🏗 Architecture</div>
          <div className={styles.terminal} style={{ fontSize: '10px' }}>
            Attacker SSH Client → AsyncSSH Listener → LLM Terminal Engine → FastAPI Backend → React Dashboard
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
