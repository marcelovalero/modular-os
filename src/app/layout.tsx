
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header"; // Importando o novo Header

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema Modular - Galeria de Obras",
  description: "Um portfólio de excelência em engenharia e construção.",
};

const Footer = () => (
  <footer className="w-full py-8 text-center text-gray-400 mt-20">
    <div className="max-w-7xl mx-auto border-t border-gray-700 pt-8">
      <p>Sistema Modular &copy; {new Date().getFullYear()}</p>
      <p className="text-sm mt-2">Entre em contato: <a href="mailto:contato@sistemamodular.com" className="hover:text-blue-300">contato@sistemamodular.com</a></p>
    </div>
  </footer>
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-slate-900 text-white`}>
        <Header />
        <main className="pt-20"> {/* Adiciona padding no topo para não ficar sob o Header fixo */}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
