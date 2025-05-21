"use client";

import { useState } from 'react';

export default function Home() {
  const [showMoreExperience, setShowMoreExperience] = useState(false);

  const toggleExperience = () => {
    setShowMoreExperience(!showMoreExperience);
  };

  const experienceItems = [
    {
      company: "Grammarly, SF Bay Area / Austin",
      role: "Software Engineer → Eng Manager → Area Tech Lead, Grammarly",
      period: "July 2014 — Present"
    },
    {
      company: "Amazon, Seattle",
      role: "Software Engineer",
      period: "Oct 2013 — Jun 2014"
    },
    {
      company: "Pixonic, Moscow, Russia",
      role: "CTO",
      period: "Mar 2011 — Sep 2013"
    },
    {
      company: "Odnoklassniki.ru, Moscow, Russia",
      role: "Software Engineer",
      period: "Jul 2010 — Mar 2011"
    },
    {
      company: "Biletrix, Moscow, Russia",
      role: "Co-founder, CTO",
      period: "Jan 2010 — Mar 2011"
    },
    {
      company: "KinoKrug, Moscow, Russia",
      role: "Co-founder, CTO",
      period: "Sep 2007 — Mar 2011"
    },
    {
      company: "Netcracker, Moscow, Russian Federation",
      role: "Engineer, System Performance",
      period: "Jun 2005 — May 2007"
    }
  ];

  const initialVisibleCount = 3; // Grammarly, Amazon, Pixonic

  return (
    <div className="space-y-10 mb-50">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold">Misha Chernetsov</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300"><a href="mailto:chernetsov@gmail.com" className="hover:underline">chernetsov@gmail.com</a></p>
      </header>

      <section className="space-y-4 text-gray-800 dark:text-gray-200">
        <p>
          I am a software engineer based in Austin, TX.
        </p>
        <p>
          Currently consumed by agentic AI 🤖, but with backgound in data, developer platforms, distributed systems.
        </p>
        <p>
          I received my M.S. in Computer Science from Moscow Institute of Physics and Technology (MIPT).                   
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2">Experience</h2>
        <div className="space-y-4">
          {experienceItems.slice(0, initialVisibleCount).map((item, index) => (
            <div className="flex" key={index}>
              <div>
                <h3 className="text-lg font-medium">{item.company}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.role}, {item.period}</p>
              </div>
            </div>
          ))}

          {showMoreExperience && experienceItems.slice(initialVisibleCount).map((item, index) => (
            <div className="flex" key={index + initialVisibleCount}>
              <div>
                <h3 className="text-lg font-medium">{item.company}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.role}, {item.period}</p>
              </div>
            </div>
          ))}

          {experienceItems.length > initialVisibleCount && (
            <div className="flex">
              <button
                onClick={toggleExperience}
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                {showMoreExperience ? 'Show less ↑' : `Show ${experienceItems.length - initialVisibleCount} more ↓`}
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2">Deep Interests</h2>
        <div className="space-y-4">
          <div className="text-gray-800 dark:text-gray-200">
            <h3 className="font-medium flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full">now</span> Agentic AI
              
            </h3>
            <p className="text-sm">agent runtime, RAG, memory and context, self-improving agents, sandboxed code execution tools</p>
          </div>
          <div className="text-gray-800 dark:text-gray-200">
            <h3 className="font-medium">Developer Platforms</h3>
            <p className="text-sm">scalable APIs, modularity, evolvable protocols</p>
          </div>
          <div className="text-gray-800 dark:text-gray-200">
            <h3 className="font-medium">Data at Scale</h3>
            <p className="text-sm">data pipelines and storage, Spark, Delta, distributed logs, </p>
          </div>
          <div className="text-gray-800 dark:text-gray-200">
            <h3 className="font-medium">Stream Processing</h3>
            <p className="text-sm">actor systems, back-pressure, Pekko, fan-in / fan-out, real-time, handling spikes, throttling</p>
          </div>
        </div>
      </section>
    </div>
  )
}
