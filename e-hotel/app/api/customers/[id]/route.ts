import { prisma } from '@/app/database/prisma'
import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const customer = await prisma.customer.findUnique({
    where: { ssn_sin: params.id },
  })
  return NextResponse.json(customer)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json()

  // If profilePictureURL or any other field is updated, ensure it gets handled
  const updated = await prisma.customer.update({
    where: { ssn_sin: params.id },
    data: {
      ...data, // Spread the incoming data for updating
    }
  })
  return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.customer.delete({ where: { ssn_sin: params.id } })
  return NextResponse.json({ deleted: true })
}
