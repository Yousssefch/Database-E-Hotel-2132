import { prisma } from '@/app/database/prisma'
import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const hotel = await prisma.hotel.findUnique({
    where: { id: +params.id },
    include: {
      manager: true, // Include the manager relation
      hotelChain: true, // If needed, include hotelChain as well
      rooms: true, // Include rooms if needed
      employees: true, // Include employees if needed
    }
  })
  return NextResponse.json(hotel)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json()

  // Check if managerId is provided, otherwise, update the rest of the fields
  const updatedData: any = {
    ...data,
    // If managerId exists, update managerId
    ...(data.managerId ? { managerId: data.managerId } : {}),
  }

  const updated = await prisma.hotel.update({ 
    where: { id: +params.id }, 
    data: updatedData 
  })
  return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.hotel.delete({ where: { id: +params.id } })
  return NextResponse.json({ deleted: true })
}
