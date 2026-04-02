import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDownRight, Hammer, Home as HomeIcon, Wrench, Ruler } from "lucide-react";

const FEATURED_PROJECTS = [
  {
    title: "Hawthorne Deck & Pergola",
    description: "Premium hardwood decking with structural timber pergola, creating seamless indoor-outdoor flow.",
    category: "Outdoor Living",
    imageUrl: "https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?q=80&w=2940&auto=format&fit=crop",
  },
  {
    title: "Mosman Heritage Renovation",
    description: "Full structural update of a heritage terrace, blending classic character with modern luxury.",
    category: "Renovation",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2950&auto=format&fit=crop",
  },
  {
    title: "Double Bay New Build",
    description: "Custom stick-framed 4-bedroom home with complex architectural rooflines and exposed beams.",
    category: "New Build",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop",
  },
];

const STATS = [
  { value: "150+", label: "Projects Completed" },
  { value: "10+", label: "Years Experience" },
  { value: "100%", label: "Licensed & Insured" },
  { value: "50+", label: "Happy Clients" },
];

const SERVICES_PREVIEW = [
  { icon: Hammer, title: "Stick Built Framing", desc: "Custom on-site structural framing for unique architectural designs." },
  { icon: Wrench, title: "Pre-Fab Framing", desc: "Precision off-site manufacture with rapid on-site installation." },
  { icon: HomeIcon, title: "Renovations", desc: "Transforming existing spaces with structural expertise." },
  { icon: Ruler, title: "Decks & Pergolas", desc: "Premium outdoor entertainment areas built to last." },
];

export default function Home() {
  return (
    <PageWrapper className="">
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-end pb-16 md:pb-24">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1541888081696-2713f0190ce2?q=80&w=2952&auto=format&fit=crop"
            alt="Construction framing"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 image-overlay" />
          <div className="absolute inset-0 image-overlay-left" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <SectionLabel>Melbourne, Australia</SectionLabel>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.05] mb-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              We Build
              <br />
              <span className="italic text-accent">Exceptional</span>
              <br />
              Frames.
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-lg mb-10 font-light leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Premium residential framing, construction & renovations
              built on precision and uncompromising quality.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Link href="/contact">
                <button className="flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.12em] uppercase bg-accent text-accent-foreground px-8 py-4 hover:bg-accent/90 transition-colors duration-300">
                  Request a Quote <ArrowRight size={14} />
                </button>
              </Link>
              <Link href="/projects">
                <button className="flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.12em] uppercase border border-foreground/30 text-foreground px-8 py-4 hover:border-accent hover:text-accent transition-colors duration-300">
                  View Projects
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 right-10 hidden md:flex items-center gap-3 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <span className="text-[0.6rem] tracking-[0.2em] uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
            >
              <ArrowDownRight size={14} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="border-y border-border bg-card">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                className="py-10 md:py-12 flex flex-col items-center text-center border-r border-border last:border-r-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <span className="text-3xl md:text-4xl font-serif text-accent mb-2">
                  {stat.value}
                </span>
                <span className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT PREVIEW ─── */}
      <section className="section-padding">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image */}
            <motion.div
              className="cinematic-image-container aspect-[4/5] w-full"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2940&auto=format&fit=crop"
                alt="Carpenter at work"
                className="cinematic-image"
              />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <SectionLabel>Who We Are</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-[1.1]">
                Mastering the craft of
                <span className="italic text-accent"> residential framing.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Finer Build Construction delivers architectural visions with uncompromising quality.
                From structural timber framing to exquisite outdoor living spaces, every stud,
                joist, and fixture meets our exacting standards.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-10">
                Based in Greater Melbourne, we've spent over a decade specializing in bespoke
                residential projects — building homes that stand the test of time.
              </p>
              <Link href="/about">
                <button className="flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-foreground border-b border-foreground/30 pb-2 hover:border-accent hover:text-accent transition-colors duration-300">
                  Our Story <ArrowRight size={12} />
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES GRID ─── */}
      <section className="py-24 md:py-32 bg-card border-y border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <SectionLabel>What We Do</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-serif">Our Expertise</h2>
            </div>
            <Link href="/services">
              <button className="flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-muted-foreground hover:text-accent transition-colors duration-300">
                All Services <ArrowRight size={12} />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {SERVICES_PREVIEW.map((srv, i) => (
              <motion.div
                key={i}
                className="bg-card p-8 lg:p-10 group hover:bg-muted/50 transition-all duration-500 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <srv.icon
                  className="w-8 h-8 text-muted-foreground group-hover:text-accent transition-colors duration-500 mb-6"
                  strokeWidth={1}
                />
                <h3 className="text-lg font-serif mb-3 group-hover:text-accent transition-colors duration-500">
                  {srv.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{srv.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROJECTS ─── */}
      <section className="section-padding">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <SectionLabel>Portfolio</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-serif">
                Selected <span className="italic text-accent">Works</span>
              </h2>
            </div>
            <Link href="/projects">
              <button className="flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-muted-foreground hover:text-accent transition-colors duration-300">
                View All Projects <ArrowRight size={12} />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {FEATURED_PROJECTS.map((project, idx) => (
              <ProjectCard
                key={idx}
                title={project.title}
                description={project.description}
                category={project.category}
                imageUrl={project.imageUrl}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── LARGE CTA / TESTIMONIAL ─── */}
      <section className="relative py-32 md:py-44 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2831&auto=format&fit=crop"
            alt="Construction site"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-background/80" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionLabel className="justify-center">Testimonial</SectionLabel>
            <blockquote className="text-2xl md:text-4xl lg:text-5xl font-serif leading-snug max-w-4xl mx-auto mb-10">
              "The attention to detail Finer Build brought to our renovation was
              <span className="italic text-accent"> extraordinary</span>. Their craftsmanship
              turned our plans into reality."
            </blockquote>
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-semibold tracking-[0.15em] uppercase">
                Sarah & James T.
              </span>
              <span className="text-xs text-accent tracking-wider">Mosman Residence</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-serif mb-4">
              Ready to build <span className="italic text-accent">something great?</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-10">
              Let's discuss your next project. We'd love to bring your vision to life.
            </p>
            <Link href="/contact">
              <button className="inline-flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.12em] uppercase bg-accent text-accent-foreground px-10 py-4 hover:bg-accent/90 transition-colors duration-300">
                Start a Conversation <ArrowRight size={14} />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
