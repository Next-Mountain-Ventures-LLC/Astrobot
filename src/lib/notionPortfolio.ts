/**
 * Notion Portfolio Fetcher
 * Fetches portfolio data from a Notion database and normalizes it
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
  select?: { name: string } | null;
  files?: NotionFileBlock[];
}

interface NotionPage {
  id: string;
  properties: Record<string, NotionProperty>;
}

interface PortfolioItem {
  id: string;
  title: string;
  url: string;
  info: string;
  industry: string;
  thumbnailUrl: string;
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

function normalizePortfolioItem(page: NotionPage): PortfolioItem | null {
  const props = page.properties;

  // Extract title from Name (Title property)
  const titleProp = props.Name || props.Title;
  const title = titleProp?.title?.[0]?.plain_text || 'Untitled';

  // Extract URL from Website URL (URL property)
  const urlProp = props['Website URL'] || props.URL;
  const url = urlProp?.url || '';

  // Extract description from Information (Rich text property)
  const infoProp = props.Information;
  const info = infoProp?.rich_text?.[0]?.plain_text || '';

  // Extract industry from Industry (Select property)
  const industryProp = props.Industry;
  const industry = industryProp?.select?.name || '';

  // Extract thumbnail from Thumbnail (Files & media property)
  const thumbnailProp = props.Thumbnail;
  const thumbnailUrl = extractThumbnailUrl(thumbnailProp?.files);

  // Return null if critical fields are missing
  if (!title || !url || !thumbnailUrl) {
    return null;
  }

  return {
    id: page.id,
    title,
    url,
    info,
    industry,
    thumbnailUrl,
  };
}

export async function fetchPortfolioFromNotion(): Promise<PortfolioItem[]> {
  const apiKey = import.meta.env.NOTION_API_KEY;
  const databaseId = import.meta.env.NOTION_DATABASE_ID;

  if (!apiKey || !databaseId) {
    console.error('Missing Notion API credentials');
    return [];
  }

  try {
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

    if (!response.ok) {
      console.error('Notion API error:', response.status, response.statusText);
      return [];
    }

    const data = await response.json();
    const results = data.results || [];

    const portfolio = results
      .map((page: NotionPage) => normalizePortfolioItem(page))
      .filter((item: PortfolioItem | null): item is PortfolioItem => item !== null);

    return portfolio;
  } catch (error) {
    console.error('Failed to fetch portfolio from Notion:', error);
    return [];
  }
}
