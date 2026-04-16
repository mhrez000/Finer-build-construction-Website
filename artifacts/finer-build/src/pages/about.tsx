import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SpinningBorder } from "@/components/ui/SpinningBorder";

export default function About() {
  return (
    <PageWrapper>
      {/* Header */}
      <section className="pt-20 pb-12 md:pb-24 border-b border-border">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <SectionLabel>Our Story</SectionLabel>
          <h1 className="text-5xl md:text-7xl font-serif max-w-4xl leading-[1.1]">
            Built on a foundation of <span className="italic text-accent">trust</span> and craftsmanship.
          </h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="cinematic-image-container aspect-[3/4] w-full max-w-xl relative">
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2940&auto=format&fit=crop"
              alt="Carpenter working"
              className="cinematic-image"
            />
            <span className="vertical-text absolute top-1/2 -translate-y-1/2 right-4 text-[0.6rem] tracking-[0.3em] uppercase text-background/50 font-semibold hidden md:block">
              Finer Build Construction / Est. 2014
            </span>
          </div>
          
          <div className="flex flex-col justify-center max-w-xl">
            <h2 className="text-3xl md:text-4xl font-serif mb-8">Over a decade of redefining residential spaces in Melbourne.</h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="drop-cap">
                Finer Build Construction was founded with a singular vision: to bring unparalleled precision and structural integrity to the residential carpentry sector. Based in Greater Melbourne, we have spent over 10 years mastering the complexities of modern framing, renovations, and outdoor construction.
              </p>
              <p>
                We believe that the unseen elements of a home—the studs, the joists, the structural beams—are just as critical as the final finishes. A truly luxurious home requires a perfect skeleton.
              </p>
              <p>
                Whether it's complex stick-built framing for an architectural new build, managing efficient pre-fab installations, or crafting bespoke hardwood decking, our team operates with a commitment to excellence that ensures every project stands the test of time.
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-8">
              <div>
                <span className="block text-4xl font-serif text-accent mb-2">10+</span>
                <span className="text-xs font-semibold tracking-widest uppercase">Years Experience</span>
              </div>
              <div>
                <span className="block text-4xl font-serif text-accent mb-2">150+</span>
                <span className="text-xs font-semibold tracking-widest uppercase">Projects Completed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30 border-y border-border">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 text-center max-w-4xl">
          <SectionLabel className="justify-center">Our Values</SectionLabel>
          <h2 className="text-3xl md:text-5xl font-serif mb-16">Precision, Reliability, Quality.</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <div>
              <h3 className="text-xl font-serif mb-4">Precision</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Every measurement, every cut, every joint matters. We build to exact specifications, ensuring structural perfection.</p>
            </div>
            <div>
              <h3 className="text-xl font-serif mb-4">Reliability</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">We respect timelines and budgets. When we say we will deliver, we execute with transparent communication throughout.</p>
            </div>
            <div>
              <h3 className="text-xl font-serif mb-4">Quality</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">We source premium materials and employ skilled tradespeople to ensure our work exceeds Australian building standards.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 text-center">
        <h2 className="text-3xl md:text-4xl font-serif mb-8">Ready to discuss your vision?</h2>
        <Link href="/contact">
          <SpinningBorder>
            <Button variant="gold" size="lg">Start a Conversation</Button>
          </SpinningBorder>
        </Link>
      </section>
    </PageWrapper>
  );
}
