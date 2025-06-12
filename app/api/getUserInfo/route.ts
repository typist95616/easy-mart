import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    // get the token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
        return NextResponse.json({ error: 'Authorization header missing' }, { status: 401 });
    }
    const token = authHeader.split(' ')[1]; // Assuming the format is "Bearer <token>"

    console.log("token in api: " + token);

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

        console.log("session: " + JSON.stringify(session));

        const user = await prisma.member.findUnique({
            where: {
                email: session?.userID,
            }
        })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        console.log("user: " + JSON.stringify(user));
        return NextResponse.json(user);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
