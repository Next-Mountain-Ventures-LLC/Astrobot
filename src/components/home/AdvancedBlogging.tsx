import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Zap, Search } from 'lucide-react';
import { Image } from 'astro:assets';
import wordpressLogo from '../../assets/wordpress-logotype-standard-white_nw_c18b7ac6.png';
import astroLogo from '../../assets/astro-logo-light_nw_c8fde0c8.svg';

export default function AdvancedBlogging() {
  return (
    <section id="advanced-blogging" className="py-20 relative overflow-hidden">
      {/* Background metallic effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background"></div>
      
      <div className="container relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 space-x-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-primary">Next-Level Content</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-4 flex items-center justify-center gap-4">
            <div className="w-20 md:w-24">
              <img src={wordpressLogo.src} alt="WordPress" width={wordpressLogo.width} height={wordpressLogo.height} />
            </div>
            <span className="text-primary text-4xl">+</span>
            <div className="w-16 md:w-20">
              <img src={astroLogo.src} alt="Astro" width={astroLogo.width / 3} height={astroLogo.height / 3} />
            </div>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get the best of both worlds: WordPress's content management with Astro's blazing fast performance.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div className="bg-secondary/30 border border-primary/20 rounded-lg p-8 relative overflow-hidden backdrop-blur-sm">
            {/* Logo animation and visuals */}
            <div className="absolute -top-4 -left-4 h-20 w-20 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 h-20 w-20 bg-primary/10 rounded-full blur-xl"></div>
            
            <div className="relative mb-12 py-8">
              {/* Glow background */}
              <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 blur-3xl rounded-full"></div>
              
              {/* Visual representation of WordPress + Astro integration */}
              <div className="relative h-64 rounded-lg bg-background/20 border border-primary/10 backdrop-blur-sm overflow-hidden">
                {/* Left side: WordPress (content) */}
                <div className="absolute left-0 top-0 bottom-0 w-1/2 flex flex-col items-center justify-center p-4 border-r border-primary/20">
                  <div className="w-20 md:w-24 mb-4">
                    <img src={wordpressLogo.src} alt="WordPress" width={wordpressLogo.width} height={wordpressLogo.height} />
                  </div>
                  
                  {/* Content blocks representing WordPress posts */}
                  <div className="w-full space-y-2">
                    <div className="h-4 w-full bg-primary/20 rounded-full"></div>
                    <div className="h-4 w-4/5 bg-primary/15 rounded-full"></div>
                    <div className="h-4 w-full bg-primary/20 rounded-full"></div>
                    <div className="h-4 w-3/4 bg-primary/15 rounded-full"></div>
                  </div>
                </div>
                
                {/* Right side: Astro (output) */}
                <div className="absolute right-0 top-0 bottom-0 w-1/2 flex flex-col items-center justify-center p-4 bg-gradient-to-tr from-primary/5 to-primary/10">
                  <div className="w-16 md:w-20 mb-4">
                    <img src={astroLogo.src} alt="Astro" width={astroLogo.width / 3} height={astroLogo.height / 3} />
                  </div>
                  
                  {/* Performance metrics */}
                  <div className="w-full space-y-2">
                    <div className="flex items-center text-xs justify-between mb-1">
                      <span className="text-muted-foreground">Load Time:</span>
                      <span className="text-primary font-medium">0.2s</span>
                    </div>
                    <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden">
                      <div className="h-full w-[10%] bg-primary"></div>
                    </div>
                    
                    <div className="flex items-center text-xs justify-between mb-1 mt-2">
                      <span className="text-muted-foreground">JS Size:</span>
                      <span className="text-primary font-medium">0 KB</span>
                    </div>
                    <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden">
                      <div className="h-full w-[5%] bg-primary"></div>
                    </div>
                  </div>
                </div>
                
                {/* Connection arrows */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center z-10">
                  <div className="w-6 h-6 bg-primary/40 rounded-full flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 text-white animate-pulse" />
                  </div>
                </div>
                
                {/* Data flow animation */}
                <div className="absolute top-1/3 left-1/3 w-1/3 h-1 bg-primary/30 animate-[progress_2s_ease-in-out_infinite]"></div>
                <div className="absolute top-2/3 left-1/3 w-1/3 h-1 bg-primary/30 animate-[progress_2.5s_ease-in-out_infinite]"></div>
              </div>
            </div>
            
            <h3 className="font-heading text-xl font-medium mb-4">The Perfect Combination</h3>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div className="ml-3">
                  <h4 className="text-base font-medium">Familiar Content Management</h4>
                  <p className="text-sm text-muted-foreground">Use WordPress's intuitive interface to create and manage your content.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div className="ml-3">
                  <h4 className="text-base font-medium">Static Site Generation</h4>
                  <p className="text-sm text-muted-foreground">Astro pre-renders your entire blog for lightning-fast load times.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div className="ml-3">
                  <h4 className="text-base font-medium">Decoupled Architecture</h4>
                  <p className="text-sm text-muted-foreground">WordPress as a headless CMS gives you flexibility without the bloat.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-secondary/30 border border-primary/20 rounded-lg p-8 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute -bottom-4 -left-4 h-20 w-20 bg-primary/10 rounded-full blur-xl"></div>
            
            <h3 className="font-heading text-xl font-medium mb-6 flex items-center">
              <Zap className="h-5 w-5 text-primary mr-2" />
              Unbeatable Performance
            </h3>
            
            {/* Performance Visualization */}
            <div className="mb-8 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Traditional WordPress</span>
                  <span className="text-sm text-muted-foreground">3.5s load time</span>
                </div>
                <div className="h-4 w-full bg-secondary/50 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-accent/40 rounded-full"></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Astro + WordPress</span>
                  <span className="text-sm text-primary">0.3s load time</span>
                </div>
                <div className="h-4 w-full bg-secondary/50 rounded-full overflow-hidden">
                  <div className="h-full w-[10%] bg-primary animate-pulse rounded-full"></div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-secondary/50 rounded-md border border-primary/10">
                <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center border border-primary/20">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">SEO Optimized</h4>
                  <p className="text-xs text-muted-foreground">Search engines love static sites. Enjoy higher rankings and more visibility.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="font-medium mb-2">Even Massive Blogs Stay Lightweight</h4>
              <p className="text-sm text-muted-foreground mb-4">
                With our headless WordPress solution, your blog remains lightning fast even as your content grows. Static pre-rendering means visitors never wait for database queries or server processing.
              </p>
              
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>10 posts</span>
                <span>100 posts</span>
                <span>1000+ posts</span>
              </div>
              <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden mt-1 mb-2">
                <div className="h-full w-full bg-gradient-to-r from-primary/80 to-primary/20 rounded-full"></div>
              </div>
              <div className="text-center text-sm font-medium text-primary">
                Consistent sub-second load times
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to action */}
        <div className="max-w-2xl mx-auto bg-gradient-to-b from-secondary/30 to-secondary/50 rounded-lg p-8 border border-primary/30 shadow-[0_0_15px_rgba(0,128,255,0.1)]">
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30">
              <span className="text-primary font-bold">$19.99</span>
            </div>
            <div>
              <h3 className="font-heading text-xl font-medium">Advanced Blogging Add-on</h3>
              <p className="text-muted-foreground">Add to any package for full WordPress blogging capabilities</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="font-medium mb-2 text-sm">What You Get:</h4>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                  Custom WordPress dashboard
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                  Familiar posting interface
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                  Static pre-rendering
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                  Unlimited blog posts
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-sm">Benefits:</h4>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                  Super-fast loading speeds
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                  Better SEO performance
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                  Improved user experience
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                  Lower hosting costs
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center">
            <Button className="font-heading group bg-primary text-primary-foreground hover:bg-primary/90 border border-primary/50">
              Add to Your Package <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}