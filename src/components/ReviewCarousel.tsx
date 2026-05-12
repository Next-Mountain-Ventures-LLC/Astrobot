'use client';

import { useState, useEffect } from "react";

interface Review {
  id: string;
  text: string;
  author: string;
  location: string;
  platform: "yelp" | "google" | "doordash";
  rating: number;
  profileImage: string;
}

interface ReviewCarouselProps {
  reviews: Review[];
}

const platformLogos = {
  yelp: "https://cdn.builder.io/api/v1/image/assets%2F5193f7a05d654f0c98a0a70f48ef2387%2Fddc8d91775f349cdb2d5832d37b936bf?format=webp&width=100&height=40",
  google: "https://cdn.builder.io/api/v1/image/assets%2F5193f7a05d654f0c98a0a70f48ef2387%2F8d66a665163641a1876ffac7dab6fec2?format=webp&width=100&height=40",
  doordash: "https://cdn.builder.io/api/v1/image/assets%2F5193f7a05d654f0c98a0a70f48ef2387%2Fbd030c0b510348e78181e8e68e34686c?format=webp&width=120&height=40",
};

const platformColors = {
  yelp: "#AF0606",
  google: "#4285F4",
  doordash: "#CC0000",
};

export function ReviewCarousel({ reviews }: ReviewCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isHovering) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000); // 5 second autoplay

    return () => clearInterval(timer);
  }, [isHovering, reviews.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const currentReview = reviews[currentIndex];

  return (
    <div
      class="relative max-w-3xl mx-auto"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Main Review Card */}
      <div class="bg-white rounded-2xl p-10 shadow-lg border border-border/20">
        {/* Header with Platform and Rating */}
        <div class="flex items-center justify-between mb-6">
          <img
            src={platformLogos[currentReview.platform]}
            alt={currentReview.platform}
            class="h-6 w-auto"
            loading="lazy"
          />
          <div class="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                class={`text-lg ${
                  i < currentReview.rating ? "text-accent" : "text-border/30"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Review Text */}
        <blockquote class="text-lg text-foreground/80 italic mb-8 leading-relaxed">
          "{currentReview.text}"
        </blockquote>

        {/* Author Info */}
        <div class="flex items-center gap-4">
          <img
            src={currentReview.profileImage}
            alt={currentReview.author}
            class="w-14 h-14 rounded-full object-cover border-2 border-accent/30"
            loading="lazy"
          />
          <div>
            <p class="font-bold text-primary text-base">{currentReview.author}</p>
            <p class="text-sm text-foreground/60">{currentReview.location}</p>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 md:-translate-x-16 w-10 h-10 rounded-full bg-primary text-accent font-bold text-lg hover:bg-primary/90 transition-all duration-300 flex items-center justify-center"
        aria-label="Previous review"
      >
        ←
      </button>
      <button
        onClick={goToNext}
        class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 md:translate-x-16 w-10 h-10 rounded-full bg-primary text-accent font-bold text-lg hover:bg-primary/90 transition-all duration-300 flex items-center justify-center"
        aria-label="Next review"
      >
        →
      </button>

      {/* Dot Indicators */}
      <div class="flex justify-center gap-3 mt-8">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            class={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-accent w-8"
                : "bg-border/40 hover:bg-border/60"
            }`}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>

      {/* Autoplay Indicator */}
      {!isHovering && (
        <div class="text-center mt-4 text-xs text-foreground/50">
          Auto-playing • Hover to pause
        </div>
      )}
    </div>
  );
}
