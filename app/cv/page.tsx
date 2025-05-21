export default function CVPage() {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Misha (Mikhail) Chernetsov</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">chernetsov@gmail.com &bull; 2064848910 &bull; Austin, TX</p>
        <a 
          href="/Misha Chernetsov, CV.pdf" 
          download 
          className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 !text-white font-bold py-1 px-3 rounded text-sm dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Download PDF
        </a>
      </header>

      <section className="mb-8">
        <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200">
        Love cracking hard engineering problems, creating great products, and exploring new paradigms.
        Currently consumed by agentic AI 🤖, but with a background in data, developer platforms, and distributed systems.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">Experience</h2>

        <div className="mb-6 p-4 rounded-lg hover:shadow-lg transition-shadow duration-200 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Grammarly / Area Tech Lead</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">September 2022 - Present, Austin, remote</p>
          <p className="mt-1 text-gray-800 dark:text-gray-200">Now: building ubiquitous agentic AI for work and education.</p>
        </div>

        <div className="mb-6 p-4 rounded-lg hover:shadow-lg transition-shadow duration-200 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Grammarly / Engineering Manager, Grammarly for Developers</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">September 2020 - September 2022 (2 years 1 month), Austin, remote</p>
          <p className="mt-2 text-gray-800 dark:text-gray-200">With a PM partner led the team building Grammarly for Developers, Grammarly&apos;s new 
            product and business line – from early prototypes, through public beta and GA launch in September 2022.</p>
        </div>

        <div className="mb-6 p-4 rounded-lg hover:shadow-lg transition-shadow duration-200 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Grammarly / Engineering Manager, Identity and Data Platform teams</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">September 2019 - September 2020 (1 year 1 month), San Francisco</p>
          <p className="mt-2 text-gray-800 dark:text-gray-200">Switched to EM role.</p>
          <p className="mt-1 text-gray-800 dark:text-gray-200">In addition to Data Platform team took on bootstrapping charter and technical 
            roadmap for newly formed Identity team. With the team built identity building blocks for Grammarly for Business (SSO, SAML, basic RBAC), and Account Security (pipelines for detecting and preventing credential stuffing attacks)</p>
        </div>

        <div className="mb-6 p-4 rounded-lg hover:shadow-lg transition-shadow duration-200 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Grammarly / Technical Lead and later TLM, Data Platform</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">July 2014 - August 2019 (5 years 2 months), San Francisco</p>
          <p className="mt-2 text-gray-800 dark:text-gray-200">Started and let o maturity the team to build Grammarly&apos;s in-house data analytics 
            and data pipelines capability. Enabled democratized data access through custom SQL-based query 
            language and powerful enrichment pipelines through Sacla-based DSL for dimension builders.</p>
        </div>

        <div className="mb-6 p-4 rounded-lg hover:shadow-lg transition-shadow duration-200 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Amazon / Software Engineer, Kindle Community Workspace</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">October 2013 - June 2014 (9 months), Seattle</p>
          <p className="mt-2 text-gray-800 dark:text-gray-200">Building GoodReads integration with Kindle ecosystem.</p>
        </div>

        <div className="mb-6 p-4 rounded-lg hover:shadow-lg transition-shadow duration-200 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Pixonic / CTO</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">March 2011 - September 2013 (2 years 7 months), Moscow</p>
          <p className="mt-2 text-gray-800 dark:text-gray-200">Back in the time Pixonic was focusing game publishing. Led the work on 2 core 
            products:  AppMetr – event based analytics service with focus on mobile and social games; 
            PixAPI Container – client+server proxy API, generalizing social APIs of 18 social networks and payment systems, enabling to publish app in all of supported networks without changing code.</p>
        </div>

        <div className="mb-6 p-4 rounded-lg hover:shadow-lg transition-shadow duration-200 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Odnoklassniki.ru / Software Engineer</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">July 2010 - March 2011 (9 months), Moscow</p>
          <p className="mt-2 text-gray-800 dark:text-gray-200">Revamping Groups feature  in second largest social network in CIS.</p>
        </div>

        <div className="mb-6 p-4 rounded-lg hover:shadow-lg transition-shadow duration-200 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Biletrix / Co-founder, CTO</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">January 2010 - March 2011 (1 year 3 months), Moscow</p>
          <p className="mt-2 text-gray-800 dark:text-gray-200">Striving to build the first platform for selling concerts/events tickets online for the local market.</p>
        </div>

        <div className="mb-6 p-4 rounded-lg hover:shadow-lg transition-shadow duration-200 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">KinoKrug / Co-founder, CTO</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">September 2007 - March 2011 (3 years 7 months), Moscow</p>
          <p className="mt-2 text-gray-800 dark:text-gray-200">Built the leading work-focused social network and online tools for Russian media production market.</p>
        </div>

        <div className="mb-6 p-4 rounded-lg hover:shadow-lg transition-shadow duration-200 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Netcracker / Software Engineer, System Performance</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">September 2007 - March 2011 (3 years 7 months), Moscow</p>
          <p className="mt-2 text-gray-800 dark:text-gray-200">Started my career (initially part-time during my last years of college) on a 
            team in large operations support systems (OSS) software company. Team focused on tuning large java codebase 
            and complex Oracle database deployments to be performant and reliable.</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">Education</h2>
        <div className="mb-6 p-4 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Moscow Institute of Physics and Technology (State University) (MIPT) 
            / Master and Bachelor, applied physics and mathematics</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">2002 - 2008</p>
          <p className="mt-2 text-gray-800 dark:text-gray-200">Top 2 Russian technical school</p>
        </div>
      </section>
    </div>
  );
} 