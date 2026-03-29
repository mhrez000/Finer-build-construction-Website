import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, ShieldCheck, Ruler, Home as HomeIcon, Hammer, Wrench } from "lucide-react";

export default function Home() {
  return (
    <PageWrapper className="pt-0 md:pt-0">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          {/* landing page hero modern architectural home construction */}
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop" 
            alt="Modern construction" 
            className="w-full h-full object-cover grayscale opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
        </div>

        <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full relative z-10">
          <div className="max-w-3xl">
            <SectionLabel>Melbourne, Australia</SectionLabel>
            <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-serif text-foreground leading-[1.1] mb-8">
              Crafting Homes.<br />
              <span className="text-muted-foreground italic">Defining</span><br />
              Excellence.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-xl font-light">
              Premium residential construction, renovations, and architectural framing built on a foundation of unyielding precision.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link href="/contact">
                <Button variant="gold" size="lg">Request a Quote</Button>
              </Link>
              <Link href="/projects">
                <Button variant="outline" size="lg">View Portfolio</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-12 border-y border-border bg-background">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { icon: ShieldCheck, label: "Fully Licensed", sub: "NSW Builder" },
              { icon: CheckCircle2, label: "Fully Insured", sub: "Comprehensive coverage" },
              { icon: Ruler, label: "10+ Years", sub: "Industry experience" },
              { icon: HomeIcon, label: "Australian Standards", sub: "Exceeding requirements" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                <item.icon className="w-8 h-8 text-accent mb-2" strokeWidth={1.5} />
                <span className="text-sm font-semibold tracking-widest uppercase">{item.label}</span>
                <span className="text-xs text-muted-foreground">{item.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro / Services Teaser */}
      <section className="section-padding">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5 flex flex-col justify-center">
            <SectionLabel>Our Expertise</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 text-balance">
              Mastering the art of residential construction.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10">
              From structural timber framing to exquisite outdoor living spaces, Finer Build delivers architectural visions with uncompromising quality. We specialize in bespoke residential projects across Greater Melbourne, ensuring every stud, joist, and fixture meets our exacting standards.
            </p>
            <Link href="/services" className="w-fit">
              <Button variant="outline" className="gap-2">
                All Services <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
          
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
            {[
              { icon: Hammer, title: "Stick Built Framing", desc: "Custom on-site structural framing." },
              { icon: Wrench, title: "Pre-Fab Framing", desc: "Efficient, precision off-site manufacture." },
              { icon: HomeIcon, title: "Renovations", desc: "Transforming existing residential spaces." },
              { icon: Ruler, title: "Decks & Pergolas", desc: "Premium outdoor entertainment areas." }
            ].map((srv, i) => (
              <div key={i} className="bg-background p-10 lg:p-12 group hover:bg-muted/30 transition-colors duration-500">
                <srv.icon className="w-10 h-10 text-muted-foreground group-hover:text-accent transition-colors duration-500 mb-6" strokeWidth={1} />
                <h3 className="text-xl font-serif mb-4">{srv.title}</h3>
                <p className="text-sm text-muted-foreground">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding bg-foreground text-background">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-12 bg-accent" />
                <span className="text-[0.65rem] font-bold tracking-[0.3em] uppercase text-muted">Portfolio</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-background">Selected Works</h2>
            </div>
            <Link href="/projects">
              <Button variant="outline" className="border-background/20 text-background hover:bg-background hover:text-foreground">
                View All Projects
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <ProjectCard 
              title="Hawthorne Deck & Pergola"
              description="A stunning outdoor entertainment space built from premium hardwood decking, creating a seamless indoor-outdoor flow."
              category="Outdoor Living"
              // outdoor hardwood deck with modern pergola
              imageUrl="https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?q=80&w=2940&auto=format&fit=crop"
            />
            <ProjectCard 
              title="Mosman Renovation"
              description="Full interior renovation and structural update of a heritage-listed terrace home, blending classic character with modern luxury."
              category="Renovation"
              // modern interior renovation home
              imageUrl="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2950&auto=format&fit=crop"
            />
            <ProjectCard 
              title="Double Bay New Build"
              description="Custom stick-framed 4-bedroom family home featuring complex architectural rooflines and extensive bespoke joinery."
              category="New Build"
              // new construction modern timber framing
              imageUrl="https://images.unsplash.com/photo-1541888081696-2713f0190ce2?q=80&w=2952&auto=format&fit=crop"
            />
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section-padding">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col items-center text-center">
          <SectionLabel className="justify-center">Client Words</SectionLabel>
          <div className="max-w-4xl mx-auto">
            <p className="text-2xl md:text-4xl font-serif leading-snug mb-10">
              "The attention to detail Finer Build brought to our renovation was extraordinary. Their team's craftsmanship turned our architectural plans into a reality that exceeded our expectations."
            </p>
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-semibold tracking-widest uppercase">Sarah & James T.</span>
              <span className="text-xs text-accent">Mosman Residence</span>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
