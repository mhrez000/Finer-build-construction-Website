import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const SERVICES = [
  {
    title: "Stick Built Framing",
    description: "The traditional method of constructing homes piece by piece on site. Ideal for custom architectural designs with unique structural requirements, complex rooflines, or difficult site access. Our carpenters are masters of precision timber framing.",
    image: "https://images.unsplash.com/photo-1541888081696-2713f0190ce2?q=80&w=2952&auto=format&fit=crop",
    features: ["Custom rooflines", "Complex geometry", "Heritage integration", "On-site precision"],
  },
  {
    title: "Pre-Fab Framing",
    description: "Managing the rapid installation of off-site manufactured frames and trusses. Consistent quality in a controlled environment with significantly reduced on-site construction time — perfect for modern residential developments.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2831&auto=format&fit=crop",
    features: ["30% faster build", "Quality controlled", "Cost efficient", "Multi-unit capable"],
  },
  {
    title: "Renovations",
    description: "Breathing new life into existing spaces. From single-room updates to full home transformations and structural extensions. We navigate the complexities of joining new construction with old, respecting heritage while introducing modern luxury.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2940&auto=format&fit=crop",
    features: ["Structural updates", "Heritage respect", "Modern integration", "Full transformations"],
  },
  {
    title: "Decking & Pergolas",
    description: "Designing and constructing durable, aesthetic outdoor living spaces perfectly suited for the Australian climate. We work with premium hardwoods, composite materials, and structural timber to create seamless extensions of your home.",
    image: "https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?q=80&w=2940&auto=format&fit=crop",
    features: ["Premium hardwood", "Climate resistant", "Custom design", "Indoor-outdoor flow"],
  },
  {
    title: "Material Supply",
    description: "Leveraging our industry relationships to source and supply high-quality construction materials. All materials are fully compliant with stringent Australian building standards, ensuring structural integrity and longevity.",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2940&auto=format&fit=crop",
    features: ["AS-compliant", "Trade pricing", "Direct delivery", "Quality guaranteed"],
  },
];

export default function Services() {
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
            <SectionLabel>Services</SectionLabel>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.05] max-w-5xl">
              Comprehensive building
              <span className="italic text-accent"> solutions.</span>
            </h1>
            <p className="max-w-lg text-muted-foreground text-lg mt-6">
              From structural framing to finished outdoor spaces, we deliver end-to-end
              construction excellence for residential projects across Melbourne.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <div className="border-t border-border">
        {SERVICES.map((service, index) => (
          <section key={index} className="border-b border-border">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
              <div
                className={`flex flex-col ${
                  index % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"
                } gap-12 lg:gap-20 items-center`}
              >
                {/* Image */}
                <motion.div
                  className="w-full lg:w-1/2"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="cinematic-image-container aspect-[4/3] w-full">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="cinematic-image"
                      loading="lazy"
                    />
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  className="w-full lg:w-1/2 flex flex-col justify-center"
                  initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  <span className="text-6xl font-serif text-accent/20 mb-4">
                    0{index + 1}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-serif mb-6">{service.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {service.description}
                  </p>

                  {/* Feature tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.features.map((feat) => (
                      <span
                        key={feat}
                        className="text-[0.6rem] font-semibold tracking-[0.15em] uppercase px-4 py-2 border border-border text-muted-foreground"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>

                  <Link href="/contact" className="w-fit">
                    <button className="flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-foreground border-b border-foreground/30 pb-2 hover:border-accent hover:text-accent transition-colors duration-300">
                      Enquire <ArrowRight size={12} />
                    </button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="py-24 md:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Need something <span className="italic text-accent">custom?</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-10">
            We handle a wide variety of bespoke residential construction requirements.
            Contact us to discuss your specific project needs.
          </p>
          <Link href="/contact">
            <button className="inline-flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.12em] uppercase bg-accent text-accent-foreground px-10 py-4 hover:bg-accent/90 transition-colors duration-300">
              Contact Us <ArrowRight size={14} />
            </button>
          </Link>
        </motion.div>
      </section>
    </PageWrapper>
  );
}
