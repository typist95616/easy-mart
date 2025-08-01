import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    // get the token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
        return NextResponse.json({ error: 'Authorization header missing' }, { status: 401 });
    }
    const token = authHeader.split(' ')[1]; // Assuming the format is "Bearer <token>"

    try {
        // session.userID is the email in this case
        const session = await prisma.loginSession.findUnique({
            where: {
                token: token,
            },
            select: {
                userID: true,
            },
        })

        if (!session) {
            return NextResponse.json({ error: 'User not found' }, { status: 401 });
        }

        const body = await req.json();
        const { name } = body;

        const updatedUser = await prisma.member.update({
            where: {
                email: session.userID,
            }, 
            data: {
                username: name.trim(),
            }
        })

        return NextResponse.json({
            success: true,
            message: 'Name updated successfully',
            user: updatedUser
        });

    } catch (error) {
        console.error("Error when editing name: ", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }


}