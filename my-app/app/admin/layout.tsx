import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin SIPMO",
  description: "Dashboard Admin SIPMO",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <body className="min-h-full flex flex-col">
        {children}
      </body>
  );
}