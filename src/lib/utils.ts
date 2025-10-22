import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Simple HTML sanitizer - in production, consider using a proper sanitizer library like DOMPurify
export function sanitizeHtml(html: string): string {
  // Basic sanitization - remove script tags and event handlers
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/g, '')
    .replace(/on\w+='[^']*'/g, '')
    .replace(/on\w+=\w+/g, '');
}

// Format date to human-readable format
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  }).format(date);
}

// Generate excerpt from HTML content if needed
export function generateExcerpt(content: string, length: number = 150): string {
  // Remove HTML tags
  const text = content.replace(/<\/?[^>]+(>|$)/g, '');
  
  // Truncate to desired length
  return text.length > length
    ? `${text.substring(0, length)}...`
    : text;
}
