import { getAllSuketUsaha } from '@/actions/surat/suket-usaha';

import { ListsSurat } from '@/components/surat/lists-surat';

export default async function SuketUsahaPage() {
	const surat = await getAllSuketUsaha();
	const dataSurat = surat.data;
	return (
		<div className="flex flex-wrap gap-2">
			{dataSurat.length === 0 && (
				<h1 className="w-full text-xl font-[500] text-center">
					Tidak ada surat
				</h1>
			)}
			{dataSurat?.map((surat: any) => (
				<ListsSurat
					key={surat.no_surat}
					nik={surat.pendudukId}
					no_surat={surat.no_surat}
					nama_surat="suket-usaha"
				/>
			))}
		</div>
	);
}
