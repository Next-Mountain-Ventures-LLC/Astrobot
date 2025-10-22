import React, { useState } from 'react';
import { Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MailingListSignup() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Send form data to the API
      const formData = new FormData();
      formData.append('form_name', 'Blog Newsletter Signup');
      formData.append('email', email);
      
      const response = await fetch('https://api.new.website/api/submit-form/', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        setIsSuccess(true);
        setEmail('');
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="my-8 p-6 bg-secondary/20 border border-primary/20 rounded-lg backdrop-blur-sm">
      <div className="flex items-start space-x-4">
        <div className="hidden md:flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full border border-primary/20">
          <Rocket className="h-6 w-6 text-primary" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-heading font-semibold mb-2">Get the Latest Updates</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Sign up for our newsletter to receive the latest articles, tips, and resources directly to your inbox.
          </p>
          
          {isSuccess ? (
            <div className="text-sm p-3 bg-green-500/10 border border-green-500/30 rounded-md">
              Thank you for subscribing! You'll receive updates soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3" data-form-type="utility">
              <div className="flex space-x-2">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                  required
                />
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="whitespace-nowrap"
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </div>
              
              {error && (
                <div className="text-xs text-red-500">{error}</div>
              )}
              
              <p className="text-xs text-muted-foreground">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}