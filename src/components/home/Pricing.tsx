import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Sparkles, ArrowRight, Info } from 'lucide-react';

interface PricingFeature {
  text: string;
  included: boolean;
  highlight?: boolean;
}

interface PricingTier {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  yearlyDiscount: number;
  features: PricingFeature[];
  popular?: boolean;
  includesMicroInteractions?: boolean;
  monthlyUrl: string;
  yearlyUrl: string;
}

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  
  const pricingTiers: PricingTier[] = [
    {
      name: "Orbit",
      description: "Perfect for small businesses and entrepreneurs who want to establish a strong, professional online presence that inspires trust and credibility. This solution helps you stand out from competitors, attract ideal customers, and present your brand with confidence—without needing a full-time web team or large budget.",
      monthlyPrice: 49,
      yearlyPrice: 399,
      yearlyDiscount: 188,
      monthlyUrl: "https://buy.stripe.com/eVqdRa4HG2JsefTcqsgMw00",
      yearlyUrl: "https://buy.stripe.com/cNi28s2zydo6fjX1LOgMw03",
      features: [
        { text: "Custom website design", included: true },
        { text: "Hosting included", included: true },
        { text: "Personal designer portal", included: true },
        { text: "Up to 5 monthly updates/revisions", included: true },
        { text: "Up to 5 pages", included: true },
        { text: "Micro-interactions & animations", included: false },
        { text: "7-day launch time", included: true },
        { text: "SEO optimized", included: true }
      ]
    },
    {
      name: "Supernova",
      description: "For businesses that need unlimited flexibility and premium interactive features to create a truly dynamic online experience. Designed for growing brands that want full creative control, seamless performance, and the ability to evolve their website as they scale—without limits or compromises.",
      monthlyPrice: 79,
      yearlyPrice: 699,
      yearlyDiscount: 249,
      monthlyUrl: "https://buy.stripe.com/5kQbJ2dec6ZIc7L0HKgMw01",
      yearlyUrl: "https://buy.stripe.com/fZu5kE6POesab3H1LOgMw02",
      features: [
        { text: "Custom website design", included: true },
        { text: "Hosting included", included: true },
        { text: "Personal designer portal", included: true },
        { text: "Unlimited monthly updates/revisions", included: true, highlight: true },
        { text: "Unlimited pages", included: true, highlight: true },
        { text: "Micro-interactions & animations", included: true, highlight: true },
        { text: "48-hour launch time", included: true },
        { text: "SEO optimized", included: true }
      ],
      popular: true,
      includesMicroInteractions: true
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <section id="pricing" className="py-20 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#102040_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
      
      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">
            Launch Your Website
          </h2>
          <p className="text-xl text-muted-foreground">
            Choose a plan that works for your business.
          </p>
          
          {/* Billing toggle */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <span className={`text-sm ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative inline-flex h-6 w-12 items-center rounded-full bg-secondary transition-colors focus:outline-none"
              aria-pressed={billingCycle === 'yearly'}
            >
              <span className="sr-only">Toggle billing cycle</span>
              <span
                className={`${
                  billingCycle === 'yearly' ? 'translate-x-6 bg-primary' : 'translate-x-1 bg-muted-foreground'
                } inline-block h-4 w-4 transform rounded-full transition-transform`}
              ></span>
            </button>
            <span className={`text-sm ${billingCycle === 'yearly' ? 'text-foreground' : 'text-muted-foreground'}`}>
              Yearly <span className="text-accent text-xs ml-1">Save up to 35%</span>
            </span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {pricingTiers.map((tier, index) => (
            <div key={index} className={`relative rounded-lg overflow-hidden transition-all duration-300 ${
              tier.popular ? 'border border-primary/50 scale-[1.02] md:scale-[1.05]' : 'border border-border/40'
            }`}>
              {/* Metallic card background with subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 to-secondary/30"></div>
              
              {/* Popular badge */}
              {tier.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-bl-lg">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="relative p-6 md:p-8">
                <h3 className="font-heading text-2xl font-bold tracking-tight">{tier.name}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed min-h-[5rem] md:min-h-[8rem]">{tier.description}</p>
                
                <div className="mt-6 mb-8 space-y-2">
                  <div className="flex items-end">
                    <span className="text-4xl font-heading font-bold">
                      {formatCurrency(billingCycle === 'monthly' ? tier.monthlyPrice : tier.yearlyPrice)}
                    </span>
                    <span className="text-muted-foreground ml-2 mb-1">
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                  
                  {billingCycle === 'yearly' && (
                    <div className="text-accent text-sm">
                      Save {formatCurrency(tier.yearlyDiscount)} per year
                    </div>
                  )}
                </div>
                
                <a 
                  href={billingCycle === 'monthly' ? tier.monthlyUrl : tier.yearlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button 
                    variant={tier.popular ? 'default' : 'outline'}
                    className={`w-full ${tier.popular ? 'font-heading' : 'border-primary/30 bg-secondary/80 hover:bg-primary/10'}`}
                    size="lg"
                  >
                    Get Started <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </a>
                
                <div className="mt-8 space-y-4">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        {feature.included ? (
                          <Check className={`h-5 w-5 ${feature.highlight ? 'text-accent' : 'text-primary/80'}`} />
                        ) : (
                          <div className="h-5 w-5 rounded-full border border-muted-foreground/30"></div>
                        )}
                      </div>
                      <span className={`ml-3 text-sm ${
                        !feature.included ? 'text-muted-foreground/70' : 
                        feature.highlight ? 'font-medium text-foreground' : 'text-muted-foreground'
                      }`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Micro-interaction example (only for the tier that includes it) */}
              {tier.includesMicroInteractions && (
                <div className="relative p-4 mt-4 bg-background/20 border-t border-accent/20">
                  <div className="flex items-center text-sm mb-2">
                    <Sparkles className="h-4 w-4 text-accent mr-2" />
                    <span className="font-medium text-accent">Micro-interactions Preview</span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="relative flex items-center gap-1">
                      <div className="text-xs text-muted-foreground">Next</div>
                      <div className="w-6 relative overflow-hidden flex items-center">
                        <ArrowRight className="h-4 w-4 text-accent absolute animate-[bounceX_1.5s_ease-in-out_infinite]" />
                      </div>
                    </div>
                    
                    <div className="relative overflow-hidden rounded-md p-0.5 bg-gradient-to-r from-accent/60 via-accent to-accent/60 animate-pulse-slow">
                      <div className="relative px-3 py-1 bg-background/95 rounded-[3px] text-sm font-medium text-accent">
                        Animated Elements
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Small teaser for Advanced Blogging section */}
        <div className="mt-12 bg-secondary/30 border border-primary/30 rounded-lg p-6 max-w-2xl mx-auto shadow-[0_0_15px_rgba(0,128,255,0.07)]">
          <div className="text-center">
            <h3 className="text-lg font-medium font-heading mb-2">Looking for advanced blogging capabilities?</h3>
            <p className="text-muted-foreground mb-4">Check out our WordPress + Astro integration below.</p>
            <div className="inline-block text-primary text-sm">
              <a href="/headless-cms" className="flex items-center hover:underline">
                <span>Learn more about Advanced Blogging</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}