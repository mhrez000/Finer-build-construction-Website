import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CoverflowCarousel } from "@/components/CoverflowCarousel";
import { useSheetProjects } from "@/hooks/useSheetProjects";

export default function Projects() {
  const { projects } = useSheetProjects();

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
        <CoverflowCarousel items={projects} />
      </section>
    </PageWrapper>
  );
}
