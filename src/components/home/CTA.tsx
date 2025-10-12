import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section id="get-started" className="py-20 relative overflow-hidden">
      {/* Background metallic effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background"></div>
      
      <div className="container relative">
        <div className="max-w-4xl mx-auto bg-secondary/30 backdrop-blur-sm rounded-xl overflow-hidden border border-primary/20 relative">
          {/* Metallic rivets */}
          <div className="absolute top-3 left-3 w-1 h-1 rounded-full bg-primary/40"></div>
          <div className="absolute top-3 right-3 w-1 h-1 rounded-full bg-primary/40"></div>
          <div className="absolute bottom-3 left-3 w-1 h-1 rounded-full bg-primary/40"></div>
          <div className="absolute bottom-3 right-3 w-1 h-1 rounded-full bg-primary/40"></div>
          
          {/* Glow effects */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          
          <div className="relative px-6 py-12 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">
                  Ready to Transform Your Online Presence?
                </h2>
                <p className="text-muted-foreground">
                  Book a 60-minute design consultation with our expert designers and launch your site within 48 hours.
                </p>
                
                <div className="pt-2">
                  <Button size="lg" className="font-heading tracking-wide group">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book Your Designer <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
              
              <div>
                <div className="bg-background/50 backdrop-blur-sm rounded-lg border border-border/40 p-6 space-y-4">
                  <h3 className="font-heading text-xl font-medium">What happens next:</h3>
                  
                  <ol className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex items-center justify-center bg-primary/10 border border-primary/20 rounded-full w-7 h-7 mt-0.5 flex-shrink-0">
                        <span className="text-primary text-sm font-bold">1</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm">
                          <span className="font-medium">Choose a package</span> and schedule your 60-minute design consultation.
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="flex items-center justify-center bg-primary/10 border border-primary/20 rounded-full w-7 h-7 mt-0.5 flex-shrink-0">
                        <span className="text-primary text-sm font-bold">2</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm">
                          <span className="font-medium">Meet with your designer</span> to discuss your vision, brand, and website goals.
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="flex items-center justify-center bg-primary/10 border border-primary/20 rounded-full w-7 h-7 mt-0.5 flex-shrink-0">
                        <span className="text-primary text-sm font-bold">3</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm">
                          <span className="font-medium">Receive your website</span> within 48 hours, ready to launch and impress.
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}