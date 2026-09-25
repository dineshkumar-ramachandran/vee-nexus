import { useState } from 'react';
import { Pause, Play, Ship as ShipIcon, Truck } from 'lucide-react';

// Deterministic container colours so server and client markup match.
const palette = ['#c0a886', '#1d5a3f', '#c6dc9d', '#e8ecdf', '#a3653f', '#7f9a6b', '#d9c3a0', '#2f6b4c'];
const containers: { x: number; y: number; fill: string }[] = [];
for (let col = 0; col < 11; col++) {
  const tiers = [4, 4, 3, 4, 4, 3, 4, 4, 3, 3, 2][col];
  for (let tier = 0; tier < tiers; tier++) containers.push({ x: 128 + col * 38, y: 98 - tier * 21, fill: palette[(col * 3 + tier * 5) % palette.length] });
}

function IndianFlag({ x, y, w = 26 }: { x: number; y: number; w?: number }) {
  const h = w * 2 / 3;
  return <g className="flag-wave" transform={`translate(${x} ${y})`}>
    <rect width={w} height={h / 3} fill="#ff9933"/>
    <rect y={h / 3} width={w} height={h / 3} fill="#ffffff"/>
    <rect y={h * 2 / 3} width={w} height={h / 3} fill="#138808"/>
    <circle cx={w / 2} cy={h / 2} r={h / 7} fill="none" stroke="#000080" strokeWidth={w / 26}/>
  </g>;
}

function Ship({ className }: { className: string }) {
  return <svg className={className} viewBox="0 0 600 200" aria-hidden="true" focusable="false">
    <g className="ship-bob">
      <g className="ship-smoke"><circle cx="72" cy="6" r="7"/><circle cx="58" cy="-4" r="9"/><circle cx="40" cy="-12" r="11"/></g>
      <path d="M18 118 V60" stroke="#dfe7d6" strokeWidth="2.5"/>
      <IndianFlag x={19} y={60}/>
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
      <text x="310" y="145" fill="#f4f6f1" fontSize="12.5" fontFamily="Manrope, sans-serif" fontWeight="700" letterSpacing="2.4" textAnchor="middle">VEE NEXUS GLOBAL RESOURCE</text>
    </g>
    <path className="ship-bow-wave" d="M560 172 q20 -6 36 -2 q-14 10 -40 12 Z" fill="#f4f6f1"/>
  </svg>;
}

const wave = (y: number, amp: number) => {
  let d = `M0 ${y}`;
  for (let x = 0; x < 3200; x += 200) d += ` q50 ${-amp} 100 0 t100 0`;
  return d + ` V420 H0 Z`;
};

function Ocean() {
  return <div className="ocean">
    <svg className="wave wave-far" viewBox="0 0 3200 420" preserveAspectRatio="none" aria-hidden="true"><path d={wave(40, 10)}/></svg>
    <Ship className="ship ship-distant"/>
    <svg className="wave wave-mid" viewBox="0 0 3200 420" preserveAspectRatio="none" aria-hidden="true"><path d={wave(70, 14)}/></svg>
    <div className="ship-track"><Ship className="ship ship-main"/><span className="ship-wake"/></div>
    <svg className="wave wave-near" viewBox="0 0 3200 420" preserveAspectRatio="none" aria-hidden="true"><path d={wave(118, 16)}/></svg>
    <svg className="wave wave-front" viewBox="0 0 3200 420" preserveAspectRatio="none" aria-hidden="true"><path d={wave(170, 12)}/></svg>
  </div>;
}

const stages = ['Container loading', 'Port dispatch', 'Truck transportation', 'Paper mill delivery'];

