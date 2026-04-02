import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useState } from "react";

const CATEGORIES = ["All", "New Build", "Renovation", "Outdoor Living", "Pre-Fab Framing", "Extension"];

const PROJECTS = [
  {
    title: "Hawthorne Deck & Pergola",
    description: "A stunning outdoor entertainment space built from premium hardwood decking, creating a seamless indoor-outdoor flow. Custom seating and structural timber pergola.",
    category: "Outdoor Living",
    image: "https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?q=80&w=2940&auto=format&fit=crop",
    year: "2024",
    location: "Hawthorne",
  },
  {
    title: "Bondi Two-Storey Extension",
    description: "Two-storey residential extension increasing living space by 60sqm. Complex stick framing integrated with the existing 1920s structure.",
    category: "Extension",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop",
    year: "2024",
    location: "Bondi",
  },
  {
    title: "Mosman Heritage Renovation",
    description: "Full interior renovation and structural update of a heritage-listed terrace home, blending classic character with modern luxury living.",
    category: "Renovation",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2950&auto=format&fit=crop",
    year: "2023",
    location: "Mosman",
  },
  {
    title: "Double Bay New Build",
    description: "Custom stick-framed 4-bedroom family home featuring complex architectural rooflines, exposed structural beams, and bespoke joinery.",
    category: "New Build",
    image: "https://images.unsplash.com/photo-1541888081696-2713f0190ce2?q=80&w=2952&auto=format&fit=crop",
    year: "2023",
    location: "Double Bay",
  },
  {
    title: "Neutral Bay Prefab Frame",
    description: "Rapid pre-fab frame installation for a multi-unit luxury development, cutting framing schedule by 30% with absolute precision.",
    category: "Pre-Fab Framing",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2831&auto=format&fit=crop",
    year: "2023",
    location: "Neutral Bay",
  },
  {
    title: "Kirribilli Harbour Pergola",
    description: "Elegant freestanding structural pergola for outdoor dining, featuring precision-cut joints and marine-grade fixings.",
    category: "Outdoor Living",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2940&auto=format&fit=crop",
    year: "2022",
    location: "Kirribilli",
  },
  {
    title: "Surry Hills Terrace Reframe",
    description: "Complete structural reframe of a Victorian terrace, reinforcing load-bearing walls while opening up the ground floor living areas.",
    category: "Renovation",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2940&auto=format&fit=crop",
    year: "2022",
    location: "Surry Hills",
  },
  {
    title: "Manly Coastal New Build",
    description: "A modern 5-bedroom coastal home designed for the harsh salt-air environment, using treated structural pine and marine-grade hardware throughout.",
    category: "New Build",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2940&auto=format&fit=crop",
    year: "2022",
    location: "Manly",
  },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <PageWrapper>
      {/* Hero Header */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <SectionLabel>Portfolio</SectionLabel>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.05] mb-6">
              Our <span className="italic text-accent">Projects</span>
            </h1>
            <p className="max-w-lg text-muted-foreground text-lg">
              A curated selection of our finest residential projects across Greater Melbourne,
              showcasing precision framing and architectural excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="border-y border-border sticky top-[64px] z-30 bg-background/95 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex gap-1 overflow-x-auto py-4 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-[0.65rem] font-semibold tracking-[0.15em] uppercase px-5 py-2.5 whitespace-nowrap transition-colors duration-300 ${
                  activeFilter === cat
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="section-padding">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 lg:gap-x-10 lg:gap-y-20">
            {filtered.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: (idx % 2) * 0.15 }}
                className="group"
              >
                {/* Image */}
                <div className="cinematic-image-container aspect-[16/10] w-full relative mb-6">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="cinematic-image"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-700" />
                  <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight size={16} className="text-foreground" />
                  </div>
                  {/* Category badge */}
                  <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm px-4 py-2">
                    <span className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase text-accent">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-serif group-hover:text-accent transition-colors duration-500">
                      {project.title}
                    </h3>
                    <span className="text-xs text-muted-foreground tracking-wider">{project.year}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  <span className="text-xs text-muted-foreground tracking-wider mt-1">
                    {project.location}, Melbourne
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 border-t border-border text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Have a project in <span className="italic text-accent">mind?</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-10">
            We'd love to discuss how we can bring your vision to life with precision and quality.
          </p>
          <Link href="/contact">
            <button className="inline-flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.12em] uppercase bg-accent text-accent-foreground px-10 py-4 hover:bg-accent/90 transition-colors duration-300">
              Get in Touch <ArrowRight size={14} />
            </button>
          </Link>
        </motion.div>
      </section>
    </PageWrapper>
  );
}
