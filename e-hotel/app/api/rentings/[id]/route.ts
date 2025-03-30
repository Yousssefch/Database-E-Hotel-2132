import { prisma } from '@/app/database/prisma'
import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const renting = await prisma.renting.findUnique({ where: { id: +params.id } })
  return NextResponse.json(renting)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json()
  const updated = await prisma.renting.update({ where: { id: +params.id }, data })
  return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.renting.delete({ where: { id: +params.id } })
  return NextResponse.json({ deleted: true })
}