function LandRoute() {
  return <div className="land">
    <ol className="land-stages" aria-label="Port to paper mill route">{stages.map((s, i) => <li key={s} className={'stage-' + i}><span>0{i + 1}</span>{s}</li>)}</ol>
    <svg className="land-art" viewBox="0 40 1600 320" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false">
      <rect x="-4000" y="300" width="9600" height="120" fill="#032c20"/>
      <rect x="-4000" y="316" width="9600" height="40" fill="#0d261c"/>
      <path className="road-dash" d="M-4000 336 H5600" stroke="#c6dc9d" strokeOpacity=".35" strokeWidth="3" strokeDasharray="26 22"/>
      {/* Port: container stacks and gantry crane */}
      {[0, 1, 2, 3].map(c => [0, 1, 2].map(t => <rect key={`${c}-${t}`} x={30 + c * 58} y={276 - t * 24} width="54" height="22" fill={palette[(c * 2 + t * 3) % palette.length]}/>))}
      <path d="M260 300 L282 110 M430 300 L408 110 M240 110 H470 M282 110 L345 60 L408 110" stroke="#c6dc9d" strokeWidth="7" fill="none" strokeLinejoin="round"/>
      <rect x="318" y="98" width="30" height="16" fill="#f4f6f1"/>
      <g className="crane-load"><path d="M345 114 V168" stroke="#dfe7d6" strokeWidth="2"/><rect x="306" y="168" width="80" height="26" fill="#a3653f"/></g>
      <text x="145" y="214" fill="#c6dc9d" fontSize="17" fontFamily="Manrope, sans-serif" fontWeight="700" letterSpacing="3" textAnchor="middle">INDIAN PORT</text>
      {/* Paper mill */}
      <path d="M1180 300 V190 L1230 160 V190 L1280 160 V190 L1330 160 V190 L1380 160 V190 L1430 160 V190 H1540 V300 Z" fill="#1d5a3f"/>
      <rect x="1470" y="70" width="34" height="120" fill="#2f6b4c"/>
      <g className="ship-smoke mill-smoke"><circle cx="1487" cy="58" r="12"/><circle cx="1470" cy="40" r="15"/><circle cx="1450" cy="20" r="18"/></g>
      {[1205, 1265, 1325, 1385].map(x => <rect key={x} x={x} y="215" width="36" height="22" fill="#c6dc9d" opacity=".55"/>)}
      <rect x="1446" y="232" width="60" height="68" fill="#0d261c"/>
      <text x="1310" y="148" fill="#c6dc9d" fontSize="17" fontFamily="Manrope, sans-serif" fontWeight="700" letterSpacing="3" textAnchor="middle">PAPER MILL</text>
      {[0, 1, 2].map(i => <rect key={i} x={1550 + (i % 2) * 22} y={278 - Math.floor(i / 2) * 20} width="20" height="18" fill="#c0a886"/>)}
      {/* Truck */}
      <g className="truck">
        <rect x="0" y="232" width="190" height="56" fill="#c0a886"/>
        {[38, 76, 114, 152].map(x => <path key={x} d={`M${x} 238 V282`} stroke="#032c20" strokeOpacity=".2"/>)}
        <text x="95" y="266" fill="#073d2b" fontSize="14" fontFamily="Manrope, sans-serif" fontWeight="800" letterSpacing="2" textAnchor="middle">VEE NEXUS</text>
        <rect x="0" y="288" width="252" height="8" fill="#0d261c"/>
        <path d="M198 288 V246 Q198 238 206 238 H232 L252 262 V288 Z" fill="#f4f6f1"/>
        <path d="M212 246 H230 L244 262 H212 Z" fill="#123e2b"/>
        {[34, 64, 168, 226].map(x => <g key={x} className="wheel" transform={`translate(${x} 304)`}><circle r="14" fill="#0b1c15"/><circle r="5" fill="#7f9a6b"/><path d="M-9 0 H9" stroke="#7f9a6b" strokeWidth="2"/></g>)}
      </g>
    </svg>
  </div>;
}

export default function ShipScene() {
  const [paused, setPaused] = useState(false);
  const [mode, setMode] = useState<'sea' | 'land'>('sea');
  return <div className={`ship-scene mode-${mode}${paused ? ' is-paused' : ''}`}>
    {mode === 'sea' ? <Ocean/> : <LandRoute/>}
    <div className="scene-controls ship-controls">
      <div className="visual-toggle" role="group" aria-label="Hero visual">
        <button onClick={() => setMode('sea')} aria-pressed={mode === 'sea'}><ShipIcon size={14}/>Ocean freight</button>
        <button onClick={() => setMode('land')} aria-pressed={mode === 'land'}><Truck size={14}/>Port to mill</button>
      </div>
      <button onClick={() => setPaused(!paused)} aria-pressed={paused} aria-label={paused ? 'Play motion' : 'Pause motion'}>{paused ? <Play size={14}/> : <Pause size={14}/>}<span className="control-text">{paused ? 'Play' : 'Pause'}</span></button>
    </div>
  </div>;
}
