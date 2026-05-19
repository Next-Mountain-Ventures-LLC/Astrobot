/**
 * Notion Inventory Fetcher
 * Fetches pre-built website inventory from Notion database
 */

interface NotionFileBlock {
  type: 'file' | 'external';
  file?: { url: string };
  external?: { url: string };
}

interface NotionProperty {
  id: string;
  type: string;
  title?: Array<{ plain_text: string }>;
  rich_text?: Array<{ plain_text: string }>;
  url?: string;
  checkbox?: boolean;
  select?: { name: string } | null;
  files?: NotionFileBlock[];
}

interface NotionPage {
  id: string;
  properties: Record<string, NotionProperty>;
}

export interface PrebuiltWebsite {
  id: string;
  slug: string;
  name: string;
  industry: string;
  notes: string;
  websiteUrl: string;
  checkoutUrl: string;
  thumbnailUrl: string;
  listed: boolean;
  sold: boolean;
}

function extractThumbnailUrl(files?: NotionFileBlock[]): string {
  if (!files || files.length === 0) return '';
  
  const file = files[0];
  if (file.type === 'external' && file.external?.url) {
    return file.external.url;
  }
  if (file.type === 'file' && file.file?.url) {
    return file.file.url;
  }
  return '';
}

function normalizeUrl(rawUrl: string): string {
  if (!rawUrl) return '';
  
  if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
    return rawUrl;
  }
  
  return `https://${rawUrl}`;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function normalizeInventoryItem(page: NotionPage): PrebuiltWebsite | null {
  const props = page.properties;

  // Extract name from Name (Title property)
  const nameProp = props.Name || props.Title;
  const name = nameProp?.title?.[0]?.plain_text || 'Untitled';

  // Extract listed status (checkbox)
  const listedProp = props.Listed;
  const listed = listedProp?.checkbox ?? false;

  // Extract sold status (checkbox)
  const soldProp = props.Sold;
  const sold = soldProp?.checkbox ?? false;

  // Extract industry from Industry (Select property)
  const industryProp = props.Industry;
  const industry = industryProp?.select?.name || '';

  // Extract notes from Notes (Rich text property)
  const notesProp = props.Notes;
  const notes = notesProp?.rich_text?.[0]?.plain_text || '';

  // Extract Website URL and normalize
  const websiteUrlProp = props['Website URL'];
  const rawWebsiteUrl = websiteUrlProp?.url || '';
  const websiteUrl = normalizeUrl(rawWebsiteUrl);

  // Extract Checkout URL and normalize
  const checkoutProp = props.Checkout;
  const checkoutUrl = checkoutProp?.url || '';

  // Extract thumbnail
  const thumbnailProp = props.Thumbnail;
  const thumbnailUrl = extractThumbnailUrl(thumbnailProp?.files);

  // Return null if critical fields are missing
  if (!name || !websiteUrl || !thumbnailUrl) {
    return null;
  }

  return {
    id: page.id,
    slug: slugify(name),
    name,
    industry,
    notes,
    websiteUrl,
    checkoutUrl,
    thumbnailUrl,
    listed,
    sold,
  };
}

export async function fetchInventoryFromNotion(): Promise<PrebuiltWebsite[]> {
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_INVENTORY_DATABASE_ID;

  console.log('[Inventory] Fetching pre-built websites...');
  console.log('[Inventory] API Key present:', !!apiKey);
  console.log('[Inventory] Database ID present:', !!databaseId);

  if (!apiKey || !databaseId) {
    console.error('[Inventory] Missing Notion API credentials');
    return [];
  }

  try {
    console.log('[Inventory] Making API request to Notion...');
    const response = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page_size: 100,
        }),
      }
    );

    console.log('[Inventory] API Response status:', response.status);

    if (!response.ok) {
      console.error('[Inventory] API error:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('[Inventory] Error details:', errorText);
      return [];
    }

    const data = await response.json();
    const results = data.results || [];
    console.log('[Inventory] Received', results.length, 'items from database');

    const inventory = results
      .map((page: NotionPage) => normalizeInventoryItem(page))
      .filter((item: PrebuiltWebsite | null): item is PrebuiltWebsite => item !== null)
      .filter((item: PrebuiltWebsite) => item.listed && !item.sold);

    console.log('[Inventory] Successfully filtered', inventory.length, 'available items');
    inventory.forEach((item: PrebuiltWebsite, index: number) => {
      console.log(`[Inventory] Item ${index + 1}:`, item.name, `-`, item.industry);
    });

    return inventory;
  } catch (error) {
    console.error('[Inventory] Failed to fetch inventory from Notion:', error);
    return [];
  }
}
