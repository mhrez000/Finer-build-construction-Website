import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const B = import.meta.env.BASE_URL;

const SERVICES = [
  {
    title: "Material Supply",
    description: "We source and supply premium construction materials directly to your site — from certified structural timber and engineered beams to premium hardwood decking, fixings, and hardware. Our established industry relationships mean trade-competitive pricing, reliable availability, and every material fully compliant with Australian building standards.",
    image: `${B}services/material-supply/Materialsupplyimage.png`,
  },
  {
    title: "Stick Built Framing",
    description: "The traditional method of constructing homes piece by piece on site. Ideal for custom architectural designs with unique structural requirements, complex rooflines, or difficult site access. Our carpenters are masters of precision timber framing.",
    image: `${B}projects/new-build/Finer Build.jpg`,
  },
  {
    title: "Pre-Fab Framing",
    description: "Managing the rapid installation of off-site manufactured frames and trusses. This method ensures consistent quality in a controlled environment and significantly reduces on-site construction time, perfect for modern residential developments.",
    image: `${B}services/prefab-framing/Prefabframingimage.png`,
  },
  {
    title: "Renovations",
    description: "Breathing new life into existing spaces. From single-room updates to full home transformations and structural extensions. We navigate the complexities of joining new construction with old, respecting heritage while introducing modern luxury.",
    image: `${B}projects/renovation/IMG_3376.jpg`,
  },
  {
    title: "Decking & Pergolas",
    description: "Designing and constructing durable, aesthetic outdoor living spaces perfectly suited for the Australian climate. We work with premium hardwoods, composite materials, and structural timber to create seamless indoor-outdoor extensions of your home.",
    image: `${B}projects/deck/IMG_0412.jpg`,
  },
];

export default function Services() {
  return (
    <PageWrapper>
      <section className="pt-20 pb-12 md:pb-24 border-b border-border">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <SectionLabel>Capabilities</SectionLabel>
          <h1 className="text-5xl md:text-7xl font-serif max-w-4xl leading-[1.1]">
            Comprehensive residential <span className="italic text-accent">carpentry solutions.</span>
          </h1>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-12 md:py-24 flex flex-col gap-24 md:gap-40">
        {SERVICES.map((service, index) => (
          <div key={index} className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 items-center`}>
            <div className="w-full lg:w-1/2">
              <div className="cinematic-image-container aspect-[4/3] w-full">
                <img
                  src={service.image}
                  alt={service.title}
                  className="cinematic-image"
                />
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <span className="text-accent font-serif text-2xl mb-4 italic">0{index + 1}.</span>
              <h2 className="text-3xl md:text-5xl font-serif mb-6">{service.title}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-xl">
                {service.description}
              </p>
              <Link href="/contact" className="w-fit">
                <Button className="rounded-full px-7">Enquire about this service</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <section className="py-32 text-center bg-muted/30 border-t border-border">
        <h2 className="text-3xl md:text-4xl font-serif mb-8">Looking for something custom?</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-10">
          We handle a wide variety of bespoke residential carpentry requirements. Contact us to discuss your specific project needs.
        </p>
        <Link href="/contact">
          <Button size="lg" className="rounded-full px-8">Contact Us</Button>
        </Link>
      </section>
    </PageWrapper>
  );
}
