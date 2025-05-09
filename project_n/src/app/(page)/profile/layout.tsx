import Navbar from "@/app/component/navbar";



export default function ProfileLayout({
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
