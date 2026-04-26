import { MediaMode } from '@/types/mediaMode';
import { api } from '@/utils/api';

export const revalidate = 3600; // cache 1 hour

export async function GET(_: Request, { params }: { params: { page: string } }) {
  const baseUrl = 'https://www.starlightdiscover.co.uk';
  const page = Number(params.page);

  // fetch ONE page only (important for scaling)
  const movies = await api.media.getMedia(MediaMode.MOVIE, page);

  // build XML entries
  const urls = movies.map(
    (movie: any) => `
    <url>
      <loc>${baseUrl}/movie/${movie.id}</loc>
      <lastmod>${new Date(movie.release_date || Date.now()).toISOString()}</lastmod>
    </url>
  `,
  );

  // return XML response
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
