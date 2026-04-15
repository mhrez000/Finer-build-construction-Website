import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/button";
import { SpinningBorder } from "@/components/ui/SpinningBorder";
import { ProjectCard } from "@/components/ProjectCard";
import { HouseFrameBuilder } from "@/components/HouseFrameBuilder";
import { CoverflowCarousel } from "@/components/CoverflowCarousel";
import { Link } from "wouter";

const FEATURED_PROJECTS = [
  {
    title: "Hawthorne Deck & Pergola",
    description: "A stunning outdoor entertainment space built from premium hardwood decking, creating a seamless indoor-outdoor flow.",
    category: "Outdoor Living",
    image: "https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?q=80&w=2940&auto=format&fit=crop",
  },
  {
    title: "Mosman Renovation",
    description: "Full interior renovation and structural update of a heritage-listed terrace home, blending classic character with modern luxury.",
    category: "Renovation",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2950&auto=format&fit=crop",
  },
  {
    title: "Double Bay New Build",
    description: "Custom stick-framed 4-bedroom family home featuring complex architectural rooflines and extensive bespoke joinery.",
    category: "New Build",
    image: "https://images.unsplash.com/photo-1541888081696-2713f0190ce2?q=80&w=2952&auto=format&fit=crop",
  },
  {
    title: "Bondi Extension",
    description: "Two-storey residential extension increasing living space by 60sqm with complex stick framing integrating seamlessly with the 1920s structure.",
    category: "Extension",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop",
  },
  {
    title: "Neutral Bay Prefab Frame",
    description: "Rapid pre-fab frame installation for a multi-unit luxury development, cutting framing schedule by 30% while maintaining absolute precision.",
    category: "Pre-Fab Framing",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2831&auto=format&fit=crop",
  },
];
import { motion, type Variants } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Ruler, Home as HomeIcon, Hammer, Wrench } from "lucide-react";

// -------------------------------------------------------------
// Shared animation variants
// -------------------------------------------------------------
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
};

