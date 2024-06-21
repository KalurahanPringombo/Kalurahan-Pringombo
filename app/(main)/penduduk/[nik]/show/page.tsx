import {
	getPendudukById,
	getPendudukByIdAndName,
} from '@/actions/penduduk/penduduk-actions';
import { formatDateStrip } from '@/lib/formats/format-date-strip';
import Link from 'next/link';
import Actions from '../actions';
import { IoMdArrowRoundBack } from 'react-icons/io';

type Props = {
	params: {
		nik: string;
	};
};

export default async function ShowDataPendudukPage({ params }: Props) {
	const penduduk = await getPendudukById(params.nik);
	const dataPenduduk = penduduk.data;

	const data_ayah = await getPendudukByIdAndName(
		dataPenduduk.nokk,
		dataPenduduk.nama_ayah
	);

	const data_ibu = await getPendudukByIdAndName(
		dataPenduduk.nokk,
		dataPenduduk.nama_ibu!
	);

	return (
		<div className="p-6">
			<div className="w-full">
				<Link
					href="/penduduk/data-penduduk"
					className="w-fit p-2 flex items-center test-sm hover:opacity-75 trasition mb-6"
				>
					<IoMdArrowRoundBack className="h-4 w-4 mr-2" />
					Kembali
				</Link>
			</div>

			<div className="flex flex-col">
				<div className="flex items-center justify-between shadow-lg p-4 mb-12">
					<h1 className="font-[500] text-xl">
						Biodata Penduduk (NIK: {atob(dataPenduduk.nik)})
					</h1>
					<Actions nik={dataPenduduk.nik} />
				</div>
				<div className="flex bg-sky-100/40 p-1">
					<h1 className="w-96">Status Dasar</h1>
					<span className="px-2">:</span>
					<p>HIDUP</p>
				</div>
				<div className="flex p-1">
					<h1 className="w-96">Nama</h1>
					<span className="px-2">:</span>
					<p>{dataPenduduk.nama}</p>
				</div>
				<div className="flex bg-sky-100/40 p-1">
					<h1 className="w-96">Nomor Induk Kependudukan</h1>
					<span className="px-2">:</span>
					<p>{atob(dataPenduduk.nik)}</p>
				</div>
				<div className="flex p-1">
					<h1 className="w-96">Nomor Kartu Keluarga</h1>
					<span className="px-2">:</span>
					<p>{dataPenduduk.nokk ? atob(dataPenduduk.nokk) : '-'}</p>
				</div>
				<div className="flex bg-sky-100/40 p-1">
					<h1 className="w-96">Status Hubungan Dalam Keluarga</h1>
					<span className="px-2">:</span>
					<p>{dataPenduduk.shdk ? dataPenduduk.shdk.toUpperCase() : '-'}</p>
				</div>
				<div className="flex p-1">
					<h1 className="w-96">Jenis Kelamin</h1>
					<span className="px-2">:</span>
					<p>
						{dataPenduduk.jenis_kelamin
							? dataPenduduk.jenis_kelamin.toUpperCase()
							: '-'}
					</p>
				</div>
				<div className="flex bg-sky-100/40 p-1">
					<h1 className="w-96">Agama</h1>
					<span className="px-2">:</span>
					<p>{dataPenduduk.agama ? dataPenduduk.agama.toUpperCase() : '-'}</p>
				</div>
				<div className="flex p-1">
					<h1 className="w-96">Status Penduduk</h1>
					<span className="px-2">:</span>
					<p>
						{dataPenduduk.status_duk
							? dataPenduduk.status_duk.toUpperCase()
							: '-'}
					</p>
				</div>
			</div>
			<div className="mt-5 flex flex-col">
				<div className="flex p-1 bg-cyan-400">
					<h1 className="font-semibold">DATA KELAHIRAN</h1>
				</div>
				<div className="flex p-1">
					<h1 className="w-96">Akta Kelahiran</h1>
					<span className="px-2">:</span>
					<p>-</p>
				</div>
				<div className="flex bg-sky-100/40 p-1">
					<h1 className="w-96">Tempat / Tanggal Lahir</h1>
					<span className="px-2">:</span>
					<p>
						{dataPenduduk.tempat_lahir ? dataPenduduk.tempat_lahir : '-'}
						{' / '}
						{dataPenduduk.tanggal_lahir
							? formatDateStrip(dataPenduduk.tanggal_lahir.toString())
							: '-'}
					</p>
				</div>
				<div className="flex p-1">
					<h1 className="w-96">Tempat Dilahirkan</h1>
					<span className="px-2">:</span>
					<p>-</p>
				</div>
				<div className="flex bg-sky-100/40 p-1">
					<h1 className="w-96">Jenis Kelahiran</h1>
					<span className="px-2">:</span>
					<p>-</p>
				</div>
				<div className="flex p-1">
					<h1 className="w-96">Kelahiran Anak Ke</h1>
					<span className="px-2">:</span>
					<p>-</p>
				</div>
				<div className="flex bg-sky-100/40 p-1">
					<h1 className="w-96">Penolong Kelahiran</h1>
					<span className="px-2">:</span>
					<p>-</p>
				</div>
				<div className="flex p-1">
					<h1 className="w-96">Berat Lahir</h1>
					<span className="px-2">:</span>
					<p>- Kg</p>
				</div>
				<div className="flex bg-sky-100/40 p-1">
					<h1 className="w-96">Panjang Lahir</h1>
					<span className="px-2">:</span>
					<p>- cm</p>
				</div>
			</div>
			<div className="mt-5 flex flex-col">
				<div className="flex p-1  bg-cyan-400">
					<h1 className="font-semibold">PENDIDIKAN DAN PEKERJAAN</h1>
				</div>
				<div className="flex p-1">
					<h1 className="w-96">Pendidikan Dalam KK</h1>
					<span className="px-2">:</span>
					<p>{dataPenduduk.pendidikan_kk ? dataPenduduk.pendidikan_kk : '-'}</p>
				</div>
				<div className="flex bg-sky-100/40 p-1">
					<h1 className="w-96">Pendidikan Sedang Ditempuh</h1>
					<span className="px-2">:</span>
					<p>
						{dataPenduduk.pendidikan_sdt ? dataPenduduk.pendidikan_sdt : '-'}
					</p>
				</div>
				<div className="flex p-1">
					<h1 className="w-96">Pekerjaan</h1>
					<span className="px-2">:</span>
					<p>{dataPenduduk.pekerjaan ? dataPenduduk.pekerjaan : '-'}</p>
				</div>
			</div>
			<div className="mt-5 flex flex-col">
				<div className="flex p-1  bg-cyan-400">
					<h1 className="font-semibold">DATA KEWARGANEGARAAN</h1>
				</div>
				<div className="flex p-1">
					<h1 className="w-96">Warga Negara</h1>
					<span className="px-2">:</span>
					<p>
						{dataPenduduk.kewarganegaraan ? dataPenduduk.kewarganegaraan : '-'}
					</p>
				</div>
				<div className="flex bg-sky-100/40 p-1">
					<h1 className="w-96">Nomor Paspor</h1>
					<span className="px-2">:</span>
					<p>-</p>
				</div>
				<div className="flex p-1">
					<h1 className="w-96">Tanggal Berakhir Paspor</h1>
					<span className="px-2">:</span>
					<p>-</p>
				</div>
			</div>
			<div className="mt-5 flex flex-col">
				<div className="flex p-1 bg-cyan-400">
					<h1 className="font-semibold">ORANG TUA</h1>
				</div>
				<div className="flex p-1">
					<h1 className="w-96">NIK Ayah</h1>
					<span className="px-2">:</span>
					<p>{data_ayah?.nik ? atob(data_ayah.nik) : '-'}</p>
				</div>
				<div className="flex bg-sky-100/40 p-1">
					<h1 className="w-96">Nama Ayah</h1>
					<span className="px-2">:</span>
					<p>{dataPenduduk.nama_ayah ? dataPenduduk.nama_ayah : '-'}</p>
				</div>
				<div className="flex p-1">
					<h1 className="w-96">NIK Ibu</h1>
					<span className="px-2">:</span>
					<p>{data_ibu?.nik ? atob(data_ibu.nik) : '-'}</p>
				</div>
				<div className="flex bg-sky-100/40 p-1">
					<h1 className="w-96">Nama Ibu</h1>
					<span className="px-2">:</span>
					<p>{dataPenduduk.nama_ibu ? dataPenduduk.nama_ibu : '-'}</p>
				</div>
			</div>
		</div>
	);
}
