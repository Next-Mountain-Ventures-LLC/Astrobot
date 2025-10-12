import React from 'react';
import { Zap, Gauge, Search, LineChart, Shield, Code } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description, highlight = false }: FeatureCardProps) => (
  <div className="group relative bg-secondary/30 p-6 rounded-lg border border-border/40 transition-all duration-300 hover:border-primary/30 hover:bg-secondary/50 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    {/* Metallic rivets */}
    <div className={`absolute top-2 right-2 w-1 h-1 rounded-full ${highlight ? 'bg-accent/30' : 'bg-primary/20'}`}></div>
    <div className={`absolute bottom-2 left-2 w-1 h-1 rounded-full ${highlight ? 'bg-accent/30' : 'bg-primary/20'}`}></div>
    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-transparent via-transparent to-primary/5 opacity-70"></div>
    <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-transparent via-transparent to-primary/5 opacity-70"></div>
    
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
  // Add a small illustration component for each feature
  const FeatureIllustration = ({ type }: { type: string }) => {
    switch(type) {
      case 'speed':
        return (
          <div className="h-12 w-full mb-3 relative overflow-hidden rounded-md bg-secondary/50 flex items-center justify-center border border-border/30">
            <div className="absolute h-4 bg-primary/30 left-0 w-1/4 animate-progress"></div>
            <div className="z-10 text-xs text-primary/80 font-medium">75% Faster</div>
          </div>
        );
      case 'lightweight':
        return (
          <div className="h-12 w-full mb-3 relative overflow-hidden rounded-md bg-secondary/50 flex items-center justify-center border border-border/30">
            <div className="w-8 h-8 bg-secondary border border-primary/20 rounded-md flex items-center justify-center">
              <div className="text-xs text-primary font-medium">1MB</div>
            </div>
            <div className="mx-2 text-xs text-muted-foreground">vs</div>
            <div className="w-16 h-16 bg-secondary border border-border/30 rounded-md flex items-center justify-center">
              <div className="text-xs text-muted-foreground font-medium">10MB</div>
            </div>
          </div>
        );
      case 'seo':
        return (
          <div className="h-12 w-full mb-3 relative overflow-hidden rounded-md bg-secondary/50 flex items-center justify-center border border-border/30">
            <div className="w-full bg-white/10 rounded-md p-1">
              {/* Google-like search bar */}
              <div className="w-full h-5 bg-white/20 rounded-full mb-1 flex items-center px-2">
                <div className="w-3 h-3 mr-1 rounded-full bg-accent/80"></div>
                <div className="text-[8px] text-foreground/90">yourbusiness.com</div>
              </div>
              
              {/* SERP with multiple rankings */}
              <div className="flex justify-between items-center px-1 mb-1">
                <div className="text-[6px] text-muted-foreground">Search results for small business websites</div>
                <div className="text-[6px] text-primary">Page 1 of 1</div>
              </div>
              
              {/* Multiple search result positions */}
              <div className="flex space-x-1 px-1 mb-0.5">
                <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-[6px] text-primary font-bold">1</span>
                </div>
                <div className="flex-1">
                  <div className="h-1 w-full bg-primary/40 rounded-full"></div>
                  <div className="h-1 w-5/6 bg-primary/30 rounded-full mt-0.5"></div>
                </div>
              </div>
              
              <div className="flex space-x-1 px-1 mb-0.5 opacity-90">
                <div className="w-4 h-4 rounded-full bg-primary/15 flex items-center justify-center">
                  <span className="text-[6px] text-primary font-bold">2</span>
                </div>
                <div className="flex-1">
                  <div className="h-1 w-full bg-primary/30 rounded-full"></div>
                  <div className="h-1 w-4/6 bg-primary/20 rounded-full mt-0.5"></div>
                </div>
              </div>
              
              <div className="flex space-x-1 px-1 opacity-80">
                <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-[6px] text-primary font-bold">3</span>
                </div>
                <div className="flex-1">
                  <div className="h-1 w-full bg-primary/20 rounded-full"></div>
                  <div className="h-1 w-3/6 bg-primary/10 rounded-full mt-0.5"></div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'js':
        return (
          <div className="h-12 w-full mb-3 relative overflow-hidden rounded-md bg-secondary/50 flex items-center justify-center border border-border/30">
            <div className="relative flex flex-col w-full items-center">
              <div className="flex items-center justify-between w-full px-3 mb-1">
                <div className="text-xs text-muted-foreground font-medium">JavaScript</div>
                <div className="flex items-center">
                  <div className="text-xs text-accent font-bold animate-[countDown_4s_ease-in-out_forwards]">
                    0%
                  </div>
                  <div className="ml-1 text-xs text-muted-foreground font-medium">used</div>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="w-full h-3 bg-secondary/70 rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full animate-[flashToZero_4s_ease-in-out_forwards]"></div>
              </div>
              
              <div className="w-full text-center mt-1">
                <div className="text-[10px] text-muted-foreground">
                  Zero JavaScript by default — only what you need
                </div>
              </div>
            </div>
          </div>
        );
      case 'performance':
        return (
          <div className="h-12 w-full mb-3 relative overflow-hidden rounded-md bg-secondary/50 flex items-center space-x-2 justify-center border border-border/30">
            <div className="flex flex-col items-center">
              <div className="text-xs text-primary">↑ 20%</div>
              <div className="text-[10px] text-muted-foreground">Conversion</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-xs text-accent">↓ 15%</div>
              <div className="text-[10px] text-muted-foreground">Bounce Rate</div>
            </div>
          </div>
        );
      case 'maintenance':
        return (
          <div className="h-12 w-full mb-3 relative overflow-hidden rounded-md bg-secondary/50 flex items-center justify-center border border-border/30">
            <div className="flex items-center space-x-1">
              <div className="relative">
                <div className="h-8 w-8 rounded-full bg-secondary border border-primary/30 flex items-center justify-center">
                  <div className="h-5 w-5 rounded-full bg-secondary-foreground/5 flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-primary/70"></div>
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-accent/10 flex items-center justify-center border border-accent/30">
                  <div className="text-[8px] text-accent">✓</div>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground font-medium mx-1">No heavy lifting</div>
              
              <div className="w-6 h-6 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
                <div className="text-[10px] text-accent">🧑</div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Blazing Fast Speed",
      description: "Astro loads your business website up to 75% faster than traditional sites, delivering exceptional user experiences with minimal wait times.",
      highlight: true
    },
    {
      icon: <Gauge className="h-5 w-5" />,
      title: "Lightweight By Design",
      description: "Astro sites are typically 5-10x smaller than WordPress sites - faster to load, cheaper to host, and easier to manage."
    },
    {
      icon: <Search className="h-5 w-5" />,
      title: "SEO Optimized",
      description: "Pre-rendered HTML means search engines can read your business content immediately, improving rankings and visibility.",
      highlight: true
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
            Next Generation Web Architecture <span className="text-accent">for Small Businesses</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Built with the fastest website framework available today, developed by MIT's brightest minds to accelerate your small business growth online.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const illustrationType = 
              index === 0 ? 'speed' :
              index === 1 ? 'lightweight' :
              index === 2 ? 'seo' :
              index === 3 ? 'js' :
              index === 4 ? 'performance' : 'maintenance';
              
            return (
              <div key={index} className="flex flex-col">
                <FeatureIllustration type={illustrationType} />
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  highlight={feature.highlight || false}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}