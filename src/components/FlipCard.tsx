'use client';

import { useState } from "react";

interface FlipCardProps {
  title: string;
  description: string;
  icon?: string;
}

export function FlipCard({ title, description, icon = "🎯" }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      class="h-full"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        class="relative w-full h-full transition-transform duration-500 preserve-3d"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front of card */}
        <div
          class="absolute w-full h-full flex flex-col bg-transparent p-6 rounded-lg"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <div class="relative h-1 w-12 bg-accent mb-6 transition-all duration-300 group-hover:w-full"></div>
          <div class="text-4xl mb-4">{icon}</div>
          <h3 class="font-heading text-xl font-bold text-primary mb-3">
            {title}
          </h3>
          <p class="text-foreground/70 leading-relaxed flex-1">
            {description}
          </p>
          <p class="text-xs text-accent font-bold mt-4">Hover to learn more →</p>
        </div>

        {/* Back of card */}
        <div
          class="absolute w-full h-full flex flex-col bg-accent/10 p-6 rounded-lg border border-accent/30"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div class="relative h-1 w-12 bg-primary mb-6"></div>
          <h3 class="font-heading text-xl font-bold text-primary mb-3">
            {title}
          </h3>
          <p class="text-foreground/80 leading-relaxed flex-1 text-sm">
            {description}
          </p>
          <p class="text-xs text-primary font-bold mt-4">← Hover to flip back</p>
        </div>
      </div>
    </div>
  );
}
