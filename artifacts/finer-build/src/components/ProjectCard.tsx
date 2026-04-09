import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

export function ProjectCard({ title, description, imageUrl, category }: ProjectCardProps) {
  return (
    <Link href="/projects" className="group block">
      <motion.div
        className="flex flex-col gap-6"
        whileHover="hover"
        initial="rest"
        animate="rest"
      >
        <div className="cinematic-image-container aspect-[4/3] w-full overflow-hidden relative">
          <motion.img
            src={imageUrl}
            alt={title}
            className="cinematic-image w-full h-full object-cover"
            loading="lazy"
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.08 },
            }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent pointer-events-none"
            variants={{
              rest: { opacity: 0 },
              hover: { opacity: 1 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <motion.div
            className="absolute bottom-5 left-5 right-5 flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-background"
            variants={{
              rest: { opacity: 0, y: 12 },
              hover: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>Explore Project</span>
            <motion.span
              variants={{
                rest: { x: 0 },
                hover: { x: 6 },
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <ArrowRight size={14} />
            </motion.span>
          </motion.div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-accent">
            {category}
          </span>
          <h3 className="text-2xl font-serif text-foreground group-hover:text-accent transition-colors duration-500">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mt-2">
            {description}
          </p>
          <div className="flex items-center gap-2 mt-4 text-xs font-semibold tracking-[0.1em] uppercase text-foreground group-hover:text-accent transition-colors duration-500">
            View Project <ArrowRight size={14} />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
