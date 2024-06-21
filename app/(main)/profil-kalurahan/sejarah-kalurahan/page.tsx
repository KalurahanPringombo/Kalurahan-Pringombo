import Image from 'next/image';

export default function SejarahDesaPage() {
	return (
		<section className="p-2 flex flex-col items-center h-full gap-y-6 mb-30">
			<div className="w-full md:p-2">
				<h1 className="text-sky-700 font-bold text-xl text-start md:text-4xl">
					Sejarah Kalurahan
				</h1>
			</div>
			<div className="w-full over flex justify-center my-4">
				<Image
					src="https://desapringombo.gunungkidulkab.go.id/assets/files/artikel/sedang_1581971552Kantor%20Balai%20Desa.jpg"
					width={800}
					height={300}
					// fill
					className="w-auto h-auto object-contain"
					alt="sejarah desa"
				/>
			</div>
			<div className="flex flex-col lg:max-w-[90rem] gap-12 lg:px-[9rem]">
				<div className="flex flex-col items-center justify-center gap-2">
					<h1 className="font-bold text-xl text-center md:text-4xl">
						Sejarah Kalurahan Pringombo
					</h1>
					<div className="flex flex-col md:max-w-[90rem] gap-2 justify-center">
						<p className="text-justify">
							Desa Pringombo adalah salah satu desa yang ada di Kecamatan
							Rongkop, Kabupaten Gunungkidul, Daerah Istimewa Yogyakarta. Belum
							dikenal pemerintahan, pada saat itu baru berupa Kademangan yang
							dipimpin oleh Demang. Demang membawahi Bekel, dari Kademangan ke
							Bekel Sepuh berada di Pakel, bernama Kademangan Pakel.
						</p>
						<p className="text-justify">
							<span className="font-bold"> Disekitar Tahun 1911, </span>
							Pemerintahan Kasultanan Yogyakarta Hadiningrat membentuk
							pemerintahan kelurahan termasuk Kalurahan Pringombo ini. Bahwa
							Berdirinya Desa Pringombo Tahun 1911.
						</p>
						<p className="text-justify">
							<span className="font-bold"> Pada Tahun 1911, </span>
							dipimpin Lurah pertama bernama KROMOHARJO, karena Lurahnya
							menempat di wilayah Pringombo maka nama Kalurahan diberi nama
							KALURAHAN PRINGOMBO. Dan struktur pemerintahannya sebagai berikut
							: CARIK, KAMITUWO, JOGOBOYO, dan BAYAN. Itupun personilnya masih
							minim ada yang sudah menjadi CARIK juga merangkap menjadi
							KAMITUWO, seperti sesepuh dari Pakel SUWARTO SENTONO menjadi CARIK
							juga merangkap menjadi KAMITUWO, kala itu belum mempunyai Kantor
							Kalurahan yang permanen, untuk mengadakan rembugan atau koordinasi
							semua pamong desa hanya cukup di rumah yang menjadi Pamong Desa,
							itu pun tempatnya berpindah-pindah. Kepemimpinan KROMOHARJO
							membawahi 7 Wilayah yang dipimpin BAYAN, 7 Wilayah tersebut antar
							lain : (1). Pakel, (2). Sempu, (3). Ngembringan, (4). Plalar, (5).
							Pringombo, (6). Tirisan, (7). Kayangan.
						</p>
						<p className="text-justify">
							<span className="font-bold"> Pada Tahun 1945, </span>
							Lurah SUWARTO SENTONO barulah bisa mendirikan sebuah Kantor
							Kalurahan Pringombo yang lokasinya di wilayah Pakel sebagai Pusat
							Pemerintahan Kalurahan Pringombo.
						</p>
						<div className="flex flex-col items-center justify-center gap-2 pt-4">
							<ul className="list-disc pl-5">
								<li className="text-justify mb-2 italic">
									Hanya Bangsa yang besar yang mau menghargai pada para
									pendahulunya, terutama seluruh Pahlawan Bangsa, yang telah
									menyumbangkan Dharma Baktinya pad Ibu Pertiwi yang tercinta.
								</li>
							</ul>
							<ul className="list-disc pl-5">
								<li className="text-justify mb-2 italic">
									Maka kami mencoba mengenang para pendahulu kita umumnya dan
									para Pamong Desa/Aparat khususnya di Desa Pringombo, Kecamatan
									Rongkop. Mulai dari berdirinya Desa Pringombo sampai pada
									personil perangkatnya.
								</li>
							</ul>
						</div>
						<p className="text-justify">
							Adapun Desa Pringombo dibagi menjadi 10 (sepuluh) Padukuhan, yaitu
							:
						</p>
						<div className="flex flex-col justify-center gap-2 pt-4">
							<ol type="1" className="list-decimal list-inside text-left">
								<li className="text-justify mb-2 pl-5">Padukuhan Tirisan A</li>
								<li className="text-justify mb-2 pl-5">Padukuhan Tirisan B</li>
								<li className="text-justify mb-2 pl-5">
									Padukuhan Pringombo A
								</li>
								<li className="text-justify mb-2 pl-5">
									Padukuhan Pringombo B
								</li>
								<li className="text-justify mb-2 pl-5">
									Padukuhan Pringombo C
								</li>
								<li className="text-justify mb-2 pl-5">Padukuhan Kayangan</li>
								<li className="text-justify mb-2 pl-5">Padukuhan Pakel</li>
								<li className="text-justify mb-2 pl-5">Padukuhan Plalar</li>
								<li className="text-justify mb-2 pl-5">Padukuhan Sempu</li>
								<li className="text-justify mb-2 pl-5">
									Padukuhan Ngembringan
								</li>
							</ol>
						</div>
						<p className="text-justify">
							Pejabat Kepala Desa/Lurah Pringombo semenjak berdirinya Desa
							Pringombo adalah sebagai berikut :
						</p>
					</div>
				</div>
				<table className="w-full mb-30">
					<thead className="bg-gray-50 border-gray-200">
						<tr>
							<th className="p-3 text-sm font-semibold tracking-wide text-center">
								NO
							</th>
							<th className="p-3 text-sm font-semibold tracking-wide text-center">
								NAMA
							</th>
							<th className="p-3 text-sm font-semibold tracking-wide text-center">
								MASA JABATAN
							</th>
							<th className="p-3 text-sm font-semibold tracking-wide text-center">
								ALAMAT
							</th>
							<th className="p-3 text-sm font-semibold tracking-wide text-center">
								KETERANGAN
							</th>
						</tr>
					</thead>
					<tbody>
						<tr className="bg-gray-50 border-b">
							<td className="p-3 text-sm text-center">1</td>
							<td className="p-3 text-sm text-center">KROMOHARJO</td>
							<td className="p-3 text-sm text-center">
								Periode Tahun 1911 s/d 1945
							</td>
							<td className="p-3 text-sm text-center">Pringombo A</td>
							<td className="p-3 text-sm text-center"></td>
						</tr>
						<tr className="bg-gray-50 border-b">
							<td className="p-3 text-sm text-center">2</td>
							<td className="p-3 text-sm text-center">SUWARTO SENTONO</td>
							<td className="p-3 text-sm text-center">
								Periode Tahun 1945 s/d 1951
							</td>
							<td className="p-3 text-sm text-center">Pakel</td>
							<td className="p-3 text-sm text-center"></td>
						</tr>
						<tr className="bg-gray-50 border-b">
							<td className="p-3 text-sm text-center">3</td>
							<td className="p-3 text-sm text-center">KARTIKOYONO</td>
							<td className="p-3 text-sm text-center">
								Periode Tahun 1951 s/d 1965
							</td>
							<td className="p-3 text-sm text-center">Pakel</td>
							<td className="p-3 text-sm text-center"></td>
						</tr>
						<tr className="bg-gray-50 border-b">
							<td className="p-3 text-sm text-center">4</td>
							<td className="p-3 text-sm text-center">WIGNYOSUMARTO</td>
							<td className="p-3 text-sm text-center">
								Periode Tahun 1965 s/d 1990
							</td>
							<td className="p-3 text-sm text-center">Pakel</td>
							<td className="p-3 text-sm text-center">(1965-1991)</td>
						</tr>
						<tr className="bg-gray-50 border-b">
							<td className="p-3 text-sm text-center">5</td>
							<td className="p-3 text-sm text-center">ATMOREJOSO</td>
							<td className="p-3 text-sm text-center">
								Periode Tahun 1990 s/d 1991
							</td>
							<td className="p-3 text-sm text-center">Pakel</td>
							<td className="p-3 text-sm text-center"></td>
						</tr>
						<tr className="bg-gray-50 border-b">
							<td className="p-3 text-sm text-center">6</td>
							<td className="p-3 text-sm text-center">SURATIN</td>
							<td className="p-3 text-sm text-center">
								Periode Tahun 1991 s/d 1999
							</td>
							<td className="p-3 text-sm text-center">Pringombo A</td>
							<td className="p-3 text-sm text-center"></td>
						</tr>
						<tr className="bg-gray-50 border-b">
							<td className="p-3 text-sm text-center">7</td>
							<td className="p-3 text-sm text-center">SATIDJAN ADI SUJANTO</td>
							<td className="p-3 text-sm text-center">
								Periode Tahun 1999 s/d 2006
							</td>
							<td className="p-3 text-sm text-center">Pakel</td>
							<td className="p-3 text-sm text-center"></td>
						</tr>
						<tr className="bg-gray-50 border-b">
							<td className="p-3 text-sm text-center">8</td>
							<td className="p-3 text-sm text-center">SUPRABONO</td>
							<td className="p-3 text-sm text-center">
								Periode Tahun 2006 s/d 2007
							</td>
							<td className="p-3 text-sm text-center">Pakel</td>
							<td className="p-3 text-sm text-center"></td>
						</tr>
						<tr className="bg-gray-50 border-b">
							<td className="p-3 text-sm text-center">9</td>
							<td className="p-3 text-sm text-center">SARMAN</td>
							<td className="p-3 text-sm text-center">
								Periode Tahun 2007 s/d 2013
							</td>
							<td className="p-3 text-sm text-center">Sempu</td>
							<td className="p-3 text-sm text-center"></td>
						</tr>
						<tr className="bg-gray-50 border-b">
							<td className="p-3 text-sm text-center">10</td>
							<td className="p-3 text-sm text-center">SURATIN</td>
							<td className="p-3 text-sm text-center">
								Periode Tahun 2013 s/d 2019
							</td>
							<td className="p-3 text-sm text-center">Pringombo A</td>
							<td className="p-3 text-sm text-center"></td>
						</tr>
						<tr className="bg-gray-50 border-b">
							<td className="p-3 text-sm text-center">11</td>
							<td className="p-3 text-sm text-center">SUPARMIN</td>
							<td className="p-3 text-sm text-center">
								Periode Tahun 2019 s/d 2019
							</td>
							<td className="p-3 text-sm text-center">Bohol</td>
							<td className="p-3 text-sm text-center">
								(23-11-2019 s/d 31-12-2019)
							</td>
						</tr>
						<tr className="bg-gray-50 border-b">
							<td className="p-3 text-sm text-center">12</td>
							<td className="p-3 text-sm text-center">
								ERMINA KRISTIANI SUSANTI
							</td>
							<td className="p-3 text-sm text-center">
								Periode Tahun 2019 sampai sekarang
							</td>
							<td className="p-3 text-sm text-center">Pringombo A</td>
							<td className="p-3 text-sm text-center"></td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	);
}
