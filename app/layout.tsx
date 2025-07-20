import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Provider } from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend"
});

export const metadata: Metadata = {
  title: "Learning Journey - AI-Powered Course Creation",
  description: "Transform YouTube videos into structured learning experiences with our AI-powered platform. Create, share, and learn with comprehensive courses.",
  keywords: ["AI learning", "course creation", "YouTube to course", "online education", "learning platform"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={lexend.variable}>
      <body className={cn(
        "font-sans antialiased min-h-screen bg-background text-foreground",
        "selection:bg-primary/20 selection:text-primary-foreground"
      )}>
        <Provider>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
