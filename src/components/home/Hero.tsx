import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Zap, Rocket, Star, ArrowRight } from 'lucide-react';

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
          <div className={`space-y-6 ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
            <div className="inline-block">
              <div className="flex items-center space-x-2 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium text-primary">Blazing Fast Websites</span>
              </div>
            </div>
            
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-foreground leading-[1.1] bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70">
              Launch Your Digital <br className="hidden sm:block" />
              <span className="relative">
                <span className="inline-block text-primary">Presence</span> 
                <span className="absolute -top-1 -right-1 h-1 w-1 rounded-full bg-primary animate-ping"></span>
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg">
              AI-powered, human-designed websites that load up to <span className="text-primary font-medium">75% faster</span> than traditional sites.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="font-heading tracking-wide group">
                Book Your Designer <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="border-primary/20 hover:bg-primary/10 hover:text-primary hover:border-primary/30 font-heading tracking-wide">
                Learn More
              </Button>
            </div>
            
            <div className="flex items-center space-x-4 text-muted-foreground text-sm pt-4">
              <div className="flex items-center">
                <Rocket className="h-4 w-4 mr-1 text-primary" />
                <span>48hr Launch Time</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 text-primary" />
                <span>Human Designers</span>
              </div>
            </div>
          </div>
          
          <div className={`relative ${isVisible ? 'animate-fadeInRight' : 'opacity-0'}`}>
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
                  <div className="ml-2 h-6 w-full bg-secondary-foreground/5 rounded-md border border-border/40"></div>
                </div>
                
                {/* Website mockup content */}
                <div className="space-y-4">
                  {/* Header */}
                  <div className="w-full h-8 bg-secondary-foreground/5 rounded-md"></div>
                  
                  {/* Hero content */}
                  <div className="space-y-3">
                    <div className="w-2/3 h-6 bg-primary/20 rounded-md"></div>
                    <div className="w-full h-4 bg-secondary-foreground/5 rounded-md"></div>
                    <div className="w-5/6 h-4 bg-secondary-foreground/5 rounded-md"></div>
                  </div>
                  
                  {/* Buttons */}
                  <div className="flex space-x-3">
                    <div className="w-1/3 h-8 bg-accent/80 rounded-md"></div>
                    <div className="w-1/3 h-8 bg-secondary-foreground/5 border border-border/40 rounded-md"></div>
                  </div>
                  
                  {/* Content blocks */}
                  <div className="pt-4 space-y-3">
                    <div className="w-full h-16 bg-secondary-foreground/5 rounded-md"></div>
                    <div className="w-full h-16 bg-secondary-foreground/5 rounded-md"></div>
                    <div className="w-full h-16 bg-secondary-foreground/5 rounded-md"></div>
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