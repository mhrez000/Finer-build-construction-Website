import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <span className="font-serif text-2xl tracking-[0.08em] text-foreground">
              FINER<span className="text-accent">.</span>BUILD
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Premium residential framing and construction across Greater Melbourne.
              Building your vision with precision, one frame at a time.
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-[0.6rem] font-semibold tracking-[0.25em] uppercase text-accent mb-2">
              Navigate
            </h4>
            {[
              { href: "/", label: "Home" },
              { href: "/projects", label: "Projects" },
              { href: "/services", label: "Services" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Services */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="text-[0.6rem] font-semibold tracking-[0.25em] uppercase text-accent mb-2">
              Services
            </h4>
            {[
              "Stick Built Framing",
              "Pre-Fab Framing",
              "Renovations",
              "Decking & Pergolas",
              "Material Supply",
            ].map((svc) => (
              <span key={svc} className="text-sm text-muted-foreground">
                {svc}
              </span>
            ))}
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="text-[0.6rem] font-semibold tracking-[0.25em] uppercase text-accent mb-2">
              Contact
            </h4>
            <a
              href="tel:0400000000"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
            >
              0400 000 000
            </a>
            <a
              href="mailto:info@finerbuild.com.au"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
            >
              info@finerbuild.com.au
            </a>
            <span className="text-sm text-muted-foreground mt-2">
              Greater Melbourne & Surrounds
              <br />
              Mon-Fri: 7am - 5pm
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/60 tracking-wider">
            &copy; {new Date().getFullYear()} Finer Build Construction. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="text-xs text-muted-foreground/60 hover:text-foreground cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="text-xs text-muted-foreground/60 hover:text-foreground cursor-pointer transition-colors">
              Terms of Service
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-xs text-muted-foreground/60 hover:text-accent transition-colors"
            >
              Back to Top <ArrowUpRight size={10} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
