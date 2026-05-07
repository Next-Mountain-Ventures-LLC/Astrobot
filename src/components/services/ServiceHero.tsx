import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  description: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  imagePlaceholder?: string;
}

export default function ServiceHero({ 
  title, 
  subtitle, 
  description, 
  primaryCTA,
  secondaryCTA,
  imagePlaceholder 
}: ServiceHeroProps) {
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-primary font-medium mb-4">{subtitle}</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              {title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg">
              {description}
            </p>
            <div className="flex gap-4 flex-wrap">
              <a 
                href={primaryCTA.href}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
              >
                {primaryCTA.text}
                <ArrowRight className="w-4 h-4" />
              </a>
              {secondaryCTA && (
                <a 
                  href={secondaryCTA.href}
                  className="border border-border px-8 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
                >
                  {secondaryCTA.text}
                </a>
              )}
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg h-96 flex items-center justify-center">
            <p className="text-muted-foreground">{imagePlaceholder || 'Visual showcase'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
