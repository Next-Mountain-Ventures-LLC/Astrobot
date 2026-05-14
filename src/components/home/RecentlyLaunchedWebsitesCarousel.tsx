import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const websites = [
  {
    name: "Climb.Coach",
    url: "https://www.climb.coach",
    displayUrl: "www.climb.coach",
    description: "Business Coaching"
  },
  {
    name: "Ennis Slingshot",
    url: "https://www.ennisslingshot.com",
    displayUrl: "www.ennisslingshot.com",
    description: "Sports Equipment"
  },
  {
    name: "Ecclesia Tulsa",
    url: "https://www.ecclesiatulsa.com",
    displayUrl: "www.ecclesiatulsa.com",
    description: "Church Community"
  },
  {
    name: "Search SERPA",
    url: "https://www.searchserpa.com",
    displayUrl: "www.searchserpa.com",
    description: "SEO Services"
  }
];

export default function RecentlyLaunchedWebsitesCarousel() {
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
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Recently Launched Websites</h2>
          <p className="text-muted-foreground">
            Check out some of the amazing websites we've recently built for our clients.
          </p>
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
                      className="group bg-background rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all hover:shadow-lg flex flex-col h-full"
                    >
                      {/* Website Preview/Screenshot */}
                      <div className="relative h-40 md:h-48 bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden flex items-center justify-center">
                        <div className="text-center p-4">
                          <p className="text-muted-foreground text-xs mb-2">Website Preview</p>
                          <svg
                            className="w-12 h-12 mx-auto text-primary/30 group-hover:text-primary/50 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5h.01"
                            ></path>
                          </svg>
                        </div>
                      </div>

                      {/* Website Details */}
                      <div className="p-4 md:p-6 flex flex-col flex-grow">
                        <h3 className="font-bold text-base md:text-lg mb-1 group-hover:text-primary transition-colors">
                          {website.name}
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground mb-3 flex-grow">
                          {website.description}
                        </p>
                        <p className="text-xs text-primary font-medium mb-4">{website.displayUrl}</p>
                        <div className="pt-3 border-t border-border flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Visit Website</span>
                          <svg
                            className="w-3 h-3 md:w-4 md:h-4 text-primary group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-8">
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

          {/* Auto-scroll Status Indicator */}
          <div className="text-center mt-6">
            <button
              onClick={() => setAutoScroll(!autoScroll)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {autoScroll ? '⏸ Auto-scrolling' : '▶ Resume auto-scroll'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
