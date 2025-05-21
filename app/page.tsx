"use client";

import { useState } from 'react';

export default function Home() {
  const [showMoreExperience, setShowMoreExperience] = useState(false);

  const toggleExperience = () => {
    setShowMoreExperience(!showMoreExperience);
  };

  const experienceItems = [
    {
      company: "Grammarly, Area Tech Lead",
      role: "SF Bay Area, Austin",
      period: "July 2014 — Present"
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
      company: "Netcracker, SoftwareEngineer",
      role: "Moscow, Russia",
      period: "Jun 2005 — May 2007"
    }
  ];

  const initialVisibleCount = 2; // Grammarly, Amazon

  return (
    <div className="space-y-10 mb-50">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Misha Chernetsov</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300"><a href="mailto:chernetsov@gmail.com" className="hover:underline">chernetsov@gmail.com</a></p>
      </header>

      <section className="space-y-4">
        <p className="text-gray-800 dark:text-gray-200">
          I am a software engineer based in Austin, TX.
        </p>
        <p className="text-gray-800 dark:text-gray-200">
          Currently consumed by agentic AI 🤖, but with backgound in data, developer platforms, distributed systems.
        </p>
        <p className="text-gray-800 dark:text-gray-200">
          I received my M.S. in Computer Science from Moscow Institute of Physics and Technology (MIPT).                   
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">Experience</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs bg-blue-600 text-white rounded-full">now</span> Agentic AI
              
            </h3>
            <p className="text-sm text-gray-800 dark:text-gray-200">agent runtime, RAG, memory and context, self-improving agents, sandboxed code execution tools</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">Developer Platforms</h3>
            <p className="text-sm text-gray-800 dark:text-gray-200">scalable APIs, modularity, evolvable protocols</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">Data at Scale</h3>
            <p className="text-sm text-gray-800 dark:text-gray-200">data pipelines and storage, Spark, Delta, distributed logs, </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">Stream Processing</h3>
            <p className="text-sm text-gray-800 dark:text-gray-200">actor systems, back-pressure, Pekko, fan-in / fan-out, real-time, handling spikes, throttling</p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex justify-between items-center border-b border-gray-300 dark:border-gray-700 pb-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Work</h2>
          <a href="/cv" className="text-2xl text-blue-600 hover:underline dark:text-blue-400">
            📜 CV
          </a>
        </div>
        <div className="space-y-4">
          {experienceItems.slice(0, initialVisibleCount).map((item, index) => (
            <div className="flex" key={index}>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{item.company}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-400">{item.role}, {item.period}</p>
              </div>
            </div>
          ))}

          {showMoreExperience && experienceItems.slice(initialVisibleCount).map((item, index) => (
            <div className="flex" key={index + initialVisibleCount}>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{item.company}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-400">{item.role}, {item.period}</p>
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

    </div>
  )
}
