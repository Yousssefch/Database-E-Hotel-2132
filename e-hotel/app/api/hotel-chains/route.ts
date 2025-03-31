import { prisma } from '@/app/database/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const hotelChains = await prisma.hotelChain.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: 'asc'
      }
    })
    
    return NextResponse.json(hotelChains)
  } catch (error) {
    console.error('Error fetching hotel chains:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hotel chains' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  const body = await req.json()
  const chain = await prisma.hotelChain.create({ data: body })
  return NextResponse.json(chain)
}
