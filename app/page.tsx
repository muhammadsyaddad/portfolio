"use client";

import type React from "react";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [1, 0.9, 0.7, 0.5],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [1, 0.98, 0.95, 0.92],
  );

  // Theme transition based on scroll position
  const themeProgress = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  const textColor = useTransform(
    scrollYProgress,
    [0.4, 0.6],
    ["hsl(var(--foreground))", "hsl(0 0% 100%)"], // white text in dark theme
  );

  useEffect(() => {
    const unsubscribe = themeProgress.on("change", (latest) => {
      const shouldBeDark = latest > 0.5;
      if (shouldBeDark !== isDarkTheme) {
        setIsDarkTheme(shouldBeDark);
        document.documentElement.classList.toggle("dark", shouldBeDark);
      }
    });

    return () => unsubscribe();
  }, [themeProgress, isDarkTheme]);

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [
      "hsl(var(--background))",
      "hsl(var(--background))",
      "hsl(220 13% 18%)", // transition to dark
      "hsl(224 71% 4%)", // darker
      "hsl(224 71% 4%)", // darkest
    ],
  );

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen transition-colors duration-1000"
      style={{ backgroundColor }}
    >
      <motion.section
        className="flex items-center justify-center min-h-screen px-6 md:px-12"
        style={{ opacity, scale }}
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-sans text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight transition-colors duration-1000">
              HI THERE,
              <br />
              <motion.span
                className="text-primary transition-colors duration-1000"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                WELCOME TO MY WEB
              </motion.span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="space-y-6"
          >
            <p className="font-serif text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed transition-colors duration-1000">
              im syaddad , scroll for detail about my self, btw i think
              sharelokeholmes better than hercule poirot
            </p>

            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-border to-transparent transition-colors duration-1000"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="space-y-4"
          >
            <ScrollHighlightText />

            <motion.button
              onClick={() => scrollToSection("portfolio-section")}
              className="font-serif text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 mt-8 group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              Explore portfolio
              <motion.span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">
                →
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      <PortfolioSection />
    </motion.div>
  );
}

function ScrollHighlightText() {
  const textRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const highlightProgress = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 100, 100],
  );
  const reverseHighlight = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 0, 100, 0],
  );

  return (
    <div ref={textRef} className="relative">
      <motion.p className="font-serif text-base md:text-lg text-foreground/70 max-w-xl mx-auto leading-relaxed transition-colors duration-1000">
        <motion.span
          className="relative inline-block transition-colors duration-500"
          style={{
            background: useTransform(
              highlightProgress,
              [0, 50, 100],
              [
                "linear-gradient(90deg, transparent 0%, transparent 100%)",
                "linear-gradient(90deg, hsl(var(--primary) / 0.3) 0%, hsl(var(--primary) / 0.3) 100%)",
                "linear-gradient(90deg, hsl(var(--primary) / 0.2) 0%, hsl(var(--primary) / 0.2) 100%)",
              ],
            ),
          }}
        >
          Im a full stack developer currently learning how to implment
        </motion.span>{" "}
        <motion.span
          className="relative inline-block transition-colors duration-500"
          style={{
            background: useTransform(
              highlightProgress,
              [25, 75, 100],
              [
                "linear-gradient(90deg, transparent 0%, transparent 100%)",
                "linear-gradient(90deg, hsl(var(--accent) / 0.3) 0%, hsl(var(--accent) / 0.3) 100%)",
                "linear-gradient(90deg, hsl(var(--accent) / 0.2) 0%, hsl(var(--accent) / 0.2) 100%)",
              ],
            ),
          }}
        >
          some mechine learning.
        </motion.span>
      </motion.p>
    </div>
  );
}

function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 700 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const { scrollYProgress: portfolioScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const portfolioTextColor = useTransform(
    portfolioScrollProgress,
    [0.2, 0.8],
    ["hsl(var(--foreground))", "hsl(0 0% 100%)"],
  );

  return (
    <section
      id="portfolio-section"
      ref={sectionRef}
      className="flex items-center justify-center min-h-screen px-6 md:px-12 relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, hsl(var(--primary)) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, hsl(var(--accent)) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 80%, hsl(var(--primary)) 0%, transparent 50%)",
            "radial-gradient(circle at 60% 20%, hsl(var(--accent)) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="max-w-4xl mx-auto text-center space-y-12 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants}>
          <motion.h2
            className="font-sans text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight transition-colors duration-1000"
            style={{ color: portfolioTextColor }}
          >
            {"Portfolio".split("").map((char, index) => (
              <motion.span
                key={index}
                className="inline-block"
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h2>
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto transition-colors duration-1000"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={
              isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }
            }
            transition={{ duration: 1.2, delay: 0.8 }}
          />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { name: "Projects", href: "/projects", delay: 0 },
            { name: "Blog", href: "/blog", delay: 0.1 },
            { name: "About", href: "/about", delay: 0.2 },
          ].map((item, index) => (
            <MagneticLink
              key={item.name}
              href={item.href}
              mouseX={mouseXSpring}
              mouseY={mouseYSpring}
              delay={item.delay}
              textColor={portfolioTextColor} // Pass text color to MagneticLink
            >
              {item.name}
            </MagneticLink>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <motion.div className="flex items-center justify-center gap-8">
            {[
              { name: "Twitter", href: "https://twitter.com" },
              { name: "GitHub", href: "https://github.com" },
              { name: "LinkedIn", href: "https://linkedin.com" },
            ].map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-sm hover:text-foreground transition-all duration-500 relative group"
                style={{ color: portfolioTextColor }} // Apply dynamic text color to social links
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 transition-colors duration-1000">
                  {social.name}
                </span>
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-primary to-accent"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </motion.div>

          <motion.button
            onClick={scrollToTop}
            className="font-serif text-sm hover:text-foreground transition-all duration-500 group relative"
            style={{ color: portfolioTextColor }} // Apply dynamic text color to back to top button
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="inline-block transition-colors duration-1000"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              Back to top
            </motion.span>
            <motion.span
              className="inline-block ml-2 transition-colors duration-1000"
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              ↑
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

function MagneticLink({
  children,
  href,
  mouseX,
  mouseY,
  delay,
  textColor, // Add textColor prop
}: {
  children: React.ReactNode;
  href: string;
  mouseX: any;
  mouseY: any;
  delay: number;
  textColor: any; // Add textColor type
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      ref={ref}
      href={href}
      className="group relative block p-8 rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-500 backdrop-blur-sm"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 + delay }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 20px 40px -12px hsl(var(--primary) / 0.1)",
      }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(135deg, hsl(var(--primary) / 0.05) 0%, hsl(var(--accent) / 0.05) 100%)",
        }}
      />

      <motion.span
        className="relative z-10 font-sans text-xl md:text-2xl font-semibold group-hover:text-primary transition-colors duration-500"
        style={{ color: textColor }} // Apply dynamic text color to link text
        animate={isHovered ? { y: -2 } : { y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {children}
      </motion.span>

      <motion.div
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
        animate={isHovered ? { x: 2, y: -2 } : { x: 0, y: 0 }}
      >
        <span className="text-primary text-sm transition-colors duration-1000">
          →
        </span>
      </motion.div>
    </motion.a>
  );
}
