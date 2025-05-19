
import { NextResponse } from "next/server";
import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL!);


export async function GET(req: Request) {
    const res = await sql`SELECT * FROM hello`;

  return NextResponse.json({
    message: "Hello World",
    res,
  });
}