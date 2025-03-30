import { prisma } from '@/app/database/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const rentings = await prisma.renting.findMany({ include: { customer: true, employee: true, room: true, booking: true } })
  return NextResponse.json(rentings)
}

export async function POST(req: Request) {
  const data = await req.json()
  const renting = await prisma.renting.create({ data })
  return NextResponse.json(renting)
}
