import { sanitizeHtml } from './utils';

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface WordPressTag {
  id: number;
  name: string;
  slug: string;
}

export interface WordPressFeaturedMedia {
  id: number;
  source_url: string;
  alt_text: string;
}

export interface WordPressAuthor {
  id: number;
  name: string;
  avatar_urls: {
    [key: string]: string;
  };
}

export interface WordPressPost {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  date: string;
  modified: string;
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: WordPressFeaturedMedia[];
    'wp:term'?: Array<WordPressCategory[] | WordPressTag[]>;
    'author'?: WordPressAuthor[];
  };
  categories: number[];
  tags: number[];
}

export interface ProcessedPost {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  modified: string;
  featuredMedia?: {
    url: string;
    alt: string;
  };
  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
  tags: {
    id: number;
    name: string;
    slug: string;
  }[];
  author?: {
    id: number;
    name: string;
    avatar: string;
  };
}

// WordPress API base URL - Use environment variable or fallback to production URL
const WP_API_URL = import.meta.env.WORDPRESS_API_URL || 'https://blog.nxtmt.ventures/wp-json/wp/v2';
const ASTROBOT_CATEGORY_SLUG = import.meta.env.WORDPRESS_CATEGORY_SLUG || 'astrobot-design'; // Slug for filtering posts

// Fetch categories to get the ID of the Astrobot.design category
export async function getCategories(): Promise<WordPressCategory[]> {
  try {
    console.log(`📡 Fetching categories from WordPress API at ${WP_API_URL}/categories`);
    const response = await fetch(`${WP_API_URL}/categories?per_page=100`);
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }
    const categories = await response.json();
    console.log(`✅ Found ${categories.length} categories from WordPress`);
    return categories;
  } catch (error) {
    console.error('❌ Error fetching WordPress categories:', error);
    return [];
  }
}

// Get Astrobot.design category ID
export async function getAstrobotCategoryId(): Promise<number | null> {
  const categories = await getCategories();

  if (categories.length === 0) {
    console.warn('⚠️ No categories found from WordPress API. This may indicate a connectivity issue.');
    console.warn('🔧 Using hardcoded fallback: astrobot-design category ID is 6');
    return 6;
  }

  console.log(`🔍 Looking for category with slug "${ASTROBOT_CATEGORY_SLUG}" among ${categories.length} categories`);
  const astrobotCategory = categories.find(cat =>
    cat.slug === ASTROBOT_CATEGORY_SLUG ||
    cat.slug === 'astrobotdesign' ||
    cat.name.toLowerCase().includes('astrobot')
  );

  if (!astrobotCategory) {
    console.warn(
      `⚠️ Category not found: "${ASTROBOT_CATEGORY_SLUG}". Available categories:`,
      categories.map(c => `${c.slug} (${c.name})`).join(', ')
    );
    console.warn('🔧 Using hardcoded fallback: astrobot-design category ID is 6');
    return 6;
  }

  console.log(`✅ Found "${ASTROBOT_CATEGORY_SLUG}" category with ID: ${astrobotCategory.id}`);
  return astrobotCategory.id;
}

/**
 * Fetch posts from the WordPress API
 *
 * IMPORTANT: This function is called at BUILD TIME, not runtime.
 *
 * When deployed with GitHub Actions:
 * 1. Zapier detects a new post in WordPress
 * 2. Zapier triggers a GitHub Actions workflow via webhook
 * 3. GitHub Actions runs: npm run build
 * 4. During build, this function fetches the latest posts from WordPress
 * 5. Static HTML is generated with the latest posts
 * 6. Updated site is deployed
 *
 * Fallback: If WordPress API is unavailable, mock data is used for development
 */
