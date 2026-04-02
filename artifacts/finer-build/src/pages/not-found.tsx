import { PageWrapper } from "@/components/layout/PageWrapper";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <PageWrapper>
      <section className="pt-32 md:pt-40 pb-32 flex flex-col items-center justify-center text-center min-h-[60vh]">
        <span className="text-8xl md:text-9xl font-serif text-accent/20 mb-4">404</span>
        <h1 className="text-3xl md:text-4xl font-serif mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-10 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <button className="inline-flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.12em] uppercase bg-accent text-accent-foreground px-8 py-4 hover:bg-accent/90 transition-colors duration-300">
            Back to Home <ArrowRight size={14} />
          </button>
        </Link>
      </section>
    </PageWrapper>
  );
}
