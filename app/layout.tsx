import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mi pasaporte virtual",
  description: "Mi pasaporte virtual",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
