import { NextRequest, NextResponse } from "next/server";

export default async function POST(req:NextRequest,res:NextResponse){
    const message = req.body
    console.log("req body has   ",message);
    return NextResponse.json({"msg":"ok"})
}