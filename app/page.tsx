"use client";

import { CSSProperties, ReactNode, useState } from 'react';
import { HeroNetwork } from '@/app/components/HeroNetwork';
import { Reveal } from '@/app/components/Reveal';
import { SpotlightCard } from '@/app/components/SpotlightCard';

const expertise = [
  {
    title: "Agentic AI",
    now: true,
    description: "agent runtime, RAG, memory and context, self-improving agents, sandboxed code execution tools",
  },
  {
    title: "Developer Platforms",
    description: "scalable APIs, modularity, evolvable protocols",
  },
  {
    title: "Data at Scale",
    description: "data pipelines and storage, Spark, Delta, distributed logs",
  },
  {
    title: "Stream Processing",
    description: "actor systems, back-pressure, Pekko, fan-in / fan-out, real-time, handling spikes, throttling",
  },
];

const experienceItems = [
  {
    company: "Superhuman, Area Tech Lead",
    role: "Austin",
    period: "Oct 2025 — Present"
  },
  {
    company: "Grammarly, Area Tech Lead",
    role: "SF Bay Area, Austin",
    period: "Jul 2014 — Oct 2025"
  },
  {
    company: "Amazon, Software Engineer",
    role: "Seattle",
    period: "Oct 2013 — Jun 2014"
  },
  {
    company: "Pixonic, CTO",
    role: "Moscow, Russia",
    period: "Mar 2011 — Sep 2013"
  },
  {
    company: "Odnoklassniki.ru, Software Engineer",
    role: "Moscow, Russia",
    period: "Jul 2010 — Mar 2011"
  },
  {
    company: "Biletrix, Co-founder, CTO",
    role: "Moscow, Russia",
    period: "Jan 2010 — Mar 2011"
  },
  {
    company: "KinoKrug, Co-founder, CTO",
    role: "Moscow, Russia",
    period: "Sep 2007 — Mar 2011"
  },
  {
    company: "Netcracker, Software Engineer",
    role: "Moscow, Russia",
    period: "Jun 2005 — May 2007"
  }
];

const initialVisibleCount = 3;

const projects = [
  {
    emoji: "🚀",
    title: "77 to Starbase",
    href: "https://chernetsov.github.io/77-to-starbase/",
    image: "/projects/77-to-starbase.jpg",
    description:
      "A trip site for friends: Austin to Starbase down US-77 in a Cybertruck to watch a Starship launch. Three.js cinematic intro and launch sim with a webcast-style HUD.",
    links: [
      { label: "Site", href: "https://chernetsov.github.io/77-to-starbase/" },
      { label: "Source", href: "https://github.com/chernetsov/77-to-starbase" },
    ],
  },
  {
    emoji: "🌱",
    title: "A gift that grows",
    href: "https://chernetsov.github.io/kids-trump-accounts/",
    image: "/projects/a-gift-that-grows.jpg",
    description:
      "A bilingual (English/Russian) family page inviting friends and relatives to give Vera and Alisa contributions to their Trump Accounts instead of toys. Growth calculator, a landing page for each girl's birthday invites, and verified QR codes for every way to give.",
    links: [
      { label: "Site", href: "https://chernetsov.github.io/kids-trump-accounts/" },
      { label: "Vera's page", href: "https://chernetsov.github.io/kids-trump-accounts/vera/" },
      { label: "Alisa's page", href: "https://chernetsov.github.io/kids-trump-accounts/alisa/" },
      { label: "Source", href: "https://github.com/chernetsov/kids-trump-accounts" },
    ],
  },
];

const cut = (size: number) => ({ '--cut': `${size}px` }) as CSSProperties;

function SectionHeading({ index, title, action }: { index: string; title: string; action?: ReactNode }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <span className="font-mono text-[11px] tracking-[0.2em] text-faint">{index} /</span>
      <h2 className="font-display text-[15px] uppercase tracking-[0.2em] text-fg sm:text-base">{title}</h2>
      <span className="h-px flex-1 bg-line" />
      {action}
    </div>
  );
}

function TimelineItem({ item, current }: { item: typeof experienceItems[number]; current: boolean }) {
  return (
    <li className="group relative pb-7 pl-8 last:pb-0">
      <span
        className={`absolute left-0 top-[0.6rem] h-[8px] w-[8px] -translate-x-1/2 rotate-45 outline-4 outline-[var(--bg)] transition-colors ${
          current ? 'pulse-dot bg-amber' : 'bg-faint group-hover:bg-accent-2'
        }`}
      />
      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <h3 className="text-[1.05rem] font-medium text-fg">{item.company}</h3>
        <p className="shrink-0 font-mono text-xs text-faint">{item.period}</p>
      </div>
      <p className="text-sm text-muted">{item.role}</p>
    </li>
  );
}

