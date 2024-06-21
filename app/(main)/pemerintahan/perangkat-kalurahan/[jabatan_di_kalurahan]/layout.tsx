import Link from 'next/link';

import { IoMdArrowBack } from 'react-icons/io';

import { FormatStripString } from '@/lib/formats/format-string';

import { UpdateJabatanForm } from '@/components/surat/form/update-jabatan-form';
import { Button } from '@/components/ui/button';

type Props = {
	params: {
		jabatan_di_kalurahan: string;
	};
	children: React.ReactNode;
};

export default function DataPersonLayout({ children, params }: Props) {
	return (
		<section className="p-1 md:p-6 flex flex-col gap-y-4">
			<div className="flex justify-between items-center md:px-4">
				<Link
					href="/pemerintahan/perangkat-kalurahan"
					className="flex items-center space-x-4"
				>
					<IoMdArrowBack />
					Kembali
				</Link>
				<Button asChild className="bg-sky-600 hover:bg-sky-600/80 shadow-md">
					<UpdateJabatanForm
						jabatan={params.jabatan_di_kalurahan}
						trigger={`Update ${FormatStripString(params.jabatan_di_kalurahan)}`}
						title={`${FormatStripString(params.jabatan_di_kalurahan)}`}
					/>
				</Button>
			</div>
			<div>{children}</div>
		</section>
	);
}
