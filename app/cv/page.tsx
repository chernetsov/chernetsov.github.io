import { ReactNode } from 'react';

type Entry = {
  title: string;
  meta: string;
  body: ReactNode[];
};

const experience: Entry[] = [
  {
    title: "Superhuman / Area Tech Lead",
    meta: "October 2025 - Present, Austin, remote",
    body: ["Building ubiquitous agentic AI for work and education."],
  },
  {
    title: "Grammarly / Area Tech Lead, Grammarly Platform",
    meta: "September 2022 - October 2025, Austin, remote",
    body: ["Led Grammarly's platform organization before the company rebranded to Superhuman."],
  },
  {
    title: "Grammarly / Engineering Manager, Grammarly for Developers",
    meta: "September 2020 - September 2022 (2 years 1 month), Austin, remote",
    body: [
      "With a PM partner led the team building Grammarly for Developers, Grammarly's new product and business line – from early prototypes, through public beta and GA launch in September 2022.",
    ],
  },
  {
    title: "Grammarly / Engineering Manager, Identity and Data Platform teams",
    meta: "September 2019 - September 2020 (1 year 1 month), San Francisco",
    body: [
      "Switched to EM role.",
      "In addition to Data Platform team took on bootstrapping charter and technical roadmap for newly formed Identity team. With the team built identity building blocks for Grammarly for Business (SSO, SAML, basic RBAC), and Account Security (pipelines for detecting and preventing credential stuffing attacks)",
    ],
  },
  {
    title: "Grammarly / Technical Lead and later TLM, Data Platform",
    meta: "July 2014 - August 2019 (5 years 2 months), San Francisco",
    body: [
      "Started and led to maturity the team to build Grammarly's in-house data analytics and data pipelines capability. Enabled democratized data access through custom SQL-based query language and powerful enrichment pipelines through Scala-based DSL for dimension builders.",
    ],
  },
  {
    title: "Amazon / Software Engineer, Kindle Community Workspace",
    meta: "October 2013 - June 2014 (9 months), Seattle",
    body: ["Building GoodReads integration with Kindle ecosystem."],
  },
  {
    title: "Pixonic / CTO",
    meta: "March 2011 - September 2013 (2 years 7 months), Moscow",
    body: [
      "Back in the time Pixonic was focusing on game publishing. Led the work on 2 core products: AppMetr – event based analytics service with focus on mobile and social games; PixAPI Container – client+server proxy API, generalizing social APIs of 18 social networks and payment systems, enabling to publish app in all of supported networks without changing code.",
    ],
  },
  {
    title: "Odnoklassniki.ru / Software Engineer",
    meta: "July 2010 - March 2011 (9 months), Moscow",
    body: ["Revamping Groups feature in second largest social network in CIS."],
  },
  {
    title: "Biletrix / Co-founder, CTO",
    meta: "January 2010 - March 2011 (1 year 3 months), Moscow",
    body: ["Striving to build the first platform for selling concerts/events tickets online for the local market."],
  },
  {
    title: "KinoKrug / Co-founder, CTO",
    meta: "September 2007 - March 2011 (3 years 7 months), Moscow",
    body: ["Built the leading work-focused social network and online tools for Russian media production market."],
  },
  {
    title: "Netcracker / Software Engineer, System Performance",
    meta: "June 2005 - May 2007 (2 years), Moscow",
    body: [
      "Started my career (initially part-time during my last years of college) on a team in large operations support systems (OSS) software company. Team focused on tuning large java codebase and complex Oracle database deployments to be performant and reliable.",
    ],
  },
];

function CVEntry({ entry, current = false }: { entry: Entry; current?: boolean }) {
  return (
    <div className="cv-item group relative mb-4 sm:ml-6">
      <span
        className={`cv-dot absolute -left-[1.75rem] top-[1.65rem] hidden h-[8px] w-[8px] rotate-45 outline-4 outline-[var(--bg)] sm:block ${
          current ? 'pulse-dot bg-amber' : 'bg-faint transition-colors group-hover:bg-accent-2'
        }`}
      />
      <div className="cv-entry cut cut-hover p-5">
        <h3 className="text-lg font-semibold tracking-tight text-fg">{entry.title}</h3>
        <p className="mt-0.5 font-mono text-xs text-faint">{entry.meta}</p>
        {entry.body.map((paragraph, i) => (
          <p key={i} className={`${i === 0 ? 'mt-3' : 'mt-1.5'} leading-relaxed text-muted`}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

export default function CVPage() {
  return (
    <div className="cv-page text-fg">
      <header className="cv-header mb-14 text-center">
        <h1 className="font-display text-steel text-2xl uppercase leading-tight tracking-[0.08em] sm:text-[2rem]">
          Misha (Mikhail) Chernetsov
        </h1>
        <p className="mt-3 text-muted">
          chernetsov@gmail.com &bull; 2064848910 &bull; Austin, TX &bull;{' '}
          <a href="https://www.linkedin.com/in/mchernetsov/" className="link-sweep text-fg">
            linkedin.com/in/mchernetsov
          </a>
        </p>
        <a
          href="/Misha Chernetsov, CV.pdf"
          download
          className="cv-download chamfer group mt-6 inline-flex items-center gap-2 bg-fg px-5 py-2 font-mono text-xs uppercase tracking-[0.15em] text-[var(--bg)] transition-opacity hover:opacity-85 [--cut:8px]"
        >
          Download PDF
          <span className="transition-transform group-hover:translate-y-0.5">↓</span>
        </a>
      </header>

      <section className="mb-14">
        <p className="text-lg leading-relaxed text-muted sm:text-xl sm:leading-relaxed">
          Love cracking hard engineering problems, creating great products, and exploring new paradigms.
          Currently consumed by agentic AI 🤖, but with a background in data, developer platforms, and distributed systems.
        </p>
      </section>

      <section className="mb-14">
        <h2 className="mb-6 flex items-center gap-4 text-fg">
          <span className="font-mono text-[11px] tracking-[0.2em] text-faint">01 /</span>
          <span className="font-display text-base uppercase tracking-[0.2em]">Experience</span>
          <span className="h-px flex-1 bg-line print:hidden" />
        </h2>
        <div className="relative">
          <span className="absolute bottom-6 left-0 top-6 hidden w-px bg-gradient-to-b from-amber via-line-strong to-transparent sm:block print:hidden" />
          {experience.map((entry, i) => (
            <CVEntry key={entry.title} entry={entry} current={i === 0} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 flex items-center gap-4 text-fg">
          <span className="font-mono text-[11px] tracking-[0.2em] text-faint">02 /</span>
          <span className="font-display text-base uppercase tracking-[0.2em]">Education</span>
          <span className="h-px flex-1 bg-line print:hidden" />
        </h2>
        <div className="cv-entry cut p-5">
          <h3 className="text-lg font-semibold tracking-tight text-fg">
            Moscow Institute of Physics and Technology (State University) (MIPT) / Master and Bachelor, applied physics and mathematics
          </h3>
          <p className="mt-0.5 font-mono text-xs text-faint">2002 - 2008</p>
          <p className="mt-3 leading-relaxed text-muted">Top 2 Russian technical school</p>
        </div>
      </section>
    </div>
  );
}
