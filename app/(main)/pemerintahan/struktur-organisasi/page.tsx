import Image from 'next/image';

export default function StrukturOrganisasiPage() {
	return (
		<section className="p-6 h-full">
			<h1 className="text-sky-700 font-bold text-xl md:text-2xl">
				Struktur Organisasi Kalurahan Pringombo
			</h1>
			<div className="flex flex-col justify-center gap-2 pt-2 pb-16 md:px-8">
				<div className="flex justify-center items-center">
					<Image
						src={'/assets/StrukturOrganisasi.jpg'}
						alt="Struktur Organisasi"
						width={1000}
						height={1000}
					/>
				</div>
			</div>
		</section>
	);
}
