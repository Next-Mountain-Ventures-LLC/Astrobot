import React from 'react';
import { Mail, Sparkles } from 'lucide-react';
import MailingListSignup from '../blog/MailingListSignup';

export default function Newsletter() {
  return (
    <section className="py-16 bg-secondary/10">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Mail className="w-5 h-5 text-primary" />
            <h2 className="text-lg uppercase tracking-wider font-medium text-primary">Newsletter</h2>
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          
          <h3 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
            Stay Updated with the Latest in Web Tech
          </h3>
          
          <p className="text-center text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our newsletter to receive exclusive insights, tips, and early access to new features.
            We share strategies that help your website outperform the competition.
          </p>
          
          <MailingListSignup />
        </div>
      </div>
    </section>
  );
}