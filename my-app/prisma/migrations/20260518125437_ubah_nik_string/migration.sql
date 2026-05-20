/*
  Warnings:

  - The primary key for the `warga` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "warga" DROP CONSTRAINT "warga_pkey",
ALTER COLUMN "nik" SET DATA TYPE TEXT,
ADD CONSTRAINT "warga_pkey" PRIMARY KEY ("nik");
