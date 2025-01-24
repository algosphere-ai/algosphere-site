import { Poppins } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "AlgoSphere AI Agent Framework",
  description: "Empower your development with an open-source CLI tool that lets you design, build, and interact with AI agents on Solana. The Algosphere Framework serves as your collaborative assistant, while the API streamlines communication with your custom-built agents.",
};

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dim">
        <body className={poppins.className}>
          {children}
        </body>
    </html>
  );
}
