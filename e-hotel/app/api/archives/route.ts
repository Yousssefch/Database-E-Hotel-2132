import { prisma } from '@/app/database/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const records = await prisma.archives.findMany()
  return NextResponse.json(records)
}

export async function POST(req: Request) {
  const body = await req.json()
  const archive = await prisma.archives.create({ data: body })
  return NextResponse.json(archive)
}
