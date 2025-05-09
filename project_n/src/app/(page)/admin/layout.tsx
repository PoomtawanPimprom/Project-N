import type { Metadata } from "next";
import Navbar from "@/app/component/navbar";


export const metadata: Metadata = {
  title: "Admin dashboard",
  description: "Admin dashboard",
};

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Navbar />
      {children}
    </section>
  );
}
