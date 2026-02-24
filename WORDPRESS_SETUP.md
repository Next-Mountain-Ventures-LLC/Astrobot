# WordPress Integration Setup Guide

**Version:** 1.0  
**Last Updated:** February 2026  
**Purpose:** Single source of truth for setting up WordPress integration across multiple Astro sites using builder.io

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Architecture Overview](#architecture-overview)
3. [How It Works (Conceptual)](#how-it-works-conceptual)
4. [Complete Implementation Guide](#complete-implementation-guide)
5. [Setup Checklist for New Sites](#setup-checklist-for-new-sites)
6. [Configuration Variables Explained](#configuration-variables-explained)
7. [Troubleshooting Guide](#troubleshooting-guide)
8. [Performance Characteristics](#performance-characteristics)
9. [For Builder.io Prompt Reference](#for-builderio-prompt-reference)
10. [Maintenance & Updates](#maintenance--updates)
11. [Common Customizations](#common-customizations)
12. [Reference Implementation](#reference-implementation)

---

## Executive Summary

This guide provides complete instructions for integrating a WordPress blog with Astro static sites. The system fetches posts from a shared WordPress instance at **build time**, generates beautiful static HTML pages, and deploys them to GitHub Pages.

**Who should use this:** Developers setting up blog functionality for Astro sites that pull from the same WordPress API endpoint.

**⚡ For AI Agents Setting Up WordPress Integration:**

When using this guide with an AI agent (e.g., Builder.io, Claude, etc.), **ask for ONLY these two pieces of information:**

1. **WordPress Category Slug** (e.g., `astrobot-design`, `thefordamily`)
2. **Site Domain URL** (e.g., `https://yoursite.com`)

The AI agent should then:
- Read WORDPRESS_SETUP.md
- Implement sections 4.1-4.6 exactly as documented
- NOT ask follow-up questions
- Preserve any existing custom designs
- Use the standardized Builder.io prompt template (section 9)

Everything else is handled automatically. Do NOT ask for WordPress API URL, Node version, package manager, or other configuration details.

**Quick Links:**
- [Setup Checklist](#setup-checklist-for-new-sites) - Start here for new sites
- [Troubleshooting](#troubleshooting-guide) - Fix common issues
- [Builder.io Prompt Template](#for-builderio-prompt-reference) - AI agents: Use this exact prompt format
- [Information Needed From User](#information-needed-from-user) - AI agents: Ask ONLY for these two items

---

## ⚡ Quick Start for AI Agents

If you're an AI agent (Claude, Builder.io, etc.) being asked to set up WordPress integration:

1. **Get user input:**
   - Ask: "What is your WordPress category slug?" (e.g., `thefordamily`, `spirituality`)
   - Ask: "What is your site's domain?" (e.g., `https://mysite.com`)
   - Stop asking questions after these two items

2. **Implement automatically:**
   - Read sections 4.1 through 4.6 of this document
   - Check if `src/pages/blog/index.astro` and `src/components/home/BlogPreview.astro` exist
   - If they exist → DO NOT modify them (preserve custom designs)
   - If they don't exist → Create them from the templates
   - Always create `src/lib/wordpress.ts` (safe, usually new)
   - Always create `src/pages/blog/[slug].astro` (safe, usually new)

3. **Update configuration:**
   - `astro.config.ts`: Change `site:` to the user's domain
   - `.github/workflows/deploy.yml`: Change `WORDPRESS_CATEGORY_SLUG` env var
   - `.env.example`: Change `WORDPRESS_CATEGORY_SLUG` value

4. **Do NOT change:**
   - WordPress API URL (always `https://blog.nxtmt.ventures/wp-json/wp/v2`)
   - Node version (always 20)
   - pnpm version (always 10.29.2)
   - Package manager
   - Other configuration details

5. **After implementation:**
   - Suggest running `pnpm build` locally
   - Verify output shows "✅ getPosts: Successfully fetched X posts"

That's it! See [For Builder.io Prompt Reference](#for-builderio-prompt-reference) for the template prompt.

---

## ⚠️ Important: AI Agents Must Maintain This Documentation

**This is critical:** As WORDPRESS_SETUP.md is deployed to different sites and we debug/improve the integration, **AI agents MUST update this file whenever they change code.**

### Why This Matters

This file serves as:
- The **single source of truth** for WordPress integration across all sites
- The **reference guide** for future implementations
- The **troubleshooting resource** for all users

When you discover bugs, make improvements, or change the implementation approach during site deployments, those changes need to be documented **immediately** so that:
- Future sites benefit from the lessons learned
- Users don't encounter the same problems
- The integration gets better with each implementation
- Joshua doesn't need to come back and manually update documentation

### When to Update WORDPRESS_SETUP.md

**You MUST update this file if you:**
- Fix a bug in any of the code files (update relevant sections and troubleshooting)
- Change how environment variables are handled
- Modify the build process or GitHub Actions workflow
- Discover new best practices or gotchas
- Change requirements for any configuration file
- Find that parts of the documentation don't match the actual implementation
- Discover a simpler or better approach than what's documented
- Fix an error in the code examples

### How to Update WORDPRESS_SETUP.md

1. **Update the relevant section** - If you change `src/lib/wordpress.ts`, update section 4.1
2. **Update example code blocks** - Keep code examples in sync with actual implementation
3. **Update troubleshooting** - Add any new errors you encounter and how to fix them
4. **Update setup checklist** - If the steps change, reflect that in the checklist
5. **Add to "Common Customizations"** - If you discover a common pattern, document it
6. **Update the "For Builder.io Prompt Reference"** - If implementation steps change

### Example: If You Fix a Bug

**Scenario:** You find that `cleanHtmlForDisplay()` doesn't handle a specific HTML entity correctly.

**What you must do:**
1. Fix the bug in `src/lib/utils.ts`
2. Update the code example in section 4.1 or 4.6
3. Add to troubleshooting: "HTML entities not displaying correctly" with the solution
4. Update any relevant comments about the fix
5. Push the updated WORDPRESS_SETUP.md along with the code fix

**Don't:** Just fix the code and push without updating the docs

### Example: If You Improve the Workflow

**Scenario:** You discover a better way to handle environment variables or cache management.

**What you must do:**
1. Implement the improvement
2. Update the relevant sections in WORDPRESS_SETUP.md
3. Update the code examples to show the new approach
4. Update the "How It Works" conceptual section
5. Update the setup checklist if needed
6. Push everything together

**Don't:** Implement a better approach but leave the old documentation in place

### Example: If You Find Documentation Doesn't Match Code

**Scenario:** The documentation says to set `WORDPRESS_CATEGORY_SLUG` in the workflow, but the actual code reads from `.env`.

**What you must do:**
1. Correct the documentation to match the actual implementation
2. OR change the code to match the documentation (if that's better)
3. Either way, make sure docs and code match

**Don't:** Leave a discrepancy that confuses future developers

### Files That Require Documentation Updates

When you change these files, **you must also update WORDPRESS_SETUP.md:**

- `src/lib/wordpress.ts` → Update section 4.1 (WordPress API Integration)
- `src/lib/utils.ts` → Update section 4.2 (Utility Functions)
- `src/pages/blog/[slug].astro` → Update section 4.3 (Individual Post Pages)
- `src/pages/blog/index.astro` → Update section 4.3 (Blog Index Page)
- `src/components/home/BlogPreview.astro` → Update section 4.4 (Blog Carousel)
- `.github/workflows/deploy.yml` → Update section 4.5 (GitHub Actions)
- `astro.config.ts` → Update section 4.6 (Configuration Files)
- `.env.example` → Update section 4.6 (Configuration Files)

### Documentation as a Team Responsibility

This is **not optional** - maintaining WORDPRESS_SETUP.md is as important as writing the code. Each person who touches this integration is responsible for keeping the documentation accurate.

Think of it this way: **If it's not documented, it didn't happen.** The next AI agent won't know about your fix, improvement, or discovery unless it's written in this file.

---

## Architecture Overview

### System Flow

```
WordPress Blog Instance (blog.nxtmt.ventures)
        ↓
   Zapier Webhook
        ↓
GitHub Actions Trigger (on push to main)
        ↓
Astro Build Process:
  1. Fetch all posts from WordPress API (category-filtered)
  2. In-memory cache prevents redundant API calls
  3. Generate static HTML for each blog post
  4. Generate blog index page (listing all posts)
  5. Generate homepage blog carousel
        ↓
   GitHub Pages Deployment
        ↓
Live Site (static HTML, zero dynamic requests)
```

### Why This Architecture?

- **Non-redundant API calls:** Build-time fetching with in-memory caching means WordPress API is called 1-2 times per build, not 10+
- **Static generation:** No runtime database calls = faster pages, better SEO, reduced server costs
- **Category filtering:** Same WordPress instance, different categories per site
- **Automatic updates:** Zapier triggers rebuild when posts are published
- **Fallback data:** Mock posts ensure site works even if WordPress API is temporarily unavailable

---

## How It Works (Conceptual)

### 1. WordPress Category Filtering

Each site filters posts by a unique category slug:

- **Site A:** `astrobot-design` (astrobot.design)
- **Site B:** `thefordamily` (thefordamily.life)
- **Site C:** `your-category-slug` (yoursite.com)

**How it works:**
1. `WORDPRESS_CATEGORY_SLUG` environment variable stores the category slug
2. `getAstrobotCategoryId()` function looks up category ID from WordPress API
3. `getPosts()` filters all posts by that category ID
4. Only posts in that category appear on your site

### 2. In-Memory Caching During Build

The WordPress integration uses a simple in-memory cache to prevent redundant API calls:

```
First call to getPosts():     → Hits WordPress API, caches result
Second call to getPosts():    → Uses cached data (no API call)
Third call to getPosts():     → Uses cached data (no API call)
```

**Why this works:** During a single Astro build, multiple components need posts:
- `src/pages/blog/[slug].astro` (generate blog pages)
- `src/pages/blog/index.astro` (blog listing page)
- `src/components/home/BlogPreview.astro` (homepage carousel)

Without caching, each would make separate API calls. With caching, only the first call hits the API.

### 3. Category Filtering: Filter Category vs. Display Categories

**Important distinction:**

- **Filter Category** (e.g., `astrobot-design`): Used internally to fetch only posts for this site. **NEVER displayed** on blog cards, carousels, or detail pages.
- **Display Categories** (all other categories): Pulled from WordPress and **ALWAYS shown** as category tags/labels on blog posts.

**How it works:**

When a post is published in WordPress with multiple categories:
```
Post: "My Blog Post"
  Categories: [astrobot-design, Web Development, Performance]
```

After processing:
- `astrobot-design` is filtered out (hidden)
- `Web Development` and `Performance` are displayed as category tags

**In code (src/lib/wordpress.ts):**
```typescript
categories: categoriesArray
  .filter(cat => cat.slug !== WORDPRESS_CATEGORY_SLUG) // Hide filter category
  .map(cat => ({...})) // Keep other categories
```

**What users see:**
- Blog cards show: "Web Development • Performance"
- `astrobot-design` category is never visible
- Each site only sees posts from its category, but displays all other categories

---

### 4. Per-Page Parameter Importance

**Always use `per_page=100` in API requests, then slice locally in components.**

Why? WordPress API returns different results based on the `per_page` parameter:
- `per_page=12` → returns 5 posts (inconsistent)
- `per_page=6` → returns 4 posts (inconsistent)
- `per_page=100` → returns 4 posts (consistent)

The solution: Fetch all posts with `per_page=100`, then slice locally:

```typescript
const allPosts = await getPosts(1, 100);  // Fetch all posts
const posts = allPosts.slice(0, 12);      // Display first 12
```

### 5. Static Generation (Build-Time Rendering)

Astro is a static site generator. At build time:

1. `getStaticPaths()` calls `getPosts()` to get all blog posts
2. For each post, a static HTML file is pre-generated
3. These files are saved in `/dist/blog/[slug]/index.html`
4. When visitors access `/blog/astro-guide/`, they get the pre-built HTML file

No runtime processing = blazing fast pages.

### 6. GitHub Actions Trigger

The deploy workflow runs when:

1. Code is pushed to `main` branch (automatic)
2. Zapier webhook triggers workflow (manual trigger from WordPress)
3. `workflow_dispatch` button in GitHub Actions UI (manual)

Each trigger:
- Runs `pnpm install` to install dependencies
- Runs `pnpm build` to generate static site
- Uploads `/dist` folder to GitHub Pages
- Site goes live in ~5-10 seconds

---

## Complete Implementation Guide

### 4.1 - WordPress API Layer (src/lib/wordpress.ts)

This file is the core of the WordPress integration. It handles all API communication, caching, retries, and fallback data.

**Key features:**
- `fetchWithTimeout()`: Fetch with timeout, retry logic, and detailed error categorization
- `getAstrobotCategoryId()`: Get category ID for `WORDPRESS_CATEGORY_SLUG`
- `getPosts()`: Main function with in-memory caching
- `processPost()`: Convert WordPress data to clean format, strips HTML from excerpts
- `healthCheckWordPress()`: Pre-flight connectivity check
- Mock data fallback for development

**Important excerpt and entity handling:** The `processPost()` function extracts the excerpt from WordPress and sanitizes it. When displaying excerpts, titles, or any text in components, **always** use `cleanHtmlForDisplay()` to:
1. Remove any HTML tags
2. Decode HTML entities (see HTML Entity Handling section below)
3. Convert special characters properly

This prevents `<p>` tags and HTML entities from appearing in preview text.

**HTML Entity Handling:** WordPress sometimes returns post titles and content with HTML entities instead of regular characters:
- Apostrophes appear as `&rsquo;` or `&#39;`
- Quotation marks appear as `&ldquo;` or `&rdquo;` or `&quot;`
- Dashes appear as `&#8211;` (en dash) or `&#8212;` (em dash)
- Other special characters like `&amp;`, `&copy;`, etc.

The `cleanHtmlForDisplay()` function automatically decodes these entities to their proper characters. No additional configuration needed.

**Complete file content:**

```typescript
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
const ASTROBOT_CATEGORY_SLUG = import.meta.env.WORDPRESS_CATEGORY_SLUG || 'astrobot-design';

// Simple cache to avoid redundant API calls during build
const postCache = new Map<string, ProcessedPost[]>();

// Fetch categories to get the ID of the category
export async function getCategories(): Promise<WordPressCategory[]> {
  try {
    console.log(`📡 Fetching categories from WordPress API at ${WP_API_URL}/categories`);
    const response = await fetchWithTimeout(`${WP_API_URL}/categories?per_page=100`, { timeout: 15000 });
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

// Get category ID for the WORDPRESS_CATEGORY_SLUG
export async function getAstrobotCategoryId(): Promise<number | null> {
  const categories = await getCategories();

  if (categories.length === 0) {
    console.warn('⚠️ No categories found from WordPress API. This may indicate a connectivity issue.');
    console.warn('🔧 Using hardcoded fallback: category ID is 6');
    return 6;
  }

  console.log(`🔍 Looking for category with slug "${ASTROBOT_CATEGORY_SLUG}" among ${categories.length} categories`);
  const targetCategory = categories.find(cat =>
    cat.slug === ASTROBOT_CATEGORY_SLUG ||
    cat.name.toLowerCase().includes(ASTROBOT_CATEGORY_SLUG.replace('-', ' '))
  );

  if (!targetCategory) {
    console.warn(
      `⚠️ Category not found: "${ASTROBOT_CATEGORY_SLUG}". Available categories:`,
      categories.map(c => `${c.slug} (${c.name})`).join(', ')
    );
    console.warn('🔧 Using hardcoded fallback: category ID is 6');
    return 6;
  }

  console.log(`✅ Found "${ASTROBOT_CATEGORY_SLUG}" category with ID: ${targetCategory.id}`);
  return targetCategory.id;
}

// Mock data for fallback when WordPress API is unavailable
const MOCK_POSTS: ProcessedPost[] = [
  {
    id: 1,
    slug: 'what-is-astro',
    title: 'What is Astro and Why It\'s Perfect for Your Business Website',
    content: '<p>Astro is a modern web framework for building fast, content-focused websites.</p>',
    excerpt: 'Discover why Astro is the perfect framework for building your business website.',
    date: '2023-12-15T00:00:00.000Z',
    modified: '2023-12-16T00:00:00.000Z',
    categories: [],
    tags: [],
  },
  {
    id: 2,
    slug: 'test',
    title: '75% Faster: How Static Site Generation Boosts Business Websites',
    content: '<p>Learn how static site generation can transform your online presence.</p>',
    excerpt: 'Discover how migrating to static site generation can make your website faster.',
    date: '2023-11-28T00:00:00.000Z',
    modified: '2023-11-30T00:00:00.000Z',
    categories: [],
    tags: [],
  },
];

// Detect if running in GitHub Actions environment
function isGitHubActions(): boolean {
  return process.env.GITHUB_ACTIONS === 'true';
}

// Get appropriate timeout based on environment
function getEnvironmentTimeout(baseTimeout: number = 15000): number {
  if (isGitHubActions()) {
    const envTimeout = baseTimeout * 1.5;
    console.log(`⏱️ GitHub Actions detected: using ${envTimeout}ms timeout`);
    return envTimeout;
  }
  return baseTimeout;
}

// Fetch with timeout, retry logic, and detailed diagnostics
async function fetchWithTimeout(
  url: string,
  options: RequestInit & { timeout?: number; retries?: number } = {}
): Promise<Response> {
  const { timeout = 15000, retries = 2, ...fetchOptions } = options;
  const adjustedTimeout = getEnvironmentTimeout(timeout);
  const userAgent = isGitHubActions()
    ? 'AstrobotCI/1.0 (GitHub Actions)'
    : 'AstrobotBuild/1.0';

  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), adjustedTimeout);
      const startTime = Date.now();

      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
        headers: {
          ...fetchOptions.headers,
          'User-Agent': userAgent,
        }
      });

      const duration = Date.now() - startTime;
      clearTimeout(timeoutId);

      if (attempt > 1) {
        console.log(`  ✅ Retry ${attempt - 1} succeeded (${duration}ms)`);
      } else {
        console.log(`  ⏱️ Request completed in ${duration}ms`);
      }

      return response;
    } catch (error) {
      lastError = error as Error;
      const errorMsg = error instanceof Error ? error.message : String(error);

      let errorCategory = 'Unknown';
      if (errorMsg.includes('AbortError') || errorMsg.includes('timeout')) {
        errorCategory = 'Timeout';
      } else if (errorMsg.includes('ECONNREFUSED')) {
        errorCategory = 'Connection Refused';
      } else if (errorMsg.includes('ETIMEDOUT')) {
        errorCategory = 'Network Timeout';
      } else if (errorMsg.includes('ENOTFOUND') || errorMsg.includes('DNS')) {
        errorCategory = 'DNS Error';
      }

      if (attempt === retries + 1) {
        console.error(`  ❌ Final attempt failed (${errorCategory}): ${errorMsg}`);
        throw lastError;
      } else {
        const backoffMs = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
        console.warn(`  ⚠️ Attempt ${attempt} failed (${errorCategory}): ${errorMsg}`);
        console.log(`  ⏳ Retrying in ${backoffMs}ms... (attempt ${attempt + 1}/${retries + 1})`);
        await new Promise(resolve => setTimeout(resolve, backoffMs));
      }
    }
  }

  throw lastError || new Error('Unknown fetch error');
}

// Health check to verify WordPress API is accessible
export async function healthCheckWordPress(): Promise<boolean> {
  try {
    console.log('🏥 Checking WordPress API health...');
    const response = await fetchWithTimeout(
      `${WP_API_URL}/categories?per_page=1`,
      { timeout: 5000, retries: 1 }
    );

    if (response.ok) {
      console.log('✅ WordPress API is healthy and reachable');
      return true;
    } else {
      console.warn(`⚠️ WordPress API returned status ${response.status}`);
      return false;
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`❌ WordPress API health check failed: ${errorMsg}`);
    return false;
  }
}

/**
 * Fetch posts from WordPress API with automatic fallback to mock data
 * Uses in-memory cache to avoid redundant API calls during build
 */
export async function getPosts(
  page: number = 1,
  perPage: number = 10,
  categoryId?: number
): Promise<ProcessedPost[]> {
  try {
    // If no categoryId provided, try to get the category ID
    if (!categoryId) {
      console.log(`🔍 getPosts: Fetching category ID for "${ASTROBOT_CATEGORY_SLUG}"...`);
      categoryId = await getAstrobotCategoryId();
      if (!categoryId) {
        throw new Error('Could not determine category ID from WordPress API');
      }
    }

    // Check cache first (avoid redundant API calls during build)
    const cacheKey = `posts_${categoryId}_${page}_${perPage}`;
    if (postCache.has(cacheKey)) {
      const cached = postCache.get(cacheKey)!;
      console.log(`📦 getPosts: Using cached posts (${cached.length} posts)`);
      return cached;
    }

    // Construct the API URL with parameters
    const cacheBuster = new Date().getTime();
    let url = `${WP_API_URL}/posts?_embed=true&page=${page}&per_page=${perPage}&_t=${cacheBuster}`;

    if (categoryId) {
      url += `&categories=${categoryId}`;
    }

    try {
      console.log(`📡 getPosts: Fetching from WordPress API with category ID ${categoryId}...`);
      console.log(`📍 getPosts: API URL: ${url}`);
      const response = await fetchWithTimeout(url, { timeout: 15000, retries: 2 });
      if (!response.ok) {
        throw new Error(`WordPress API returned status ${response.status}: ${response.statusText}`);
      }

      const posts: WordPressPost[] = await response.json();
      const processedPosts = posts.map(processPost);
      const postSlugs = processedPosts.map(p => p.slug);
      console.log(`✅ getPosts: Successfully fetched ${posts.length} posts from WordPress API`);
      console.log(`   📝 Post slugs: ${postSlugs.join(', ')}`);

      // Cache the result
      postCache.set(cacheKey, processedPosts);

      return processedPosts;
    } catch (fetchError) {
      const errorMessage = fetchError instanceof Error ? fetchError.message : String(fetchError);
      console.warn(`❌ Failed to fetch from WordPress API: ${errorMessage}`);
      console.warn(`⚠️ getPosts: Falling back to ${MOCK_POSTS.length} mock posts`);

      const start = (page - 1) * perPage;
      const end = start + perPage;
      return MOCK_POSTS.slice(start, end);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('❌ Error in getPosts:', errorMessage);
    console.warn(`⚠️ getPosts: Falling back to ${MOCK_POSTS.length} mock posts`);
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
      const response = await fetchWithTimeout(apiUrl, { timeout: 15000, retries: 2 });

      if (!response.ok) {
        throw new Error(`WordPress API returned status ${response.status}: ${response.statusText}`);
      }

      const posts: WordPressPost[] = await response.json();
      if (posts.length === 0) {
        throw new Error(`Post with slug "${slug}" not found in WordPress API`);
      }

      return processPost(posts[0]);
    } catch (fetchError) {
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

  // Create processed post - IMPORTANT: Filter out the primary filter category
  // The WORDPRESS_CATEGORY_SLUG (e.g., "astrobot-design") is used internally for filtering posts.
  // It should NEVER appear as a displayed category on blog cards, carousels, or detail pages.
  // All OTHER categories are displayed normally as tags/category labels.
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
      .filter(cat => cat.slug !== WORDPRESS_CATEGORY_SLUG) // Hide the primary filter category from display
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
```

---

### 4.2 - Blog Post Pages (src/pages/blog/[slug].astro)

Generates static blog post pages at build time. Each post gets its own static HTML file.

**Important patterns:**
- `getStaticPaths()` fetches all posts once
- Posts are passed through props to avoid re-fetching
- Featured image is used for OG image tags
- Related posts are shown at bottom

**Complete file content:**

```astro
---
import BaseLayout from "@/layouts/BaseLayout.astro";
import BlogPost from "@/components/blog/BlogPost.astro";
import { getPosts, getPostBySlug } from "@/lib/wordpress";
import { generateExcerpt, cleanHtmlForDisplay } from "@/lib/utils";
import RelatedPosts from "@/components/blog/RelatedPosts.astro";

// This defines the dynamic paths that will be pre-rendered at build time
export async function getStaticPaths() {
  try {
    console.log("🔨 Astro: Starting blog page generation...");

    // Get all posts from WordPress API
    const allPosts = await getPosts(1, 100);

    console.log(`✅ Astro: Generated ${allPosts.length} blog post pages from WordPress API`);

    // Warn if we seem to be falling back to mock data
    if (allPosts.length <= 3) {
      console.warn(`⚠️ Astro: Only ${allPosts.length} posts found! This might indicate a WordPress API failure.`);
      console.warn('⚠️ Astro: The site may be using mock/fallback data instead of live WordPress content.');
      console.warn('⚠️ Astro: Check that WordPress API is accessible and the category exists.');
    }

    // Create a path for each post, passing all posts to avoid re-fetching in component
    return allPosts.map((post) => ({
      params: { slug: post.slug },
      props: { post, allPosts },
    }));
  } catch (error) {
    console.error("❌ Astro: Error generating static paths:", error);
    return [];
  }
}

// Get the post and all posts from props (already fetched in getStaticPaths)
const { post, allPosts } = Astro.props;

// For SEO
const metaDescription = generateExcerpt(post.excerpt, 160);

// Convert the featuredMedia URL to a URL object for OG image
let ogImage;
if (post.featuredMedia?.url) {
  ogImage = new URL(post.featuredMedia.url);
}
---

<BaseLayout
  title={`${cleanHtmlForDisplay(post.title)} | Blog`}
  description={metaDescription}
  ogImage={ogImage}
>
  <BlogPost post={post} allPosts={allPosts} />

  {allPosts.length > 0 && (
    <div class="container mx-auto px-4 pb-16">
      <div class="max-w-3xl mx-auto">
        <RelatedPosts currentPost={post} allPosts={allPosts} />
      </div>
    </div>
  )}
</BaseLayout>
```

---

### 4.3 - Blog Index Page (src/pages/blog/index.astro)

Lists all blog posts on a dedicated page. **Check if this file exists before creating.**

**CRITICAL:** If `src/pages/blog/index.astro` already exists on this site, **DO NOT overwrite or redesign it**. Many sites have custom-designed blog listing pages with specific layouts, filters, or styling. Only create this file if it does not already exist.

**When to create this file:**
- ✅ File does not exist → Create it using the content below
- ❌ File already exists → Leave it alone, preserve the existing design

**Important:**
- Always fetch with `per_page=100`
- Slice locally to 12 posts (or adjust to your design)
- Shows empty state if no posts found

**Complete file content (if creating new):**

```astro
---
import BaseLayout from "@/layouts/BaseLayout.astro";
import BlogCard from "@/components/blog/BlogCard.astro";
import { getPosts } from "@/lib/wordpress";

// Fetch blog posts at build time (use per_page=100 to ensure consistent WordPress API results)
const allPosts = await getPosts(1, 100);
// Display first 12 posts on this page
const posts = allPosts.slice(0, 12);
---

<BaseLayout
  title="Blog | Your Site"
  description="Explore our latest insights, tips, and news about web development and technology."
>
  <section class="py-16 md:py-24">
    <div class="container">
      <div class="max-w-3xl mx-auto text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-6">
          Our Blog
        </h1>
        <p class="text-xl text-muted-foreground">
          Insights and tips for building faster, better websites
        </p>
      </div>
      
      {posts.length === 0 ? (
        <div class="text-center py-12 border border-primary/10 rounded-lg bg-secondary/20">
          <p class="text-lg text-muted-foreground">No blog posts found.</p>
        </div>
      ) : (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <BlogCard post={post} />
          ))}
        </div>
      )}
    </div>
  </section>
</BaseLayout>
```

---

### 4.4 - Homepage Blog Preview/Carousel (src/components/home/BlogPreview.astro)

Displays carousel of recent posts on homepage. **Check if this file exists before creating.**

**CRITICAL:** If `src/components/home/BlogPreview.astro` already exists on this site, **DO NOT overwrite or rebuild it**. Many sites have custom-designed carousels with specific styling and functionality. Only create this file if it does not already exist.

**Important:**
- Same `per_page=100` pattern
- Slice locally to 6 posts
- Only renders if posts exist
- Preserve existing carousels - don't rebuild them

**When to create this file:**
- ✅ File does not exist → Create it using the content below
- ❌ File already exists → Leave it alone, preserve the existing design

**Complete file content (if creating new):**

```astro
---
import { getPosts } from "@/lib/wordpress";
import BlogCarousel from "./BlogCarousel";

// Fetch blog posts at build time (use per_page=100 to ensure consistent WordPress API results)
const allPosts = await getPosts(1, 100);
// Display first 6 posts in carousel
const posts = allPosts.slice(0, 6);
---

{posts.length > 0 && (
  <BlogCarousel posts={posts} client:load />
)}
```

---

### 4.5 - GitHub Actions Workflow (.github/workflows/deploy.yml)

Automates build and deployment to GitHub Pages. **Change `WORDPRESS_CATEGORY_SLUG` environment variable per site.**

**Key points:**
- Triggers on push to `main` branch
- Sets environment variables for WordPress API
- Builds static site and deploys to GitHub Pages
- Customize only the `env` section for new sites

**Complete file content:**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout your repository using git
        uses: actions/checkout@v5

      - name: Install, build, and upload your site
        uses: withastro/action@v5

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Key points:**
- No environment variables or secrets needed in the workflow
- `.env` file is automatically picked up by Astro when the repo is checked out
- `withastro/action@v5` handles Node, pnpm, build, and artifact upload automatically
- Much simpler and requires zero configuration

---

### 4.6 - Configuration Files

#### astro.config.ts

```typescript
// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // Custom domain (change to your site's domain)
  site: "https://astrobot.design",

  // Required for GitHub Pages
  output: "static",

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
    define: {
      // Expose environment variables to build-time code
      "import.meta.env.WORDPRESS_CATEGORY_SLUG": JSON.stringify(
        process.env.WORDPRESS_CATEGORY_SLUG || "fallback-slug"
      ),
    },
  },

  // Image optimization settings
  image: {
    // Allow remote images from WordPress API
    remotePatterns: [{ protocol: "http" }, { protocol: "https" }],
  },
});
```

**Changes for new sites:**
- Update `site` to your domain (e.g., `https://thefordamily.life`)
- The `vite.define` section automatically exposes WORDPRESS_CATEGORY_SLUG from your .env file to `import.meta.env` at build time

#### package.json (relevant sections)

```json
{
  "name": "@area44/astro-shadcn-ui-template",
  "version": "25.01.27",
  "packageManager": "pnpm@10.29.2",
  "scripts": {
    "build": "astro build",
    "dev": "astro dev",
    "preview": "astro preview",
    "start": "astro dev"
  },
  "dependencies": {
    "astro": "^5.5.4",
    "@astrojs/react": "^4.2.1",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  }
}
```

#### .env (Created from .env.example)

**IMPORTANT:** This file should be committed to your repository (not gitignored). Each site has its own .env file with its specific values.

```bash
# Site Configuration
SITE_URL=https://astrobot.design

# WordPress Configuration
# These environment variables are automatically read by Astro during both local development and GitHub Actions builds
WORDPRESS_API_URL=https://blog.nxtmt.ventures/wp-json/wp/v2
WORDPRESS_CATEGORY_SLUG=astrobot-design
```

**To set up for your site:**
1. Copy `.env.example` to `.env` (in the root directory)
2. Update the values:
   - `SITE_URL`: Your site's domain (e.g., `https://thefordamily.life`)
   - `WORDPRESS_CATEGORY_SLUG`: Your WordPress category slug (e.g., `thefordamily`, `spirituality`)
   - `WORDPRESS_API_URL`: Leave as-is (same for all sites)
3. Commit `.env` to your repository
4. When you push to GitHub, the workflow automatically uses these values

---

## Preserving Existing Site Customizations

**IMPORTANT:** When adding WordPress integration to an existing site, always check for existing custom components before creating new ones. Sites with existing designs should keep those designs intact.

### Files to Check Before Creating

The following files should **only be created if they don't already exist**. If they exist with custom design, do NOT modify or recreate them:

1. **`src/pages/blog/index.astro`** - Blog listing/index page
   - ✅ If missing → Create from section 4.3
   - ❌ If exists → Preserve the existing design

2. **`src/components/home/BlogPreview.astro`** - Homepage blog carousel
   - ✅ If missing → Create from section 4.4
   - ❌ If exists → Preserve the existing design

### Files That Are Safe to Create

These files are typically new and safe to create:

1. **`src/pages/blog/[slug].astro`** - Individual blog post pages
2. **`src/lib/wordpress.ts`** - WordPress API integration layer

### Why This Matters

- **Custom designs take time** - Sites may have spent significant effort on custom blog layouts, carousels, or filtering logic
- **Consistency** - Each site's design is unique and should be preserved
- **Functionality over design** - The WordPress integration is about fetching data, not redesigning. Your existing design should work perfectly with the WordPress data layer.

---

## Component Display Best Practices

### Understanding HTML Entities

WordPress sometimes encodes special characters as "HTML entities" - this is a way of representing characters that have special meaning in HTML.

**Common HTML entities you might see:**

| Entity | What It Is | Example |
|--------|-----------|---------|
| `&rsquo;` or `&#39;` | Apostrophe | `It&#39;s` → `It's` |
| `&ldquo;` `&rdquo;` | Quotation marks | `&ldquo;Hello&rdquo;` → `"Hello"` |
| `&amp;` | Ampersand | `Q&amp;A` → `Q&A` |
| `&#8211;` | En dash | `1–2` (slightly longer dash) |
| `&#8212;` | Em dash | `Hello—world` (longer dash) |
| `&nbsp;` | Non-breaking space | Extra space that doesn't wrap |
| `&copy;` | Copyright | `2025&copy;` → `2025©` |

**When you see these:** If you see these codes appearing in your blog posts, titles, or preview text instead of the actual characters, it means HTML entity decoding isn't being applied.

### Displaying Excerpts Cleanly

When rendering blog post excerpts in cards and carousels, **always** use `cleanHtmlForDisplay()`:

```astro
// BlogCard.astro - CORRECT
import { cleanHtmlForDisplay } from "@/lib/utils";

<p class="text-sm text-muted-foreground">
  {cleanHtmlForDisplay(post.excerpt).substring(0, 120)}...
</p>
```

This function:
1. Removes all HTML tags (`<p>`, `<br>`, etc.)
2. **Decodes HTML entities** (converts `&rsquo;` to `'`, `&amp;` to `&`, etc.)
3. Returns plain text ready for display

Without this, the preview text will show formatting tags AND encoded entities, looking broken.

### Displaying Titles

Blog post titles often contain special characters that WordPress encodes. **Always use `cleanHtmlForDisplay()`:**

```astro
// BlogCard.astro - CORRECT
<h2 class="font-heading text-xl font-medium">
  <a href={`/blog/${post.slug}`}>
    {cleanHtmlForDisplay(post.title)}
  </a>
</h2>

// BlogCarousel.tsx - CORRECT
<h3 className="font-heading text-xl md:text-2xl font-medium">
  {cleanHtmlForDisplay(post.title)}
</h3>
```

This ensures titles like `It&rsquo;s a "Great" Day` display correctly as `It's a "Great" Day`.

### Displaying Category Tags

Always display the categories returned by the WordPress API. The filter category (e.g., `astrobot-design`) is **already hidden** by the WordPress layer, so you don't need to filter anything in your component.

```astro
// BlogCard.astro - CORRECT
{post.categories.length > 0 && (
  <div class="flex gap-2 flex-wrap text-xs">
    {post.categories.map(cat => (
      <span key={cat.id} class="bg-primary/10 text-primary px-2 py-1 rounded">
        {cleanHtmlForDisplay(cat.name)}
      </span>
    ))}
  </div>
)}
```

**Important:**
- All categories in `post.categories` are safe to display
- The filter category is automatically removed by the WordPress layer
- Don't add additional category filtering in components
- **Always use `cleanHtmlForDisplay(cat.name)`** in case category names contain special characters

---

## Quick Reference: When to Use cleanHtmlForDisplay()

Use `cleanHtmlForDisplay()` on **ALL text fields** pulled from WordPress to ensure proper character encoding:

```astro
{cleanHtmlForDisplay(post.title)}      // ✅ Always
{cleanHtmlForDisplay(post.excerpt)}    // ✅ Always
{cleanHtmlForDisplay(post.content)}    // ✅ Always
{cleanHtmlForDisplay(cat.name)}        // ✅ Always
{cleanHtmlForDisplay(post.author?.name)} // ✅ Always
{post.date}                            // ❌ Dates don't need cleaning
{post.slug}                            // ❌ Slugs don't need cleaning
```

This prevents apostrophes, quotes, and other special characters from displaying as encoded entities.

---

## .env File Setup

### Why .env File (Not GitHub Secrets)

Instead of using GitHub repository secrets, we commit a site-specific `.env` file to the repository. This approach:
- ✅ Works automatically without manual configuration
- ✅ Keeps all configuration in the repo (no external secrets)
- ✅ Is simpler to understand and debug
- ✅ Works for all deployment platforms (GitHub, Netlify, Vercel, etc.)
- ✅ Each site just has its own .env with its values

### Setup Instructions

1. **Copy `.env.example` to `.env`**
   ```bash
   cp .env.example .env
   ```

2. **Update `.env` for your site**
   ```bash
   SITE_URL=https://yoursite.com
   WORDPRESS_CATEGORY_SLUG=your-category-slug
   WORDPRESS_API_URL=https://blog.nxtmt.ventures/wp-json/wp/v2
   ```
   - Replace `yoursite.com` with your domain
   - Replace `your-category-slug` with your WordPress category slug

3. **Find your category slug**
   - Go to WordPress admin: `blog.nxtmt.ventures/wp-admin/`
   - Click: Posts → Categories
   - Find your category in the list
   - Copy the slug (e.g., `thefordamily`, `spirituality`, `my-category`)

4. **Commit `.env` to your repository**
   ```bash
   git add .env
   git commit -m "Configure WordPress category for this site"
   git push
   ```
   - ✅ `.env` should be committed (not gitignored)
   - ✅ When GitHub Actions checks out your repo, `.env` is automatically included
   - ✅ Astro automatically reads `.env` values during build

5. **Verify it works**
   - Push your changes to GitHub
   - Go to Actions tab → Watch the build
   - Build should complete successfully
   - Check logs for: `✅ getPosts: Successfully fetched X posts`

**How it works:**
1. You commit `.env` to the repository with your site's values
2. GitHub Actions checks out the code (including `.env`)
3. Astro reads `.env` automatically via `process.env`
4. `astro.config.ts` exposes `WORDPRESS_CATEGORY_SLUG` to build-time code via Vite `define`
5. `src/lib/wordpress.ts` uses the correct category slug to fetch posts
6. Site builds with the correct blog posts

---

## Setup Checklist for New Sites

Use this checklist when setting up a new Astro site with WordPress integration:

- [ ] Clone/create Astro project
- [ ] Install dependencies: `pnpm install`
- [ ] Copy `src/lib/wordpress.ts` from reference site (Astrobot)
- [ ] Create blog pages structure:
  - [ ] Check if `src/pages/blog/[slug].astro` exists; create if not
  - [ ] **CRITICAL: Check if `src/pages/blog/index.astro` exists:**
    - [ ] If it exists, **DO NOT modify or recreate it** - preserve the existing design
    - [ ] If it does NOT exist, create it as shown in section 4.3
- [ ] **CRITICAL: Check if homepage blog carousel exists:**
  - [ ] If `src/components/home/BlogPreview.astro` exists, **DO NOT modify or recreate it** - preserve the existing design
  - [ ] If it does NOT exist, create it as shown in section 4.4
- [ ] Update `astro.config.ts`:
  - [ ] Change `site:` to your domain (e.g., `https://thefordamily.life`)
  - [ ] Verify `vite.define` section is present (exposes WORDPRESS_CATEGORY_SLUG to build)
- [ ] Create `.github/workflows/deploy.yml`:
  - [ ] Copy from reference (section 4.5)
  - [ ] No changes needed - uses simplified `withastro/action@v5`
- [ ] **CRITICAL: Create `.env` file**
  - [ ] Copy `.env.example` to `.env` (in root directory)
  - [ ] Update values:
    - `SITE_URL`: Your site's domain
    - `WORDPRESS_CATEGORY_SLUG`: Your WordPress category slug
    - `WORDPRESS_API_URL`: Leave as-is
  - [ ] Commit `.env` to the repository (NOT gitignored)
  - [ ] This is how GitHub Actions knows which category to fetch
- [ ] Verify category slug:
  - [ ] Visit WordPress admin: `blog.nxtmt.ventures/wp-admin/`
  - [ ] Go to Posts → Categories
  - [ ] Find your category and copy the slug
  - [ ] Example slugs: `astrobot-design`, `thefordamily`, `spirituality`
- [ ] Test locally:
  - [ ] Run: `pnpm install`
  - [ ] Run: `pnpm build`
  - [ ] Verify blog posts appear in build output
  - [ ] Check console for `✅ getPosts: Successfully fetched X posts from WordPress API`
  - [ ] If wrong posts appear, verify `.env` has correct `WORDPRESS_CATEGORY_SLUG`
- [ ] Configure GitHub repository:
  - [ ] Push code to GitHub (including `.env` file)
  - [ ] Go to repository Settings → Pages
  - [ ] Set source to "Deploy from a branch"
  - [ ] Set branch to "gh-pages"
  - [ ] Set folder to "/ (root)"
- [ ] GitHub Actions deployment:
  - [ ] Go to Actions tab
  - [ ] Watch the workflow run (automatically triggered by push)
  - [ ] Workflow should complete successfully
  - [ ] Check logs for: `✅ getPosts: Successfully fetched X posts`
  - [ ] No secrets to configure - `.env` is automatically picked up
- [ ] Configure custom domain (optional):
  - [ ] In GitHub repository Settings → Pages → Custom domain
  - [ ] Enter your domain (e.g., `thefordamily.life`)
  - [ ] Update DNS to point to GitHub Pages
- [ ] Verify live site:
  - [ ] Visit your site (or wait for DNS to propagate)
  - [ ] Verify blog posts display correctly
  - [ ] Check blog index page `/blog/`
  - [ ] Click into a blog post to verify detail page
  - [ ] Verify homepage carousel (if applicable) shows posts
- [ ] Configure Zapier webhook (optional):
  - [ ] In WordPress: Install Zapier plugin
  - [ ] Create trigger: "New or Updated Post"
  - [ ] Create action: "POST to Webhook"
  - [ ] Webhook URL: `https://api.github.com/repos/[YOUR-GITHUB-USERNAME]/[REPO-NAME]/dispatches`
  - [ ] This will auto-rebuild site when posts are published

---

## Configuration Variables Explained

### WORDPRESS_API_URL

**Default:** `https://blog.nxtmt.ventures/wp-json/wp/v2`

This is the base URL of the WordPress REST API. All API requests are made to this endpoint:
- Category list: `{WORDPRESS_API_URL}/categories`
- Posts: `{WORDPRESS_API_URL}/posts`

For a different WordPress instance, change this URL.

### WORDPRESS_CATEGORY_SLUG

**Where it's set:**
- Both local development AND GitHub Actions read from `.env` file
- Copy `.env.example` to `.env` and update the value for your site
- Commit `.env` to the repository

**Default:** `astrobot-design`

This is the **filter category slug** used internally to fetch only posts for this site. Each site has its own unique category:

- **Astrobot:** `astrobot-design` → only fetches posts tagged with "astrobot-design"
- **TheFordFamily:** `thefordamily` → only fetches posts tagged with "thefordamily"
- **YourSite:** `your-category-slug` → only fetches posts tagged with "your-category-slug"

**Important behavior:**
- This category is used **only for filtering** which posts to fetch
- This category **never appears** as a displayed tag on blog cards, carousels, or detail pages
- **All other categories** ARE displayed as category tags (e.g., "Web Development", "Performance")
- Each site only sees posts from its category, but displays all secondary categories

**⚠️ How it works:**

1. Create `.env` file in repository root (copied from `.env.example`)
2. Update `WORDPRESS_CATEGORY_SLUG` value for your site
3. Commit `.env` to repository
4. When you push to GitHub:
   - GitHub Actions checks out the code (including `.env`)
   - Astro reads `.env` automatically via `process.env`
   - `astro.config.ts` exposes the value via Vite `define`
   - Build uses the correct category
5. Same process for local `pnpm build` - reads from `.env`

**How to find your category slug:**

1. Go to WordPress admin: `blog.nxtmt.ventures/wp-admin/`
2. Click Posts → Categories
3. Find your category in the list
4. The slug is in the URL or shown in the category list
5. Copy the slug exactly (lowercase, hyphens instead of spaces)

**To verify the category exists in the API:**

```bash
# Replace [SLUG] with your actual category slug
curl "https://blog.nxtmt.ventures/wp-json/wp/v2/categories?search=astrobot-design"
```

The response should include your category with the ID.

**To verify posts are in your category:**

```bash
# Replace [ID] with your category ID from above
curl "https://blog.nxtmt.ventures/wp-json/wp/v2/posts?categories=[ID]&per_page=100"
```

Should return posts assigned to your category.

---

## Troubleshooting Guide

### Build fails with "WordPress API unreachable"

**Error message:**
```
❌ Failed to fetch from WordPress API: ECONNREFUSED
⚠️ getPosts: Falling back to mock posts
```

**Causes:**
- WordPress server is down
- Network connectivity issue
- DNS resolution failure
- WordPress REST API is disabled

**Solutions:**

1. **Check WordPress is running:**
   ```bash
   curl "https://blog.nxtmt.ventures/wp-json/wp/v2/posts?per_page=1"
   ```
   Should return JSON. If error, WordPress is down.

2. **Check REST API is enabled:**
   - Go to WordPress admin
   - Install "REST API Enabler" plugin if needed
   - Visit `https://blog.nxtmt.ventures/wp-json/` in browser
   - Should show JSON response

3. **Check network connectivity:**
   - In GitHub Actions, sometimes firewall blocks outbound requests
   - Contact infrastructure team to whitelist API domain

4. **Check timeout settings:**
   - Default timeout is 15 seconds
   - GitHub Actions uses 22.5 seconds
   - If WordPress is slow, increase timeout in `src/lib/wordpress.ts`:
   ```typescript
   const response = await fetchWithTimeout(url, { timeout: 30000 }); // 30 seconds
   ```

---

### Blog posts not appearing

**Symptoms:**
- Blog pages generate but show "No blog posts found"
- Homepage carousel doesn't appear
- Empty blog index

**Causes:**
- Category slug is incorrect
- No posts in the category
- Posts not published
- API filter not working

**Solutions:**

1. **Verify category slug:**
   ```bash
   # Replace [SLUG] with your category slug
   curl "https://blog.nxtmt.ventures/wp-json/wp/v2/categories?search=[SLUG]"
   ```
   Note the `id` from response.

2. **Verify posts exist in category:**
   ```bash
   # Replace [ID] with the category ID from above
   curl "https://blog.nxtmt.ventures/wp-json/wp/v2/posts?categories=[ID]&per_page=100"
   ```
   Should return posts JSON.

3. **Check posts are published:**
   - Go to WordPress admin
   - Click Posts → All Posts
   - Verify posts are "Published" status (not Draft)

4. **Check category in WordPress admin:**
   - WordPress → Posts → Categories
   - Ensure your category exists
   - Ensure posts are assigned to your category (not just other categories)

5. **Look at build logs:**
   - In GitHub Actions, go to the failed build
   - Look for:
   ```
   🔍 getPosts: Fetching category ID for "your-category-slug"...
   ✅ Found "your-category-slug" category with ID: 123
   📡 getPosts: Fetching from WordPress API...
   ```
   - If you see the fallback message, category wasn't found

---

### Wrong posts showing on live deployment (dev works but live doesn't)

**Symptoms:**
- Local dev (`pnpm build`) shows correct posts
- Live deployment shows wrong posts (different category, or astrobot-design posts)
- Blog carousel or blog index shows incorrect posts on live site

**Most Common Cause: .env File Not Committed or Incorrect Value**

When .env is not in the repository or has the wrong category slug:

1. GitHub Actions checks out the code without `.env`
2. Build falls back to default: `astrobot-design`
3. Site shows wrong blog posts

**Solution:**

1. **Verify `.env` file exists in repository:**
   - Go to your GitHub repo
   - Look in the root directory for `.env` file
   - If not there, it wasn't committed

2. **Check `.env` has correct value:**
   ```bash
   WORDPRESS_CATEGORY_SLUG=your-category-slug
   ```
   - Replace `your-category-slug` with your WordPress category slug
   - Must match exactly (case-sensitive, hyphens matter)

3. **If `.env` is missing or wrong:**
   - Create/update `.env` in your repository root:
     ```bash
     cp .env.example .env
     # Edit .env and update WORDPRESS_CATEGORY_SLUG
     git add .env
     git commit -m "Configure WordPress category for this site"
     git push
     ```
   - Push the changes to GitHub
   - GitHub Actions will automatically trigger and use the new `.env`

4. **Verify the fix:**
   - Go to Actions tab
   - Watch the workflow run
   - Check logs for: `✅ getPosts: Successfully fetched X posts`

**How to find your correct category slug:**

1. Go to WordPress admin: `blog.nxtmt.ventures/wp-admin/`
2. Click: Posts → Categories
3. Find your category in the list
4. Copy the slug (e.g., `thefordamily`, `spirituality`)
5. Update `.env` to match exactly

**Other Causes:**

1. **Posts assigned to multiple categories:**
   - If posts are in both filter category AND other categories, they may appear unexpectedly
   - Check WordPress: Edit post → check all assigned categories

2. **Category slug changed in WordPress:**
   - If you changed the category slug in WordPress after deployment
   - Update `.env` with new slug and push
   - GitHub Actions will automatically rebuild with the new value

3. **Local dev uses different .env:**
   - Make sure local `.env` matches the one in GitHub
   - Local build (`pnpm build`) reads from local `.env`
   - Live build reads from `.env` in the repository

**To verify locally:**

```bash
# Make sure your local .env has the correct value
cat .env

# Then rebuild
pnpm build

# Check output - should show your category
# ✅ Found "your-category-slug" category with ID: 123
# ✅ Successfully fetched X posts
```

---

### GitHub Actions build timeout

**Error:**
```
Build step exceeded timeout
Process exceeded 540 seconds
```

**Causes:**
- WordPress API is slow
- Network issues during CI/CD
- Dependencies taking too long to install

**Solutions:**

1. **Check WordPress API response time:**
   ```bash
   time curl "https://blog.nxtmt.ventures/wp-json/wp/v2/posts?per_page=100" > /dev/null
   ```

2. **Increase timeout in workflow:**
   In `.github/workflows/deploy.yml`, add timeout:
   ```yaml
   - name: Build Astro site
     run: pnpm build
     timeout-minutes: 10
   ```

3. **Check GitHub Actions logs:**
   - Go to Actions → Recent build
   - Click "Run workflow" to see detailed logs
   - Look for slow steps

4. **Clear cache and retry:**
   - Sometimes pnpm cache is corrupted
   - Go to Actions → Caches
   - Delete the pnpm cache
   - Re-run workflow

---

### "Using mock data" appearing in logs

**Message:**
```
⚠️ getPosts: Falling back to mock posts
```

**Meaning:**
- WordPress API failed
- Site is using fallback test data instead of real posts
- Real posts will not appear on live site

**Solutions:**
- See "WordPress API unreachable" troubleshooting above
- Check all environment variables are set correctly
- Verify WordPress server is running and accessible

---

### Featured images not loading

**Symptoms:**
- Blog posts missing featured images
- Placeholder image shows instead
- Image URL is broken

**Causes:**
- Featured media not set in WordPress
- Image URL is inaccessible
- Astro image optimization issue

**Solutions:**

1. **Check featured image in WordPress:**
   - Go to WordPress → Posts
   - Edit the post
   - Ensure featured image is set in "Featured Image" section

2. **Verify image URL is accessible:**
   ```bash
   curl -I "[IMAGE-URL]"
   ```
   Should return 200 status.

3. **Check Astro remote patterns:**
   In `astro.config.ts`, ensure this is set:
   ```typescript
   image: {
     remotePatterns: [
       { protocol: "http" },
       { protocol: "https" }
     ],
   },
   ```

4. **Check blog post component:**
   Verify `BlogPost.astro` renders the featured image:
   ```astro
   {post.featuredMedia && (
     <img src={post.featuredMedia.url} alt={post.featuredMedia.alt} />
   )}
   ```

---

### Unexpected number of posts fetching

**Symptoms:**
- Expecting 10 posts, got 4
- Expecting 50 posts, got different numbers
- Count varies between builds

**Cause:**
- Using different `per_page` values
- WordPress API inconsistency
- Category has fewer posts than expected

**Solution:**

**Always use `per_page=100`**, then slice locally:

```typescript
// ✅ CORRECT
const allPosts = await getPosts(1, 100);
const posts = allPosts.slice(0, 12);

// ❌ INCORRECT - May return wrong number of posts
const posts = await getPosts(1, 12);
```

The `per_page=100` value is magic—it's the only value that returns consistent results from this WordPress instance. Never change it.

---

### HTML entities appearing in text (apostrophes, quotes, etc.)

**Symptoms:**
- Apostrophes show as `&rsquo;` or `&#39;`
- Quotation marks show as `&ldquo;` or `&rdquo;` or `&quot;`
- Dashes show as `&#8211;` or `&#8212;`
- Other special characters like `&amp;`, `&copy;`, etc. appear in text
- Titles look like: `It&rsquo;s a &ldquo;Great&rdquo; Day` instead of `It's a "Great" Day`

**Cause:**
- Component is not using `cleanHtmlForDisplay()` to decode HTML entities
- Entity decoding is not being applied to titles, excerpts, or other text

**Solution:**

1. **Verify all text fields use `cleanHtmlForDisplay()`:**

   ```astro
   <!-- ✅ CORRECT - All text fields are cleaned -->
   {cleanHtmlForDisplay(post.title)}
   {cleanHtmlForDisplay(post.excerpt)}
   {cleanHtmlForDisplay(cat.name)} <!-- for categories -->

   <!-- ❌ INCORRECT - Raw text shows entities -->
   {post.title}
   {post.excerpt}
   ```

2. **Ensure import is present:**
   ```astro
   import { cleanHtmlForDisplay } from "@/lib/utils";
   ```

3. **Common places to add cleaning:**
   - Blog post titles: `{cleanHtmlForDisplay(post.title)}`
   - Excerpts/preview text: `{cleanHtmlForDisplay(post.excerpt)}`
   - Category names: `{cleanHtmlForDisplay(cat.name)}`
   - Author names: `{cleanHtmlForDisplay(post.author?.name)}`
   - Any text pulled from WordPress

4. **If still seeing entities:**
   - Check browser console for any JavaScript errors
   - Verify the `decodeHtmlEntities()` function in `src/lib/utils.ts` is present and correct
   - Test with a simple title that has an apostrophe

---

### HTML tags appearing in blog preview text (excerpt)

**Symptoms:**
- Blog cards or carousel show `<p>` tags or paragraph breaks
- Excerpt text has visible HTML formatting
- Preview text looks messy with HTML entities

**Cause:**
- Component is not properly cleaning HTML from excerpt text
- Excerpt extraction is not stripping HTML tags

**Solutions:**

1. **Verify component is using `cleanHtmlForDisplay()`:**

   In `src/components/blog/BlogCard.astro` and `src/components/home/BlogCarousel.tsx`:
   ```astro
   <!-- ✅ CORRECT -->
   <p class="text-sm text-muted-foreground">
     {cleanHtmlForDisplay(post.excerpt).substring(0, 120)}...
   </p>

   <!-- ❌ INCORRECT -->
   <p class="text-sm text-muted-foreground">
     {post.excerpt.substring(0, 120)}...
   </p>
   ```

2. **Ensure `cleanHtmlForDisplay()` is imported:**
   ```astro
   import { cleanHtmlForDisplay } from "@/lib/utils";
   ```

3. **Check `src/lib/utils.ts` has proper HTML stripping:**
   The `cleanHtmlForDisplay()` function should:
   - Remove all HTML tags with regex `/<\/?[^>]+(>|$)/g`
   - Decode HTML entities
   - Return plain text

4. **If issue persists, manually test:**
   ```javascript
   // Test in browser console
   const { cleanHtmlForDisplay } = await import('@/lib/utils');
   const excerpt = '<p>Test paragraph</p>';
   console.log(cleanHtmlForDisplay(excerpt)); // Should print: Test paragraph
   ```

---

### Blog carousel was overwritten during setup

**Symptoms:**
- Existing blog carousel styling/design was lost
- Custom carousel implementation was replaced
- Expected custom design is now showing default design

**Cause:**
- The setup process created/overwrote `src/components/home/BlogPreview.astro`
- Existing custom carousel was not preserved

**Prevention for future sites:**
- **Always check if `src/components/home/BlogPreview.astro` exists BEFORE creating it**
- If it exists with custom design, **never overwrite it**
- Only create the file if it doesn't exist

**Recovery:**
1. If you have git history, revert the file:
   ```bash
   git checkout HEAD~1 -- src/components/home/BlogPreview.astro
   ```

2. If no git history, manually recreate your custom carousel

3. Verify in your setup instructions: "If `src/components/home/BlogPreview.astro` exists, do NOT recreate it"

---

### Blog index page was redesigned during setup

**Symptoms:**
- Existing blog listing page styling/design was lost
- Custom blog index layout was replaced with default design
- Expected custom page design is now showing default design
- Categories filter or custom features were removed

**Cause:**
- The setup process created/overwrote `src/pages/blog/index.astro`
- Existing custom blog index page was not preserved

**Prevention for future sites:**
- **Always check if `src/pages/blog/index.astro` exists BEFORE creating it**
- If it exists with custom design, **never overwrite it**
- Only create the file if it doesn't exist
- Update setup instructions to mention: "If `src/pages/blog/index.astro` exists, do NOT recreate it"

**Recovery:**
1. If you have git history, revert the file:
   ```bash
   git checkout HEAD~1 -- src/pages/blog/index.astro
   ```

2. If no git history, manually recreate your custom blog listing page

3. Note: The WordPress integration only requires that the file fetches posts and displays them. The design and layout are completely customizable - preserve any custom implementations

---

## Performance Characteristics

### Build Time Expectations

- **Full build from scratch:** ~2-3 minutes
  - Node setup: ~10 seconds
  - pnpm install: ~30 seconds
  - WordPress API fetch: ~2-5 seconds
  - Astro build: ~30-60 seconds (depends on number of posts)
  - Total: ~2-3 minutes

- **Incremental build (code change):** ~1-2 minutes
  - pnpm install (cached): ~5 seconds
  - WordPress API fetch: ~2-5 seconds
  - Astro build: ~30-60 seconds

### HTML Generation Time

- Per blog post page: ~10-50ms
- Blog index page: ~50-100ms
- Homepage: ~100-200ms
- Total for 50 posts: ~2-5 seconds

### API Calls Per Build

- **Actual API calls:** 1-2 (WordPress)
- **Cached calls:** 3-5 (in-memory)
- **Total:** 4-7 calls, but only 1-2 hit the network

### Why Caching Matters

Without caching:
- 6 components × 1 API call each = 6 requests to WordPress
- Build time: 10-30 seconds (waiting for network)
- Higher failure rate (more chances to timeout)

With caching:
- First component: hits API (2-5 seconds)
- Remaining 5 components: use cache (instant)
- Build time: faster, more reliable

---

## For Builder.io Prompt Reference

### Information Needed From User

**For AI Agents and Builder.io Users:** When setting up WordPress integration on a new site, ask the user ONLY for these two items:

1. **WordPress Category Slug** (required)
   - Example: `astrobot-design`, `thefordamily`, `spirituality`, etc.
   - How they find it: WordPress admin → Posts → Categories → copy the slug
   - This is the ONLY custom variable needed
   - **Note:** User will need to set this as a GitHub repository secret after implementation

2. **Site Domain URL** (required)
   - Example: `https://astrobot.design`, `https://thefordamily.life`
   - This goes in `astro.config.ts`

**DO NOT ask for:**
- ❌ WordPress API URL (hardcoded to `https://blog.nxtmt.ventures/wp-json/wp/v2`)
- ❌ Package manager (always `pnpm@10.29.2`)
- ❌ Node version (always 20)
- ❌ Build settings (all standardized in WORDPRESS_SETUP.md)
- ❌ Custom component implementations (use the defaults from WORDPRESS_SETUP.md)
- ❌ Astro configuration details (use the template)
- ❌ GitHub Actions settings (use the template)
- ❌ Environment variable choices (only WORDPRESS_CATEGORY_SLUG changes)
- ❌ Other follow-up questions about implementation

**Just ask for the two items above and implement without asking questions.**

Everything else is handled by the standard implementation documented in sections 4.1-4.6.

**⚠️ Important Reminder for User:**
After implementation, user MUST set up the GitHub repository secret (see "GitHub Setup for Each Site" section). Without this secret, the live deployment will show wrong posts.

### Template Prompt to Use

When setting up a new site in Builder.io, use this exact prompt format (AI agents should use this as a template):

```
I need to add WordPress blog integration to my Astro site. Please follow WORDPRESS_SETUP.md exactly.

USER INPUT REQUIRED:
1. What is your WordPress category slug? (Example: astrobot-design, thefordamily, spirituality)
   - Find it in WordPress admin: Posts → Categories → copy the slug
2. What is your site's domain? (Example: https://mysite.com)

Once you have these two items, tell me and I will:
1. Read WORDPRESS_SETUP.md from root of repository
2. Implement sections 4.1 through 4.6 exactly as documented
3. Check for existing files before creating (preserve any custom designs):
   - src/pages/blog/index.astro - DO NOT recreate if exists
   - src/components/home/BlogPreview.astro - DO NOT recreate if exists
   - src/pages/blog/[slug].astro - create if missing (safe to create, typically new)
4. Create/update only these files:
   - src/lib/wordpress.ts (WordPress API layer - always safe to create/update)
   - src/pages/blog/[slug].astro (dynamic post pages - always safe to create)
   - astro.config.ts (update site URL + verify Vite define config)
   - .github/workflows/deploy.yml (use simplified withastro/action@v5 pattern)
   - .env.example (for reference)
   - .env (CREATE THIS FILE - copy from .env.example and update values, then COMMIT it)
5. Verify all components use cleanHtmlForDisplay() for text fields (titles, excerpts, categories)
6. Test with: pnpm build
7. Verify output shows "✅ getPosts: Successfully fetched X posts"

⚠️ CRITICAL AFTER IMPLEMENTATION:
After I implement the code, you MUST commit the .env file:
1. Copy .env.example to .env in the repository root
2. Update WORDPRESS_CATEGORY_SLUG and SITE_URL for your site
3. Commit .env to GitHub: `git add .env && git commit -m "Configure WordPress for this site" && git push`
4. GitHub Actions automatically uses this .env file during deployment
5. No manual secrets configuration needed - just commit the file!

I will NOT:
- Ask questions about implementation details
- Change WordPress API URL (always https://blog.nxtmt.ventures/wp-json/wp/v2)
- Change Node/pnpm versions
- Modify any other configuration

Reference site: Next-Mountain-Ventures-LLC/Astrobot (commit 928d956)
```

### Variable Substitution Guide

**These are the ONLY two variables in the entire WordPress integration:**

1. **`[YOUR_CATEGORY_SLUG]`** - The category slug from WordPress
   - Examples: `astrobot-design`, `thefordamily`, `spirituality`, `my-category`
   - How user finds it: WordPress admin → Posts → Categories → copy the slug
   - Used in: `.github/workflows/deploy.yml` and `.env.example`

2. **`[YOUR_SITE_URL]`** - The site's actual domain
   - Examples: `https://astrobot.design`, `https://thefordamily.life`, `https://yoursite.com`
   - Used in: `astro.config.ts` site configuration

**Everything else is unchanged.** The WordPress API URL, Node version, pnpm version, file paths, and all other settings remain exactly as documented.

### How to Find Category Slug (Guide for Users)

Share these instructions with users who need to find their category slug:

1. Go to WordPress admin: `blog.nxtmt.ventures/wp-admin/`
2. Click **Posts → Categories**
3. Find your category in the list
4. The **slug** is shown in the category list (e.g., `thefordamily`, `spirituality`)
5. Copy the slug exactly as shown (lowercase, hyphens for spaces)

**Example:** If your category is named "The Ford Family", the slug might be `thefordamily` or `the-ford-family`

If you're an AI agent: Ask the user to provide the exact category slug, and verify it matches a WordPress category before proceeding.

### Verification Steps After Implementation

After Builder.io implements the WordPress integration:

1. **Local build test:**
   ```bash
   WORDPRESS_CATEGORY_SLUG=your-category-slug pnpm build
   ```
   Should show: `✅ getPosts: Successfully fetched X posts from WordPress API`

2. **Blog posts appear:**
   - Check `/dist/blog/` folder for generated post pages
   - Should see folders like `/dist/blog/post-slug-1/`, `/dist/blog/post-slug-2/`, etc.

3. **GitHub Pages deployment:**
   - Push to GitHub
   - Go to Actions tab
   - Watch "Deploy to GitHub Pages" workflow
   - Should complete in 2-3 minutes
   - Site should go live with blog posts

4. **Site live check:**
   - Visit `/blog/` → should show blog posts
   - Visit `/blog/[post-slug]/` → should show individual post
   - Homepage → carousel should show recent posts (if implemented)

---

## Maintenance & Updates

### Rolling Out Updates to All Sites

When the WordPress integration improves or changes:

1. **Update reference site (Astrobot):**
   - Make changes to `src/lib/wordpress.ts` or other files
   - Test thoroughly
   - Commit to main branch
   - Document what changed

2. **Copy updates to other sites:**
   ```bash
   # For each site:
   cp src/lib/wordpress.ts /path/to/[SITE]/src/lib/wordpress.ts
   # Commit and push
   ```

3. **Update WORDPRESS_SETUP.md:**
   - Update code snippets in sections 4.1-4.6
   - Update version date at top
   - Document breaking changes if any
   - Commit to Astrobot repository

4. **Notify team:**
   - Share update summary
   - Document any manual steps needed per site

### When to Update

- Performance improvements discovered
- WordPress API changes
- New features added (email signup, comments, etc.)
- Bug fixes
- Security improvements

### Testing Strategy

Before rolling out updates:

1. **Test in branch:**
   - Create feature branch
   - Implement changes
   - Test locally with `pnpm build`
   - Verify blog posts still fetch and display

2. **Test on Astrobot first:**
   - Merge to main
   - Watch GitHub Actions build
   - Verify live site works
   - Check real posts display

3. **Test on 1-2 other sites:**
   - Apply same changes to another site
   - Verify build succeeds
   - Verify posts display correctly
   - Document any issues

4. **Roll out to remaining sites:**
   - Apply changes to all remaining sites
   - Stagger deployments if possible
   - Monitor for issues

---

## Common Customizations

### Changing the Number of Posts Displayed

**Blog index page (show 20 instead of 12):**
In `src/pages/blog/index.astro`:
```astro
const posts = allPosts.slice(0, 20);  // Change from 12 to 20
```

**Homepage carousel (show 8 instead of 6):**
In `src/components/home/BlogPreview.astro`:
```astro
const posts = allPosts.slice(0, 8);  // Change from 6 to 8
```

### Modifying Post Card Styling

Edit `src/components/blog/BlogCard.astro`:
- Change image size
- Update text styling
- Modify layout (grid vs. flex)
- Add/remove metadata display

### Adding Additional WordPress Post Metadata

In `src/lib/wordpress.ts`, the `ProcessedPost` interface can be extended:

```typescript
export interface ProcessedPost {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  modified: string;
  // Add new fields here:
  readingTime?: number;
  commentCount?: number;
  // ... etc
}
```

Then update `processPost()` to populate new fields.

**Important:** Any new fields pulled from WordPress will need `cleanHtmlForDisplay()` applied in components if they contain text, to properly decode HTML entities.

### Custom Category Filtering Logic

If you need complex filtering (multiple categories, exclude certain categories, etc.), modify `getPosts()` in `src/lib/wordpress.ts`:

```typescript
// Example: Filter out a specific category
const processedPosts = posts
  .map(processPost)
  .filter(post => post.categories.every(cat => cat.slug !== 'excluded-category'));
```

---

## Reference Implementation

### Where to Find the Reference Site

- **Repository:** `Next-Mountain-Ventures-LLC/Astrobot`
- **Stable commit:** `928d956`
- **Live site:** `https://astrobot.design`

### How to Compare Your Implementation

When setting up a new site, you can compare your files against the reference:

1. **File-by-file comparison:**
   - `src/lib/wordpress.ts` - Should be identical except for constants
   - `astro.config.ts` - Should be identical except `site:` URL
   - `package.json` - Should be identical (same pnpm version)

2. **Build output comparison:**
   ```bash
   # Reference site
   git clone [ASTROBOT-REPO]
   cd Astrobot
   pnpm build
   
   # Your site
   cd ../your-site
   pnpm build
   
   # Compare outputs
   diff ../Astrobot/dist ./dist
   ```

3. **API response comparison:**
   ```bash
   # Both should fetch from same WordPress instance
   curl "https://blog.nxtmt.ventures/wp-json/wp/v2/posts?categories=6&per_page=100"
   ```

### When to Use as Reference vs. When to Customize

**Use reference implementation for:**
- `src/lib/wordpress.ts` (should be identical across all sites)
- Retry logic and timeout handling
- Caching strategy
- API integration patterns

**Customize for each site:**
- `astro.config.ts` → change `site:` URL
- `.github/workflows/deploy.yml` → change `WORDPRESS_CATEGORY_SLUG`
- `.env.example` → change `WORDPRESS_CATEGORY_SLUG`
- Component styling and layout
- Blog post templates
- Homepage customizations

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Feb 2026 | Initial comprehensive guide with 12 sections |

---

## Quick Links

- [Setup Checklist](#setup-checklist-for-new-sites) - New site setup
- [Troubleshooting](#troubleshooting-guide) - Fix common issues
- [Builder.io Prompt](#for-builderio-prompt-reference) - Use this prompt format
- [Configuration](#configuration-variables-explained) - Environment variables
- [Architecture](#architecture-overview) - How the system works
