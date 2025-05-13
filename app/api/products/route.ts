
import { NextResponse } from "next/server";
import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL!);


export async function GET(req: Request) {
  return NextResponse.json([
    {
        "id": 1,
        "name": "orange",
        "img_url": "/images/orange.png",
        "price_per_lb": 2.71,
        "total_price": 45.67,
        "stock": 13
    },
    {
      "id": 2,
      "name": "apple",
      "img_url": "/images/apple.png",
      "price_per_lb": 1.98,
      "total_price": 33.98,
      "stock": 29
    },    
    {
      "id": 3,
      "name": "strewberry",
      "img_url": "/images/strawberry.png",
      "price_per_lb": 8.76,
      "total_price": 24.96,
      "stock": 89
    }
    ,    {
        "id": 1,
        "name": "orange",
        "img_url": "/images/orange.png",
        "price_per_lb": 2.71,
        "total_price": 45.67,
        "stock": 13
    },
    {
      "id": 2,
      "name": "apple",
      "img_url": "/images/apple.png",
      "price_per_lb": 1.98,
      "total_price": 33.98,
      "stock": 29
    },    
    {
      "id": 3,
      "name": "strewberry",
      "img_url": "/images/strawberry.png",
      "price_per_lb": 8.76,
      "total_price": 24.96,
      "stock": 89
    },
    {
      "id": 4,
      "name": "orange",
      "img_url": "/images/orange.png",
      "price_per_lb": 2.71,
      "total_price": 45.67,
      "stock": 13
    },
    {
      "id": 5,
      "name": "apple",
      "img_url": "/images/apple.png",
      "price_per_lb": 1.98,
      "total_price": 33.98,
      "stock": 29
    },    
    {
      "id": 6,
      "name": "strewberry",
      "img_url": "/images/strawberry.png",
      "price_per_lb": 8.76,
      "total_price": 24.96,
      "stock": 89
    }
  ]);
}