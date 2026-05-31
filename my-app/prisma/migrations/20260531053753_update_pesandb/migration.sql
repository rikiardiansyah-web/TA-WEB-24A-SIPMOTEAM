/*
  Warnings:

  - Added the required column `username` to the `Pesan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pesan" ADD COLUMN     "username" TEXT NOT NULL;
