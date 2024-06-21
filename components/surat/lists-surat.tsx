import { getPendudukById } from '@/actions/penduduk/penduduk-actions';
import { getSuratByNoSurat } from '@/actions/surat/surat';

import { ListSuratCard } from '@/components/surat/list-surat-card';

type Props = {
	nik: string;
	no_surat: string;
	nama_surat: string;
};

export const ListsSurat = async ({ nik, no_surat, nama_surat }: Props) => {
	const penduduk = await getPendudukById(nik);
	const dataPenduduk = penduduk.data;
	const suratByNoSurat = await getSuratByNoSurat(no_surat, nama_surat);
	const surat = suratByNoSurat.data;

	return (
		<ListSuratCard
			no_surat={surat.no_surat}
			nama={dataPenduduk.nama}
			nama_surat={nama_surat}
			doc_id={surat.doc_id}
		/>
	);
};
