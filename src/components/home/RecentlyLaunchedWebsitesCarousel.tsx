import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface WebsiteItem {
  title: string;
  url: string;
  thumbnailUrl: string;
  info: string;
  industry?: string;
}

interface RecentlyLaunchedWebsitesCarouselProps {
  websites: WebsiteItem[];
}

export default function RecentlyLaunchedWebsitesCarousel({ websites }: RecentlyLaunchedWebsitesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  const itemsPerView = 3;
  const maxIndex = websites.length - itemsPerView;

  // Auto-scroll functionality
  useEffect(() => {
    if (!autoScroll) return;

    autoScrollRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000); // Auto-scroll every 5 seconds

    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [autoScroll, maxIndex]);

  const handlePrev = () => {
    setAutoScroll(false);
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setAutoScroll(false);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Resume auto-scroll after 8 seconds of manual interaction
  const resumeAutoScroll = () => {
    setTimeout(() => setAutoScroll(true), 8000);
  };

  useEffect(() => {
    if (!autoScroll) {
      resumeAutoScroll();
    }
  }, [currentIndex]);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Recently Launched Websites</h2>
          <p className="text-muted-foreground text-lg">
            Click any website below to experience it
          </p>
          {/* Animated click indicator */}
          <div className="flex justify-center items-center gap-1 mt-4 animate-pulse">
            <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            <span className="text-xs text-muted-foreground">Click to explore</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-0">
          {/* Carousel Container */}
          <div className="relative">
            {/* Carousel Wrapper */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                }}
              >
                {websites.map((website, index) => (
                  <div
                    key={index}
                    className="w-1/3 flex-shrink-0 px-3 md:px-4"
                  >
                    <a
                      href={website.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      {/* Image Container - The Main Focus */}
                      <div className="relative mb-6 overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
                        <img
                          src={website.thumbnailUrl}
                          alt={website.title}
                          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      </div>

                      {/* Website Info - Minimal & Elegant */}
                      <div className="text-center">
                        <h3 className="text-lg md:text-xl font-bold mb-1 group-hover:text-primary transition-colors" style={{ fontVariant: 'small-caps' }}>
                          {website.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {website.info || website.industry || ''}
                        </p>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-6 md:-translate-x-8 z-10 p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-6 md:translate-x-8 z-10 p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setAutoScroll(false);
                }}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-primary w-6'
                    : 'bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-scroll Toggle */}
          <div className="text-center mt-8">
            <button
              onClick={() => setAutoScroll(!autoScroll)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {autoScroll ? '⏸ Auto-scrolling enabled' : '▶ Resume auto-scroll'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
