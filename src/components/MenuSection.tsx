'use client';

import { ImagePreview } from "./ImagePreview";

interface MenuItem {
  name: string;
  price: string;
  description: string;
  image?: string;
}

interface MenuSectionProps {
  title: string;
  color: "primary" | "secondary";
  items: MenuItem[];
}

export function MenuSection({ title, color, items }: MenuSectionProps) {
  const textColorClass = color === "primary" ? "text-primary" : "text-secondary";
  const headingColorClass = color === "primary" ? "text-primary" : "text-secondary";

  return (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-6">
        <h2 className={`font-heading text-2xl font-bold ${headingColorClass}`}>
          {title}
        </h2>
        <div className="flex-1 h-0.5 bg-accent/40"></div>
      </div>
      <div className="space-y-6 bg-card rounded-lg p-6 border border-border/40">
        {items.map((item, index) => (
          <div
            key={index}
            className={index > 0 ? "border-t border-border/20 pt-4" : ""}
          >
            <div className="flex gap-4">
              {item.image && (
                <ImagePreview
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 object-cover rounded flex-shrink-0 border border-border/40"
                />
              )}
              <div className="flex-1">
                <div className="flex justify-between items-baseline gap-4 mb-2">
                  <h3 className={`font-heading font-bold ${textColorClass} text-lg`}>
                    {item.name}
                  </h3>
                  <span className="text-accent font-bold">{item.price}</span>
                </div>
                <p className="text-foreground/70 text-sm">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
