import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// HTML entity decoding helper
export function decodeHtmlEntities(text: string): string {
  // Common HTML entities
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&#8217;': "'", // Right single quotation mark
    '&#8216;': "'", // Left single quotation mark
    '&#8220;': '"', // Left double quotation mark
    '&#8221;': '"', // Right double quotation mark
    '&#8211;': '–', // En dash
    '&#8212;': '—', // Em dash
    '&#8230;': '…', // Horizontal ellipsis
    '&#8482;': '™', // Trade mark sign
    '&#169;': '©',  // Copyright sign
    '&#174;': '®',  // Registered sign
    '&copy;': '©',  // Copyright sign
    '&reg;': '®',   // Registered sign
    '&trade;': '™', // Trade mark sign
    '&hellip;': '…',
    '&mdash;': '—',
    '&ndash;': '–',
    '&ldquo;': '"',
    '&rdquo;': '"',
    '&lsquo;': "'",
    '&rsquo;': "'",
    '&nbsp;': ' ',
  };
  
  let decodedText = text;
  
  // Replace known entities
  for (const [entity, char] of Object.entries(entities)) {
    decodedText = decodedText.replace(new RegExp(entity, 'g'), char);
  }
  
  // Handle numeric entities (&#123; format)
  decodedText = decodedText.replace(/&#(\d+);/g, (match, dec) => {
    return String.fromCharCode(parseInt(dec, 10));
  });
  
  // Handle hex entities (&#x12F; format)
  decodedText = decodedText.replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });
  
  return decodedText;
}

// Simple HTML sanitizer - in production, consider using a proper sanitizer library like DOMPurify
export function sanitizeHtml(html: string): string {
  // Basic sanitization - remove script tags and event handlers
  let sanitized = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/g, '')
    .replace(/on\w+='[^']*'/g, '')
    .replace(/on\w+=\w+/g, '');
  
  // Decode HTML entities
  return decodeHtmlEntities(sanitized);
}

// Format date to human-readable format
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  }).format(date);
}

// Clean HTML and decode entities for display as plain text
export function cleanHtmlForDisplay(html: string): string {
  // Remove HTML tags first
  const withoutTags = html.replace(/<\/?[^>]+(>|$)/g, '');
  
  // Decode HTML entities
  return decodeHtmlEntities(withoutTags);
}

// Generate excerpt from HTML content if needed
export function generateExcerpt(content: string, length: number = 150): string {
  // Clean HTML tags and decode entities
  const text = cleanHtmlForDisplay(content);
  
  // Truncate to desired length
  return text.length > length
    ? `${text.substring(0, length)}...`
    : text;
}
