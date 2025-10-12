import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, Zap, Code, MousePointer, RotateCw } from 'lucide-react';

export default function MicroInteractions() {
  const [activeTab, setActiveTab] = useState(1); // Start with Loading States tab
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Handle button click with animation
  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 1000);
  };

  const tabs = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Loading States",
      description: "Sleek loading animations that keep users informed while content is being processed."
    },
    {
      icon: <MousePointer className="h-5 w-5" />,
      title: "Hover Effects",
      description: "Subtle animations that react to user hover states, creating a more engaging experience."
    },
    {
      icon: <RotateCw className="h-5 w-5" />,
      title: "Scroll Animations",
      description: "Elements that animate into view as users scroll down the page."
    }
  ];

  return (
    <section id="micro-interactions" className="py-20 relative overflow-hidden">
      {/* Metallic background elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center mb-16 space-y-4">
          <div className="inline-flex items-center px-3 py-1 space-x-2 bg-accent/10 rounded-full border border-accent/20 mb-4">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-xs font-medium text-accent">Included in Supernova Plan</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">
            Micro-Interactions & Animations
          </h2>
          <p className="text-xl text-muted-foreground">
            Small details that make a big difference in how users experience your website.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex space-x-3">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 ${
                    activeTab === index 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  <span>{tab.icon}</span>
                  <span className="font-medium">{tab.title}</span>
                </button>
              ))}
            </div>
            
            <div className="bg-secondary/30 rounded-lg border border-border/40 p-6">
              <h3 className="flex items-center space-x-2 text-xl font-medium font-heading mb-3">
                <span>{tabs[activeTab].icon}</span>
                <span>{tabs[activeTab].title}</span>
              </h3>
              <p className="text-muted-foreground mb-6">
                {tabs[activeTab].description}
              </p>
              
              <div className="space-y-6">
                {activeTab === 1 && (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Hover over these elements to see the effects:
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <div 
                          className="relative overflow-hidden rounded-md"
                          onMouseEnter={() => setIsHovering(true)}
                          onMouseLeave={() => setIsHovering(false)}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-r from-primary/40 to-accent/40 opacity-0 transition-opacity duration-300 ${isHovering ? 'opacity-100' : ''}`}></div>
                          <button className="relative px-4 py-2 bg-secondary border border-border/60 rounded-md text-foreground hover:text-primary transition-colors duration-300">
                            Hover Me
                          </button>
                        </div>
                        
                        <button className="group px-4 py-2 bg-secondary/50 border border-border/60 rounded-md text-foreground hover:text-primary transition-all duration-300 hover:border-primary">
                          <span className="flex items-center space-x-2">
                            <Code className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                            <span>Icon Animation</span>
                          </span>
                        </button>
                        
                        <div className="relative p-0.5 bg-gradient-to-r from-primary to-accent rounded-md overflow-hidden group">
                          <button className="relative px-4 py-2 bg-background/95 rounded-[3px] text-foreground transition-all duration-300 group-hover:bg-background/80">
                            Gradient Border
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                {activeTab === 0 && (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Click the button to see loading state:
                      </p>
                      <button 
                        className={`flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md transition-all duration-300 ${isClicked ? 'opacity-80' : ''}`}
                        onClick={handleClick}
                      >
                        {isClicked ? (
                          <>
                            <svg className="animate-spin h-4 w-4 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <Zap className="h-4 w-4" />
                            <span>Click Me</span>
                          </>
                        )}
                      </button>
                    </div>
                    
                    <div className="mt-4">
                      <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full animate-progress"></div>
                      </div>
                    </div>
                  </>
                )}
                
                {activeTab === 2 && (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Scroll down to see animations (or try scrolling back up):
                      </p>
                      <div className="space-y-4">
                        <div className="p-4 bg-secondary/50 border border-border/40 rounded-md animate-fadeIn">
                          <p className="text-muted-foreground">This element fades in when it enters the viewport.</p>
                        </div>
                        
                        <div className="p-4 bg-secondary/50 border border-border/40 rounded-md animate-fadeInRight">
                          <p className="text-muted-foreground">This element slides in from the right.</p>
                        </div>
                        
                        <div className="p-4 bg-secondary/50 border border-border/40 rounded-md animate-[fadeIn_1s_ease_0.5s_forwards]">
                          <p className="text-muted-foreground">This element has a delayed entrance.</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-secondary/30 border border-border/40 rounded-lg p-6">
              <h3 className="font-heading text-xl font-medium mb-4">Micro-Interactions</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Sparkles className="h-4 w-4 text-accent" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-base font-medium">Interactive Elements</h4>
                    <p className="text-sm text-muted-foreground">Elements that respond to user actions in real-time.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Sparkles className="h-4 w-4 text-accent" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-base font-medium">Scroll Reveal Effects</h4>
                    <p className="text-sm text-muted-foreground">Elements that animate into view as users scroll.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Sparkles className="h-4 w-4 text-accent" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-base font-medium">Loading Indicators</h4>
                    <p className="text-sm text-muted-foreground">Beautiful loading states that keep users engaged.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Sparkles className="h-4 w-4 text-accent" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-base font-medium">Interactive UI Elements</h4>
                    <p className="text-sm text-muted-foreground">Buttons, forms, and navigation with delightful interactions.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button className="w-full group bg-accent text-accent-foreground hover:bg-accent/90">
                  Choose Supernova ($79/mo) <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
            
            {/* Metallic accent */}
            <div className="absolute -bottom-3 -right-3 h-24 w-24 bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}