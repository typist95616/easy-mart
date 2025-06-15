import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";

export async function POST(req: Request) {

    // get the token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
        return NextResponse.json({ error: 'Authorization header missing' }, { status: 401 });
    }
    const token = authHeader.split(' ')[1]; // Assuming the format is "Bearer <token>"

    console.log("token in api: " + token);

    // get the address
    const body = await req.json();

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

        const updateAddress = await prisma.member.update({
            where: {
                email: session?.userID
            },
            data: {
                address: body
            }
        })
        console.log("result after address updated: " + updateAddress);
        return NextResponse.json({ message: 'Address updated successfully' });
    } catch (error) {
        console.error("Error updating address:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}