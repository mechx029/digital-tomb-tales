
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "The Internet Graveyard - Where Digital Dreams Come to Die",
  description = "Bury your failed startups, cringe DMs, and questionable life choices. The ultimate digital cemetery for your biggest regrets and epic fails.",
  image = "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=630&fit=crop",
  url = "https://internetgraveyard.com",
  type = "website"
}) => {
  const fullTitle = title.includes("Internet Graveyard") ? title : `${title} | The Internet Graveyard`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="The Internet Graveyard" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional Meta Tags */}
      <meta name="keywords" content="digital graveyard, internet fails, startup failures, social media fails, tech humor, viral content, memes" />
      <meta name="author" content="The Internet Graveyard" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEOHead;
