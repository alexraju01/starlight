import { MediaMode } from '@/types/mediaMode';
import { api } from '@/utils/api';

export const revalidate = 3600;

export async function GET(_: Request, { params }: { params: { page: string } }) {
  const baseUrl = 'https://www.starlightdiscover.co.uk';
  const page = Number(params.page);

  const shows = await api.media.getMedia(MediaMode.TV, page);

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
