import React, { useState } from 'react';
import { Rocket, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MailingListSignup() {
  // Form data state
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [formattedPhone, setFormattedPhone] = useState('');
  
  // Form state
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [smsOptIn, setSmsOptIn] = useState(false);

  // Validate email
  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  // Format phone number with country code
  const formatPhoneWithCountryCode = (phoneNumber: string): string => {
    // Remove all non-digit characters
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    
    // Return empty string if no digits
    if (!digitsOnly) return '';
    
    // Check if it already has country code
    if (digitsOnly.startsWith('1') && digitsOnly.length === 11) {
      return `+${digitsOnly}`;
    } 
    
    // Add US country code (+1) if it's 10 digits
    if (digitsOnly.length === 10) {
      return `+1${digitsOnly}`;
    }
    
    // If it's some other format, just add + if not present
    if (digitsOnly.length > 0 && !phoneNumber.startsWith('+')) {
      return `+${digitsOnly}`;
    }
    
    // If it already starts with +, return as is (with non-digits removed)
    return phoneNumber.startsWith('+') ? `+${digitsOnly}` : phoneNumber;
  };
  
  // Handle phone number input
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setPhone(input);
    setFormattedPhone(formatPhoneWithCountryCode(input));
    // Auto-check SMS opt-in if phone number is provided, uncheck if cleared
    if (input.trim()) {
      setSmsOptIn(true);
    } else {
      setSmsOptIn(false);
    }
  };

  // Handle step 1 submission (email collection)
  const handleStepOne = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Send email to Zapier
      const formData = new FormData();
      formData.append('form_name', 'Blog Newsletter Signup');
      formData.append('email', email);

      const response = await fetch('https://hooks.zapier.com/hooks/catch/24996675/ur0odxr/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStep(2);
      } else {
        throw new Error('Failed to subscribe');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle final form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If phone number is provided, SMS checkbox must be checked
    if (phone.trim() && !smsOptIn) {
      setError('Please check the SMS consent box to provide your phone number.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Send form data to Zapier
      const formData = new FormData();
      formData.append('form_name', 'Blog Newsletter Signup');
      formData.append('email', email);
      formData.append('sms_opt_in', smsOptIn ? 'yes' : 'no');

      if (firstName.trim()) {
        formData.append('first_name', firstName);
      }

      if (lastName.trim()) {
        formData.append('last_name', lastName);
      }

      if (phone.trim()) {
        // Use the formatted phone number with country code
        const phoneWithCountryCode = formatPhoneWithCountryCode(phone);
        formData.append('phone', phoneWithCountryCode);
      }

      const response = await fetch('https://hooks.zapier.com/hooks/catch/24996675/ur0odxr/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setIsSuccess(true);
        // Reset form
        setEmail('');
        setFirstName('');
        setLastName('');
        setPhone('');
        setSmsOptIn(false);
        setStep(1);
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
            <div className="text-sm p-4 bg-green-500/10 border border-green-500/30 rounded-md">
              <p className="font-medium text-green-500 mb-1">Thank you for subscribing!</p>
              <p className="text-muted-foreground">You'll receive our next update directly to your inbox.</p>
            </div>
          ) : (
            <>
              {step === 1 ? (
                <form onSubmit={handleStepOne} className="space-y-3" data-form-type="utility">
                  <div className="flex space-x-2">
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                      required
                      disabled={isSubmitting}
                    />
                    <Button
                      type="submit"
                      className="whitespace-nowrap"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Subscribing...' : 'Next'}
                      {!isSubmitting && <ArrowRight className="ml-1 w-4 h-4" />}
                    </Button>
                  </div>
                  
                  {error && step === 1 && (
                    <div className="text-xs text-red-500">{error}</div>
                  )}
                  
                  <p className="text-xs text-muted-foreground">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" data-form-type="utility">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        name="first_name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="last_name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="Phone Number (optional but greatly appreciated 😊)"
                      className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Providing your phone number helps us deliver personalized content and time-sensitive updates more effectively.
                    </p>
                  </div>

                  <div className="p-3 bg-primary/5 border border-primary/20 rounded-md">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="sms_opt_in"
                        checked={smsOptIn}
                        onChange={(e) => setSmsOptIn(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary focus:ring-2 accent-primary"
                      />
                      <span className="text-xs text-muted-foreground leading-relaxed">
                        I consent to receive personal communication and marketing text messages. Message and data rates may apply. Reply STOP to unsubscribe.
                      </span>
                    </label>
                    {phone.trim() && !smsOptIn && (
                      <p className="mt-2 text-xs text-orange-600 font-medium">
                        Please check this box to provide your phone number.
                      </p>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => {
                        setStep(1);
                        setError('');
                      }}
                      className="text-xs text-primary hover:text-primary/80 underline"
                    >
                      Back to previous step
                    </button>
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                    </Button>
                  </div>
                  
                  {error && step === 2 && (
                    <div className="text-xs text-red-500">{error}</div>
                  )}
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
