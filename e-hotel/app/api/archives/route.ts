import { NextResponse } from 'next/server'
import { prisma } from '@/app/database/prisma'

export async function GET() {
  try {
    const archives = await prisma.archives.findMany({
      orderBy: {
        checkInDate: 'desc'
      }
    })

    return NextResponse.json(archives)
  } catch (error) {
    console.error('Error fetching archives:', error)
    return NextResponse.json(
      { error: 'Failed to fetch archives' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  const body = await req.json()
  const archive = await prisma.archives.create({ data: body })
  return NextResponse.json(archive)
}
