"use client";

import type React from "react";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 0.1, 0.2, 0.3],
  );

  const CharacterReveal = ({
    children,
    delay = 0,
  }: {
    children: string;
    delay?: number;
  }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
      <span ref={ref} className="inline-block">
        {children.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.05,
              delay: delay + i * 0.02,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    );
  };

  const BreathingText = ({
    children,
    delay = 0,
  }: {
    children: React.ReactNode;
    delay?: number;
  }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-20%" });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={
          isInView
            ? {
                opacity: 1,
                scale: 1,
              }
            : { opacity: 0, scale: 0.98 }
        }
        transition={{
          duration: 1.2,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        whileInView={{
          scale: [1, 1.005, 1],
          transition: {
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }}
        className="mb-16"
      >
        {children}
      </motion.div>
    );
  };

  const TimelineItem = ({
    year,
    title,
    description,
    delay = 0,
  }: {
    year: string;
    title: string;
    description: string;
    delay?: number;
  }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="flex gap-8 mb-12 group"
      >
        <div className="text-sm text-neutral-500 font-mono min-w-[60px] pt-1">
          {year}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium mb-2 group-hover:text-neutral-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-neutral-600 leading-relaxed">{description}</p>
        </div>
      </motion.div>
    );
  };

  const SkillItem = ({
    skill,
    delay = 0,
  }: {
    skill: string;
    delay?: number;
  }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-5%" });

    return (
      <motion.span
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{
          duration: 0.6,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.2 },
        }}
        className="inline-block px-3 py-1 text-sm text-neutral-700 hover:text-black transition-colors duration-300 cursor-default"
      >
        {skill}
      </motion.span>
    );
  };

  const ContactLink = ({
    href,
    children,
    delay = 0,
  }: {
    href: string;
    children: React.ReactNode;
    delay?: number;
  }) => {
    const ref = useRef<HTMLAnchorElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-5%" });

    return (
      <motion.a
        ref={ref}
        href={href}
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{
          duration: 0.6,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        whileHover={{
          x: 5,
          transition: { duration: 0.2 },
        }}
        className="block text-neutral-700 hover:text-black transition-colors duration-300 mb-2"
      >
        {children}
      </motion.a>
    );
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-white relative overflow-hidden"
    >
      <motion.div
        className="fixed inset-0 bg-gradient-to-br from-neutral-50 to-neutral-100"
        style={{ opacity: backgroundOpacity }}
      />

      <div className="relative z-10">
        <motion.header
          className="fixed top-0 left-0 right-0 z-50 p-6 bg-white/80 backdrop-blur-sm"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <nav className="flex justify-between items-center max-w-2xl mx-auto">
            <Link
              href="/"
              className="text-lg font-medium hover:opacity-60 transition-opacity"
            >
              ←
            </Link>
            <div className="flex gap-8">
              <Link
                href="/projects"
                className="text-sm hover:opacity-60 transition-opacity"
              >
                Projects
              </Link>
              <Link
                href="/blog"
                className="text-sm hover:opacity-60 transition-opacity"
              >
                Blog
              </Link>
            </div>
          </nav>
        </motion.header>

        <div className="max-w-2xl mx-auto px-6 pt-24 pb-16">
          {/* Header */}
          <BreathingText delay={0.2}>
            <h1 className="text-4xl md:text-5xl font-light mb-8 leading-tight">
              <CharacterReveal delay={0.3}>About</CharacterReveal>
            </h1>
          </BreathingText>

          {/* Introduction */}
          <BreathingText delay={0.6}>
            <div className="text-lg leading-relaxed text-neutral-700 mb-20">
              <CharacterReveal delay={0.8}>
                Hello my name is muhammad syaddad, im full stack developer,
                currently im student at universitas islam negeri jakarta , i
                study physics
              </CharacterReveal>
            </div>
          </BreathingText>

          {/* Timeline */}
          <BreathingText delay={1.0}>
            <h2 className="text-2xl font-light mb-12">
              <CharacterReveal delay={1.2}>Journey</CharacterReveal>
            </h2>
            <div className="mb-20">
              <TimelineItem
                year="2024"
                title="Next??"
                description="Its intresting to work in startup since that make u close with someone visionary, and in the long run i want to work with my own thing"
                delay={1.4}
              />
              <TimelineItem
                year="2025"
                title="Sudent And Freelance"
                description="Since i was student im not want more flexiblity about place, i cant work full time as ofline worker, i must work everyware."
                delay={1.6}
              />
              <TimelineItem
                year="2021"
                title="Full-Stack Developer"
                description="Working as a full stack developer at al mahad (its boarding school), and help social media handle a little bit"
                delay={1.8}
              />
              <TimelineItem
                year="2020"
                title="Started Journey"
                description="Begin code, short class for a year, i started with low level Language c++, and follow by ootstrap tech stack html css and jawirwcript."
                delay={2.0}
              />
            </div>
          </BreathingText>

          {/* Skills */}
          <BreathingText delay={2.2}>
            <h2 className="text-2xl font-light mb-8">
              <CharacterReveal delay={2.4}>
                Tools & Technologies
              </CharacterReveal>
            </h2>
            <div className="mb-20 leading-loose">
              {[
                "React",
                "Next.js",
                "TypeScript",
                "Tailwind CSS",
                "Framer Motion",
                "C++",
                "Adobe Creative Suite",
                "Node.js",
                "PostgreSQL",
                "Vercel",
                "Rust",
              ].map((skill, index) => (
                <SkillItem
                  key={skill}
                  skill={skill}
                  delay={2.6 + index * 0.1}
                />
              ))}
            </div>
          </BreathingText>

          {/* Contact */}
          <BreathingText delay={3.0}>
            <h2 className="text-2xl font-light mb-8">
              <CharacterReveal delay={3.2}>Get in Touch</CharacterReveal>
            </h2>
            <div className="space-y-2">
              <ContactLink href="mailto:muhamsyaddad@gmail.com" delay={3.4}>
                muhamsyaddad@gmail.com
              </ContactLink>
              <ContactLink href="https://x.com/MuhammadSyadd" delay={3.6}>
                Twitter
              </ContactLink>
              <ContactLink href="https://linkedin.com" delay={3.8}>
                LinkedIn
              </ContactLink>
              <ContactLink
                href="https://github.com/muhammadsyaddad"
                delay={4.0}
              >
                GitHub
              </ContactLink>
            </div>
          </BreathingText>
        </div>
      </div>
    </div>
  );
}
