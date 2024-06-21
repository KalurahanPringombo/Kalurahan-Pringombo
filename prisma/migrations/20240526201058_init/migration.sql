-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Penduduk" (
    "nik" TEXT NOT NULL,
    "nokk" TEXT,
    "nama" TEXT NOT NULL,
    "alias" TEXT,
    "agama" TEXT,
    "jenis_kelamin" TEXT,
    "kewarganegaraan" TEXT NOT NULL DEFAULT 'indonesia',
    "padukuhan" TEXT,
    "rt" INTEGER,
    "rw" INTEGER,
    "pendidikan_kk" TEXT,
    "pendidikan_sdt" TEXT,
    "pekerjaan" TEXT,
    "tanggal_lahir" TIMESTAMP(3),
    "tempat_lahir" TEXT,
    "umur" INTEGER,
    "status_kawin" TEXT,
    "shdk" TEXT,
    "gol_darah" TEXT,
    "nama_ayah" TEXT,
    "nama_ibu" TEXT,
    "jabatan_di_kalurahan" TEXT NOT NULL DEFAULT 'penduduk',
    "status_duk" TEXT,
    "image_url" TEXT,

    CONSTRAINT "Penduduk_pkey" PRIMARY KEY ("nik")
);

-- CreateTable
CREATE TABLE "PengantarSKCK" (
    "no_surat" TEXT NOT NULL,
    "pendudukId" TEXT NOT NULL,
    "keperluan" TEXT,
    "doc_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PengantarSKCK_pkey" PRIMARY KEY ("no_surat")
);

-- CreateTable
CREATE TABLE "SuketUsaha" (
    "no_surat" TEXT NOT NULL,
    "usaha_sampingan" TEXT,
    "di_kalurahan" TEXT,
    "di_kapanewon" TEXT,
    "di_kabupaten" TEXT,
    "doc_id" TEXT,
    "pendudukId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SuketUsaha_pkey" PRIMARY KEY ("no_surat")
);

-- CreateTable
CREATE TABLE "SKTM" (
    "no_surat" TEXT NOT NULL,
    "nik_ortu" TEXT NOT NULL,
    "nik_anak" TEXT NOT NULL,
    "nama_instansi" TEXT,
    "fakultas_prodi" TEXT,
    "kelas_semester" INTEGER,
    "doc_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SKTM_pkey" PRIMARY KEY ("no_surat")
);

-- CreateTable
CREATE TABLE "SuketKematian" (
    "no_surat" TEXT NOT NULL,
    "pendudukId" TEXT NOT NULL,
    "lokasi_meninggal" TEXT,
    "tanggal_kematian" TIMESTAMP(3),
    "anak_ke" INTEGER,
    "doc_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SuketKematian_pkey" PRIMARY KEY ("no_surat")
);

-- CreateTable
CREATE TABLE "IzinKeramaian" (
    "no_surat" TEXT NOT NULL,
    "pendudukId" TEXT NOT NULL,
    "jenis_keramaian" TEXT,
    "keperluan_keramaian" TEXT,
    "tempat_keramaian" TEXT,
    "waktu_keramaian" TIMESTAMP(3),
    "lama_keramaian" TEXT,
    "doc_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IzinKeramaian_pkey" PRIMARY KEY ("no_surat")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_email_token_key" ON "VerificationToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_email_token_key" ON "PasswordResetToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "PengantarSKCK_pendudukId_key" ON "PengantarSKCK"("pendudukId");

-- CreateIndex
CREATE UNIQUE INDEX "SuketKematian_pendudukId_key" ON "SuketKematian"("pendudukId");

-- AddForeignKey
ALTER TABLE "PengantarSKCK" ADD CONSTRAINT "PengantarSKCK_pendudukId_fkey" FOREIGN KEY ("pendudukId") REFERENCES "Penduduk"("nik") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuketUsaha" ADD CONSTRAINT "SuketUsaha_pendudukId_fkey" FOREIGN KEY ("pendudukId") REFERENCES "Penduduk"("nik") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SKTM" ADD CONSTRAINT "SKTM_nik_ortu_fkey" FOREIGN KEY ("nik_ortu") REFERENCES "Penduduk"("nik") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuketKematian" ADD CONSTRAINT "SuketKematian_pendudukId_fkey" FOREIGN KEY ("pendudukId") REFERENCES "Penduduk"("nik") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IzinKeramaian" ADD CONSTRAINT "IzinKeramaian_pendudukId_fkey" FOREIGN KEY ("pendudukId") REFERENCES "Penduduk"("nik") ON DELETE RESTRICT ON UPDATE CASCADE;