const MOCK_POSTS: ProcessedPost[] = [
  {
    id: 1,
    slug: 'what-is-astro',
    title: 'What is Astro and Why It\'s Perfect for Your Business Website',
    content: `<p>Astro is a modern web framework for building fast, content-focused websites. Unlike traditional frameworks, Astro adopts a unique "islands architecture" that delivers only the JavaScript necessary for interactivity.</p>
    <h2>Zero JavaScript by Default</h2>
    <p>Astro ships zero JavaScript to the browser by default, making your websites incredibly fast. This is perfect for business websites where content matters more than complex interactivity.</p>
    <h2>Use Any UI Framework</h2>
    <p>With Astro, you can use React, Vue, Svelte, or any other UI framework you prefer - or none at all! This flexibility makes it perfect for teams with different skill sets.</p>
    <h2>Built for SEO</h2>
    <p>Astro's static site generation creates lightning-fast websites that search engines love. Better performance means better rankings.</p>`,
    excerpt: 'Discover why Astro is the perfect framework for building your business website with its zero-JavaScript-by-default approach and incredible speed.',
    date: '2023-12-15T00:00:00.000Z',
    modified: '2023-12-16T00:00:00.000Z',
    featuredMedia: {
      url: 'https://plus.unsplash.com/premium_photo-1681487764745-a3b7f2841bec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Astro framework visualization'
    },
    categories: [
      { id: 2, name: 'Frameworks', slug: 'frameworks' },
      { id: 3, name: 'Web Development', slug: 'web-development' }
    ],
    tags: [
      { id: 1, name: 'Performance', slug: 'performance' },
      { id: 2, name: 'Jamstack', slug: 'jamstack' }
    ],
    author: {
      id: 1,
      name: 'Astro Developer',
      avatar: 'https://i.pravatar.cc/96?img=1'
    }
  },
  {
    id: 2,
    slug: 'test',
    title: '75% Faster: How Static Site Generation Boosts Business Websites',
    content: `<p>Traditional WordPress websites are slowing your business down. Learn how static site generation can transform your online presence with incredible performance gains.</p>
    <h2>The Problem with Traditional Sites</h2>
    <p>Every time a user visits a traditional dynamic website, the server has to build the page from scratch - querying databases, running server-side code, and assembling the HTML. This process causes delays that hurt your conversion rates.</p>
    <h2>The Static Site Advantage</h2>
    <p>Static sites are pre-rendered during the build process. When a visitor arrives, the server simply delivers ready-made HTML files - no processing required. The result? Lightning-fast page loads that engage visitors immediately.</p>
    <h2>Real-World Results</h2>
    <p>Our clients have seen average speed improvements of 75% after migrating from traditional WordPress to Astro static sites. This translates to better SEO, higher conversion rates, and improved user experience.</p>`,
    excerpt: 'Discover how migrating from traditional WordPress to static site generation can make your business website up to 75% faster, improving SEO and conversions.',
    date: '2023-11-28T00:00:00.000Z',
    modified: '2023-11-30T00:00:00.000Z',
    featuredMedia: {
      url: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Speed visualization with light trails'
    },
    categories: [
      { id: 4, name: 'Performance', slug: 'performance' },
      { id: 5, name: 'Business', slug: 'business' }
    ],
    tags: [
      { id: 3, name: 'Speed', slug: 'speed' },
      { id: 4, name: 'WordPress', slug: 'wordpress' }
    ],
    author: {
      id: 2,
      name: 'Performance Expert',
      avatar: 'https://i.pravatar.cc/96?img=2'
    }
  },
  {
    id: 3,
    slug: 'seo-benefits',
    title: 'SEO Benefits of Fast-Loading Websites Built with Astro',
    content: `<p>Google's Core Web Vitals are now a ranking factor. Learn how Astro-powered websites naturally excel at these critical performance metrics.</p>
    <h2>Core Web Vitals Explained</h2>
    <p>Google's Core Web Vitals measure real-world user experience metrics like loading performance, interactivity, and visual stability. Since May 2021, these metrics directly impact your search rankings.</p>
    <h2>How Astro Delivers Superior Results</h2>
    <p>Astro's architecture is uniquely positioned to excel at Core Web Vitals:</p>
    <ul>
      <li>Zero JavaScript by default means faster Largest Contentful Paint (LCP)</li>
      <li>No unnecessary framework code means better First Input Delay (FID)</li>
      <li>Static HTML generation reduces Cumulative Layout Shift (CLS)</li>
    </ul>
    <h2>Real-World SEO Improvements</h2>
    <p>Our clients typically see Core Web Vitals scores improve from the 30-50 range to 90+ after migrating to Astro-powered sites, resulting in measurable ranking improvements.</p>`,
    excerpt: "Google's Core Web Vitals are now critical ranking factors. Learn how Astro-powered websites naturally excel at these performance metrics for better SEO results.",
    date: '2023-10-15T00:00:00.000Z',
    modified: '2023-10-20T00:00:00.000Z',
    featuredMedia: {
      url: 'https://images.unsplash.com/photo-1562577308-c8b2614b9b9a?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'SEO and analytics visualization'
    },
    categories: [
      { id: 6, name: 'SEO', slug: 'seo' },
      { id: 7, name: 'Marketing', slug: 'marketing' }
    ],
    tags: [
      { id: 5, name: 'Core Web Vitals', slug: 'core-web-vitals' },
      { id: 6, name: 'Google', slug: 'google' }
    ],
    author: {
      id: 3,
      name: 'SEO Specialist',
      avatar: 'https://i.pravatar.cc/96?img=3'
    }
  },
];

