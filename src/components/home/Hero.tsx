import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Zap, Rocket, Star, ArrowRight } from 'lucide-react';
import astroLogo from '../../assets/astro-logo-light_nw_c8fde0c8.svg';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#304060_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
      
      {/* Metallic elements - subtle rivets */}
      <div className="absolute top-20 right-10 w-2 h-2 rounded-full bg-primary/30"></div>
      <div className="absolute top-40 right-20 w-1 h-1 rounded-full bg-primary/20"></div>
      <div className="absolute bottom-20 left-10 w-2 h-2 rounded-full bg-primary/30"></div>
      <div className="absolute bottom-40 left-20 w-1 h-1 rounded-full bg-primary/20"></div>

      <div className="container relative pt-20 pb-16 md:pt-24 md:pb-20 lg:pt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className={`space-y-6 ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`} suppressHydrationWarning>
            <div className="inline-block">
              <div className="flex items-center space-x-2 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium text-primary">Blazing Fast Business Websites</span>
              </div>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-foreground leading-[1.1] bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70">
              Launch Your Business <br className="hidden sm:block" />
              <span className="relative">
                <span className="inline-block text-primary">Online</span>
                <span className="absolute -top-1 -right-1 h-1 w-1 rounded-full bg-primary animate-ping"></span>
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-lg">
              Human-designed sites powered by AI, <span className="text-primary font-medium">75% faster</span> than traditional websites. More speed, more conversions.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a href="https://buy.stripe.com/5kQbJ2dec6ZIc7L0HKgMw01" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="font-heading tracking-wide group bg-accent text-accent-foreground hover:bg-accent/90 border border-accent/50 shadow-[0_0_10px_rgba(255,50,50,0.25)]">
                  Book Your Design Launch <ArrowRight className="ml-1 h-4 w-4 animate-bounceX" />
                </Button>
              </a>
              <a href="#how-it-works">
                <Button variant="outline" size="lg" className="border-primary/20 hover:bg-primary/10 hover:text-primary hover:border-primary/30 font-heading tracking-wide">
                  Learn More
                </Button>
              </a>
            </div>

            <div className="flex items-center space-x-4 text-muted-foreground text-sm pt-4">
              <div className="flex items-center">
                <Rocket className="h-4 w-4 mr-1 text-primary" />
                <span>7-day Launch Time</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 text-primary" />
                <span>Human Designers</span>
              </div>
              <div className="flex items-center">
                <Zap className="h-4 w-4 mr-1 text-accent" />
                <span>AI Technology</span>
              </div>
            </div>
          </div>

          <div className={`relative ${isVisible ? 'animate-fadeInRight' : 'opacity-0'}`} suppressHydrationWarning>
            {/* Simulated website UI with metallic accents */}
            <div className="relative mx-auto max-w-md">
              {/* UI Frame */}
              <div className="bg-secondary/80 backdrop-blur-sm p-6 rounded-xl border border-border/60 shadow-[0_0_15px_rgba(0,128,255,0.1)] overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(#102040_1px,transparent_1px)] [background-size:10px_10px] opacity-10"></div>
                
                
                {/* Browser UI elements */}
                <div className="flex items-center space-x-1 mb-3">
                  <div className="w-3 h-3 rounded-full bg-accent/80"></div>
                  <div className="w-3 h-3 rounded-full bg-primary/30"></div>
                  <div className="w-3 h-3 rounded-full bg-muted"></div>
                  <div className="ml-2 h-6 w-full bg-secondary-foreground/5 rounded-md border border-border/40 flex items-center px-2">
                    <div className="text-xs text-primary/70 animate-pulse">yourbusiness.com</div>
                  </div>
                </div>
                
                {/* Website mockup content */}
                <div className="space-y-4">
                  {/* Header with Astro logo */}
                  <div className="w-full h-10 bg-secondary-foreground/5 rounded-md relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-primary/10 rounded-md w-full"></div>
                    <div className="absolute top-0 left-0 flex items-center justify-between h-full px-2 w-full">
                      <div className="flex items-center">
                        <img src={astroLogo.src} alt="" width={astroLogo.width / 10} height={astroLogo.height / 10} className="h-5 mr-2" />
                        <div className="text-xs font-medium text-primary/80">Powered by Astro</div>
                      </div>
                      <div className="text-xs text-primary/60">Loading: 100%</div>
                    </div>
                  </div>
                  
                  {/* Hero content with stats */}
                  <div className="space-y-3">
                    <div className="w-2/3 h-6 bg-primary/20 rounded-md flex items-center justify-between px-2">
                      <div className="text-xs text-primary">Company Website</div>
                      <div className="text-xs text-accent">0.5s load time</div>
                    </div>
                    <div className="w-full h-4 bg-secondary-foreground/5 rounded-md"></div>
                    <div className="w-5/6 h-4 bg-secondary-foreground/5 rounded-md"></div>
                  </div>
                  
                  {/* Buttons */}
                  <div className="flex space-x-3">
                    <div className="w-1/3 h-8 bg-accent/80 rounded-md animate-pulse-slow relative">
                      <div className="absolute inset-0 flex items-center justify-center text-xs text-accent-foreground font-medium">
                        LAUNCH IN 7 DAYS
                      </div>
                    </div>
                    <div className="w-1/3 h-8 bg-secondary-foreground/5 border border-border/40 rounded-md relative">
                      <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground/50 font-medium">
                        STAY SLOW
                      </div>
                    </div>
                  </div>
                  
                  {/* Content blocks with performance stats */}
                  <div className="pt-4 space-y-3">
                    <div className="w-full h-16 bg-secondary-foreground/5 rounded-md relative overflow-hidden p-2">
                      <div className="absolute top-0 left-0 h-full w-2 bg-primary/30"></div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="text-muted-foreground">Page size:</div>
                        <div className="text-primary font-medium">0.8 MB</div>
                      </div>
                    </div>
                    <div className="w-full h-16 bg-secondary-foreground/5 rounded-md relative overflow-hidden p-2">
                      <div className="absolute top-0 left-0 h-full w-2 bg-primary/30"></div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="text-muted-foreground">Time to interactive:</div>
                        <div className="text-primary font-medium">0.2s</div>
                      </div>
                    </div>
                    <div className="w-full h-16 bg-secondary-foreground/5 rounded-md relative overflow-hidden p-2">
                      <div className="absolute top-0 left-0 h-full w-[98%] bg-primary/30"></div>
                      <div className="flex items-center justify-between text-xs relative z-10">
                        <div className="text-muted-foreground">Google PageSpeed score:</div>
                        <div className="text-primary font-medium">98/100</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Metallic rivets */}
                <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-primary/30"></div>
                <div className="absolute top-2 left-2 w-1 h-1 rounded-full bg-primary/30"></div>
                <div className="absolute bottom-2 right-2 w-1 h-1 rounded-full bg-primary/30"></div>
                <div className="absolute bottom-2 left-2 w-1 h-1 rounded-full bg-primary/30"></div>
              </div>
              
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 rounded-xl blur-xl opacity-30 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add these animations to your global.css
// @keyframes fadeIn {
//   from { opacity: 0; transform: translateY(10px); }
//   to { opacity: 1; transform: translateY(0); }
// }

// @keyframes fadeInRight {
//   from { opacity: 0; transform: translateX(20px); }
//   to { opacity: 1; transform: translateX(0); }
// }

// .animate-fadeIn {
//   animation: fadeIn 0.8s ease forwards;
// }

// .animate-fadeInRight {
//   animation: fadeInRight 0.8s ease forwards;
// }
