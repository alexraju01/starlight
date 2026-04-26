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

  const shows = await api.media.getMedia(MediaMode.TV, pageNum);

  const urls = shows.map(
    (tv: any) => `
    <url>
      <loc>${baseUrl}/tv/${tv.id}</loc>
      <lastmod>${new Date(tv.first_air_date || Date.now()).toISOString()}</lastmod>
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
