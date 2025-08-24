"use client";

import { motion, useScroll, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "Jikalau Monyet Bisa Menulis",
    date: "2024.03.15",
    readTime: 5,
    preview: "Refrensi dari series planet of apes.",
  },
];

function BlogPost({
  post,
  index,
}: {
  post: (typeof blogPosts)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.3, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="border-b border-neutral-200 dark:border-neutral-800 pb-16 mb-16 last:border-b-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col space-y-4">
        {/* Date and Reading Time */}
        <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
          <motion.span
            animate={{ opacity: isInView ? 1 : 0.5 }}
            transition={{ duration: 0.6 }}
          >
            {post.date}
          </motion.span>
          <motion.div
            className="flex items-center space-x-2"
            animate={{ opacity: isInView ? 1 : 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span>{post.readTime} min read</span>
            <motion.div
              className="w-12 h-0.5 bg-neutral-300 dark:bg-neutral-600 overflow-hidden"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              <motion.div
                className="w-full h-full bg-neutral-900 dark:bg-neutral-100"
                initial={{ x: "-100%" }}
                animate={isInView ? { x: "0%" } : { x: "-100%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Title */}
        <Link href={`/blog/${post.id}`}>
          <motion.h2
            className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 cursor-pointer"
            animate={{
              x: isHovered ? 8 : 0,
              opacity: isInView ? 1 : 0.3,
            }}
            transition={{ duration: 0.3 }}
          >
            {post.title.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.05, delay: i * 0.02 + 0.2 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h2>
        </Link>

        {/* Preview */}
        <motion.p
          className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {post.preview}
        </motion.p>

        {/* Read More Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link
            href={`/blog/${post.id}`}
            className="inline-flex items-center text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors duration-300"
          >
            <span className="text-sm font-medium">Read Article</span>
            <motion.span
              className="ml-2"
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </motion.article>
  );
}

export default function BlogPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    document.body.style.backgroundColor = "#0a0a0a";
    document.documentElement.classList.add("dark");

    return () => {
      document.body.style.backgroundColor = "";
      document.documentElement.classList.remove("dark");
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 p-6 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <nav className="flex justify-between items-center max-w-4xl mx-auto">
          <Link
            href="/"
            className="text-lg font-medium text-white hover:opacity-60 transition-opacity"
          >
            ←
          </Link>
          <div className="flex gap-8">
            <Link
              href="/projects"
              className="text-sm text-white hover:opacity-60 transition-opacity"
            >
              Projects
            </Link>
            <Link
              href="/about"
              className="text-sm text-white hover:opacity-60 transition-opacity"
            >
              About
            </Link>
          </div>
        </nav>
      </motion.header>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-5xl md:text-7xl font-light text-white mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {"Thoughts".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1, delay: i * 0.05 + 0.4 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="text-xl text-neutral-300 max-w-2xl leading-relaxed mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            A collection of ideas about design, development, and the
            intersection of technology and creativity.
          </motion.p>

          {/* Blog Posts */}
          {blogPosts.map((post, index) => (
            <BlogPost key={post.id} post={post} index={index} />
          ))}
        </div>
      </main>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-white origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
    </motion.div>
  );
}
