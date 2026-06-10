"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NavAdmin from "../../component/navadmin";

type Message = {
  id: number;
  pengirim: string;
  isi: string;
  createdAt: string;
};

export default function ChatAdminPage() {
  const params = useParams();

  const [messages, setMessages] = useState<Message[]>([]);
  const [isiPesan, setIsiPesan] = useState("");

  const loadChat = async () => {
    try {
      const res = await fetch(
        `/api/chat/${params.id}`
      );

      const data = await res.json();

      setMessages(data.messages || []);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await fetch(`/api/chat/${params.id}`);
        const data = await res.json();
        if (mounted) setMessages(data.messages || []);
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [params.id]);

  const kirimBalasan = async () => {
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
            chatId: Number(params.id),
            pengirim: "admin",
            isi: isiPesan,
          }),
        }
      );

      setIsiPesan("");

      loadChat();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <NavAdmin />
      <div className="min-h-screen pt-28 p-10 bg-slate-100">

      <h1 className="text-3xl font-bold mb-6">
        Chat Warga
      </h1>

      <div className="bg-white rounded-3xl p-5 h-[600px] overflow-y-auto shadow-lg">

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex mb-4 ${
              msg.pengirim === "admin"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                msg.pengirim === "admin"
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {msg.isi}
            </div>
          </div>
        ))}

      </div>

      <div className="flex gap-3 mt-5">

        <input
          value={isiPesan}
          onChange={(e) =>
            setIsiPesan(e.target.value)
          }
          placeholder="Ketik balasan..."
          className="
            flex-1
            border
            rounded-2xl
            px-4
            py-3
          "
        />

        <button
          onClick={kirimBalasan}
          className="
            bg-cyan-600
            text-white
            px-6
            rounded-2xl
          "
        >
          Kirim
        </button>

      </div>

    </div>
  </>
  );
}