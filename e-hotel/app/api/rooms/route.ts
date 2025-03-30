import { prisma } from '@/app/database/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const rooms = await prisma.room.findMany({ include: { hotel: true } })
  return NextResponse.json(rooms)
}

export async function POST(req: Request) {
  const data = await req.json()
  const room = await prisma.room.create({ data })
  return NextResponse.json(room)
}
