import React from 'react';
import { Facebook, Twitter, Linkedin, Link, Mail } from 'lucide-react';

interface SocialShareProps {
  url: string;
  title: string;
}

export default function SocialShare({ url, title }: SocialShareProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    } else {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="my-8">
      <h3 className="text-lg font-medium mb-3">Share This Article</h3>
      <div className="flex flex-wrap gap-2">
        <a 
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-10 h-10 bg-secondary/30 hover:bg-primary/10 text-primary rounded-full border border-primary/20 transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter size={18} />
        </a>
        <a 
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-10 h-10 bg-secondary/30 hover:bg-primary/10 text-primary rounded-full border border-primary/20 transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook size={18} />
        </a>
        <a 
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-10 h-10 bg-secondary/30 hover:bg-primary/10 text-primary rounded-full border border-primary/20 transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={18} />
        </a>
        <a 
          href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
          className="inline-flex items-center justify-center w-10 h-10 bg-secondary/30 hover:bg-primary/10 text-primary rounded-full border border-primary/20 transition-colors"
          aria-label="Share via Email"
        >
          <Mail size={18} />
        </a>
        <button 
          onClick={copyToClipboard}
          className="inline-flex items-center justify-center w-10 h-10 bg-secondary/30 hover:bg-primary/10 text-primary rounded-full border border-primary/20 transition-colors"
          aria-label="Copy link to clipboard"
        >
          <Link size={18} />
        </button>
      </div>
    </div>
  );
}