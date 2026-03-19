"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const blogs = [
  {
    id: 1,
    title:
      "How to Book Italy Attractions Like a Pro: Skip-the-Line, Timed Entry & Smart Tips",
    excerpt:
      "Italy’s top sights sell out fast—especially in peak season. Learn when to book, how timed entry works, and how to avoid long lines in Rome, Florence, and Venice.",
    image: "/blogs/how_to_book_italy.png",
    date: "February 15, 2026",
    category: "Travel Tips",
    slug: "/blog/italy-top-sights",
  },
  {
    id: 2,
    title:
      "Colosseum, Roman Forum & Palatine Hill – Private 3 Hour Tour (What’s Worth It?)",
    excerpt:
      "Thinking about a private Colosseum tour? Here’s what you’ll actually see in 3 hours, who it’s best for, and how it compares to standard entry or group tours.",
    image: "/blogs/Colosseum_Roman.png",
    date: "February 10, 2026",
    category: "Rome Tours",
    slug: "/blog/private-3-hour-tour",
  },
  {
    id: 3,
    title:
      "Colosseum vs Vatican vs Borghese: Which Rome Ticket Should You Book First?",
    excerpt:
      "Not sure where to start? Compare availability, timed-entry rules, and crowd levels—so you can book the right ticket first and build a smooth Rome itinerary.",
    image: "/blogs/thumb_collusum_vatican.png",
    date: "February 5, 2026",
    category: "Ticket Guide",
    slug: "/blog/colosseum-vs-vatican",
  },
  {
    id: 4,
    title:
      "Vatican Museums & Sistine Chapel: A Complete Visitor Guide",
    excerpt:
      "The Vatican Museums and the Sistine Chapel are among the most visited cultural sites in the world. Located within Vatican City, these landmarks offer an extraordinary journey through art, history, and religion.",
    image: "/blogs/vatican-sistine.png",
    date: "March 2026",
    category: "Ticket Guide",
    slug: "/blog/vatican-sistine",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const BlogIndex = () => {
  return (
    <div className="min-h-screen bg-white text-[#051036] flex flex-col">
        <Navbar />
      {/* Hero Section */}
      <section className="relative h-40 sm:h-44 md:h-52 w-full overflow-hidden mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-heading text-3xl font-semibold text-foreground mb-4">
              Travel Blog
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Ticket tips, itinerary ideas, and local insights to help you
              explore Italy smoothly—without wasting time in long lines.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogs.map((blog) => (
              <motion.article
                key={blog.id}
                variants={itemVariants}
                className="group bg-card rounded-2xl overflow-hidden shadow-card card-hover"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#ff5533] hover:bg-[#ff5533]/90 text-white text-xs font-semibold rounded-full">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{blog.date}</span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                    {blog.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <Link
                    href={blog.slug}
                    className="inline-flex items-center gap-2 text-accent font-medium text-sm hover:gap-3 transition-all duration-300"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BlogIndex;