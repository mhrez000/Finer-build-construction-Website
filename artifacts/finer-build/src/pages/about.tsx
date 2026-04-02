import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const VALUES = [
  {
    number: "01",
    title: "Precision",
    description: "Every measurement, every cut, every joint matters. We build to exact specifications, ensuring structural perfection from foundation to ridge.",
  },
  {
    number: "02",
    title: "Reliability",
    description: "We respect timelines and budgets. Transparent communication throughout every phase ensures you're never left guessing.",
  },
  {
    number: "03",
    title: "Quality",
    description: "Premium materials, skilled tradespeople, and rigorous standards. Our work doesn't just meet Australian building codes — it exceeds them.",
  },
];

const STATS = [
  { value: "10+", label: "Years in Business" },
  { value: "150+", label: "Projects Delivered" },
  { value: "30+", label: "Skilled Tradespeople" },
  { value: "0", label: "Corners Cut" },
];

export default function About() {
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <SectionLabel>About Us</SectionLabel>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.05] max-w-5xl">
              Built on <span className="italic text-accent">trust</span>, driven by craft.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              className="cinematic-image-container aspect-[3/4] w-full"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2940&auto=format&fit=crop"
                alt="Carpenter at work"
                className="cinematic-image"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif mb-8 leading-snug">
                Over a decade redefining residential spaces in
                <span className="italic text-accent"> Melbourne.</span>
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Finer Build Construction was founded with a singular vision: to bring
                  unparalleled precision and structural integrity to the residential building
                  sector. We believe that the unseen elements of a home — the studs, the joists,
                  the structural beams — are just as critical as the final finishes.
                </p>
                <p>
                  Whether it's complex stick-built framing for an architectural new build,
                  managing efficient pre-fab installations, or crafting bespoke hardwood decking,
                  our team operates with a commitment to excellence that ensures every project
                  stands the test of time.
                </p>
                <p>
                  A truly luxurious home requires a perfect skeleton. That's where we come in.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                className="py-12 md:py-16 flex flex-col items-center text-center border-r border-border last:border-r-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <span className="text-4xl md:text-5xl font-serif text-accent mb-2">
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

      {/* Values */}
      <section className="section-padding">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="mb-16">
            <SectionLabel>Our Values</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-serif">
              What <span className="italic text-accent">drives</span> us.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {VALUES.map((value, i) => (
              <motion.div
                key={i}
                className="bg-background p-8 md:p-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <span className="text-5xl font-serif text-accent/30 mb-6 block">
                  {value.number}
                </span>
                <h3 className="text-2xl font-serif mb-4">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Process Image */}
      <section className="relative py-32 md:py-44 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1541888081696-2713f0190ce2?q=80&w=2952&auto=format&fit=crop"
            alt="Framing construction"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-background/70" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-serif mb-4">
              Ready to discuss your <span className="italic text-accent">vision?</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-10">
              Whether it's a new build, renovation, or outdoor project — we're here to help.
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
