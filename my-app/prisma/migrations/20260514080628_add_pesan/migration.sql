-- CreateTable
CREATE TABLE "Pesan" (
    "id" SERIAL NOT NULL,
    "nik" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "isi" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pesan_pkey" PRIMARY KEY ("id")
);
