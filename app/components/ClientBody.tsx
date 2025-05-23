"use client";

import { useEffect, useState } from "react";

export default function ClientBody({ children }: { children: React.ReactNode }) {
  // Skip hydration mismatch by suppressing the warning
  useEffect(() => {
    // This runs after hydration
    // We're intentionally not doing anything here
    // Just to ensure this component is marked as a client component
  }, []);

  // Just render the children directly
  // This avoids the hydration mismatch by not rendering a body element at all
  return <>{children}</>;
}
