/*
  Warnings:

  - You are about to drop the column `name` on the `warga` table. All the data in the column will be lost.
  - Added the required column `nama` to the `warga` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "warga" DROP COLUMN "name",
ADD COLUMN     "JenisKelamin" TEXT,
ADD COLUMN     "alamat" TEXT,
ADD COLUMN     "nama" TEXT NOT NULL,
ADD COLUMN     "status" TEXT;
