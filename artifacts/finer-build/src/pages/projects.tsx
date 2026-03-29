import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectCard } from "@/components/ProjectCard";

const PROJECTS = [
  {
    title: "Hawthorne Deck & Pergola",
    description: "A stunning outdoor entertainment space built from premium hardwood decking, creating a seamless indoor-outdoor flow. Includes custom seating and a structural timber pergola.",
    category: "Outdoor Living",
    image: "https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?q=80&w=2940&auto=format&fit=crop"
  },
  {
    title: "Bondi Extension",
    description: "Two-storey residential extension increasing living space by 60sqm. Complex stick framing required to integrate with the existing 1920s structure seamlessly.",
    category: "Extension",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop"
  },
  {
    title: "Mosman Renovation",
    description: "Full interior renovation and structural update of a heritage-listed terrace home, blending classic character with modern luxury living.",
    category: "Renovation",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2950&auto=format&fit=crop"
  },
  {
    title: "Double Bay New Build",
    description: "Custom stick-framed 4-bedroom family home featuring complex architectural rooflines, exposed structural beams, and extensive bespoke joinery framing.",
    category: "New Build",
    image: "https://images.unsplash.com/photo-1541888081696-2713f0190ce2?q=80&w=2952&auto=format&fit=crop"
  },
  {
    title: "Neutral Bay Prefab Frame",
    description: "Rapid pre-fab frame installation for a multi-unit luxury development, cutting framing schedule by 30% while maintaining absolute precision.",
    category: "Pre-Fab Framing",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2831&auto=format&fit=crop"
  },
  {
    title: "Kirribilli Pergola",
    description: "Elegant freestanding structural pergola for an outdoor dining area, featuring precision-cut joints and marine-grade fixings suited for the harbour environment.",
    category: "Outdoor Living",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2940&auto=format&fit=crop"
  }
];

export default function Projects() {
  return (
    <PageWrapper>
      <section className="pt-20 pb-12 md:pb-24 border-b border-border">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <SectionLabel>Portfolio</SectionLabel>
            <h1 className="text-5xl md:text-7xl font-serif leading-[1.1]">
              Selected <span className="italic text-muted-foreground">Works.</span>
            </h1>
          </div>
          <p className="max-w-md text-muted-foreground">
            A curated selection of our finest residential projects across Greater Melbourne, showcasing our commitment to architectural precision.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-12">
            {PROJECTS.map((project, idx) => (
              <ProjectCard 
                key={idx}
                title={project.title}
                description={project.description}
                category={project.category}
                imageUrl={project.image}
              />
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
