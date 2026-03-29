import { Link } from "wouter";
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
      <div className="flex flex-col gap-6">
        <div className="cinematic-image-container aspect-[4/3] w-full">
          <img 
            src={imageUrl} 
            alt={title} 
            className="cinematic-image"
            loading="lazy"
          />
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
      </div>
    </Link>
  );
}
