'use client';

import { useState, useEffect } from "react";

interface Review {
  id: string;
  text: string;
  author: string;
  location: string;
  date: string;
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

export function ReviewCarousel({ reviews }: ReviewCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const itemsPerView = 3;

  useEffect(() => {
    if (isHovering) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(timer);
  }, [isHovering, reviews.length]);

  const visibleReviews = reviews.slice(currentIndex, currentIndex + itemsPerView).concat(
    currentIndex + itemsPerView > reviews.length 
      ? reviews.slice(0, (currentIndex + itemsPerView) % reviews.length)
      : []
  );

  return (
    <div
      class="w-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleReviews.map((review) => (
          <div key={review.id} class="bg-white rounded-2xl p-8 shadow-lg border border-border/20 hover:shadow-xl transition-all duration-300 hover:border-accent/40">
            {/* Header with Platform and Rating */}
            <div class="flex items-center justify-between mb-6">
              <img
                src={platformLogos[review.platform]}
                alt={review.platform}
                class="h-5 w-auto"
                loading="lazy"
              />
              <div class="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    class={`text-base ${
                      i < review.rating ? "text-accent" : "text-border/30"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            {/* Review Text */}
            <blockquote class="text-foreground/80 italic mb-6 leading-relaxed text-sm">
              "{review.text}"
            </blockquote>

            {/* Author Info */}
            <div class="flex items-center gap-3">
              <img
                src={review.profileImage}
                alt={review.author}
                class="w-12 h-12 rounded-full object-cover border-2 border-accent/30"
                loading="lazy"
              />
              <div>
                <p class="font-bold text-primary text-sm">{review.author}</p>
                <p class="text-xs text-foreground/60">{review.location}</p>
                <p class="text-xs text-foreground/50">{review.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dot Indicators */}
      <div class="flex justify-center gap-2 mt-8">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            class={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-accent w-8"
                : "bg-border/40 w-2 hover:bg-border/60"
            }`}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
