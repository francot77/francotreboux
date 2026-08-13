import type { APIRoute } from 'astro';
import { robotsTxt } from '../seo/robots';

export const GET: APIRoute = ({ site }) => new Response(robotsTxt(site?.toString()), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
