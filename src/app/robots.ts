// import type { MetadataRoute } from 'next';

// export default function robots(): MetadataRoute.Robots {
//   return {
//     rules: {
//       userAgent: '*',
//       allow: '/',
//       disallow: '/private/',
//     },
//     sitemap: 'https://www.starlightdiscover.co.uk/sitemap.xml',
//   };
// }

import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.starlightdiscover.co.uk';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/', // block API routes
          '/_next/', // Next internals
          '/search', // if you have search pages
          '/*?*', // query params (optional)
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
