import Image from "next/image";
import backgroundImage from "../tet.png";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full">
      <Image
        src={backgroundImage}
        alt="background"
        height={440}
        className="fixed bottom-0 left-0 -z-10"
      />
      {children}
    </div>
  );
}
