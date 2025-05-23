"use client";

import React from "react";

export default function ClientLayout({
  children,
  sansClass,
  monoClass,
}: {
  children: React.ReactNode;
  sansClass: string;
  monoClass: string;
}) {
  return (
    <body className={`${sansClass} ${monoClass}`}>
      {children}
    </body>
  );
}
