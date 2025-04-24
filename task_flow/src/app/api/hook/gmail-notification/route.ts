import { NextRequest, NextResponse } from "next/server";

// Named export for the POST handler
export async function POST(req: NextRequest) {
  const message = await req.json();
  console.log("req body has", message);
  return NextResponse.json({ msg: "ok" });
}