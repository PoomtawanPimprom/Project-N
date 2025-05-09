import type { Metadata } from "next";
import Navbar from "@/app/component/navbar";


export const metadata: Metadata = {
  title: "favorite",
  description: "favorite",
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
