'use client';

import type { CSSProperties } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeSwitcher } from '@/app/components/ThemeSwitcher';

const links = [
  { href: '/', label: 'Home' },
  { href: '/cv/', label: 'CV' },
  // { href: '/blog/', label: 'Blog' },
];

export function SiteNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.replace(/\/$/, ''));

  return (
    <nav className="site-nav fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div
        className="cut flex items-center gap-1 p-1 pl-1.5 backdrop-blur-xl backdrop-saturate-150"
        style={{ '--cut': '10px', '--cut-bg': 'color-mix(in srgb, var(--bg-elevated) 72%, transparent)' } as CSSProperties}
      >
        <ul className="flex items-center gap-1">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`block rounded-[3px] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                  isActive(href)
                    ? 'bg-surface-hover text-fg'
                    : 'text-muted hover:text-fg'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <span className="mx-1 h-4 w-px bg-line" />
        <ThemeSwitcher />
      </div>
    </nav>
  );
}
