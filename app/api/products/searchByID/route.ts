
import { NextResponse } from "next/server";
import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL!);

const mockData = [
  {
    "id": 1,
    "name": "Orange",
    "img_url": "/images/orange.png",
    "price_per_lb": 2.71,
    "total_price": 45.67,
    "stock": 13,
    "description": "Orange - A juicy orange with a sweet flavor.",
    "detail": "An orange is a juicy citrus fruit characterized by its bright orange rind and segmented, sweet, and tangy flesh. It's a round fruit with a smooth, leathery skin and is known for being a good source of vitamin C."
  },
  {
    "id": 2,
    "name": "Apple",
    "img_url": "/images/apple.png",
    "price_per_lb": 1.98,
    "total_price": 33.98,
    "stock": 29,
    "description": "Apple - A delicious apple with a sweet flavor.",
    "detail": "An apple is a sweet, edible fruit produced by an apple tree. It is the most widely grown species in the genus Malus. The tree originated in Central Asia, where it was domesticated by humans for thousands of years."
  },
  {
    "id": 3,
    "name": "Strewberry",
    "img_url": "/images/strawberry.png",
    "price_per_lb": 8.76,
    "total_price": 24.96,
    "stock": 89,
    "description": "Strewberry - A delicious strewberry with a sweet flavor.",
    "detail": "A strawberry is a small, juicy fruit that is the fruit body of the rose apple, Malus domestica. It is a round fruit with a reddish-brown skin and a juicy, sweet flesh. Strawberries are often eaten fresh as a snack or as a part of a dessert."
  }
  ,
  {
    "id": 4,
    "name": "Orange",
    "img_url": "/images/orange.png",
    "price_per_lb": 2.71,
    "total_price": 45.67,
    "stock": 13,
    "description": "Orange - A juicy orange with a sweet flavor.",
    "detail": "An orange is a juicy citrus fruit characterized by its bright orange rind and segmented, sweet, and tangy flesh. It's a round fruit with a smooth, leathery skin and is known for being a good source of vitamin C."
  },
  {
    "id": 5,
    "name": "Apple",
    "img_url": "/images/apple.png",
    "price_per_lb": 1.98,
    "total_price": 33.98,
    "stock": 29,
    "description": "Apple - A delicious apple with a sweet flavor.",
    "detail": "An apple is a sweet, edible fruit produced by an apple tree. It is the most widely grown species in the genus Malus. The tree originated in Central Asia, where it was domesticated by humans for thousands of years."
  },
  {
    "id": 6,
    "name": "Strewberry",
    "img_url": "/images/strawberry.png",
    "price_per_lb": 8.76,
    "total_price": 24.96,
    "stock": 89,
    "description": "Strewberry - A delicious strewberry with a sweet flavor.",
    "detail": "A strawberry is a small, juicy fruit that is the fruit body of the rose apple, Malus domestica. It is a round fruit with a reddish-brown skin and a juicy, sweet flesh. Strawberries are often eaten fresh as a snack or as a part of a dessert."
  },
  {
    "id": 7,
    "name": "Orange",
    "img_url": "/images/orange.png",
    "price_per_lb": 2.71,
    "total_price": 45.67,
    "stock": 13,
    "description": "Orange - A juicy orange with a sweet flavor.",
    "detail": "An orange is a juicy citrus fruit characterized by its bright orange rind and segmented, sweet, and tangy flesh. It's a round fruit with a smooth, leathery skin and is known for being a good source of vitamin C."
  },
  {
    "id": 8,
    "name": "Apple",
    "img_url": "/images/apple.png",
    "price_per_lb": 1.98,
    "total_price": 33.98,
    "stock": 29,
    "description": "Apple - A delicious apple with a sweet flavor.",
    "detail": "An apple is a sweet, edible fruit produced by an apple tree. It is the most widely grown species in the genus Malus. The tree originated in Central Asia, where it was domesticated by humans for thousands of years."
  },
  {
    "id": 9,
    "name": "Strewberry",
    "img_url": "/images/strawberry.png",
    "price_per_lb": 8.76,
    "total_price": 24.96,
    "stock": 89,
    "description": "Strewberry - A delicious strewberry with a sweet flavor.",
    "detail": "A strawberry is a small, juicy fruit that is the fruit body of the rose apple, Malus domestica. It is a round fruit with a reddish-brown skin and a juicy, sweet flesh. Strawberries are often eaten fresh as a snack or as a part of a dessert."
  }
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const searchID = searchParams.get('ID') || '';

  const foundProduct = mockData.find(product => 
    product.id.toString() === searchID
  );

  return NextResponse.json(foundProduct || null);
}