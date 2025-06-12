import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {

        const response = await req.json();
        const { email } = response;

        const logoutSession = await prisma.loginSession.delete({
            where: {
                userID: email
            }
        })

        if (logoutSession) {
            return NextResponse.json({ message: 'Logout Success' }, { status: 200 })
        }
        return NextResponse.json({ message: 'Logout Failed' }, { status: 401 })

    } catch (error) {
        return NextResponse.json({ message: 'Logout Failed' }, { status: 401 })
    }

}
