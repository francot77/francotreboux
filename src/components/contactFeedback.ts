export type ContactResponse = { ok?: boolean; delivered?: boolean; message?: string };

export function resolveContactResponse(data: ContactResponse, locale: 'es' | 'en') {
	if (data.ok && data.delivered !== false) return { ok: true, message: locale === 'en' ? 'Message sent. Thank you!' : 'Mensaje enviado. ¡Gracias!' };
	return { ok: false, message: data.message ?? (locale === 'en' ? 'Could not send. Please try again.' : 'No se pudo enviar. Intenta nuevamente.') };
}
