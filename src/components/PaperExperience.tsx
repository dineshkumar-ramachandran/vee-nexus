import { lazy, Suspense, useEffect, useState } from 'react';
import { Rotate3D } from 'lucide-react';
import SceneBoundary from './SceneBoundary';

const PaperScene = lazy(() => import('./PaperScene'));
const Poster = () => <img className="scene-poster" src="/paper-sculpture.webp" alt="A continuous loop made from layered paper" width="800" height="677" fetchPriority="high"/>;

export default function PaperExperience() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const desktop = matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)');
    // Let the core page and its poster paint before initializing optional WebGL.
    const timer = desktop.matches ? window.setTimeout(() => setEnabled(true), 900) : undefined;
    return () => window.clearTimeout(timer);
  }, []);
  if (enabled) return <SceneBoundary><Suspense fallback={<Poster/>}><PaperScene/></Suspense></SceneBoundary>;
  return <div className="paper-scene"><Poster/><div className="scene-controls explore-3d"><button onClick={() => setEnabled(true)}><Rotate3D size={14}/>Explore in 3D</button></div></div>;
}
