import { prisma } from '@/app/database/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const hotels = await prisma.hotel.findMany({ include: { hotelChain: true } })
  return NextResponse.json(hotels)
}

export async function POST(req: Request) {
  const data = await req.json()
  const hotel = await prisma.hotel.create({ data })
  return NextResponse.json(hotel)
}
