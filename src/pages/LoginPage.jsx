import { useState } from 'react';
import { useAuth } from '../services/AuthContext';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [username, setUsername] = useState('analyst');
  const [password, setPassword] = useState('demo1234');
  const [error, setError] = useState(false);
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (!success) {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div className={styles.loginOverlay}>
      <div className={styles.loginBox}>
        <div className={styles.loginHeader}>
          <div className={styles.loginDots}>
            <span className={styles.dotR}></span>
            <span className={styles.dotY}></span>
            <span className={styles.dotG}></span>
          </div>
          <div className={styles.loginTitle}>binarypot.honeypot — /auth/login</div>
        </div>
        <div className={styles.loginBody}>
          <div className={styles.loginLogo}>
            <h1>⬡ BinaryPot</h1>
            <p>LLM-POWERED SSH HONEYPOT v1.0.0</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.loginField}>
              <label>USERNAME</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                style={error ? { borderColor: 'var(--red)' } : {}}
              />
            </div>
            <div className={styles.loginField}>
              <label>PASSWORD</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className={styles.loginHint}>// demo: analyst / demo1234</p>
            <button type="submit" className={styles.loginBtn}>AUTHENTICATE →</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
