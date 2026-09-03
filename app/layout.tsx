import React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import AuthPanel from "@/components/AuthPanel";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Learning - Fun Educational Games for Kids",
  description:
    "Learn Math, English, and Science with fun quizzes and games! Perfect for JK to Grade 12 students.",

  icons: {
    // Browser tab icon
    icon: "/learnlyx.png",

    // Apple / iOS home screen icon
    apple: "/learnlyx.png",

    // Optional: shortcut icon
    shortcut: "/learnlyx.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AuthPanel />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
