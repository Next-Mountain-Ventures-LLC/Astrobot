import React from 'react';
import { Zap, Gauge, Search, LineChart, Shield, Code } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="group relative bg-secondary/30 p-6 rounded-lg border border-border/40 transition-all duration-300 hover:border-primary/30 hover:bg-secondary/50 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    {/* Metallic rivets */}
    <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-primary/20"></div>
    <div className="absolute bottom-2 left-2 w-1 h-1 rounded-full bg-primary/20"></div>
    
    <div className="relative space-y-3">
      <div className="inline-flex p-2 rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      
      <h3 className="font-heading text-xl font-medium tracking-wide">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

export default function Features() {
  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Blazing Fast Speed",
      description: "Astro loads pages up to 75% faster than traditional sites, delivering exceptional user experiences with minimal wait times."
    },
    {
      icon: <Gauge className="h-5 w-5" />,
      title: "Lightweight By Design",
      description: "Astro sites are typically 5-10x smaller than WordPress sites - faster to load, cheaper to host, and easier to manage."
    },
    {
      icon: <Search className="h-5 w-5" />,
      title: "SEO Optimized",
      description: "Pre-rendered HTML means search engines can read your content immediately, improving rankings and visibility."
    },
    {
      icon: <Code className="h-5 w-5" />,
      title: "Zero JavaScript",
      description: "Astro ships with zero JavaScript by default and only hydrates interactive islands, dramatically reducing page size."
    },
    {
      icon: <LineChart className="h-5 w-5" />,
      title: "Performance That Pays",
      description: "Faster load times mean happier visitors and higher conversion rates for your web store or business."
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Low Maintenance",
      description: "No plugins, no constant updates - just stable, secure sites that run themselves with high reliability."
    }
  ];

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,#102040_50%,transparent_100%)] opacity-5"></div>
      
      <div className="container relative">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">
            Next Generation Web Architecture
          </h2>
          <p className="text-muted-foreground text-lg">
            Built with the fastest website framework available today, developed by MIT's brightest minds.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}