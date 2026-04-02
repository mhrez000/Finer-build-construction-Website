import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
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

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "glass border-b border-border/50 py-4"
            : "bg-transparent py-6"
        )}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <span className="font-serif text-xl md:text-2xl tracking-[0.08em] text-foreground">
              FINER<span className="text-accent">.</span>BUILD
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[0.7rem] font-medium tracking-[0.15em] uppercase transition-colors duration-300 relative group",
                  location === link.href
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300",
                    location === link.href ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            ))}
            <Link href="/contact">
              <button className="ml-4 flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.12em] uppercase bg-accent text-accent-foreground px-6 py-3 hover:bg-accent/90 transition-colors duration-300">
                Get a Quote <ArrowRight size={12} />
              </button>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground p-2 -mr-2 relative z-10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background z-40 flex flex-col justify-center px-8 md:hidden"
          >
            <nav className="flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "text-4xl font-serif tracking-tight transition-colors",
                      location === link.href ? "text-accent" : "text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.08, duration: 0.4 }}
                className="mt-4"
              >
                <Link href="/contact">
                  <button className="flex items-center gap-3 text-sm font-semibold tracking-[0.12em] uppercase bg-accent text-accent-foreground px-8 py-4">
                    Get a Quote <ArrowRight size={14} />
                  </button>
                </Link>
              </motion.div>
            </nav>

            {/* Mobile footer info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-12 left-8 right-8"
            >
              <div className="accent-line mb-6" />
              <p className="text-xs text-muted-foreground tracking-wider">
                Melbourne, Australia
              </p>
              <a href="tel:0400000000" className="text-xs text-muted-foreground tracking-wider hover:text-accent transition-colors">
                0400 000 000
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
