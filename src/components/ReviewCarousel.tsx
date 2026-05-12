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
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);
  const itemsPerView = 3;

  useEffect(() => {
    if (isHovering) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(timer);
  }, [isHovering, reviews.length]);

  const handleLeftHover = () => {
    setHoveredSide("left");
    setIsHovering(true);
  };

  const handleRightHover = () => {
    setHoveredSide("right");
    setIsHovering(true);
  };

  const handleCardHoverLeave = () => {
    setHoveredSide(null);
    setIsHovering(false);
  };

  const handleLeftClick = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleRightClick = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const visibleReviews = reviews.slice(currentIndex, currentIndex + itemsPerView).concat(
    currentIndex + itemsPerView > reviews.length
      ? reviews.slice(0, (currentIndex + itemsPerView) % reviews.length)
      : []
  );

  return (
    <div
      className="w-full"
      onMouseLeave={handleCardHoverLeave}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center justify-center">
        {visibleReviews.map((review, idx) => {
          const isLeftCard = idx === 0;
          const isMiddleCard = idx === 1;
          const isRightCard = idx === 2;

          return (
            <div
              key={review.id}
              onMouseEnter={isLeftCard ? handleLeftHover : isRightCard ? handleRightHover : undefined}
              onClick={isLeftCard ? handleLeftClick : isRightCard ? handleRightClick : undefined}
              className={`bg-white rounded-2xl shadow-lg border border-border/20 transition-all duration-300 flex flex-col items-center text-center ${
                isMiddleCard
                  ? "md:scale-110 md:z-10 hover:shadow-xl hover:border-accent/40"
                  : "md:scale-75 opacity-60 hover:opacity-100 hover:shadow-lg"
              } ${(isLeftCard || isRightCard) ? "cursor-pointer" : ""}`}
            >
              {/* Profile Image - Top Focus */}
              <img
                src={review.profileImage}
                alt={review.author}
                className="w-20 h-20 rounded-full object-cover border-4 border-accent/40 -mt-10 mb-4"
                loading="lazy"
              />

              {/* Author Info */}
              <div className="px-8 pt-2 pb-4">
                <p className="font-bold text-primary text-base">{review.author}</p>
                <p className="text-xs text-foreground/60">{review.location}</p>
              </div>

              {/* Star Rating */}
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-base ${
                      i < review.rating ? "text-accent" : "text-border/30"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Review Text */}
              <blockquote className="px-8 text-foreground/80 italic mb-4 leading-relaxed text-sm">
                "{review.text}"
              </blockquote>

              {/* Platform Logo - Bottom */}
              <div className="px-8 pb-8 mt-auto">
                <img
                  src={platformLogos[review.platform]}
                  alt={review.platform}
                  className="h-4 w-auto"
                  loading="lazy"
                />
              </div>

              {/* Review Date */}
              <p className="text-xs text-foreground/50 pb-4">{review.date}</p>
            </div>
          );
        })}
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
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
