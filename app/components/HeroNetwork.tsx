'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';
import type { NetworkPalette } from '@/app/components/AgentNetwork';

const AgentNetwork = dynamic(() => import('@/app/components/AgentNetwork'), { ssr: false });

const palettes: Record<'light' | 'dark', NetworkPalette> = {
  dark: { node: '#b9bec6', hub: '#ffffff', pulse: '#ffffff', edge: '#8c929b', additive: true, edgeOpacity: 0.2 },
  light: { node: '#7d8188', hub: '#3a3d42', pulse: '#141518', edge: '#7d8188', additive: false, edgeOpacity: 0.16 },
};

function canRenderWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export function HeroNetwork() {
  const { effectiveTheme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const [supported, setSupported] = useState(false);
  const [visible, setVisible] = useState(true);
  const [animate, setAnimate] = useState(true);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    setSupported(canRenderWebGL());
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setAnimate(!mq.matches);
    update();
    mq.addEventListener('change', update);

    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (ref.current) io.observe(ref.current);

    const timer = setTimeout(() => setShown(true), 120);
    return () => {
      mq.removeEventListener('change', update);
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="hero-canvas pointer-events-none absolute bottom-0 left-1/2 top-[-7rem] -z-10 w-screen -translate-x-1/2"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 58%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 58%, transparent 100%)',
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_45%,var(--accent-glow),transparent_70%)]" />
      {supported && (
        <div className={`absolute inset-0 transition-opacity duration-[1600ms] ${shown ? 'opacity-100' : 'opacity-0'}`}>
          <AgentNetwork palette={palettes[effectiveTheme]} animate={animate} active={visible} />
        </div>
      )}
    </div>
  );
}
