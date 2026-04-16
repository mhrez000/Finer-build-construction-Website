import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";

export interface CoverflowItem {
  title: string;
  description: string;
  category: string;
  /** One or more images. The active card auto-cycles through them. */
  images: string[];
}

interface CoverflowCarouselProps {
  items: CoverflowItem[];
}

const VISIBLE_COUNT = 5;
const DRAG_THRESHOLD = 50;
const PHOTO_CYCLE_MS = 3500; // how long each photo shows when card is active

export function CoverflowCarousel({ items }: CoverflowCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const next = () => {
    setActiveIndex((i) => (i + 1) % items.length);
    setPhotoIndex(0);
  };
  const prev = () => {
    setActiveIndex((i) => (i - 1 + items.length) % items.length);
    setPhotoIndex(0);
  };

  // Auto-cycle photos within the active card
  useEffect(() => {
    const activeItem = items[activeIndex];
    if (!activeItem || activeItem.images.length <= 1) return;

    const interval = setInterval(() => {
      setPhotoIndex((p) => (p + 1) % activeItem.images.length);
    }, PHOTO_CYCLE_MS);

    return () => clearInterval(interval);
  }, [activeIndex, items]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > DRAG_THRESHOLD) {
      if (info.offset.x < 0) next();
      else prev();
    }
    setTimeout(() => {
      isDragging.current = false;
    }, 50);
  };

  const handleDragStart = () => {
    isDragging.current = true;
  };

  const handleClick = (index: number) => {
    if (isDragging.current) return;
    if (index !== activeIndex) {
      setActiveIndex(index);
      setPhotoIndex(0);
    }
  };

  const getCardStyle = (offset: number) => {
    const absOffset = Math.abs(offset);
    if (absOffset === 0) {
      return { x: "0%", scale: 1, rotateY: 0, z: 40, opacity: 1, filter: "brightness(1)" };
    }
    const direction = offset > 0 ? 1 : -1;
    const translateX = direction * absOffset * 62;
    const scale = 1 - absOffset * 0.15;
    const rotateY = -direction * absOffset * 45;
    const zIndex = 40 - absOffset * 10;
    return {
      x: `${translateX}%`,
      scale: Math.max(scale, 0.65),
      rotateY,
      z: zIndex,
      opacity: absOffset > 2 ? 0 : 1 - absOffset * 0.2,
      filter: `brightness(${1 - absOffset * 0.25})`,
    };
  };

  const getVisibleItems = () => {
    const half = Math.floor(VISIBLE_COUNT / 2);
    const visible: { item: CoverflowItem; index: number; offset: number }[] = [];
    for (let offset = -half; offset <= half; offset++) {
      const index = (activeIndex + offset + items.length) % items.length;
      visible.push({ item: items[index], index, offset });
    }
    return visible;
  };

  const activeItem = items[activeIndex];

  return (
    <div className="relative w-full">
      {/* Carousel viewport */}
      <div
        ref={constraintsRef}
        className="relative w-full overflow-hidden"
        style={{ perspective: "1200px", perspectiveOrigin: "50% 50%" }}
      >
        <motion.div
          className="relative w-full cursor-grab active:cursor-grabbing"
          style={{ height: "clamp(350px, 55vh, 600px)" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              {getVisibleItems()
                .sort((a, b) => Math.abs(a.offset) - Math.abs(b.offset))
                .reverse()
                .map(({ item, index, offset }) => {
                  const style = getCardStyle(offset);
                  const isActive = offset === 0;
                  // Active card uses the cycling photoIndex; others show their first image
                  const imgSrc = isActive
                    ? item.images[photoIndex % item.images.length]
                    : item.images[0];
                  // Unique key per active photo so AnimatePresence transitions images
                  const imgKey = isActive ? `${index}-${photoIndex}` : `${index}-still`;

                  return (
                    <motion.div
                      key={`${index}-${item.title}`}
                      className="absolute"
                      style={{
                        width: "clamp(280px, 42%, 520px)",
                        zIndex: style.z,
                        transformStyle: "preserve-3d",
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        x: style.x,
                        scale: style.scale,
                        rotateY: style.rotateY,
                        opacity: style.opacity,
                        filter: style.filter,
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => handleClick(index)}
                    >
                      <div
                        className={`relative overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.15)] ${
                          isActive ? "shadow-[0_16px_60px_rgba(0,0,0,0.25)]" : ""
                        }`}
                      >
                        {/* Image with cross-fade between cycling photos */}
                        <div className="aspect-[4/3] w-full overflow-hidden relative bg-black">
                          <AnimatePresence mode="sync">
                            <motion.img
                              key={imgKey}
                              src={imgSrc}
                              alt={item.title}
                              className={`absolute inset-0 w-full h-full object-cover ${
                                isActive ? "grayscale-0 scale-100" : "grayscale scale-105"
                              }`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                              draggable={false}
                            />
                          </AnimatePresence>
                        </div>

                        {/* Info overlay on active card */}
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 md:p-8"
                          animate={{ opacity: isActive ? 1 : 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <span className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-accent">
                            {item.category}
                          </span>
                          <h3 className="text-xl md:text-2xl font-serif text-white mt-2">
                            {item.title}
                          </h3>
                          {/* Photo indicator dots — show only if multiple photos */}
                          {isActive && item.images.length > 1 && (
                            <div className="flex items-center gap-1.5 mt-3">
                              {item.images.map((_, i) => (
                                <span
                                  key={i}
                                  className={`h-1 rounded-full transition-all duration-500 ${
                                    i === photoIndex % item.images.length
                                      ? "w-6 bg-accent"
                                      : "w-1.5 bg-white/40"
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Controls + info */}
      <div className="mt-10 md:mt-14 max-w-2xl mx-auto text-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              {activeItem.description}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-8 mt-8">
          <button
            onClick={prev}
            className="group flex items-center justify-center w-12 h-12 border border-border hover:border-accent transition-colors duration-500"
            aria-label="Previous project"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground group-hover:text-accent transition-colors duration-500">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveIndex(i);
                  setPhotoIndex(0);
                }}
                className={`h-1.5 transition-all duration-500 ${
                  i === activeIndex ? "w-8 bg-accent" : "w-1.5 bg-border hover:bg-muted-foreground"
                }`}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="group flex items-center justify-center w-12 h-12 border border-border hover:border-accent transition-colors duration-500"
            aria-label="Next project"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground group-hover:text-accent transition-colors duration-500">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="mt-6 text-[0.65rem] tracking-[0.3em] uppercase text-muted-foreground">
          {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          {activeItem.images.length > 1 && (
            <span className="ml-3 text-muted-foreground/60">
              · Photo {photoIndex + 1}/{activeItem.images.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
