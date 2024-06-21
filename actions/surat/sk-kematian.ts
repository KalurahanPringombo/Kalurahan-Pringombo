'use server';
import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';

export const getAllSkKematian = async () => {
	const cookie = await headers().get('Cookie');
	const headerList = new Headers();

	if (cookie) {
		headerList.append('Cookie', cookie);
	}
	const res = await fetch(
		`${process.env.NEXT_APP_DOMAIN}/api/surat/sk-kematian`,
		{
			cache: 'no-store',
			next: {
				tags: ['surat', 'sk-kematian'],
			},
			headers: headerList,
		}
	);
	if (!res.ok) {
		throw Error(`Error with status code: ${res.status}`);
	}

	return res.json();
};

export const createSkKematian = async (values: any) => {
	const cookie = await headers().get('Cookie');
	const headerList = new Headers();

	headerList.append('Content-Type', 'application/json');

	if (cookie) {
		headerList.append('Cookie', cookie);
	}

	const res = await fetch(
		`${process.env.NEXT_APP_DOMAIN}/api/surat/sk-kematian`,
		{
			method: 'POST',
			body: JSON.stringify(values),
			headers: headerList,
		}
	);

	if (!res.ok) {
		throw Error(`Error with status code: ${res.status}`);
	}

	revalidateTag('sk-kematian');

	return res.json();
};
