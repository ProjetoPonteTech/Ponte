import type { Metadata } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PONTE — A tecnologia pode se adaptar a você",
  description:
    "Encontre outras formas de acessar conteúdos digitais, a partir das suas necessidades e no seu ritmo. A tecnologia deve se adaptar à pessoa.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${jakarta.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
