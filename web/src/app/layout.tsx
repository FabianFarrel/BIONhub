import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { SettingsProvider } from "@/context/SettingsContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "BIONhub — Entertainment Hub",
  description:
    "Discover movies, TV series, and music. Rate, review, and save your favorites.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <SettingsProvider>
          <AuthProvider>
            <Suspense fallback={<div style={{ height: 76 }} />}>
              <Navbar />
            </Suspense>
            <main className="app-main">{children}</main>
            <Footer />
          </AuthProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
