import { Link } from "wouter";
export function Footer() {
  return (
    <footer className="bg-foreground text-background pt-24 pb-12 border-t border-border">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        
        <div className="flex flex-col gap-6 lg:col-span-1">
          <img
            src={`${import.meta.env.BASE_URL}fulllogo_transparent_nobuffer.png`}
            alt="Finer Build Construction"
            className="h-20 md:h-24 w-auto brightness-0 invert"
          />
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
          <a href="tel:0412398388" className="text-muted hover:text-background transition-colors text-sm w-fit">
            0412 398 388
          </a>
          <a href="mailto:info@finerbuild.com.au" className="text-muted hover:text-background transition-colors text-sm w-fit">
            info@finerbuild.com.au
          </a>
          <span className="text-muted text-sm mt-4">
            Greater Melbourne & Surrounds<br/>
            Mon-Fri: 7am - 5pm
          </span>

          {/* Social links */}
          <div className="flex items-center gap-4 mt-6">
            <a
              href="https://www.instagram.com/finerbuildconstruction/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors duration-500"
              aria-label="Follow us on Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/people/Finer-Build-Construction/61579014157616/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors duration-500"
              aria-label="Follow us on Facebook"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mt-24 pt-8 border-t border-muted/20 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted/60 tracking-wider">
          &copy; {new Date().getFullYear()} Finer Build Construction. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/finerbuildconstruction/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted/60 hover:text-accent transition-colors duration-500"
            aria-label="Instagram"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/people/Finer-Build-Construction/61579014157616/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted/60 hover:text-accent transition-colors duration-500"
            aria-label="Facebook"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
