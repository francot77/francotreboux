import { SITE } from '../consts';

export function robotsTxt(siteUrl: string = SITE.siteUrl): string {
	return ['User-agent: *', 'Allow: /', '', `Sitemap: ${siteUrl.replace(/\/$/, '')}/sitemap-index.xml`, ''].join('\n');
}
