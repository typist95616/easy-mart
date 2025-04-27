
import { NextResponse } from "next/server";
import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL!);


export async function GET(req: Request) {
  return NextResponse.json([
    {
        "id": 1,
        "name": "orange (1lb)",
        "img_url": "",
        "price": "100",
        "stock": 12
    }
  ]);
}