"use client";

import type React from "react";

import { motion, useScroll } from "framer-motion";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Sample blog data (same as in blog page)
const blogPosts = [
  {
    id: 1,
    title: "The First Content",
    date: "2024.03.15",
    readTime: 5,
    preview: "will be writen soon.",
    content: `will be writen soon`,
  },
];

export default function BlogArticle() {
  const params = useParams();
  const articleId = Number.parseInt(params.id as string);
  const article = blogPosts.find((post) => post.id === articleId);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Set dark theme immediately
  useEffect(() => {
    document.body.style.backgroundColor = "#0a0a0a";
    document.documentElement.classList.add("dark");

    return () => {
      document.body.style.backgroundColor = "";
      document.documentElement.classList.remove("dark");
    };
  }, []);

  if (!article) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Article not found</h1>
          <Link
            href="/blog"
            className="text-neutral-400 hover:text-white transition-colors"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Header */}
      <header className="px-6 md:px-12 pt-16 pb-16">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <Link
              href="/blog"
              className="text-sm text-neutral-400 hover:text-white transition-colors duration-300"
            >
              ← Back to Blog
            </Link>
          </motion.div>

          <motion.div
            className="flex items-center justify-between text-sm text-neutral-400 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span>{article.date}</span>
            <span>{article.readTime} min read</span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-light text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {article.title}
          </motion.h1>

          <motion.p
            className="text-xl text-neutral-300 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {article.preview}
          </motion.p>
        </div>
      </header>

      {/* Article Content */}
      <main className="px-6 md:px-12 pb-24">
        <motion.article
          className="max-w-3xl mx-auto prose prose-invert prose-lg prose-neutral"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          style={
            {
              "--tw-prose-body": "#d4d4d4",
              "--tw-prose-headings": "#ffffff",
              "--tw-prose-lead": "#a3a3a3",
              "--tw-prose-links": "#ffffff",
              "--tw-prose-bold": "#ffffff",
              "--tw-prose-counters": "#a3a3a3",
              "--tw-prose-bullets": "#525252",
              "--tw-prose-hr": "#404040",
              "--tw-prose-quotes": "#d4d4d4",
              "--tw-prose-quote-borders": "#404040",
              "--tw-prose-captions": "#a3a3a3",
              "--tw-prose-code": "#ffffff",
              "--tw-prose-pre-code": "#d4d4d4",
              "--tw-prose-pre-bg": "#171717",
              "--tw-prose-th-borders": "#404040",
              "--tw-prose-td-borders": "#262626",
            } as React.CSSProperties
          }
        >
          <div
            dangerouslySetInnerHTML={{
              __html: article.content
                .replace(/\n/g, "<br />")
                .replace(/#{1,6}\s/g, (match) => `<h${match.length - 1}>`)
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                .replace(/>(.*?)$/gm, "<blockquote>$1</blockquote>"),
            }}
          />
        </motion.article>
      </main>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-white origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
    </motion.div>
  );
}
