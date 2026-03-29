import { motion } from "framer-motion";
import { ReactNode, useEffect } from "react";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

export function PageWrapper({ children, className = "" }: { children: ReactNode, className?: string }) {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col relative ${className}`}>
      <Navigation />
      <motion.main 
        className="flex-grow pt-24 md:pt-32"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}
