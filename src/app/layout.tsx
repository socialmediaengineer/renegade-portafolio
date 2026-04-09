import type { Metadata } from "next";
import "./globals.css";
import { ClientBody } from "./ClientBody";

export const metadata: Metadata = {
  title: "Olletix Video Editing",
  description: "Portafolio de edición de video profesional y creativa por Olletix. Servicios de edición, postproducción y storytelling visual para YouTube, redes sociales y publicidad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <ClientBody>{children}</ClientBody>
    </html>
  );
}
