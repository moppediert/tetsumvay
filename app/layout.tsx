import type { Metadata } from "next";
import { Inter, Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Tết Sum Vầy, Xuân Gắn Kết",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full">
      <body className={`h-full w-full bg-[#FFF5D7] ${quicksand.className}`}>
        {children}
      </body>
    </html>
  );
}
