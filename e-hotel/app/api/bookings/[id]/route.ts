import { prisma } from '@/app/database/prisma'
import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const booking = await prisma.booking.findUnique({ where: { id: +params.id } })
  return NextResponse.json(booking)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json()
  const updated = await prisma.booking.update({ where: { id: +params.id }, data })
  return NextResponse.json(updated)
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json()
  const updated = await prisma.booking.update({ 
    where: { id: +params.id }, 
    data 
  })
  return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.booking.delete({ where: { id: +params.id } })
  return NextResponse.json({ deleted: true })
}
