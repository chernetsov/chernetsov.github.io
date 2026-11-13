'use client';

import { PointerEvent, ReactNode, useRef } from 'react';

export function SpotlightCard({
  className = '',
  tilt = 5,
  children,
}: {
  className?: string;
  tilt?: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', `${x * 100}%`);
    el.style.setProperty('--my', `${y * 100}%`);
    el.style.setProperty('--rx', `${(0.5 - y) * tilt}deg`);
    el.style.setProperty('--ry', `${(x - 0.5) * tilt}deg`);
  };

  const onLeave = () => {
    ref.current?.style.setProperty('--rx', '0deg');
    ref.current?.style.setProperty('--ry', '0deg');
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`spotlight-card cut cut-hover relative overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}
