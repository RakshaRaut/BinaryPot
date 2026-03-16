import { useState, useEffect, useRef } from 'react';
import styles from './TerminalReplay.module.css';

const TerminalReplay = ({ session }) => {
  const [visibleLines, setVisibleLines] = useState([]);
  const [cmdIndex, setCmdIndex] = useState(0);
  const terminalRef = useRef(null);

  const fakeResponses = {
    'ls -la': 'total 52\ndrwxr-xr-x  8 root root 4096 Jan 15 03:42 .\ndrwxr-xr-x 24 root root 4096 Jan 10 09:12 ..\n-rw-r--r--  1 root root 3526 Jan 10 .bashrc\ndrwxr-xr-x  2 root root 4096 Jan 10 .ssh',
    'whoami': 'root',
    'id': 'uid=0(root) gid=0(root) groups=0(root)',
    'cat /etc/passwd': 'root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nwww-data:x:33:33:www-data:/var/www:/usr/sbin/nologin',
    'uname -a': 'Linux victim-server 5.15.0-91-generic #101-Ubuntu SMP x86_64 GNU/Linux',
    'ps aux': 'USER       PID  COMMAND\nroot         1    /sbin/init\nroot       512    /usr/sbin/sshd -D\nroot      1024    sshd: root@pts/0',
    'netstat -tulpn': 'Proto Recv-Q  Local Address  Foreign Address  State\ntcp       0   0.0.0.0:22     0.0.0.0:*        LISTEN',
  };

  useEffect(() => {
    if (!session) {
      setVisibleLines([
        { type: 'sys', text: '// Select a session above to replay attacker commands in real-time' },
        { type: 'sys', text: '// BinaryPot records every keystroke, command, and response' }
      ]);
      setCmdIndex(0);
      return;
    }

    setVisibleLines([
      { type: 'sys', text: `// Replaying session ${session.id} from ${session.ip} [${session.country.name}]` },
      { type: 'sys', text: `// User: ${session.username} · Duration: ${Math.floor(session.duration/60)}m ${session.duration%60}s · Commands: ${session.commands}` }
    ]);
    setCmdIndex(0);
  }, [session]);

  useEffect(() => {
    if (!session || cmdIndex >= session.cmdList.length) return;

    const timeout = setTimeout(() => {
      const cmd = session.cmdList[cmdIndex];
      const resp = fakeResponses[cmd] || '[LLM generated response]';
      
      setVisibleLines(prev => [
        ...prev, 
        { type: 'prompt', text: 'root@victim:~# ' },
        { type: 'cmd', text: cmd },
        { type: 'out', text: resp }
      ]);
      setCmdIndex(prev => prev + 1);
    }, 600);

    return () => clearTimeout(timeout);
  }, [cmdIndex, session]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [visibleLines]);

  return (
    <div className={styles.terminal} ref={terminalRef}>
      {visibleLines.map((line, i) => (
        <div key={i} className={styles[line.type]}>
          {line.text}
          {line.type === 'prompt' && <span className={styles.cursor}></span>}
        </div>
      ))}
      {session && cmdIndex >= session.cmdList.length && (
        <div className={styles.sys}>// Session ended</div>
      )}
    </div>
  );
};

export default TerminalReplay;
