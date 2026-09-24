import { Component, type ReactNode } from 'react';

/** Keep sourcing content usable if the optional WebGL module cannot load. */
export default class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed
      ? <img className="scene-poster" src="/paper-sculpture.webp" alt="Recovered corrugated paper layers"/>
      : this.props.children;
  }
}
