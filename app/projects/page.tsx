"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";

const projects = [
  {
    id: 1,
    name: "Schoolarship Website",
    year: "2024",
    category: "Development",
    description:
      "a Full stack schoolarship website with a eye cathing ui an uatomation scraping data with github action.",
    tech: "Next.js, github action, TypeScript, Crawlee, Playwright, React ",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 2,
    name: "Clips.Id",
    year: "2024",
    category: "Development",
    description: "Make a clipping website contest, (on going project).",
    tech: "React, Node.js, Xendit API, Aws, Azzure model",
    color: "from-purple-500/20 to-pink-500/20",
  },
];

export default function ProjectsPage() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 p-6 bg-white/80 backdrop-blur-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <nav className="flex justify-between items-center max-w-6xl mx-auto">
          <Link
            href="/"
            className="text-lg font-medium hover:opacity-60 transition-opacity"
          >
            ←
          </Link>
          <div className="flex gap-8">
            <Link
              href="/blog"
              className="text-sm hover:opacity-60 transition-opacity"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="text-sm hover:opacity-60 transition-opacity"
            >
              About
            </Link>
          </div>
        </nav>
      </motion.header>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-light mb-4">
              Selected Works
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              A collection of selected projects that I have done throughout my
              life and that I am proud of.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div ref={containerRef} className="grid gap-1 md:gap-2">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="group relative"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <Link href={`/projects/${project.id}`}>
                  <div className="border-b border-gray-200 py-8 px-4 cursor-pointer transition-all duration-500 hover:bg-gray-50/50">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      {/* Project Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <motion.h2
                            className="text-2xl md:text-3xl font-light"
                            animate={{
                              x: hoveredProject === project.id ? 10 : 0,
                            }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                          >
                            {project.name}
                          </motion.h2>
                          <span className="text-sm text-gray-500 font-mono">
                            {project.year}
                          </span>
                        </div>

                        {/* Category */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: hoveredProject === project.id ? 1 : 0.6,
                          }}
                          transition={{ duration: 0.3 }}
                          className="text-sm text-gray-600 mb-2"
                        >
                          {project.category}
                        </motion.div>
                      </div>

                      {/* Hover Arrow */}
                      <motion.div
                        animate={{
                          x: hoveredProject === project.id ? 0 : 20,
                          opacity: hoveredProject === project.id ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="text-2xl"
                      >
                        →
                      </motion.div>
                    </div>

                    {/* Project Details - Revealed on Hover */}
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: hoveredProject === project.id ? "auto" : 0,
                        opacity: hoveredProject === project.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 space-y-3">
                        <p className="text-gray-700 max-w-2xl leading-relaxed">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.split(", ").map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-600"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    {/* Subtle Background Gradient on Hover */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${project.color} -z-10 rounded-lg`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: hoveredProject === project.id ? 1 : 0,
                        scale: hoveredProject === project.id ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-24 text-center"
          >
            <p className="text-gray-500 text-sm">
              Interested in working together?{" "}
              <Link
                href="/about"
                className="underline hover:no-underline transition-all"
              >
                Let's connect
              </Link>
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
