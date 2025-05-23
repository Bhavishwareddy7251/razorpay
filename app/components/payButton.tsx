"use client";
import { loadRazorpay } from "@/lib/loadRazorpay";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Simulate getting user data dynamically
const generateDynamicUser = () => {
  const names = ["John Doe", "Jane Smith", "Alex Johnson", "Sam Wilson", "Taylor Swift"];
  const emails = ["john@example.com", "jane@example.com", "alex@example.com", "sam@example.com", "taylor@example.com"];
  const phones = ["9876543210", "8765432109", "7654321098", "6543210987", "5432109876"];

  const randomIndex = Math.floor(Math.random() * names.length);

  return {
    name: names[randomIndex],
    email: emails[randomIndex],
    phone: phones[randomIndex]
  };
};

export default function PayButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string; phone: string } | null>(null);

  // Simulate fetching user data when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setUser(generateDynamicUser());
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  async function handlePay() {
    if (!user) {
      alert("User data not loaded yet");
      return;
    }

    setLoading(true);

    try {
      // Generate a dynamic amount (between 499 and 999)
      const dynamicAmount = Math.floor(Math.random() * 500) + 499;

      const res = await fetch("/api/create-order", {
        method: "POST",
        body: JSON.stringify({ amount: dynamicAmount }),
      });
      const { orderId } = await res.json();

      const ok = await loadRazorpay();
      if (!ok) {
        alert("Failed to load payment SDK");
        setLoading(false);
        return;
      }

      // Use dynamic user data in the options
      const options: RazorpayCheckout.Options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: dynamicAmount * 100,
        currency: "INR",
        name: "bandi",
        order_id: orderId,
        handler: async (response: RazorpayCheckout.RazorpayResponse) => {
          const verify = await fetch("/api/verify", { method: "POST", body: JSON.stringify(response) });
          router.push(verify.ok ? `/success` : `/failure`);
        },
        prefill: {
          email: user.email,
          contact: user.phone,
          name: user.name
        },
        theme: { color: "#3399cc" },
      };

      // @ts-ignore – global after script load
      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Failed to process payment");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center">
      {user && (
        <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
          <p className="font-medium text-lg">Welcome, {user.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{user.phone}</p>
        </div>
      )}
      <button
        onClick={handlePay}
        disabled={loading || !user}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
      >
        {loading ? "Processing…" : user ? "Pay ₹499-999" : "Loading user data..."}
      </button>
    </div>
  );
}