import { prisma } from "../lib/prisma";

async function main() {
    //data warga
    const wargaBaru = await prisma.warga.create({ data :{
            username: "fiki2345",
            name: "Fiki",
            email: "fiqi@gmail.com",
            password: "password123",
            noTelepon: "081234567890",
            tanggalLahir: new Date("1990-01-01"), // Add required tanggalLahir
            alamat: "Jl. Contoh No. 123", // Add required alamat
        },
    });
    console.log("Warga baru ditambahkan:", wargaBaru);

    const semuaWarga = await prisma.warga.findMany();
    console.log("Semua warga:", semuaWarga);
}

main()
.then (async () => {
    await prisma.$disconnect();
}).catch (async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})
;