export default function Home() {
  const [showMoreExperience, setShowMoreExperience] = useState(false);
  const hiddenCount = experienceItems.length - initialVisibleCount;

  return (
    <div className="space-y-24">
      <header>
        <div className="relative pb-20 pt-24 sm:pb-28 sm:pt-44">
          <HeroNetwork />
          <Reveal className="flex flex-col gap-7 sm:flex-row sm:items-center sm:gap-8">
            <img
              src="/profile.jpg"
              alt="Misha Chernetsov"
              className="chamfer h-[108px] w-[108px] shrink-0 object-cover"
              style={cut(20)}
            />
            <div className="space-y-4">
              <h1 className="font-display text-steel text-[1.65rem] uppercase leading-tight tracking-[0.06em] sm:whitespace-nowrap sm:text-[1.9rem]">
                Misha Chernetsov
              </h1>
              <a
                href="mailto:chernetsov@gmail.com"
                className="chamfer group inline-flex items-center gap-2.5 bg-fg px-4 py-2 font-mono text-xs text-[var(--bg)] transition-opacity hover:opacity-85"
                style={cut(9)}
              >
                <span className="h-1.5 w-1.5 rotate-45 bg-amber" />
                chernetsov@gmail.com
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} className="max-w-2xl space-y-4 text-lg leading-relaxed text-muted sm:text-xl sm:leading-relaxed">
          <p>
            I am a software engineer based in <span className="text-fg">Austin, TX</span>.
          </p>
          <p>
            Currently consumed by <span className="text-fg">agentic AI</span> 🤖, but with background in data, developer platforms, distributed systems.
          </p>
          <p>
            I received my M.S. in Computer Science from Moscow Institute of Physics and Technology (MIPT).
          </p>
        </Reveal>
      </header>

      <section>
        <Reveal>
          <SectionHeading index="01" title="Experience" />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {expertise.map((area, i) => (
            <Reveal key={area.title} delay={i * 70}>
              <SpotlightCard className="h-full p-5">
                <h3 className="relative flex items-center gap-2.5 font-medium text-fg">
                  {area.now && (
                    <span className="chamfer inline-flex items-center gap-1.5 bg-amber/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-amber [--cut:5px]">
                      <span className="pulse-dot relative h-1.5 w-1.5 rotate-45 bg-amber" />
                      now
                    </span>
                  )}
                  {area.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted">{area.description}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section>
        <Reveal>
          <SectionHeading
            index="02"
            title="Work"
            action={
              <a
                href="/cv/"
                className="cut cut-hover group inline-flex items-center gap-1.5 px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.15em] text-fg"
                style={cut(8)}
              >
                📜 CV
                <span className="text-muted transition-transform group-hover:translate-x-0.5">→</span>
              </a>
            }
          />
        </Reveal>
        <Reveal delay={80}>
          <div className="relative ml-1">
            <span className="absolute bottom-2 left-0 top-2 w-px bg-gradient-to-b from-amber via-line-strong to-transparent" />
            <ul>
              {experienceItems.slice(0, initialVisibleCount).map((item, index) => (
                <TimelineItem key={item.company} item={item} current={index === 0} />
              ))}
            </ul>
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                showMoreExperience ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <ul className="overflow-hidden pt-7" inert={!showMoreExperience}>
                {experienceItems.slice(initialVisibleCount).map((item) => (
                  <TimelineItem key={item.company} item={item} current={false} />
                ))}
              </ul>
            </div>
          </div>
          <button
            onClick={() => setShowMoreExperience(!showMoreExperience)}
            className="mt-6 ml-1 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-fg"
          >
            {showMoreExperience ? 'Show less' : `Show ${hiddenCount} more`}
            <span className={`transition-transform duration-300 ${showMoreExperience ? 'rotate-180' : ''}`}>↓</span>
          </button>
        </Reveal>
      </section>

      <section>
        <Reveal>
          <SectionHeading index="03" title="Projects" />
        </Reveal>
        <div className="grid gap-6">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 90}>
              <SpotlightCard tilt={3} className="group [--cut:24px]">
                <a href={project.href} tabIndex={-1} aria-hidden className="relative block aspect-[32/15] overflow-hidden">
                  <img
                    src={project.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/40 to-transparent" />
                </a>
                <div className="relative space-y-3 p-5 sm:p-6">
                  <h3 className="text-lg font-medium text-fg">
                    <a href={project.href} className="link-sweep">
                      <span className="mr-2">{project.emoji}</span>
                      {project.title}
                    </a>
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">{project.description}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="cut cut-hover px-3 py-1 font-mono text-[11px] text-muted transition-colors hover:text-fg"
                        style={cut(6)}
                      >
                        {link.label} <span className="text-faint">↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
