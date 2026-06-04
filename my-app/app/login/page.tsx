"use client";

import "./login.css";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);
  const [nik, setNik] = useState("");
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const verifikasi = async () => {
    try {
      const res = await fetch("/api/auth/verifikasi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nik, nama }),
      });

      const data = await res.json();

      if (data.success) {
        setStep(2);
      } else {
        alert("NIK atau Nama tidak ditemukan");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat verifikasi");
    }
  };

  const login = async () => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Login berhasil");
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/";
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat login");
    }
  };

  const register = async () => {
  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nik,
        username,
        password,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Akun berhasil dibuat");

      setIsLogin(true);
      setStep(1);

      setUsername("");
      setPassword("");
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.error(error);
    alert("Gagal membuat akun");
  }
};

  return (
    <div className="login-page">
      <div className="overlay">
        <div className="form-container">

          <h1 className="logo">SIPMO</h1>

          <h2>
            {isLogin
              ? "Login"
              : step === 1
              ? "Verifikasi Warga"
              : "Buat Akun"}
          </h2>

          {/* LOGIN */}
          {isLogin ? (
          <>
            <div className="input-box">
              <input
                type="text"
                placeholder=""
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
              <span>Username</span>
            </div>

            <div className="input-box">
              <input
                type="password"
                placeholder=""
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
              <span>Password</span>
            </div>

            <button
              className="submit-btn"
              onClick={login}
            >
            Login
            </button>

            <p className="lupa-akun">
              Lupa akun?
            </p>
            </>
          ) : (
            <>
              {/* STEP 1 */}
              {step === 1 && (
                <>
                  <div className="input-box">
                    <input
                      type="text"
                      placeholder=""
                      required
                      value={nik}
                      onChange={(e) => setNik(e.target.value)}
                    />
                    <span>NIK</span>
                  </div>

                  <div className="input-box">
                    <input
                      type="text"
                      placeholder=""
                      required
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                    />
                    <span>Nama Lengkap</span>
                  </div>

                  <button
                    className="submit-btn"
                    onClick={verifikasi}
                  >
                    Verifikasi
                  </button>
                </>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <>
                  <div className="input-box">
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <span>Username</span>
                  </div>

                  <div className="input-box">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span>Password</span>
                  </div>

                  <button className="submit-btn" onClick={register}>
                    Daftar
                  </button>
                </>
              )}
            </>
          )}

          <p className="switch-text">
            {isLogin
              ? "Belum punya akun?"
              : "Sudah punya akun?"}

            <span
              onClick={() => {
                setIsLogin(!isLogin);
                setStep(1);
              }}
            >
              {isLogin ? " Register" : " Login"}
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}