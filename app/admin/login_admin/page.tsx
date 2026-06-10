"use client";

import { useState } from "react";

export default function LoginAdminPage() {
  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async () => {
    try {

      setLoading(true);

      const res = await fetch(
        "/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      localStorage.setItem(
        "admin",
        JSON.stringify(data)
      );

      window.location.href =
        "/admin";

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-[#00334d]
        via-[#004467]
        to-[#005b87]
        p-5
      "
    >

      <div
        className="
          w-full
          max-w-md
          bg-white
          rounded-3xl
          shadow-2xl
          p-8
        "
      >

        <div className="text-center">

          <h1
            className="
              text-4xl
              font-bold
              text-[#004467]
            "
          >
            SIPMO
          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Login Administrator
          </p>

        </div>

        <div className="mt-8">

          <label
            className="
              text-sm
              font-medium
              text-gray-600
            "
          >
            Username
          </label>

          <input
            type="text"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
            className="
              w-full
              mt-2
              border
              rounded-xl
              px-4
              py-3
              outline-none
              focus:border-cyan-600
            "
            placeholder="Masukkan username"
          />

        </div>

        <div className="mt-5">

          <label
            className="
              text-sm
              font-medium
              text-gray-600
            "
          >
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="
              w-full
              mt-2
              border
              rounded-xl
              px-4
              py-3
              outline-none
              focus:border-cyan-600
            "
            placeholder="Masukkan password"
          />

        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="
            w-full
            mt-8
            bg-[#004467]
            hover:bg-[#005b87]
            text-white
            py-3
            rounded-xl
            font-semibold
            transition
          "
        >
          {loading
            ? "Memproses..."
            : "Login Admin"}
        </button>

      </div>

    </div>
  );
}