const fadeUpSmall: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export default function Home() {
  return (
    <PageWrapper className="pt-0 md:pt-0">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          {/* landing page hero modern architectural home construction */}
          <motion.img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop"
            alt="Modern construction"
            className="w-full h-full object-cover grayscale opacity-40"
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.2, ease: EASE }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
          <span className="vertical-text absolute top-1/2 -translate-y-1/2 right-8 text-[0.6rem] tracking-[0.3em] uppercase text-foreground/30 font-semibold hidden lg:block">
            Finer Build / Carpentry
          </span>
        </div>

        <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full relative z-10">
          <motion.div
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeUpSmall}>
              <SectionLabel>Melbourne, Australia</SectionLabel>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-serif text-foreground leading-[1.1] mb-8"
            >
              Crafting Homes.<br />
              <span className="italic text-accent">Defining</span><br />
              Excellence.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-muted-foreground mb-12 max-w-xl font-light"
            >
              Premium residential construction, renovations, and architectural framing built on a foundation of unyielding precision.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-6">
              <Link href="/contact">
                <SpinningBorder>
                  <Button variant="gold" size="lg">Request a Quote</Button>
                </SpinningBorder>
              </Link>
              <Link href="/projects">
                <Button variant="outline" size="lg">View Portfolio</Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-12 border-y border-border bg-background">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            {[
              { icon: ShieldCheck, label: "Fully Licensed", sub: "VIC Carpenter" },
              { icon: CheckCircle2, label: "Fully Insured", sub: "Comprehensive coverage" },
              { icon: Ruler, label: "10+ Years", sub: "Industry experience" },
              { icon: HomeIcon, label: "Australian Standards", sub: "Exceeding requirements" }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUpSmall}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="flex flex-col items-center text-center gap-3"
              >
                <item.icon className="w-8 h-8 text-accent mb-2" strokeWidth={1.5} />
                <span className="text-sm font-semibold tracking-widest uppercase">{item.label}</span>
                <span className="text-xs text-muted-foreground">{item.sub}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Intro / Services Teaser */}
      <section className="section-padding">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <motion.div
            className="lg:col-span-5 flex flex-col justify-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={fadeUpSmall}>
              <SectionLabel>Our Expertise</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl font-serif mb-8 text-balance"
            >
              Mastering the art of residential construction.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground leading-relaxed mb-10"
            >
              From structural timber framing to exquisite outdoor living spaces, Finer Build delivers architectural visions with uncompromising quality. We specialize in bespoke residential projects across Greater Melbourne, ensuring every stud, joist, and fixture meets our exacting standards.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/services" className="w-fit">
                <Button variant="outline" className="gap-2">
                  All Services <ArrowRight size={16} />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-border"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            {[
              { icon: Hammer, title: "Stick Built Framing", desc: "Custom on-site structural framing." },
              { icon: Wrench, title: "Pre-Fab Framing", desc: "Efficient, precision off-site manufacture." },
              { icon: HomeIcon, title: "Renovations", desc: "Transforming existing residential spaces." },
              { icon: Ruler, title: "Decks & Pergolas", desc: "Premium outdoor entertainment areas." }
            ].map((srv, i) => (
              <motion.div
                key={i}
                variants={fadeUpSmall}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="bg-background p-10 lg:p-12 group hover:bg-muted/30 transition-colors duration-500 cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: -6, scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 300, damping: 14 }}
                  className="inline-block"
                >
                  <srv.icon className="w-10 h-10 text-muted-foreground group-hover:text-accent transition-colors duration-500 mb-6" strokeWidth={1} />
                </motion.div>
                <h3 className="text-xl font-serif mb-4">{srv.title}</h3>
                <p className="text-sm text-muted-foreground">{srv.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* The Craft — animated house frame builder */}
      <section className="section-padding border-t border-border bg-muted/20">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <motion.div
            className="max-w-2xl mb-16 md:mb-20"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.div variants={fadeUpSmall}>
              <SectionLabel>The Craft</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-balance mb-6"
            >
              Precision, from foundation to ridge beam.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground leading-relaxed max-w-xl"
            >
              Every Finer Build home begins the same way: a poured foundation, measured twice. Then stud by stud, plate by plate, rafter by rafter, the structure rises — each member true, square, and engineered to outlast the brief.
            </motion.p>
          </motion.div>

          <motion.div
            className="relative mx-auto max-w-5xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.0, ease: EASE }}
          >
            <HouseFrameBuilder />
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            {[
              { value: "150+", label: "Homes Framed" },
              { value: "10yr", label: "Workmanship" },
              { value: "100%", label: "On Schedule" },
              { value: "AS1684", label: "Compliant" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeUpSmall}
                className="flex flex-col items-center text-center gap-2 border-l border-accent/30 pl-6 first:border-l-0 md:border-l"
              >
                <span className="text-3xl md:text-4xl font-serif text-accent">{stat.value}</span>
                <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Projects — Coverflow Carousel */}
      <section className="section-padding bg-foreground text-background overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <motion.div
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.div variants={fadeUp} className="max-w-2xl">
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  className="h-[1px] bg-accent"
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
                />
                <span className="text-[0.65rem] font-bold tracking-[0.3em] uppercase text-muted">Portfolio</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-background">Selected Works</h2>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Link href="/projects">
                <Button variant="outline" className="border-background/20 text-background hover:bg-background hover:text-foreground">
                  View All Projects
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <CoverflowCarousel items={FEATURED_PROJECTS} />
      </section>

      {/* Testimonial */}
      <section className="section-padding">
        <motion.div
          className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col items-center text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.div variants={fadeUpSmall}>
            <SectionLabel className="justify-center">Client Words</SectionLabel>
          </motion.div>
          <div className="max-w-4xl mx-auto">
            <motion.p
              variants={fadeUp}
              className="text-2xl md:text-4xl font-serif leading-snug mb-10"
            >
              "The attention to detail Finer Build brought to our renovation was extraordinary. Their team's craftsmanship turned our architectural plans into a reality that exceeded our expectations."
            </motion.p>
            <motion.div variants={fadeUpSmall} className="flex flex-col items-center gap-2">
              <span className="text-sm font-semibold tracking-widest uppercase">Sarah & James T.</span>
              <span className="text-xs text-accent">Mosman Residence</span>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </PageWrapper>
  );
}
