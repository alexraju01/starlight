import { slugify } from '@/utils';
import { api } from '@/utils/api';

import type { MetadataRoute } from 'next';

export const revalidate = 86400; // 24h

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.starlightdiscover.co.uk';

  const { movieGenres, tvGenres } = await api.genre.getAllGenres();
  const allGenres = [...movieGenres, ...tvGenres];

  const uniqueGenres = Array.from(new Map(allGenres.map((g) => [slugify(g.name), g])).values());

  const genreUrls = uniqueGenres.map((genre) => ({
    url: `${baseUrl}/genre/${slugify(genre.name)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 🔥 control how many sitemap pages you expose
  const totalMoviePages = 100;
  const totalTvPages = 100;

  const movieSitemaps = Array.from({ length: totalMoviePages }, (_, i) => ({
    url: `${baseUrl}/sitemap/movies/${i + 1}.xml`,
    lastModified: new Date(),
  }));

  const tvSitemaps = Array.from({ length: totalTvPages }, (_, i) => ({
    url: `${baseUrl}/sitemap/tv/${i + 1}.xml`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/movie`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tv`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/genre`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },

    // ✅ genre pages
    ...genreUrls,

    // 🔥 scalable movie + tv sitemap links
    ...movieSitemaps,
    ...tvSitemaps,
  ];
}
