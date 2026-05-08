import { getPosts } from './wordpress';

/**
 * Get all unique categories from blog posts
 * This is called at build time and auto-discovers categories from WordPress
 */
export async function getAllCategories() {
  const posts = await getPosts(1, 100);
  
  const categories = new Set<string>();
  posts.forEach(post => {
    post.categories.forEach(cat => {
      categories.add(cat.slug);
    });
  });
  
  return Array.from(categories).sort();
}

/**
 * Get display name for a category slug
 * Automatically generates readable names from slugs
 */
export function getCategoryDisplayName(slug: string): string {
  // Predefined names for common categories
  const displayNames: Record<string, string> = {
    "web-design": "Web Design",
    "web-speed": "Web Speed",
    "seo-technical": "Technical SEO",
    "websites-for-sale": "Websites for Sale",
    "case-studies": "Case Studies",
    "news-trends": "News & Trends",
    "about-astro": "About Astro",
    "case-study": "Case Studies",
    "how-to": "How To",
    "human-designers": "Human Designers"
  };
  
  // Return predefined name if it exists, otherwise auto-generate
  if (displayNames[slug]) {
    return displayNames[slug];
  }
  
  // Auto-generate: "my-category" → "My Category"
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Get all categories with their display names
 * Used for rendering category tabs across all blog pages
 */
export async function getCategoriesWithNames() {
  const categories = await getAllCategories();
  return categories.map(slug => ({
    slug,
    displayName: getCategoryDisplayName(slug)
  }));
}

/**
 * Get posts filtered by category
 */
export async function getPostsByCategory(categorySlug: string) {
  const posts = await getPosts(1, 100);
  return posts.filter(post =>
    post.categories.some(cat => cat.slug === categorySlug)
  );
}
