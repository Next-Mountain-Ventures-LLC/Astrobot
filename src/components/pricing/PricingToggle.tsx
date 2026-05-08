import React, { useState } from 'react';

interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  monthlyStripeLink: string;
  annualStripeLink: string;
  features: string[];
  isPopular?: boolean;
  buttonText?: string;
}

interface PricingToggleProps {
  plans: PricingPlan[];
}

export default function PricingToggle({ plans }: PricingToggleProps) {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div>
      {/* Toggle Button */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex items-center bg-secondary/30 border border-border rounded-full p-1">
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              isAnnual
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Annual
          </button>
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              !isAnnual
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`p-8 rounded-lg border transition-all ${
              plan.isPopular
                ? 'bg-background border-2 border-primary relative'
                : 'bg-background border-border hover:border-primary/50'
            }`}
          >
            {plan.isPopular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
            )}

            <h3 className="font-bold text-2xl mb-2">{plan.name}</h3>
            <p className="text-muted-foreground mb-6">{plan.description}</p>

            {/* Price Display */}
            <div className="mb-6">
              <p className="text-4xl font-bold">
                ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {isAnnual ? 'per year' : 'per month'}
              </p>
            </div>

            {/* Features */}
            <h4 className="font-bold mb-4">What's Included:</h4>
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <a
              href={isAnnual ? plan.annualStripeLink : plan.monthlyStripeLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`block w-full py-3 rounded-lg font-medium hover:opacity-90 transition-opacity text-center ${
                plan.isPopular
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-primary text-primary hover:bg-primary/10'
              }`}
            >
              {plan.buttonText || 'Get Started'}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
