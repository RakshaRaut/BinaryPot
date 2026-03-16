import { useRef, useEffect, useState } from 'react';
import styles from './AttackMap.module.css';
import { COUNTRIES, randInt } from '../services/mockData';

const AttackMap = () => {
  const canvasRef = useRef(null);
  const [attackCount, setAttackCount] = useState(0);
  const [attackRate, setAttackRate] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const progresses = COUNTRIES.map(() => Math.random());
    const TARGET = { x: 0.52, y: 0.3 }; // Apprx Europe location for target

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const latLngToXY = (lat, lng) => ({
      x: (lng + 180) / 360 * canvas.width,
      y: (90 - lat) / 180 * canvas.height
    });

    const targetPos = latLngToXY(35, -10); // Europe target

    const drawWorld = () => {
      ctx.fillStyle = '#0a0f1e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(0,212,255,0.05)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 12; i++) {
        const x = (i/12) * canvas.width;
        ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let i = 0; i < 6; i++) {
        const y = (i/6) * canvas.height;
        ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      ctx.fillStyle = '#141c30';
      // Basic shapes for continents
      ctx.beginPath(); ctx.ellipse(canvas.width*0.2, canvas.height*0.35, canvas.width*0.1, canvas.height*0.22, 0, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(canvas.width*0.27, canvas.height*0.65, canvas.width*0.06, canvas.height*0.2, 0, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(canvas.width*0.52, canvas.height*0.3, canvas.width*0.05, canvas.height*0.1, 0, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(canvas.width*0.53, canvas.height*0.6, canvas.width*0.07, canvas.height*0.2, 0, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(canvas.width*0.73, canvas.height*0.33, canvas.width*0.16, canvas.height*0.2, 0, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(canvas.width*0.8, canvas.height*0.68, canvas.width*0.06, canvas.height*0.1, 0, 0, Math.PI*2); ctx.fill();
    };

    const drawAttackPoint = (pos, intensity, progress) => {
      const colors = { high:'#ef4444', med:'#f59e0b', low:'#00d4ff' };
      const c = intensity > 200 ? 'high' : intensity > 80 ? 'med' : 'low';
      const color = colors[c];
      const size = intensity > 200 ? 8 : intensity > 80 ? 5 : 3;

      ctx.beginPath();
      ctx.arc(pos.x, pos.y, size + Math.sin(Date.now()/500 + intensity)*2, 0, Math.PI*2);
      ctx.fillStyle = color + '33';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, size, 0, Math.PI*2);
      ctx.fillStyle = color;
      ctx.fill();

      const t = progress;
      const cx = (pos.x + targetPos.x) / 2 - (targetPos.y - pos.y) * 0.3;
      const cy = (pos.y + targetPos.y) / 2 + (targetPos.x - pos.x) * 0.3;
      const px = (1-t)*(1-t)*pos.x + 2*(1-t)*t*cx + t*t*targetPos.x;
      const py = (1-t)*(1-t)*pos.y + 2*(1-t)*t*cy + t*t*targetPos.y;

      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      ctx.quadraticCurveTo(cx, cy, targetPos.x, targetPos.y);
      ctx.strokeStyle = color + '22';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(px, py, 2.5, 0, Math.PI*2);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const drawTarget = () => {
      ctx.beginPath();
      ctx.arc(targetPos.x, targetPos.y, 10, 0, Math.PI*2);
      ctx.fillStyle = '#10b981';
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.shadowBlur = 0;

      const pulse = Math.sin(Date.now()/400) * 0.5 + 0.5;
      ctx.beginPath();
      ctx.arc(targetPos.x, targetPos.y, 20 + pulse * 10, 0, Math.PI*2);
      ctx.strokeStyle = 'rgba(16,185,129,' + (0.2 + pulse * 0.3) + ')';
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0,0, canvas.width, canvas.height);
      drawWorld();
      COUNTRIES.forEach((country, i) => {
        progresses[i] = (progresses[i] + 0.003 + Math.random()*0.002) % 1;
        const pos = latLngToXY(country.lat, country.lng);
        drawAttackPoint(pos, country.count, progresses[i]);
      });
      drawTarget();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const interval = setInterval(() => {
      setAttackCount(prev => prev + randInt(1, 5));
      setAttackRate(randInt(2, 8));
    }, 1000);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.mapContainer}>
      <canvas ref={canvasRef} className={styles.mapCanvas}></canvas>
      <div className={styles.mapOverlay}>
        <div className={styles.mapCounter}>
          <div className={styles.mapCounterVal}>{attackCount.toLocaleString()}</div>
          <div className={styles.mapCounterLabel}>ATTACKS TRACKED</div>
        </div>
        <div className={styles.mapLegend}>
          <div className={styles.mapLegendItem}><div className={styles.mapDot} style={{ background:'#ef4444', boxShadow:'0 0 6px #ef4444' }}></div> High Intensity (50+)</div>
          <div className={styles.mapLegendItem}><div className={styles.mapDot} style={{ background:'#f59e0b', boxShadow:'0 0 6px #f59e0b' }}></div> Medium (10-50)</div>
          <div className={styles.mapLegendItem}><div className={styles.mapDot} style={{ background:'#00d4ff', boxShadow:'0 0 6px #00d4ff' }}></div> Low (&lt;10)</div>
          <div className={styles.mapLegendItem}><div className={styles.mapDot} style={{ background:'var(--green)', boxShadow:'0 0 6px var(--green)' }}></div> Target Server</div>
        </div>
      </div>
      <div className={styles.metricsBar}>
        <div className={styles.metCard}><div className={styles.metLabel}>TOP SOURCE</div><div className={styles.metVal} style={{ color:'var(--cyan)' }}>CN</div><div className={styles.metChange}>China · 482 attacks</div></div>
        <div className={styles.metCard}><div className={styles.metLabel}>ATTACKS / MIN</div><div className={styles.metVal} style={{ color:'var(--green)' }}>{attackRate}</div><div className={styles.metChange}>↑ accelerating</div></div>
        <div className={styles.metCard}><div className={styles.metLabel}>ACTIVE IPs</div><div className={styles.metVal} style={{ color:'var(--amber)' }}>247</div><div className={styles.metChange}>Unique sources</div></div>
        <div className={styles.metCard}><div className={styles.metLabel}>TARGETED PORT</div><div className={styles.metVal}>22</div><div className={styles.metChange}>SSH only</div></div>
      </div>
    </div>
  );
};

export default AttackMap;
