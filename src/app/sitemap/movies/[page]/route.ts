import { NextRequest } from 'next/server';

import { MediaMode } from '@/types/mediaMode';
import { api } from '@/utils/api';

export const revalidate = 3600;

export async function GET(_req: NextRequest, { params }: { params: Promise<{ page: string }> }) {
  const baseUrl = 'https://www.starlightdiscover.co.uk';

  const { page } = await params;
  const pageNum = Number(page);

  if (!Number.isFinite(pageNum) || pageNum < 1) {
    return new Response('Invalid page', { status: 400 });
  }

  const movies = await api.media.getMedia(MediaMode.MOVIE, pageNum);

  const urls = movies.map(
    (movie: any) => `
    <url>
      <loc>${baseUrl}/movie/${movie.id}</loc>
      <lastmod>${new Date(movie.release_date || Date.now()).toISOString()}</lastmod>
    </url>
  `,
  );

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${urls.join('')}
     </urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml',
      },
    },
  );
}
