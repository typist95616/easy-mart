import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";

export async function POST(req: NextRequest) {
    const { email } = await req.json();
    console.log("api received " + email);
    const user = await prisma.member.findUnique({where: {email}})
    if (user) {
        return NextResponse.json({exist: true});
    }
    return NextResponse.json({exist: false});
}