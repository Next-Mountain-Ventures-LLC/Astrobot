import fs from 'fs';
import path from 'path';
import type { ProcessedPost } from './wordpress';

/**
 * Manifest file structure for tracking which posts should exist
 */
export interface PostsManifest {
  postSlugs: string[];
  timestamp: string;
  totalCount: number;
  categoryId: number;
  categorySlug: string;
}

/**
 * Result of comparing two manifests
 */
export interface ManifestComparison {
  newPosts: string[];
  orphanedPosts: string[];
  unchangedPosts: string[];
  summary: string;
}

/**
 * Generate a manifest snapshot from current posts
 */
export function generatePostsManifest(
  posts: ProcessedPost[],
  categoryId: number,
  categorySlug: string
): PostsManifest {
  return {
    postSlugs: posts.map(post => post.slug),
    timestamp: new Date().toISOString(),
    totalCount: posts.length,
    categoryId,
    categorySlug,
  };
}

/**
 * Read the previous posts manifest file (if it exists)
 */
export function readPreviousManifest(): PostsManifest | null {
  try {
    const manifestPath = path.join(process.cwd(), '.wordpress-posts-manifest.json');
    
    if (!fs.existsSync(manifestPath)) {
      console.log('📋 No previous manifest found (first build?)');
      return null;
    }
    
    const fileContent = fs.readFileSync(manifestPath, 'utf-8');
    const manifest = JSON.parse(fileContent) as PostsManifest;
    console.log(`📋 Loaded previous manifest with ${manifest.totalCount} posts`);
    return manifest;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.warn(`⚠️ Failed to read previous manifest: ${errorMsg}`);
    return null;
  }
}

/**
 * Compare previous and current manifests to identify changes
 */
export function compareManifests(
  previousManifest: PostsManifest | null,
  currentPosts: ProcessedPost[]
): ManifestComparison {
  const currentSlugs = currentPosts.map(post => post.slug);
  
  // If no previous manifest, all current posts are "new"
  if (!previousManifest) {
    return {
      newPosts: currentSlugs,
      orphanedPosts: [],
      unchangedPosts: [],
      summary: `🆕 Initial build: ${currentSlugs.length} posts to create`,
    };
  }
  
  const previousSlugs = previousManifest.postSlugs;
  
  const newPosts = currentSlugs.filter(slug => !previousSlugs.includes(slug));
  const orphanedPosts = previousSlugs.filter(slug => !currentSlugs.includes(slug));
  const unchangedPosts = currentSlugs.filter(slug => previousSlugs.includes(slug));
  
  const summaryParts: string[] = [];
  if (unchangedPosts.length > 0) summaryParts.push(`${unchangedPosts.length} unchanged`);
  if (newPosts.length > 0) summaryParts.push(`+${newPosts.length} new`);
  if (orphanedPosts.length > 0) summaryParts.push(`-${orphanedPosts.length} removed`);
  
  const summary = `📊 Post changes: ${summaryParts.join(', ')}`;
  
  return {
    newPosts,
    orphanedPosts,
    unchangedPosts,
    summary,
  };
}

/**
 * Delete orphaned blog post directories from the dist folder
 * 
 * NOTE: In Astro, the dist folder is typically generated fresh each build,
 * so this mainly cleans up any manual/leftover directories. We still include
 * this for safety and in case of manual editing or rollbacks.
 */
export function deleteOrphanedBlogPosts(
  orphanedSlugs: string[],
  distBasePath: string = 'dist'
): { deletedCount: number; errors: string[] } {
  const errors: string[] = [];
  let deletedCount = 0;
  
  if (orphanedSlugs.length === 0) {
    console.log('✅ No orphaned posts to remove');
    return { deletedCount: 0, errors };
  }
  
  console.log(`🗑️ Removing ${orphanedSlugs.length} orphaned post(s)...`);
  
  for (const slug of orphanedSlugs) {
    try {
      const postDir = path.join(process.cwd(), distBasePath, 'blog', slug);
      
      // Check if directory exists
      if (fs.existsSync(postDir)) {
        // Recursively delete the directory
        fs.rmSync(postDir, { recursive: true, force: true });
        console.log(`  🗑️ Deleted: blog/${slug}/`);
        deletedCount++;
      } else {
        console.log(`  ⏭️ Skipped (not found): blog/${slug}/`);
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      const msg = `Failed to delete blog/${slug}/: ${errorMsg}`;
      console.error(`  ❌ ${msg}`);
      errors.push(msg);
    }
  }
  
  if (deletedCount > 0) {
    console.log(`✅ Deleted ${deletedCount} orphaned post(s)`);
  }
  
  return { deletedCount, errors };
}

/**
 * Write the current posts manifest to disk
 */
export function writePostsManifest(manifest: PostsManifest): boolean {
  try {
    const manifestPath = path.join(process.cwd(), '.wordpress-posts-manifest.json');
    const content = JSON.stringify(manifest, null, 2);
    
    fs.writeFileSync(manifestPath, content, 'utf-8');
    console.log(`✅ Manifest written: ${manifest.totalCount} posts recorded`);
    return true;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`❌ Failed to write manifest: ${errorMsg}`);
    return false;
  }
}

/**
 * Check if using fallback/mock data (safety check for cleanup)
 */
export function shouldSkipCleanup(usingFallback: boolean, postCountDropPercent: number): boolean {
  if (usingFallback) {
    console.warn('⚠️ Using fallback/mock data: Skipping cleanup to prevent data loss');
    return true;
  }
  
  // Safety check: if post count dropped more than 50%, warn and skip
  if (postCountDropPercent > 50) {
    console.warn(`⚠️ Post count dropped ${postCountDropPercent.toFixed(0)}%: Skipping cleanup as safety precaution`);
    console.warn('   Verify WordPress API is responding correctly');
    return true;
  }
  
  return false;
}

/**
 * Full post sync workflow: read previous, compare, cleanup orphans, write new manifest
 */
export function syncPostsWithManifest(
  currentPosts: ProcessedPost[],
  categoryId: number,
  categorySlug: string,
  usingFallback: boolean = false,
  previousPostCount: number = 0
): { success: boolean; comparison: ManifestComparison; deletedCount: number } {
  console.log('\n📋 Starting post manifest sync...');
  
  // Read previous manifest
  const previousManifest = readPreviousManifest();
  
  // Compare manifests
  const comparison = compareManifests(previousManifest, currentPosts);
  console.log(comparison.summary);
  
  let deletedCount = 0;
  
  // Determine if we should skip cleanup (safety check)
  const postCountDropPercent = previousPostCount > 0 
    ? ((previousPostCount - currentPosts.length) / previousPostCount) * 100
    : 0;
  
  if (!shouldSkipCleanup(usingFallback, postCountDropPercent)) {
    // Delete orphaned posts
    if (comparison.orphanedPosts.length > 0) {
      const result = deleteOrphanedBlogPosts(comparison.orphanedPosts);
      deletedCount = result.deletedCount;
      if (result.errors.length > 0) {
        console.warn(`⚠️ Cleanup completed with ${result.errors.length} error(s)`);
      }
    }
  }
  
  // Generate and write new manifest
  const newManifest = generatePostsManifest(currentPosts, categoryId, categorySlug);
  const manifestWritten = writePostsManifest(newManifest);
  
  console.log('✅ Post manifest sync complete\n');
  
  return {
    success: manifestWritten,
    comparison,
    deletedCount,
  };
}
