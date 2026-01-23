import React, { useState, useEffect, useRef } from 'react';
import type { ProcessedPost } from '@/lib/wordpress';
import { formatDate, cleanHtmlForDisplay } from '@/lib/utils';
import { ArrowLeft, ArrowRight, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogCarouselProps {
  posts: ProcessedPost[];
}

// Helper to ensure date is a Date object (handles serialized strings from server)
const ensureDate = (date: Date | string | undefined): Date | null => {
  if (!date) return null;
  if (date instanceof Date) return date;
  if (typeof date === 'string') return new Date(date);
  return null;
};

export default function BlogCarousel({ posts }: BlogCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Initialize with stable mobile default (1) to avoid hydration mismatch
  // The actual value will be computed on the client in useEffect
  const [postsPerSlide, setPostsPerSlide] = useState(1);

  // Calculate how many posts to show per slide based on viewport
  const getPostsPerSlide = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3; // Desktop
      if (window.innerWidth >= 768) return 2; // Tablet
    }
    return 1; // Mobile default
  };

  // Refs to track current state without causing interval recreation
  const totalSlidesRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const currentIndexRef = useRef(0);

  // Set initial postsPerSlide on client mount and update on window resize
  useEffect(() => {
    // Set initial value on client
    setPostsPerSlide(getPostsPerSlide());

    const handleResize = () => {
      setPostsPerSlide(getPostsPerSlide());
      // Reset to first slide when layout changes to avoid empty slides
      setCurrentIndex(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate total number of slides
  const totalSlides = Math.ceil(posts.length / postsPerSlide);

  // Keep refs in sync with state
  useEffect(() => {
    totalSlidesRef.current = totalSlides;
  }, [totalSlides]);

  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const nextPost = () => {
    if (isAnimatingRef.current || totalSlidesRef.current <= 1) return;
    setIsAnimating(true);
    const total = totalSlidesRef.current || 1; // Prevent modulo by zero
    setCurrentIndex((prevIndex) => (prevIndex + 1) % total);
  };

  const prevPost = () => {
    if (isAnimatingRef.current || totalSlidesRef.current <= 1) return;
    setIsAnimating(true);
    const total = totalSlidesRef.current || 1; // Prevent modulo by zero
    setCurrentIndex((prevIndex) => (prevIndex - 1 + total) % total);
  };

  // Handle animation end
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Match this to the CSS transition duration

    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Auto rotation - stable interval that doesn't recreate
  useEffect(() => {
    const interval = setInterval(() => {
      if (totalSlidesRef.current > 1 && !isAnimatingRef.current) {
        nextPost();
      }
    }, 6000); // Change posts every 6 seconds

    return () => clearInterval(interval);
  }, []); // Empty dependency array - refs keep values current
  
  if (!posts || posts.length === 0) {
    return null;
  }
  
  // Generate the slides based on postsPerSlide
  const slides = [];
  for (let i = 0; i < totalSlides; i++) {
    const slideItems = posts.slice(i * postsPerSlide, (i + 1) * postsPerSlide);
    slides.push(slideItems);
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
        
        <div className="relative overflow-hidden" suppressHydrationWarning>
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              width: `${totalSlides * 100}%`
            }}
            suppressHydrationWarning
          >
            {slides.map((slideItems, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div className="flex flex-wrap -mx-4">
                  {slideItems.map((post) => {
                    const postDate = ensureDate(post.date);
                    return (
                    <div key={post.id} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                      <div className="bg-secondary/30 border border-primary/20 rounded-lg overflow-hidden shadow-lg backdrop-blur-sm transform transition-all duration-300 hover:shadow-primary/10 hover:-translate-y-1 h-full">
                        {post.featuredMedia && (
                          <div className="relative h-48 md:h-64 overflow-hidden bg-secondary/50">
                            <img
                              src={post.featuredMedia.url}
                              alt={post.featuredMedia.alt || post.title}
                              loading="lazy"
                              decoding="async"
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80"></div>
                          </div>
                        )}

                        <div className="p-6">
                          <div className="flex items-center text-xs text-muted-foreground mb-3">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{postDate ? formatDate(postDate) : 'Date unavailable'}</span>

                            {post.categories.length > 0 && (
                              <>
                                <span className="mx-2">•</span>
                                <Tag className="h-3 w-3 mr-1" />
                                <span>
                                  {post.categories.map(cat => cleanHtmlForDisplay(cat.name)).join(', ')}
                                </span>
                              </>
                            )}
                          </div>

                          <h3 className="font-heading text-xl md:text-2xl font-medium mb-3">
                            {cleanHtmlForDisplay(post.title)}
                          </h3>

                          <p className="text-sm text-muted-foreground mb-6">
                            {cleanHtmlForDisplay(post.excerpt).substring(0, 150)}...
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
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Navigation dots */}
        {totalSlides > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
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
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
        
        {/* Navigation arrows */}
        {totalSlides > 1 && (
          <>
            <button
              onClick={prevPost}
              className="absolute top-1/2 left-4 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
              disabled={isAnimating}
              aria-label="Previous slide"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextPost}
              className="absolute top-1/2 right-4 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
              disabled={isAnimating}
              aria-label="Next slide"
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
