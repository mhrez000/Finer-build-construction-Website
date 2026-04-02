import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  index?: number;
}

export function ProjectCard({ title, description, imageUrl, category, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href="/projects" className="group block">
        <div className="flex flex-col gap-5">
          {/* Image */}
          <div className="cinematic-image-container aspect-[4/3] w-full relative">
            <img
              src={imageUrl}
              alt={title}
              className="cinematic-image"
              loading="lazy"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-700" />
            {/* Arrow icon */}
            <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
              <ArrowUpRight size={16} className="text-foreground" />
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-accent">
              {category}
            </span>
            <h3 className="text-xl font-serif text-foreground group-hover:text-accent transition-colors duration-500">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
              {description}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
