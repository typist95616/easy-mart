import bcrypt from "bcrypt";
import { prisma } from "@/prisma/prisma";
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {
        // Get email and password from input
        const body = await req.json();
        const { email, password } = body;

        // Check if email exist
        const user = await prisma.member.findUnique({
            where: {
                email: email
            }
        })

        // return if email not exist
        if(!user) {
            return NextResponse.json({error: 'Invalid email or password'}, { status: 401});
        } 

        // verify password
        const verifyPassword = await bcrypt.compare(password, user.password);
        if(!verifyPassword) {
            // return if password not match
            return NextResponse.json({error: 'Invalid email or password'}, { status: 401});
        }

        // generate token if pass verification
        const token = uuidv4();

        // add the email & token to table LoginSession
        await prisma.loginSession.create({
            data: {
                userID: email,
                token: token
            }
        })

        const {password:_, ...userInfo} = user;

        return NextResponse.json({ message: 'Login successfully', token: token, user: user }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }); // Return a response on error
    }
}

