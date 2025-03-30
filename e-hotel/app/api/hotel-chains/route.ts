import { prisma } from '@/app/database/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const chains = await prisma.hotelChain.findMany()
  return NextResponse.json(chains)
}

export async function POST(req: Request) {
  const body = await req.json()
  const chain = await prisma.hotelChain.create({ data: body })
  return NextResponse.json(chain)
}
