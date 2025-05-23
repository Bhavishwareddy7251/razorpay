import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  const body = await request.json();       // { razorpay_order_id, razorpay_payment_id, razorpay_signature }

  const generated = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body.razorpay_order_id + "|" + body.razorpay_payment_id)
    .digest("hex");

  if (generated === body.razorpay_signature) {
    return NextResponse.json({ status: "success" });
  }
  return NextResponse.json({ status: "failure" }, { status: 400 });
}
