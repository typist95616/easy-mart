import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import bcrypt from "bcrypt";
import { Member } from "@/app/generated/prisma";

export async function POST(req: Request) {

    try {
        const body = await req.json();
        const { email, password, username } = body;

        // Hash the password using bcrypt, like hash password for 10 times
        const hashedPassword = await bcrypt.hash(password, 10);

        const newMember: Member = await prisma.member.create({
            data: {
                email,
                username,
                password: hashedPassword,
                img_url: "/images/tick.png"
            }
        });

        const { password: _, ...memberWithoutPassword} = newMember;

        return NextResponse.json({ message: 'User registered successfully', user: newMember }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({error: 'Error occurred during registration'}, { status: 500});
    }

}