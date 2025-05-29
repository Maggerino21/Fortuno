import ClientProviders from "./ClientProviders";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fortuno - Personal Finance App",
  description: "Your personal finance tracker and manager",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
