import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Configura tu Agente IA | Adolfo Arroyo",
  description: "Cuéntanos sobre tu negocio y te construimos un agente de IA personalizado en menos de 5 días.",
  openGraph: {
    title: "Configura tu Agente IA | Adolfo Arroyo",
    description: "Agentes de IA para WhatsApp — 24/7, sin código, listos en días.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
