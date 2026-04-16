import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/button";
import { HouseFrameBuilder } from "@/components/HouseFrameBuilder";
import { CoverflowCarousel } from "@/components/CoverflowCarousel";
import { Link } from "wouter";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Ruler, Home as HomeIcon, Hammer, Wrench } from "lucide-react";

// -------------------------------------------------------------
// Data
// -------------------------------------------------------------
const B = import.meta.env.BASE_URL;

const FEATURED_PROJECTS = [
  {
    title: "Deck & Pergola",
    description: "Custom hardwood decks and structural pergolas built across Melbourne — premium materials, precision joinery, designed for the Australian climate.",
    category: "Outdoor Living",
    images: [
      `${B}projects/deck/IMG_0412.jpg`,
      `${B}projects/deck/IMG_0563.jpg`,
      `${B}projects/deck/IMG_0570.jpg`,
      `${B}projects/deck/IMG_1842.jpg`,
      `${B}projects/deck/IMG_2239.jpg`,
      `${B}projects/deck/IMG_2521.jpg`,
      `${B}projects/deck/IMG_9710.jpg`,
      `${B}projects/deck/IMG_9747.jpg`,
    ],
  },
  {
    title: "Renovation",
    description: "Full interior renovations and structural updates — blending heritage character with modern luxury through careful framing, joinery, and finishing.",
    category: "Renovation",
    images: [
      `${B}projects/renovation/IMG_3376.jpg`,
      `${B}projects/renovation/IMG_3381.jpg`,
      `${B}projects/renovation/IMG_3421.jpg`,
      `${B}projects/renovation/IMG_3798.jpg`,
      `${B}projects/renovation/IMG_3799.jpg`,
      `${B}projects/renovation/IMG_4302.jpg`,
      `${B}projects/renovation/IMG_4304.jpg`,
      `${B}projects/renovation/0b955fc1-5235-4ee2-9402-7d91d0ad5377.jpg`,
      `${B}projects/renovation/6efc76da-2f95-4d23-9e3d-576362db9df5.jpg`,
      `${B}projects/renovation/F90E2B8B-C1D8-429E-A24C-773CB2C6D2F6.jpg`,
      `${B}projects/renovation/a27e338d-e945-4938-83a7-e92ac338536b.jpg`,
      `${B}projects/renovation/a97f17bf-ecd2-4135-a308-b4c05171ff04.jpg`,
    ],
  },
  {
    title: "New Build",
    description: "Custom stick-framed family homes featuring complex architectural rooflines, exposed structural beams, and extensive bespoke joinery throughout.",
    category: "New Build",
    images: [
      `${B}projects/new-build/Finer Build.jpg`,
      `${B}projects/new-build/Finer Build(2).jpg`,
      `${B}projects/new-build/Finer Build(7).jpg`,
    ],
  },
  {
    title: "New Home",
    description: "Modern residential homes designed and framed by Finer Build — every stud, joist, and roof line crafted to architectural precision.",
    category: "New Home",
    images: [
      `${B}projects/new-home/New Home.jpg`,
      `${B}projects/new-home/New Home(1).jpg`,
      `${B}projects/new-home/New Home(2).jpg`,
      `${B}projects/new-home/New Home(3).jpg`,
    ],
  },
];

const INCLUSIONS = [
  "Engineered timber framing to AS1684 standards",
  "Premium hardwood decking and joinery",
  "Architectural roofline detailing",
  "Bespoke window and door installations",
  "Heritage-sensitive renovation framing",
  "Structural beam and column work",
  "Pre-fab and stick-built integration",
  "Marine-grade outdoor structures",
];

