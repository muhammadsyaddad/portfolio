"use client";

import type React from "react";

import { motion, useScroll } from "framer-motion";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export const runtime = "edge";
// Sample blog data (same as in blog page)
const blogPosts = [
  {
    id: 1,
    title: "Jikalau Monyet Bisa Menulis",
    date: "2025.08.24",
    readTime: 5,
    preview: "Jikalau ....",
    content: `ada salah satu scene di planet of apes yang di mana ada percakapan di antara dua monyet, monyet pertama menunjuk gundukan kertas yang sudah usang, terbalut dengan benang putih yang pudar , dan  bertanya "apa itu", "ini adallah alat yang biasa di gunakan oleh manusia untuk penyimpan ide nya", sejak itu fikiran pun bertanya, kenapa ini terdengar special sekali walau kita selalu berinterakasi sehari hari?, dan seberapa pentingnya sekarang ?, dengan adanya kecerdasasn buatan yang saban hari makin pintar dan kemungkinan di masa depan prompting adalah skill yang lumrah yang harus di miliki oleh semua manusia (selayaknya  baca, tulis menghitung).

    tulisan di temukan sekitar tahun 3400 - 3200 sm tepatnya di sumeria tulisannya berbentuk aksara paku , di tiongkok sekitar 1200 sm, dan maya sekitar tahun 300 sm, dan tulisan termasuk dalam penemuan akbar sepanajang manusia bertapak di bumi, setelah api dan roda serta bahasa, dengan ini manusia bisa menyimpan dan mengantarkan ide ide nya tanpa harus bertatap muka langsung pada waktu tertentu, semenjak kita homo sapiens dan skill ultimatum kita bisa ngerumpi sampai menghasilkan kerja sama yang konkret, dengan adanya tulisan kita juga tidak harus bertatap muka langsung untuk berkomunikasi, kita bisa menacapai kesepakatan lewat surat gagak, surat pos, dan terlebih kita hidup di dunia modern bisa lewat internet, tapi apa dengan adanya ai race ini apa tulisan bakal lebih penting ?,


    Selaku yang kita tahu dan kita alami, yang dimana rasnya researcher ini hidup seperti mau mati besok, semua berjalan dengan sangat cepat, dan dengan adanya persaingan anatara beberapa llm company, ini akan membuat perusahaan berbondong bondong untuk membuat harga yang affordable dengan fitur yang se bluberblubernya,

    jika lau kau ngasih monyet chatgpt, kemungkinan monyet tidak akan lebih pintar dan produktif, dan sebaliknya jikalau mozart di kasih suno ai, mozart akan tetep menjadi mozaart bahkan lebih baik lagi tapi lagi lagi dia masih mozart yang emang jago aja bikin musik nya, dan apa ini terjadi ke semua manusia?, dan apa kita harus menjadi mozart untuk menulis musik sekarang?, semisal kita make ai buat bikin musik, apa kamu cukup bisa untuk menuangkan ide mu yang ada di alam ide mu ke format nyata yang berbentuk tulisan?, terlepas dari apa kamu punya taset atau tidak,

    skill menulis di tahun sekarang dengan adanya ai race ini sangat urgent, dengan skill ini bisa membuka semua pintu yang ada, mau bikin pemograman? kita g harus jadi linus trovald, fondasi dan fundamaental cukup kita bisa buat (contohnya sistem os omarchy dibuat sama dhh, pembuat Ror, walau akhirnya dia bilang kalo ai bisa ngebantu bukin seuatu yang mustahil dia lakuin, tapi setlah itu jadi dia jadi lebih bodoh wkkwkw), sementara bikin music? suno ai, dan seterusnya ini membuka kan pintu untuk melakukan sesuatu yang susah di lampau hari dan membutuhkan pembentukan skill yang sangat lama,

    terlepas dari apakah llm membuat kita lebih pintar atau tidak dalam mengerjakan tugas (terutama yang butuh logik, agaknya kreativitas masih lebih diuntungkan sekarang), dengan adanya ini kita g berlepas diri dari beradaptasi (walau rasanya cukup kampret karena ini terlalu cepat)



    `,
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
