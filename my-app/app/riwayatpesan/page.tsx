"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

type Message = {
  id: number;
  chatId: number;
  pengirim: string;
  isi: string;
  dibaca: boolean;
  createdAt: string;
};

type Chat = {
  id: number;
  nik: string;
};

type User = {
  nik: string;
};

export default function RiwayatPesanPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatId, setChatId] = useState<number | null>(null);
  const [isiPesan, setIsiPesan] = useState("");
  const [loading, setLoading] = useState(true);

useEffect(() => {

  const loadChat = async () => {

    const user = JSON.parse(
      localStorage.getItem("user") || "null"
    ) as User | null;

    if (!user) {
      window.location.href = "/login";
      return;
    }

    try {

      const res = await fetch("/api/chat");

      const chats = await res.json() as Chat[];

      const myChat = chats.find(
        (item) =>
          item.nik === user.nik
      );

      if (!myChat) {
        setLoading(false);
        return;
      }

      setChatId(myChat.id);

      const res2 = await fetch(
        `/api/chat/${myChat.id}`
      );

      const detail =
        await res2.json();

      setMessages(
        detail.messages || []
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  loadChat();

}, []);

const kirimPesan = async () => {

  if (!isiPesan.trim()) return;

  try {

    await fetch(
      "/api/chat/message",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          chatId,
          pengirim: "user",
          isi: isiPesan,
        }),
      }
    );

    setIsiPesan("");

    location.reload();

  } catch (error) {

    console.error(error);

  }
};

return (
  <>
    <Navbar />

    <div className="min-h-screen pt-28 px-5 bg-slate-50 dark:bg-slate-900">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-8 dark:text-white">
          Riwayat Pesan
        </h1>

        {loading ? (

          <div className="text-center dark:text-white">
            Memuat...
          </div>

        ) : (

          <>
            <div
              className="
                bg-slate-100
                dark:bg-slate-800
                p-5
                rounded-3xl
                h-[70vh]
                overflow-y-auto
              "
            >

              <div className="space-y-4">

                {messages.length === 0 ? (

                  <div className="text-center text-gray-500">
                    Belum ada pesan
                  </div>

                ) : (

                  messages.map((msg) => (

                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.pengirim === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >

                      <div
                        className={`
                          max-w-[75%]
                          px-4
                          py-3
                          rounded-2xl
                          shadow
                          ${
                            msg.pengirim === "user"
                              ? "bg-cyan-600 text-white"
                              : "bg-white dark:bg-slate-700 dark:text-white"
                          }
                        `}
                      >
                        {msg.isi}
                      </div>

                    </div>

                  ))

                )}

              </div>

            </div>

            <div className="mt-5 flex gap-3">

              <input
                value={isiPesan}
                onChange={(e) =>
                  setIsiPesan(e.target.value)
                }
                placeholder="Ketik pesan..."
                className="
                  flex-1
                  bg-white
                  dark:bg-slate-800
                  dark:text-white
                  border
                  border-gray-300
                  dark:border-slate-600
                  rounded-2xl
                  px-4
                  py-3
                "
              />

              <button
                onClick={kirimPesan}
                className="
                  bg-cyan-600
                  hover:bg-cyan-700
                  text-white
                  px-6
                  rounded-2xl
                "
              >
                Kirim
              </button>

            </div>
          </>

        )}

      </div>

    </div>

  </>
);
}