// -------------------------------------------------------------
// Animation variants
// -------------------------------------------------------------
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const fadeUpSmall: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function Home() {
  return (
    <PageWrapper className="pt-0 md:pt-0">
      {/* ── Hero Card ────────────────────────────────────────── */}
      <section className="pt-32 md:pt-36 pb-12 md:pb-20">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-foreground text-background min-h-[600px] md:min-h-[680px]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: EASE }}
          >
            {/* Full-width background video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster={`${import.meta.env.BASE_URL}hero-poster.jpg`}
              className="absolute inset-0 w-full h-full object-cover"
              aria-hidden="true"
            >
              <source
                src={`${import.meta.env.BASE_URL}hero-video.mp4`}
                type="video/mp4"
              />
              {/* Fallback image if video doesn't load */}
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop"
                alt="Modern home construction"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </video>

            {/* Dark overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/60 to-foreground/20 lg:from-foreground/85 lg:via-foreground/40 lg:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-foreground/30" />

            {/* Text content overlay — split top/bottom around the video logo */}
            <motion.div
              className="relative z-10 flex flex-col justify-between px-10 md:px-16 lg:px-20 pt-6 md:pt-8 lg:pt-10 pb-10 md:pb-16 lg:pb-20 min-h-[600px] md:min-h-[680px]"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {/* Top group: chip + headline (above the video logo) */}
              <div className="max-w-md md:max-w-lg lg:max-w-xl">
                <motion.div variants={fadeUpSmall} className="mb-8 md:mb-10">
                  <span className="inline-block text-[0.65rem] font-semibold tracking-[0.3em] uppercase text-accent border border-accent/40 rounded-full px-4 py-2">
                    Crafting Tomorrow's Living Spaces
                  </span>
                </motion.div>
                <motion.h1
                  variants={fadeUp}
                  className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif leading-[1.05]"
                >
                  Set New Standards<br />
                  in <span className="italic text-accent">Modern</span><br />
                  Home Construction
                </motion.h1>
              </div>

              {/* Bottom group: description + buttons (below the video logo) */}
              <div className="max-w-md md:max-w-lg lg:max-w-xl">
                <motion.p
                  variants={fadeUp}
                  className="text-base md:text-lg text-background/80 max-w-md mb-8 leading-relaxed"
                >
                  Premium residential carpentry, renovations, and architectural framing — built across Greater Melbourne with unyielding precision.
                </motion.p>
                <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                  <Link href="/contact">
                    <Button
                      size="default"
                      className="rounded-full bg-black text-background hover:bg-black/80 px-7"
                    >
                      Get in touch
                    </Button>
                  </Link>
                  <Link href="/projects">
                    <Button
                      variant="outline"
                      size="default"
                      className="rounded-full border-background/30 text-background hover:bg-background hover:text-foreground px-7"
                    >
                      View Portfolio
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Trust Signals ────────────────────────────────────── */}
      <section className="py-12">
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
              { icon: HomeIcon, label: "Australian Standards", sub: "Exceeding requirements" },
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

      {/* ── Dream / Build — three-column centerpiece ─────────── */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-12 gap-6 md:gap-10 items-center">
            {/* Left flanking image */}
            <motion.div
              className="col-span-12 md:col-span-3 lg:col-span-3"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.0, ease: EASE }}
            >
              <div className="rounded-2xl overflow-hidden aspect-[4/5]">
                <img
                  src={`${import.meta.env.BASE_URL}Home-screen1.jpg`}
                  alt="Modern Finer Build home"
                  className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Center text */}
            <motion.div
              className="col-span-12 md:col-span-6 lg:col-span-6 text-center px-4 md:px-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <motion.div
                variants={fadeUpSmall}
                className="flex justify-center mb-6"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
                  <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
                </svg>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-5xl lg:text-6xl font-serif leading-[1.1] mb-8 text-balance"
              >
                If you can <span className="italic text-accent">dream it</span>, we can <span className="italic text-accent">build it</span>.
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-muted-foreground leading-relaxed max-w-xl mx-auto mb-10"
              >
                We adopt a uniquely personalized perspective to each project to deliver stunning aspects of optimal function. Renowned for our architectural understanding and masterful craftsmanship, our portfolio of residential projects reflects this commitment.
              </motion.p>

              <motion.div variants={fadeUp}>
                <Link href="/contact">
                  <Button
                    size="default"
                    className="rounded-full px-7"
                  >
                    Get in touch
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right flanking image */}
            <motion.div
              className="col-span-12 md:col-span-3 lg:col-span-3"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.0, ease: EASE }}
            >
              <div className="rounded-2xl overflow-hidden aspect-[4/5]">
                <img
                  src={`${import.meta.env.BASE_URL}Homescreen2.jpg`}
                  alt="Finer Build modern home detail"
                  className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-105"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Our Timeless Inclusions — wide dark card ─────────── */}
      <section className="py-12 md:py-20">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-foreground text-background"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.0, ease: EASE }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px] md:min-h-[500px]">
              {/* Left — text */}
              <div className="flex flex-col justify-center p-10 md:p-16 lg:p-20">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, ease: EASE }}
                  className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] mb-6"
                >
                  Our timeless <span className="italic text-accent">inclusions</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
                  className="text-background/70 leading-relaxed mb-8 max-w-md"
                >
                  We've been crafting Melbourne homes our clients are thrilled to call their own. Defining them with bespoke joinery, finishes, accessories and accents.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-10 max-w-md"
                >
                  {INCLUSIONS.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-background/80">
                      <span className="text-accent mt-1">›</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
                >
                  <Link href="/services">
                    <Button
                      size="default"
                      className="rounded-full bg-black text-background hover:bg-black/80 px-7"
                    >
                      View Inclusions
                    </Button>
                  </Link>
                </motion.div>
              </div>

              {/* Right — image */}
              <motion.div
                className="relative overflow-hidden min-h-[300px] lg:min-h-full"
                initial={{ opacity: 0, scale: 1.05 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}homescreen3.jpg`}
                  alt="Finer Build inclusions"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Services — small card grid ───────────────────────── */}
      <section className="section-padding">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.div variants={fadeUpSmall} className="flex justify-center">
              <SectionLabel className="justify-center">Our Expertise</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-5xl font-serif text-balance"
            >
              Mastering the art of residential <span className="italic text-accent">carpentry</span>.
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              { icon: Hammer, title: "Stick Built Framing", desc: "Custom on-site structural framing." },
              { icon: Wrench, title: "Pre-Fab Framing", desc: "Efficient, precision off-site manufacture." },
              { icon: HomeIcon, title: "Renovations", desc: "Transforming existing residential spaces." },
              { icon: Ruler, title: "Decks & Pergolas", desc: "Premium outdoor entertainment areas." },
            ].map((srv, i) => (
              <motion.div
                key={i}
                variants={fadeUpSmall}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="rounded-2xl bg-muted/30 p-8 group hover:bg-muted/60 transition-colors duration-500"
              >
                <motion.div
                  whileHover={{ rotate: -6, scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 300, damping: 14 }}
                  className="inline-block mb-6"
                >
                  <srv.icon className="w-8 h-8 text-accent" strokeWidth={1.5} />
                </motion.div>
                <h3 className="text-xl font-serif mb-3">{srv.title}</h3>
                <p className="text-sm text-muted-foreground">{srv.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button className="rounded-full gap-2 px-7">
                All Services <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── The Craft — animated house frame builder ─────────── */}
      <section className="py-12 md:py-20">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-muted/40 px-8 md:px-16 py-16 md:py-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.0, ease: EASE }}
          >
            <motion.div
              className="max-w-2xl mb-12 md:mb-16"
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
                className="text-3xl md:text-5xl lg:text-6xl font-serif text-balance mb-6"
              >
                Precision, from foundation to <span className="italic text-accent">ridge beam</span>.
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-muted-foreground leading-relaxed max-w-xl"
              >
                Every Finer Build Construction home begins the same way: a poured foundation, measured twice. Then stud by stud, plate by plate, rafter by rafter, the structure rises — each member true, square, and engineered to outlast the brief.
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
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              {[
                { value: "150+", label: "Homes Framed" },
                { value: "10yr", label: "Workmanship" },
                { value: "100%", label: "On Schedule" },
                { value: "AS1684", label: "Compliant" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={fadeUpSmall}
                  className="flex flex-col items-center text-center gap-2"
                >
                  <span className="text-3xl md:text-4xl font-serif text-accent">{stat.value}</span>
                  <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Projects — Coverflow Carousel ───────────── */}
      <section className="py-12 md:py-20">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-foreground text-background py-16 md:py-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.0, ease: EASE }}
          >
            <div className="px-8 md:px-16 mb-12">
              <motion.div
                className="flex flex-col md:flex-row md:items-end justify-between gap-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
              >
                <motion.div variants={fadeUp} className="max-w-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      className="h-[1px] bg-accent"
                      initial={{ width: 0 }}
                      whileInView={{ width: 48 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
                    />
                    <span className="text-[0.65rem] font-bold tracking-[0.3em] uppercase text-muted">Portfolio</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-serif text-background">
                    Selected <span className="italic text-accent">Works</span>
                  </h2>
                </motion.div>
                <motion.div variants={fadeUp}>
                  <Link href="/projects">
                    <Button
                      size="default"
                      className="rounded-full bg-black text-background hover:bg-black/80 px-7"
                    >
                      View All Projects
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            <CoverflowCarousel items={FEATURED_PROJECTS} />
          </motion.div>
        </div>
      </section>

      {/* ── Testimonial ──────────────────────────────────────── */}
      <section className="py-20 md:py-32">
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
              "The attention to detail Finer Build Construction brought to our renovation was extraordinary. Their team's craftsmanship turned our architectural plans into a reality that <span className="italic text-accent">exceeded</span> our expectations."
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
