'use server';

import { headers } from 'next/headers';

export const getSuratByNoSurat = async (
	no_surat: string,
	nama_surat: string
) => {
	const cookie = await headers().get('Cookie');
	const headerList = new Headers();

	if (cookie) {
		headerList.append('Cookie', cookie);
	}
	const res = await fetch(
		`${process.env.NEXT_APP_DOMAIN}/api/surat/${nama_surat}/${no_surat}`,
		{
			cache: 'no-store',
			headers: headerList,
		}
	);

	if (!res.ok) {
		throw Error(`Error with status code: ${res.status}`);
	}

	return res.json();
};

export const deleteSuratById = async (no_surat: string, nama_surat: string) => {
	const cookie = await headers().get('Cookie');
	const headerList = new Headers();

	if (cookie) {
		headerList.append('Cookie', cookie);
	}

	const res = await fetch(
		`${process.env.NEXT_APP_DOMAIN}/api/surat/${nama_surat}/${no_surat}`,
		{
			method: 'DELETE',
			headers: headerList,
		}
	);

	if (!res.ok) {
		throw Error(`Error with status code: ${res.status}`);
	}

	return res.json();
};
