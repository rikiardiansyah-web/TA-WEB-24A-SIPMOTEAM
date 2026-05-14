-- CreateTable
CREATE TABLE "warga" (
    "nik" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "noTelepon" TEXT NOT NULL,

    CONSTRAINT "warga_pkey" PRIMARY KEY ("nik")
);

-- CreateIndex
CREATE UNIQUE INDEX "warga_username_key" ON "warga"("username");

-- CreateIndex
CREATE UNIQUE INDEX "warga_email_key" ON "warga"("email");
