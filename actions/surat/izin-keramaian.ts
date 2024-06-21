'use server';
import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';

export const getAllIzinKeramaian = async () => {
	const cookie = await headers().get('Cookie');
	const headerList = new Headers();

	if (cookie) {
		headerList.append('Cookie', cookie);
	}
	const res = await fetch(
		`${process.env.NEXT_APP_DOMAIN}/api/surat/izin-keramaian`,
		{
			cache: 'no-store',
			next: {
				tags: ['surat', 'izin-keramaian'],
			},
			headers: headerList,
		}
	);
	if (!res.ok) {
		throw Error(`Error with status code: ${res.status}`);
	}

	return res.json();
};

export const createIzinKeramaian = async (values: any) => {
	const cookie = await headers().get('Cookie');
	const headerList = new Headers();

	headerList.append('Content-Type', 'application/json');

	if (cookie) {
		headerList.append('Cookie', cookie);
	}

	const res = await fetch(
		`${process.env.NEXT_APP_DOMAIN}/api/surat/izin-keramaian`,
		{
			method: 'POST',
			body: JSON.stringify(values),
			headers: headerList,
		}
	);

	if (!res.ok) {
		throw Error(`Error with status code: ${res.status}`);
	}

	revalidateTag('izin-keramaian');

	return res.json();
};
