import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
];

export function Navigation() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out border-b border-transparent",
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-border/50 py-0"
            : "bg-transparent py-1"
        )}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="group" aria-label="Finer Build Construction home">
            <img
              src={`${import.meta.env.BASE_URL}fulllogo_transparent_nobuffer.png`}
              alt="Finer Build Construction"
              className="h-20 md:h-24 lg:h-28 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-xs font-semibold tracking-[0.15em] uppercase transition-colors duration-500 hover:text-accent relative",
                  location === link.href ? "text-accent" : "text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="ml-4">
              <Button className="rounded-full px-6">
                Get in touch
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-background z-40 flex flex-col pt-32 px-6 transition-all duration-700 ease-in-out md:hidden",
          mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        <nav className="flex flex-col gap-8 items-center text-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-2xl font-serif tracking-widest uppercase transition-colors",
                location === link.href ? "text-accent" : "text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="w-12 h-[1px] bg-border my-4" />
          <Link href="/contact">
            <Button size="lg" className="rounded-full px-8">
              Get in touch
            </Button>
          </Link>
        </nav>
      </div>
    </>
  );
}
