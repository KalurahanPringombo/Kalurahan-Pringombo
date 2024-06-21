import Link from "next/link";

import { getPerangkatkalurahan } from "@/actions/penduduk/penduduk-actions";

import { DataCard } from "@/components/card/data-card";

export default async function PerangkatKalurahanPage() {
  const perangkatKalurahan = await getPerangkatkalurahan();
  return (
    <section className="p-4 md:p-6 h-full">
      <h1 className="text-sky-700 font-bold text-xl md:text-2xl">Perangkat Kalurahan</h1>
      <div className="grid mt-4 pb-16 md:px-8 gap-2 grid-cols-[repeat(auto-fill,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
        {perangkatKalurahan?.map((data) => (
          <Link key={data.nik} href={`/pemerintahan/perangkat-kalurahan/${data.jabatan_di_kalurahan}`}>
            <DataCard key={data.nik} image={data.image_url ? data.image_url : "/assets/logo.svg"} nama={data.nama} jabatan={data.jabatan_di_kalurahan} />
          </Link>
        ))}
      </div>
    </section>
  );
}
