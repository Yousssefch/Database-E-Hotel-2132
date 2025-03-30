import { prisma } from '@/app/database/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const bookings = await prisma.booking.findMany({ include: { customer: true, room: true } })
  return NextResponse.json(bookings)
}

export async function POST(req: Request) {
  const data = await req.json()
  const booking = await prisma.booking.create({ data })
  return NextResponse.json(booking)
}
