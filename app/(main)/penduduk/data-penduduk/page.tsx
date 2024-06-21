import { columns } from '@/components/penduduk/penduduk-columns';
import { DataTable } from '@/components/penduduk/penduduk-data-table';

import { getAllPenduduk } from '@/actions/penduduk/penduduk-actions';

async function PendudukPage() {
	const penduduk = await getAllPenduduk();
	const dataPenduduk = penduduk.data;
	if (!dataPenduduk) {
		return null;
	}

	return (
		<div className="p-6">
			<DataTable columns={columns} data={dataPenduduk} />
		</div>
	);
}

export default PendudukPage;
