"use client";

import "./login.css";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);

  return (
    <div className="form-container">
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
            <input type="text" required />
            <span>Username</span>
          </div>

          <div className="input-box">
            <input type="password" required />
            <span>Password</span>
          </div>

          <Link href="/" className="submit-btn">
            Login
          </Link>
        </>
      ) : (
        <>
          {/* STEP 1 : VERIFIKASI */}
          {step === 1 && (
            <>
              <div className="input-box">
                <input type="text" required />
                <span>NIK</span>
              </div>

              <div className="input-box">
                <input type="text" required />
                <span>Nama Lengkap</span>
              </div>

              <button
                className="submit-btn"
                onClick={() => setStep(2)}
              >
                Verifikasi
              </button>
            </>
          )}

          {/* STEP 2 : BUAT AKUN */}
          {step === 2 && (
            <>
              <div className="input-box">
                <input type="text" required />
                <span>Username</span>
              </div>

              <div className="input-box">
                <input type="password" required />
                <span>Password</span>
              </div>

              <div className="input-box">
                <input type="password" required />
                <span>Konfirmasi Password</span>
              </div>

              <button className="submit-btn">
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
  );
}