import { Link } from "wouter";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="bg-foreground text-background pt-24 pb-12 border-t border-border">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        
        <div className="flex flex-col gap-6 lg:col-span-1">
          <Logo variant="light" size="lg" />
          <p className="text-muted text-sm leading-relaxed max-w-sm">
            Crafting your vision, one frame at a time. Defining excellence in residential carpentry across Greater Melbourne.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-2">Navigation</h4>
          <Link href="/" className="text-muted hover:text-background transition-colors text-sm w-fit">Home</Link>
          <Link href="/about" className="text-muted hover:text-background transition-colors text-sm w-fit">About</Link>
          <Link href="/services" className="text-muted hover:text-background transition-colors text-sm w-fit">Services</Link>
          <Link href="/projects" className="text-muted hover:text-background transition-colors text-sm w-fit">Projects</Link>
          <Link href="/contact" className="text-muted hover:text-background transition-colors text-sm w-fit">Contact</Link>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-2">Services</h4>
          <span className="text-muted text-sm">Stick Built Framing</span>
          <span className="text-muted text-sm">Pre-Fab Framing</span>
          <span className="text-muted text-sm">Decking & Pergolas</span>
          <span className="text-muted text-sm">Renovations</span>
          <span className="text-muted text-sm">Material Supply</span>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-2">Contact</h4>
          <a href="tel:0400000000" className="text-muted hover:text-background transition-colors text-sm w-fit">
            0400 000 000
          </a>
          <a href="mailto:info@finerbuild.com.au" className="text-muted hover:text-background transition-colors text-sm w-fit">
            info@finerbuild.com.au
          </a>
          <span className="text-muted text-sm mt-4">
            Greater Melbourne & Surrounds<br/>
            Mon-Fri: 7am - 5pm
          </span>
        </div>

      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mt-24 pt-8 border-t border-muted/20 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted/60 tracking-wider">
          &copy; {new Date().getFullYear()} Finer Build Construction. All rights reserved.
        </p>
        <div className="flex gap-6">
          <span className="text-xs text-muted/60 hover:text-background cursor-pointer transition-colors">Privacy Policy</span>
          <span className="text-xs text-muted/60 hover:text-background cursor-pointer transition-colors">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}
