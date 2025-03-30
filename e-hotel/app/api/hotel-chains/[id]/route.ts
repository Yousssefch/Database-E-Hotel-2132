import { prisma } from '@/app/database/prisma'
import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const chain = await prisma.hotelChain.findUnique({ where: { id: +params.id } })
  return NextResponse.json(chain)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json()
  const chain = await prisma.hotelChain.update({ where: { id: +params.id }, data })
  return NextResponse.json(chain)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.hotelChain.delete({ where: { id: +params.id } })
  return NextResponse.json({ deleted: true })
}
