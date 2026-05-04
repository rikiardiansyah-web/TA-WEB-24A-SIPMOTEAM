import styles from "./bodys.module.css";
import Footadmin from "./component/footadmin";
import NavAdmin from "./component/navadmin";

export default function AdminPage() {
  return (
    <>
      <NavAdmin />
      <div className={styles.container}>
        <h1 className={styles.title}>Selamat Datang di SIPMO Admin</h1>
        <p>Sistem Informasi Pengaduan Masyarakat Online</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-8">
        <div className={styles.leftbody + " w-full md:w-1/2"}>
          <p><b>Apa itu SIPMO?</b></p>
          SIPMO adalah Sistem Informasi Pengaduan Masyarakat Online yang
          dirancang untuk memudahkan masyarakat dalam menyampaikan pengaduan
          terkait berbagai masalah di lingkungan mereka.
        </div>

        <div className={styles.rightbody + " w-full md:w-1/2"}>
          SIPMO memungkinkan masyarakat untuk melaporkan masalah secara real-time
          dan memantau status pengaduan mereka.
        </div>
      </div>

      <Footadmin />
    </>
  );
}