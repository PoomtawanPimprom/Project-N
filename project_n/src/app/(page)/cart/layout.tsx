import { Inter } from "next/font/google";
import Navbar from "@/app/layout/navbar";


const inter = Inter({ subsets: ["latin"] });

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
