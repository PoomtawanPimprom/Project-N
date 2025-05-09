import Navbar from "@/app/component/navbar";

export default function CartLayout({
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
