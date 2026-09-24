import { useState } from 'react';
import { Pause, Play } from 'lucide-react';

// Deterministic container colours so server and client markup match.
const palette = ['#c0a886', '#1d5a3f', '#c6dc9d', '#e8ecdf', '#a3653f', '#7f9a6b', '#d9c3a0', '#2f6b4c'];
const containers: { x: number; y: number; fill: string }[] = [];
for (let col = 0; col < 11; col++) {
  const tiers = [4, 4, 3, 4, 4, 3, 4, 4, 3, 3, 2][col];
  for (let tier = 0; tier < tiers; tier++) containers.push({ x: 128 + col * 38, y: 98 - tier * 21, fill: palette[(col * 3 + tier * 5) % palette.length] });
}

function Ship({ className }: { className: string }) {
  return <svg className={className} viewBox="0 0 600 200" aria-hidden="true" focusable="false">
    <g className="ship-bob">
      <g className="ship-smoke"><circle cx="72" cy="6" r="7"/><circle cx="58" cy="-4" r="9"/><circle cx="40" cy="-12" r="11"/></g>
      <rect x="62" y="12" width="22" height="30" rx="2" fill="#c6dc9d"/>
      <rect x="62" y="12" width="22" height="6" fill="#032c20"/>
      <rect x="38" y="40" width="78" height="80" rx="2" fill="#f4f6f1"/>
      <rect x="32" y="40" width="90" height="7" fill="#dfe7d6"/>
      {[52, 70, 88].map(y => <rect key={y} x="44" y={y} width="66" height="7" fill="#123e2b" opacity=".85"/>)}
      <path d="M514 76 v-40 M506 44 h16" stroke="#dfe7d6" strokeWidth="3"/>
      {containers.map((c, i) => <g key={i}><rect x={c.x} y={c.y} width="36" height="20" fill={c.fill}/><path d={`M${c.x + 9} ${c.y + 3}v14M${c.x + 18} ${c.y + 3}v14M${c.x + 27} ${c.y + 3}v14`} stroke="#032c20" strokeOpacity=".18"/></g>)}
      <path d="M8 118 H572 L598 110 L574 186 H52 Q20 186 12 150 Z" fill="#0d261c"/>
      <path d="M17 160 H588 L574 186 H52 Q26 186 17 160 Z" fill="#a8432d"/>
      <path d="M8 118 H572 L598 110 L596 116 H10 Z" fill="#c6dc9d"/>
      <text x="300" y="146" fill="#f4f6f1" fontSize="15" fontFamily="Manrope, sans-serif" fontWeight="700" letterSpacing="4" textAnchor="middle">VEE NEXUS</text>
    </g>
    <path className="ship-bow-wave" d="M560 172 q20 -6 36 -2 q-14 10 -40 12 Z" fill="#f4f6f1"/>
  </svg>;
}

const wave = (y: number, amp: number) => {
  let d = `M0 ${y}`;
  for (let x = 0; x < 3200; x += 200) d += ` q50 ${-amp} 100 0 t100 0`;
  return d + ` V420 H0 Z`;
};

export default function ShipScene() {
  const [paused, setPaused] = useState(false);
  return <div className={`ship-scene${paused ? ' is-paused' : ''}`}>
    <div className="ocean">
      <svg className="wave wave-far" viewBox="0 0 3200 420" preserveAspectRatio="none" aria-hidden="true"><path d={wave(40, 10)}/></svg>
      <Ship className="ship ship-distant"/>
      <svg className="wave wave-mid" viewBox="0 0 3200 420" preserveAspectRatio="none" aria-hidden="true"><path d={wave(70, 14)}/></svg>
      <div className="ship-track"><Ship className="ship ship-main"/><span className="ship-wake"/></div>
      <svg className="wave wave-near" viewBox="0 0 3200 420" preserveAspectRatio="none" aria-hidden="true"><path d={wave(118, 16)}/></svg>
      <svg className="wave wave-front" viewBox="0 0 3200 420" preserveAspectRatio="none" aria-hidden="true"><path d={wave(170, 12)}/></svg>
    </div>
    <div className="scene-controls ship-controls"><button onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? <Play size={14}/> : <Pause size={14}/>}{paused ? 'Play motion' : 'Pause motion'}</button></div>
  </div>;
}
