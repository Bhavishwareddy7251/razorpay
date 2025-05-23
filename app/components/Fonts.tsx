"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { useServerInsertedHTML } from "next/navigation";

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

export default function Fonts() {
  useServerInsertedHTML(() => {
    return (
      <>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --font-geist-sans: ${geistSans.style.fontFamily};
                --font-geist-mono: ${geistMono.style.fontFamily};
              }
              body {
                font-family: var(--font-geist-sans);
              }
            `,
          }}
        />
      </>
    );
  });

  return null;
}
