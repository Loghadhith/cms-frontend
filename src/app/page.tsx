'use client'

export default function Home() {

  return (
    <div className="dark:bg-gradient-to-l from-gray-900 to-gray-700 w-full min-h-screen grid items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Main Heading */}
      <h1 className="text-7xl font-bold text-cyan-500">
        GitHub-Powered CMS
      </h1>

      {/* Description Section */}
      <section className="text-center text-xl text-indigo-300 max-w-3xl mx-auto">
        <p className="mb-4">
          Welcome to the <strong className="text-indigo-500">GitHub-Powered Content Management System</strong> (CMS).
          This CMS integrates seamlessly with GitHub, allowing you to manage, track, and publish your content with ease.
        </p>
        <p className="mb-4">
          With GitHub as the backend, every change made to your content is stored, versioned, and tracked automatically.
          Use our editor to write in Markdown, collaborate with your team using Git's powerful version control, and deploy content to your live site effortlessly.
        </p>
      </section>


      {/* Call to Action */}
      <section className="text-center space-y-4">
        <h2 className="text-3xl font-semibold text-white">Get Started</h2>
        <p className="text-lg text-indigo-300">
          Ready to manage your content with GitHub? Follow these simple steps to get started:
        </p>
        <div className="space-x-4">
          <a href="/signup" className="inline-block bg-indigo-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-600 transition">
            Create a GMS Account
          </a>
          <a href="/login" className="inline-block bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition">
            Log in to GMS account
          </a>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="text-center mt-12 text-gray-500">
        <p>
          <a href="https://github.com/your-username/your-repository" target="_blank" rel="noopener noreferrer">
            Visit Our GitHub Repository
          </a>
        </p>
        <p className="mt-4">© 2024 Your CMS. All rights reserved.</p>
      </footer>
    </div>
  );
}

