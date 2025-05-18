import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/app/components/ui/toaster";
import SessionProvider from "./component/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { ThemeProvider } from "./component/ThemeProvider";
import { CartProvider } from "@/app/context/cartContext";
import { UserProvider } from "./context/userContext";

export const metadata: Metadata = {
  title: "ShopKub",
  icons: {
    icon: ["/pngtree.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <body className={inter.className}> */}
      <body >
        <main className="font-noto">
          <SessionProvider session={session}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <UserProvider>
                <CartProvider>{children}</CartProvider>
              </UserProvider>
            </ThemeProvider>
          </SessionProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
