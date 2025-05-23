import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { amount, currency = "INR" } = await request.json();

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });

  const options = {
    amount: amount * 100,
    currency,
    receipt: "rcpt_" + Date.now(),
  };

  try {
    const order = await razorpay.orders.create(options);
    return NextResponse.json({ orderId: order.id });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
