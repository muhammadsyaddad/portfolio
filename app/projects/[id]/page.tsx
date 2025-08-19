export default function ProjectDetail({ params }: { params: { id: string } }) {
  const projects = {
    "1": {
      title: "Minimal Portfolio",
      year: "2024",
      category: "Web Design",
      description: "will be writen soon.",
      tech: ["Next.js", "Framer Motion", "TypeScript", "Tailwind CSS"],
      duration: "3 months",
      role: "Lead Designer & Developer",
      challenge: "will be writen soon.",
      solution: "will be writen soon.",
      outcome: "will be writen soon.",
      link: "https://github.com/username/minimal-portfolio",
    },
    "2": {
      title: "Clips.id",
      year: "2024",
      category: "Development",
      description: "will be writen soon",
      tech: ["React", "Node.js", "Stripe API", "PostgreSQL"],
      duration: "6 months",
      role: "Full Stack Developer",
      challenge: "will be writen soon.",
      solution: "will be writen soon.",
      outcome: "will be writen soon.",
      link: "https://github.com/username/ecommerce-platform",
    },
  };

  const project = projects[params.id as keyof typeof projects];

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-gray-900 mb-4">
            Project not found
          </h1>
          <a
            href="/projects"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back to projects
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <a
            href="/projects"
            className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
          >
            ← Projects
          </a>
          <a
            href="/"
            className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
          >
            Home
          </a>
        </div>
      </nav>

      {/* Content */}
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <header className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-4xl md:text-5xl font-light text-gray-900">
                {project.title}
              </h1>
              <span className="text-lg text-gray-500">{project.year}</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="px-3 py-1 bg-gray-100 rounded-full">
                {project.category}
              </span>
              <span>{project.duration}</span>
              <span>{project.role}</span>
            </div>
          </header>

          {/* Description */}
          <section className="mb-16">
            <p className="text-xl text-gray-700 leading-relaxed font-light">
              {project.description}
            </p>
          </section>

          {/* Tech Stack */}
          <section className="mb-16">
            <h2 className="text-2xl font-light text-gray-900 mb-6">
              Technology
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.tech.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Challenge */}
          <section className="mb-16">
            <h2 className="text-2xl font-light text-gray-900 mb-6">
              Challenge
            </h2>
            <p className="text-gray-700 leading-relaxed">{project.challenge}</p>
          </section>

          {/* Solution */}
          <section className="mb-16">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Solution</h2>
            <p className="text-gray-700 leading-relaxed">{project.solution}</p>
          </section>

          {/* Outcome */}
          <section className="mb-16">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Outcome</h2>
            <p className="text-gray-700 leading-relaxed">{project.outcome}</p>
          </section>

          {/* Link */}
          <section className="mb-16">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-900 hover:text-gray-600 transition-colors group"
            >
              <span className="text-lg">View Project</span>
              <span className="transform group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </section>

          {/* Navigation */}
          <footer className="pt-16 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <a
                href="/projects"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← All Projects
              </a>
              <a
                href="/blog"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Read Blog →
              </a>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
