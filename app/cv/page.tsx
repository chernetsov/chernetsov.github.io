export default function CVPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold">Misha Chernetsov - CV</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">misha.chernetsov at example.com</p> {/* Replace with your actual email */}
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2">Education</h2>
        {/* Add your education details here */}
        <div className="text-gray-800 dark:text-gray-200">
          <h3 className="font-medium">[Your University]</h3>
          <p className="text-sm">[Your Degree] in [Your Field], [Graduation Year]</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2">Skills</h2>
        {/* Add your skills here */}
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-200">
          <li>[Skill 1]</li>
          <li>[Skill 2]</li>
          <li>[Skill 3]</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2">Projects</h2>
        {/* Add your projects here */}
        <div className="text-gray-800 dark:text-gray-200">
          <h3 className="font-medium">[Project Title]</h3>
          <p className="text-sm">[Brief description of the project]</p>
        </div>
      </section>

      {/* You can reuse the Experience and Publications sections from the homepage or customize them */}
      <p className="text-gray-800 dark:text-gray-200">
        For Experience and Publications, please refer to the <a href="/" className="text-blue-600 dark:text-blue-400 hover:underline">homepage</a>.
      </p>
    </div>
  )
} 