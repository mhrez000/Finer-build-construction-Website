import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CoverflowCarousel } from "@/components/CoverflowCarousel";

const B = import.meta.env.BASE_URL;

const PROJECTS = [
  {
    title: "Deck & Pergola",
    description: "Stunning outdoor entertainment spaces built from premium hardwood decking, creating seamless indoor-outdoor flow. Custom seating, structural timber pergolas, and marine-grade fixings throughout.",
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
    description: "Full interior renovations and structural updates of heritage-listed terrace and family homes, blending classic character with modern luxury living through bespoke joinery and finishing.",
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
    title: "Bondi Extension",
    description: "Two-storey residential extension increasing living space by 60sqm. Complex stick framing required to integrate with the existing 1920s structure seamlessly.",
    category: "Extension",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop"],
  },
  {
    title: "Double Bay New Build",
    description: "Custom stick-framed 4-bedroom family home featuring complex architectural rooflines, exposed structural beams, and extensive bespoke joinery framing.",
    category: "New Build",
    images: ["https://images.unsplash.com/photo-1541888081696-2713f0190ce2?q=80&w=2952&auto=format&fit=crop"],
  },
  {
    title: "Neutral Bay Prefab Frame",
    description: "Rapid pre-fab frame installation for a multi-unit luxury development, cutting framing schedule by 30% while maintaining absolute precision.",
    category: "Pre-Fab Framing",
    images: ["https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2831&auto=format&fit=crop"],
  },
  {
    title: "Kirribilli Pergola",
    description: "Elegant freestanding structural pergola for an outdoor dining area, featuring precision-cut joints and marine-grade fixings suited for the harbour environment.",
    category: "Outdoor Living",
    images: ["https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2940&auto=format&fit=crop"],
  },
];

export default function Projects() {
  return (
    <PageWrapper>
      <section className="pt-20 pb-12 md:pb-24 border-b border-border">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <SectionLabel>Portfolio</SectionLabel>
            <h1 className="text-5xl md:text-7xl font-serif leading-[1.1]">
              Selected <span className="italic text-accent">Works.</span>
            </h1>
          </div>
          <p className="max-w-md text-muted-foreground">
            A curated selection of our finest residential projects across Greater Melbourne, showcasing our commitment to architectural precision.
          </p>
        </div>
      </section>

      <section className="section-padding overflow-hidden">
        <CoverflowCarousel items={PROJECTS} />
      </section>
    </PageWrapper>
  );
}
