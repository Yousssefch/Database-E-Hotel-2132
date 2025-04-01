import { prisma } from '@/app/database/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const hotels = await prisma.hotel.findMany({ 
    include: { 
      hotelChain: true,
      rooms: {
        select: {
          id: true,
          name: true,
          price: true,
          capacity: true,
          viewType: true,
          amenities: true,
          extendable: true,
          problems: true
        }
      },
      employees: {
        select: {
          id: true,
          fullName: true,
          role: true
        }
      },
      manager: true, // Include the manager relation
    } 
  })
  return NextResponse.json(hotels)
}

export async function POST(req: Request) {
  const data = await req.json()
  const hotel = await prisma.hotel.create({ data })
  return NextResponse.json(hotel)
}
