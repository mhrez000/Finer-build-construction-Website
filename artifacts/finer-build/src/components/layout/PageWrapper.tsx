import { motion } from "framer-motion";
import { ReactNode, useEffect } from "react";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

export function PageWrapper({ children, className = "" }: { children: ReactNode, className?: string }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col relative ${className}`}>
      <Navigation />
      <motion.main
        className="flex-grow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}
