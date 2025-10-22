import React, { useState, useEffect } from 'react';
import type { ProcessedPost } from '@/lib/wordpress';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, ArrowRight, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogCarouselProps {
  posts: ProcessedPost[];
}

export default function BlogCarousel({ posts }: BlogCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const nextPost = () => {
    if (isAnimating || posts.length <= 1) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
  };
  
  const prevPost = () => {
    if (isAnimating || posts.length <= 1) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + posts.length) % posts.length);
  };
  
  // Handle animation end
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Match this to the CSS transition duration
    
    return () => clearTimeout(timer);
  }, [currentIndex]);
  
  // Auto rotation (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      if (posts.length > 1) {
        nextPost();
      }
    }, 6000); // Change posts every 6 seconds
    
    return () => clearInterval(interval);
  }, [posts.length, currentIndex, isAnimating]);
  
  if (!posts || posts.length === 0) {
    return null;
  }
  
  return (
    <div className="py-12 relative">
      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">
            From Our Blog
          </h2>
          <p className="text-xl text-muted-foreground">
            Explore our latest insights and tips
          </p>
        </div>
        
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out" 
            style={{ 
              transform: `translateX(-${currentIndex * 100}%)`,
              width: `${posts.length * 100}%`
            }}
          >
            {posts.map((post) => (
              <div key={post.id} className="w-full flex-shrink-0 px-4">
                <div className="bg-secondary/30 border border-primary/20 rounded-lg overflow-hidden shadow-lg backdrop-blur-sm transform transition-all duration-300 hover:shadow-primary/10 hover:-translate-y-1">
                  {post.featuredMedia && (
                    <div className="relative h-48 md:h-64 overflow-hidden">
                      <img 
                        src={post.featuredMedia.url} 
                        alt={post.featuredMedia.alt || post.title} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80"></div>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center text-xs text-muted-foreground mb-3">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{formatDate(post.date)}</span>
                      
                      {post.categories.length > 0 && (
                        <>
                          <span className="mx-2">•</span>
                          <Tag className="h-3 w-3 mr-1" />
                          <span>
                            {post.categories.map(cat => cat.name).join(', ')}
                          </span>
                        </>
                      )}
                    </div>
                    
                    <h3 className="font-heading text-xl md:text-2xl font-medium mb-3">
                      {post.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-6">
                      {post.excerpt.replace(/<[^>]*>/g, '').substring(0, 150)}...
                    </p>
                    
                    <a 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                    >
                      Read Article
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Navigation dots */}
        {posts.length > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {posts.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                  }
                }}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === index 
                    ? 'w-6 bg-primary' 
                    : 'w-2 bg-primary/30'
                }`}
                aria-label={`Go to post ${index + 1}`}
              />
            ))}
          </div>
        )}
        
        {/* Navigation arrows */}
        {posts.length > 1 && (
          <>
            <button
              onClick={prevPost}
              className="absolute top-1/2 left-4 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
              disabled={isAnimating}
              aria-label="Previous post"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextPost}
              className="absolute top-1/2 right-4 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
              disabled={isAnimating}
              aria-label="Next post"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </>
        )}
        
        {/* View all blogs link */}
        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            className="border-primary/30 bg-secondary/80 hover:bg-primary/10"
            asChild
          >
            <a href="/blog">
              View All Articles <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}