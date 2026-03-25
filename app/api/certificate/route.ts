import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    certificateId: "SDMLT-2026-0142",
    recipient: "Aarav Mehta",
    program: "School of Decision Thinking",
    status: "ready"
  });
}
