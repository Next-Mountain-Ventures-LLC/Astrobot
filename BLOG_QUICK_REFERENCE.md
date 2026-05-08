# Quick Reference: Dynamic Blog Categories

## Adding a New Blog Post Category

### Problem
You add a new blog post to WordPress with a new category, but it doesn't appear in the blog tabs.

### Solution
Run `npm run build` - that's it!

The system will:
1. ✅ Detect the new category from WordPress
2. ✅ Create category page: `/blog/category/your-category`
3. ✅ Add tab to blog index
4. ✅ Add tab to all category pages

## Files Involved

**Core System:**
- `src/lib/blog-utils.ts` - Category detection logic

**Blog Pages:**
- `src/pages/blog/index.astro` - Blog index with tabs
- `src/pages/blog/category/[slug].astro` - Category pages

## How Category Detection Works

```
WordPress Posts
    ↓
src/lib/blog-utils.ts → getAllCategories()
    ↓
Unique category list (sorted alphabetically)
    ↓
Used by:
- Blog index page (/blog)
- Category pages (/blog/category/[each])
```

## Tab Highlighting Logic

```astro
<!-- On /blog/category/how-to page: -->
{categories.map(({ slug, displayName }) => (
  <a href={`/blog/category/${slug}`}
    class={slug === 'how-to' 
      ? 'bg-primary'           ← Highlighted
      : 'bg-muted'             ← Not highlighted
    }>
    {displayName}
  </a>
))}
```

## Adding Custom Display Names

**If:** Auto-generation creates "my-category" → "My Category"
**But you want:** "My Special Category"

**Then:** Edit `src/lib/blog-utils.ts`

```typescript
const displayNames: Record<string, string> = {
  "my-category": "My Special Category",  ← Add here
};
```

## Build Process

```bash
npm run build
```

This:
1. Detects all categories from WordPress
2. Generates `/blog` with tabs
3. Generates `/blog/category/[each-category]` with tabs
4. All pages get identical tab structure
5. Current category highlighted

## URL Structure

```
/blog                              ← All posts, "All Posts" highlighted
/blog/category/how-to              ← How-to posts, "How To" highlighted
/blog/category/case-study          ← Case studies, "Case Studies" highlighted
/blog/category/web-design          ← Web design posts, "Web Design" highlighted
```

## Files Changed on Build

```
Generated/Updated:
- dist/blog/index.html
- dist/blog/category/how-to/index.html
- dist/blog/category/case-study/index.html
- dist/blog/category/web-design/index.html
- ... one for each category
```

## Testing

After adding a new category and running `npm run build`:

1. Check that new page exists: `/blog/category/new-category`
2. Check that tab appears on `/blog`
3. Check that tab appears on other category pages
4. Check that current category is highlighted
5. Check that posts are filtered correctly

## Common Issues

| Issue | Solution |
|-------|----------|
| New category not appearing | Run `npm run build` (not just dev server) |
| Wrong display name | Add mapping to `displayNames` in `blog-utils.ts` |
| Posts not showing in category | Check category is assigned in WordPress |
| Tabs not highlighting | Check slug matches current page slug |

## Key Functions in `blog-utils.ts`

```typescript
// Get all category slugs from posts
getAllCategories()                    // → ["about-astro", "case-study", ...]

// Convert slug to display name
getCategoryDisplayName("how-to")      // → "How To"

// Get categories with names
getCategoriesWithNames()              // → [{ slug, displayName }, ...]

// Get posts in a category
getPostsByCategory("how-to")          // → [post1, post2, ...]
```

## The Magic (Why It Works)

1. **No hardcoded category list** - Categories come from WordPress
2. **Dynamic page generation** - One page created per category
3. **Shared utility** - Both index and category pages use same category list
4. **Build-time logic** - All done at build, not at runtime
5. **Consistent tabs** - Same tabs on every page, current one highlighted

## One-Time Setup (Already Done)

✅ Created `src/lib/blog-utils.ts` with utility functions
✅ Updated `/blog` to use dynamic categories
✅ Updated `/blog/category/[slug]` to use dynamic categories
✅ All tabs auto-generate from WordPress categories

## From Here On

Just:
1. Add posts to WordPress with categories
2. Run `npm run build`
3. New categories appear automatically

**No code changes needed!**

---

**System Status: ✅ Fully Automated**

When you add a category to WordPress → Run build → It appears everywhere
