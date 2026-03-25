import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    provider: "razorpay",
    orderId: "order_SDMLT_001",
    amount: 799900,
    currency: "INR",
    note: "Replace with live Razorpay order creation using key secret on the server."
  });
}
