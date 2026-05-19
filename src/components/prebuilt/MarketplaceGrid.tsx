import React, { useState, useMemo } from 'react';
import { ExternalLink, ShoppingCart } from 'lucide-react';

interface Website {
  slug: string;
  name: string;
  industry: string;
  thumbnailUrl: string;
  websiteUrl: string;
  checkoutUrl: string;
  notes: string;
}

interface MarketplaceGridProps {
  websites: Website[];
}

export default function MarketplaceGrid({ websites }: MarketplaceGridProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  // Get unique industries
  const industries = useMemo(() => {
    return [...new Set(websites.map(w => w.industry).filter(Boolean))].sort();
  }, [websites]);

  // Filter websites by selected industry
  const filteredWebsites = useMemo(() => {
    if (!selectedIndustry) return websites;
    return websites.filter(w => w.industry === selectedIndustry);
  }, [websites, selectedIndustry]);

  return (
    <div>
      {/* Industry Filter Bar */}
      {industries.length > 0 && (
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={() => setSelectedIndustry(null)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedIndustry === null
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              All Industries
            </button>
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setSelectedIndustry(industry)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedIndustry === industry
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
          {selectedIndustry && (
            <p className="text-sm text-muted-foreground mt-3">
              Showing {filteredWebsites.length} website{filteredWebsites.length !== 1 ? 's' : ''} in {selectedIndustry}
            </p>
          )}
        </div>
      )}

      {/* Marketplace Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWebsites.map((website) => (
          <div
            key={website.slug}
            className="group rounded-xl overflow-hidden border border-border/40 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 bg-background/50 backdrop-blur-sm"
          >
            {/* Thumbnail */}
            <div className="relative overflow-hidden bg-muted h-48">
              <img
                src={website.thumbnailUrl}
                alt={website.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              {/* Available Badge */}
              <div className="absolute top-3 right-3 bg-green-500/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                Available
              </div>
              {/* Industry Badge */}
              {website.industry && (
                <div className="absolute bottom-3 left-3 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                  {website.industry}
                </div>
              )}
            </div>

            {/* Card Content */}
            <div className="p-6">
              {/* Title */}
              <a
                href={`/prebuilt/${website.slug}`}
                className="block group/link"
              >
                <h3 className="text-lg font-bold mb-2 group-hover/link:text-primary transition-colors">
                  {website.name}
                </h3>
              </a>

              {/* Description */}
              {website.notes && (
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {website.notes}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 mt-6">
                {/* Preview Button */}
                <a
                  href={website.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border/60 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Preview
                </a>

                {/* Buy Now Button */}
                {website.checkoutUrl && (
                  <a
                    href={website.checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Buy Now
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredWebsites.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {selectedIndustry
              ? `No websites available in the ${selectedIndustry} category.`
              : 'No websites available at this time.'}
          </p>
        </div>
      )}
    </div>
  );
}