// Helper function to fetch with timeout (compatible with all Node versions)
async function fetchWithTimeout(
  url: string,
  options: RequestInit & { timeout?: number } = {}
): Promise<Response> {
  const { timeout = 15000, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export async function getPosts(
  page: number = 1,
  perPage: number = 10,
  categoryId?: number
): Promise<ProcessedPost[]> {
  try {
    // If no categoryId provided, try to get the Astrobot category ID
    if (!categoryId) {
      console.log(`🔍 getPosts: Fetching category ID for "${ASTROBOT_CATEGORY_SLUG}"...`);
      categoryId = await getAstrobotCategoryId();
      if (!categoryId) {
        throw new Error('Could not determine Astrobot.design category ID from WordPress API');
      }
    }

    // Construct the API URL with parameters
    let url = `${WP_API_URL}/posts?_embed=true&page=${page}&per_page=${perPage}`;

    // Add category filter
    if (categoryId) {
      url += `&categories=${categoryId}`;
    }

    try {
      console.log(`📡 getPosts: Fetching from WordPress API with category ID ${categoryId}...`);
      console.log(`📍 getPosts: API URL: ${url}`);
      const response = await fetchWithTimeout(url, { timeout: 15000 }); // 15s timeout for build processes
      if (!response.ok) {
        throw new Error(`WordPress API returned status ${response.status}: ${response.statusText}`);
      }

      const posts: WordPressPost[] = await response.json();
      const processedPosts = posts.map(processPost);
      console.log(`✅ getPosts: Successfully fetched ${posts.length} posts from WordPress API`);
      return processedPosts;
    } catch (fetchError) {
      // Log error but continue with mock data
      const errorMessage = fetchError instanceof Error ? fetchError.message : String(fetchError);
      console.warn(`❌ Failed to fetch from WordPress API: ${errorMessage}`);
      console.warn(`⚠️ getPosts: Falling back to ${MOCK_POSTS.length} mock posts`);

      // Return paginated mock data
      const start = (page - 1) * perPage;
      const end = start + perPage;
      return MOCK_POSTS.slice(start, end);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('❌ Error in getPosts:', errorMessage);
    console.warn(`⚠️ getPosts: Falling back to ${MOCK_POSTS.length} mock posts`);
    // Fallback to mock data in case of any error
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return MOCK_POSTS.slice(start, end);
  }
}

// Fetch a single post by slug
export async function getPostBySlug(slug: string): Promise<ProcessedPost | null> {
  try {
    const apiUrl = `${WP_API_URL}/posts?_embed=true&slug=${slug}`;

    try {
      const response = await fetch(
        apiUrl,
        { signal: AbortSignal.timeout(10000) } // 10s timeout for build processes
      );

      if (!response.ok) {
        throw new Error(`WordPress API returned status ${response.status}: ${response.statusText}`);
      }

      const posts: WordPressPost[] = await response.json();
      if (posts.length === 0) {
        throw new Error(`Post with slug "${slug}" not found in WordPress API`);
      }

      return processPost(posts[0]);
    } catch (fetchError) {
      // Look for the post in mock data
      const mockPost = MOCK_POSTS.find(post => post.slug === slug);
      if (mockPost) {
        return mockPost;
      } else {
        console.error(`Post "${slug}" not found`);
        return null;
      }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Error in getPostBySlug for "${slug}":`, errorMessage);

    // Last resort fallback to mock data
    const mockPost = MOCK_POSTS.find(post => post.slug === slug);
    return mockPost || null;
  }
}

// Process WordPress post into a more usable format
function processPost(post: WordPressPost): ProcessedPost {
  // Extract featured media
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
  
  // Extract categories
  const categoriesArray = post._embedded?.['wp:term']?.[0] as WordPressCategory[] || [];
  
  // Extract tags
  const tagsArray = post._embedded?.['wp:term']?.[1] as WordPressTag[] || [];
  
  // Extract author
  const author = post._embedded?.['author']?.[0];

  // Create processed post
  return {
    id: post.id,
    slug: post.slug,
    title: post.title.rendered,
    content: sanitizeHtml(post.content.rendered),
    excerpt: sanitizeHtml(post.excerpt.rendered),
    date: post.date,
    modified: post.modified,
    featuredMedia: featuredMedia
      ? {
          url: featuredMedia.source_url,
          alt: featuredMedia.alt_text || '',
        }
      : undefined,
    categories: categoriesArray
      .filter(cat => cat.slug !== ASTROBOT_CATEGORY_SLUG) // Filter out the Astrobot.design category
      .map(cat => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
      })),
    tags: tagsArray.map(tag => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
    })),
    author: author
      ? {
          id: author.id,
          name: author.name,
          avatar: author.avatar_urls['96'] || '',
        }
      : undefined,
  };
}
