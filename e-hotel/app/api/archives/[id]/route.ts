import { prisma } from '@/app/database/prisma'
import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const archive = await prisma.archives.findUnique({ where: { id: +params.id } })
  return NextResponse.json(archive)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.archives.delete({ where: { id: +params.id } })
  return NextResponse.json({ deleted: true })
}
