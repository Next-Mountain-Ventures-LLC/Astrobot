import React from 'react';
import { Users, Calendar, Rocket, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HowItWorks() {
  const steps = [
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Design & Plan Session",
      description: "Schedule a 60-minute design consultation with a real human designer who understands your business vision.",
      highlight: "We'll create a launch plan for your site right away."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Rapid Development",
      description: "Our expert designers build your site using AI technology and 20+ years of human design experience.",
      highlight: "Development starts immediately after your session."
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Launch & Grow",
      description: "Your business website launches within 48 hours, ready to attract customers and drive growth.",
      highlight: "Ongoing support through your customer portal."
    }
  ];
  
  return (
    <section id="how-it-works" className="py-20 relative overflow-hidden">
      {/* Metallic background element */}
      <div className="absolute left-0 right-0 h-full w-full max-w-7xl mx-auto">
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-64 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center mb-16 space-y-4">
          <div className="inline-flex items-center px-4 py-1 space-x-2 bg-accent/10 rounded-full border border-accent/20 mb-4">
            <Rocket className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">Fast Design & Launch Process</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">
            Real Intelligence Inspired
          </h2>
          <p className="text-xl text-muted-foreground">
            We blend AI technology with human creativity to design and launch your business website in record time.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection line between steps */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent z-0" style={{ transform: 'translateX(-50%)' }}></div>
              )}
              
              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/30 shadow-[0_0_15px_rgba(0,128,255,0.15)] mb-2">
                  <span className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 rounded-full bg-accent text-accent-foreground text-sm font-medium">
                    {index + 1}
                  </span>
                  <div className="text-primary">{step.icon}</div>
                </div>
                
                <h3 className="text-xl font-heading font-medium">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                <p className="text-accent font-medium">{step.highlight}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block p-0.5 rounded-lg bg-gradient-to-r from-accent via-accent to-accent/80">
            <Button variant="secondary" size="lg" className="font-heading tracking-wide group bg-background/95 border-accent/20">
              Book Your Design & Launch <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}